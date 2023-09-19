<script setup lang="ts">
import router from '@/router'
import { computed, ref, watch } from 'vue'
import { useFearDeckStore } from '@/stores/FearDeckStore'
import { usePlayerCardStore } from '@/stores/PlayerCardStore'
import { IconX, IconBolt, IconPlus, IconMinus } from '@tabler/icons-vue'
import FearIcon from '@/components/icons/FearIcon.vue'
import PowerElement from '@/components/PowerElement.vue'
import { useGameOptionStore } from '@/stores/GameOptionStore'
import { getSpiritAvatar } from '@/utils'
import BaseButton from '@/components/base/BaseButton.vue'
import { addResult } from '@/database/result'
import { useInvaderCardStore } from '@/stores/InvaderCardStore'
import { useMessageStore } from '@/stores/MessageStore'
import { usePowerDeckStore } from '@/stores/PowerDeckStore'

defineEmits(['close'])

const playerCard = usePlayerCardStore()
const fearDeck = useFearDeckStore()
const gameOption = useGameOptionStore()
const invaderCard = useInvaderCardStore()
const minorDeck = usePowerDeckStore('minor')
const majorDeck = usePowerDeckStore('major')
const appEnviroment = ref(import.meta.env.VITE_APP_ENVIRONMENT);

const modeIncrease = ref(true)
const showConfirmLogMatch = ref(false)
const aspectMode = ref(playerCard.aspectMode)
const showAspect = ref(playerCard.showAspect)
const isLoading = ref(false)

const isHasAspect = computed(() => Boolean(gameOption.aspectsDetail[playerCard.current]))

function adjustElement(element: string) {
  if (modeIncrease.value) {
    playerCard.increaseElement(element)
  } else {
    playerCard.decreaseElement(element)
  }
}

function onClickExitGame() {
  if (appEnviroment.value === 'dev') {
    router.push({ name: 'HomeView' })
    return
  }
  showConfirmLogMatch.value = true
}

async function logMatch(win: boolean) {
  isLoading.value = true
  try {
    await addResult({
      spirits: gameOption.spiritsName,
      adversary: gameOption.adversaryName,
      win,
      level: gameOption.adversaryLevel,
      invader_card_left: invaderCard.draw.length,
      fear_stage: fearDeck.draw.length === 0 ? 4 : fearDeck.currentStage,
    })
    minorDeck.$reset()
    majorDeck.$reset()
    await router.push('/HomeView')
  } catch (error) {
    useMessageStore().setMessage('Log failed')
    isLoading.value = false
  }
}

watch(aspectMode, (value) => {
  playerCard.setAspectMode(value)
})

watch(showAspect, (value) => {
  playerCard.setShowAspect(value)
})
</script>

