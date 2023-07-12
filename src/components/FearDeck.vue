<script setup lang="ts">
import IconEarned from '@/components/icon/IconEarned.vue'
import { useFearDeckStore } from '@/stores/FearDeckStore'
import { useModalDiscardStore } from '@/stores/ModalDiscardStore'

const fearDeck = useFearDeckStore()
const modalDiscard = useModalDiscardStore()

function showEarnedFear() {
  if (fearDeck.canShowEarned) {
    return
  }
  modalDiscard.setDeck(fearDeck.earned, 'common')
}
</script>

<template>
  <div class="inline-block relative h-full">
    <div class="inline-block h-full relative">
      <img class="rounded-lg h-full" :src="`/img/card-back/event.webp`" alt="Event card back`">
      <button class="inline-block bg-gray-900/20 hover:bg-gray-900/30 rounded absolute bottom-1 right-1 text-white z-10">
        <icon-earned @click="showEarnedFear" class="w-8 h-8" />
      </button>
    </div>
    <div class="absolute flex flex-col h-full w-full justify-center items-center top-0 space-y-4"></div>
  </div>
</template>
