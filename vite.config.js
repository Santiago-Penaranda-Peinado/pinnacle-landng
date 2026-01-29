import { defineConfig } from "vite";

export default defineConfig({
  css: {
    devSourcemap: true, // Enable CSS source maps to see original SCSS line numbers
  },
  server: {
    host: true, // Expose to network (needed for Docker)
    watch: {
      usePolling: true, // Poll for changes (needed for Docker on Windows to trigger HMR)
    },
  },
});
