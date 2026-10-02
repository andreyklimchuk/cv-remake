import { defineConfig } from 'vite';
export default defineConfig({ base: './', build: { assetsDir: 'js', chunkSizeWarningLimit: 2000 } });
