import { createClient } from '@supabase/supabase-js';
import { describe, expect, it, vi } from 'vitest';
import type { Database } from '../src/infrastructure/database/database.types.js';
import { purgeExpiredEnquiries } from '../src/infrastructure/database/supabase-enquiry-retention.js';

describe('enquiry retention purge', () => {
  it('deletes only records older than seven days and returns the count', async () => {
    const fetchMock = vi.fn<typeof fetch>().mockResolvedValue(
      new Response(null, {
        status: 204,
        headers: { 'Content-Range': '*/3' },
      }),
    );
    const client = createClient<Database>(
      'https://test-project.supabase.co',
      'test-service-role-key',
      {
        auth: {
          autoRefreshToken: false,
          detectSessionInUrl: false,
          persistSession: false,
        },
        global: { fetch: fetchMock },
      },
    );
    const now = new Date('2026-11-24T12:00:00.000Z');

    await expect(purgeExpiredEnquiries(client, now)).resolves.toBe(3);

    expect(fetchMock).toHaveBeenCalledOnce();
    const request = fetchMock.mock.calls[0];
    if (!request) {
      throw new Error('Supabase request was not made.');
    }

    const url = new URL(String(request[0]));
    expect(url.pathname).toBe('/rest/v1/enquiries');
    expect(url.searchParams.get('created_at')).toBe(
      'lt.2026-11-17T12:00:00.000Z',
    );
    expect(request[1]?.method).toBe('DELETE');
  });

  it('fails explicitly when the retention clock is invalid', async () => {
    const client = createClient<Database>(
      'https://test-project.supabase.co',
      'test-service-role-key',
    );

    await expect(
      purgeExpiredEnquiries(client, new Date(Number.NaN)),
    ).rejects.toThrow('The enquiry retention clock must be a valid date.');
  });
});
