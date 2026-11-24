import { createClient } from '@supabase/supabase-js';
import { describe, expect, it, vi } from 'vitest';
import { createSupabaseEnquiryRepository } from '../src/infrastructure/database/supabase-enquiry-repository.js';
import type { Database } from '../src/infrastructure/database/database.types.js';
import {
  hashIdempotencyKey,
  hashIdempotencyRequest,
  validateIdempotencyKey,
} from '../src/validation/idempotency-key.js';
import type { EnquiryInput } from '../src/validation/enquiry-validation.js';

const enquiry: EnquiryInput = {
  contactName: 'Example Contact',
  email: 'contact@example.com',
  cellNumber: '+27 00 000 0000',
  farmName: 'Example Farm',
  farmLocation: 'Gauteng',
  operationType: 'Mixed farming',
  machineCountEstimate: 12,
  servicesOfInterest: ['farm_management_technology'],
  additionalMessage: 'Please contact me about your services.',
};

const acknowledgement = {
  noticeVersion: '1.0',
  acknowledgedAt: '2026-11-24T12:00:00.000Z',
};

function getIdempotencyKey() {
  const result = validateIdempotencyKey('7e5dfc21-574c-4c33-9f7e-477cb2f79ca3');

  if (!result.valid) {
    throw new Error('Test idempotency key is invalid.');
  }

  return result.value;
}

function createTestClient(fetchImplementation: typeof fetch) {
  return createClient<Database>(
    'https://test-project.supabase.co',
    'test-service-role-key',
    {
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: false,
      },
      global: {
        fetch: fetchImplementation,
      },
    },
  );
}

