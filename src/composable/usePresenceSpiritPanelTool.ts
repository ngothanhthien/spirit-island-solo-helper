import { reactive, ref, type Ref } from 'vue'
import { toPercent } from '@/utils'
import { useElementSize, useMouseInElement } from '@vueuse/core'
import type { Presence } from '@/types'
import { useSpiritPanel } from '@/composable/useSpiritPanel'

export function usePresenceSpiritPanelTool(container: Ref) {
  const map = reactive({
    presences: [
      {
        point: { x: 79.6, y: 23 }
      }
    ],
    scale: 5,
    energy: 0,
    cardPlay: 1
  })

  const lastPoint = reactive({
    x: 0,
    y: 0
  })
  const { x, y, isOutside } = useMouseInElement(container)
  const { width, height } = useElementSize(container)
  function save() {
    if (!isOutside.value) {
      lastPoint.x = toPercent(x.value, width.value)
      lastPoint.y = toPercent(y.value, height.value)
    }
  }

  const { cal, calBlock } = useSpiritPanel(container, map.scale)

  function label(presence: Presence) {
    let prefix = ''
    switch (presence.type) {
      case 'energy':
        prefix = 'E'
        break
      case 'element':
        break
      case 'card-play':
        prefix = 'C'
        break
    }

    return `${prefix}${presence.value ?? ''}`
  }

  const SPACE_Y = ref(5)

  return {
    SPACE_Y,
    map,
    cal,
    calBlock,
    save,
    label,
    last: lastPoint
  }
}
