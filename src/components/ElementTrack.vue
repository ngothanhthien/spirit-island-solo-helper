<script setup lang="ts">
import { usePlayerCardStore } from '@/stores/PlayerCardStore'

const playerCard = usePlayerCardStore()
</script>

<template>
  <div class="flex space-x-2 select-none">
    <template v-for="(value, key) in playerCard.elements" :key="key">
      <div v-if="value > 0" class="flex items-center space-x-0.5">
        <span :class="`icon-${key.toLowerCase()} text-lg`">
          <span class="path1"></span>
          <span class="path2"></span>
          <span class="path3"></span>
          <span class="path4"></span>
        </span>
        {{ value }}
      </div>
    </template>
  </div>
</template>
