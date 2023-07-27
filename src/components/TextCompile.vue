<script setup lang="ts">
import SlowIcon from '@/components/icons/SlowIcon.vue'
import FastIcon from '@/components/icons/FastIcon.vue'
import SacredSiteIcon from '@/components/icons/SacredSiteIcon.vue'
import PresenceIcon from '@/components/icons/PresenceIcon.vue'
import RangeIcon from '@/components/icons/RangeIcon.vue'
import FearIcon from '@/components/icons/FearIcon.vue'
import StrifeIcon from '@/components/icons/StrifeIcon.vue'
import DahanIcon from '@/components/icons/Dahan.vue'
import VitalityIcon from '@/components/icons/VitalityIcon.vue'
import BlightIcon from '@/components/icons/Blight.vue'
import IconCity from '@/components/icons/IconCity.vue'
import IconTown from '@/components/icons/IconTown.vue'
import ExplorerIcon from './icons/Explorer.vue'
import WildsIcon from './icons/WildsIcon.vue'
import DiseaseIcon from './icons/DiseaseIcon.vue'
import DeepsIcon from '@/components/icons/DeepsIcon.vue'
import useTextCompile from '@/composable/useTextCompile'
import BeastsIcon from './icons/BeastsIcon.vue'

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
})
const { compileText, iconList } = useTextCompile(props.message)
</script>

<template>
  <div class="px-2 py-1 text-xs">
    <template
      v-for="(part, index) in compileText"
      :key="index"
    >
      <span v-if="!iconList.includes(part)">{{ part }}</span>
      <img
        v-else-if="['Fire', 'Moon', 'Air', 'Sun', 'Earth', 'Water', 'Animal', 'Plant'].includes(part)"
        :src="`/img/elements/${part.toLowerCase()}.webp`"
        class="w-4 h-4 inline-block -translate-y-0.5 mr-1"
      >
      <template v-else-if="part === ':break:'">
        <div class="mt-1" />
      </template>
      <icon-city
        v-else-if="part === 'Cityicon.png'"
        class="w-4 h-4 -translate-y-0.5"
      />
      <icon-town
        v-else-if="part === 'Townicon.png'"
        class="w-4 h-4 -translate-y-0.5"
      />
      <explorer-icon
        v-else-if="part === 'Explorericon.png'"
        class="w-4 h-4 -translate-y-0.5"
      />
      <fear-icon
        v-else-if="part === 'Fear'"
        class="w-4 h-4 -translate-y-0.5"
      />
      <presence-icon
        v-else-if="part === 'Presence'"
        class="w-4 h-4 -translate-y-0.5"
      />
      <sacred-site-icon
        v-else-if="part === 'Sacred Site'"
        class="w-4 h-4 -translate-y-0.5"
      />
      <blight-icon
        v-else-if="part === 'Blight'"
        class="w-4 h-4 -translate-y-0.5"
      />
      <dahan-icon
        v-else-if="part === 'Dahan'"
        class="w-4 h-4 -translate-y-0.5"
      />
      <beasts-icon
        v-else-if="part === 'Beasts'"
        class="w-4 h-4"
      />
      <strife-icon
        v-else-if="part === 'Strife'"
        class="w-4 h-4"
      />
      <wilds-icon
        v-else-if="part === 'Wilds'"
        class="w-4 h-4"
      />
      <disease-icon
        v-else-if="part === 'Disease'"
        class="w-4 h-4"
      />
      <fast-icon
        v-else-if="part === 'Fasticon.png'"
        class="w-4 h-4"
      />
      <slow-icon
        v-else-if="part === 'Slowicon.png'"
        class="w-4 h-4"
      />
      <vitality-icon
        v-else-if="part === 'Vitality'"
        class="w-4 h-4"
      />
      <range-icon
        v-else-if="part === 'plus1Rangeicon'"
        num="+1"
        class="w-8 -mb-2"
      />
      <range-icon
        v-else-if="part === 'normal1Rangeicon'"
        num="1"
        class="w-8 -mb-2"
      />
      <deeps-icon
        v-else-if="part === 'Deeps'"
        class="w-4 h-4"
      />
    </template>
  </div>
</template>