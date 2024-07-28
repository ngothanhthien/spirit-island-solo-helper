<script setup lang="ts">
import type { ElementMap, InnatePower } from '@/types'
import { computed, type PropType } from 'vue'
import { usePlayerCardStore } from '@/stores/PlayerCardStore'

const props = defineProps({
  innate: Object as PropType<InnatePower>
})
const elements = computed(() => {
  return props.innate?.elements
})
const currentElements = computed(() => {
  return usePlayerCardStore().elements
})
const CORRECT_ORDER = ['Sun', 'Moon', 'Fire', 'Air', 'Water', 'Earth', 'Plant', 'Animal']
function sortKeys(element: ElementMap) {
  const target = Object.keys(element)
  return CORRECT_ORDER.filter((key) => target.includes(key))
}

function isFullActive(element: ElementMap) {
  if (!elements.value) return false
  return Object.keys(element).every((key) => {
    return currentElements.value[key] >= element[key]
  })
}
</script>

<template>
  <div class="space-y-1 w-fit rounded py-1" :class="innate?.fast ? 'bg-orange-700/20' : 'bg-purple-900/20'">
    <div class="flex px-2 relative" v-for="element in elements">
      <div
        v-for="(key, index) in sortKeys(element)"
        :class="{
          'opacity-40': currentElements[key] < element[key],
          'ml-2': index > 0
        }"
        class="w-4 h-4 flex items-center justify-center relative z-50"
      >
        <span class="text-xs">{{ element[key] }}</span>
        <span :class="`icon-${key.toLowerCase()}`" class="text-sm">
          <span class="path1"></span>
          <span class="path2"></span>
          <span class="path3"></span>
          <span class="path4"></span>
        </span>
      </div>
      <div class="absolute w-full h-2 left-0 top-1/2 -translate-y-1/2 z-10" :class="{ 'bg-lime-500': isFullActive(element) }" />
    </div>
  </div>
</template>
