<script setup lang="ts">
import type { SwitchElement } from '@/components/SwitchElement/type'
import useSwitchElement from '@/components/SwitchElement/store'

const switchElementStore = useSwitchElement()
function getUnSelectedElement(switchElement: SwitchElement) {
  for (let i = 0; i < switchElement.available.length; i++) {
    const element = switchElement.available[i]
    if (element !== switchElement.selected) {
      return element
    }
  }
}
</script>

<template>
  <div class="relative flex space-x-2">
    <div v-for="(element, elementIndex) in switchElementStore.switchElements" class="cs-trigger text-white border-green-800 bg-amber-200 text-2xl font-bold" style="position: relative">
      <span :class="`icon-${element.selected.toLowerCase()}`" class="text-3xl z-[9999]" @click="switchElementStore.toggle(elementIndex)">
        <span class="path1"></span>
        <span class="path2"></span>
        <span class="path3"></span>
        <span class="path4"></span>
      </span>
      <span :class="`icon-${getUnSelectedElement(element)?.toLowerCase()}`" class="text-sm z-[9999] absolute left-0 top-0" @click="switchElementStore.toggle(elementIndex)">
        <span class="path1"></span>
        <span class="path2"></span>
        <span class="path3"></span>
        <span class="path4"></span>
      </span>
    </div>
  </div>
</template>
