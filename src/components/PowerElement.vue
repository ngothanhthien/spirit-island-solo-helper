<script setup lang="ts">
import type { Element } from '@/types'
import IconAir from './icons/IconAir.vue'
import IconAnimal from './icons/IconAnimal.vue'
import IconEarth from './icons/IconEarth.vue'
import IconFire from './icons/IconFire.vue'
import IconMoon from './icons/IconMoon.vue'
import IconPlant from './icons/IconPlant.vue'
import IconSun from './icons/IconSun.vue'
import IconWater from './icons/IconWater.vue'
import IconAny from './icons/IconAny.vue'
defineProps({
  element: {
    type: String as () => Element,
    required: true,
  },
})
const ELEMENT: { [key in Element]: unknown } = {
  'Fire': (IconFire),
  'Air': IconAir,
  'Earth': IconEarth,
  'Water': IconWater,
  'Sun': IconSun,
  'Animal': IconAnimal,
  'Moon': IconMoon,
  'Plant': IconPlant,
  'Any': IconAny,
};
</script>

<template>
  <component
    :is="ELEMENT[element]"
    :key="element"
  />
</template>