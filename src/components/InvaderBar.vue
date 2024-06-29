<script setup lang="ts">
import { useInvaderCardStore } from '@/stores/InvaderCardStore'
import InvaderBox from '@/components/InvaderBox.vue'

const invaderCard = useInvaderCardStore()
</script>

<template>
  <div id="invader-bar" class="flex h-12 bg-orange-800">
    <template v-if="invaderCard.extraBuildView">
      <div class="flex flex-col">
        <invader-box :deck="invaderCard.extraBuildView" label="ravage" class="text-xs flex-1" :class="[invaderCard.ravage.length > 4 ? 'w-12' : 'w-8']" />
        <div class="uppercase text-[9px] text-white text-center">build</div>
      </div>
      <div class="flex items-center">
        <span class="w-3.5 h-3.5 mb-3 text-white mx-0.5 icon-chevron-left" />
      </div>
    </template>
    <div class="flex flex-col">
      <invader-box :deck="invaderCard.ravageView" label="ravage" class="text-xs flex-1" :class="[invaderCard.ravage.length > 4 ? 'w-12' : 'w-8']" />
      <div class="uppercase text-[9px] text-white text-center">ravage</div>
    </div>
    <div class="flex items-center">
      <span class="icon-chevron-left mb-3 text-white mx-0.5" />
    </div>
    <div class="flex flex-col flex-wrap">
      <invader-box :deck="invaderCard.buildView" label="build" class="text-xs flex-1" :class="[invaderCard.build.length > 4 ? 'w-12' : 'w-8']" />
      <div class="uppercase text-[9px] text-white text-center">build</div>
    </div>
    <div v-if="invaderCard.draw.length > 0" class="font-semibold text-lg font-serif h-full text-white bg-gray-900 flex items-center justify-center w-8">
      {{ invaderCard.getBackCardTop }}
    </div>
    <div v-else class="font-semibold text-lg font-serif h-full text-red-800 border border-gray-800 bg-white flex items-center justify-center w-8">E</div>
  </div>
</template>
