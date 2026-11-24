import type { RequestHandler } from 'express';
import { sendApiError } from './api-error-response.js';
import {
  CORS_METHODS_HEADER,
  CORS_METHOD_SET,
  HTTP_METHODS_HEADER,
} from './request-policy.js';

const ALLOWED_HEADERS = new Set(['content-type']);

export function createCorsMiddleware(
  frontendOrigin: string | undefined,
): RequestHandler {
  return (request, response, next) => {
    const origin = request.get('Origin');

    if (!origin) {
      return next();
    }

    response.vary('Origin');

    if (!frontendOrigin || origin !== frontendOrigin) {
      return sendApiError(
        response,
        403,
        'ORIGIN_NOT_ALLOWED',
        'This origin is not allowed.',
      );
    }

    response.set('Access-Control-Allow-Origin', frontendOrigin);

    if (request.method !== 'OPTIONS') {
      return next();
    }

    response.vary('Access-Control-Request-Method');
    response.vary('Access-Control-Request-Headers');

    const requestedMethod = request
      .get('Access-Control-Request-Method')
      ?.toUpperCase();

    if (requestedMethod && !CORS_METHOD_SET.has(requestedMethod)) {
      response.set('Allow', HTTP_METHODS_HEADER);
      return sendApiError(
        response,
        405,
        'METHOD_NOT_ALLOWED',
        'The requested method is not allowed.',
      );
    }

    const requestedHeaders = request
      .get('Access-Control-Request-Headers')
      ?.split(',')
      .map((header) => header.trim().toLowerCase())
      .filter(Boolean);

    if (requestedHeaders?.some((header) => !ALLOWED_HEADERS.has(header))) {
      return sendApiError(
        response,
        403,
        'ORIGIN_NOT_ALLOWED',
        'This origin is not allowed.',
      );
    }

    response.set('Access-Control-Allow-Methods', CORS_METHODS_HEADER);

    if (requestedHeaders?.length) {
      response.set('Access-Control-Allow-Headers', 'Content-Type');
    }

    response.set('Access-Control-Max-Age', '600');
    return response.status(204).end();
  };
}
