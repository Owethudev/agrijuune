import type { EnquiryInput } from '../validation/enquiry-validation.js';
import type { IdempotencyKey } from '../validation/idempotency-key.js';

export type EnquiryPersistenceResult =
  | {
      ok: true;
      enquiryId: string;
      replayed: boolean;
      notificationStatus: EnquiryNotificationStatus;
    }
  | { ok: false; reason: 'conflict' | 'unavailable' };

export type EnquiryNotificationStatus =
  'pending' | 'sent' | 'failed' | 'not_configured';

export type EnquiryNotificationUpdateResult = { ok: true } | { ok: false };

export interface EnquiryRepository {
  create(
    input: EnquiryInput,
    idempotencyKey: IdempotencyKey,
  ): Promise<EnquiryPersistenceResult>;
  updateNotificationStatus(
    enquiryId: string,
    status: EnquiryNotificationStatus,
    attemptedAt: string | null,
  ): Promise<EnquiryNotificationUpdateResult>;
}
