<script setup lang="ts">
import { computed, ref } from 'vue';
import { useElementSize } from '@vueuse/core'
import CardItem from './base/CardItem.vue'
interface CardGroupViewProps {
  cards: Array<string>
}
const CARD_RATIO = 5 / 7
const props = defineProps<CardGroupViewProps>()
const cardWidth = computed(() => {
  return viewHeight.value * CARD_RATIO - 8
})
const handEl = ref(null)
const { width: viewWidth, height: viewHeight } = useElementSize(handEl)
const handSize = computed(() => props.cards.length)
const slightLeft = computed(() => {
  if (handSize.value < 2) {
    return 0
  }
  if (cardWidth.value * handSize.value <= viewWidth.value) {
    return 20
  }
  return (cardWidth.value * handSize.value - viewWidth.value) / (handSize.value - 1)
})
</script>

<template>
  <div ref="handEl" class="flex">
    <card-item v-for="card in cards" key="card" :card="card" :style="`width: ${cardWidth}px;--l: ${slightLeft}px; --ml: ${slightLeft * (-1)}px;`" />
  </div>
</template>
