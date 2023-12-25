<script setup lang="ts">
import GameCard from '@/components/base/GameCard.vue'
import { useCardZoomStore } from '@/stores/CardZoomStore';
import { useDaysThatNeverWereStore } from '@/stores/DaysThatNeverWhereStore'
import { computed } from 'vue';
defineEmits(['close', 'doVisionsOfAShiftingFuture'])
const daysThatNeverWere = useDaysThatNeverWereStore()
const minor = computed(() => daysThatNeverWere.minor.slice().reverse())
const major = computed(() => daysThatNeverWere.major.slice().reverse())
const cardZoom = useCardZoomStore()
</script>
<template>
  <div class="absolute bg-gray-900/30 w-full h-full top-0 left-0">
    <div class="flex flex-col h-[90%] w-full absolute z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900">
      <div class="bg-gray-800 text-white px-3 py-2 relative grow">
        <div>Days That Never Were</div>
        <span
          class="absolute top-1 right-4 icon-x text-2xl"
          @click="$emit('close')"
        />
      </div>
      <div
        class="py-1 px-2 w-fit bg-orange-700 text-white"
        @click="$emit('doVisionsOfAShiftingFuture'); $emit('close')"
      >
        Do Visions of a Shifting Future (Event Deck)
      </div>
      <div class="h-[80%]">
        <div class="h-1/2 w-full overflow-x-auto hide-scrollbar bg-orange-300">
          <div class="flex h-full">
            <div
              v-for="card in minor"
              :key="card"
              class="shrink-0"
            >
              <game-card
                :id="card"
                class="h-full pt-1 pb-0.5 pl-1"
                @click="cardZoom.setZoom(card, minor ,'days-that-never-were')"
              />
            </div>
          </div>
        </div>
        <div class="h-1/2 w-full overflow-x-auto hide-scrollbar bg-lime-300">
          <div class="flex h-full">
            <div
              v-for="card in major"
              :key="card"
              class="shrink-0"
            >
              <game-card
                :id="card"
                class="h-full pt-1 pb-0.5 pl-1"
                @click="cardZoom.setZoom(card, major ,'days-that-never-were')"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>