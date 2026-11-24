import { randomUUID } from 'node:crypto';
import type { RequestHandler } from 'express';

declare module 'express-serve-static-core' {
  interface Request {
    requestId: string;
  }

  interface Locals {
    requestId: string;
  }
}

export const requestIdMiddleware: RequestHandler = (
  request,
  response,
  next,
) => {
  const requestId = randomUUID();

  request.requestId = requestId;
  response.locals.requestId = requestId;
  response.setHeader('X-Request-ID', requestId);
  next();
};
