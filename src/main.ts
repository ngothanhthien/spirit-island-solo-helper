import './assets/style.css'

import { createApp } from 'vue'
import { registerSW } from 'virtual:pwa-register'

import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { firebaseApp } from './plugins/firebase'
import App from './App.vue'
import { VueFire } from 'vuefire'

registerSW({ immediate: true })
const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)
app.use(VueFire, {
  firebaseApp,
  modules: [],
})

window.addEventListener('contextmenu', function (e) { 
  e.preventDefault(); 
}, false);

app.mount('#app')
