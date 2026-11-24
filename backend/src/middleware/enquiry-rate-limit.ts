import { rateLimit } from 'express-rate-limit';
import type { EnquiryRateLimitConfiguration } from '../config/environment.js';
import { sendApiError } from './api-error-response.js';

export function createEnquiryRateLimitMiddleware(
  configuration: EnquiryRateLimitConfiguration,
) {
  return rateLimit({
    windowMs: configuration.windowMs,
    limit: configuration.max,
    standardHeaders: true,
    legacyHeaders: false,
    skip: (request) => request.method !== 'POST',
    handler: (_request, response) =>
      sendApiError(
        response,
        429,
        'RATE_LIMITED',
        'Too many requests. Please try again later.',
      ),
  });
}
