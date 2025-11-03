<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { useElementSize } from '@vueuse/core'

const props = defineProps<{
  stage: number;
}>()

const el = useTemplateRef('el')
const { width } = useElementSize(el)

const romanNumber = computed(() => {
  switch (props.stage) {
    case 1:
      return 'I';
    case 2:
      return 'II';
    case 3:
      return 'III';
    default:
      return '';
  }
})
</script>

<template>
  <div ref="el" class="aspect-square">
    <div class="sprite-3 w-fit rounded-[4px] relative overflow-hidden">
      <div class="tile"
        :style="{ '--w': width + 'px', '--x': 0, '--y': 2 }"
      />
      <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        {{ romanNumber }}
      </div>
    </div>
  </div>
</template>
