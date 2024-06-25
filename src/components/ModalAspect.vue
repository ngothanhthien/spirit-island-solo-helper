<script setup lang="ts">
import { type DeepReadonly, ref } from 'vue'
import type { Aspect } from '@/types'
import { nameToImage } from '@/utils'
import { onClickOutside } from '@vueuse/core'
import useZoomCardSwipe from '@/composable/useZoomCardSwipe'

const props = defineProps<{
  aspects: ReadonlyArray<DeepReadonly<Aspect>>
  current: number
}>()
const emit = defineEmits(['close', 'choose'])
const aspectsImages = props.aspects.map((aspect) => {
  if (aspect.images) {
    return aspect.images.map((image) => nameToImage(image))
  }
  return [nameToImage(aspect.title)]
})
const current = ref(props.current === -1 ? 0 : props.current)
const aspectEl = ref<HTMLElement | null>(null)
const buttonEl = ref<HTMLElement | null>(null)
const nextEl = ref<HTMLElement | null>(null)
const prevEl = ref<HTMLElement | null>(null)

const { left } = useZoomCardSwipe(aspectEl, next, prev)
onClickOutside(
  aspectEl,
  () => {
    emit('close')
  },
  { ignore: [buttonEl, nextEl, prevEl] }
)
function next() {
  current.value = (current.value + 1) % aspectsImages.length
}
function prev() {
  current.value =
    (current.value - 1 + aspectsImages.length) % aspectsImages.length
}
</script>

<template>
  <div class="absolute top-0 left-0 bg-gray-900/70 w-full h-full">
    <div
      class="h-[95%] left-1/2 -translate-x-1/2 relative top-1/2 -translate-y-1/2 flex flex-col"
    >
      <div class="text-lg text-white font-semibold text-center">
        {{ current + 1 }} of {{ aspectsImages.length }}
      </div>
      <div class="flex justify-center flex-1 overflow-hidden relative">
        <div
          ref="aspectEl"
          class="relative flex h-full max-w-[90%] overflow-x-auto space-x-2 hide-scrollbar transition duration-500"
          :style="`left: ${-left}px`"
          @click="emit('choose', current)"
        >
          <img
            v-for="image in aspectsImages[current]"
            :key="image"
            :src="`/img/aspects/${image}`"
            alt="Aspect details"
            class="rounded-2xl h-full"
          />
        </div>
      </div>
    </div>
  </div>
</template>
