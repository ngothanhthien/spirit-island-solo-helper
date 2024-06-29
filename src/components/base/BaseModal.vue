<script setup lang="ts">
import { onClickOutside, useScroll, useSwipe } from '@vueuse/core'
import { ref, useSlots } from 'vue'
interface BaseModalProps {
  showCloseIcon?: boolean
  isHeightFixed?: boolean
  isOverFlowX?: boolean
}
withDefaults(defineProps<BaseModalProps>(), {
  showCloseIcon: true,
  isHeightFixed: true,
  isOverFlowX: false
})
const emit = defineEmits(['clickOutSide', 'close'])
const slots = useSlots()
const modalEl = ref<HTMLElement | null>(null)
const backgroundEl = ref<HTMLElement | null>(null)
onClickOutside(modalEl, (e) => {
  if (e.target === backgroundEl.value) {
    emit('clickOutSide')
  }
})
const modalContentEl = ref<HTMLElement | null>()
const { y } = useScroll(modalContentEl)
const { lengthY } = useSwipe(modalContentEl, {
  onSwipe() {
    y.value += lengthY.value / 5
  }
})
</script>

<template>
  <div ref="backgroundEl" class="bg-gray-900/30 absolute top-0 left-0 w-full h-full flex justify-center items-center z-50">
    <div ref="modalEl" :class="{ 'h-[90%]': isHeightFixed }" class="w-[80%] max-h-[90%] overflow-hidden flex flex-col">
      <div class="bg-gray-900 text-white py-2 px-4 text-lg relative rounded-t-md">
        <slot name="header" />
        <span v-if="showCloseIcon" class="icon-x text-2xl absolute right-4 top-3 cursor-pointer hover:opacity-70 transition" @click="emit('close')" />
      </div>
      <div
        ref="modalContentEl"
        :class="{
          'overflow-x-auto': isOverFlowX,
          'rounded-b-md': !slots.footer
        }"
        class="overflow-y-auto border-2 border-gray-800 bg-white"
      >
        <slot name="body" />
      </div>
      <div class="bg-gray-900 rounded-b-md">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
