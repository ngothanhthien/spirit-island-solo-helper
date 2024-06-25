<script setup lang="ts">
import BaseModal from '@/components/base/BaseModal.vue'
import GameCard from '@/components/base/GameCard.vue'

import { useCardZoomStore } from '@/stores/CardZoomStore'
import { useModalDiscardStore } from '@/stores/ModalDiscardStore'

const cardZoom = useCardZoomStore()
const cardList = useModalDiscardStore()
</script>

<template>
  <base-modal
    :is-height-fixed="false"
    @close="cardList.reset()"
    @click-out-side="cardList.reset()"
  >
    <template #header> Discard pile </template>
    <template #body>
      <div class="flex flex-wrap gap-x-1 gap-y-4 py-2 px-2">
        <div
          v-for="card in cardList.getDeck"
          :key="card"
          class="flex flex-col items-center space-y-1"
          style="width: calc(20% - 3.5px)"
        >
          <game-card
            :id="card"
            class="rounded-xl cursor-zoom-in"
            @click="cardZoom.setZoom(card, cardList.getDeck, 'discard')"
          />
        </div>
      </div>
    </template>
  </base-modal>
</template>
