<script setup lang="ts">
import { onKeyStroke } from '@vueuse/core'
import { ref, toRaw } from 'vue'
import { downloadObjectAsJson } from '@/utils'
import { usePresenceSpiritPanelTool } from '@/composable/usePresenceSpiritPanelTool'
import { useValueSpiritPanelTool } from '@/composable/useValueSpiritPanelTool'
const container = ref(null)
const NAME = 'vital_strength_of_the_earth'
onKeyStroke(['s'], (e) => {
  e.preventDefault()
  downloadObjectAsJson(
    {
      location: toRaw(map),
      value: toRaw(value)
    },
    NAME
  )
})

const { map, save, cal } = usePresenceSpiritPanelTool(container)
const { value, currentEnergy, currentCardPlay } = useValueSpiritPanelTool()
</script>

<template>
  <div @click="save">
    <div ref="container" class="relative h-screen w-fit">
      <img alt="" class="h-full w-auto bottom-0 right-0 whitespace-nowrap" src="/img/spirits/vital_strength_of_the_earth_small.webp" />
      <div v-for="i in map.TOP" :style="cal(i - 1)" class="absolute bg-red-700 text-white rounded-full flex justify-center items-center">
        {{ currentEnergy(i - 1) }}
      </div>
      <div v-for="i in map.BOT" :style="cal(i - 1, true)" class="absolute bg-blue-700 text-white rounded-full flex justify-center items-center">
        {{ currentCardPlay(i - 1) }}
      </div>
    </div>
  </div>
  <div>
    <div id="presence-tool" class="flex">
      <div>X: <input class="w-20" v-model="map.last.x" type="number" /></div>
      <div>Y: <input class="w-20" v-model="map.last.y" type="number" /></div>
      <div>SPACE_Y: <input class="w-20" v-model="map.SPACE_Y" type="number" /></div>
      <div>WIDTH: <input class="w-20" v-model="map.WIDTH" type="number" /></div>
    </div>
    <div id="energy-tool">
      <div class="flex">
        <div>
          Base Energy:
          <input class="w-20" v-model="value.BASE_ENERGY" type="number" />
        </div>
        <div>
          Base Card Play:
          <input class="w-20" v-model="value.BASE_ENERGY" type="number" />
        </div>
      </div>
      <div class="flex">
        <div class="bg-amber-300">
          <div>Energy</div>
          <div>
            <input v-for="i in value.ENERGY" class="w-10" v-model="value.ENERGY[i]" type="text" />
          </div>
        </div>
        <div class="bg-blue-300">
          <div>Card Play</div>
          <div>
            <input v-for="i in value.CARD_PLAY" class="w-10" v-model="value.CARD_PLAY[i]" type="text" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
