<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core'
import { computed, type ComputedRef, ref, toRaw } from 'vue'
import { downloadObjectAsJson } from '@/utils'
import { usePresenceSpiritPanelTool } from '@/composable/usePresenceSpiritPanelTool'
import BaseButton from '@/components/base/BaseButton.vue'
import type { Presence } from '@/types'
const container = ref(null)
const NAME = 'vital_strength_of_the_earth'
onKeyStroke(['s'], (e) => {
  e.preventDefault()
  downloadObjectAsJson(toRaw(map), NAME)
})
const { map, save, cal, label, last, SPACE_Y } = usePresenceSpiritPanelTool(container)
const presences = computed(() => map.presences) as ComputedRef<Presence[]>
const currentPoint = ref(0)
const space_x = ref(0)
const total = ref(0)
const margin_x = ref(0)
function autoGen() {
  const point = map.presences[currentPoint.value].point
  const SPACE_X = space_x.value
  const TOTAL = total.value
  for (let i = 0; i < TOTAL; i++) {
    const newPoint = {
      x: point.x + SPACE_X * (i + 1) + margin_x.value,
      y: point.y + SPACE_Y.value
    }
    map.presences.push({
      type: '',
      value: 0,
      point: newPoint
    })
  }
}
function undo() {
  for (let i = 0; i < total.value; i++) {
    map.presences.pop()
  }
}
</script>

<template>
  <div class="flex">
    <div @click="save" class="h-[600px]">
      <div ref="container" class="relative h-full w-fit">
        <img alt="" class="h-full w-auto bottom-0 right-0 whitespace-nowrap" src="/img/spirits/gleaming_hoard.webp" />
        <div
          v-for="(item, index) in presences"
          :style="cal(item.point)"
          :class="{
            'bg-red-700': currentPoint === index,
            'bg-green-700': currentPoint !== index
          }"
          class="absolute text-white rounded-full flex justify-center items-center"
        >
          {{ label(item) }}
        </div>
      </div>
      <div class="absolute top-4 left-4 bg-gray-800/30 p-4 rounded-lg">
        <div>X: {{ last.x }}</div>
        <div>Y: {{ last.y }}</div>
      </div>
    </div>
    <div class="flex-1">
      <div id="presence-tool" class="flex">
        <div>Scale: <input class="w-20" v-model="map.scale" type="number" /></div>
        <div>
          <div>SPACE_Y: <input class="w-20" v-model="SPACE_Y" type="number" /></div>
          <div>SPACE_X: <input class="w-20" v-model="space_x" type="number" /></div>
          <div>Margin X: <input class="w-20" v-model="margin_x" type="number" /></div>
          <div>Total: <input class="w-20" v-model="total" type="number" /></div>
          <base-button @click="autoGen"> Auto Gen </base-button>
          <base-button @click="undo"> Undo </base-button>
        </div>
      </div>
      <div id="energy-tool">
        <div class="flex">
          <div>
            Base Energy:
            <input class="w-20" v-model="map.energy" type="number" />
          </div>
          <div>
            Base Card Play:
            <input class="w-20" v-model="map.cardPlay" type="number" />
          </div>
        </div>
        <div class="flex flex-wrap">
          <div @click="currentPoint = index" v-for="(item, index) in presences" class="w-1/4 border border-red-700 p-2">
            <div>Type: <input class="w-20" v-model="item.type" type="text" /></div>
            <div>
              Value:
              <input class="w-20" v-model="item.value" :type="item.type === 'energy' ? 'number' : 'text'" />
            </div>
            <div>X: <input class="w-20" v-model="item.point.x" type="number" /></div>
            <div>Y: <input class="w-20" v-model="item.point.y" type="number" /></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
