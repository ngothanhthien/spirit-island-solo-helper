<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'
import GameCard from '@/components/base/GameCard.vue'
import BaseButton from './base/BaseButton.vue'
import { onClickOutside } from '@vueuse/core'
import { useCardZoomStore } from '@/stores/CardZoomStore'
import useZoomCardSwipe from '@/composable/useZoomCardSwipe'
import { useImpendingCardStore } from "@/stores/ImpendingCardStore";
import { usePlayerCardStore } from "@/stores/PlayerCardStore";
import { useMessageStore } from "@/stores/MessageStore";
import {useDaysThatNeverWereStore} from "@/stores/DaysThatNeverWhereStore";
import type { ButtonStyle } from "@/types";
const ImpendingCard = defineAsyncComponent(() => import('@/components/ImpendingCard.vue'))

const content = ref<HTMLElement | null>(null)
const cardEl = ref<HTMLElement | null>(null)
const cardZoom = useCardZoomStore()
const daysThatNeverWere = useDaysThatNeverWereStore()
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
  cardZoom.setWaiting()
}

function doImpendingCard() {
  if (usePlayerCardStore().players[impendingCardStore.index as number].energy < impendingEnergy.value) {
    useMessageStore().setMessage('Not enough energy')
    return
  }

  for (let i = 0; i < impendingEnergy.value; i++) {
    usePlayerCardStore().reduceEnergy(impendingCardStore.index as number)
  }
  impendingCardStore.add(cardZoom.current as string, impendingEnergy.value)
  usePlayerCardStore().removeCardFromHand(cardZoom.current as string, impendingCardStore.index as number)
  cardZoom.reset()
}

function addToDaysThatNeverWere() {
  daysThatNeverWere.add(cardZoom.current as string)
  cardZoom.reset()
}

interface ButtonInfo {
  text: string
  style?: ButtonStyle
  class?: string
  fn: () => void
}

const buttonInfo = computed<ButtonInfo | null>(() => {
  if (!isPowerCard.value) {
    return null
  }
  switch (cardZoom.waiting.from) {
    case 'hand':
      if (impendingCardStore.hasImpendingFeature) {
        return {
          text: 'Impending',
          style: 'impending',
          class: 'w-28 ml-12',
          fn: doImpendingCard,
        }
      }
      return {
        text: 'Play',
        fn: buttonClick,
      }
    case 'discard':
    case 'play':
    case 'days-that-never-were':
      return {
        text: 'Take',
        fn: buttonClick,
      }
    case 'pick':
      if (daysThatNeverWere.hasDaysThatNeverWere) {
        return {
          text: 'Days That Never Were',
          class: 'w-48',
          style: 'daysThatNeverWere',
          fn: addToDaysThatNeverWere,
        }
      }
      return {
        text: 'Take',
        fn: buttonClick,
      }
    case 'player-discard':
    case 'player-discard-forget':
      return {
        text: 'Reclaim',
        fn: buttonClick,
      }
    case 'impending-card':
    default:
      return null
  }
})
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
          v-if="buttonInfo"
          :class="buttonInfo.class ?? 'w-24'"
        >
          <base-button
            :button-style="buttonInfo.style ?? 'secondary'"
            class="mt-1 w-full"
            @click="buttonInfo.fn"
          >
            {{ buttonInfo.text }}
          </base-button>
        </div>
      </div>
    </div>
  </div>
</template>
