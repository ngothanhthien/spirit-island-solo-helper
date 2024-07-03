import { computed, ref } from 'vue'
import type { Element } from '@/types'
import type { SwitchElement } from '@/components/SwitchElement/type'
import { usePlayerCardStore } from '@/stores/PlayerCardStore'

const mapSwitchElement = ref<Array<SwitchElement[]>>([[], [], [], []])
export function useSwitchElement() {
  const playerIndex = usePlayerCardStore().current

  function toggle(elementIndex: number) {
    const elementMap = mapSwitchElement.value[playerIndex][elementIndex]
    if (elementMap) {
      elementMap.selected = elementMap.available.find((element) => element !== elementMap.selected) as Element
    }
  }

  function add(element_1: Element, element_2: Element) {
    mapSwitchElement.value[playerIndex].push({ available: [element_1, element_2], selected: element_1 })
  }

  function remove(element_1: Element, element_2: Element) {
    const index = mapSwitchElement.value[playerIndex].findIndex((element) => element.available.includes(element_1) && element.available.includes(element_2))
    if (index !== -1) {
      mapSwitchElement.value[playerIndex].splice(index, 1)
    }
  }

  const switchElements = computed(() => mapSwitchElement.value[playerIndex])

  return {
    toggle,
    add,
    remove,
    switchElements
  }
}
