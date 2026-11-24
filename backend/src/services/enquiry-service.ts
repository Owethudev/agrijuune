import type {
  EnquiryNotificationStatus,
  EnquiryPersistenceResult,
  EnquiryPrivacyAcknowledgement,
  EnquiryRepository,
} from '../repositories/enquiry-repository.js';
import type { EnquiryInput } from '../validation/enquiry-validation.js';
import type { IdempotencyKey } from '../validation/idempotency-key.js';

export type EnquiryNotificationMessage = Readonly<{
  subject: string;
  textContent: string;
}>;

export type EnquiryNotificationResult = Readonly<{
  status: 'sent' | 'failed' | 'not_configured';
}>;

export interface EnquiryNotifier {
  send(message: EnquiryNotificationMessage): Promise<EnquiryNotificationResult>;
}

export type EnquiryServiceOptions = Readonly<{
  notifier: EnquiryNotifier;
  notificationsEnabled: boolean;
}>;

export interface EnquiryService {
  submit(
    input: EnquiryInput,
    idempotencyKey: IdempotencyKey,
    acknowledgement: EnquiryPrivacyAcknowledgement,
  ): Promise<EnquiryPersistenceResult>;
}

export function createEnquiryService(
  repository: EnquiryRepository,
  options: EnquiryServiceOptions,
): EnquiryService {
  return {
    async submit(
      input,
      idempotencyKey,
      acknowledgement,
    ): Promise<EnquiryPersistenceResult> {
      const persisted = await repository.create(
        input,
        idempotencyKey,
        acknowledgement,
      );

      if (
        !persisted.ok ||
        persisted.replayed ||
        !options.notificationsEnabled
      ) {
        return persisted;
      }

      const pending = await repository.updateNotificationStatus(
        persisted.enquiryId,
        'pending',
        null,
      );

      if (!pending.ok) {
        console.error('Unable to mark enquiry notification as pending.', {
          enquiryId: persisted.enquiryId,
        });
        return persisted;
      }

      let notificationStatus: EnquiryNotificationStatus;
      const attemptedAt = new Date().toISOString();

      try {
        const notification = await options.notifier.send(
          toNotificationMessage(input, persisted.enquiryId),
        );
        notificationStatus = notification.status;
      } catch (error) {
        console.error('Enquiry notification request failed unexpectedly.', {
          enquiryId: persisted.enquiryId,
          errorName: error instanceof Error ? error.name : 'UnknownError',
        });
        notificationStatus = 'failed';
      }

      const recorded = await repository.updateNotificationStatus(
        persisted.enquiryId,
        notificationStatus,
        notificationStatus === 'not_configured' ? null : attemptedAt,
      );

      if (!recorded.ok) {
        console.error('Unable to record enquiry notification status.', {
          enquiryId: persisted.enquiryId,
          notificationStatus,
        });
        return { ...persisted, notificationStatus: 'pending' };
      }

      return { ...persisted, notificationStatus };
    },
  };
}

function toNotificationMessage(
  input: EnquiryInput,
  enquiryId: string,
): EnquiryNotificationMessage {
  return {
    subject: 'New Agrijuune enquiry',
    textContent: [
      `Enquiry ID: ${enquiryId}`,
      `Contact name: ${input.contactName}`,
      `Email: ${input.email}`,
      `Cell number: ${input.cellNumber}`,
      `Services: ${input.servicesOfInterest.join(', ')}`,
    ].join('\n'),
  };
}
