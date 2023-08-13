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
import IconLocus from './icons/IconLocus.vue'
import IconAny from './icons/IconAny.vue'
import IconBadland from './icons/IconBadLand.vue'
import IconLair from './icons/IconLair.vue'
import IconDestroyPresence from './icons/IconDestroyPresence.vue'
import PowerElement from './PowerElement.vue'
import { isElement } from '@/types'

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
      <span
        v-if="!iconList.includes(part)"
        v-html="part"
      />
      <power-element
        v-else-if="isElement(part)"
        :key="part"
        :element="part"
        class="h-3 inline-block -translate-y-0.5 -my-0.5"
      />
      <template v-else-if="part === ':break:'">
        <div class="mt-1" />
      </template>
      <icon-city
        v-else-if="part === 'Cityicon.png'"
        class="h-3 -translate-y-0.5 -my-1"
      />
      <icon-town
        v-else-if="part === 'Townicon.png'"
        class="h-3 -translate-y-0.5 -my-1"
      />
      <explorer-icon
        v-else-if="part === 'Explorericon.png'"
        class="h-3 -translate-y-0.5 -my-1 -mx-0.5"
      />
      <fear-icon
        v-else-if="part === 'Fear'"
        class="h-3 -translate-y-0.5 -my-1"
      />
      <presence-icon
        v-else-if="part === 'Presence'"
        class="w-3 h-3 -my-1"
      />
      <sacred-site-icon
        v-else-if="part === 'Sacred Site'"
        class="h-3 -translate-y-0.5 -my-1"
      />
      <blight-icon
        v-else-if="part === 'Blight'"
        class="h-3 -translate-y-0.5"
      />
      <dahan-icon
        v-else-if="part === 'Dahan'"
        class="h-3 -translate-y-0.5 -my-1"
      />
      <beasts-icon
        v-else-if="part === 'Beasts'"
        class="h-3 -translate-y-0.5 -ml-0.5 -my-1"
      />
      <strife-icon
        v-else-if="part === 'Strife'"
        class="h-3 -my-1"
      />
      <wilds-icon
        v-else-if="part === 'Wilds'"
        class="h-3 -my-1"
      />
      <disease-icon
        v-else-if="part === 'Disease'"
        class="h-3 -my-1"
      />
      <icon-badland
        v-else-if="part === 'Badlands'"
        class="h-3 -translate-y-0.5 -my-1"
      />
      <fast-icon
        v-else-if="part === 'Fasticon.png'"
        class="h-3 -my-1"
      />
      <slow-icon
        v-else-if="part === 'Slowicon.png'"
        class="h-3 -my-1"
      />
      <vitality-icon
        v-else-if="part === 'Vitality'"
        class="h-3 -my-1 -translate-y-0.5 -mx-0.5"
      />
      <icon-destroy-presence
        v-else-if="part === 'destroy_presence'"
        class="h-3 w-3 -translate-y-0.5"
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
        class="h-3 -my-1"
      />
      <icon-locus
        v-else-if="part === 'Locus'"
        class="h-3 -my-1 -translate-y-0.5 -mr-0.5"
      />
      <icon-any
        v-else-if="part === 'Any Element'"
        class="h-3 inline-block -translate-y-0.5 -my-0.5"
      />
      <icon-lair 
        v-else-if="part === 'Lair'"
        class="h-3 -my-1 -translate-y-0.5"
      />
      <range-icon
        v-else-if="part === 'air_range'"
        num="air"
        class="w-8 -mb-2 -mt-1"
      />
    </template>
  </div>
</template>