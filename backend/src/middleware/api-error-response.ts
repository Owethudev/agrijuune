import type { Response } from 'express';

export type ApiErrorCode =
  | 'IDEMPOTENCY_CONFLICT'
  | 'IDEMPOTENCY_KEY_REQUIRED'
  | 'INTERNAL_ERROR'
  | 'INVALID_IDEMPOTENCY_KEY'
  | 'INVALID_ENQUIRY'
  | 'INVALID_JSON'
  | 'METHOD_NOT_ALLOWED'
  | 'NOT_FOUND'
  | 'ORIGIN_NOT_ALLOWED'
  | 'PAYLOAD_TOO_LARGE'
  | 'RATE_LIMITED'
  | 'SERVICE_UNAVAILABLE'
  | 'UNSUPPORTED_MEDIA_TYPE';

export function sendApiError(
  response: Response,
  status: number,
  code: ApiErrorCode,
  message: string,
  details: readonly Readonly<{
    field: string;
    code: string;
    message: string;
  }>[] = [],
) {
  return response.status(status).json({
    success: false,
    error: {
      code,
      message,
      details,
      requestId: response.locals.requestId,
    },
  });
}
