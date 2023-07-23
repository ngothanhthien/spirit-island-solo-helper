<script setup lang="ts">
import { computed, ref } from 'vue'
import GameCard from '@/components/base/GameCard.vue'
import BaseButton from './base/BaseButton.vue'
import { IconCaretRight, IconCaretLeft } from '@tabler/icons-vue'
import { onClickOutside } from '@vueuse/core'
import { useCardZoomStore } from '@/stores/CardZoomStore'

const content = ref<HTMLElement | null>(null)
const cardZoom = useCardZoomStore()
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
      :class="{
        'translate-x-[22px]': !cardZoom.canPrevious,
        'translate-x-[-22px]': !cardZoom.canNext,
      }"
      class="h-[90%] flex"
    >
      <div
        v-if="cardZoom.canPrevious"
        class="flex items-center text-white group"
        @click="cardZoom.previous()"
      >
        <icon-caret-left
          class="w-9 h-9 p-1 mr-2 bg-slate-900 rounded-full group-hover:bg-slate-700 transition"
        />
      </div>
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
        <game-card
          :id="(cardZoom.current as string)"
          :class="cardZoomClass"
          class="rounded-xl"
        />
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
              v-if="['discard', 'play', 'pick'].includes(cardZoom.waiting.from as string)"
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
          </base-button>
        </div>
      </div>
      <div
        v-if="cardZoom.canNext"
        class="flex items-center text-white group"
        @click="cardZoom.next()"
      >
        <icon-caret-right
          class="w-9 h-9 p-1 ml-2 group-hover:bg-slate-700 transition bg-slate-900 rounded-full"
        />
      </div>
    </div>
  </div>
</template>
