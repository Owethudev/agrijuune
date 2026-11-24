import { createClient } from '@supabase/supabase-js';
import type { SupabaseConfiguration } from '../../config/environment.js';
import type { Database } from './database.types.js';

export function createServerSupabaseClient(
  configuration: SupabaseConfiguration,
) {
  return createClient<Database>(
    configuration.url,
    configuration.serviceRoleKey,
    {
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: false,
      },
    },
  );
}
