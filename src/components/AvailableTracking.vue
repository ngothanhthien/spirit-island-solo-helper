<script setup lang="ts">
import { useScreenOrientation, useWindowSize } from '@vueuse/core'
import { ref, onMounted, onUnmounted } from 'vue'
declare global {
  interface Window {
    opera: unknown
  }
}
const isMobile = ref(false)
const goodOrientation = ref(false)
const inapp = ref(false)
const { isSupported, orientation } = useScreenOrientation()
const { width, height } = useWindowSize()
const userAgent =
  navigator.userAgent || navigator.vendor || (window.opera as string)
onMounted(() => {
  testMobile()
  testAvailable()
  const rules = ['WebView', '(iPhone|iPod|iPad)(?!.*Safari/)', 'Android.*(wv)']
  const regex = new RegExp(`(${rules.join('|')})`, 'ig')
  inapp.value = Boolean(userAgent.match(regex))
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
  isMobile.value = /(iPad|iPhone|Android|Mobile)/i.test(userAgent) || false
}
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
  <div
    v-else-if="inapp"
    class="absolute w-full h-full top-0 left-0 bg-gray-900/80"
  >
    <div
      class="text-white text-2xl absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
    >
      Click to <a
        href="intent://spirit-companion.netlify.app/#Intent;scheme=http;package=com.android.chrome;end"
        class="text-orange-600"
      >Open in Chrome</a>.
      Once redirected, <a
        href="https://www.cdc.gov/niosh/mining/content/hearingloss/installPWA.html"
        class="text-orange-600"
      >install</a> our app.
      Your cooperation enhances performance and functionality. Thank you for your understanding.
    </div>
  </div>
</template>
