import { defineConfig } from 'vite'

export default defineConfig({
  base: '/MatrixCipher/',  // Dies muss der Name deines GitHub-Repositories sein
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true
  },
  server: {
    port: 5173
  }
})