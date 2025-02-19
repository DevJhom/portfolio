import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: 'http://devjhom.site/',
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
          @import "/src/scss/colors.scss";
          @import "/src/scss/layers.scss";
          @import "/src/scss/animate.scss";
        `
      }
    }
  }
})
