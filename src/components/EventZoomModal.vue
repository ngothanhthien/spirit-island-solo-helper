<script setup lang="ts">
import { ref, watch } from 'vue'
import { useEventDeckStore } from '@/stores/EventDeckStore'
import GameCard from './base/GameCard.vue'
import BaseButton from './base/BaseButton.vue'

const eventDeck = useEventDeckStore()
const isRunAction = ref(false)
const isRunAction_2 = ref(false)
watch(
  () => eventDeck.draw.length,
  () => {
    isRunAction.value = false
  }
)
function doAction1() {
  eventDeck.revealDetail?.action?.fn()
  isRunAction.value = true
}
function doAction2() {
  eventDeck.revealDetail?.action_2?.fn()
  isRunAction_2.value = true
}
</script>

<template>
  <div class="absolute top-0 left-0 z-40 h-full w-full flex justify-center items-center bg-gray-900/40" @click.self="eventDeck.reveal = null">
    <game-card :id="eventDeck.reveal as string" class="h-full rounded-lg" />
    <div class="space-y-3 ml-2">
      <div v-if="eventDeck.reveal === 'event-france'">
        <base-button button-style="secondary" @click="eventDeck.doFranceEvent"> Do France Event </base-button>
      </div>
      <template v-else>
        <div>
          <base-button class="mt-4 w-full" button-style="secondary" @click="eventDeck.popEvent"> Discard </base-button>
        </div>
        <div v-if="eventDeck.revealDetail && eventDeck.revealDetail.action && !isRunAction">
          <base-button class="mt-4 w-full" button-style="warning" @click="doAction1">
            {{ eventDeck.revealDetail.action.title }}
          </base-button>
        </div>
        <div v-if="eventDeck.revealDetail && eventDeck.revealDetail.action_2 && !isRunAction_2">
          <base-button class="mt-4 w-full" button-style="warning" @click="doAction2">
            {{ eventDeck.revealDetail.action_2.title }}
          </base-button>
        </div>
      </template>
    </div>
  </div>
</template>
