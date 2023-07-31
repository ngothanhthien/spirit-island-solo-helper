<script setup lang="ts">
import { computed, ref } from 'vue';

import { ADVERSARY } from '@/constant'
import { useGameOptionStore } from '@/stores/GameOptionStore';
import AdversaryText from '@/components/base/AdversaryText.vue'
import { onClickOutside, useWindowSize } from '@vueuse/core';
import IconEscalation from '@/components/icons/EscalationIcon.vue'
import { IconX } from '@tabler/icons-vue'

const emit =defineEmits(['close'])
const FIXED_WIDTH = 1100
const FIXED_HEIGHT = 600

const gameOption = useGameOptionStore();

const adversaryEl = ref<HTMLElement | null>(null)
const { height } = useWindowSize()
const scale = computed(() => {
  return (height.value * 0.9 / FIXED_HEIGHT).toFixed(2)
})

onClickOutside(adversaryEl, () => {
  emit('close')
})
const currentAdversary = computed(() => {
  return ADVERSARY[gameOption.adversary || 0];
})
const title = computed(() => {
  return currentAdversary.value.detail.title
})
const escalation = computed(() => {
  return currentAdversary.value.detail.escalation
})
const loss = computed(() => {
  return currentAdversary.value.detail.loss
})
const levelDetail = computed(() => {
  return currentAdversary.value.detail.levelText.map((detail, index) => {
    const level = index + 1
    let isHighlight = false
    if (level <= gameOption.adversaryLevel && detail.isHighlight) {
      isHighlight = true
    }

    //handle Habsburg Mining
    if (gameOption.adversary && ADVERSARY[gameOption.adversary].id === 'habsburg-mining' && gameOption.adversaryLevel >=5 && level === 3) {
      isHighlight = false
    }

    return {
      ...detail,
      isHighlight,
    }
  })
})
const baseDiff = computed(() => {
  return currentAdversary.value.difficultly[0]
})
const flagImg = computed(() => {
  return currentAdversary.value.id
})
const diffArr = computed(() => {
  return currentAdversary.value.difficultly.slice(1)
})
const fearArr = computed(() => {
  return currentAdversary.value.fear.slice(1)
})
</script>
<template>
  <div
    class="absolute top-0 left-0 w-full h-full z-40 bg-gray-900/50"
  >
    <div
      ref="adversaryEl"
      class="grid overflow-hidden absolute rounded-2xl shadow-lg left-1/2 top-1/2"
      :style="`
        height: ${FIXED_HEIGHT}px;
        width: ${FIXED_WIDTH}px;
        grid-template-columns: 11% 12% 13% 25% 16% 23%;
        grid-template-rows: 6% 17% 7% auto auto auto auto auto auto;
        background: rgb(255, 255, 255);
        line-height: 14pt;
        transform: translate(-50%, -50%) scale(${scale}, ${scale});
        transform-origin: center center;
      `"
    >
      <div
        class="flex items-center justify-center text-2xl font-bold"
        style="
          grid-column: 1 / 5;
          background-color: rgb(225, 220, 190);
          border-left: 20px solid black;
          border-top: 20px solid black;
          border-color: rgb(225, 220, 190);
          border-radius: 18px 0px 0px 0px;
          box-shadow: 0px 3px 0px 0px rgba(0, 0, 0, 0.6);
          z-index: 2;
        "
      >
        <div style="margin-top: -18px">
          {{ title }}
        </div>
      </div>
      <div
        class="flex justify-end items-end"
        style="
          background-color: rgb(225, 220, 190);
          border-top: 20px solid black;
          border-color: rgb(225, 220, 190);
          box-shadow: 0px 3px 0px 0px rgba(0, 0, 0, 0.6);
          z-index: 2;
        "
      >
        BASE DIFFICULTY {{ baseDiff }}
      </div>
      <div
        class="pt-0.5 pl-1.5"
        style="
          grid-column: 6 / -1;
          background-color: rgb(225, 220, 190);
          border-top: 20px solid black;
          border-right: 20px solid black;
          border-color: rgb(225, 220, 190);
          border-radius: 0px 18px 0px 0px;
          box-shadow: 0px 3px 0px 0px rgba(0, 0, 0, 0.6);
          z-index: 2;
        "
      >
        <div>
          <img
            :src="`/img/adversary/${flagImg}-flag.webp`"
            alt="Adversary Flag"
            width="170"
            height="108"
          >
        </div>
      </div>
      <div
        class="pt-1 pl-4"
        style="
          grid-column: 1 / 4;
          border-left: 20px solid black;
          border-color: rgb(145, 125, 100);
          background-color: rgb(235, 230, 215);
          box-shadow: 20px 3px 0px 0px rgba(90, 90, 90, 1);
          z-index: 1;
        "
      >
        <div class="font-bold italic">
          Additional Loss Condition
        </div>
        <div>
          <adversary-text
            :message="loss"
            :is-highlight="loss.name !== null"
          />
        </div>
      </div>
      <div
        class="pt-1 pl-5"
        style="
          grid-column: 4 / 6;
          background-color: rgb(235, 230, 215);
          box-shadow: 0px 3px 0px 0px rgba(90, 90, 90, 1);
          z-index: 1;
        "
      >
        <div class="flex items-center">
          <div class="font-bold italic">
            Escalation
          </div>
          <IconEscalation class="w-5 h-5 fill-current mb-0.5" />
        </div>
        <div class="space-x-2">
          <adversary-text
            :message="escalation"
            :is-highlight="true"
          />
        </div>
      </div>
      <div
        class="z-0"
        style="
          background-color: rgb(235, 230, 215);
          border-right: 20px solid black;
          border-color: rgb(145, 125, 100);
          box-shadow: -20px 3px 0px 0px rgba(90, 90, 90, 1);
        "
      >
        <div
          class="relative"
          style="top: 526px; left: 170px"
        >
          <div
            class="flex justify-center items-center"
            style="height: 30px; width: 30px"
          />
        </div>
      </div>
      <div
        style="
          grid-column: 1 / -1;
          border-left: 20px solid black;
          border-right: 20px solid black;
          border-color: rgb(145, 125, 100);
        "
      >
        <div class="mx-6 mt-0.5">
          <div
            class="grid"
            style="grid-template-columns: 10% 12% 79%"
          >
            <div
              class="items-center text-center flex justify-center font-bold italic"
              style="grid-column: 1 / 2"
            >
              Level<br>(Difficulty)
            </div>
            <div
              class="font-bold italic flex justify-center items-center"
              style="grid-column: 2 / 3"
            >
              Fear Cards
            </div>
            <div
              class="italic flex items-center"
              style="grid-column: 3 / -1"
            >
              <div><span class="font-bold">Game Effects</span> (cumulative)</div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-for="i in 6"
        :key="i"
        style="
          grid-column: 1 / -1;
          border-left: 20px solid black;
          border-right: 20px solid black;
          border-color: rgb(145, 125, 100);
        "
        :class="{'text-gray-300':i > gameOption.adversaryLevel}"
      >
        <div class="mx-6 mt-0.5">
          <div
            class="grid"
            style="grid-template-columns: 10% 12% 79%"
          >
            <div
              class="flex justify-center items-center"
              style="grid-column: 1 / 2"
            >
              <div class="text-4xl font-bold">
                {{ i }}
              </div>
              <div class="text-xl flex relative mt-6">
                ({{ diffArr[i - 1] }})
              </div>
            </div>
            <div
              class="flex justify-center items-center"
              style="
                grid-column: 2 / 3;
                display: flex;
                justify-content: center;
                align-items: center;
              "
            >
              {{ fearArr[i - 1] }}
            </div>
            <div
              style="grid-column: 3 / -1"
              class="flex items-center"
            >
              <adversary-text
                :message="levelDetail[i - 1]"
                :is-highlight="levelDetail[i-1].isHighlight"
              />
            </div>
          </div>
          <div
            v-if="i!=6"
            class="mt-1"
          >
            <div
              style="
                border-bottom: 1px solid black;
                border-color: rgb(50, 50, 50);
              "
            />
          </div>
        </div>
      </div>
  
      <div
        style="
          grid-column: 1 / -1;
          border-left: 20px solid black;
          border-right: 20px solid black;
          border-bottom: 20px solid black;
          border-radius: 0px 0px 18px 18px;
          border-color: rgb(145, 125, 100);
        "
      />
      <div
        class="inline-block absolute top-0 right-0 text-gray-500 z-50"
        @click="emit('close')"
      >
        <icon-x class="w-14 h-14" />
      </div>
    </div>
  </div>
</template>