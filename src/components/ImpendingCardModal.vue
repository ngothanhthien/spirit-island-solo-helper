<script setup lang="ts">
import { useImpendingCardStore } from '@/stores/ImpendingCardStore'
import { useCardZoomStore } from '@/stores/CardZoomStore'
import ImpendingCard from '@/components/ImpendingCard.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { useModalStore } from '@/stores/ModalStore'

const impendingCardStore = useImpendingCardStore()
const cardZoom = useCardZoomStore()

const autoPlayClick = () => {
  impendingCardStore.autoPlay()
  close()
}

function close() {
  useModalStore().impendingCardModel = false
}
</script>

<template>
  <div class="absolute z-[99] bg-gray-900/30 top-0 left-0 h-full w-full flex items-center justify-center" @click.self="close()">
    <div class="h-[90%] w-[90%] absolute z-50 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 rounded-xl overflow-hidden bg-red-200">
      <div class="bg-gray-800 text-white px-3 py-2 relative">
        <div>Impending Card</div>
        <span class="icon-x text-2xl absolute top-1 right-4" @click="close()" />
      </div>
      <div class="h-[80%]">
        <div class="flex h-[90%] space-x-4 overflow-y-auto hide-scrollbar px-2 py-2">
          <div v-for="card in impendingCardStore.cardsDeck" :key="card.card" class="shrink-0 flex bg-gray-500/30 py-2 pr-2 rounded-lg">
            <impending-card
              :card="card.card"
              :energy="card.energy"
              class="h-full pt-1 pb-0.5 pl-1"
              @card-click="cardZoom.setZoom(card.card, impendingCardStore.cardIds, 'impending-card')"
              @increase-energy="impendingCardStore.increaseEnergy(card.card)"
              @decrease-energy="impendingCardStore.decreaseEnergy(card.card)"
            />
          </div>
        </div>
        <div class="h-[20%] flex items-center justify-center space-x-8">
          <base-button button-style="impending" :disabled="impendingCardStore.cards.length === 0" @click="impendingCardStore.allPlusOne()"> All +1 Energy </base-button>
          <base-button button-style="secondary" :disabled="!impendingCardStore.canAutoPlay" @click="autoPlayClick"> Auto play </base-button>
        </div>
      </div>
    </div>
  </div>
</template>
