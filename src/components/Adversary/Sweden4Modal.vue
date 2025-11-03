<script setup lang="ts">
import { useSweden4 } from '@/composable/useSweden4'
import InvaderCard from '@/components/Invader/InvaderCard.vue';

const { sweden4, clear } = useSweden4()
</script>

<template>
  <div v-if="sweden4" class="absolute top-0 left-0 w-full h-full bg-gray-900/30 z-50" @click.self="clear()">
    <div class="h-[85%] rounded-lg overflow-hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <div class="text-center text-lg font-semibold text-white">Royal Backing</div>
      <InvaderCard :code="sweden4" class="h-[90%] aspect-auto-[2/3]" />
    </div>
  </div>
</template>
