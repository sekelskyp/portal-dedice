/// <reference types="vitest" />
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000,
    proxy: {
      // Proxy `/files` to the backend on port 4000
      '/files': {
        target: 'http://localhost:4000', // Backend server
        changeOrigin: true, // Adjust the origin to match the target
        secure: false, // For development only (disable SSL verification)
      },
    },
  },
  build: {
    outDir: 'build',
    copyPublicDir: false,
  },
  resolve: {
    alias: {
      // These must be kept in sync with tsconfig.json!
      '@frontend': resolve(__dirname, './src'),
      '@shared': resolve(__dirname, '../shared/src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
  },
})