describe('Supabase enquiry repository', () => {
  it('maps validated input to a server-controlled insert and returns safe status', async () => {
    const idempotencyKey = getIdempotencyKey();
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(
        JSON.stringify({
          id: '00000000-0000-0000-0000-000000000001',
          notification_status: 'not_configured',
        }),
        {
          status: 201,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ),
    );
    const repository = createSupabaseEnquiryRepository(
      createTestClient(fetchMock),
    );
    const result = await repository.create(
      enquiry,
      idempotencyKey,
      acknowledgement,
    );

    expect(result).toEqual({
      ok: true,
      enquiryId: '00000000-0000-0000-0000-000000000001',
      replayed: false,
      notificationStatus: 'not_configured',
    });
    expect(fetchMock).toHaveBeenCalledOnce();

    const request = fetchMock.mock.calls[0];

    if (!request) {
      throw new Error('Supabase request was not made.');
    }

    expect(new URL(String(request[0])).pathname).toBe('/rest/v1/enquiries');
    expect(JSON.parse(String(request[1]?.body))).toEqual({
      contact_name: 'Example Contact',
      email: 'contact@example.com',
      cell_number: '+27 00 000 0000',
      farm_name: 'Example Farm',
      farm_location: 'Gauteng',
      operation_type: 'Mixed farming',
      machine_count_estimate: 12,
      services_of_interest: ['farm_management_technology'],
      additional_message: 'Please contact me about your services.',
      privacy_notice_version: '1.0',
      privacy_acknowledged_at: '2026-11-24T12:00:00.000Z',
      notification_status: 'not_configured',
      status: 'new',
      idempotency_key_hash: hashIdempotencyKey(idempotencyKey),
      idempotency_request_hash: hashIdempotencyRequest(enquiry, idempotencyKey),
    });
  });

  it('maps database errors to a safe unavailable result', async () => {
    const idempotencyKey = getIdempotencyKey();
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(
        JSON.stringify({
          code: 'XX000',
          message: 'private database details',
          details: 'sensitive backend data',
        }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      ),
    );
    const repository = createSupabaseEnquiryRepository(
      createTestClient(fetchMock),
    );

    const result = await repository.create(
      enquiry,
      idempotencyKey,
      acknowledgement,
    );

    expect(result).toEqual({ ok: false, reason: 'unavailable' });
    expect(JSON.stringify(result)).not.toContain('private database details');
    expect(JSON.stringify(result)).not.toContain('sensitive backend data');
  });

  it('maps rejected database requests to a safe unavailable result', async () => {
    const idempotencyKey = getIdempotencyKey();
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockRejectedValue(new TypeError('private transport details'));
    const repository = createSupabaseEnquiryRepository(
      createTestClient(fetchMock),
    );

    const result = await repository.create(
      enquiry,
      idempotencyKey,
      acknowledgement,
    );

    expect(result).toEqual({ ok: false, reason: 'unavailable' });
    expect(JSON.stringify(result)).not.toContain('private transport details');
  });

  it('replays the original enquiry when a key and normalized request are repeated', async () => {
    const idempotencyKey = getIdempotencyKey();
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            code: '23505',
            message: 'duplicate key',
          }),
          {
            status: 409,
            headers: { 'Content-Type': 'application/json' },
          },
        ),
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            id: '00000000-0000-0000-0000-000000000001',
            idempotency_request_hash: hashIdempotencyRequest(
              enquiry,
              idempotencyKey,
            ),
            notification_status: 'failed',
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          },
        ),
      );
    const repository = createSupabaseEnquiryRepository(
      createTestClient(fetchMock),
    );

    const result = await repository.create(
      enquiry,
      idempotencyKey,
      acknowledgement,
    );

    expect(result).toEqual({
      ok: true,
      enquiryId: '00000000-0000-0000-0000-000000000001',
      replayed: true,
      notificationStatus: 'failed',
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    const replayLookup = fetchMock.mock.calls[1];

    if (!replayLookup) {
      throw new Error('Idempotency replay lookup was not made.');
    }

    const lookupUrl = new URL(String(replayLookup[0]));
    expect(lookupUrl.searchParams.get('idempotency_key_hash')).toBe(
      `eq.${hashIdempotencyKey(idempotencyKey)}`,
    );
    expect(lookupUrl.searchParams.get('select')).toBe(
      'id,idempotency_request_hash,notification_status',
    );
  });

  it('rejects reuse of a key for a different request', async () => {
    const idempotencyKey = getIdempotencyKey();
    const changedEnquiry = { ...enquiry, farmName: 'Different Farm' };
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            code: '23505',
            message: 'duplicate key',
          }),
          {
            status: 409,
            headers: { 'Content-Type': 'application/json' },
          },
        ),
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            id: '00000000-0000-0000-0000-000000000001',
            idempotency_request_hash: hashIdempotencyRequest(
              enquiry,
              idempotencyKey,
            ),
            notification_status: 'not_configured',
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          },
        ),
      );
    const repository = createSupabaseEnquiryRepository(
      createTestClient(fetchMock),
    );

    const result = await repository.create(
      changedEnquiry,
      idempotencyKey,
      acknowledgement,
    );

    expect(result).toEqual({ ok: false, reason: 'conflict' });
  });

  it('allows an intentional repeat submission with a new key', async () => {
    const firstKey = getIdempotencyKey();
    const secondKeyResult = validateIdempotencyKey(
      '7e5dfc21-574c-4c33-9f7e-477cb2f79ca4',
    );

    if (!secondKeyResult.valid) {
      throw new Error('Second test idempotency key is invalid.');
    }

    const fetchMock = vi
      .fn<typeof fetch>()
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            id: '00000000-0000-0000-0000-000000000001',
            notification_status: 'not_configured',
          }),
          {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
          },
        ),
      )
      .mockResolvedValueOnce(
        new Response(
          JSON.stringify({
            id: '00000000-0000-0000-0000-000000000002',
            notification_status: 'not_configured',
          }),
          {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
          },
        ),
      );
    const repository = createSupabaseEnquiryRepository(
      createTestClient(fetchMock),
    );

    const firstResult = await repository.create(
      enquiry,
      firstKey,
      acknowledgement,
    );
    const secondResult = await repository.create(
      enquiry,
      secondKeyResult.value,
      acknowledgement,
    );

    expect(firstResult).toEqual({
      ok: true,
      enquiryId: '00000000-0000-0000-0000-000000000001',
      replayed: false,
      notificationStatus: 'not_configured',
    });
    expect(secondResult).toEqual({
      ok: true,
      enquiryId: '00000000-0000-0000-0000-000000000002',
      replayed: false,
      notificationStatus: 'not_configured',
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('updates notification status without exposing database errors', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(
        JSON.stringify({ id: '00000000-0000-0000-0000-000000000001' }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        },
      ),
    );
    const repository = createSupabaseEnquiryRepository(
      createTestClient(fetchMock),
    );

    const result = await repository.updateNotificationStatus(
      '00000000-0000-0000-0000-000000000001',
      'sent',
      '2026-11-24T12:00:00.000Z',
    );

    expect(result).toEqual({ ok: true });
    const request = fetchMock.mock.calls[0];

    if (!request) {
      throw new Error('Notification status update was not made.');
    }

    expect(request[1]?.method).toBe('PATCH');
    expect(JSON.parse(String(request[1]?.body))).toEqual({
      notification_status: 'sent',
      notification_attempted_at: '2026-11-24T12:00:00.000Z',
    });
    expect(new URL(String(request[0])).searchParams.get('id')).toBe(
      'eq.00000000-0000-0000-0000-000000000001',
    );
  });

  it('returns a safe failure when notification status cannot be persisted', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(
        JSON.stringify({
          code: 'XX000',
          message: 'private database details',
        }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' },
        },
      ),
    );
    const repository = createSupabaseEnquiryRepository(
      createTestClient(fetchMock),
    );

    const result = await repository.updateNotificationStatus(
      '00000000-0000-0000-0000-000000000001',
      'failed',
      '2026-11-24T12:00:00.000Z',
    );

    expect(result).toEqual({ ok: false });
    expect(JSON.stringify(result)).not.toContain('private database details');
  });
});
