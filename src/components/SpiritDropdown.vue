<script setup lang="ts">
import { ref } from 'vue'
import { SPIRIT } from '@/constant'
import { getSpiritAvatar } from '@/utils'
import { onClickOutside } from '@vueuse/core';

defineProps<{
  spirits: number[]
}>()
const emit = defineEmits(['close', 'selectSpirit'])

const dropDownEl = ref<HTMLElement | null>(null)
onClickOutside(dropDownEl, () => {
  emit('close')
})
</script>

<template>
  <div
    ref="dropDownEl"
  >
    <div
      v-for="(spirit, index) in SPIRIT"
      :key="spirit.name"
    >
      <div
        v-if="!spirits.includes(index)"
        class="h-12 bg-white right-2 border-2 overflow-hidden"
        @click="emit('selectSpirit', index)"
      >
        <img
          :src="`/img/spirit_avatar/${getSpiritAvatar(index)}`"
          alt="Spirit avatar"
          class="h-full max-w-max"
        >
      </div>
    </div>
  </div>
</template>