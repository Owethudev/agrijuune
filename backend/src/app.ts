import express from 'express';
import { env } from './config/env.js';
import { createCorsMiddleware } from './middleware/cors.js';
import { createEnquiryRateLimitMiddleware } from './middleware/enquiry-rate-limit.js';
import { errorHandler } from './middleware/error-handler.js';
import { notFoundMiddleware } from './middleware/not-found.js';
import { requestIdMiddleware } from './middleware/request-id.js';
import { requestControlsMiddleware } from './middleware/request-controls.js';
import { createSecurityHeadersMiddleware } from './middleware/security-headers.js';

export const app = express();

app.disable('x-powered-by');
// Trust only Render's single ingress proxy so rate limits use the client IP.
app.set('trust proxy', env.nodeEnv === 'production' ? 1 : false);
app.use(requestIdMiddleware);
app.use(createSecurityHeadersMiddleware(env.nodeEnv === 'production'));
app.use(createCorsMiddleware(env.frontendOrigin));
app.use(
  '/api/v1/enquiries',
  createEnquiryRateLimitMiddleware(env.enquiryRateLimit),
);
app.use(requestControlsMiddleware);
app.use(express.json({ limit: '10kb' }));

app.get('/api/health', (_request, response) => {
  response.status(200).json({
    success: true,
    data: {
      status: 'ok',
    },
  });
});

app.use(notFoundMiddleware);
app.use(errorHandler);
