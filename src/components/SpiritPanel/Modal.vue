<script setup lang="ts">
import { useSpiritInfo } from '@/composable/useSpiritInfo'
import { computed, ref } from 'vue'
import { nameParser } from '@/utils'
import { useModalStore } from '@/stores/ModalStore'
import { usePlayerCardStore } from '@/stores/PlayerCardStore'
import { useSpiritPanel } from '@/composable/useSpiritPanel'
import IconBack from '@/components/icons/IconBack.vue'
import type { Presence } from '@/types'

const { spiritInfo } = useSpiritInfo()
const spiritName = computed(() => nameParser(spiritInfo.value.name).toLowerCase())
const { presences, scale } = spiritInfo.value.panel as { presences: Presence[]; scale: number }
const player = usePlayerCardStore()
const container = ref(null)
const { cal } = useSpiritPanel(container, scale)
const currentBoard = ref(0)

function isExist(i: number) {
  return !player.disk.includes(i)
}

function diskClick(i: number) {
  player.diskClick(i)
}

function switchBoard() {
  currentBoard.value = currentBoard.value === 0 ? 1 : 0
}
</script>

<template>
  <div class="cs-modal z-40" @click.self="useModalStore().panel = false">
    <div ref="container" class="bg-white rounded-lg h-[95%] relative">
      <template v-if="currentBoard === 0">
        <img class="h-full" :src="`/img/spirits/${spiritName}_small.webp`" alt="Spirit panel" />
        <div
          v-for="(presence, index) in presences"
          :key="`presence-${index}`"
          :style="cal(presence.point)"
          :class="{ 'bg-red-700': isExist(index as number) }"
          class="absolute cursor-pointer text-white rounded-full flex justify-center items-center"
          @click="diskClick(index as number)"
        />
        <div v-if="!player.hasTakeIncome" @click="player.takeIncome()" class="absolute left-2 top-2 flex text-lg items-center bg-amber-600 text-white font-bold px-4 py-1 rounded-md cursor-pointer">
          <span class="icon-bolt"></span>
          <div>+{{ player.income }}</div>
        </div>
      </template>
      <template v-else>
        <img class="h-full" :src="`/img/spirits/${spiritName}_back.webp`" alt="Spirit panel" />
      </template>
      <div>
        <icon-back class="absolute right-1 top-1 w-8 h-8 cursor-pointer" @click="switchBoard" />
      </div>
    </div>
  </div>
</template>
