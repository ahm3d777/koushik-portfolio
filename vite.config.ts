import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  build: {
    // No manualChunks here on purpose. Forcing three.js/@react-three into a
    // single named vendor chunk (the previous config) made Rollup hoist a
    // few of that chunk's shared runtime helpers into chunks that DON'T
    // actually need three.js at runtime — including the app's own entry
    // chunk, which ended up with a *static* `import ... from "./three-*.js"`
    // at the top level. That single static edge silently defeated every
    // route-level React.lazy() in the app: the ~1MB three.js chunk was
    // being fetched on every single page load (Home included), regardless
    // of whether a 3D scene ever rendered. Leaving chunking to Rollup's
    // default algorithm lets it split strictly along the real dynamic
    // import() boundaries (App.tsx's page-level lazy() calls, plus
    // GeometricSculpture's own lazy() inside Home), so three.js is only
    // ever fetched by a page/component that actually mounts a <Canvas>.
  },
});
