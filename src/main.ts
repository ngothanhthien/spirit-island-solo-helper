import './assets/style.css'

import { createApp } from 'vue'
import { registerSW } from 'virtual:pwa-register'

import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { firebaseApp, addError } from './plugins/firebase'
import App from './App.vue'
import { VueFire } from 'vuefire'
import { useMessageStore } from './stores/MessageStore'
import { getCurrentTimeLocal } from './utils'

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

app.config.errorHandler = (err, vm, info) => {
  const { message, name, stack } = err as Error
  const errorData = {
    message,
    name,
    stack,
    component: vm?.$options?.name || 'UnknownComponent',
    info,
    timestamp: getCurrentTimeLocal()
  };
  if (import.meta.env.VITE_APP_ENVIRONMENT === 'production') {
    addError(errorData);
  } else {
    console.log(errorData);
  }
  useMessageStore().setMessage('Error occur, Please contact developer!')
};

app.config.warnHandler = (msg) => {
  console.log(msg);
}



window.addEventListener('contextmenu', function (e) { 
  e.preventDefault(); 
}, false);

app.mount('#app')
