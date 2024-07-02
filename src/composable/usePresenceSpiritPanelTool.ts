import { reactive, ref, type Ref } from 'vue'
import { toPercent } from '@/utils'
import { useElementSize, useMouseInElement } from '@vueuse/core'
import type { Presence } from '@/types'
import { useSpiritPanel } from '@/composable/useSpiritPanel'

export function usePresenceSpiritPanelTool(container: Ref) {
  const map = reactive({
    presences: [
      {
        point: {
          x: 36.6,
          y: 23.5
        },
        type: 'another'
      },
      {
        type: 'another',
        point: {
          x: 36.6,
          y: 36.2
        }
      },
      {
        type: 'another',
        point: {
          x: 35.3,
          y: 47.7
        }
      },
      {
        type: 'another',
        point: {
          x: 42.8,
          y: 47.7
        }
      },
      {
        type: 'another',
        value: 0,
        point: {
          x: 42.8,
          y: 61.8
        }
      },
      {
        type: 'another',
        value: 0,
        point: {
          x: 35.3,
          y: 61.8
        }
      },
      {
        type: 'energy',
        value: '2',
        point: {
          x: 50.1,
          y: 77.5
        }
      },
      {
        type: 'another',
        value: 0,
        point: {
          x: 57.6,
          y: 77.5
        }
      },
      {
        type: 'energy',
        value: '4',
        point: {
          x: 65.2,
          y: 77.5
        }
      },
      {
        type: 'another',
        value: 0,
        point: {
          x: 50.1,
          y: 91
        }
      },
      {
        type: 'another',
        value: 0,
        point: {
          x: 57.6,
          y: 91
        }
      },
      {
        type: 'card-play',
        value: '3',
        point: {
          x: 65.2,
          y: 91
        }
      }
    ],
    scale: 6,
    energy: 1,
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

    return `${prefix}${presence.value}`
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
