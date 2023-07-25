<script setup lang="ts">
import { useEventDeckStore } from '@/stores/EventDeckStore';
import { useModalDiscardStore } from '@/stores/ModalDiscardStore';
import { IconGrave, IconDeviceTabletPlus } from '@tabler/icons-vue'

const modalDiscard = useModalDiscardStore()
const eventDeck = useEventDeckStore()
</script>

<template>
  <div class="relative h-full inline-block">
    <img
      src="/img/card-back/event.webp"
      alt="Event Card Background"
      class="rounded-lg h-full"
    >
    <button
      v-if="eventDeck.canShowDiscardPile"
      class="inline-block bg-gray-900/30 hover:bg-gray-900/40 rounded absolute bottom-1 right-1 text-white z-10"
      @click="modalDiscard.setDeck(eventDeck.discard)"
    >
      <icon-grave class="w-8 h-8" />
    </button>
    <button class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900/40 hover:bg-gray-900/60 text-white rounded-md z-10">
      <icon-device-tablet-plus
        style="stroke-width: 1px;"
        class="w-16 h-16"
        @click="eventDeck.revealEvent"
      />
    </button>
  </div>
</template>