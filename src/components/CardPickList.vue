<script setup lang="ts">
import { useCardPickStore } from '@/stores/CardPickStore'
import { usePlayerCardStore } from '@/stores/PlayerCardStore'
import { useMinorDeckStore } from '@/stores/MinorDeckStore'
import { useCardZoomStore } from '@/stores/CardZoomStore'
import { useLogStore } from '@/stores/LogStore'

import BaseModal from './base/BaseModal.vue'
import BaseButton from './base/BaseButton.vue'
import GameCard from './base/GameCard.vue'
import IconPlus from './icon/IconPlus.vue'

import useCardPick from '@/composable/useCardPick'
import { getCard } from '@/utils'
import { watch } from 'vue'

const cardPick = useCardPickStore()
const playerCard = usePlayerCardStore()
const minorDeck = useMinorDeckStore()
const cardZoom = useCardZoomStore()
const logStore = useLogStore()

const { picked, togglePick, isPicked } = useCardPick()

watch(() => cardZoom.waiting, ({ card, target }) => {
  if (card && target === 'pick') {
    picked.value.push(cardZoom.getWaiting() as string)
  }
})
function finish() {
  picked.value.forEach((card) => {
    playerCard.take(card)
    logStore.add(`Power picked: ${getCard(card)?.name}`, 'success')
  })
  cardPick.deck.filter((card) => !picked.value.includes(card)).forEach((card) => {
    if (cardPick.type === 'minor') {
      minorDeck.putToDiscard(card)
    }
  })
  picked.value = []
  cardPick.reset()
}
function addMore() {
  const card = minorDeck.getTopCard()
  if (!card) {
    logStore.add('No power card left', 'error')
    return
  }
  cardPick.add(card)
}
</script>


<template>
  <base-modal v-show="cardPick.isShow" @click-out-side="cardPick.hide" :show-close-icon="false" :is-height-fixed="false">
    <template #header>
      Pick power
    </template>
    <template #body>
      <div class="flex flex-wrap gap-x-2 gap-y-4 py-2 px-2" :class="{'justify-center': cardPick.deck.length < 5}">
        <div v-if="cardPick.pickOnlyFour === false" @click="addMore" style="width: calc(20% - 7px)"
          class="flex items-center justify-center border-2 border-dashed border-slate-300 hover:border-slate-500 cursor-pointer text-slate-600 hover:text-slate-900 transition">
          <icon-plus class="w-16 h-16" />
        </div>
        <div v-for="card in cardPick.getDeck" :key="card" class="flex flex-col items-center space-y-1"
          style="width: calc(20% - 7px)">
          <game-card @click="cardZoom.setZoom(card, cardPick.deck, 'pick')" class="rounded-xl cursor-zoom-in" :id="card" />
          <base-button @click="togglePick(card)" :button-style="isPicked(card) ? 'success' : 'secondary'">
            {{ isPicked(card) ? 'Unpick' : 'Pick' }}
          </base-button>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end py-2 px-2">
        <base-button @click="finish" button-style="secondary" :disabled="picked.length === 0">
          Finish picking card
        </base-button>
      </div>
    </template>
  </base-modal>
</template>
@/stores/PlayerCardStore
