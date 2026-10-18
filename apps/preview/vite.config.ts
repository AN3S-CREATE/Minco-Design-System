import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const root = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@minco/components': resolve(root, '../../packages/components/src/index.ts'),
      '@minco/tokens/css': resolve(root, '../../packages/tokens/src/tokens.css'),
      '@minco/tokens': resolve(root, '../../packages/tokens/src/index.ts'),
    },
  },
  server: {
    port: 5173,
    open: false,
  },
});
