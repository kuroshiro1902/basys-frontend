import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import * as path from 'node:path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
  define: {
    'process.env': process.env,
  },
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5173,
    // proxy: {
    //   '/api/v1': {
    //     // target: 'http://26.30.12.9:9095',
    //     // target: 'http://26.221.207.60:9095',
    //     // target: 'http://26.136.15.67:9095',
    //     changeOrigin: true
    //   }
    // }
  },
});
