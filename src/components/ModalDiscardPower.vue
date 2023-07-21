<script setup lang="ts">
import BaseModal from '@/components/base/BaseModal.vue'
import GameCard from '@/components/base/GameCard.vue'

import { useCardZoomStore } from '@/stores/CardZoomStore'
import { useModalDiscardStore } from '@/stores/ModalDiscardStore'

const cardZoom = useCardZoomStore()
const modalDiscard = useModalDiscardStore()
</script>

<template>
  <base-modal
    :is-height-fixed="false"
    @close="modalDiscard.reset()"
    @click-out-side="modalDiscard.reset()"
  >
    <template #header>
      <div>Minor discard</div>
    </template>
    <template #body>
      <div class="flex flex-wrap m-0.5">
        <game-card
          v-for="card in modalDiscard.deck"
          :id="card"
          class="w-1/6 px-0.5 py-0.5"
          @click="cardZoom.setZoom(card, modalDiscard.getDeck, 'discard')"
        />
      </div>
    </template>
  </base-modal>
</template>
