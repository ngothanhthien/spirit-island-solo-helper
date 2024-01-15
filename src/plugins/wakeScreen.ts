import { onMounted, onUnmounted } from 'vue';
import NoSleep from 'nosleep.js';

export default function injectWakeScreen() {
  const noSleep = new NoSleep()
  const enableNoSleep = async () => {
    try {
        await noSleep.enable()
        window.removeEventListener('click', enableNoSleep)
    } catch (error) {
        console.error('NoSleep.js failed to enable:', error)
    }
  }

  onMounted(() => {
    window.addEventListener('click', enableNoSleep)
  })

  onUnmounted(() => {
    window.removeEventListener('click', enableNoSleep)
    noSleep.disable()
  })
}