<script setup lang="ts">
import { computed, ref } from 'vue';
import { useElementSize } from '@vueuse/core'
import CardItem from './base/CardItem.vue'
import { useCardZoomStore } from '@/stores/CardZoomStore'
import { CARD_RATIO } from '@/constant';

const DEFAULT_OVERLAP = 20
interface CardGroupViewProps {
  cards: Array<string>
  from: 'play' | 'hand'
}
const props = defineProps<CardGroupViewProps>()
const cardZoom = useCardZoomStore()
const cardWidth = computed(() => {
  return viewHeight.value * CARD_RATIO
})
const handEl = ref(null)
const { width: viewWidth, height: viewHeight } = useElementSize(handEl)
const handSize = computed(() => props.cards.length)
const slightLeft = computed(() => {
  if (handSize.value < 2) {
    return 0
  }
  if (cardWidth.value * handSize.value <= viewWidth.value) {
    return DEFAULT_OVERLAP
  }
  return (cardWidth.value * handSize.value - viewWidth.value) / (handSize.value - 1)
})
</script>

<template>
  <transition-group name="list" tag="div" ref="handEl" class="flex w-full absolute h-full" appear>
    <card-item v-for="card in cards" :key="card" :card="card" @swipe-down="$emit('swipe-down', card)"
      @swipe-up="$emit('swipe-up', card)"
      :style="`--l: ${slightLeft}px; --ml: ${slightLeft * (-1)}px;`"
      :on-hand="true"
      @click="cardZoom.setZoom(card, cards, from)"
    />
  </transition-group>
</template>
<style>
.list-enter-from {
  opacity: 0;
  transform: translateX(30px);
}
.list-enter-to {
  opacity: 1;
  transform: translateX(0);
}
.list-leave-to, .list-leave-from {
  display: none;
}
.list-leave-active {
  position: absolute;
}
</style>
