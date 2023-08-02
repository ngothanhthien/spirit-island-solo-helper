<script setup lang="ts">
import SlowIcon from '@/components/icons/SlowIcon.vue'
import FastIcon from '@/components/icons/FastIcon.vue'
import SacredSiteIcon from '@/components/icons/SacredSiteIcon.vue'
import PresenceIcon from '@/components/icons/PresenceIcon.vue'
import RangeIcon from '@/components/icons/RangeIcon.vue'
import FearIcon from '@/components/icons/FearIcon.vue'
import StrifeIcon from '@/components/icons/StrifeIcon.vue'
import DahanIcon from '@/components/icons/DahanIcon.vue'
import VitalityIcon from '@/components/icons/VitalityIcon.vue'
import BlightIcon from '@/components/icons/BlightIcon.vue'
import IconCity from '@/components/icons/IconCity.vue'
import IconTown from '@/components/icons/IconTown.vue'
import ExplorerIcon from './icons/ExplorerIcon.vue'
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
  <div class="px-2 py-0.5 text-xs">
    <template
      v-for="(part, index) in compileText"
      :key="index"
    >
      <span v-if="!iconList.includes(part)">{{ part }}</span>
      <img
        v-else-if="['Fire', 'Moon', 'Air', 'Sun', 'Earth', 'Water', 'Animal', 'Plant'].includes(part)"
        :src="`/img/elements/${part.toLowerCase()}.webp`"
        class="w-3.5 h-3.5 inline-block -translate-y-0.5 -my-1"
      >
      <template v-else-if="part === ':break:'">
        <div class="mt-1" />
      </template>
      <icon-city
        v-else-if="part === 'Cityicon.png'"
        class="w-3.5 h-3.5 -translate-y-0.5 -my-1"
      />
      <icon-town
        v-else-if="part === 'Townicon.png'"
        class="w-3.5 h-3.5 -translate-y-0.5 -my-1"
      />
      <explorer-icon
        v-else-if="part === 'Explorericon.png'"
        class="w-3.5 h-3.5 -translate-y-0.5 -my-1"
      />
      <fear-icon
        v-else-if="part === 'Fear'"
        class="w-3.5 h-3.5 -translate-y-0.5 -my-1"
      />
      <presence-icon
        v-else-if="part === 'Presence'"
        class="w-3.5 h-3.5 -my-1"
      />
      <sacred-site-icon
        v-else-if="part === 'Sacred Site'"
        class="w-3.5 h-3.5 -translate-y-0.5 -my-1"
      />
      <blight-icon
        v-else-if="part === 'Blight'"
        class="w-3.5 h-3.5 -translate-y-0.5"
      />
      <dahan-icon
        v-else-if="part === 'Dahan'"
        class="w-3.5 h-3.5 -translate-y-0.5 -my-1"
      />
      <beasts-icon
        v-else-if="part === 'Beasts'"
        class="w-3.5 h-3.5 -translate-y-0.5 -ml-0.5 -my-1"
      />
      <strife-icon
        v-else-if="part === 'Strife'"
        class="w-3.5 h-3.5 -my-1"
      />
      <wilds-icon
        v-else-if="part === 'Wilds'"
        class="w-3.5 h-3.5 -my-1"
      />
      <disease-icon
        v-else-if="part === 'Disease'"
        class="w-3.5 h-3.5 -my-1"
      />
      <fast-icon
        v-else-if="part === 'Fasticon.png'"
        class="w-3.5 h-3.5 -my-1"
      />
      <slow-icon
        v-else-if="part === 'Slowicon.png'"
        class="w-3.5 h-3.5 -my-1"
      />
      <vitality-icon
        v-else-if="part === 'Vitality'"
        class="w-3.5 h-3.5 -my-1"
      />
      <range-icon
        v-else-if="part === 'plus1Rangeicon'"
        num="+1"
        class="w-8 -mb-2 -mt-1"
      />
      <range-icon
        v-else-if="part === 'normal1Rangeicon'"
        num="1"
        class="w-8 -mb-2 -mt-1"
      />
      <deeps-icon
        v-else-if="part === 'Deeps'"
        class="w-3.5 h-3.5 -my-1"
      />
    </template>
  </div>
</template>