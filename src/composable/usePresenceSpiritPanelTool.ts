import { reactive, type Ref } from 'vue'
import { toAbsolute, toPercent } from '@/utils'
import { useElementSize, useMouseInElement } from '@vueuse/core'
import type { SpiritTypeLocation } from '@/types'

export function usePresenceSpiritPanelTool(container: Ref) {
  const map = reactive({
    last: { x: 51.45, y: 30.5 },
    WIDTH: 7.3,
    TOP: 5,
    BOT: 5,
    SPACE_Y: 15
  })
  const { x, y } = useMouseInElement(container)
  const { width, height } = useElementSize(container)

  function save() {
    map.last = {
      x: toPercent(x.value, width.value),
      y: toPercent(y.value, height.value)
    }
  }
  function cal(i: number, bot = false) {
    const _x = toAbsolute(map.last.x, width.value)
    const _y = toAbsolute(map.last.y, height.value)
    const _SPACE_Y = bot ? toAbsolute(map.SPACE_Y, height.value) : 0
    const _WIDTH = toAbsolute(map.WIDTH, width.value)
    return `left: ${_x + i * _WIDTH - _WIDTH / 2}px; top: ${_y + _SPACE_Y - _WIDTH / 2}px; width: ${_WIDTH}px; height: ${_WIDTH}px;`
  }

  return {
    map,
    cal,
    save
  }
}

export function useSpiritPanel(container: Ref, location: SpiritTypeLocation) {
  const { width, height } = useElementSize(container)
  function cal(i: number, bot = false) {
    const _x = toAbsolute(location.last.x, width.value)
    const _y = toAbsolute(location.last.y, height.value)
    const _SPACE_Y = bot ? toAbsolute(location.SPACE_Y, height.value) : 0
    const _WIDTH = toAbsolute(location.WIDTH, width.value)
    return `left: ${_x + i * _WIDTH - _WIDTH / 2}px; top: ${_y + _SPACE_Y - _WIDTH / 2}px; width: ${_WIDTH}px; height: ${_WIDTH}px;`
  }

  return {
    cal
  }
}
