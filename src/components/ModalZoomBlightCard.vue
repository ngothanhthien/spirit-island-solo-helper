<script setup lang="ts">
import { useBlightDeckStore } from '@/stores/BlightDeckStore';
import GameCard from './base/GameCard.vue';

const emit = defineEmits(['close'])
const blightDeck = useBlightDeckStore()
</script>

<template>
  <div @click.self="$emit('close')">
    <div>
      <game-card :id="(blightDeck.current as string)" />
    </div>
  </div>
</template>