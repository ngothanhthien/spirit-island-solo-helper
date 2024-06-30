<script setup lang="ts">
import { computed, reactive, ref, toRaw } from 'vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { type Element } from '@/types'
import { onKeyStroke } from '@vueuse/core'
import { downloadObjectAsJson, nameParser } from '@/utils'

const images = ['Favors of Steel and Bone', 'Melt Earth to Slag', 'Petition for Smoldering Wrath', 'Unnerving Attention']
const current = ref(0)
const currentImages = computed(() => nameParser(images[current.value]).toLowerCase())
function toggle(element: Element) {
  if (data.elements.includes(element)) {
    data.elements = data.elements.filter((e) => e !== element)
  } else {
    data.elements.push(element)
  }
}
const data = reactive({
  cost: 0,
  elements: [] as Element[],
  speed: 'Fast' as 'Fast' | 'Slow'
})
const exported = ref([])
onKeyStroke(['s'], (e) => {
  e.preventDefault()
  downloadObjectAsJson(exported.value, 'Card')
})
function next() {
  current.value = (current.value + 1) % images.length
  // @ts-ignore
  exported.value.push({
    ...toRaw(data),
    name: images[current.value],
    description: ''
  })
  data.cost = 0
  data.elements = []
  data.speed = 'Fast'
}
</script>

<template>
  <div class="flex">
    <div>
      <img alt="" class="w-auto h-[600px] bottom-0 right-0 whitespace-nowrap" :src="`/img/powers/${currentImages}.webp`" />
      <div class="flex justify-center mt-4">
        <base-button @click="next">Next</base-button>
      </div>
    </div>
    <div class="flex-1 px-6 py-3">
      <div class="flex select-none flex-wrap">
        <div v-for="element in ['Sun', 'Moon', 'Fire', 'Air', 'Water', 'Earth', 'Plant', 'Animal']" :key="element" class="flex items-center my-1 px-1 gap-4" @click="toggle(element)">
          <span
            :class="{
              'icon-sun': element === 'Sun',
              'icon-moon': element === 'Moon',
              'icon-fire': element === 'Fire',
              'icon-air': element === 'Air',
              'icon-water': element === 'Water',
              'icon-earth': element === 'Earth',
              'icon-plant': element === 'Plant',
              'icon-animal': element === 'Animal',
              'opacity-30': !data.elements.includes(element)
            }"
            class="cursor-pointer text-6xl ml-4"
          >
            <span class="path1" />
            <span class="path2" />
            <span class="path3" />
            <span class="path4" />
          </span>
        </div>
      </div>
      <div class="mt-4 text-xl">Energy: <input v-model="data.cost" type="number" /></div>
      <div class="mt-4"><input v-model="data.speed" type="radio" value="Fast" /> Fast <input v-model="data.speed" type="radio" value="Slow" /> Slow</div>
    </div>
  </div>
</template>
