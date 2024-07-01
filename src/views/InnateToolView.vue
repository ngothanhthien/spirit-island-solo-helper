<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import type { InnatePower } from '@/types'
import { onKeyStroke } from '@vueuse/core'
import { downloadObjectAsJson } from '@/utils'
import BaseButton from '@/components/base/BaseButton.vue'

const innate = ref<InnatePower[]>([])
onKeyStroke(['s'], (e) => {
  e.preventDefault()
  downloadObjectAsJson(innate.value, 'innate')
})

onKeyStroke(['f'], (e) => {
  e.preventDefault()
  add()
})

onMounted(() => {
  add()
})

async function add() {
  innate.value.push({
    name: '',
    elements: [{}],
    fast: true
  })
  await nextTick()
  document.getElementById(`name-${innate.value.length - 1}`)?.focus()
}

function addElements(index: number) {
  innate.value[index].elements.push({})
}

function elementClick(element: string, index: number, elementIndex: number, modeIncrease: boolean) {
  if (modeIncrease) {
    if (!innate.value[index].elements[elementIndex][element]) {
      innate.value[index].elements[elementIndex][element] = 1
    } else {
      innate.value[index].elements[elementIndex][element]++
    }
  } else {
    if (innate.value[index].elements[elementIndex][element] > 1) {
      innate.value[index].elements[elementIndex][element]--
    } else {
      delete innate.value[index].elements[elementIndex][element]
    }
  }
}
</script>

<template>
  <div class="p-4 space-y-4">
    <h1>Innate Tool</h1>
    <div v-for="(item, index) in innate" class="border border-red-700 p-2 mx-2">
      <base-button @click="addElements(index)" class="mb-4"> Add Element </base-button>
      <div>
        <label for="fast">Fast:</label>
        <input type="checkbox" v-model="item.fast" />
      </div>
      <div class="flex mb-2">
        <label :for="`name-${index}`">Name:</label>
        <div class="ml-2 border-b border-gray-400">
          <input class="outline-none" :id="`name-${index}`" v-model="item.name" autocomplete="off" />
        </div>
      </div>
      <div>
        <div v-for="(map, mapIndex) in item.elements" class="flex select-none flex-wrap">
          <div
            v-for="element in ['Sun', 'Moon', 'Fire', 'Air', 'Water', 'Earth', 'Plant', 'Animal']"
            :key="element"
            :class="{ 'opacity-10': !map[element] }"
            class="flex items-center my-2 px-1 text-4xl ml-4 cursor-pointer"
            @click="elementClick(element, index, mapIndex, true)"
            @click.right="elementClick(element, index, mapIndex, false)"
          >
            <div>
              {{ map[element] ?? 0 }}
            </div>
            <span
              :class="{
                'icon-sun': element === 'Sun',
                'icon-moon': element === 'Moon',
                'icon-fire': element === 'Fire',
                'icon-air': element === 'Air',
                'icon-water': element === 'Water',
                'icon-earth': element === 'Earth',
                'icon-plant': element === 'Plant',
                'icon-animal': element === 'Animal'
              }"
            >
              <span class="path1" />
              <span class="path2" />
              <span class="path3" />
              <span class="path4" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
