<script setup lang="ts">
import { useFearDeckStore } from '@/stores/FearDeckStore'
import BaseModal from '@/components/base/BaseModal.vue'
import GameCard from '@/components/base/GameCard.vue'
import { useGameOptionStore } from '@/stores/GameOptionStore'

defineEmits(['close'])
const fearDeck = useFearDeckStore()
const gameOption = useGameOptionStore()
</script>
<template>
  <base-modal @click-out-side="$emit('close')" @close="$emit('close')">
    <template #header> Fear Deck </template>
    <template #body>
      <div class="flex space-x-2 mx-1 my-1">
        <template v-for="(card, index) in fearDeck.drawView" :key="card">
          <div
            v-if="fearDeck.showing.includes(card)"
            class="w-1/4 rounded-lg overflow-hidden shrink-0 relative"
          >
            <game-card :id="card" class="w-full" />
          </div>
          <div v-else class="w-1/4 rounded-lg shrink-0 relative">
            <img src="/img/card-back/fear.webp" alt="Fear Card Back" />
            <button
              class="absolute p-6 text-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900/30 rounded-lg"
              @click="fearDeck.addToShowing(card)"
            >
              <span class="icon-eye text-4xl" />
            </button>
          </div>
          <div
            v-if="index === fearDeck.numberCardNeedToStage2 - 1"
            class="font-serif text-3xl text-white font-semibold flex items-center bg-stone-900 px-2"
          >
            II
          </div>
          <div
            v-if="index === fearDeck.numberCardNeedToStage3 - 1"
            class="font-serif text-3xl text-white font-semibold flex items-center bg-stone-900 px-2"
          >
            III
          </div>
          <template v-if="gameOption.hasRussia5">
            <img
              v-if="index === fearDeck.numberCardNeedToStage2Russia - 1"
              src="/img/card-back/stage2.webp"
              alt="Invader Stage 2"
              class="w-1/5 h-fit self-center"
            />
            <img
              v-if="index === fearDeck.numberCardNeedToStage3Russia - 1"
              src="/img/card-back/stage3.webp"
              alt="Invader Stage 3"
              class="w-1/5 h-fit self-center"
            />
          </template>
        </template>
      </div>
    </template>
  </base-modal>
</template>
