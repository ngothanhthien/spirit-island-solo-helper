<script setup lang="ts">
const props = defineProps<{
  discard: string[],
  containerLength: number,
}>()
defineEmits(['swipeDown', 'swipeUp'])

</script>

<template>
    <div>Power discard</div>
</template>