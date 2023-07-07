<script setup lang="ts">
import IconReload from '@/components/icon/IconReload.vue'
import { useCardListStore } from '@/stores/CardListStore'
import { useLogStore } from '@/stores/LogStore'
import { computed } from 'vue';
interface CardDeckProps {
  shuffle: () => void,
  discard: string[],
  type: 'event' | 'minor' | 'major' | 'fear'
}
const props = defineProps<CardDeckProps>()
const cardList = useCardListStore()
const logStore = useLogStore()
const cardType = computed(() => {
  if (props.type === 'event') {
    return 'event'
  }
  return 'power'
})
function showDiscard() {
  if (props.discard.length === 0) {
    logStore.add(`Not have any ${props.type} in discard pile`, 'error')
    return
  }
  cardList.setDeck(props.discard, cardType.value)
}
</script>

<template>
  <div class="inline-block relative">
    <div class="inline-block h-64 relative">
      <img class="rounded-lg h-full" :src="`/img/card-back/${type}.webp`" :alt="`${type} card back`">
      <button @click="shuffle"
        class="inline-block bg-gray-900/20 hover:bg-gray-900/30 rounded absolute top-1 right-1 text-white z-10">
        <icon-reload class="w-6 h-6" />
      </button>
    </div>
    <div @click.self="showDiscard" class="absolute flex flex-col h-full w-full justify-center items-center top-0 space-y-4">
      <slot />
    </div>
  </div>
</template>
