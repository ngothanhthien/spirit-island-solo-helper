<script setup lang="ts">
import { computed, ref } from 'vue'
import GameCard from './GameCard.vue'
import { useSwipe } from '@vueuse/core'
import { usePlayerCardStore } from '@/stores/PlayerCardStore'

const props = defineProps({
  card: {
    type: String,
    required: true
  },
  mLeft: {
    type: Number,
    default: 0
  },
  canChangePosition: {
    type: Boolean,
    default: false
  },
  canCheck: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['swipeUp', 'swipeDown', 'changePosition'])

const playerCard = usePlayerCardStore()
const isCheck = computed(() => playerCard.used.includes(props.card))

const cardEl = ref<HTMLElement | null>(null)
const top = ref(0)
const left = ref(0)
const cardHeight = computed(() => cardEl.value?.offsetHeight)
const { lengthY, lengthX, isSwiping } = useSwipe(cardEl, {
  onSwipe() {
    if (cardHeight.value) {
      top.value = -lengthY.value
      if (props.canChangePosition) {
        left.value = -lengthX.value
      }
    }
  },
  onSwipeEnd(event) {
    const cardId = getPosition(event.target as Element)
    left.value = 0
    if (cardHeight.value && Math.abs(lengthY.value) / cardHeight.value >= 0.5) {
      if (lengthY.value > 0 && cardEl.value) {
        emit('swipeUp', cardId)
      }
      if (lengthY.value < 0 && cardEl.value) {
        emit('swipeDown', cardId)
      }
      top.value = 0
    } else {
      if (cardId) {
        emit('changePosition', cardId)
      }
      top.value = 0
    }
  }
})

const cardStyle = computed(() => {
  return {
    top: `${top.value}px`,
    left: `${left.value}px`,
    marginLeft: props.canChangePosition ? `${props.mLeft}px` : undefined
  }
})

function getPosition(element: Element) {
  if (!props.canChangePosition) {
    return undefined
  }
  const rect = element.getBoundingClientRect()
  const x = rect.left + rect.width / 2
  const y = rect.top + rect.height / 2
  const pos = document.elementFromPoint(x, y)
  if (!pos) {
    return undefined
  }
  const _rect = pos.getBoundingClientRect()
  const _x = _rect.left + _rect.width / 2
  const id = pos.getAttribute('data-id')
  return {
    id,
    isFront: _x < x
  }
}
</script>
<template>
  <div
    ref="cardEl"
    :style="cardStyle"
    :class="{
      'z-[9999] pointer-events-none': isSwiping
    }"
    class="cs-transition relative shadow-lg shadow-stone-600 rounded-xl overflow-hidden flex-grow-0 flex-shrink-0 flex w-fit"
  >
    <game-card :id="card" />
    <div
      v-if="isCheck"
      class="absolute left-0 top-0 h-full w-full bg-gray-500/70"
    />
    <div
      v-if="props.canCheck"
      class="absolute bottom-1 left-1 p-1 bg-green-800/20 rounded"
      @click.stop="playerCard.toggleUsed(card)"
    >
      <span class="text-green-400 icon-check text-lg" />
    </div>
  </div>
</template>
