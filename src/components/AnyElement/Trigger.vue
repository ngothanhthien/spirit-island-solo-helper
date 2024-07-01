<script setup lang="ts">
import { useAnyElement } from '@/components/AnyElement/functional'
import { computed, ref } from 'vue'
import type { Element as csElement } from '@/types'
import { removeCard } from '@/utils'

const { addElement, elements } = useAnyElement()
const isShow = ref<number | null>(null)
function toggle(index: number) {
  if (isShow.value === index) {
    isShow.value = null
  } else {
    isShow.value = index
  }
}

function onClickElement(element: csElement, elementIndex: number) {
  addElement(element, elementIndex)
  isShow.value = null
}

function customClick(e: MouseEvent) {
  const { clientX, clientY } = e
  const elements = document.elementsFromPoint(clientX, clientY)
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i]
    const value = element.getAttribute('data-element')
    const index = element.getAttribute('data-index')
    if (value) {
      onClickElement(value, parseInt(index as string))
      break
    }
  }
}

function getAvailableElements(element: csElement) {
  const output = ['Sun', 'Moon', 'Fire', 'Air', 'Water', 'Earth', 'Plant', 'Animal']
  removeCard(output, element)
  return output
}
</script>

<template>
  <div class="relative flex space-x-2">
    <div v-for="(elementCurrent, elementIndex) in elements" class="cs-trigger text-white border-green-800 bg-amber-200 text-2xl font-bold" style="position: relative">
      <span :class="`icon-${elementCurrent.toLowerCase()}`" class="text-3xl z-[9999]" @click="toggle(elementIndex)">
        <span class="path1"></span>
        <span class="path2"></span>
        <span class="path3"></span>
        <span class="path4"></span>
      </span>
      <template v-if="isShow === elementIndex">
        <div
          v-for="(element, index) in getAvailableElements(elementCurrent)"
          :key="element"
          class="absolute top-1/2 left-1/2"
          :style="`transform: translate(-50%, -50%) rotate(${20 * index - 45}deg); width: 180px; height: 180px;`"
          @click="customClick"
        >
          <span
            :data-element="element"
            :data-index="elementIndex"
            :class="`icon-${element.toLowerCase()}`"
            :style="`transform: rotate(${45 - 20 * index}deg)`"
            class="relative text-2xl bg-amber-500 rounded-full p-2 inline-block"
          >
            <span class="path1" />
            <span class="path2" />
            <span class="path3" />
            <span class="path4" />
          </span>
        </div>
      </template>
    </div>
  </div>
</template>
