<script setup lang="ts">
import { computed, ref } from 'vue'
import GameCard from '@/components/base/GameCard.vue'
import BaseButton from './base/BaseButton.vue'
import { onClickOutside } from '@vueuse/core'
import { useCardZoomStore } from '@/stores/CardZoomStore'
import useZoomCardSwipe from '@/composable/useZoomCardSwipe'

const content = ref<HTMLElement | null>(null)
const cardEl = ref<HTMLElement | null>(null)
const cardZoom = useCardZoomStore()

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
          class="relative"
          :class="cardZoomClass"
          :style="`left: ${-left}px;`"
        >
          <game-card
            :id="(cardZoom.current as string)"
            class="rounded-xl h-full"
          />
        </div>
        <div
          v-if="isPowerCard"
          class="w-24"
        >
          <base-button
            button-style="secondary"
            class="mt-1 w-full"
            @click="cardZoom.setWaiting()"
          >
            <span
              v-if="cardZoom.waiting.from === 'hand'"
              class="px-2"
            >Play</span>
            <span
              v-if="['discard', 'play', 'pick', 'days-that-never-were'].includes(cardZoom.waiting.from as string)"
              class="px-2"
            >Take</span>
            <span
              v-if="cardZoom.waiting.from?.includes('player-discard')"
              class="px-2"
            >Reclaim</span>
            <span
              v-if="cardZoom.waiting.from === 'forget'"
              class="px-2"
            >Take Back</span>
            <span v-if="cardZoom.waiting.from === 'days-that-never-were-store'">
              Store
            </span>
          </base-button>
        </div>
      </div>
    </div>
  </div>
</template>
