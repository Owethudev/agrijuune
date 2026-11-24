import type { RequestHandler } from 'express';
import { sendApiError } from './api-error-response.js';

export const notFoundMiddleware: RequestHandler = (_request, response) =>
  sendApiError(
    response,
    404,
    'NOT_FOUND',
    'The requested resource was not found.',
  );
