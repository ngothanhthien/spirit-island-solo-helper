<script setup lang="ts">
import router from '@/router'
import BaseButton from '@/components/base/BaseButton.vue'
import { computed } from 'vue'
import { useEventDeckStore } from '@/stores/EventDeckStore'
import { useFearDeckStore } from '@/stores/FearDeckStore'
import { usePowerDeckStore } from '@/stores/PowerDeckStore'
// import useUpdateApp from '@/composable/useUpdateApp'
// import { IconRefresh } from '@tabler/icons-vue'

const eventDeck = useEventDeckStore()
const fearDeck = useFearDeckStore()
const minorDeck = usePowerDeckStore('minor')
const majorDeck = usePowerDeckStore('major')

const canContinue = computed(() => {
  return (
    eventDeck.isAvailable &&
    minorDeck.isAvailable &&
    majorDeck.isAvailable &&
    fearDeck.isAvailable
  )
})

// const { updateAvailable, updateServiceWorker } = useUpdateApp()
</script>

<template>
  <div class="bg-gradient-to-r from-slate-200 to-slate-500 h-screen flex items-center justify-center">
    <div class="flex flex-col space-y-3 w-40">
      <!-- <div
        v-if="updateAvailable"
        class="flex space-x-2 items-center justify-center font-semibold text-stone-900"
        @click="updateServiceWorker"
      >
        <div>Update Available</div>
        <icon-refresh class="w-5 h-5" />
      </div> -->
      <div class="text-center">
        Version 0.1.4
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
