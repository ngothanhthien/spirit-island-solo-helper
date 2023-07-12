<script setup lang="ts">
import { computed, ref } from 'vue'
import GameCard from './GameCard.vue'
import { useSwipe } from '@vueuse/core';
defineProps({
  card: {
    type: String,
    required: true
  }
})
const emit = defineEmits(['swipeUp', 'swipeDown'])
const cardEl = ref<HTMLElement | null>(null)
const top = ref(0)
const opacity = ref(1)
const cardheight = computed(() => cardEl.value?.offsetHeight)
const { lengthY } = useSwipe(
  cardEl, {
  onSwipe() {
    if (cardheight.value) {
      top.value = -lengthY.value
    }
  },
  onSwipeEnd() {
    if ( cardheight.value && (Math.abs(lengthY.value) / cardheight.value) >= 0.5) {
      if (lengthY.value > 0 && cardEl.value) {
        emit('swipeUp')
        return
      }
      if (lengthY.value < 0) {
        emit('swipeDown')
        return
      }
    }
    else {
      top.value = 0
    }
  },
})
</script>
<template>
  <div ref="cardEl"
    :style="`top: ${top}px;`"
    class="cs-card left-0 relative shadow-lg shadow-stone-600 rounded-xl overflow-hidden flex-grow-0 flex-shrink-0 flex">
    <game-card :id="card" />
  </div>
</template>
<style scoped>
.cs-card:not(:first-child) {
  margin-left: var(--ml);
}
.cs-card {
  transition: opacity 0.4s ease-out, transform 0.4s ease-out, left 0.4s ease-out;
}
.cs-card:hover {
  transform: translateY(-10px);
}

.cs-card:hover~.cs-card {
  position: relative;
  left: var(--l);
}
</style>
