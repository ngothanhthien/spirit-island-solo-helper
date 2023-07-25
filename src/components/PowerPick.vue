<script setup lang="ts">
import { computed, ref } from 'vue'
import cardItem from '@/components/base/CardItem.vue'
import { IconPlus } from '@tabler/icons-vue'
import { useElementSize } from '@vueuse/core'
import { CARD_RATIO } from '@/constant';
import { useCardZoomStore } from '@/stores/CardZoomStore';

defineProps<{
  picking: string[],
}>()
defineEmits(['swipeDown', 'addPower', 'swipeUp'])

const cardZoom = useCardZoomStore()

const powerPickEl = ref<HTMLElement | null>()
const { height: cardHeight } = useElementSize(powerPickEl)
const cardWidth = computed(() => cardHeight.value * CARD_RATIO)
</script>

<template>
  <transition-group
    ref="powerPickEl"
    name="list"
    tag="div"
    appear
    class="flex h-full flex-shrink-0 space-x-2 absolute powerPickEl pb-96 -mb-96 box-content overflow-x-auto"
  >
    <card-item
      v-for="card in picking"
      :key="card"
      :card="card"
      @swipe-down="$emit('swipeDown', card)"
      @swipe-up="$emit('swipeUp', card)"
      @click="cardZoom.setZoom(card, picking, 'pick')"
    />
    <button
      key="button-add-power"
      :style="`width: ${cardWidth}px;`"
      class="flex shrink-0 items-center justify-center border-2 border-orange-800 hover:border-orange-700 text-orange-900 hover:text-orange-700 rounded-xl"
      @click="$emit('addPower')"
    >
      <icon-plus
        class="w-16 h-16"
        :style="{ 'stroke-width': '1px' }"
      />
    </button>
  </transition-group>
</template>
<style scoped>
.powerPickEl::-webkit-scrollbar {
  display: none;
}

.powerPickEl {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}
</style>