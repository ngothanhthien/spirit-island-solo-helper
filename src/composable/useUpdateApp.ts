import { ref, onMounted } from 'vue'

export default function () {
  const updateAvailable = ref(false)
  onMounted(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => {
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            if (newWorker == null) return

            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  updateAvailable.value = true
                }
              }
            })
          })
        })
        .catch((error) => {
          console.error('Error during service worker registration:', error)
        })
    }
  })

  const updateServiceWorker = () => {
    updateAvailable.value = false
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
