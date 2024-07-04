<script setup lang="ts">
import BaseElementTrigger from '@/components/AnyElement/Base.vue'
import { usePlayerCardStore } from '@/stores/PlayerCardStore'

const player = usePlayerCardStore()
</script>

<template>
  <base-element-trigger :elements="player.tempElements" @select-element="player.selectTempElement" :is-temp="true" />
</template>
