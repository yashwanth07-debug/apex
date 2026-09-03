import { defineConfig } from 'vite';

// GitHub Pages hosts this repo at /apex/; Vercel (VERCEL=1) and any other
// root deployment get '/'. One build, both targets — zero config.
export default defineConfig({
  base: process.env.VERCEL ? '/' : '/apex/',
  build: { target: 'es2022', chunkSizeWarningLimit: 900 },
});
