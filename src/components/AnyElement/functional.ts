import { computed, ref } from 'vue'
import type { Element } from '@/types'
import { usePlayerCardStore } from '@/stores/PlayerCardStore'

const mapAnyElement = ref<Array<Element[]>>([[], [], [], []])
export function useAnyElement() {
  const player = usePlayerCardStore()
  function addElement(element: Element, elementIndex: number) {
    mapAnyElement.value[player.current][elementIndex] = element
  }
  const elements = computed(() => {
    const totalAnyElement = player.elements['Any']
    const length = mapAnyElement.value[player.current].length
    if (length < totalAnyElement) {
      for (let i = 0; i < totalAnyElement - length; i++) {
        mapAnyElement.value[player.current].push('Any')
      }
    }
    return mapAnyElement.value[player.current]
  })
  return {
    addElement,
    elements,
    mapAnyElement
  }
}