<script setup lang="ts">
import { useEventDeckStore } from '@/stores/EventDeckStore'
import { ref } from 'vue'
import GameCard from './base/GameCard.vue'
import { useModalStore } from '@/stores/ModalStore'

const eventDeck = useEventDeckStore()
const card = ref(eventDeck.draw[eventDeck.draw.length - 1])

function closeModal() {
  useModalStore().visionsOfAShiftingFutureEvent = false
  if (Math.random() > 0.5) {
    const lastIndex = eventDeck.draw.length - 1
    ;[eventDeck.draw[lastIndex], eventDeck.draw[lastIndex - 1]] = [eventDeck.draw[lastIndex - 1], eventDeck.draw[lastIndex]]
  }
}
</script>

<template>
  <div class="absolute w-full h-full top-0 left-0 bg-gray-900/30" @click.self="closeModal">
    <div class="h-[90%] absolute z-50 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
      <game-card :id="card" class="h-full" />
    </div>
  </div>
</template>
