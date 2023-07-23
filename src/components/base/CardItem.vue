<script setup lang="ts">
import { computed, ref } from 'vue'
import GameCard from './GameCard.vue'
import { useSwipe } from '@vueuse/core';
const props = defineProps({
  card: {
    type: String,
    required: true
  },
  canSwipeUp: {
    type: Boolean,
    default: true
  },
  canSwipeDown: {
    type: Boolean,
    default: true
  },
  left: {
    type: Number,
    default: 0
  }
})
const emit = defineEmits(['swipeUp', 'swipeDown'])
const cardEl = ref<HTMLElement | null>(null)
const top = ref(0)
const cardHeight = computed(() => cardEl.value?.offsetHeight)
const { lengthY, isSwiping } = useSwipe(
  cardEl, {
  onSwipe() {
    if (cardHeight.value) {
      top.value = -lengthY.value
    }
  },
  onSwipeEnd() {
    if ( cardHeight.value && (Math.abs(lengthY.value) / cardHeight.value) >= 0.5) {
      if (lengthY.value > 0 && cardEl.value && props.canSwipeUp) {
        emit('swipeUp')
        return
      }
      if (lengthY.value < 0 && cardEl.value && props.canSwipeDown) {
        emit('swipeDown')
        return
      }
      top.value = 0
    }
    else {
      top.value = 0
    }
  },
})
</script>
<template>
  <div
    ref="cardEl"
    :style="`top: ${top}px; left: ${left}px;`"
    :class="{'z-[9999]': isSwiping}"
    class="cs-transition relative shadow-lg shadow-stone-600 rounded-xl overflow-hidden flex-grow-0 flex-shrink-0 flex w-fit"
  >
    <game-card :id="card" />
  </div>
</template>
<style scoped>
.cs-transition {
  transition: opacity 0.4s ease-out, transform 0.4s ease-out, left 0.4s ease-out;
}
</style>
