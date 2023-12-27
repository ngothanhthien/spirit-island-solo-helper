<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import { adversaryNameToImage, getDayAgo, getSpiritAvatarByName } from '@/utils'
import { SPIRIT } from '@/constant'
import axios from "axios";
import { API_LIST_MATCH_LOG } from "@/constant/api";
import { useLocalStorageStore } from "@/stores/LocalStorageStore";
import type { ChartData, SpiritsChart } from "@/types";

interface Result {
  win: number
  lose: number
}

const isLoading = ref(false)
const spiritsChart = ref<SpiritsChart>({})
const totalGame = ref(0)
const lastTime = ref('unknown')
const lastUpdate = ref('Failed')
const ADVERSARIES = ['England', 'France', 'Habsburg', 'Habsburg Mining', 'Prussia', 'Russia', 'Sweden', 'Scotland']
const SPIRIT_NAMES = SPIRIT.map(spirit => spirit.name)
const localStorage = useLocalStorageStore()
initChart()

async function initChart() {
  isLoading.value = true
  try {
    const { data: { data } } = await axios.get(API_LIST_MATCH_LOG)
    localStorage.setChart(data)
    renderChart(data)
    lastUpdate.value = getDayAgo(new Date())
  } catch (e) {
    isLoading.value = false
    const chart = localStorage.chart
    if (chart) {
      renderChart(chart)
      if (chart.lastUpdate) {
        lastUpdate.value = getDayAgo(chart.lastUpdate)
      }
    }
  }
}

function renderChart(data: ChartData) {
  isLoading.value = false
  totalGame.value = data.total
  spiritsChart.value = data.spirit_chart ?? {}

  const pendingResult = localStorage.pendingResult
  if (pendingResult.length > 0) {
    lastTime.value = getDayAgo(pendingResult[pendingResult.length - 1].createdAt)
  } else {
    lastTime.value = getDayAgo(data.last.createdAt)
  }
}

function getWin(result: Result) {
  if (!result) {
    return console.error('Invalid adversary name')
  }

  const{ win, lose } = result
  if (win === 0 && lose === 0) return 'x'
  return (win / (win + lose) * 100).toFixed(0) + '%'
}
</script>

<template>
  <div class="h-screen w-full bg-amber-100 flex flex-col px-4 py-2">
    <div class="flex">
      <div
        class="ml-auto text-orange-800"
        @click="router.push({ name: 'HomeView'})"
      >
        Back to menu
      </div>
    </div>
    <div class="flex-1 flex" style="max-height: 90vh;">
      <div class="block overflow-y-auto h-full w-fit border border-gray-500 rounded">
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
              v-for="(spirit, index) in SPIRIT_NAMES"
              :key="spirit"
              class="border-gray-500"
              :class="{
              'border-b': index !== SPIRIT_NAMES.length - 1,
              'bg-amber-200': index % 2 === 0
            }"
          >
            <td class="border-r border-gray-500 pr-1">
              <img
                  :src="`/img/spirit_avatar/${getSpiritAvatarByName(spirit)}`"
                  alt="spirit avatar"
                  class="h-8 inline-block mr-1"
              >({{ spiritsChart[spirit] ? spiritsChart[spirit].total : 0 }})
            </td>
            <template v-if="spiritsChart[spirit]">
              <td
                  v-for="adversary in ADVERSARIES"
                  :key="spirit + adversary"
                  class="text-center"
              >
                {{ getWin(spiritsChart[spirit][adversary] as Result) }}
              </td>
            </template>
            <template v-else>
              <td
                  v-for="adversary in ADVERSARIES"
                  :key="adversary"
                  class="text-center"
              >
                x
              </td>
            </template>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="ml-4 mt-4">
        <div class="mr-6">Total: {{ totalGame }}</div>
        <div class="mr-6">Last play: {{ lastTime }}</div>
        <div class="mr-6">Last update: {{ lastUpdate }}</div>
        <div>Pending Result: {{ localStorage.pendingResult.length }}</div>
      </div>
    </div>
  </div>
</template>