<script setup lang="ts">
import { ref } from 'vue';

const arr = ref([
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
]);
</script>
<template>
  <div>{{ arr }}</div>
  <button @click="arr[0].name='hacked'" class="px-3 py-1 bg-gray-900 text-white rounded-md">Test</button>
</template>
