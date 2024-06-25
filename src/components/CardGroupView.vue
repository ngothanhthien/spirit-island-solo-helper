<script setup lang="ts">
import { computed, ref } from 'vue'
import { useElementSize } from '@vueuse/core'
import CardItem from './base/CardItem.vue'
import { useCardZoomStore } from '@/stores/CardZoomStore'
import { CARD_RATIO } from '@/constant'

const DEFAULT_OVERLAP = 20
interface CardGroupViewProps {
  cards: Array<string>
  from: 'play' | 'hand'
}
const props = defineProps<CardGroupViewProps>()
defineEmits(['swipeDown', 'swipeUp', 'changePosition'])
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
  return (
    (cardWidth.value * handSize.value - viewWidth.value) / (handSize.value - 1)
  )
})
</script>

<template>
  <transition-group
    ref="handEl"
    name="fade"
    tag="div"
    class="flex w-full absolute h-full"
    appear
  >
    <card-item
      v-for="(card, index) in cards"
      :key="card"
      :card="card"
      :m-left="index === 0 ? 0 : -slightLeft"
      :can-change-position="true"
      :can-check="from === 'play'"
      @swipe-down="
        (posID) => {
          $emit('swipeDown', card, posID)
        }
      "
      @swipe-up="
        (posID) => {
          $emit('swipeUp', card, posID)
        }
      "
      @change-position="
        (posID) => {
          $emit('changePosition', card, posID)
        }
      "
      @click="cardZoom.setZoom(card, cards, from)"
    />
  </transition-group>
</template>
