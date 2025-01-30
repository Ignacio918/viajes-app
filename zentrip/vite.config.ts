// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    modules: false,
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://nominatim.openstreetmap.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '^/viator/.*': {
        target: 'https://api.viator.com/partner',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/viator/, ''),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            proxyReq.setHeader('Accept', 'application/json;version=2.0');
            proxyReq.setHeader('Content-Type', 'application/json');
            console.log('Sending Request to Viator:', req.method, req.url, proxyReq.getHeaders());
          });
        },
      }
    },
  },
});