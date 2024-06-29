<script setup lang="ts">
import { SPIRIT } from '@/constant'
import { getSpiritAvatar } from '@/utils'
import { OnClickOutside } from '@vueuse/components'

defineProps<{
  spirits: number[]
}>()

const emit = defineEmits(['close', 'selectSpirit'])
function close(e: Event) {
  emit('close', e)
}
</script>

<template>
  <OnClickOutside @trigger="close">
    <div v-for="(spirit, index) in SPIRIT" :key="spirit.name">
      <div v-if="!spirits.includes(index)" class="h-12 bg-white right-2 border-2 overflow-hidden" @click="emit('selectSpirit', index)">
        <img :src="`/img/spirit_avatar/${getSpiritAvatar(index)}`" alt="Spirit avatar" class="h-full max-w-max" />
      </div>
    </div>
  </OnClickOutside>
</template>
