import { describe, expect, it, vi } from 'vitest';
import {
  createBrevoEmailAdapter,
  type EmailNotificationMessage,
} from '../src/infrastructure/email/brevo-email-adapter.js';

const configuration = {
  apiKey: 'test-api-key',
  sender: 'sender@example.test',
  recipient: 'recipient@example.test',
};

const message: EmailNotificationMessage = {
  subject: 'New enquiry',
  textContent: 'A visitor submitted an enquiry.',
};

describe('createBrevoEmailAdapter', () => {
  it('does not request delivery when the provider is not configured', async () => {
    const request = vi.fn<typeof fetch>();
    const adapter = createBrevoEmailAdapter(undefined, request);

    await expect(adapter.send(message)).resolves.toEqual({
      status: 'not_configured',
    });
    expect(request).not.toHaveBeenCalled();
  });

  it('sends a plain-text message using the configured server-side routing', async () => {
    const request = vi
      .fn<typeof fetch>()
      .mockResolvedValue(new Response(null, { status: 201 }));
    const adapter = createBrevoEmailAdapter(configuration, request);

    await expect(adapter.send(message)).resolves.toEqual({ status: 'sent' });

    const [url, options] = request.mock.calls[0] ?? [];
    expect(url).toBe('https://api.brevo.com/v3/smtp/email');
    expect(options?.method).toBe('POST');
    expect(options?.headers).toEqual({
      accept: 'application/json',
      'api-key': configuration.apiKey,
      'content-type': 'application/json',
    });
    expect(JSON.parse(String(options?.body))).toEqual({
      sender: { email: configuration.sender },
      to: [{ email: configuration.recipient }],
      subject: message.subject,
      textContent: message.textContent,
    });
  });

  it('returns a safe failure status when Brevo rejects the request', async () => {
    const request = vi
      .fn<typeof fetch>()
      .mockResolvedValue(
        new Response('provider response must not be exposed', { status: 401 }),
      );
    const adapter = createBrevoEmailAdapter(configuration, request);

    await expect(adapter.send(message)).resolves.toEqual({
      status: 'failed',
      reason: 'provider_rejected',
      httpStatus: 401,
    });
  });

  it('returns a safe failure status when the network request fails', async () => {
    const request = vi
      .fn<typeof fetch>()
      .mockRejectedValue(new Error('private api key detail'));
    const adapter = createBrevoEmailAdapter(configuration, request);

    await expect(adapter.send(message)).resolves.toEqual({
      status: 'failed',
      reason: 'request_failed',
    });
  });

  it('rejects empty message content without contacting Brevo', async () => {
    const request = vi.fn<typeof fetch>();
    const adapter = createBrevoEmailAdapter(configuration, request);

    await expect(
      adapter.send({ subject: ' ', textContent: ' ' }),
    ).rejects.toThrow('Email subject and text content are required.');
    expect(request).not.toHaveBeenCalled();
  });
});
