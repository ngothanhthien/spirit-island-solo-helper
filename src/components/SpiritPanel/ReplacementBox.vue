<script setup lang="ts">
import type { PropType } from 'vue'
import type { ReplacementBoxContainer } from '@/components/SpiritPanel/type'
import { calBlock } from '@/utils'
import { useModalStore } from '@/stores/ModalStore'

defineProps({
  container: {
    type: Object as PropType<ReplacementBoxContainer>,
    required: true
  },
  csStyle: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  panelWidth: {
    type: Number,
    required: true
  },
  panelHeight: {
    type: Number,
    required: true
  }
})
</script>

<template>
  <div
    :style="calBlock(container.point, container.width, container.height, panelWidth, panelHeight)"
    class="absolute text-white rounded flex justify-center items-center overflow-hidden"
    @click="useModalStore().baseZoom = path"
  >
    <img alt="replacement box" :style="csStyle" style="max-width: none" :src="path" />
  </div>
</template>
