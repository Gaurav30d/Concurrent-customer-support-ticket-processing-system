import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: '.',
  define: {
    global: 'window'
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true
      },
      '/ws': {
        target: 'http://localhost:8080',
        ws: true,
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: process.env.BUILD_SPRING ? path.resolve(__dirname, '../src/main/resources/static') : 'dist',
    emptyOutDir: true
  }
});
