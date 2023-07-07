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
      opacity.value = 1.1 - (Math.abs(lengthY.value) / cardheight.value)
    }
  },
  onSwipeEnd() {
    if ( cardheight.value && (Math.abs(lengthY.value) / cardheight.value) >= 0.5) {
      if (lengthY.value > 0) {
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
      opacity.value = 1
    }
  },
})
</script>
<template>
  <div ref="cardEl"
    :style="`top: ${top}px; opacity: ${opacity}; transition: 0.4s ease-out;`"
    class="cs-card left-0 relative shadow-lg shadow-stone-600 rounded-xl overflow-hidden flex-grow-0 flex-shrink-0 flex">
    <game-card :id="card" />
  </div>
</template>
<style scoped>
.cs-card {
  transition: 0.4s ease-out;
}

.cs-card:not(:first-child) {
  margin-left: var(--ml);
}

.cs-card:hover {
  transform: translateY(-10px);
}

.cs-card:hover~.cs-card {
  position: relative;
  left: var(--l);
}
</style>
