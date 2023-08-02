<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import cardItem from '@/components/base/CardItem.vue'
import { useCardZoomStore } from '@/stores/CardZoomStore';

const props = defineProps<{
  picking: string[],
}>()
defineEmits(['swipeDown', 'addPower', 'swipeUp'])

const cardZoom = useCardZoomStore()

const type = ref('minor')
onMounted(() => {
  type.value = props.picking[0].split('-')[0]
})
const pickingView = computed(() => props.picking.slice().reverse())
</script>

<template>
  <div class="flex h-full w-full flex-shrink-0 space-x-2 absolute pb-96 -mb-96 box-content">
    <div
      key="button-add-power"
      class="flex shrink-0 items-center justify-center border-2 rounded-xl overflow-hidden"
      @click="$emit('addPower')"
    >
      <img
        :src="`/img/card-back/${type}.webp`"
        alt="Power Back"
        class="h-full"
      >
    </div>
    <transition-group
      name="fade"
      tag="div"
      appear
      class="flex h-full space-x-2 hide-scrollbar overflow-x-auto w-full"
    >
      <card-item
        v-for="card in pickingView"
        :key="card"
        :card="card"
        @swipe-down="$emit('swipeDown', card)"
        @swipe-up="$emit('swipeUp', card)"
        @click="cardZoom.setZoom(card, pickingView, 'pick')"
      />
    </transition-group>
  </div>
</template>