<script setup lang="ts">
import { useScreenOrientation, useWindowSize } from '@vueuse/core'
import { ref, onMounted, onUnmounted } from 'vue'

const isMobile = ref(false)
// const isChrome = ref(false)
const goodOrientation = ref(false)
const { isSupported, orientation } = useScreenOrientation()
const { width, height } = useWindowSize()
// const mode = import.meta.env.VITE_APP_ENVIRONMENT
// const url = import.meta.env.VITE_APP_URL
onMounted(() => {
  testMobile()
  testAvailable()
//   isChrome.value = testChrome()
  window.addEventListener('resize', onResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', onResize)
})

function onResize() {
  testMobile()
  testAvailable()
}
function testAvailable() {
  if (isSupported.value && orientation.value) {
    if (orientation.value.includes('landscape')) {
      goodOrientation.value = true
    } else {
      goodOrientation.value = false
    }
    return
  }
  if (width.value > height.value) {
    goodOrientation.value = true
  }
}
function testMobile() {
  isMobile.value =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent,
    )
}
// function testChrome() {
//   if (mode === 'dev') {
//     return true
//   }

//   const ua = navigator.userAgent.toLowerCase();

//   if ((/chrome/i.test(ua))) {
//     return true; 
//   }

//   return false;
// }
</script>

<template>
  <div
    v-if="!isMobile || !goodOrientation"
    class="absolute w-full h-full top-0 left-0 bg-gray-900/80"
  >
    <div
      class="text-white text-2xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      <span v-if="!goodOrientation">We're sorry, but our application is optimized for Landscape mode.
        Please rotate your device to Landscape orientation for the best
        experience ☹️.</span>
      <span v-else>Apologies for any inconvenience. Our app is specifically designed for
        mobile devices. Thank you for understanding ☹️.</span>
    </div>
  </div>
  <!-- <div
    v-else-if="!isChrome"
    class="absolute w-full h-full top-0 left-0 bg-gray-900/80"
  >
    <div
      class="text-white text-2xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      For optimal performance, we recommend opening our site in a Chrome browser and installing our app. Thank you for your understanding.
      <a
        :href="url"
        class="text-orange-600 text-lg"
      >Open in Browser</a>
    </div>
  </div> -->
</template>
