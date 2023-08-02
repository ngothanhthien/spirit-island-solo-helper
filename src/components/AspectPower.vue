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
import { usePlayerCardStore } from '@/stores/PlayerCardStore'
import { useGameOptionStore } from '@/stores/GameOptionStore'
import { nameToImage } from '@/utils'
import { computed, onMounted, ref } from 'vue'
import { useScroll, watchDebounced } from '@vueuse/core'

defineEmits(['showAspectDetail'])
const playerCard = usePlayerCardStore()
const gameOption = useGameOptionStore()

const aspectLoading = ref(false)
const aspectEl = ref<HTMLElement | null>(null)
const { y: aspectPos } = useScroll(aspectEl, {
  behavior: 'instant'
})

const aspect = computed(() => {
  return gameOption.aspectsDetail[playerCard.current]
})

watchDebounced(aspectPos,
  (pos) => { 
    playerCard.setAspectPos(pos)
   },
  { debounce: 300 },
)

onMounted(() => {
  restoreAspectPos()
})
function restoreAspectPos() {
  aspectLoading.value = true
  setTimeout(() => {
    aspectPos.value = playerCard.aspectPos
    aspectLoading.value = false
  }, 100)
}
</script>

<template>
  <div
    ref="aspectEl"
    class="w-full pl-2 py-2 overflow-y-auto absolute hide-scrollbar h-full"
    :class="aspectLoading ? 'opacity-0':''"
    @click="$emit('showAspectDetail')"
  >
    <div v-if="aspect">
      <div
        v-if="aspect.requirements"
        class="mb-1"
      >
        <div
          v-for="requirement in aspect.requirements"
          :key="requirement"
          class="text-xs font-semibold text-red-700 truncate"
        >
          {{ requirement }}
        </div>
      </div>
      <div class="bg-amber-100">
        <!-- custom render -->
        <template v-if="aspect.cards">
          <template
            v-for="card in aspect.cards"
            :key="card.name"
          >
            <div class="text-[11px] uppercase font-semibold px-1">
              {{ card.name }}
            </div>
            <div
              v-if="card.target"
              id="TargetBox"
              class="w-full border border-gray-800 text-xs"
            >
              <div
                id="Header"
                class="grid grid-cols-12 font-bold uppercase text-[10px] text-white"
                style="background-color:rgb(175,152,102);"
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
              <div
                id="Values"
                class="bg-amber-100 grid grid-cols-12 text-xs"
              >
                <div
                  class="col-span-3 flex items-center justify-center border-r border-black"
                >
                  <slow-icon
                    v-if="card.target.speed === 'Slow'"
                    class="w-3.5 h-3.5"
                  />
                  <fast-icon
                    v-else-if="card.target.speed === 'Fast'"
                    class="w-3.5 h-3.5"
                  />
                </div>
                <div class="col-span-3 flex items-center justify-center">
                  <template v-if="card.target.range !== null">
                    <div
                      v-if="card.target.scaredSite"
                      style="display:inline-block; vertical-align:middle;"
                    >
                      <sacred-site-icon class="w-7 h-7" />
                    </div>
                    <range-icon
                      num="1"
                      :class="{'ml-1': card.target.scaredSite}"
                      class="w-8"
                    />
                  </template>
                  <no-range-icon
                    v-else
                    class="w-2/3"
                  />
                </div>
                <div class="uppercase text-[10px] font-semibold flex items-center justify-center border-l border-black col-span-6">
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
            v-if="!aspect.images"
            :src="`/img/aspects/${nameToImage(aspect.title)}`"
            alt="Aspect"
          >
          <template v-else>
            <img
              v-for="image in aspect.images"
              :key="image"
              :src="`/img/aspects/${nameToImage(image)}`"
              alt="Aspect"
            >
          </template>
        </template>
      </div>
    </div>
  </div>
</template>