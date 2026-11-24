import { createClient } from '@supabase/supabase-js';
import { describe, expect, it, vi } from 'vitest';
import { createBrevoEmailAdapter } from '../src/infrastructure/email/brevo-email-adapter.js';
import { createSupabaseEnquiryRepository } from '../src/infrastructure/database/supabase-enquiry-repository.js';
import type { Database } from '../src/infrastructure/database/database.types.js';
import { createEnquiryService } from '../src/services/enquiry-service.js';
import type { EnquiryInput } from '../src/validation/enquiry-validation.js';
import { validateIdempotencyKey } from '../src/validation/idempotency-key.js';

const enquiry: EnquiryInput = {
  contactName: 'Example Contact',
  email: 'contact@example.com',
  cellNumber: '+27 00 000 0000',
  farmName: 'Example Farm',
  servicesOfInterest: ['farm_management_technology'],
};

const keyResult = validateIdempotencyKey(
  '7e5dfc21-574c-4c33-9f7e-477cb2f79ca3',
);

if (!keyResult.valid) {
  throw new Error('Test idempotency key is invalid.');
}

const enquiryId = '00000000-0000-0000-0000-000000000001';

function createWorkflow(providerStatus: number, persistenceStatus = 201) {
  const events: string[] = [];
  const databaseFetch = vi.fn<typeof fetch>(async (_input, init) => {
    if (init?.method === 'POST') {
      events.push('persist');
      return new Response(
        persistenceStatus === 201
          ? JSON.stringify({
              id: enquiryId,
              notification_status: 'not_configured',
            })
          : JSON.stringify({
              code: 'XX000',
              message: 'private database details',
            }),
        {
          status: persistenceStatus,
          headers: { 'Content-Type': 'application/json' },
        },
      );
    }

    if (init?.method === 'PATCH') {
      const body = JSON.parse(String(init.body)) as {
        notification_status: string;
      };
      events.push(`status:${body.notification_status}`);
      return new Response(JSON.stringify({ id: enquiryId }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    throw new Error(`Unexpected database method: ${init?.method}`);
  });
  const providerFetch = vi.fn<typeof fetch>(async () => {
    events.push('email');
    return new Response(null, { status: providerStatus });
  });
  const repository = createSupabaseEnquiryRepository(
    createClient<Database>(
      'https://test-project.supabase.co',
      'test-service-role-key',
      {
        auth: {
          autoRefreshToken: false,
          detectSessionInUrl: false,
          persistSession: false,
        },
        global: { fetch: databaseFetch },
      },
    ),
  );
  const notifier = createBrevoEmailAdapter(
    {
      apiKey: 'test-api-key',
      sender: 'sender@example.test',
      recipient: 'recipient@example.test',
    },
    providerFetch,
  );
  const service = createEnquiryService(repository, {
    notifier,
    notificationsEnabled: true,
  });

  return { service, databaseFetch, providerFetch, events };
}

describe('enquiry notification workflow integration', () => {
  it('persists before sending and stores the successful outcome', async () => {
    const { service, databaseFetch, providerFetch, events } =
      createWorkflow(201);

    await expect(service.submit(enquiry, keyResult.value)).resolves.toEqual({
      ok: true,
      enquiryId,
      replayed: false,
      notificationStatus: 'sent',
    });

    expect(events).toEqual([
      'persist',
      'status:pending',
      'email',
      'status:sent',
    ]);
    expect(databaseFetch).toHaveBeenCalledTimes(3);
    expect(providerFetch).toHaveBeenCalledOnce();
    expect(JSON.parse(String(providerFetch.mock.calls[0]?.[1]?.body))).toEqual({
      sender: { email: 'sender@example.test' },
      to: [{ email: 'recipient@example.test' }],
      subject: 'New Agrijuune enquiry',
      textContent: expect.stringContaining(`Enquiry ID: ${enquiryId}`),
    });
  });

  it('keeps persistence successful and records failure when the provider rejects', async () => {
    const { service, events } = createWorkflow(503);

    await expect(service.submit(enquiry, keyResult.value)).resolves.toEqual({
      ok: true,
      enquiryId,
      replayed: false,
      notificationStatus: 'failed',
    });

    expect(events).toEqual([
      'persist',
      'status:pending',
      'email',
      'status:failed',
    ]);
  });

  it('does not contact the provider when persistence fails', async () => {
    const { service, providerFetch, events } = createWorkflow(201, 500);

    await expect(service.submit(enquiry, keyResult.value)).resolves.toEqual({
      ok: false,
      reason: 'unavailable',
    });

    expect(events).toEqual(['persist']);
    expect(providerFetch).not.toHaveBeenCalled();
  });
});
