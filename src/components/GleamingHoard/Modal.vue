<script setup lang="ts">
import { usePlayerCardStore } from '@/stores/PlayerCardStore'
import { useSpiritPanel } from '@/composable/useSpiritPanel'
import { ref } from 'vue'
import { useGleamingHoardStore } from '@/components/GleamingHoard/Store'
import type { Point, Element } from '@/types'
const SCALE = 6
const BOTTOM = ref<Point[]>([
  {
    x: 6.1,
    y: 87.5
  },
  {
    x: 13.43,
    y: 87.5
  },
  {
    x: 20.76,
    y: 87.5
  },
  {
    x: 28.1,
    y: 87.5
  },
  {
    x: 35.42,
    y: 87.5
  },
  {
    x: 42.75,
    y: 87.5
  },
  {
    x: 50.1,
    y: 87.5
  },
  {
    x: 57.41,
    y: 87.5
  },
  {
    x: 64.74,
    y: 87.5
  },
  {
    x: 72.07,
    y: 87.5
  },
  {
    x: 79.4,
    y: 87.5
  },
  {
    x: 86.73,
    y: 87.5
  },
  {
    x: 94.06,
    y: 87.5
  }
])
interface Ability {
  value: Exclude<Element, 'Any'>
  point: Point
  callback?: (arg0: boolean) => void
}
const ABILITY = ref<Ability[]>([
  {
    value: 'Plant',
    point: {
      x: 23.1,
      y: 17
    }
  },
  {
    value: 'Moon',
    point: {
      x: 23.3,
      y: 41.2
    }
  },
  {
    value: 'Animal',
    point: {
      x: 39.3,
      y: 17
    }
  },
  {
    value: 'Water',
    point: {
      x: 39.4,
      y: 41.2
    }
  },
  {
    value: 'Earth',
    point: {
      x: 39.5,
      y: 65.2
    }
  },
  {
    value: 'Fire',
    point: {
      x: 67.9,
      y: 17
    },
    callback: (isTake: boolean) => {
      if (isTake) {
        player.addInnate('Violent Outburst')
      } else {
        player.removeInnate('Violent Outburst')
      }
    }
  },
  {
    value: 'Air',
    point: {
      x: 67.9,
      y: 41.2
    },
    callback: (isTake: boolean) => {
      if (isTake) {
        player.addInnate('Harrowing Gaze')
      } else {
        player.removeInnate('Harrowing Gaze')
      }
    }
  },
  {
    value: 'Sun',
    point: {
      x: 67.9,
      y: 65.2
    },
    callback: (isTake: boolean) => {
      if (isTake) {
        player.addInnate('Imposing Demands')
      } else {
        player.removeInnate('Imposing Demands')
      }
    }
  }
])
const player = usePlayerCardStore()
const container = ref(null)
const { cal } = useSpiritPanel(container, SCALE)
const gleamingHoard = useGleamingHoardStore()

function isExist(i: number) {
  return i >= gleamingHoard.totalTook
}

function bottomClick(i: number) {
  if (isExist(i)) {
    gleamingHoard.increaseExtra()
  } else {
    gleamingHoard.decreaseExtra()
  }
}

function abilityClick(i: number, isTake: boolean) {
  const ability = ABILITY.value[i]
  gleamingHoard.toggleMap(ability.value)
  if (ability.callback) {
    ability.callback(isTake)
  }
}
</script>

<template>
  <div class="cs-modal z-40" @click.self="useGleamingHoardStore().hideModal()">
    <div ref="container" class="bg-white rounded-lg h-[95%] relative">
      <img class="h-full" :src="`/img/spirits/gleaming_hoard.webp`" alt="Spirit panel" />
      <div
        v-for="(point, index) in BOTTOM"
        :key="`presence-${index}`"
        :style="cal(point)"
        :class="{ 'bg-red-700': isExist(index as number) }"
        class="absolute cursor-pointer text-white rounded-full flex justify-center items-center"
        @click="bottomClick(index)"
      />
      <div
        v-for="(ability, index) in ABILITY"
        :key="`ability-${index}`"
        :style="cal(ability.point)"
        :class="{ 'bg-red-700': gleamingHoard.map[ability.value] }"
        class="absolute text-white rounded-full flex justify-center items-center"
        @click="abilityClick(index, !gleamingHoard.map[ability.value])"
      />
    </div>
  </div>
</template>
