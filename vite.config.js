import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/My-work/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  build: {
    target: 'es2020',
    modulePreload: {
      polyfill: false
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'vue-vendor': ['vue', 'vue-router']
        }
      }
    }
  },
  css: {
    devSourcemap: false
  }
})
