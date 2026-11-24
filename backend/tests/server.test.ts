import type { Server } from 'node:http';
import { describe, expect, it } from 'vitest';
import { app } from '../src/app.js';
import { closeHttpServer } from '../src/server.js';

async function listen() {
  const server = app.listen(0, '127.0.0.1');
  await new Promise<void>((resolve, reject) => {
    server.once('listening', resolve);
    server.once('error', reject);
  });

  const address = server.address();

  if (!address || typeof address === 'string') {
    await closeHttpServer(server);
    throw new Error('Test server did not bind to a TCP port.');
  }

  return {
    server,
    origin: `http://127.0.0.1:${address.port}`,
  };
}

async function close(server: Server) {
  if (server.listening) {
    await closeHttpServer(server);
  }
}

describe('backend server', () => {
  it('returns only the documented safe health status', async () => {
    const { server, origin } = await listen();

    try {
      const response = await fetch(`${origin}/api/health`);

      expect(response.status).toBe(200);
      expect(await response.json()).toEqual({
        success: true,
        data: {
          status: 'ok',
        },
      });
    } finally {
      await close(server);
    }
  });

  it('stops accepting requests after graceful shutdown', async () => {
    const { server, origin } = await listen();
    await closeHttpServer(server);

    expect(server.listening).toBe(false);
    await expect(
      fetch(`${origin}/api/health`, {
        signal: AbortSignal.timeout(1000),
      }),
    ).rejects.toThrow();
  });
});
