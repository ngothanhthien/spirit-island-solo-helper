<script setup lang="ts">
import { reactive } from 'vue';

interface BaseButtonProps {
  buttonStyle?: 'primary' | 'secondary' | 'warning' | 'success'
}

withDefaults(defineProps<BaseButtonProps>(), {
  buttonStyle: 'primary',
})
const style = reactive({
  primary: 'bg-violet-700 hover:bg-violet-600 disabled:bg-violet-400',
  secondary: 'bg-slate-700 hover:bg-slate-600 disabled:bg-slate-400',
  warning: 'bg-amber-700 hover:bg-amber-600 disabled:bg-amber-400',
  success: 'bg-green-600 hover:bg-green-600/80 disabled:bg-green-400',
})
</script>

<template>
  <button class="py-1.5 px-3 rounded text-white w-fit transition shadow-md disabled:cursor-not-allowed" :class="[style[buttonStyle]]">
    <slot />
  </button>
</template>
