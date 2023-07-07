<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'
import { ref } from 'vue'
import IconClose from '@/components/icon/IconClose.vue'
interface BaseModalProps {
  showCloseIcon?: boolean
  isHeightFixed?: boolean
  isOverFlowX?: boolean
}
withDefaults(defineProps<BaseModalProps>(), {
  showCloseIcon: true,
  isHeightFixed: true,
  isOverFlowX: false,
})
const emit = defineEmits(['clickOutSide', 'close'])
const modalEl = ref<HTMLElement | null>(null)
const backgroundEl = ref<HTMLElement | null>(null)
onClickOutside(modalEl, (e) => {
  if (e.target === backgroundEl.value) {
    emit('clickOutSide')
  }
})
</script>

<template>
  <div ref="backgroundEl" class="bg-gray-900/30 absolute top-0 left-0 w-full h-full flex justify-center items-center z-50">
    <div ref="modalEl" :class="{'h-[90%]': isHeightFixed}" class="w-[80%] max-h-[90%] bg-white rounded-md overflow-hidden flex flex-col">
      <div class="bg-gray-900 text-white py-3 px-4 text-lg relative">
        <slot name="header" />
        <icon-close v-if="showCloseIcon" class="absolute right-4 top-3 cursor-pointer hover:opacity-70 transition" @click="emit('close')" />
      </div>
      <div :class="{'overflow-x-auto': isOverFlowX}" class="overflow-y-auto">
        <slot name="body" />
      </div>
      <div class="bg-gray-900">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>
