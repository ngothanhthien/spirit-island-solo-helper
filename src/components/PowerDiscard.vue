<script setup lang="ts">
import { ref } from 'vue'
import CardItem from './base/CardItem.vue'
import { useCardZoomStore } from '@/stores/CardZoomStore';

defineProps<{
  discard: string[]
}>()
defineEmits(['swipeDown', 'swipeUp'])

const cardZoom = useCardZoomStore()
const discardEl = ref<HTMLElement | null>()
</script>

<template>
  <div
    ref="discardEl"
    class="flex h-full flex-shrink-0 space-x-2 absolute z-10 pl-2"
  >
    <card-item
      v-for="card in discard"
      :key="card"
      :card="card"
      class="opacity-80"
      @swipe-down="$emit('swipeDown', card)"
      @swipe-up="$emit('swipeUp', card)"
      @click="cardZoom.setZoom(card, discard, 'player-discard')"
    />
  </div>
</template>
