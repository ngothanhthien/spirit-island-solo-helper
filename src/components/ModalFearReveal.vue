<script setup lang="ts">
import { useFearDeckStore } from '@/stores/FearDeckStore'
import GameCard from '@/components/base/GameCard.vue'
import BaseButton from '@/components/base/BaseButton.vue'

const fearDeck = useFearDeckStore()
</script>

<template>
  <div class="absolute flex items-center justify-center top-0 left-0 w-full h-full bg-gray-900/30 z-50" @click.self="fearDeck.markShowing">
    <div class="h-[90%] w-fit flex-col flex justify-center space-y-2">
      <game-card :id="fearDeck.currentReveal as string" class="h-[90%] grow" />
      <base-button button-style="secondary" class="mx-auto" @click="fearDeck.markDiscard"> Discard </base-button>
    </div>
  </div>
</template>
