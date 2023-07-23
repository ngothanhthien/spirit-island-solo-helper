<template>
  <button
    v-if="updateAvailable"
    @click="updateServiceWorker"
  >
    Update Available! Click to Refresh.
  </button>
</template>
  
<script lang="ts">
  import { ref, onMounted } from 'vue'
  
  export default {
    setup() {
      const updateAvailable = ref(false)
  
      onMounted(() => {
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker
            .register('/sw.js')
            .then((registration) => {
              registration.addEventListener('updatefound', () => {
                updateAvailable.value = true
              })
            })
        }
      })
  
      const updateServiceWorker = () => {
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.ready.then((registration) => {
            registration.unregister().then(() => {
              window.location.reload()
            })
          })
        }
      }
  
      return {
        updateAvailable,
        updateServiceWorker,
      }
    }
  }
  </script>