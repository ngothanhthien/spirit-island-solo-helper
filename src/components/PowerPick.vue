<script setup lang="ts">
import { onMounted, ref } from 'vue'
import cardItem from '@/components/base/CardItem.vue'
import { useCardZoomStore } from '@/stores/CardZoomStore';
import { usePlayerCardStore } from '@/stores/PlayerCardStore';
import { usePowerDeckStore } from '@/stores/PowerDeckStore';

const cardZoom = useCardZoomStore()
const playerCard = usePlayerCardStore()


const type = ref('minor')
onMounted(() => {
  type.value = playerCard.picking[0].split('-')[0]
})

function addPowerToPicking() {
  const card = usePowerDeckStore(type.value).reveal()
  playerCard.addToPicking(card)
}

function powerPickSwipeUp(cardId: string) {
  const type = cardId.split('-')[0]
  if (type === 'minor' || type === 'major') {
    usePowerDeckStore(type).addToDraw(cardId)
  } else {
    return
  }
  playerCard.removeCardFromPicking(cardId)
}
</script>

<template>
  <div class="flex h-full w-full flex-shrink-0 absolute pb-96 -mb-96 box-content">
    <div
      key="button-add-power"
      class="flex shrink-0 items-center justify-center border-2 rounded-xl overflow-hidden"
      @click="addPowerToPicking"
    >
      <img
        :src="`/img/card-back/${type}.webp`"
        alt="Power Back"
        class="h-full"
      >
    </div>
    <transition-group
      name="fade"
      tag="div"
      appear
      class="flex h-full hide-scrollbar overflow-x-auto w-full"
    >
      <card-item
        v-for="card in playerCard.picking"
        :key="card"
        :card="card"
        class="ml-2"
        @swipe-down="playerCard.takeCardFromPicking(card)"
        @swipe-up="powerPickSwipeUp(card)"
        @click="cardZoom.setZoom(card, playerCard.picking, 'pick')"
      />
    </transition-group>
  </div>
</template>