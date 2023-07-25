<script setup lang="ts">
import router from '@/router'
import BaseButton from '@/components/base/BaseButton.vue'
import { computed, ref, onMounted } from 'vue'
import { useEventDeckStore } from '@/stores/EventDeckStore'
import { useFearDeckStore } from '@/stores/FearDeckStore'
import { usePowerDeckStore } from '@/stores/PowerDeckStore'
import { IconRefresh } from '@tabler/icons-vue'

const eventDeck = useEventDeckStore()
const fearDeck = useFearDeckStore()
const minorDeck = usePowerDeckStore('minor')
const majorDeck = usePowerDeckStore('major')

const updateAvailable = ref(false)

const canContinue = computed(() => {
  return (
    eventDeck.isAvailable &&
    minorDeck.isAvailable &&
    majorDeck.isAvailable &&
    fearDeck.isAvailable
  )
})

onMounted(() => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').then((registration) => {
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
</script>

<template>
  <div class="bg-gradient-to-r from-slate-200 to-slate-500 h-screen flex items-center justify-center">
    <div class="flex flex-col space-y-3 w-40">
      <button
        v-if="updateAvailable"
        class="flex items-center justify-center w-full text-stone-700 font-semibold"
        @click="updateServiceWorker"
      >
        Update Available! <icon-refresh class="w-5 h-5 ml-1" />
      </button>
      <div class="text-center">
        Version 1.1.1
      </div>
      <base-button
        class="w-full"
        button-style="secondary"
        @click="router.push({ name: 'SetupView' })"
      >
        New game
      </base-button>
      <base-button
        class="w-full"
        button-style="secondary"
        :disabled="!canContinue"
        @click="router.push({ name: 'GameView' })"
      >
        Continue
      </base-button>
    </div>
  </div>
</template>
