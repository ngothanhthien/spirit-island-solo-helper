<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import GameCard from './GameCard.vue'

defineProps({
  card: {
    type: String,
    required: true,
  },
})
const emit = defineEmits(['click-outside'])
const content = ref<HTMLElement | null>(null)
onClickOutside(content, () => {
  emit('click-outside')
})
</script>

<template>
  <div class="absolute h-full w-full bg-gray-900/30 top-0 left-0 flex items-center justify-center z-50">
    <div
      ref="content"
      class="h-[90%] flex"
    >
      <game-card
        :id="card"
        class="h-full"
      />
      <div class="ml-2 flex flex-col justify-between py-4">
        <slot name="button" />
      </div>
    </div>
  </div>
</template>
