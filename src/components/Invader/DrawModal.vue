<script setup lang="ts">
import { useModalStore } from '@/stores/ModalStore'
import { useGameOptionStore } from '@/stores/GameOptionStore'
import { useInvaderCardStore } from '@/stores/InvaderCardStore'
import InvaderCard from '@/components/Invader/InvaderCard.vue'

function close() {
  useModalStore().invaderDraw = false
}
</script>

<template>
  <div class="absolute top-0 left-0 w-full h-full bg-gray-900/30 z-50" @click.self="close()">
    <div class="h-[90%] w-[85%] flex flex-col rounded-lg overflow-hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="bg-gray-900 text-white px-4 py-2 relative">
        Invader Draw
        <div class="text-white absolute top-2 right-2" @click="close()">
          <span class="icon-x text-2xl" />
        </div>
      </div>
      <div class="bg-white flex-1 overflow-x-auto py-2 px-3 flex hide-scrollbar space-x-2">
        <template v-for="(card) in useInvaderCardStore().drawView" :key="card.name">
          <invader-card class="h-full aspect-[2/3]" v-if="card.name === 'D-2' || (useGameOptionStore().hasScotland2 && card.name === 'C-2')" :code="card.name" />
          <img v-else :src="`/img/card-back/stage${card.stage}.webp`" alt="Invader Card" class="h-full rounded-lg" />
        </template>
      </div>
    </div>
  </div>
</template>
