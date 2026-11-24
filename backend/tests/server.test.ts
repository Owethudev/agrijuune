import type { Server } from 'node:http';
import express from 'express';
import { describe, expect, it, vi } from 'vitest';
import { app } from '../src/app.js';
import { errorHandler } from '../src/middleware/error-handler.js';
import { notFoundMiddleware } from '../src/middleware/not-found.js';
import { requestIdMiddleware } from '../src/middleware/request-id.js';
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
