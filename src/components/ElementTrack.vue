<script setup lang="ts">
import { usePlayerCardStore } from '@/stores/PlayerCardStore'

const playerCard = usePlayerCardStore()
</script>

<template>
  <div class="flex space-x-2 select-none">
    <div
      v-for="(value, key) in playerCard.elements"
      :key="key"
      class="flex items-center space-x-0.5"
    >
      <img class="h-5" :src="`/img/elements/${key.toLocaleLowerCase()}.webp`" :alt="`${key} element`" />
      {{ value }}
    </div>
  </div>
</template>
