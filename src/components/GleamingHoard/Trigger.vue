<script setup lang="ts">
import { useGleamingHoardStore } from '@/components/GleamingHoard/Store'
</script>

<template>
  <div @click="useGleamingHoardStore().showModal()" class="cs-trigger text-white border-green-800 bg-green-700 text-2xl font-bold">G</div>
</template>
