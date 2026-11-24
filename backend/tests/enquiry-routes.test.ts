import type { Server } from 'node:http';
import express from 'express';
import { describe, expect, it, vi } from 'vitest';
import type { EnquiryService } from '../src/services/enquiry-service.js';
import { createEnquiryRouter } from '../src/routes/enquiry-routes.js';
import { errorHandler } from '../src/middleware/error-handler.js';
import { requestIdMiddleware } from '../src/middleware/request-id.js';
import { closeHttpServer } from '../src/server.js';

const requestBody = {
  contactName: 'Example Contact',
  email: 'contact@example.com',
  cellNumber: '+27 00 000 0000',
  servicesOfInterest: ['farm_management_technology'],
  privacyNoticeAcknowledged: true,
};

async function listen(application: express.Express) {
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

  return { server, origin: `http://127.0.0.1:${address.port}` };
}

async function close(server: Server) {
  if (server.listening) {
    await closeHttpServer(server);
  }
}

function createApp(service: EnquiryService) {
  const app = express();
  app.use(requestIdMiddleware);
  app.use(express.json());
  app.use('/api/v1/enquiries', createEnquiryRouter(service));
  app.use(errorHandler);
  return app;
}

describe('enquiry routes', () => {
  it('validates, assigns server-side privacy metadata, and returns a safe result', async () => {
    const submit = vi.fn<EnquiryService['submit']>().mockResolvedValue({
      ok: true,
      enquiryId: '00000000-0000-0000-0000-000000000001',
      replayed: false,
      notificationStatus: 'sent',
    });
    const { server, origin } = await listen(createApp({ submit }));

    try {
      const response = await fetch(`${origin}/api/v1/enquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': '7e5dfc21-574c-4c33-9f7e-477cb2f79ca3',
        },
        body: JSON.stringify(requestBody),
      });

      expect(response.status).toBe(201);
      expect(await response.json()).toEqual({
        success: true,
        data: {
          enquiryId: '00000000-0000-0000-0000-000000000001',
          notificationStatus: 'sent',
        },
      });
      expect(submit).toHaveBeenCalledOnce();
      const [input, idempotencyKey, acknowledgement] =
        submit.mock.calls[0] ?? [];
      expect(input).toEqual({
        contactName: 'Example Contact',
        email: 'contact@example.com',
        cellNumber: '+27 00 000 0000',
        servicesOfInterest: ['farm_management_technology'],
      });
      expect(idempotencyKey).toBe('7e5dfc21-574c-4c33-9f7e-477cb2f79ca3');
      expect(acknowledgement?.noticeVersion).toBe('1.0');
      expect(
        Number.isNaN(Date.parse(acknowledgement?.acknowledgedAt ?? '')),
      ).toBe(false);
    } finally {
      await close(server);
    }
  });

  it('rejects missing acknowledgement and idempotency key without submitting', async () => {
    const submit = vi.fn<EnquiryService['submit']>();
    const { server, origin } = await listen(createApp({ submit }));

    try {
      const missingAcknowledgement = await fetch(`${origin}/api/v1/enquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': '7e5dfc21-574c-4c33-9f7e-477cb2f79ca3',
        },
        body: JSON.stringify({
          ...requestBody,
          privacyNoticeAcknowledged: false,
        }),
      });

      expect(missingAcknowledgement.status).toBe(400);
      expect(await missingAcknowledgement.json()).toMatchObject({
        error: {
          code: 'INVALID_ENQUIRY',
          details: [
            {
              field: 'privacyNoticeAcknowledged',
              code: 'REQUIRED',
            },
          ],
        },
      });

      const missingKey = await fetch(`${origin}/api/v1/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      expect(missingKey.status).toBe(400);
      expect(await missingKey.json()).toMatchObject({
        error: { code: 'IDEMPOTENCY_KEY_REQUIRED' },
      });
      expect(submit).not.toHaveBeenCalled();
    } finally {
      await close(server);
    }
  });

  it('maps idempotency conflicts to a safe client error', async () => {
    const submit = vi.fn<EnquiryService['submit']>().mockResolvedValue({
      ok: false,
      reason: 'conflict',
    });
    const { server, origin } = await listen(createApp({ submit }));

    try {
      const response = await fetch(`${origin}/api/v1/enquiries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Idempotency-Key': '7e5dfc21-574c-4c33-9f7e-477cb2f79ca3',
        },
        body: JSON.stringify(requestBody),
      });

      expect(response.status).toBe(409);
      expect(await response.json()).toMatchObject({
        error: { code: 'IDEMPOTENCY_CONFLICT' },
      });
    } finally {
      await close(server);
    }
  });
});
