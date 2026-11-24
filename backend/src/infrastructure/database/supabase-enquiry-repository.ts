import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types.js';
import type {
  EnquiryPersistenceResult,
  EnquiryRepository,
} from '../../repositories/enquiry-repository.js';
import type { EnquiryInput } from '../../validation/enquiry-validation.js';

function toEnquiryInsert(input: EnquiryInput) {
  const record: Database['public']['Tables']['enquiries']['Insert'] = {
    contact_name: input.contactName,
    email: input.email,
    cell_number: input.cellNumber,
    services_of_interest: input.servicesOfInterest,
    notification_status: 'not_configured',
    status: 'new',
  };

  if (input.farmName !== undefined) {
    record.farm_name = input.farmName;
  }

  if (input.farmLocation !== undefined) {
    record.farm_location = input.farmLocation;
  }

  if (input.operationType !== undefined) {
    record.operation_type = input.operationType;
  }

  if (input.machineCountEstimate !== undefined) {
    record.machine_count_estimate = input.machineCountEstimate;
  }

  if (input.additionalMessage !== undefined) {
    record.additional_message = input.additionalMessage;
  }

  return record;
}

export function createSupabaseEnquiryRepository(
  client: SupabaseClient<Database>,
): EnquiryRepository {
  return {
    async create(input): Promise<EnquiryPersistenceResult> {
      try {
        const { data, error } = await client
          .from('enquiries')
          .insert(toEnquiryInsert(input))
          .select('id')
          .single();

        if (error || !data?.id) {
          return { ok: false, reason: 'unavailable' };
        }

        return { ok: true, enquiryId: data.id };
      } catch {
        return { ok: false, reason: 'unavailable' };
      }
    },
  };
}
