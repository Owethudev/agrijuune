import type { Server } from 'node:http';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { app } from './app.js';
import { env } from './config/env.js';

export function closeHttpServer(server: Server) {
  return new Promise<void>((resolveClose, rejectClose) => {
    server.close((error) => {
      if (error) {
        rejectClose(error);
        return;
      }

      resolveClose();
    });
  });
}

export function startServer() {
  const server = app.listen(env.port, () => {
    console.log(`Agrijuune API listening on port ${env.port}.`);
  });

  let shutdownStarted = false;
  const cleanupSignalHandlers = () => {
    process.off('SIGINT', handleSigint);
    process.off('SIGTERM', handleSigterm);
  };
  const shutdown = (signal: NodeJS.Signals) => {
    if (shutdownStarted) {
      return;
    }

    shutdownStarted = true;
    cleanupSignalHandlers();
    console.log(`Received ${signal}; shutting down the API.`);

    void closeHttpServer(server).catch((error: unknown) => {
      console.error(`Failed to shut down the API after ${signal}.`, error);
      process.exitCode = 1;
    });
  };
  const handleSigint = () => shutdown('SIGINT');
  const handleSigterm = () => shutdown('SIGTERM');

  process.once('SIGINT', handleSigint);
  process.once('SIGTERM', handleSigterm);
  server.once('close', cleanupSignalHandlers);

  return server;
}

const entryPoint = process.argv[1];

if (entryPoint && import.meta.url === pathToFileURL(resolve(entryPoint)).href) {
  startServer();
}
