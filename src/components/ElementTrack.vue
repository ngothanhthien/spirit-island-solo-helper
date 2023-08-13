<script setup lang="ts">
import { usePlayerCardStore } from '@/stores/PlayerCardStore'
import PowerElement from './PowerElement.vue'

const playerCard = usePlayerCardStore()
</script>

<template>
  <div class="flex space-x-2 select-none">
    <template
      v-for="(value, key) in playerCard.elements"
      :key="key"
    >
      <div
        v-if="value > 0"
        class="flex items-center space-x-0.5"
      >
        <power-element
          class="h-5"
          :element="key"
        />
        {{ value }}
      </div>
    </template>
  </div>
</template>
