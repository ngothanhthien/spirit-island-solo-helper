<script setup lang="ts">
import { useModalStore } from '@/stores/ModalStore'
</script>

<template>
  <div class="absolute top-0 left-0 w-full h-full bg-gray-900/30 z-50" @click.self="useModalStore().saltDeposit = false">
    <div class="h-[85%] rounded-lg overflow-hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <img :src="`/img/invader/d-2.webp`" alt="Invader Card" class="h-full" />
    </div>
  </div>
</template>
