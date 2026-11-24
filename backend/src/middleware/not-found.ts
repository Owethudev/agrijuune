import type { RequestHandler } from 'express';

export const notFoundMiddleware: RequestHandler = (_request, response) => {
  response.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'The requested resource was not found.',
      details: [],
      requestId: response.locals.requestId,
    },
  });
};
