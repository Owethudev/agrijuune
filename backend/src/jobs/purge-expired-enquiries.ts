import 'dotenv/config';
import {
  parseBooleanSetting,
  parseSupabaseConfiguration,
} from '../config/environment.js';
import { createServerSupabaseClient } from '../infrastructure/database/supabase-client.js';
import { purgeExpiredEnquiries } from '../infrastructure/database/supabase-enquiry-retention.js';

const supabase = parseSupabaseConfiguration(
  process.env,
  process.env.NODE_ENV === 'production',
);

if (!parseBooleanSetting(process.env, 'ENQUIRY_RETENTION_PURGE_ENABLED')) {
  throw new Error(
    'Set ENQUIRY_RETENTION_PURGE_ENABLED=true to run the enquiry purge.',
  );
}

if (!supabase) {
  throw new Error('Supabase must be configured to purge expired enquiries.');
}

const deletedCount = await purgeExpiredEnquiries(
  createServerSupabaseClient(supabase),
);

console.info(`Purged ${deletedCount} expired enquiry record(s).`);
