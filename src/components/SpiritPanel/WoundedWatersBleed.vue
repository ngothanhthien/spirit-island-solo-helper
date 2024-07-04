<script setup lang="ts">
import BaseModal from '@/components/SpiritPanel/Modal.vue'
import { calBlock } from '@/utils'
import { computed, onMounted, ref, watch } from 'vue'
import type { Point } from '@/types'
import { usePlayerCardStore } from '@/stores/PlayerCardStore'
import ReplacementBox from '@/components/SpiritPanel/ReplacementBox.vue'
import { exchangeInnate } from '@/utils/spirit'
import { useModalStore } from '@/stores/ModalStore'

const SCALE = 5
const clickAbleMap = ref<Point[]>([
  {
    x: 79.6,
    y: 23
  },
  {
    x: 82,
    y: 14.8
  },
  {
    x: 87,
    y: 11
  },
  {
    x: 92,
    y: 15
  },
  {
    x: 94.6,
    y: 22.8
  }
])
const player = usePlayerCardStore()

function csCalBlock(point: Point, containerWidth: number, containerHeight: number) {
  return calBlock(point, SCALE, null, containerWidth, containerHeight)
}

function switcher(index: number) {
  const current = player.saved[index] as number
  player.saved[index] = current === 2 ? 0 : current + 1
}

function getCurrent(index: number) {
  if (!player.saved[index]) return ''
  return ['', 'Water', 'Animal'][player.saved[index] as number].toLowerCase()
}

onMounted(() => {
  if (player.saved.length === 5) return
  for (let i = 0; i < 5; i++) {
    player.saved.push(0)
  }
})

const isShowWatersTasteOfRuin = computed(() => has5Element.value && has3Animal.value)
const isShowWatersRenew = computed(() => has5Element.value && has3Water.value)
const has5Element = computed(() => !player.saved.some((i) => i === 0))
const has3Animal = computed(() => player.saved.filter((i) => i === 2).length > 2)
const has3Water = computed(() => player.saved.filter((i) => i === 1).length > 2)
const has3Element = computed(() => player.saved.filter((i) => (i as number) > 0).length > 2)
const isFirst3ElementAnimalMore = computed(() => {
  if (!has3Element.value) return false
  const water = player.saved.slice(0, 3).filter((i) => i === 1).length
  const animal = player.saved.slice(0, 3).filter((i) => i === 2).length
  return animal > water
})
const isShowRoilingWaters = computed(() => has3Element.value && isFirst3ElementAnimalMore.value)
const onGoingContainer = computed(() => {
  const y = has5Element.value ? 73 : 46
  return {
    width: 37,
    height: 50,
    point: {
      x: 19,
      y
    }
  }
})
const onGoingPath = computed(() => {
  return isShowRoilingWaters.value ? '/img/spirits/roiling_waters.webp' : '/img/spirits/serene_waters.webp'
})

watch(isShowWatersTasteOfRuin, (value) => {
  if (value) {
    exchangeInnate('Afflict with Bloodthirst', 'Swirl and Spill')
  } else {
    exchangeInnate('Swirl and Spill', 'Afflict with Bloodthirst')
  }
})
watch(isShowWatersRenew, (value) => {
  if (value) {
    exchangeInnate('Sanguinary Taint', 'Swirl and Spill')
  } else {
    exchangeInnate('Swirl and Spill', 'Sanguinary Taint')
  }
})

function showHelp() {
  useModalStore().baseZoom = ['/img/spirits/waters_taste_of_ruin.webp', '/img/spirits/waters_renew.webp', '/img/spirits/roiling_waters.webp', '/img/spirits/serene_waters.webp']
}
</script>

<template>
  <base-modal>
    <template v-slot:default="{ containerWidth, containerHeight }">
      <div v-for="(item, index) in clickAbleMap" :style="csCalBlock(item, containerWidth, containerHeight)" class="absolute text-white flex justify-center items-center" @click="switcher(index)">
        <span :class="`icon-${getCurrent(index)} text-2xl`">
          <span class="path1" />
          <span class="path2" />
          <span class="path3" />
          <span class="path4" />
        </span>
      </div>
      <div class="absolute" style="top: 1%; left: 14%">
        <span class="icon-help text-4xl text-orange-900" @click="showHelp" />
      </div>
      <replacement-box
        v-if="isShowWatersTasteOfRuin"
        :container="{
          width: 31,
          height: 40,
          point: {
            x: 53,
            y: 79
          }
        }"
        cs-style="width: 115%;"
        path="/img/spirits/waters_taste_of_ruin.webp"
        :panelWidth="containerWidth"
        :panelHeight="containerHeight"
      />
      <replacement-box
        v-if="isShowWatersRenew"
        :container="{
          width: 32.5,
          height: 40,
          point: {
            x: 54,
            y: 79
          }
        }"
        cs-style="width: 113%; top: -36%; position: absolute;"
        path="/img/spirits/waters_renew.webp"
        :panelWidth="containerWidth"
        :panelHeight="containerHeight"
      />
      <replacement-box
        v-if="has3Element"
        :container="onGoingContainer"
        cs-style="width: 105%; top: -1%; position: absolute;"
        :path="onGoingPath"
        :panelWidth="containerWidth"
        :panelHeight="containerHeight"
      />
    </template>
  </base-modal>
</template>
