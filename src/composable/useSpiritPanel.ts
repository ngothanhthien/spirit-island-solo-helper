import type { Point } from '@/types'
import { toAbsolute } from '@/utils'
import { useElementSize } from '@vueuse/core'
import type { Ref } from 'vue'

export function useSpiritPanel(container: Ref, scale: number) {
  const { width, height } = useElementSize(container)

  function cal(point: Point) {
    const _x = toAbsolute(point.x, width.value)
    const _y = toAbsolute(point.y, height.value)
    const _WIDTH = toAbsolute(scale, width.value)
    return `left: ${_x - _WIDTH / 2}px; top: ${_y - _WIDTH / 2}px; width: ${_WIDTH}px; height: ${_WIDTH}px;`
  }

  return {
    cal
  }
}
