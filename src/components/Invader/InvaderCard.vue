<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import NormalCard from './NormalCard.vue'
import SmallCard from './SmallCard.vue'
import { convertInvaderCardCode } from './index'
import { useElementSize } from '@vueuse/core'

const props = defineProps<{
  code: string;
  isLock?: boolean;
  isSmall?: boolean;
}>()

const parsed = computed(() => convertInvaderCardCode(props.code.toLowerCase()))
const el = useTemplateRef('el')
const { width } = useElementSize(el)
</script>

<template>
  <div ref="el" class="relative">
    <template v-if="parsed">
      <SmallCard v-if="props.isSmall" :type="parsed.type" :size="width" />
      <NormalCard v-if="!props.isSmall" :type="parsed.type" :size="width" :isEscalation="parsed.isEscalation" />
    </template>
    <img
      v-else :src="`/img/invader/${props.code.toLowerCase()}.webp`" alt="Invader Card" class="absolute w-full max-h-full rounded-lg"
      :class="{ 'border-4 border-red-700': props.isLock }"
     />
  </div>
</template>
