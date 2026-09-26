import { createApp } from 'vue'
import App from './App.vue'
import { i18n } from '@/i18n'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@scss/main.scss'

const app = createApp(App)
app.use(i18n)
app.mount('#app')