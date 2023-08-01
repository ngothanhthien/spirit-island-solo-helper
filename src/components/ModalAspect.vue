<script setup lang="ts">
import { ref } from 'vue'
import type { Aspect } from '@/types'
import { nameToImage } from '@/utils'
import { IconCaretRight, IconCaretLeft } from '@tabler/icons-vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { onClickOutside } from '@vueuse/core'

const props = defineProps<{
  aspects: Array<Aspect>,
}>()
const emit = defineEmits(['close', 'choose'])
const aspectsImages = props.aspects.map((aspect) => {
  if (aspect.images) {
    return aspect.images.map((image) => nameToImage(image))
  }
  return [nameToImage(aspect.title)]
})
const current = ref(0)
const aspectEl = ref<HTMLElement | null>()
const buttonEl = ref<HTMLElement | null>()
const nextEl = ref<HTMLElement | null>()
const prevEl = ref<HTMLElement | null>()

onClickOutside(aspectEl, () => {
  emit('close')
}, { ignore: [buttonEl, nextEl, prevEl] })
function next() {
  current.value = (current.value + 1) % aspectsImages.length
}
function prev() {
  current.value = (current.value - 1 + aspectsImages.length) % aspectsImages.length
}
</script>

<template>
  <div class="absolute top-0 left-0 bg-gray-900/70 w-full h-full">
    <div class="h-[95%] left-1/2 -translate-x-1/2 relative top-1/2 -translate-y-1/2 flex flex-col">
      <div class="flex justify-center flex-1 overflow-hidden">
        <div
          v-if="aspectsImages.length > 1 && current !== 0"
          ref="nextEl"
          class="flex items-center pr-2"
          @click="prev"
        >
          <icon-caret-left
            class="w-8 h-8 p-1 cursor-pointer text-white rounded-full bg-gray-900"
          />
        </div>
        <div
          ref="aspectEl"
          class="flex h-full max-w-[90%] overflow-x-auto space-x-2 hide-scrollbar"
          @click="emit('choose', current)"
        >
          <img
            v-for="image in aspectsImages[current]"
            :key="image"
            :src="`/img/aspects/${image}`"
            alt="Aspect details"
            class="rounded-2xl h-full"
          >
        </div>
        <div
          v-if="aspectsImages.length > 1 && current !== aspectsImages.length - 1"
          ref="prevEl"
          class="flex items-center pl-2"
          @click="next"
        >
          <icon-caret-right
            class="w-8 h-8 p-1 cursor-pointer text-white rounded-full bg-gray-900"
          />
        </div>
      </div>
      <base-button
        ref="buttonEl"
        class="mx-auto mt-2"
        @click="$emit('choose', current)"
      >
        Choose
      </base-button>
    </div>
  </div>
</template>
