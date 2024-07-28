<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core'
import { computed, type ComputedRef, ref, toRaw } from 'vue'
import { downloadObjectAsJson } from '@/utils'
import { usePresenceSpiritPanelTool } from '@/composable/usePresenceSpiritPanelTool'
import InnateTool from '@/components/Tool/innate.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import type { Presence } from '@/types'
const container = ref(null)
const current = ref('dances_up_earthquakes_small')
onKeyStroke(['s'], (e) => {
  e.preventDefault()
  const raw = toRaw(map)
  const parsed = {
    ...raw,
    presences: raw.presences.map((item) => {
      const { type, value, point } = item
      if (!type) {
        return {
          point: {
            x: Number(point.x),
            y: Number(point.y)
          }
        }
      }
      return {
        ...item,
        value: type === 'energy' || type === 'card-play' ? Number(value) : value,
        point: {
          x: Number(point.x),
          y: Number(point.y)
        }
      }
    })
  }
  downloadObjectAsJson(parsed, current.value)
})
onKeyStroke(['f'], (e) => {
  e.preventDefault()
  downloadObjectAsJson(block.value, current.value)
})
onKeyStroke(['b'], (e) => {
  e.preventDefault()
  addBlock()
})
const { map, save, cal, calBlock, label, last } = usePresenceSpiritPanelTool(container)
const presences = computed(() => map.presences) as ComputedRef<Presence[]>
const currentPoint = ref(0)
const space_x = ref(7.85)
const total = ref(1)
const margin_x = ref(0)
function autoGen() {
  const point = map.presences[currentPoint.value].point
  const SPACE_X = space_x.value
  const TOTAL = total.value
  for (let i = 0; i < TOTAL; i++) {
    const newPoint = {
      x: point.x + SPACE_X * (i + 1) + margin_x.value,
      y: point.y
    }
    const lastPoint = map.presences[map.presences.length - 1]
    map.presences.push({
      ...lastPoint,
      point: newPoint
    })
  }
}
function undo() {
  for (let i = 0; i < total.value; i++) {
    map.presences.pop()
  }
}

const block = ref([
  {
    width: 37,
    height: 52,
    point: {
      x: 19,
      y: 41
    },
    aspect: '',
    width_percent: 105,
    top: 1
  }
])

const currentBlock = ref(0)
function addBlock() {
  block.value.push({
    width: 10,
    height: 10,
    point: {
      x: 50,
      y: 50
    },
    aspect: '',
    width_percent: 105,
    top: 1
  })
}
</script>

