<script setup lang="ts">
import { ref } from 'vue'
import cardItem from '@/components/base/CardItem.vue'
import { useCardZoomStore } from '@/stores/CardZoomStore';

defineProps<{
  picking: string[],
}>()
defineEmits(['swipeDown', 'addPower'])

const cardZoom = useCardZoomStore()

const powerPickEl = ref<HTMLElement | null>()
</script>

<template>
  <transition-group
    ref="powerPickEl"
    name="list"
    tag="div"
    appear
    class="flex h-full w-full flex-shrink-0 space-x-2 absolute hide-scrollbar pb-96 -mb-96 box-content overflow-x-auto"
  >
    <card-item
      v-for="card in picking"
      :key="card"
      :card="card"
      @swipe-down="$emit('swipeDown', card)"
      @click="cardZoom.setZoom(card, picking, 'days-that-never-were-store')"
    />
  </transition-group>
</template>