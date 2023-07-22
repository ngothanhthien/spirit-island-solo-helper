<script setup lang="ts">
import BaseModal from '@/components/base/BaseModal.vue'
import GameCard from '@/components/base/GameCard.vue'
import BaseButton from './base/BaseButton.vue';

import { useCardZoomStore } from '@/stores/CardZoomStore'
import { usePlayerCardStore } from '@/stores/PlayerCardStore';

defineEmits(['close', 'takeBack'])

const cardZoom = useCardZoomStore()
const playerCard = usePlayerCardStore()
</script>

<template>
  <base-modal
    :is-height-fixed="false"
    @close="$emit('close')"
    @click-out-side="$emit('close')"
  >
    <template #header>
      <div>Forget Power</div>
    </template>
    <template #body>
      <div class="flex flex-wrap m-0.5">
        <div v-for="card in playerCard.forget" :key="`forget-${card}`" class="w-1/4 p-1">
            <game-card
              :id="card"
              @click="cardZoom.setZoom(card, playerCard.forget, 'forget')"
            />
            <div class="flex justify-center w-full">
                <base-button button-style="secondary" class="mt-1" @click="$emit('takeBack', card)">Take Back</base-button>
            </div>
        </div>
      </div>
    </template>
  </base-modal>
</template>