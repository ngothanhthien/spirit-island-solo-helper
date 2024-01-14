<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'
import GameCard from '@/components/base/GameCard.vue'
import BaseButton from './base/BaseButton.vue'
import { onClickOutside } from '@vueuse/core'
import { useCardZoomStore } from '@/stores/CardZoomStore'
import useZoomCardSwipe from '@/composable/useZoomCardSwipe'
import { useImpendingCardStore } from "@/stores/ImpendingCardStore";
import {usePlayerCardStore} from "@/stores/PlayerCardStore";
import {useMessageStore} from "@/stores/MessageStore";
const ImpendingCard = defineAsyncComponent(() => import('@/components/ImpendingCard.vue'))

const content = ref<HTMLElement | null>(null)
const cardEl = ref<HTMLElement | null>(null)
const cardZoom = useCardZoomStore()
const impendingCardStore = useImpendingCardStore()
const impendingEnergy = ref(0)

const { left } = useZoomCardSwipe(cardEl, cardZoom.next, cardZoom.previous)

const type = computed(() => {
  return cardZoom.current?.split('-')[0]
})
const isPowerCard = computed(() => {
  return type.value === 'minor' || type.value === 'major' || type.value?.includes('unique')
})

onClickOutside(content, () => {
  cardZoom.reset()
})

const cardZoomClass = computed(() => {
  if (!isPowerCard.value) {
    return 'h-full'
  }

  if (cardZoom.waiting.from?.includes('player-discard')) {
    return 'h-[80%]'
  }

  return 'h-[90%]'
})

function buttonClick() {
  if (impendingCardStore.index !== null && cardZoom.waiting.from === 'hand') {
    if (usePlayerCardStore().players[impendingCardStore.index].energy < impendingEnergy.value) {
      useMessageStore().setMessage('Not enough energy')
      return
    }

    for (let i = 0; i < impendingEnergy.value; i++) {
      usePlayerCardStore().reduceEnergy(impendingCardStore.index)
    }
    impendingCardStore.add(cardZoom.current as string, impendingEnergy.value)
    usePlayerCardStore().removeCardFromHand(cardZoom.current as string, impendingCardStore.index)
    cardZoom.reset()

    return
  }
  cardZoom.setWaiting()
}
</script>

<template>
  <div
    class="absolute h-full w-full bg-gray-900/30 top-0 left-0 flex items-center justify-center z-[100]"
  >
    <div
      ref="content"
      class="h-[90%] flex"
    >
      <div class="flex flex-col items-center">
        <div
          v-if="cardZoom.waiting.from?.includes('player-discard')"
          class="w-24"
        >
          <base-button
            button-style="secondary"
            class="mb-1 w-full"
            @click="cardZoom.setWaiting('player-discard-forget')"
          >
            Forget
          </base-button>
        </div>
        <div
          ref="cardEl"
          class="relative flex"
          :class="cardZoomClass"
          :style="`left: ${-left}px;`"
        >
          <game-card
            v-if="impendingCardStore.index === null || cardZoom.waiting.from !== 'hand'"
            :id="(cardZoom.current as string)"
            class="rounded-xl h-full"
          />
          <impending-card
            v-else
            :card="(cardZoom.current as string)"
            :energy="impendingEnergy"
            class="rounded-xl h-full"
            @increase-energy="impendingEnergy++"
            @decrease-energy="impendingEnergy--"
          />
        </div>
        <div
          v-if="isPowerCard"
          :class="impendingCardStore.index === null ? 'w-24' : 'w-28 ml-12'"
        >
          <base-button
            :button-style="impendingCardStore.index === null ? 'secondary' : 'impending'"
            class="mt-1 w-full"
            @click="buttonClick"
          >
            <span
              v-if="cardZoom.waiting.from === 'hand'"
              class="px-2"
            >{{ impendingCardStore.index === null ? 'Play' : 'Impending' }}</span>
            <span
              v-if="['discard', 'play', 'pick', 'days-that-never-were'].includes(cardZoom.waiting.from as string)"
              class="px-2"
            >Take</span>
            <span
              v-if="cardZoom.waiting.from?.includes('player-discard')"
              class="px-2"
            >Reclaim</span>
            <span v-if="cardZoom.waiting.from === 'days-that-never-were-store'">
              Store
            </span>
          </base-button>
        </div>
      </div>
    </div>
  </div>
</template>
