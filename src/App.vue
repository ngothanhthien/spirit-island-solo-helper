<script setup lang="ts">
import CardGroupView from '@/components/CardGroupView.vue'
import IconCards from './components/icon/IconCards.vue'


import { usePlayerCardStore } from './stores/PlayerCardStore'
import { useScreenOrientation } from '@vueuse/core'
import { onMounted } from 'vue';

const {
  lockOrientation,
  orientation
} = useScreenOrientation()
onMounted(() => {
  lockOrientation('landscape-primary')
})
const playerCard = usePlayerCardStore()
// const cardsInHand = computed(() => playerCard.hand.map(id => {
//   return {
//     id,
//     card: getCard(id)
//   }
// }))
</script>

<template>
  <div class="relative h-screen bg-gray-100 flex flex-col overflow-hidden">
    <div class="h-12 bg-sky-900 text-white">{{orientation}}11</div>
    <div class="grow flex">
      <div></div>
      <div class="grid grid-rows-2 grid-cols-1 w-full">
        <div class="bg-neutral-100"></div>
        <div class="bg-stone-300 flex pt-2 px-2">
          <!-- <div v-for="card in playerCard.hand" :key="card">
            <game-card :id="card" />
          </div> -->
          <card-group-view class="w-full" :cards="playerCard.hand" />
        </div>
      </div>
      <div class="ml-auto grid grid-rows-2 text-white relative x-40">
        <div class="bg-neutral-700"></div>
        <div class="p-1 flex items-center bg-stone-900 px-1"><icon-cards class="w-8 h-8" /></div>
      </div>
    </div>
  </div>
</template>
