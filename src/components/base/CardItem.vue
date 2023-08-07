<script setup lang="ts">
import { computed, ref } from 'vue'
import GameCard from './GameCard.vue'
import { useSwipe } from '@vueuse/core';
defineProps({
  card: {
    type: String,
    required: true
  },
  mLeft: {
    type: Number,
    default: 0
  }
})
const emit = defineEmits(['swipeUp', 'swipeDown', 'changePosition'])
const cardEl = ref<HTMLElement | null>(null)
const top = ref(0)
const left = ref(0)
const cardHeight = computed(() => cardEl.value?.offsetHeight)
const { lengthY, lengthX, isSwiping } = useSwipe(
  cardEl, {
  onSwipe() {
    if (cardHeight.value) {
      top.value = -lengthY.value
      left.value = -lengthX.value
    }
  },
  onSwipeEnd(event) {
    const targetElement = event.target as Element;
    const rect = targetElement.getBoundingClientRect();
    const x = rect.left + (rect.width / 2)
    const y = rect.top + (rect.height / 2)
    left.value = 0
    const element = document.elementFromPoint(x, y);
    const cardId = element?.getAttribute('data-id')
    if ( cardHeight.value && (Math.abs(lengthY.value) / cardHeight.value) >= 0.5) {
      if (lengthY.value > 0 && cardEl.value) {
        emit('swipeUp', cardId)
      }
      if (lengthY.value < 0 && cardEl.value) {
        emit('swipeDown', cardId)
      }
      top.value = 0
    }
    else {
      emit('changePosition', cardId)
      top.value = 0
    }
  },
})
</script>
<template>
  <div
    ref="cardEl"
    :style="`top: ${top}px; left: ${left}px; margin-left: ${mLeft}px`"
    :class="{'z-[9999] pointer-events-none': isSwiping}"
    class="cs-transition relative shadow-lg shadow-stone-600 rounded-xl overflow-hidden flex-grow-0 flex-shrink-0 flex w-fit"
  >
    <game-card :id="card" />
  </div>
</template>
