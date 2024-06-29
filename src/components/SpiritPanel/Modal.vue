<script setup lang="ts">
import { useSpiritInfo } from '@/composable/useSpiritInfo'
import { computed, ref } from 'vue'
import { nameParser } from '@/utils'
import { useModalStore } from '@/stores/ModalStore'
import { useSpiritPanel } from '@/composable/usePresenceSpiritPanelTool'
import { usePlayerCardStore } from '@/stores/PlayerCardStore'
import BaseButton from '@/components/base/BaseButton.vue'

const { spiritInfo } = useSpiritInfo()
const spiritName = computed(() => nameParser(spiritInfo.value.name).toLowerCase())
const { location } = spiritInfo.value.panel
const player = usePlayerCardStore()
const container = ref(null)
const { cal } = useSpiritPanel(container, location)

function isExist(i: number, row: number) {
  const disk = player.disk
  return disk[row][i] !== null
}

function diskClick(i: number, row: number) {
  player.diskClick(i, row)
}
</script>

<template>
  <div class="cs-modal z-40" @click.self="useModalStore().panel = false">
    <div ref="container" class="bg-white rounded-lg h-[90%] relative">
      <img class="h-full" :src="`/img/spirits/${spiritName}_small.webp`"  alt="Spirit panel"/>
      <div
        v-for="i in location.TOP"
        :key="`top-${i}`"
        :style="cal(i - 1)"
        :class="{'bg-red-700': isExist(i - 1, 0)}"
        class="absolute cursor-pointer text-white rounded-full flex justify-center items-center"
        @click="diskClick(i - 1, 0)"
      />
      <div
        v-for="i in location.BOT"
        :key="`bot-${i}`"
        :style="cal(i - 1, true)"
        :class="{'bg-red-700': isExist(i - 1, 1)}"
        class="absolute cursor-pointer text-white rounded-full flex justify-center items-center"
        @click="diskClick(i - 1, 1)"
      />
      <div class="absolute left-2 top-2">
        <base-button v-if="!player.hasTakeIncome" @click="player.takeIncome()" button-style="secondary">
          Income
        </base-button>
      </div>
    </div>
  </div>
</template>
