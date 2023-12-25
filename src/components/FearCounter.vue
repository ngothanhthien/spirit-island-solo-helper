<script setup lang="ts">
import { useFearDeckStore } from '@/stores/FearDeckStore'
const fearDeck = useFearDeckStore()
</script>

<template>
  <button
    class="h-full px-2.5 flex items-center space-x-1 bg-purple-900 text-white"
    @click="fearDeck.increaseFear"
  >
    <span class="icon-fear text-white" />
    <span>
      {{ fearDeck.currentFear }}<span
        class="text-xs relative -top-2"
      >+{{ fearDeck.fearThisTurn }}</span>
    </span>
  </button>
</template>