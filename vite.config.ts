import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src/',
      '@components': '/src/components',
      '@scss': '/src/scss',
      '@helpers': '/src/helpers'
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "/src/scss/colors.scss" as *;
          @use "/src/scss/layers.scss" as *;
          @use "/src/scss/animate.scss" as *;
          @use "/src/scss/backgrounds.scss" as *;
        `
      }
    }
  }
})
