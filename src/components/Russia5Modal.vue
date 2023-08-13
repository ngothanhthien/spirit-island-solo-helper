

<script setup lang="ts">
import { useFearDeckStore } from '@/stores/FearDeckStore'
import { useInvaderCardStore } from '@/stores/InvaderCardStore'
import BaseButton from './base/BaseButton.vue'
import { ref } from 'vue'

const showRussiaStage2 = ref(true)
const showRussiaStage3 = ref(true)
const invaderCard = useInvaderCardStore()
const fearDeck = useFearDeckStore()

function doRussiaStage2() {
  showRussiaStage2.value = false
  invaderCard.doRussia(2)
}

function doRussiaStage3() {
  showRussiaStage3.value = false
  invaderCard.doRussia(3)
}

</script>

<template>
  <div
    v-if="showRussiaStage2 && fearDeck.numberCardNeedToStage2Russia === 0"
    class="absolute w-full h-full top-0 left-0 bg-gray-900/30 z-50 flex justify-center"
  >
    <div class="h-full flex flex-col justify-center">
      <div class="h-[70%] flex justify-center">
        <img
          src="/img/card-back/stage2.webp"
          alt="Russia Invaders Card"
          class="h-full"
        >
      </div>
      <base-button
        button-style="secondary"
        class="mt-2"
        @click="doRussiaStage2"
      >
        Russia: Entrench in the Face of Fear
      </base-button>
    </div>
  </div>
  <div
    v-if="showRussiaStage3 && fearDeck.numberCardNeedToStage3Russia === 0"
    class="absolute w-full h-full top-0 left-0 bg-gray-900/30 z-50 flex justify-center"
  >
    <div class="h-full flex flex-col justify-center">
      <div class="h-[70%] flex justify-center">
        <img
          src="/img/card-back/stage3.webp"
          alt="Russia Invaders Card"
          class="h-full"
        >
      </div>
      <base-button
        button-style="secondary"
        class="mt-2"
        @click="doRussiaStage3"
      >
        Russia: Entrench in the Face of Fear
      </base-button>
    </div>
  </div>
</template>