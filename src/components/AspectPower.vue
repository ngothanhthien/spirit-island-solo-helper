<script setup lang="ts">
import NoRangeIcon from '@/components/icons/NoRangeIcon.vue'
import SpiritIcon from '@/components/icons/SpiritIcon.vue'
import RangeIcon from '@/components/icons/RangeIcon.vue'
import IconNoBlight from './icons/IconNoBlight.vue'
import TextCompile from '@/components/TextCompile.vue'
import JungleWetlandIcon from './icons/JungleWetlandIcon.vue'
import { nameToImage } from '@/utils'
import type { Aspect } from '@/types'
import type { PropType } from 'vue'

defineEmits(['showAspectDetail'])
defineProps({
  aspect: {
    type: Object as PropType<Aspect>,
    required: true
  }
})
</script>

<template>
  <div
    ref="aspectEl"
    class="w-full overflow-y-auto absolute hide-scrollbar h-full bg-amber-100"
    @click="$emit('showAspectDetail')"
  >
    <div v-if="aspect?.requirements" class="mt-1">
      <div
        v-for="requirement in aspect.requirements"
        :key="requirement"
        class="text-xs font-semibold text-red-700"
      >
        <div
          v-if="requirement.toLowerCase().startsWith('replace')"
          class="pl-1 truncate"
        >
          {{ requirement }}
        </div>
        <text-compile v-else :message="requirement" />
      </div>
    </div>
    <div class="bg-amber-100">
      <!-- custom render -->
      <template v-if="aspect?.cards">
        <template v-for="card in aspect.cards" :key="card.name">
          <div class="text-[11px] uppercase font-semibold px-1 truncate">
            {{ card.name }}
          </div>
          <div
            v-if="card.target"
            id="TargetBox"
            class="w-full border border-gray-800 text-xs"
          >
            <div
              id="Header"
              class="grid grid-cols-12 font-bold uppercase text-[9px] text-white"
              style="background-color: rgb(175, 152, 102)"
            >
              <div class="col-span-3 flex justify-center items-center max-h-3">
                SPEED
              </div>
              <div class="col-span-3 flex justify-center items-center max-h-3">
                range
              </div>
              <div class="col-span-6 flex justify-center items-center max-h-3">
                target
              </div>
            </div>
            <div id="Values" class="bg-amber-100 grid grid-cols-12 text-xs">
              <div
                class="col-span-3 flex items-center justify-center border-r border-black"
              >
                <span :class="`icon-${card.target.speed.toLowerCase()}`"></span>
              </div>
              <div class="col-span-3 flex items-center justify-center">
                <template v-if="card.target.range !== null">
                  <span
                    v-if="card.target.scaredSite"
                    class="icon-scared-site"
                  ></span>
                  <range-icon
                    num="1"
                    :class="{ 'ml-1': card.target.scaredSite }"
                    class="w-5 -mb-2"
                  />
                </template>
                <no-range-icon v-else class="w-2/3" />
              </div>
              <div
                class="uppercase text-[10px] font-semibold flex items-center justify-center border-l border-black col-span-6"
              >
                <div v-if="card.target.targetLand === 'Another Spirit'">
                  Another <spirit-icon class="w-3.5 h-3.5" />
                </div>
                <div v-else-if="card.target.targetLand === 'no-blight'">
                  <icon-no-blight class="w-3.5 h-3.5" />
                </div>
                <div v-else-if="card.target.targetLand === 'any-spirit'">
                  Any <spirit-icon class="w-3.5 h-3.5" />
                </div>
                <div v-else-if="card.target.targetLand === 'j-w'">
                  <jungle-wetland-icon class="h-3.5" />
                </div>
                <div v-else>
                  {{ card.target.targetLand }}
                </div>
              </div>
            </div>
          </div>
          <text-compile :message="card.description" />
        </template>
      </template>
      <!-- default render -->
      <template v-else>
        <img
          v-if="!aspect?.images"
          :src="`/img/aspects/${nameToImage(aspect?.title as string)}`"
          alt="Aspect"
        />
        <template v-else>
          <img
            v-for="image in aspect.images"
            :key="image"
            :src="`/img/aspects/${nameToImage(image)}`"
            alt="Aspect"
          />
        </template>
      </template>
    </div>
  </div>
</template>
