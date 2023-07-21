<script setup lang="ts">
import { computed, ref } from 'vue'
import GameCard from '@/components/base/GameCard.vue'
import BaseButton from './base/BaseButton.vue'
import { IconCaretRight, IconCaretLeft } from '@tabler/icons-vue'
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
    <div ref="content" :class="{
      'translate-x-[22px]': !cardZoom.canPrevious,
      'translate-x-[-22px]': !cardZoom.canNext
    }" class="h-[90%] flex">
      <button v-if="cardZoom.canPrevious" @click="cardZoom.previous()" class="flex items-center text-white group">
        <icon-caret-left class="w-9 h-9 p-1 mr-2 bg-slate-900 rounded-full group-hover:bg-slate-700 transition" />
      </button>
      <div class="flex flex-col items-center">
        <game-card :id="(cardZoom.current as string)" class="h-full" />
        <base-button v-if="type === 'minor' || type === 'major'" button-style="secondary" @click="pickCard"
          class="mt-2"><span class="px-2">Pick</span></base-button>
      </div>
      <button v-if="cardZoom.canNext" @click="cardZoom.next()" class="flex items-center text-white group">
        <icon-caret-right class="w-9 h-9 p-1 ml-2 group-hover:bg-slate-700 transition bg-slate-900 rounded-full" />
      </button>
    </div>
  </div>
</template>
