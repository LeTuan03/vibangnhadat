import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
    // Enable HMR for smooth hot module replacement
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
    },
  },
  build: {
    // Optimize build output
    rollupOptions: {
      output: {
        // Code splitting for better caching
        manualChunks: {
          'vendor': [
            'react',
            'react-dom',
            'react-router-dom',
          ],
          'icons': [
            'react-icons',
          ],
          'notifications': [
            'react-toastify',
          ],
        },
      },
    },
    // Optimize CSS code splitting
    cssCodeSplit: true,
    // Source maps for production debugging
    sourcemap: false,
    // Minify with esbuild (default, no need to install)
    minify: 'esbuild',
  },
})
