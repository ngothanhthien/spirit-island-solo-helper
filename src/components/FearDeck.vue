<script setup lang="ts">
import { useFearDeckStore } from '@/stores/FearDeckStore';
import { IconStack2, IconDeviceTabletPlus, IconDeviceTabletOff } from '@tabler/icons-vue'

defineEmits(['showEarnedFear', 'showFearDeck'])
const fearDeck = useFearDeckStore()
</script>

<template>
  <div class="relative h-full inline-block">
    <img
      src="/img/card-back/fear.webp"
      alt="Event Card Background"
      class="rounded-lg h-full"
    >
    <button
      class="absolute top-0 right-0"
      @click="$emit('showFearDeck')"
    >
      <icon-stack2
        class="w-8 h-8 text-white bg-gray-900/30 hover:bg-gray-900/40 rounded"
        style="stroke-width: 1px;"
      />
    </button>
    <button
      class="absolute bottom-0 right-0"
      @click="fearDeck.earn"
    >
      <IconDeviceTabletPlus
        class="w-8 h-8 text-white bg-gray-900/30 hover:bg-gray-900/40 rounded"
        style="stroke-width: 1px;"
      /> 
    </button>
    <button
      class="absolute bottom-0 left-0"
      @click="fearDeck.unEarn"
    >
      <IconDeviceTabletOff
        class="w-8 h-8 text-white bg-gray-900/30 hover:bg-gray-900/40 rounded"
        style="stroke-width: 1px;"
      /> 
    </button>
    <div class="absolute top-1 left-1/2 -translate-x-1/2 text-2xl font-bold text-white font-serif">
      <span v-if="fearDeck.currentStage === 1">I</span>
      <span v-else-if="fearDeck.currentStage === 2">II</span>
      <span v-else>III</span>
    </div>
    <button
      v-if="fearDeck.totalEarned > 0"
      class="text-4xl flex items-center justify-center w-16 h-16 font-semibold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900/40 hover:bg-gray-900/60 text-white rounded-lg z-10"
      @click="$emit('showEarnedFear')"
    >
      {{ fearDeck.totalEarned }}
    </button>
  </div>
</template>