<script setup lang="ts">
import { useModalDiscardStore } from '@/stores/ModalDiscardStore'
import { usePlayerCardStore } from '@/stores/PlayerCardStore';
import { usePowerDeckStore } from '@/stores/PowerDeckStore'

import { IconGrave, IconRefresh } from '@tabler/icons-vue'

const props = defineProps<{
  deck: 'minor' | 'major'
}>()

const powerDeck = usePowerDeckStore(props.deck)
const modalDiscard = useModalDiscardStore()
const playerCard = usePlayerCardStore()

function reveal() {
  const card = powerDeck.reveal()
  playerCard.addToPicking(card)
}

</script>

<template>
  <div class="inline-block relative h-36">
    <div class="inline-block h-full relative">
      <img
        class="rounded-lg h-full"
        :src="`/img/card-back/${deck}.webp`"
        alt="Power card back`"
      />
      <button
        v-if="powerDeck.canShowDiscardPile"
        class="inline-block bg-gray-900/20 hover:bg-gray-900/30 rounded absolute bottom-1 right-1 text-white z-10"
      >
        <icon-grave @click="modalDiscard.setDeck(powerDeck.discard)" class="w-8 h-8" />
      </button>
      <button
        class="inline-block bg-gray-900/20 hover:bg-gray-900/30 rounded absolute top-1 right-1 text-white z-10"
      >
        <icon-refresh @click="powerDeck.shuffle()" class="w-8 h-8" />
      </button>
    </div>
    <div
      @click.self="reveal"
      class="absolute flex flex-col h-full w-full justify-center items-center top-0 space-y-4"
    />
  </div>
</template>
@/stores/PowerDeckStore