import express from 'express';
import { errorHandler } from './middleware/error-handler.js';
import { notFoundMiddleware } from './middleware/not-found.js';
import { requestIdMiddleware } from './middleware/request-id.js';

export const app = express();

app.use(requestIdMiddleware);

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
