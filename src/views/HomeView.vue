<script setup lang="ts">
import router from '@/router'
import BaseButton from '@/components/base/BaseButton.vue'
import { computed } from 'vue'
import { useEventDeckStore } from '@/stores/EventDeckStore'
import { useFearDeckStore } from '@/stores/FearDeckStore'
import { usePowerDeckStore } from '@/stores/PowerDeckStore'
import AvailableTracking from '@/components/AvailableTracking.vue'

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
</script>

<template>
  <div class="bg-gradient-to-r from-slate-200 to-slate-500 h-screen flex items-center justify-center relative">
    <div class="flex flex-col space-y-3 w-40">
      <div class="text-center">
        Version 1.6.6
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
      <base-button
        class="w-full"
        button-style="secondary"
        @click="router.push({ name: 'StatisticsView' })"
      >
        Statistics
      </base-button>
    </div>
    <available-tracking />
  </div>
</template>
