<script setup lang="ts">
import { useMessageStore } from '@/stores/MessageStore';

const messageStore = useMessageStore()
</script>

<template>
  <Transition name="toast">
    <div
      v-if="messageStore.message"
      class="absolute top-8 z-[9999] text-white text-lg font-semibold w-full text-center bg-gray-900/40"
      @click="messageStore.clearMessage"
    >
      {{ messageStore.message }}
    </div>
  </Transition>
</template>