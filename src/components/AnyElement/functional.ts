import { computed, onMounted, ref, watch } from 'vue'
import type { Element } from '@/types'
import { usePlayerCardStore } from '@/stores/PlayerCardStore'

const mapAnyElement = ref<Array<Element[]>>([[], [], [], []])
export function useAnyElement() {
  const player = usePlayerCardStore()
  function addElement(element: Element, elementIndex: number) {
    mapAnyElement.value[player.current][elementIndex] = element
  }
  const permanentElements = computed(() => {
    return player.permanentElements['Any'] ?? 0
  })
  const elements = computed(() => {
    return mapAnyElement.value[player.current]
  })
  correctElement(permanentElements.value)
  watch(permanentElements, (newValue) => {
    correctElement(newValue)
  })

  function correctElement(totalAny: number) {
    const length = mapAnyElement.value[player.current].length
    if (length < totalAny) {
      for (let i = 0; i < totalAny - length; i++) {
        mapAnyElement.value[player.current].push('Any')
      }
    } else if (length > totalAny) {
      mapAnyElement.value[player.current].splice(-totalAny)
    }
  }
  return {
    addElement,
    elements
  }
}
