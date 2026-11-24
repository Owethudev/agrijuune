import { createClient } from '@supabase/supabase-js';
import { describe, expect, it, vi } from 'vitest';
import { createSupabaseEnquiryRepository } from '../src/infrastructure/database/supabase-enquiry-repository.js';
import { createEnquiryService } from '../src/services/enquiry-service.js';
import type { Database } from '../src/infrastructure/database/database.types.js';
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
  it('maps validated input to a server-controlled insert and returns only its ID', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(
        JSON.stringify({ id: '00000000-0000-0000-0000-000000000001' }),
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
    const service = createEnquiryService(repository);

    const result = await service.submit(enquiry);

    expect(result).toEqual({
      ok: true,
      enquiryId: '00000000-0000-0000-0000-000000000001',
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
      notification_status: 'not_configured',
      status: 'new',
    });
  });

  it('maps database errors to a safe unavailable result', async () => {
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

    const result = await repository.create(enquiry);

    expect(result).toEqual({ ok: false, reason: 'unavailable' });
    expect(JSON.stringify(result)).not.toContain('private database details');
    expect(JSON.stringify(result)).not.toContain('sensitive backend data');
  });

  it('maps rejected database requests to a safe unavailable result', async () => {
    const fetchMock = vi
      .fn<typeof fetch>()
      .mockRejectedValue(new TypeError('private transport details'));
    const repository = createSupabaseEnquiryRepository(
      createTestClient(fetchMock),
    );

    const result = await repository.create(enquiry);

    expect(result).toEqual({ ok: false, reason: 'unavailable' });
    expect(JSON.stringify(result)).not.toContain('private transport details');
  });
});
