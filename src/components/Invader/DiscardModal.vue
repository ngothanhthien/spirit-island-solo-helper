<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue'
import { useModalStore } from '@/stores/ModalStore'
import { useInvaderCardStore } from '@/stores/InvaderCardStore'
import { usePlayerCardStore } from '@/stores/PlayerCardStore'
import { useDaysThatNeverWereStore } from '@/stores/DaysThatNeverWhereStore'

const invaderCard = useInvaderCardStore()
const playerCard = usePlayerCardStore()
const daysThatNeverWereDeck = useDaysThatNeverWereStore()

function close() {
  useModalStore().invaderDiscard = false
}
</script>

<template>
  <div class="absolute top-0 left-0 w-full h-full bg-gray-900/30 z-50" @click.self="close()">
    <div class="h-[90%] w-[85%] flex flex-col rounded-lg overflow-hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="bg-gray-900 text-white px-4 py-2 relative">
        Invader Discard
        <div class="text-white absolute top-2 right-2" @click="close()">
          <span class="icon-x text-2xl" />
        </div>
      </div>
      <div class="bg-white flex-1 overflow-x-auto py-2 px-3 flex hide-scrollbar">
        <div v-for="(card, index) in invaderCard.discardView" :key="card" class="flex flex-col justify-center items-center space-y-1 shrink-0">
          <img
            :src="invaderCard.hidden.includes(card) ? `/img/card-back/stage${card.split('-')[1]}.webp` : `/img/invader/${card.toLowerCase()}.webp`"
            alt="Invader Card"
            class="rounded-lg"
            :class="{
              'ml-2': index !== 0,
              'h-[80%]': daysThatNeverWereDeck.current === playerCard.current && parseInt(card.split('-')[1]) >= invaderCard.getStage - 1,
              'h-full': daysThatNeverWereDeck.current !== playerCard.current || parseInt(card.split('-')[1]) < invaderCard.getStage - 1
            }"
          />
          <base-button v-if="daysThatNeverWereDeck.current === playerCard.current && parseInt(card.split('-')[1]) >= invaderCard.getStage - 1" @click="invaderCard.swapInvaderCard(card)">
            Swap
          </base-button>
        </div>
      </div>
    </div>
  </div>
</template>
