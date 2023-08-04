<script setup lang="ts">
import type { PropType } from 'vue'
import IconEscalation from './icons/IconEscalation.vue';

defineProps({
  deck: {
    type: Array as PropType<string[]>,
    required: true,
  },
})
</script>

<template>
  <div class="flex flex-wrap">
    <div
      v-for="card, index in deck"
      :key="index"
      :class="{
        'bg-yellow-500': card.includes('S'),
        'bg-green-600 text-white': card.includes('J'),
        'bg-cyan-300': card.includes('W'),
        'bg-gray-500': card.includes('M'),
        'bg-blue-600 text-white': card.includes('C'),
        'text-white': card.includes('2'),
        'w-full': [1, 2].includes(deck.length),
        'w-full h-1/2': (index === 2 && deck.length === 3),
        'w-1/2 h-1/2': (deck.length === 3 && index !== 2) || deck.length === 4 || (deck.length === 5 && index >= 3),
        'w-1/3 h-1/2': deck.length === 6 || (deck.length === 5 && index < 3),
      }"
      class="flex items-center justify-center border border-gray-400 border-collapse relative"
    >
      <icon-escalation
        v-if="card.includes('2')"
        class="absolute h-[80%] text-stone-800"
      />
      <div class="absolute">
        {{ card.replace('2', '') }}
      </div>
    </div>
  </div>
</template>