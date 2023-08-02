<script setup lang="ts">
import { getCard, getCardImage } from '@/utils';
import { computed } from 'vue';

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
  <img
    :src="getCardImage(card.name, card.path)"
    :alt="card.name"
  >
</template>
