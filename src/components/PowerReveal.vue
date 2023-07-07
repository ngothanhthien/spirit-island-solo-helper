<script setup lang="ts">
import { useLogStore } from '@/stores/LogStore';
import { useMinorDeckStore } from '@/stores/MinorDeckStore'
import { usePlayerCardStore } from '@/stores/PlayerCardStore'
import { getCard } from '@/utils'
import CardReveal from './base/CardReveal.vue'
import BaseButton from './base/BaseButton.vue'
import { computed } from 'vue';
import { useMajorDeckStore } from '@/stores/MajorDeckStore';

const minorDeck = useMinorDeckStore()
const majorDeck = useMajorDeckStore()
const logStore = useLogStore()
const playerCards = usePlayerCardStore()

const powerType = computed(() => {
  if (minorDeck.revealCard) return 'minor'
  if (majorDeck.revealCard) return 'major'
  return ''
})

function putToDiscard() {
  const card = minorDeck.revealCard || majorDeck.revealCard as string

  if (powerType.value === 'major') {
    majorDeck.putToDiscard(card)
    majorDeck.clearReveal()
  } else if (powerType.value === 'minor') {
    minorDeck.putToDiscard(card)
    minorDeck.clearReveal()
  }
  logStore.add(`Discard: ${getCard(card)?.name}`, 'success')
}
function putToHand() {
  const card = minorDeck.revealCard || majorDeck.revealCard as string

  playerCards.take(card)
  logStore.add(`Take: ${getCard(card)?.name}`, 'success')
  minorDeck.clearReveal()
  majorDeck.clearReveal()
}
function putToPlay() {
  const card = minorDeck.revealCard || majorDeck.revealCard as string
  playerCards.addToPlay(card)
  logStore.add(`Play: ${getCard(card)?.name}`, 'success')
  minorDeck.clearReveal()
  majorDeck.clearReveal()
}
</script>

<template>
  <card-reveal @click-outside="putToDiscard" :card="(minorDeck.revealCard || majorDeck.revealCard) as string">
    <template #button>
      <base-button @click="putToDiscard">Put to discard</base-button>
      <base-button button-style="secondary" @click="putToHand">Put to hand</base-button>
      <base-button button-style="secondary" @click="putToPlay">Put to play</base-button>
    </template>
  </card-reveal>
</template>
