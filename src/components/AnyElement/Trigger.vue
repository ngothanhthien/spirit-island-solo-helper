<script setup lang="ts">
import { useAnyElement } from '@/components/AnyElement/functional'
import BaseElementTrigger from '@/components/AnyElement/Base.vue'

const { addElement, elements } = useAnyElement()
</script>

<template>
  <base-element-trigger :elements="elements" @select-element="addElement" />
</template>
