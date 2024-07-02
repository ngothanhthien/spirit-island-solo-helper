<script setup>
import BaseModal from '@/components/SpiritPanel/Modal.vue'
import { ref } from 'vue'
import { calBlock, toAbsolute } from '@/utils'
import { usePlayerCardStore } from '@/stores/PlayerCardStore'

const clickAbleMap = ref([
  {
    width: 8,
    height: 8,
    point: {
      x: 45.8,
      y: 23.8
    },
    row: 1
  },
  {
    width: 16,
    height: 8,
    point: {
      x: 60,
      y: 23.8
    },
    row: 1
  },
  {
    width: 8,
    height: 8,
    point: {
      x: 45.8,
      y: 36
    },
    row: 2
  },
  {
    width: 16,
    height: 8,
    point: {
      x: 60,
      y: 36
    },
    row: 2
  },
  {
    width: 7,
    height: 8,
    point: {
      x: 50.5,
      y: 48
    },
    row: 3
  },
  {
    width: 12,
    height: 8,
    point: {
      x: 62,
      y: 48
    },
    row: 3
  },
  {
    width: 7,
    height: 8,
    point: {
      x: 50.5,
      y: 61
    },
    row: 4
  },
  {
    width: 12,
    height: 8,
    point: {
      x: 62,
      y: 61
    },
    row: 4
  }
])
const player = usePlayerCardStore()
function choose(index) {
  const item = clickAbleMap.value[index]
  const pairIndex = player.saved.findIndex((i) => i.row === item.row)
  if (pairIndex !== -1) {
    const pair = player.saved[pairIndex]
    player.saved.splice(pairIndex, 1)
    if (pair.index !== index) {
      player.saved.push({
        ...item,
        index
      })
    }
  } else {
    player.saved.push({
      ...item,
      index
    })
  }
}

function isFaded(index) {
  const item = clickAbleMap.value[index]
  return player.saved.some((i) => i.row === item.row && i.index !== index)
}
</script>

<template>
  <base-modal>
    <template v-slot:default="{ containerWidth, containerHeight }">
      <div
        v-for="(item, index) in clickAbleMap"
        :style="calBlock(item.point, item.width, item.height, containerWidth, containerHeight)"
        :class="{ 'bg-gray-900/70': isFaded(index) }"
        class="absolute text-white rounded flex justify-center items-center"
        @click="choose(index)"
      ></div>
    </template>
  </base-modal>
</template>

<style scoped></style>
