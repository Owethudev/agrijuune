import type { EnquiryInput } from '../validation/enquiry-validation.js';

export type EnquiryPersistenceResult =
  { ok: true; enquiryId: string } | { ok: false; reason: 'unavailable' };

export interface EnquiryRepository {
  create(input: EnquiryInput): Promise<EnquiryPersistenceResult>;
}
