import type { RequestHandler } from 'express';

export function createSecurityHeadersMiddleware(
  production: boolean,
): RequestHandler {
  return (_request, response, next) => {
    response.set({
      'Content-Security-Policy':
        "default-src 'none'; base-uri 'none'; frame-ancestors 'none'",
      'Cross-Origin-Resource-Policy': 'same-origin',
      'Referrer-Policy': 'no-referrer',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-Permitted-Cross-Domain-Policies': 'none',
    });

    if (production) {
      response.set('Strict-Transport-Security', 'max-age=31536000');
    }

    next();
  };
}
