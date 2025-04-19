// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/main.js',
      name: 'McubeTags',
      fileName: (format) => `mcube-tags.${format}.js`,
      formats: ['es'], // use 'es' for module type
    },
    outDir: 'dist',
    rollupOptions: {
      // Externalize dependencies if needed
      external: [],
    },
  },
});
