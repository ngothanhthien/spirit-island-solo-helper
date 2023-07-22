<script setup lang="ts">
const clearCache = () => {
  if ('caches' in window) {
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          return caches.delete(cacheName)
        }),
      ).then(() => {
        console.log('Caches cleared!')
        window.location.reload()
      })
    })
  }
}
</script>
<template>
  <button @click="clearCache">
    Clear Cache
  </button>
</template>
