<script setup lang="ts">
import { useInvaderCardStore } from '@/stores/InvaderCardStore'
import InvaderBox from '@/components/InvaderBox.vue'
import InvaderCard from './Invader/InvaderCard.vue'
import SmallBackground from './Invader/SmallBackground.vue'

const invaderCard = useInvaderCardStore()
</script>

<template>
  <div id="invader-bar" class="flex h-12 bg-orange-800 space-x-1">
    <template v-if="invaderCard.extraBuildView">
      <div class="flex flex-col">
          <invader-box v-if="invaderCard.extraBuildView.length > 1" :deck="invaderCard.extraBuildView" label="ravage" class="text-xs flex-1" :class="[invaderCard.ravage.length > 4 ? 'w-12' : 'w-8']" />
          <invader-card v-else :code="invaderCard.extraBuildView[0]" :is-small="true" class="h-[80%] aspect-square" />
        <div class="uppercase text-[9px] text-white text-center">build</div>
      </div>
    </template>
    <div class="flex flex-col">
      <invader-box v-if="invaderCard.ravageView.length > 1" :deck="invaderCard.ravageView" label="ravage" class="text-xs flex-1" :class="[invaderCard.ravage.length > 4 ? 'w-12' : 'w-8']" />
      <invader-card v-else :code="invaderCard.ravageView[0]" :is-small="true" class="h-[80%] aspect-square" />
      <div class="uppercase text-[9px] text-white text-center">ravage</div>
    </div>
    <div class="flex flex-col">
      <invader-box v-if="invaderCard.buildView.length > 1" :deck="invaderCard.buildView" label="build" class="text-xs flex-1" :class="[invaderCard.build.length > 4 ? 'w-12' : 'w-8']" />
      <invader-card v-else :code="invaderCard.buildView[0]" :is-small="true" class="h-[80%] aspect-square" />
      <div class="uppercase text-[9px] text-white text-center">build</div>
    </div>
    <small-background
      v-if="invaderCard.draw.length > 0"
      :stage="invaderCard.getStage"
      class="font-semibold text-xl font-serif flex items-center justify-center h-[80%] text-red-800"
    />
    <div v-else class="font-semibold text-lg font-serif h-full text-red-800 border border-gray-800 bg-white flex items-center justify-center w-8">E</div>
  </div>
</template>
