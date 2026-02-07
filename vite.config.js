import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';


export default defineConfig({
  plugins: [react()],

    resolve: {
    caseSensitive: true
  },

  server: {
    proxy: {
      '/api': {
        target: import.meta.env.VITE_API_URL || 'https://jobfinder-backend-production-7244.up.railway.app/api',
        changeOrigin: true,
        secure: false,
      },
    },
  },

  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
  },
});
