import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const frontendRoot = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(frontendRoot, 'index.html'),
        services: resolve(frontendRoot, 'services/index.html'),
        about: resolve(frontendRoot, 'about/index.html'),
        faq: resolve(frontendRoot, 'faq/index.html'),
      },
    },
  },
});
