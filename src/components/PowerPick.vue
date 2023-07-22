<script setup lang="ts">
import { computed, ref, toRefs } from 'vue'
import cardItem from '@/components/base/CardItem.vue'
import { IconPlus } from '@tabler/icons-vue'
import { useElementSize } from '@vueuse/core'
import { CARD_RATIO } from '@/constant';
import useDragToScroll from '@/composable/useDragToScroll';

const props = defineProps<{
  picking: string[],
  containerLength: number,
}>()
const { containerLength } = toRefs(props)
defineEmits(['swipeDown', 'addPower'])

const powerPickEl = ref<HTMLElement | null>()
const { height: cardHeight } = useElementSize(powerPickEl)
const cardWidth = computed(() => cardHeight.value * CARD_RATIO)
const { pos } = useDragToScroll(powerPickEl, containerLength)
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
