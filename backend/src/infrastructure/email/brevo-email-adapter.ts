import type { BrevoConfiguration } from '../../config/environment.js';

export type EmailNotificationMessage = Readonly<{
  subject: string;
  textContent: string;
}>;

export type EmailNotificationResult =
  | Readonly<{ status: 'sent' }>
  | Readonly<{ status: 'not_configured' }>
  | Readonly<{
      status: 'failed';
      reason: 'provider_rejected';
      httpStatus: number;
    }>
  | Readonly<{ status: 'failed'; reason: 'request_failed' }>;

const BREVO_EMAIL_ENDPOINT = 'https://api.brevo.com/v3/smtp/email';
const REQUEST_TIMEOUT_MILLISECONDS = 10_000;

export function createBrevoEmailAdapter(
  configuration: BrevoConfiguration | undefined,
  request: typeof fetch = fetch,
) {
  return {
    async send(
      message: EmailNotificationMessage,
    ): Promise<EmailNotificationResult> {
      if (!configuration) {
        return { status: 'not_configured' };
      }

      if (!message.subject.trim() || !message.textContent.trim()) {
        throw new Error('Email subject and text content are required.');
      }

      try {
        const response = await request(BREVO_EMAIL_ENDPOINT, {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'api-key': configuration.apiKey,
            'content-type': 'application/json',
          },
          body: JSON.stringify({
            sender: { email: configuration.sender },
            to: [{ email: configuration.recipient }],
            subject: message.subject,
            textContent: message.textContent,
          }),
          signal: AbortSignal.timeout(REQUEST_TIMEOUT_MILLISECONDS),
        });

        if (!response.ok) {
          return {
            status: 'failed',
            reason: 'provider_rejected',
            httpStatus: response.status,
          };
        }

        return { status: 'sent' };
      } catch {
        return { status: 'failed', reason: 'request_failed' };
      }
    },
  };
}
