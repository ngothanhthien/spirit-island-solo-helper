<script setup lang="ts">
import { useFearDeckStore } from '@/stores/FearDeckStore'
import FearIcon from './icons/FearIcon.vue'

const fearDeck = useFearDeckStore()
</script>

<template>
  <button
    class="h-full px-2.5 flex items-center space-x-1 bg-purple-900 text-white"
    @click="fearDeck.increaseFear"
  >
    <div><fear-icon class="w-5 h-5 mb-1 text-white" /></div>
    <div>
      {{ fearDeck.currentFear }}<span
        class="text-xs relative -top-2"
      >+{{ fearDeck.fearThisTurn }}</span>
    </div>
  </button>
</template>