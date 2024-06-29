<script setup lang="ts">
import { useModalStore } from '@/stores/ModalStore'
</script>

<template>
  <div @click="useModalStore().panel = true" class="cs-trigger text-white border-red-800 bg-red-700 text-2xl font-bold">P</div>
</template>
