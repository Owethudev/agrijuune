import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types.js';

const ENQUIRY_RETENTION_MS = 7 * 24 * 60 * 60 * 1000;

export async function purgeExpiredEnquiries(
  client: SupabaseClient<Database>,
  now: Date = new Date(),
) {
  const nowMs = now.getTime();

  if (!Number.isFinite(nowMs)) {
    throw new Error('The enquiry retention clock must be a valid date.');
  }

  const cutoff = new Date(nowMs - ENQUIRY_RETENTION_MS).toISOString();
  const { count, error } = await client
    .from('enquiries')
    .delete({ count: 'exact' })
    .lt('created_at', cutoff);

  if (error) {
    throw new Error('Unable to purge expired enquiry records.');
  }

  if (count === null) {
    throw new Error('Supabase did not return the enquiry purge count.');
  }

  return count;
}
