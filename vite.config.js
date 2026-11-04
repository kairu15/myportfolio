import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Assets default to the domain root, which is what Render (and Vercel/Netlify)
// serve. Deploying under a subpath (GitHub Pages project sites) is supported by
// setting VITE_BASE, e.g. VITE_BASE=/my-repo/ npm run build.
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || '/',
  server: {
    // 5173 is used by another local project, so the dev server is pinned here.
    // strictPort makes Vite exit with an error instead of silently moving to
    // the next free port. Production builds are unaffected.
    port: 2005,
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    target: 'es2020',
    sourcemap: false,
  },
});