<template>
  <div
    class="absolute z-[9999] bg-gray-900/30 top-0 left-0 h-full w-full flex items-center justify-center"
    @click.self="$emit('close')"
  >
    <div class="w-[90%] h-[90%] bg-orange-200 rounded-lg flex flex-col relative">
      <div class="flex justify-between px-3 py-2 rounded-t-lg bg-gray-900 text-white">
        <div class="flex items-center">
          Settings
          <div class="w-8 h-8 ml-2 rounded-full overflow-hidden">
            <img
              :src="`/img/spirit_avatar/${getSpiritAvatar(gameOption.spirits[playerCard.current])}`"
              alt="Spirit avatar"
              class="h-full max-w-max"
            >
          </div>
        </div>
        <icon-x
          class="w-7 h-7"
          style="stroke-width: 1px;"
          @click="$emit('close')"
        />
      </div>
      <div
        id="aspect-setting"
        class="overflow-y-auto flex-1 px-3 py-1"
      >
        <div class="flex space-x-4">
          <div
            class="flex flex-row h-10 w-fit rounded-lg relative bg-orange-700 mt-1 text-white"
          >
            <button
              class="h-full px-2 rounded-l bg-inherit"
              @click="playerCard.reduceEnergy"
            >
              <icon-minus class="w-4 h-4 mx-auto" />
            </button>
            <div class="bg-orange-700 flex items-center justify-center w-10">
              <div class="flex-1 text-right">
                {{ playerCard.energy }}
              </div>
              <icon-bolt class="w-5 h-5 shrink-0" />
            </div>
            <button
              class="bg-inherit h-full px-2 rounded-r"
              @click="playerCard.addEnergy"
            >
              <icon-plus class="w-4 h-4 mx-auto" />
            </button>
          </div>
          <div
            class="flex w-fit h-10 rounded-lg relative bg-gray-800 mt-1 text-white shrink-0"
          >
            <button
              class="h-full px-2 rounded-l bg-inherit"
              @click="fearDeck.decreaseFear"
            >
              <icon-minus class="w-4 h-4 mx-auto" />
            </button>
            <div class="flex items-center justify-center font-semibold text-lg w-full">
              <div>{{ fearDeck.currentFear }}</div>
              <fear-icon class="w-5 h-5 ml-1.5" />
            </div>
            <button
              class="bg-inherit h-full px-2 rounded-r"
              @click="fearDeck.increaseFear"
            >
              <icon-plus class="w-4 h-4 mx-auto" />
            </button>
          </div>
          <div class="flex items-center justify-center">
            <div
              class="rounded-full inline-block h-fit bg-purple-900 text-white p-1"
              @click="fearDeck.unEarn"
            >
              <icon-minus class="w-3 h-3" />
            </div>
            <div class="h-full w-12 relative flex justify-center">
              <img
                src="/img/card-back/fear.webp"
                alt="Fear Back"
                class="absolute h-full"
              >
              <div class="absolute top-1/2 -translate-y-1/2 text-xl pb-1 font-semibold text-white">
                {{ fearDeck.totalEarned }}
              </div>
            </div>
            <div
              class="rounded-full inline-block h-fit bg-purple-900 text-white p-1"
              @click="fearDeck.earn"
            >
              <icon-plus class="w-3 h-3" />
            </div>
          </div>
        </div>
        <div class="flex mt-4">
          <div>
            <div
              :class="modeIncrease ? 'bg-gray-800' : 'bg-red-800'"
              class="w-6 h-6 rounded-full text-white p-1 mb-1 flex items-center"
              @click="modeIncrease = !modeIncrease"
            >
              <icon-plus
                v-if="modeIncrease"
                class="w-full"
              />
              <icon-minus
                v-else
                class="w-full"
              />
            </div>
            <div class="flex select-none w-28 flex-wrap">
              <div
                v-for="element in ['Sun', 'Moon', 'Fire', 'Air', 'Water', 'Earth', 'Plant', 'Animal', 'Any']"
                :key="element"
                class="flex items-center w-1/3 my-1 px-1"
                @click="adjustElement(element)"
              >
                <power-element
                  :element="element"
                />
                <div>
                  {{ playerCard.permanentElements[element] }}
                </div>
              </div>
            </div>
          </div>
          <div
            v-if="isHasAspect"
            class="ml-auto"
          >
            <div class="flex items-center">
              <input
                v-model="showAspect"
                type="checkbox"
                class="accent-orange-700 mt-0.5"
              >
              <div class="ml-1">
                Show Aspect
              </div>
            </div>
            <div class="mt-2">
              <div>Aspect mode</div>
              <div class="flex">
                <div class="flex items-center">
                  <input
                    v-model="aspectMode"
                    type="radio"
                    class="accent-orange-700 mt-0.5"
                    value="1x"
                  >
                  1x
                </div>
                <div class="flex items-center ml-3">
                  <input
                    v-model="aspectMode"
                    type="radio"
                    class="accent-orange-700 mt-0.5"
                    value="2x"
                  >
                  2x
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        class="absolute bottom-2 right-2"
        @click="onClickExitGame"
      >
        Exit Game
      </div>
    </div>
    <Teleport to="#modal">
      <div
        v-if="showConfirmLogMatch"
        class="absolute z-[99999] bg-gray-900/30 top-0 left-0 h-full w-full flex items-center justify-center"
        @click.self="showConfirmLogMatch = false"
      >
        <div class="bg-white rounded-lg w-fit px-3 py-2">
          <div class="mb-4 flex justify-between">
            <div>Log this match?</div>
            <div @click="showConfirmLogMatch = false">
              <icon-x />
            </div>
          </div>
          <div class="flex space-x-2 mt-2">
            <base-button
              button-style="secondary"
              :disabled="isLoading"
              @click="logMatch(true)"
            >
              Win
            </base-button>
            <base-button
              button-style="secondary"
              :disabled="isLoading"
              @click="logMatch(false)"
            >
              Lose
            </base-button>
            <base-button
              button-style="primary"
              @click="router.push({name: 'HomeView'})"
            >
              No Log
            </base-button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>