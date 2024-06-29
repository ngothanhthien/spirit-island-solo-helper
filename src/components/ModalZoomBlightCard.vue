<script setup lang="ts">
import { useBlightDeckStore } from '@/stores/BlightDeckStore'
import GameCard from './base/GameCard.vue'
import BaseButton from './base/BaseButton.vue'
import { useModalStore } from '@/stores/ModalStore'

defineEmits(['close'])
const blightDeck = useBlightDeckStore()
</script>

<template>
  <div class="absolute top-0 left-0 w-full h-full bg-gray-900/30" @click.self="useModalStore().zoomBlightCard = false">
    <div class="h-[90%] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-fit absolute z-50">
      <game-card :id="blightDeck.current as string" :class="blightDeck.isBlighted ? 'h-full' : 'h-[90%]'" class="rounded-lg" />
      <div v-if="!blightDeck.isBlighted" class="flex justify-center mt-2">
        <base-button button-style="secondary" @click="blightDeck.turnUp"> Turn Up </base-button>
      </div>
    </div>
  </div>
</template>
