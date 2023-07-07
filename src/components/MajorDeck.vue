<script setup lang="ts">
import CardDeck from '@/components/base/CardDeck.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { useMajorDeckStore } from '@/stores/MajorDeckStore'
import { useCardPickStore } from '@/stores/CardPickStore'
import { useLogStore } from '@/stores/LogStore';

const majorDeck = useMajorDeckStore()
const logStore = useLogStore()
const cardPick = useCardPickStore()

function shuffleMajorDeck() {
  majorDeck.shuffle()
  logStore.add('Major power shuffled', 'success')
}
function takeMajor(n: number) {
  if (cardPick.deck.length > 0) {
    logStore.add('Power picking is already in progress', 'error')
    return
  }
  const cards: string[] = []
  for(let i=0; i < n; i++) {
    const card = majorDeck.getTopCard()
    if (!card) {
      logStore.add('No major power card left', 'error')
      break
    }
    cards.push(card)
  }
  cardPick.setDeck(cards, 'major', n === 4)
}
</script>

<template>
  <card-deck :discard="majorDeck.discard" type="major" :shuffle="shuffleMajorDeck">
    <base-button @click="takeMajor(4)">Take Major</base-button>
    <base-button @click="takeMajor(1)" button-style="secondary">Take 1</base-button>
    <base-button @click="majorDeck.reveal()" button-style="secondary">Reveal top card</base-button>
  </card-deck>
</template>
