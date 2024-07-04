<script setup lang="ts">
import type { PropType } from 'vue'
import type { ReplacementBoxContainer } from '@/components/SpiritPanel/type'
import { calBlock } from '@/utils'
import { useModalStore } from '@/stores/ModalStore'

const props = defineProps({
  container: {
    type: Object as PropType<ReplacementBoxContainer>,
    required: true
  },
  csStyle: {
    type: String,
    required: false
  },
  csClass: {
    type: String,
    required: false
  },
  path: {
    type: String,
    required: false
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

function showDetail() {
  if (props.path) {
    useModalStore().baseZoom = [props.path]
  }
}
</script>

<template>
  <div
    :style="calBlock(container.point, container.width, container.height, panelWidth, panelHeight)"
    class="absolute text-white rounded flex justify-center items-center overflow-hidden"
    @click="showDetail"
  >
    <img v-if="path" alt="replacement box" :style="csStyle" style="max-width: none" :src="path" />
    <slot />
  </div>
</template>
