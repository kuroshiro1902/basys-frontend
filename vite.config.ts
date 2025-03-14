import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
  define: {
    'process.env': process.env
  },
  build: {
    outDir: 'dist'
  },
  resolve: {
    alias: [
      { find: '@', replacement: '/src' }
    ]
  },
  server: {
    port: 5602,
    // proxy: {
    //   '/api/v1': {
    //     target: 'https://guide.edu.abp.vn',
    //     // target: 'http://26.30.12.9:9095',
    //     // target: 'http://26.221.207.60:9095',
    //     // target: 'http://26.136.15.67:9095',
    //     changeOrigin: true
    //   }
    // }
  }
});