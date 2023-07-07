<script setup lang="ts">
import CardGroupView from '@/components/CardGroupView.vue'
import IconCards from './components/icon/IconCards.vue'
import { generateTestCards } from './utils'

import { usePlayerCardStore } from './stores/PlayerCardStore'
import { onMounted } from 'vue';

const playerCard = usePlayerCardStore()
onMounted(() => {
  window.addEventListener('touchmove', function (event) {
    if (document.body.scrollTop === 0) {
        event.preventDefault();
    }
  }, { passive: false })
  test()
})
function putFromHandToDiscard(cardId: string) {
  playerCard.putCardInDiscard(cardId)
}
function test() {
  playerCard.setHand(generateTestCards('minor', 5))
}
</script>

<template>
  <div class="relative h-screen bg-gray-100 flex flex-col overflow-hidden">
    <div class="grow flex">
      <div></div>
      <div class="grid grid-rows-2 grid-cols-1 w-full">
        <div class="bg-neutral-100 flex py-2 px-2">
          <card-group-view class="w-full" :cards="playerCard.play" />
        </div>
        <div class="bg-stone-300 flex pt-2 px-2">
          <card-group-view @swipe-down="putFromHandToDiscard" class="w-full" :cards="playerCard.hand" />
        </div>
      </div>
      <div class="ml-auto grid grid-rows-2 text-white relative x-40">
        <div class="bg-neutral-700"></div>
        <div class="p-1 flex items-center bg-stone-900 px-2"><icon-cards class="w-8 h-8" /></div>
      </div>
    </div>
  </div>
</template>
