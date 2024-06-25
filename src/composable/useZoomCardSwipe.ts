import { useSwipe } from '@vueuse/core'
import { computed, ref, type Ref } from 'vue'

export default function useZoomCardSwipe(
  el: Ref<HTMLElement | null>,
  next: () => void,
  prev: () => void
) {
  const aspectWidth = computed(() => el.value?.offsetWidth)
  const left = ref(0)
  const { lengthX } = useSwipe(el, {
    onSwipe() {
      if (aspectWidth.value) {
        left.value = lengthX.value
      }
    },
    onSwipeEnd() {
      left.value = 0
      if (
        aspectWidth.value &&
        Math.abs(lengthX.value) / aspectWidth.value >= 0.2
      ) {
        if (lengthX.value > 0) {
          next()
        } else {
          prev()
        }
      }
    }
  })
  return { left }
}
