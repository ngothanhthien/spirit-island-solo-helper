<script setup lang="ts">
import { Teleport, ref } from 'vue'
import { useEventDeckStore } from '@/stores/EventDeckStore'
import CardReveal from '@/components/base/CardReveal.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import IconDiscardPile from '@/components/icon/IconDiscardPile.vue'
import { useModalDiscardStore } from '@/stores/ModalDiscardStore'

const eventDeck = useEventDeckStore()
const currentEvent = ref<string | null>(null)
const modalDiscard = useModalDiscardStore()

function discardEvent() {
  eventDeck.popEvent()
  currentEvent.value = null
}
function putUnderTwoTopCard() {
  eventDeck.putUnderTwoTopCard()
  currentEvent.value = null
}
function showDiscardPile() {
  if (eventDeck.discard.length === 0) {
    return
  }
  modalDiscard.setDeck(eventDeck.discard, 'common')
}
</script>

<template>
  <div class="inline-block relative h-full">
    <div class="inline-block h-full relative">
      <img class="rounded-lg h-full" :src="`/img/card-back/event.webp`" alt="Event card back`">
      <button class="inline-block bg-gray-900/20 hover:bg-gray-900/30 rounded absolute bottom-1 right-1 text-white z-10">
        <icon-discard-pile @click="showDiscardPile" class="w-8 h-8" />
      </button>
    </div>
    <div @click.self="currentEvent = eventDeck.reveal()" class="absolute flex flex-col h-full w-full justify-center items-center top-0 space-y-4"></div>
    <teleport to="#modal">
      <card-reveal v-if="currentEvent" :card="currentEvent">
        <template #button>
          <base-button @click="discardEvent">Discard Event</base-button>
          <base-button button-style="secondary" @click="putUnderTwoTopCard">Put under two card</base-button>
        </template>
      </card-reveal>
    </teleport>
  </div>
</template>
