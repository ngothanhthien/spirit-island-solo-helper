<script setup lang="ts">
import { computed, ref } from 'vue'
import GameCard from '@/components/base/GameCard.vue'
import BaseButton from './base/BaseButton.vue'
import IconCaretRight from '@/components/icon/IconCaretRight.vue'
import IconCaretLeft from '@/components/icon/IconCaretLeft.vue'
import { onClickOutside } from '@vueuse/core';
import { useCardZoomStore } from '@/stores/CardZoomStore'
const content = ref<HTMLElement | null>(null)
const cardZoom = useCardZoomStore()
const type = computed(() => {
  return cardZoom.current?.split('-')[0]
})

function pickCard() {
  cardZoom.setWaiting(cardZoom.current as string)
  cardZoom.reset()
}
onClickOutside(content, () => {
  cardZoom.reset()
})
</script>

<template>
  <div class="absolute h-full w-full bg-gray-900/30 top-0 left-0 flex items-center justify-center z-[100]">
    <div class="h-[90%]">
      <div ref="content" class="h-[80%] flex">
        <button v-if="cardZoom.deck.length > 0" @click="cardZoom.previous()" class="flex items-center text-white group">
          <icon-caret-left class="w-10 h-10 p-1 mr-2 bg-slate-900 rounded-full group-hover:bg-slate-700 transition" />
        </button>
        <div class="flex flex-col items-center">
          <game-card :id="(cardZoom.current as string)" class="h-full" />
          <base-button v-if="type === 'minor' || type === 'major'" button-style="secondary" @click="pickCard" class="mt-2"><span class="px-2">Pick</span></base-button>
        </div>
        <button v-if="cardZoom.deck.length > 0" @click="cardZoom.next()" class="flex items-center text-white group">
          <icon-caret-right class="w-10 h-10 p-1 ml-2 group-hover:bg-slate-700 transition bg-slate-900 rounded-full" />
        </button>
      </div>
    </div>
  </div>
</template>
