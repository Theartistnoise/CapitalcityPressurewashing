import { defineConfig } from 'vite';

// index.html is the entry; the other pages live in /public and are copied as-is.
export default defineConfig({
  build: { outDir: 'dist' },
});
