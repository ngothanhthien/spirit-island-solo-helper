<script setup lang="ts">
import AspectPower from '@/components/AspectPower.vue'
import { ref } from 'vue'
const message = ref({
  name: 'LIGHTNING-TORN SKIES INCITE PANDEMONIUM',
  text: 'After Growth, choose up to 2 Dahan among your lands. Move each of them to any land contiguously connected by your Presence.',
})
const power = ref({
  speed: 'Fast',
  range: null,
  scaredSite: null,
  targetLand: 'Another Spirit',
  content: `2Sun Target Spirit gains Energy equal to 1 less than the highest uncovered number on your Energy track.:break:
  3Sun1Water You also gain that much Energy.:break:
  4Sun2Water Target Spirit may Remove 1 Blight from one of their lands with Dahan.`,
})
</script>

<template>
  <aspect-text
    class="w-96"
    :message="message"
  />
  <aspect-power
    class="w-96"
    :power="power"
  />
</template>