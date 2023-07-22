<script setup lang="ts">
import { ref } from 'vue'
import CardItem from './base/CardItem.vue'
import useDragToScroll from '@/composable/useDragToScroll'
import { useCardZoomStore } from '@/stores/CardZoomStore';

const props = defineProps<{
  discard: string[]
  containerLength: number
}>()
defineEmits(['swipeDown', 'swipeUp'])

const cardZoom = useCardZoomStore()
const discardEl = ref<HTMLElement | null>()
const { style } = useDragToScroll(discardEl, props.containerLength)
</script>

<template>
  <div ref="discardEl" :style="style" class="flex h-full flex-shrink-0 space-x-2 absolute z-10 pl-2">
    <card-item
      v-for="card in discard"
      :key="card"
      :card="card"
      @swipe-down="$emit('swipeDown', card)"
      @swipe-up="$emit('swipeUp', card)"
      class="opacity-80"
      @click="cardZoom.setZoom(card, discard, 'player-discard')"
    />
  </div>
</template>
