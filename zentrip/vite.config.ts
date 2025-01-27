import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // Esto hace que '@' apunte a la carpeta 'src'
    },
  },
  css: {
    modules: false,
  }
});