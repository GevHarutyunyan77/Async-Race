import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Async-Race/',
  plugins: [react()],
  server: {
    proxy: {
      '/garage': 'http://127.0.0.1:3000',
      '/engine': 'http://127.0.0.1:3000',
      '/winners': 'http://127.0.0.1:3000',
    },
  },
});
