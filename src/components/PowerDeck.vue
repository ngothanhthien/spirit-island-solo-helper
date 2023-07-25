<script setup lang="ts">
import { useModalDiscardStore } from '@/stores/ModalDiscardStore'
import { usePlayerCardStore } from '@/stores/PlayerCardStore';
import { usePowerDeckStore } from '@/stores/PowerDeckStore'

import { IconGrave, IconRefresh, IconDeviceTabletPlus } from '@tabler/icons-vue'

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
  <div class="inline-block relative h-full">
    <div class="inline-block h-full relative">
      <img
        class="rounded-lg h-full"
        :src="`/img/card-back/${deck}.webp`"
        alt="Power card back`"
      >
      <button
        v-if="powerDeck.canShowDiscardPile"
        class="inline-block bg-gray-900/30 hover:bg-gray-900/40 rounded absolute bottom-1 right-1 text-white z-10"
      >
        <icon-grave
          class="w-8 h-8"
          @click="modalDiscard.setDeck(powerDeck.discard)"
        />
      </button>
      <button class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900/40 hover:bg-gray-900/60 text-white rounded-md z-10">
        <icon-device-tablet-plus
          style="stroke-width: 1px;"
          class="w-16 h-16"
          @click="reveal"
        />
      </button>
      <button
        class="inline-block bg-gray-900/20 hover:bg-gray-900/30 rounded absolute top-1 right-1 text-white z-10"
      >
        <icon-refresh
          class="w-8 h-8"
          @click="powerDeck.shuffle()"
        />
      </button>
    </div>
  </div>
</template>
@/stores/PowerDeckStore