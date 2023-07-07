<script setup lang="ts">
import CardDeck from '@/components/base/CardDeck.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { useMinorDeckStore } from '@/stores/MinorDeckStore'
import { useCardPickStore } from '@/stores/CardPickStore'
import { useLogStore } from '@/stores/LogStore';

const minorDeck = useMinorDeckStore()
const logStore = useLogStore()
const cardPick = useCardPickStore()

function shuffleMinorDeck() {
  minorDeck.shuffle()
  logStore.add('Minor power shuffled', 'success')
}
function takeMinor(n: number) {
  if (cardPick.deck.length > 0) {
    logStore.add('Power picking is already in progress', 'error')
    return
  }
  const cards: string[] = []
  for(let i=0; i < n; i++) {
    const card = minorDeck.getTopCard()
    if (!card) {
      logStore.add('No minor power card left', 'error')
      break
    }
    cards.push(card)
  }
  cardPick.setDeck(cards, 'minor', n === 4)
}
</script>

<template>
  <card-deck :discard="minorDeck.discard" type="minor" :shuffle="shuffleMinorDeck">
    <base-button @click="takeMinor(4)">Take Minor</base-button>
    <base-button @click="takeMinor(1)" button-style="secondary">Take 1</base-button>
    <base-button @click="minorDeck.reveal()" button-style="secondary">Reveal top card</base-button>
  </card-deck>
</template>
