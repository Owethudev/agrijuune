import type { RequestHandler } from 'express';
import { sendApiError } from './api-error-response.js';
import { HTTP_METHODS, HTTP_METHODS_HEADER } from './request-policy.js';

export const requestControlsMiddleware: RequestHandler = (
  request,
  response,
  next,
) => {
  if (!HTTP_METHODS.has(request.method)) {
    response.set('Allow', HTTP_METHODS_HEADER);
    return sendApiError(
      response,
      405,
      'METHOD_NOT_ALLOWED',
      'The requested method is not allowed.',
    );
  }

  if (request.method === 'POST' && !request.is('application/json')) {
    return sendApiError(
      response,
      415,
      'UNSUPPORTED_MEDIA_TYPE',
      'The request content type must be application/json.',
    );
  }

  return next();
};
