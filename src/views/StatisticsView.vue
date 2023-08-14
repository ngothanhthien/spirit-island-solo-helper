<script setup lang="ts">
import { results } from '@/plugins/firebase'
import { computed } from 'vue'
import router from '@/router'
import { useCollection } from 'vuefire'
import { adversaryNameToImage, getSpiritAvatarByName } from '@/utils'
import { SPIRIT } from '@/constant'

interface SpiritsWinRate {
  [spirit: string]: {
    total: number;
    adversaries: {
      [adversary: string]: {
        win: number;
        total: number;
      };
    };
  };
}

const resultsRef = useCollection(results)
const totalGame = computed(() => resultsRef.value.length)
const ADVERSARIES = ['England', 'France', 'Habsburg', 'Habsburg Mining', 'Prussia', 'Russia', 'Sweden', 'Scotland']
const spiritsWinRate = computed(() => {
  const output: SpiritsWinRate = {}

  for (let i = 0; i < SPIRIT.length; i++) {
    const spiritName = SPIRIT[i].name as string
    output[spiritName] = {
        total: 0,
        adversaries: {}
    }
    for (let j = 0; j < ADVERSARIES.length; j++) {
      const adversary = ADVERSARIES[j]
      output[spiritName].adversaries[adversary] = {
        win: 0,
        total: 0
      }
    }
  }
  for (let i = 0; i < resultsRef.value.length; i++) {
    const { adversary, spirits, win } = resultsRef.value[i]
    for(let j = 0; j < spirits.length; j++) {
      const spirit = spirits[j]
      if (output[spirit] && output[spirit].adversaries[adversary]) {
        output[spirit].total++
        output[spirit].adversaries[adversary].total++
        if (win) {
            output[spirit].adversaries[adversary].win++
        }
      } else {
        console.warn(`Unexpected spirit or adversary: ${spirit}, ${adversary}`)
      }
    }
  }

  return output
})
</script>

<template>
  <div class="h-screen w-full bg-amber-100 flex flex-col px-4 py-2">
    <div class="flex">
      <div>Total: {{ totalGame }}</div>
      <div
        class="ml-auto text-orange-800"
        @click="router.push({ name: 'HomeView'})"
      >
        Back to menu
      </div>
    </div>
    <div class="overflow-y-auto block flex-1 w-fit border border-gray-500 rounded">
      <table class="table-auto">
        <thead class="sticky top-0">
          <tr class="border-b border-gray-500">
            <th />
            <th
              v-for="adversary in ADVERSARIES"
              :key="adversary"
            >
              <img
                :src="`/img/adversary/${adversaryNameToImage(adversary)}`"
                alt="Adversary Image"
                class="h-8"
              >
            </th>
          </tr>
        </thead>
        <tbody class="h-32 overflow-y-auto">
          <tr
            v-for="(spirit, index) in Object.keys(spiritsWinRate)"
            :key="spirit"
            class="border-gray-500"
            :class="{
              'border-b': index !== Object.keys(spiritsWinRate).length - 1,
              'bg-amber-200': index % 2 === 0
            }"
          >
            <td class="border-r border-gray-500 pr-1">
              <img
                :src="`/img/spirit_avatar/${getSpiritAvatarByName(spirit)}`"
                alt="spirit avatar"
                class="h-8 inline-block mr-1"
              >({{ spiritsWinRate[spirit].total }})
            </td>
            <td
              v-for="(value, key) in spiritsWinRate[spirit].adversaries"
              :key="key"
              class="text-center"
            >
              {{ value.total === 0 ? 'x' : ((value.win / value.total) * 100) + '%' }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>