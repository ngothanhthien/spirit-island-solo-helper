<script setup lang="ts">
import { getCard, getCardImage } from '@/utils'
import { computed } from 'vue'

interface CardGroupViewProps {
  id: string
}
const props = withDefaults(defineProps<CardGroupViewProps>(), {})
const card = computed(() => {
  return getCard(props.id)
})
</script>

<template>
  <img
    :data-id="id"
    :src="getCardImage(card.name, card.path)"
    :alt="card.name"
    style="aspect-ratio: 278/390; object-fit: cover"
  />
</template>
