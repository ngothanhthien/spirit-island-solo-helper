<script setup lang="ts">
import { useModalStore } from '@/stores/ModalStore'
</script>

<template>
  <div class="absolute top-0 left-0 bg-gray-900/70 w-full h-full z-[9999999]" @click="useModalStore().baseZoom = []">
    <div class="h-[95%] left-1/2 -translate-x-1/2 relative top-1/2 -translate-y-1/2 flex flex-col">
      <div class="flex justify-center flex-1 overflow-hidden relative">
        <div ref="aspectEl" class="relative flex h-full max-w-[90%] overflow-x-auto space-x-2 hide-scrollbar transition duration-500">
          <img v-for="path in useModalStore().baseZoom" :src="path" alt="Aspect details" class="rounded-2xl h-full" />
        </div>
      </div>
    </div>
  </div>
</template>
