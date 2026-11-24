import { Router } from 'express';
import type { EnquiryPrivacyAcknowledgement } from '../repositories/enquiry-repository.js';
import type { EnquiryService } from '../services/enquiry-service.js';
import { validateEnquiryRequest } from '../validation/enquiry-validation.js';
import { validateIdempotencyKey } from '../validation/idempotency-key.js';
import { sendApiError } from '../middleware/api-error-response.js';

const PRIVACY_NOTICE_VERSION = '1.0';

export function createEnquiryRouter(service: EnquiryService) {
  const router = Router();

  router.post('/', async (request, response, next) => {
    const validation = validateEnquiryRequest(request.body);

    if (!validation.valid) {
      return sendApiError(
        response,
        400,
        'INVALID_ENQUIRY',
        'Review the highlighted fields and try again.',
        validation.errors,
      );
    }

    const idempotencyKey = validateIdempotencyKey(
      request.get('Idempotency-Key'),
    );

    if (!idempotencyKey.valid) {
      return sendApiError(
        response,
        400,
        idempotencyKey.reason === 'required'
          ? 'IDEMPOTENCY_KEY_REQUIRED'
          : 'INVALID_IDEMPOTENCY_KEY',
        idempotencyKey.reason === 'required'
          ? 'An Idempotency-Key header is required.'
          : 'The Idempotency-Key header must be a UUID v4.',
      );
    }

    const acknowledgement: EnquiryPrivacyAcknowledgement = {
      noticeVersion: PRIVACY_NOTICE_VERSION,
      acknowledgedAt: new Date().toISOString(),
    };

    try {
      const result = await service.submit(
        validation.value,
        idempotencyKey.value,
        acknowledgement,
      );

      if (!result.ok) {
        return result.reason === 'conflict'
          ? sendApiError(
              response,
              409,
              'IDEMPOTENCY_CONFLICT',
              'This submission key was already used for different enquiry details.',
            )
          : sendApiError(
              response,
              503,
              'SERVICE_UNAVAILABLE',
              'Your enquiry could not be saved. Please try again later.',
            );
      }

      return response.status(result.replayed ? 200 : 201).json({
        success: true,
        data: {
          enquiryId: result.enquiryId,
          notificationStatus: result.notificationStatus,
        },
      });
    } catch (error) {
      next(error);
      return undefined;
    }
  });

  return router;
}
