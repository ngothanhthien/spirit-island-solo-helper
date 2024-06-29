import './assets/style.css'
import './assets/icon.css'
import '@khmyznikov/pwa-install'

import { createApp } from 'vue'
import { registerSW } from 'virtual:pwa-register'

import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import { useMessageStore } from './stores/MessageStore'
import axios from 'axios'
import VueAxios from 'vue-axios'

registerSW({ immediate: true })
const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(VueAxios, axios)
app.use(router)

app.config.errorHandler = (err, vm, info) => {
  useMessageStore().setMessage('Error occur, Please contact developer!')
  if (import.meta.env.VITE_APP_ENVIRONMENT !== 'production') {
    console.error(err, vm, info)
  }
}

app.config.warnHandler = (msg) => {
  console.log(msg)
}

app.config.performance = !(import.meta.env.VITE_APP_ENVIRONMENT === 'production')

window.addEventListener(
  'contextmenu',
  function (e) {
    e.preventDefault()
  },
  false
)

app.mount('#app')
