<template>
  <div class="inline-block">
    <span
      v-if="message.name"
      class="mr-1"
    >
      <span class="font-bold">{{ message.name }}</span>
      <span class="font-bold">:</span>
    </span>
    <template
      v-for="(part, index) in result"
      :key="index"
    >
      <span v-if="!iconList.includes(part)">{{ part }}</span>
      <TownIcon
        v-else-if="part === 'Townicon.png'"
        class="w-4 h-4 -translate-y-0.5"
      />
      <CityIcon
        v-else-if="part === 'Cityicon.png'"
        class="w-4 h-4 -translate-y-0.5"
      />
      <explorer-icon
        v-else-if="part === 'Explorericon.png'"
        class="w-4 h-4 -translate-y-0.5"
      />
      <BlightIcon
        v-else-if="part === 'Blight.png'"
        class="w-4 h-4 -translate-y-0.5"
      />
      <DahanIcon
        v-else-if="part === 'Dahan'"
        class="w-4 h-4 -translate-y-0.5"
      />
      <BeastsIcon
        v-else-if="part === 'Beasts'"
        class="w-4 h-4 -translate-y-0.5"
      />
      <FearIcon
        v-else-if="part === 'Fear'"
        class="w-4 h-4 -translate-y-0.5"
      />
      <RangeIcon
        v-else-if="part === 'Rangeicon.png'"
        num="1"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import TownIcon from '@/components/icons/IconTown.vue'
import CityIcon from '@/components/icons/IconCity.vue'
import ExplorerIcon from '@/components/icons/ExplorerIcon.vue'
import BlightIcon from '@/components/icons/BlightIcon.vue'
import DahanIcon from '@/components/icons/DahanIcon.vue'
import BeastsIcon from '@/components/icons/BeastsIcon.vue'
import FearIcon from '@/components/icons/FearIcon.vue'
import RangeIcon from '@/components/icons/RangeIcon.vue'
import { computed } from 'vue'

const props = defineProps({
  message: {
    type: Object,
    required: true,
  },
})
const iconList = ['Townicon.png', 'Cityicon.png', 'Explorericon.png', 'Blight.png', 'Dahan', 'Beasts', 'Fear', 'Rangeicon.png']
const result = computed(() =>
  props.message.text.split(
    new RegExp(`(?<=${iconList.join('|')})|(?=${iconList.join('|')})`),
  ),
)
</script>
