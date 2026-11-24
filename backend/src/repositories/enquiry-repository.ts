import type { EnquiryInput } from '../validation/enquiry-validation.js';
import type { IdempotencyKey } from '../validation/idempotency-key.js';

export type EnquiryPersistenceResult =
  | { ok: true; enquiryId: string; replayed: boolean }
  | { ok: false; reason: 'conflict' | 'unavailable' };

export interface EnquiryRepository {
  create(
    input: EnquiryInput,
    idempotencyKey: IdempotencyKey,
  ): Promise<EnquiryPersistenceResult>;
}
