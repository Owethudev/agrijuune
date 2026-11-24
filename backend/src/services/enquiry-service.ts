import type {
  EnquiryPersistenceResult,
  EnquiryRepository,
} from '../repositories/enquiry-repository.js';
import type { EnquiryInput } from '../validation/enquiry-validation.js';
import type { IdempotencyKey } from '../validation/idempotency-key.js';

export interface EnquiryService {
  submit(
    input: EnquiryInput,
    idempotencyKey: IdempotencyKey,
  ): Promise<EnquiryPersistenceResult>;
}

export function createEnquiryService(
  repository: EnquiryRepository,
): EnquiryService {
  return {
    submit: (input, idempotencyKey) => repository.create(input, idempotencyKey),
  };
}
