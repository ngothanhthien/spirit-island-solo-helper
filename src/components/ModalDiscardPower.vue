<script setup lang="ts">
import BaseModal from '@/components/base/BaseModal.vue'
import GameCard from '@/components/base/GameCard.vue'

import { useCardZoomStore } from '@/stores/CardZoomStore'
import { useDiscardPowerStore } from '@/stores/PowerDeckStore';

defineEmits(['close'])
const cardZoom = useCardZoomStore()
const discardPower = useDiscardPowerStore()
</script>

<template>
  <base-modal
    :is-height-fixed="false"
    @close="$emit('close')"
    @click-out-side="$emit('close')"
  >
    <template #header>
      <div class="capitalize">
        Power discard
      </div>
    </template>
    <template #body>
      <div class="flex flex-wrap m-0.5">
        <game-card
          v-for="card in discardPower.discardView"
          :id="card"
          :key="card"
          class="w-1/6 px-0.5 py-0.5"
          @click="cardZoom.setZoom(card, discardPower.discardView, 'discard')"
        />
      </div>
    </template>
  </base-modal>
</template>
