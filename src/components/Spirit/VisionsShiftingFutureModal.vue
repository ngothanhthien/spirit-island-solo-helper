<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue'
import { useInvaderCardStore } from '@/stores/InvaderCardStore'
import { useModalStore } from '@/stores/ModalStore'
const invaderCard = useInvaderCardStore()

function visionShuffle() {
  invaderCard.visionShuffle()
  close()
}
function visionBottom() {
  invaderCard.visionBottom()
  close()
}
function close() {
  useModalStore().visionShiftingFuture = false
}
</script>

<template>
  <div class="absolute top-0 left-0 w-full h-full bg-gray-900/30 z-50">
    <div class="h-[85%] rounded-lg overflow-hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col justify-center items-center">
      <div class="text-center text-lg font-semibold text-white">Visions of a shifting future</div>
      <div class="h-[90%] flex">
        <img :src="`/img/invader/${invaderCard.draw[invaderCard.draw.length - 1].toLowerCase()}.webp`" alt="Invader Card" class="h-full rounded-lg" />
        <div class="flex flex-col space-y-4 items-center justify-center">
          <base-button button-style="secondary" @click="visionShuffle"> Shuffle </base-button>
          <base-button button-style="secondary" @click="visionBottom"> Bottom </base-button>
        </div>
      </div>
    </div>
  </div>
</template>
