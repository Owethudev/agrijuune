import type { ErrorRequestHandler } from 'express';

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

  console.error('Unhandled API error.', {
    requestId: request.requestId,
    method: request.method,
    errorName: error instanceof Error ? error.name : 'UnknownError',
  });

  response.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_ERROR',
      message: 'An unexpected error occurred.',
      details: [],
      requestId: request.requestId,
    },
  });
};
