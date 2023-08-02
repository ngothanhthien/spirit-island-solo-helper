<script setup lang="ts">
import { getCard, getCardImage } from '@/utils';
import { computed } from 'vue';
import { UseImage } from '@vueuse/components'

interface CardGroupViewProps {
  id: string
}
const props = withDefaults(defineProps<CardGroupViewProps>(), {

})
const card = computed(() => {
  return getCard(props.id)
})
</script>

<template>
  <use-image
    :src="getCardImage(card.name, card.path)"
    :alt="card.name"
  >
    <template #loading>
      Loading..
    </template>

    <template #error>
      Failed
    </template>
  </use-image>
</template>
