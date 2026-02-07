/* eslint-env node */

/// <reference types="node" />
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  // Carga variables de entorno correctamente
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],

    resolve: {
      caseSensitive: true,
    },

    server: {
      proxy: {
        '/api': {
          target:
            env.VITE_API_URL ||
            'https://jobfinder-backend-production-7244.up.railway.app/api',
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
  }
})
