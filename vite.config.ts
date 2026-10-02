import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    target: 'es2022',
    // assets are emitted as files and turned into data: URIs by scripts/inline.mjs — inlining ~100 MB of base64
    // through rollup/esbuild needs > 4 GB RAM
    assetsInlineLimit: 0,
    chunkSizeWarningLimit: 4000,
    rollupOptions: { output: { inlineDynamicImports: true } },
  },
});
