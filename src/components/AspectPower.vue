<script setup lang="ts">
import SlowIcon from '@/components/icons/SlowIcon.vue'
import FastIcon from '@/components/icons/FastIcon.vue'
import NoRangeIcon from '@/components/icons/NoRangeIcon.vue'
import SpiritIcon from '@/components/icons/SpiritIcon.vue'
import SacredSiteIcon from '@/components/icons/SacredSiteIcon.vue'
import RangeIcon from '@/components/icons/RangeIcon.vue'
import IconNoBlight from './icons/IconNoBlight.vue'
import TextCompile from '@/components/TextCompile.vue'
import JungleWetlandIcon from './icons/JungleWetlandIcon.vue'

defineProps({
  power: {
    type: Object,
    required: true,
  },
})

</script>

<template>
  <div>
    <div
      id="TargetBox"
      class="w-full border border-gray-800"
    >
      <div
        id="Header"
        class="grid grid-cols-3 font-bold uppercase text-xs text-white"
        style="background-color:rgb(175,152,102);"
      >
        <div class="col-span-1 flex justify-center items-center max-h-3">
          SPEED
        </div>
        <div class="col-span-1 flex justify-center items-center max-h-3">
          range
        </div>
        <div class="col-span-1 flex justify-center items-center max-h-3">
          target land
        </div>
      </div>
      <div
        id="Values"
        class="bg-amber-100 grid grid-cols-3 text-xs"
      >
        <div style="grid-column: span 1; border-right:1px solid black; display:flex; align-items:center; justify-content:center;">
          <slow-icon
            v-if="power.speed === 'Slow'"
            class="w-5 h-5"
          />
          <fast-icon
            v-else-if="power.speed === 'Fast'"
            class="w-5 h-5"
          />
        </div>
        <div class="col-span-1 flex items-center justify-center">
          <template v-if="power.range !== null">
            <div
              v-if="power.scaredSite"
              style="display:inline-block; vertical-align:middle;"
            >
              <sacred-site-icon class="w-7 h-7" />
            </div>
            <range-icon
              num="1"
              :class="{'ml-1': power.scaredSite}"
              class="w-8"
            />
          </template>
          <no-range-icon
            v-else
            class="w-2/3"
          />
        </div>
        <div class="uppercase text-xs font-bold flex items-center justify-center border-l border-black col-span-1">
          <div v-if="power.targetLand === 'Another Spirit'">
            Another <spirit-icon class="w-5 h-5" />
          </div>
          <div v-else-if="power.targetLand === 'no-blight'">
            <icon-no-blight class="w-5 h-5" />
          </div>
          <div v-else-if="power.targetLand === 'any-spirit'">
            Any <spirit-icon class="w-5 h-5" />
          </div>
          <div v-else-if="power.targetLand === 'j-w'">
            <jungle-wetland-icon class="w-5 h-5" />
          </div>
          <div v-else>
            {{ power.targetLand }}
          </div>
        </div>
      </div>
    </div>
    <text-compile :message="power.content" />
  </div>
</template>