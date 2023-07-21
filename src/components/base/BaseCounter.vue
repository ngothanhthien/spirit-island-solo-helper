<template>
    <div class="inline-block text-stone-700 shadow-md">
      <div class="flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1">
        <button @click="counter--" :disabled="counter === min" class=" bg-white h-full px-2 rounded-l disabled:text-gray-400">
          <icon-minus class="w-4 h-4 mx-auto" />
        </button>
        <input v-model="counter" type="number" class="outline-none focus:outline-none text-center w-full bg-white flex items-center">
      <button @click="counter++" :disabled="counter === max" class="bg-white h-full px-2 rounded-r disabled:text-gray-400">
        <icon-plus class="w-4 h-4 mx-auto" />
      </button>
      </div>
    </div>
</template>
<script setup lang="ts">
import { useVModel } from '@vueuse/core'
import { IconPlus, IconMinus } from '@tabler/icons-vue'
import { watch } from 'vue';
const props = defineProps({
  modelValue: {
    type: Number,
    required: true
  },
  min: {
    type: Number,
    default: 0
  },
  max: {
    type: Number,
    default: 100
  }
})
const emit = defineEmits(['update:modelValue'])

const counter = useVModel(props, 'modelValue', emit)
watch(counter, (value) => {
  if(!value) counter.value = props.min
  if (value < props.min) counter.value = props.min
  if (value > props.max) counter.value = props.max
})
</script>
