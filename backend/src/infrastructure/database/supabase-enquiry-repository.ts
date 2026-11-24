import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './database.types.js';
import type {
  EnquiryNotificationStatus,
  EnquiryNotificationUpdateResult,
  EnquiryPersistenceResult,
  EnquiryRepository,
} from '../../repositories/enquiry-repository.js';
import {
  hashIdempotencyKey,
  hashIdempotencyRequest,
} from '../../validation/idempotency-key.js';
import type { EnquiryInput } from '../../validation/enquiry-validation.js';

function toEnquiryInsert(
  input: EnquiryInput,
  keyHash: string,
  requestHash: string,
) {
  const record: Database['public']['Tables']['enquiries']['Insert'] = {
    contact_name: input.contactName,
    email: input.email,
    cell_number: input.cellNumber,
    services_of_interest: input.servicesOfInterest,
    notification_status: 'not_configured',
    status: 'new',
    idempotency_key_hash: keyHash,
    idempotency_request_hash: requestHash,
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

async function insertEnquiry(
  client: SupabaseClient<Database>,
  record: Database['public']['Tables']['enquiries']['Insert'],
) {
  try {
    return {
      ok: true as const,
      response: await client
        .from('enquiries')
        .insert(record)
        .select('id,notification_status')
        .single(),
    };
  } catch {
    return { ok: false as const };
  }
}

async function findExistingEnquiry(
  client: SupabaseClient<Database>,
  keyHash: string,
) {
  try {
    return {
      ok: true as const,
      response: await client
        .from('enquiries')
        .select('id,idempotency_request_hash,notification_status')
        .eq('idempotency_key_hash', keyHash)
        .maybeSingle(),
    };
  } catch {
    return { ok: false as const };
  }
}

async function updateEnquiryNotificationStatus(
  client: SupabaseClient<Database>,
  enquiryId: string,
  status: EnquiryNotificationStatus,
  attemptedAt: string | null,
): Promise<EnquiryNotificationUpdateResult> {
  try {
    const { data, error } = await client
      .from('enquiries')
      .update({
        notification_status: status,
        notification_attempted_at: attemptedAt,
      })
      .eq('id', enquiryId)
      .select('id')
      .maybeSingle();

    if (error || !data?.id) {
      return { ok: false };
    }

    return { ok: true };
  } catch {
    return { ok: false };
  }
}

export function createSupabaseEnquiryRepository(
  client: SupabaseClient<Database>,
): EnquiryRepository {
  return {
    async create(input, idempotencyKey): Promise<EnquiryPersistenceResult> {
      const keyHash = hashIdempotencyKey(idempotencyKey);
      const requestHash = hashIdempotencyRequest(input, idempotencyKey);
      const insert = await insertEnquiry(
        client,
        toEnquiryInsert(input, keyHash, requestHash),
      );

      if (!insert.ok) {
        return { ok: false, reason: 'unavailable' };
      }

      const { data, error } = insert.response;

      if (!error && data?.id && data.notification_status) {
        return {
          ok: true,
          enquiryId: data.id,
          replayed: false,
          notificationStatus: data.notification_status,
        };
      }

      if (error?.code !== '23505') {
        return { ok: false, reason: 'unavailable' };
      }

      const lookup = await findExistingEnquiry(client, keyHash);

      if (!lookup.ok) {
        return { ok: false, reason: 'unavailable' };
      }

      const { data: existing, error: lookupError } = lookup.response;

      if (
        lookupError ||
        !existing?.id ||
        !existing.idempotency_request_hash ||
        !existing.notification_status
      ) {
        return { ok: false, reason: 'unavailable' };
      }

      if (existing.idempotency_request_hash !== requestHash) {
        return { ok: false, reason: 'conflict' };
      }

      return {
        ok: true,
        enquiryId: existing.id,
        replayed: true,
        notificationStatus: existing.notification_status,
      };
    },
    updateNotificationStatus: (enquiryId, status, attemptedAt) =>
      updateEnquiryNotificationStatus(client, enquiryId, status, attemptedAt),
  };
}
