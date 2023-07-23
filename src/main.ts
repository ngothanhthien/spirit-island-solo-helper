import './assets/style.css'

import { createApp } from 'vue'
import { registerSW } from 'virtual:pwa-register'

import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'

registerSW({ immediate: true })
const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then((registration) => {
    registration.addEventListener('updatefound', () => {
      app.config.globalProperties.$swUpdated = true
    })
  })
}

app.mount('#app')
