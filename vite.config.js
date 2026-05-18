import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  base: '/My-work/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
