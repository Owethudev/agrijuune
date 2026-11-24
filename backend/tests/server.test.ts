import type { Server } from 'node:http';
import express from 'express';
import { describe, expect, it, vi } from 'vitest';
import { app } from '../src/app.js';
import { createCorsMiddleware } from '../src/middleware/cors.js';
import { createEnquiryRateLimitMiddleware } from '../src/middleware/enquiry-rate-limit.js';
import { errorHandler } from '../src/middleware/error-handler.js';
import { notFoundMiddleware } from '../src/middleware/not-found.js';
import { requestIdMiddleware } from '../src/middleware/request-id.js';
import { createSecurityHeadersMiddleware } from '../src/middleware/security-headers.js';
import { closeHttpServer } from '../src/server.js';

async function listen(application = app) {
  const server = application.listen(0, '127.0.0.1');
  await new Promise<void>((resolve, reject) => {
    server.once('listening', resolve);
    server.once('error', reject);
  });

  const address = server.address();

  if (!address || typeof address === 'string') {
    await closeHttpServer(server);
    throw new Error('Test server did not bind to a TCP port.');
  }

  return {
    server,
    origin: `http://127.0.0.1:${address.port}`,
  };
}

function getRequestId(response: Response) {
  const requestId = response.headers.get('X-Request-ID');

  if (!requestId) {
    throw new Error('Response did not contain an X-Request-ID header.');
  }

  return requestId;
}

async function close(server: Server) {
  if (server.listening) {
    await closeHttpServer(server);
  }
}

