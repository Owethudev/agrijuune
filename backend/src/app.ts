import express from 'express';

export const app = express();

app.get('/api/health', (_request, response) => {
  response.status(200).json({
    success: true,
    data: {
      status: 'ok',
    },
  });
});