<template>
  <div>
    <div class="flex mb-2">
      <label for="panel-name">Panel:</label>
      <div class="ml-2 border-b border-gray-400">
        <input id="panel-name" class="w-80 outline-none" v-model="current" type="text" />
      </div>
    </div>
  </div>
  <div class="flex">
    <div @click="save" class="h-[600px]">
      <div ref="container" class="relative h-full w-fit">
        <img alt="" class="h-full w-auto bottom-0 right-0 whitespace-nowrap" :src="`/img/spirits/${current}.webp`" />
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
        <!--        <div-->
        <!--          v-for="(item, index) in block"-->
        <!--          :style="calBlock(item.point, item.width, item.height)"-->
        <!--          :class="{-->
        <!--            'bg-red-700': currentBlock === index,-->
        <!--            'bg-green-700': currentBlock !== index-->
        <!--          }"-->
        <!--          class="absolute text-white rounded flex justify-center items-center overflow-hidden"-->
        <!--        >-->
        <!--          <img :style="`width: ${item.width_percent}%; top: ${item.top}%; position: absolute; max-width: none`" :src="`/img/aspects/${item.aspect}.webp`"  alt=""/>-->
        <!--        </div>-->
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
          <div @click="currentPoint = index" v-for="(item, index) in presences" class="w-1/4 border border-red-700 p-2 space-y-2">
            <div class="flex space-x-2">
              <label :class="{ 'text-red-700': !item.type }">
                None
                <input class="w-20" v-model="item.type" type="radio" hidden :value="null" />
              </label>
              <label :class="{ 'text-red-700': item.type === 'element' }">
                Element
                <input class="w-20" v-model="item.type" type="radio" hidden value="element" />
              </label>
              <label :class="{ 'text-red-700': item.type === 'card-play' }">
                Card
                <input class="w-20" v-model="item.type" type="radio" hidden value="card-play" />
              </label>
              <label :class="{ 'text-red-700': item.type === 'energy' }">
                Energy
                <input class="w-20" v-model="item.type" type="radio" hidden value="energy" />
              </label>
            </div>
            <div class="flex mb-2">
              <label :for="`type-${index}`">Value:</label>
              <div class="ml-2 border-b border-gray-400">
                <input class="w-20 outline-none" v-model="item.value" :type="item.type === 'energy' || item.type === 'card-play' ? 'number' : 'text'" />
              </div>
            </div>
            <div class="flex mb-2">
              <label :for="`x-${index}`">X:</label>
              <div class="ml-2 border-b border-gray-400">
                <input class="w-10 outline-none" v-model="item.point.x" type="number" />
              </div>
            </div>
            <div class="flex mb-2">
              <label :for="`y-${index}`">Y:</label>
              <div class="ml-2 border-b border-gray-400">
                <input class="w-10 outline-none" v-model="item.point.y" type="number" />
              </div>
            </div>
          </div>
          <!--          <div v-for="(item, index) in block" @click="currentBlock = index" class="w-1/4 border border-blue-700 p-2">-->
          <!--            <div class="flex mb-2">-->
          <!--              <label :for="`aspect-${index}`">Aspect:</label>-->
          <!--              <div class="ml-2 border-b border-gray-400">-->
          <!--                <input class="outline-none w-full" :id="`width-${index}`" v-model="item.aspect" type="text" />-->
          <!--              </div>-->
          <!--            </div>-->
          <!--            <div class="flex mb-2">-->
          <!--              <label :for="`width-percent-${index}`">Top:</label>-->
          <!--              <div class="ml-2 border-b border-gray-400">-->
          <!--                <input class="outline-none w-10" :id="`width-${index}`" v-model="item.top" type="number" />-->
          <!--              </div>-->
          <!--            </div>-->
          <!--            <div class="flex mb-2">-->
          <!--              <label :for="`width-percent-${index}`">Width Percent:</label>-->
          <!--              <div class="ml-2 border-b border-gray-400">-->
          <!--                <input class="outline-none w-10" :id="`width-${index}`" v-model="item.width_percent" type="number" />-->
          <!--              </div>-->
          <!--            </div>-->
          <!--            <div class="flex mb-2">-->
          <!--              <label :for="`width-${index}`">Width:</label>-->
          <!--              <div class="ml-2 border-b border-gray-400">-->
          <!--                <input class="outline-none w-10" :id="`width-${index}`" v-model="item.width" type="number" />-->
          <!--              </div>-->
          <!--            </div>-->
          <!--            <div class="flex mb-2">-->
          <!--              <label :for="`height-${index}`">Height:</label>-->
          <!--              <div class="ml-2 border-b border-gray-400">-->
          <!--                <input class="outline-none w-10" :id="`height-${index}`" v-model="item.height" type="number" />-->
          <!--              </div>-->
          <!--            </div>-->
          <!--            <div class="flex mb-2">-->
          <!--              <label :for="`x-${index}`">X:</label>-->
          <!--              <div class="ml-2 border-b border-gray-400">-->
          <!--                <input class="outline-none w-10" :id="`height-${index}`" v-model="item.point.x" type="number" />-->
          <!--              </div>-->
          <!--            </div>-->
          <!--            <div class="flex mb-2">-->
          <!--              <label :for="`y-${index}`">Y:</label>-->
          <!--              <div class="ml-2 border-b border-gray-400">-->
          <!--                <input class="outline-none w-10" :id="`height-${index}`" v-model="item.point.y" type="number" />-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </div>-->
        </div>
      </div>
    </div>
  </div>
  <innate-tool />
</template>
