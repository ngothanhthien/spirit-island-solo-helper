<script setup lang="ts">
import AdversaryText from '@/components/base/AdversaryText.vue'
import { useGameOptionStore } from '@/stores/GameOptionStore'
import { computed } from 'vue'
import { ADVERSARY } from '@/constant'

defineEmits(['close'])
const gameOption = useGameOptionStore()
const adversaryName = computed(() => {
  if (gameOption.adversary !== undefined) {
    return ADVERSARY[gameOption.adversary].title
  }
  return null
})

const adversarySetup = computed(() => {
  if (gameOption.adversary !== undefined) {
    const setup = ADVERSARY[gameOption.adversary].setup
    const pieces = []
    let invaders = ''
    for (let i = 0; i < gameOption.adversaryLevel + 1; i++) {
      if (setup[i].invaders) {
        invaders = setup[i].invaders as string
      }
      if (setup[i].piece) {
        pieces.push(`- ${setup[i].piece}`)
      }
    }
    const invadersText = invaders === '' ? '' : `:break:- Invaders: ${invaders}`
    if (pieces.length === 0 && invaders === '') {
      return null
    }
    return {
      name: null,
      text: pieces.join(':break:') + invadersText
    }
  }
  return null
})
</script>

<template>
  <div
    v-if="adversarySetup"
    class="absolute w-full h-full bg-gray-900/30 top-0 left-0"
    @click.self="$emit('close')"
  >
    <div
      class="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md max-w-[60%]"
    >
      <div
        class="bg-orange-800 text-white font-semibold text-lg py-1 px-2 rounded-t-md"
      >
        {{ `${adversaryName} ${gameOption.adversaryLevel}` }} setup
      </div>
      <div class="px-3 py-1.5">
        <adversary-text :message="adversarySetup" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
