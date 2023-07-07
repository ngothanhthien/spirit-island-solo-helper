<script setup lang="ts">
import CardDeck from '@/components/base/CardDeck.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { useEventDeckStore } from '@/stores/EventDeckStore'
import { useLogStore } from '@/stores/LogStore';
import { getCard } from '@/utils';

const eventDeck = useEventDeckStore()
const logStore = useLogStore()

function revealEvent() {
  const revealedEvent = eventDeck.reveal()
  if (!revealedEvent) {
    logStore.add('No event card left', 'error')
    return
  }
  logStore.add(`Event revealed: ${getCard(revealedEvent)?.name}`, 'success')
}
function shuffleEventDeck() {
  eventDeck.shuffle()
  logStore.add('Event deck shuffled', 'success')
}
</script>

<template>
  <card-deck type="event" :shuffle="shuffleEventDeck" :discard="eventDeck.discard">
    <base-button @click="revealEvent">Reveal Event</base-button>
  </card-deck>
</template>
