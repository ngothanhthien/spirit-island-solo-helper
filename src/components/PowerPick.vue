<script setup lang="ts">
import { computed, ref } from 'vue'
import cardItem from '@/components/base/CardItem.vue'
import { IconPlus } from '@tabler/icons-vue'
import { useElementSize, useSwipe } from '@vueuse/core'
import { CARD_RATIO } from '@/constant';

const props = defineProps<{
  picking: string[],
  containerLength: number,
}>()
defineEmits(['swipeDown', 'addPower'])

const powerPickEl = ref<HTMLElement | null>()
const { width: powerPickSize, height: cardHeight } = useElementSize(powerPickEl)
const cardWidth = computed(() => {
  return cardHeight.value * CARD_RATIO
})
const pos = ref(0)
let startX = 0
const viewBox = computed(() => {
  return powerPickSize.value - props.containerLength + 20
})
const { lengthX } = useSwipe(
  powerPickEl, {
    onSwipeStart(e: TouchEvent) {
      if (viewBox.value < 0) {
        return
      }
      startX = pos.value
    },
    onSwipe(e: TouchEvent) {
      if (viewBox.value < 0) {
        return
      }
      pos.value = startX - lengthX.value
    },
    onSwipeEnd(e: TouchEvent) {
      if (viewBox.value < 0) {
        return
      }
      if (pos.value > 0) {
        pos.value = 0
      }
      if (pos.value < -viewBox.value) {
        pos.value = -viewBox.value
      }
    }
})
</script>

<template>
    <div ref="powerPickEl" class="flex h-full flex-shrink-0 space-x-2 absolute" :style="`left: ${pos}px;`">
      <card-item
        v-for="card in picking"
        :key="card"
        :card="card"
        :can-swipe-up="false"
        @swipe-down="$emit('swipeDown', card)"
      />
      <button
        key="button-add-power"
        :style="`width: ${cardWidth}px;`"
        class="flex items-center justify-center border-2 border-orange-800 hover:border-orange-700 text-orange-900 hover:text-orange-700 rounded-xl"
        @click="$emit('addPower')"
      >
        <icon-plus class="w-16 h-16" :style="{ 'stroke-width': '1px' }" />
      </button>
    </div>
</template>
