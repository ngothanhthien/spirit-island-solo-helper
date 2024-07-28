import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Element } from '@/types'
import type { SwitchElement } from '@/components/SwitchElement/type'
import { usePlayerCardStore } from '@/stores/PlayerCardStore'

export default defineStore('switchElement', () => {
  const mapSwitchElement = ref<Array<SwitchElement[]>>([[], [], [], []])

  const playerIndex = computed(() => usePlayerCardStore().current)

  function toggle(elementIndex: number) {
    const elementMap = mapSwitchElement.value[playerIndex.value][elementIndex]
    if (elementMap) {
      elementMap.selected = elementMap.available.find((element) => element !== elementMap.selected) as Element
    }
  }

  function add(element_1: Element, element_2: Element) {
    mapSwitchElement.value[playerIndex.value].push({ available: [element_1, element_2], selected: element_1 })
  }

  function remove(element_1: Element, element_2: Element) {
    const index = mapSwitchElement.value[playerIndex.value].findIndex((element) => element.available.includes(element_1) && element.available.includes(element_2))
    if (index !== -1) {
      mapSwitchElement.value[playerIndex.value].splice(index, 1)
    }
  }

  function reset() {
    mapSwitchElement.value = [[], [], [], []]
  }

  const switchElements = computed(() => {
    return mapSwitchElement.value[playerIndex.value]
  })

  return {
    toggle,
    add,
    remove,
    switchElements,
    reset,
  }
}, {
  persist: true,
})