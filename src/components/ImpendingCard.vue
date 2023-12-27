<script setup lang="ts">
import GameCard from "@/components/base/GameCard.vue"

defineProps({
  card: {
    type: String,
    required: true,
  },
  energy: {
    type: Number,
    required: true,
  }
})

defineEmits<{
  increaseEnergy: () => void
  decreaseEnergy: () => void
}>()
</script>

<template>
  <div class="flex flex-col items-center px-2">
    <button
      class="px-3 py-0.5 bg-red-200 rounded-lg text-xl"
      @click="$emit('increaseEnergy')"
    >
      {{ energy }}
    </button>
    <button
      class="mt-1 px-2 py-0.5 disabled:opacity-30"
      :disabled="energy === 0"
      @click="$emit('decreaseEnergy')"
    >
      <span class="icon-arrow-down text-xl" />
    </button>
  </div>
  <game-card
    :id="card"
    class="rounded-xl h-full"
  />
</template>
