<script setup lang="ts">
import { type PropType, ref } from 'vue'
import type { Element as csElement } from '@/types'
import { removeCard } from '@/utils'
import { OnClickOutside } from '@vueuse/components'

defineProps({
  elements: {
    type: Object as PropType<csElement[]>,
    required: true
  },
  isTemp: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['selectElement'])
const showSelection = ref<null | number>(null)

function customClick(e: MouseEvent) {
  const { clientX, clientY } = e
  const elements = document.elementsFromPoint(clientX, clientY)
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i]
    const value = element.getAttribute('data-element')
    const index = element.getAttribute('data-index')
    if (value) {
      emit('selectElement', value, parseInt(index as string))
      showSelection.value = null
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
  <OnClickOutside @trigger="showSelection = null" class="relative flex space-x-2">
    <div
      v-for="(elementCurrent, elementIndex) in elements"
      class="cs-trigger text-white text-2xl font-bold"
      :class="{
        'border-green-800 bg-amber-200': !isTemp
      }"
      style="position: relative"
    >
      <span :class="`icon-${elementCurrent.toLowerCase()}`" class="text-3xl z-[9999]" @click="showSelection = elementIndex">
        <span class="path1"></span>
        <span class="path2"></span>
        <span class="path3"></span>
        <span class="path4"></span>
      </span>
      <template v-if="showSelection === elementIndex">
        <div
          v-for="(element, index) in getAvailableElements(elementCurrent)"
          :key="element"
          class="absolute top-1/2 left-1/2"
          :style="`transform: translate(-50%, -50%) rotate(${15 * index - 35}deg); width: 220px; height: 220px;`"
          @click="customClick"
        >
          <span
            :data-element="element"
            :data-index="elementIndex"
            :class="`icon-${element.toLowerCase()}`"
            :style="`transform: rotate(${35 - 15 * index}deg)`"
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
  </OnClickOutside>
</template>
