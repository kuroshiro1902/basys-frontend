import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig, loadEnv } from 'vite';
import * as path from 'node:path';

export default defineConfig(({ mode }) => { // mode from vite params
  const env = loadEnv(mode, process.cwd(), ''); // load env from .env.<mode> file
 
  return {
    plugins: [react(), tailwindcss()],
    base: './',
    build: {
      outDir: 'build',
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: env.API_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
