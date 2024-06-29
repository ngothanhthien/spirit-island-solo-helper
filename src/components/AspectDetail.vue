<script setup lang="ts">
import { computed } from 'vue'
import { useGameOptionStore } from '@/stores/GameOptionStore'
import { usePlayerCardStore } from '@/stores/PlayerCardStore'
import { nameToImage } from '@/utils'
import type { Aspect } from '@/types'
import { useModalStore } from '@/stores/ModalStore'

const playerCard = usePlayerCardStore()
const gameOption = useGameOptionStore()
const aspect = computed(() => {
  return gameOption.aspectsDetail[playerCard.current] as Aspect
})
const aspectImage = computed(() => {
  if (aspect.value.images) {
    return aspect.value.images.map((image) => nameToImage(image))
  }
  return [nameToImage(aspect.value.title)]
})
</script>

<template>
  <div class="absolute top-0 left-0 w-full h-full bg-gray-900/30 z-50 flex items-center justify-center" @click.self="useModalStore().aspectDetail = false">
    <div ref="aspectEl" class="flex h-[90%] max-w-[80%] overflow-x-auto space-x-2 hide-scrollbar">
      <img v-for="image in aspectImage" :key="image" :src="`/img/aspects/${image}`" alt="Aspect details" class="rounded-2xl h-full w-auto" />
    </div>
  </div>
</template>