describe('backend server', () => {
  it('returns only the documented safe health status', async () => {
    const { server, origin } = await listen();

    try {
      const response = await fetch(`${origin}/api/health`);
      const requestId = getRequestId(response);

      expect(response.status).toBe(200);
      expect(requestId).toMatch(
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
      );
      expect(await response.json()).toEqual({
        success: true,
        data: {
          status: 'ok',
        },
      });
      expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff');
      expect(response.headers.get('X-Frame-Options')).toBe('DENY');
      expect(response.headers.get('Content-Security-Policy')).toBe(
        "default-src 'none'; base-uri 'none'; frame-ancestors 'none'",
      );
      expect(response.headers.get('X-Powered-By')).toBeNull();
    } finally {
      await close(server);
    }
  });

  it('returns 405 for unsupported HTTP methods', async () => {
    const { server, origin } = await listen();

    try {
      const response = await fetch(`${origin}/api/health`, {
        method: 'PUT',
      });

      expect(response.status).toBe(405);
      expect(response.headers.get('Allow')).toBe('GET, HEAD, POST, OPTIONS');
      expect(await response.json()).toMatchObject({
        success: false,
        error: {
          code: 'METHOD_NOT_ALLOWED',
        },
      });
    } finally {
      await close(server);
    }
  });

  it('rejects POST requests that are not JSON', async () => {
    const { server, origin } = await listen();

    try {
      const response = await fetch(`${origin}/api/v1/enquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: 'not json',
      });

      expect(response.status).toBe(415);
      expect(await response.json()).toMatchObject({
        success: false,
        error: {
          code: 'UNSUPPORTED_MEDIA_TYPE',
        },
      });
    } finally {
      await close(server);
    }
  });

  it('keeps the enquiry endpoint unavailable for valid JSON submissions', async () => {
    const { server, origin } = await listen();

    try {
      const response = await fetch(`${origin}/api/v1/enquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contactName: 'Example' }),
      });

      expect(response.status).toBe(404);
      expect(await response.json()).toMatchObject({
        success: false,
        error: {
          code: 'NOT_FOUND',
        },
      });
    } finally {
      await close(server);
    }
  });

  it('returns safe errors for malformed and oversized JSON bodies', async () => {
    const { server, origin } = await listen();

    try {
      const invalidResponse = await fetch(`${origin}/api/v1/enquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: '{',
      });

      expect(invalidResponse.status).toBe(400);
      expect(await invalidResponse.json()).toMatchObject({
        success: false,
        error: {
          code: 'INVALID_JSON',
          message: 'The request body must contain valid JSON.',
        },
      });

      const oversizedResponse = await fetch(`${origin}/api/v1/enquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: 'x'.repeat(10_240) }),
      });

      expect(oversizedResponse.status).toBe(413);
      expect(await oversizedResponse.json()).toMatchObject({
        success: false,
        error: {
          code: 'PAYLOAD_TOO_LARGE',
          message: 'The request body exceeds the allowed size.',
        },
      });
    } finally {
      await close(server);
    }
  });

  it('allows only the configured origin and supports JSON preflight requests', async () => {
    const allowedOrigin = 'https://agrijuune.vercel.app';
    const testApp = express();
    testApp.use(requestIdMiddleware);
    testApp.use(createCorsMiddleware(allowedOrigin));
    testApp.get('/resource', (_request, response) => {
      response.status(200).json({ success: true });
    });
    testApp.use(notFoundMiddleware);
    testApp.use(errorHandler);

    const { server, origin } = await listen(testApp);

    try {
      const allowedResponse = await fetch(`${origin}/resource`, {
        headers: {
          Origin: allowedOrigin,
        },
      });

      expect(allowedResponse.status).toBe(200);
      expect(allowedResponse.headers.get('Access-Control-Allow-Origin')).toBe(
        allowedOrigin,
      );
      expect(allowedResponse.headers.get('Vary')).toContain('Origin');

      const preflightResponse = await fetch(`${origin}/resource`, {
        method: 'OPTIONS',
        headers: {
          Origin: allowedOrigin,
          'Access-Control-Request-Method': 'POST',
          'Access-Control-Request-Headers': 'content-type, idempotency-key',
        },
      });

      expect(preflightResponse.status).toBe(204);
      expect(
        preflightResponse.headers.get('Access-Control-Allow-Methods'),
      ).toBe('GET, HEAD, POST');
      expect(
        preflightResponse.headers.get('Access-Control-Allow-Headers'),
      ).toBe('Content-Type, Idempotency-Key');

      const rejectedResponse = await fetch(`${origin}/resource`, {
        headers: {
          Origin: 'https://unapproved.example',
        },
      });

      expect(rejectedResponse.status).toBe(403);
      expect(await rejectedResponse.json()).toMatchObject({
        success: false,
        error: {
          code: 'ORIGIN_NOT_ALLOWED',
        },
      });
    } finally {
      await close(server);
    }
  });

  it('fails closed for cross-origin requests when no frontend origin is configured', async () => {
    const testApp = express();
    testApp.use(requestIdMiddleware);
    testApp.use(createCorsMiddleware(undefined));
    testApp.get('/resource', (_request, response) => {
      response.status(200).end();
    });

    const { server, origin } = await listen(testApp);

    try {
      const response = await fetch(`${origin}/resource`, {
        headers: {
          Origin: 'https://agrijuune.vercel.app',
        },
      });

      expect(response.status).toBe(403);
      expect(response.headers.get('Access-Control-Allow-Origin')).toBeNull();
      expect(await response.json()).toMatchObject({
        success: false,
        error: {
          code: 'ORIGIN_NOT_ALLOWED',
        },
      });
    } finally {
      await close(server);
    }
  });

  it('returns a safe 429 after the configured enquiry request limit', async () => {
    const testApp = express();
    testApp.use(requestIdMiddleware);
    testApp.use(
      '/api/v1/enquiries',
      createEnquiryRateLimitMiddleware({
        max: 1,
        windowMs: 60_000,
      }),
    );
    testApp.post('/api/v1/enquiries', (_request, response) => {
      response.status(204).end();
    });
    testApp.use(notFoundMiddleware);
    testApp.use(errorHandler);

    const { server, origin } = await listen(testApp);

    try {
      const request = () =>
        fetch(`${origin}/api/v1/enquiries`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: '{}',
        });

      expect((await request()).status).toBe(204);

      const limitedResponse = await request();

      expect(limitedResponse.status).toBe(429);
      expect(getRequestId(limitedResponse)).toBeTruthy();
      expect(limitedResponse.headers.get('RateLimit-Limit')).toBe('1');
      expect(await limitedResponse.json()).toMatchObject({
        success: false,
        error: {
          code: 'RATE_LIMITED',
          message: 'Too many requests. Please try again later.',
        },
      });
    } finally {
      await close(server);
    }
  });

  it('rejects non-allowlisted preflight methods and headers', async () => {
    const testApp = express();
    testApp.use(requestIdMiddleware);
    testApp.use(createCorsMiddleware('https://agrijuune.vercel.app'));
    testApp.use(notFoundMiddleware);
    testApp.use(errorHandler);

    const { server, origin } = await listen(testApp);

    try {
      const methodResponse = await fetch(`${origin}/resource`, {
        method: 'OPTIONS',
        headers: {
          Origin: 'https://agrijuune.vercel.app',
          'Access-Control-Request-Method': 'DELETE',
        },
      });

      expect(methodResponse.status).toBe(405);

      const headerResponse = await fetch(`${origin}/resource`, {
        method: 'OPTIONS',
        headers: {
          Origin: 'https://agrijuune.vercel.app',
          'Access-Control-Request-Method': 'POST',
          'Access-Control-Request-Headers': 'authorization',
        },
      });

      expect(headerResponse.status).toBe(403);
    } finally {
      await close(server);
    }
  });

  it('adds HSTS only when running in production mode', async () => {
    const testApp = express();
    testApp.use(requestIdMiddleware);
    testApp.use(createSecurityHeadersMiddleware(true));
    testApp.get('/resource', (_request, response) => {
      response.status(200).end();
    });

    const { server, origin } = await listen(testApp);

    try {
      const response = await fetch(`${origin}/resource`);

      expect(response.headers.get('Strict-Transport-Security')).toBe(
        'max-age=31536000',
      );
    } finally {
      await close(server);
    }
  });

  it('returns a safe not-found response with the request ID', async () => {
    const { server, origin } = await listen();

    try {
      const response = await fetch(`${origin}/not-a-route`);
      const requestId = getRequestId(response);

      expect(response.status).toBe(404);
      expect(await response.json()).toEqual({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'The requested resource was not found.',
          details: [],
          requestId,
        },
      });
    } finally {
      await close(server);
    }
  });

  it('formats async route failures without exposing internal details', async () => {
    const testApp = express();
    const errorLog = vi.spyOn(console, 'error').mockImplementation(() => {});

    testApp.use(requestIdMiddleware);
    testApp.get('/failure', async () => {
      throw new Error('private database details');
    });
    testApp.use(notFoundMiddleware);
    testApp.use(errorHandler);

    const { server, origin } = await listen(testApp);

    try {
      const response = await fetch(`${origin}/failure`);
      const requestId = getRequestId(response);

      expect(response.status).toBe(500);
      expect(await response.json()).toEqual({
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: 'An unexpected error occurred.',
          details: [],
          requestId,
        },
      });
      expect(errorLog).toHaveBeenCalledWith('Unhandled API error.', {
        requestId,
        method: 'GET',
        errorName: 'Error',
      });
      expect(errorLog.mock.calls.flat().join(' ')).not.toContain(
        'private database details',
      );
    } finally {
      errorLog.mockRestore();
      await close(server);
    }
  });

  it('stops accepting requests after graceful shutdown', async () => {
    const { server, origin } = await listen();
    await closeHttpServer(server);

    expect(server.listening).toBe(false);
    await expect(
      fetch(`${origin}/api/health`, {
        signal: AbortSignal.timeout(1000),
      }),
    ).rejects.toThrow();
  });
});
