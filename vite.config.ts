import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  plugins: [vue()],
  // vue-i18n feature flags: the app only uses the Composition API, so the legacy API is
  // tree-shaken out of the bundle.
  define: {
    __VUE_I18N_FULL_INSTALL__: true,
    __VUE_I18N_LEGACY_API__: false,
    __INTLIFY_PROD_DEVTOOLS__: false,
  },
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
