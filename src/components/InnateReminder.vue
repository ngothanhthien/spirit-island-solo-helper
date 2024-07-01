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

function isFullActive(element: ElementMap) {
  if (!elements.value) return false
  return Object.keys(element).every((key) => {
    return currentElements.value[key] >= element[key]
  })
}
</script>

<template>
  <div class="space-y-1 w-fit rounded py-1" :class="innate?.fast ? 'bg-orange-500/20' : 'bg-purple-900/20'">
    <div class="flex space-x-2 px-2" v-for="element in elements" :class="{ 'bg-lime-500': isFullActive(element) }">
      <div v-for="key in Object.keys(element)" :class="{ 'opacity-40': currentElements[key] < element[key] }" class="w-4 h-4 flex items-center justify-center">
        <span class="text-xs">{{ element[key] }}</span>
        <span :class="`icon-${key.toLowerCase()}`" class="text-sm">
          <span class="path1"></span>
          <span class="path2"></span>
          <span class="path3"></span>
          <span class="path4"></span>
        </span>
      </div>
    </div>
  </div>
</template>
