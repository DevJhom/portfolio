import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/dev-jhom/',
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src/',
      '@components': '/src/components',
      '@scss': '/src/scss',
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "/src/scss/colors.scss";
          @import "/src/scss/layers.scss";
        `
      }
    }
  }
})
