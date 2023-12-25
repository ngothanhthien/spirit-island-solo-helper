<script setup lang="ts">
import { useFearDeckStore } from '@/stores/FearDeckStore'
import BaseModal from '@/components/base/BaseModal.vue'
import GameCard from '@/components/base/GameCard.vue'

defineEmits(['close'])
const fearDeck = useFearDeckStore()
</script>
<template>
  <base-modal
    @click-out-side="$emit('close')"
    @close="$emit('close')"
  >
    <template #header>
      Earned Fear
    </template>
    <template #body>
      <div class="flex space-x-2 mx-1 my-1">
        <template
          v-for="card in fearDeck.earned"
          :key="card"
        >
          <div
            v-if="fearDeck.showing.includes(card)"
            class="w-1/4 rounded-lg overflow-hidden shrink-0 relative"
          >
            <game-card
              :id="card"
              class="w-full"
            />
            <button
              class="absolute p-6 text-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900/30 rounded-lg"
              @click="fearDeck.setReveal(card)"
            >
              <span
                style="stroke-width: 1px;"
                class="w-20 h-20 icon-player-play"
              />
            </button>
          </div>
          <div
            v-else
            class="w-1/4 rounded-lg shrink-0 relative"
          >
            <img
              src="/img/card-back/fear.webp"
              alt="Fear Card Back"
            >
            <button
              class="absolute p-6 text-white left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900/30 rounded-lg"
              @click="fearDeck.setReveal(card)"
            >
              <span
                style="stroke-width: 1px;"
                class="icon-eye text-4xl"
              />
            </button>
          </div>
        </template>
      </div>
    </template>
  </base-modal>
</template>