import { useElementSize, useSwipe } from '@vueuse/core'
import type { Ref } from 'vue'
import { computed, ref } from 'vue'

export default function (el: Ref<HTMLElement | null | undefined>, length: Ref<number>) {
  const pos = ref(0)
  let startX = 0
  const { width } = useElementSize(el)
  const viewBox = computed(() => {
    return width.value - length.value + 20
  })
  const { lengthX } = useSwipe(el, {
    onSwipeStart(e: TouchEvent) {
      if (viewBox.value < 0) {
        return
      }
      startX = pos.value
    },
    onSwipe(e: TouchEvent) {
      if (viewBox.value < 0) {
        return
      }
      pos.value = startX - lengthX.value
    },
    onSwipeEnd(e: TouchEvent) {
      if (viewBox.value < 0) {
        return
      }
      if (pos.value > 0) {
        pos.value = 0
      }
      if (pos.value < -viewBox.value) {
        pos.value = -viewBox.value
      }
    },
  })
  return { pos }
}
