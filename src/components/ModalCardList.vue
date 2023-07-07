<script setup lang="ts">
import { computed, watch } from 'vue'
import useCardPick from '@/composable/useCardPick'

import BaseModal from '@/components/base/BaseModal.vue'
import GameCard from '@/components/base/GameCard.vue'
import BaseButton from '@/components/base/BaseButton.vue'

import { useCardZoomStore } from '@/stores/CardZoomStore'
import { useCardListStore } from '@/stores/CardListStore'

const cardZoom = useCardZoomStore()
const cardList = useCardListStore()

const { isPicked, togglePick, picked } = useCardPick()

const pickMode = computed(() => cardList.type === 'power')
watch(() => cardZoom.waiting, ({ card, target }) => {
  if (card && target === 'discard') {
    picked.value.push(cardZoom.getWaiting() as string)
  }
})
function finish() {
  
}
</script>

<template>
  <base-modal :is-height-fixed="false" :show-close-icon="false"
    @close="cardList.reset()" @click-out-side="cardList.reset()">
    <template #header>
      <span v-if="cardList.type === 'event'">Event discard pile</span>
      <span v-else-if="cardList.type === 'power'">Power discard pile</span>
    </template>
    <template #body>
      <div class="flex flex-wrap gap-x-1 gap-y-4 py-2 px-2">
        <div v-for="card in cardList.getDeck" :key="card" class="flex flex-col items-center space-y-1"
          style="width: calc(20% - 3.5px)">
          <game-card @click="cardZoom.setZoom(card, cardList.getDeck, 'discard')" class="rounded-xl cursor-zoom-in" :id="card" />
          <base-button v-if="pickMode" @click="togglePick(card)" :button-style="isPicked(card) ? 'success' : 'secondary'">
            {{ isPicked(card) ? 'Unpick' : 'Pick' }}
          </base-button>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex justify-end py-2 px-2">
        <base-button v-if="pickMode" @click="finish" button-style="secondary" :disabled="picked.length === 0">
          Finish picking card
        </base-button>
        <base-button v-else @click="cardList.reset()" button-style="secondary">
          <span class="px-2">Close</span>
        </base-button>
      </div>
    </template>
  </base-modal>
</template>
