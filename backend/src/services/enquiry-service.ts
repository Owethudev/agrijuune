import type {
  EnquiryPersistenceResult,
  EnquiryRepository,
} from '../repositories/enquiry-repository.js';
import type { EnquiryInput } from '../validation/enquiry-validation.js';

export interface EnquiryService {
  submit(input: EnquiryInput): Promise<EnquiryPersistenceResult>;
}

export function createEnquiryService(
  repository: EnquiryRepository,
): EnquiryService {
  return {
    submit: (input) => repository.create(input),
  };
}
