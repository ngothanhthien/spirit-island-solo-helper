<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseButton from '@/components/base/BaseButton.vue'
import CardReveal from './base/CardReveal.vue'

import { onClickOutside } from '@vueuse/core'
import { useEventDeckStore } from '@/stores/EventDeckStore'
import { useLogStore } from '@/stores/LogStore'
import { getCard } from '@/utils'


const eventDeck = useEventDeckStore()
const logStore = useLogStore()

function discardEvent() {
  const poppedEvent = eventDeck.popEvent()
  if (!poppedEvent) {
    logStore.add('No event to discard', 'error')
    return
  }
  logStore.add(`Event discarded: ${getCard(poppedEvent)?.name}`, 'success')
}

function putUnderTwoTopCard() {
  const eventCard = eventDeck.putUnderTwoTopCard()
  if (!eventCard) {
    logStore.add('Failed to put event under two top card', 'error')
    return
  }
  logStore.add(`Putted event under two top card: ${getCard(eventCard)?.name}`, 'success')
}

watch(() => eventDeck.draw, () => {
  eventDeck.hide()
}, { deep: true })
</script>

<template>
  <card-reveal @click-outside="eventDeck.hide()" :card="(eventDeck.current as string)">
    <template #button>
      <base-button @click="discardEvent">Discard Event</base-button>
      <base-button button-style="secondary" @click="putUnderTwoTopCard()">Put under two card</base-button>
    </template>
  </card-reveal>
</template>
