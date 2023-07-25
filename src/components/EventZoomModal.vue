<script setup lang="ts">
import { useEventDeckStore } from '@/stores/EventDeckStore';
import GameCard from './base/GameCard.vue';
import BaseButton from './base/BaseButton.vue';

const eventDeck = useEventDeckStore()
</script>

<template>
  <div
    class="absolute top-0 left-0 z-40 h-full w-full flex justify-center items-center bg-gray-900/40"
    @click.self="eventDeck.reveal = null"
  >
    <game-card
      :id="(eventDeck.reveal as string)"
      class="h-full rounded-lg"
    />
    <div class="space-y-3 ml-2">
      <div v-if="eventDeck.reveal === 'event-france'">
        <base-button
          button-style="secondary"
          @click="eventDeck.doFranceEvent"
        >
          Do France Event
        </base-button>
      </div>
      <template v-else>
        <div>
          <base-button
            class="mt-4 w-full"
            button-style="secondary"
            @click="eventDeck.popEvent"
          >
            Discard
          </base-button>
        </div>
        <div>
          <base-button
            button-style="secondary"
            @click="eventDeck.putUnderTwoTopCard"
          >
            Put under 2 top card
          </base-button>
        </div>
      </template>
    </div>
  </div>
</template>