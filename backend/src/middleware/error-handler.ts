import type { ErrorRequestHandler } from 'express';
import { sendApiError } from './api-error-response.js';

function getJsonBodyError(error: unknown) {
  if (!error || typeof error !== 'object' || !('type' in error)) {
    return undefined;
  }

  if (error.type === 'entity.too.large') {
    return {
      status: 413,
      code: 'PAYLOAD_TOO_LARGE' as const,
      message: 'The request body exceeds the allowed size.',
    };
  }

  if (error.type === 'entity.parse.failed') {
    return {
      status: 400,
      code: 'INVALID_JSON' as const,
      message: 'The request body must contain valid JSON.',
    };
  }

  return undefined;
}

export const errorHandler: ErrorRequestHandler = (
  error,
  request,
  response,
  next,
) => {
  if (response.headersSent) {
    next(error);
    return;
  }

  const jsonBodyError = getJsonBodyError(error);

  if (jsonBodyError) {
    sendApiError(
      response,
      jsonBodyError.status,
      jsonBodyError.code,
      jsonBodyError.message,
    );
    return;
  }

  console.error('Unhandled API error.', {
    requestId: request.requestId,
    method: request.method,
    errorName: error instanceof Error ? error.name : 'UnknownError',
  });

  sendApiError(
    response,
    500,
    'INTERNAL_ERROR',
    'An unexpected error occurred.',
  );
};
