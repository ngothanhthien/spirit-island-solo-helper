<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import BaseSelect from '@/components/base/BaseSelect.vue'
import BaseCounter from '@/components/base/BaseCounter.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { ADVERSARY, MAP, SPIRIT } from '@/constant'
import { useGameOptionStore } from '@/stores/GameOptionStore'
import router from '@/router'
import { useEventDeckStore } from '@/stores/EventDeckStore'
import { useFearDeckStore } from '@/stores/FearDeckStore'
import { usePlayerCardStore } from '@/stores/PlayerCardStore'
import { usePowerDeckStore } from '@/stores/PowerDeckStore'
import SpiritDropdown from '@/components/SpiritDropdown.vue'
import { getSpiritAvatar } from '@/utils'
import { onClickOutside } from '@vueuse/core'
import { useBlightDeckStore } from '@/stores/BlightDeckStore'
import ModalAspect from '@/components/ModalAspect.vue'
import type { Aspect } from '@/types'
import { useDaysThatNeverWereStore } from '@/stores/DaysThatNeverWhereStore'
import { useGameStateStore } from '@/stores/GameStateStore'
import { useInvaderCardStore } from '@/stores/InvaderCardStore'
import {useImpendingCardStore} from "@/stores/ImpendingCardStore";

interface AspectOption {
  label: string
  value: number
}

const MAX_SPIRIT = 4

const gameOption = useGameOptionStore()
const eventDeck = useEventDeckStore()
const fearDeck = useFearDeckStore()
const playerCard = usePlayerCardStore()
const majorDeck = usePowerDeckStore('major')
const minorDeck = usePowerDeckStore('minor')
const blightDeck = useBlightDeckStore()
const daysThatNeverWereDeck = useDaysThatNeverWereStore()
const gameState = useGameStateStore()
const invaderCard = useInvaderCardStore()
const impendingCardStore = useImpendingCardStore()

const adversary = ref<undefined | number>()
const numberSpirit = ref<undefined | number>()
const aspects = ref<Array<number>>([])
const adversaryLevel = ref<number>(1)
const islands = ref<number[]>([])
const spirits = ref<number[]>([])
const spiritSelect = ref<number | null>(null)
const dropDownEl = ref<HTMLElement | null>(null)
const currentAspectShowing = ref<null | {
  aspect: Aspect[]
  spiritIndex: number
}>(null)

const aspectsOption = computed(() => {
  const options: Array<AspectOption[] | null> = []
  spirits.value.forEach((index) => {
    const spirit = SPIRIT[index]
    if (!spirit.aspects) {
      options.push(null)
      return
    }
    const option = spirit.aspects.map((aspect, i) => {
      return {
        label: aspect.title,
        value: i,
      }
    })
    options.push(option)
  })
  return options
})
const spiritOptions = computed(() => {
  const options = []
  for (let i = 1; i <= MAX_SPIRIT; i++) {
    options.push({
      label: `${i} spirit`,
      value: i,
    })
  }
  return options
})
const adversaryOption = computed(() => {
  const options = []
  for (let i = 0; i < ADVERSARY.length; i++) {
    options.push({
      label: ADVERSARY[i].title,
      value: i,
    })
  }
  return options
})

onClickOutside(dropDownEl, () => {
  spiritSelect.value = null
}, {ignore: [dropDownEl]})

onMounted(() => {
  if (gameOption.numberSpirit) {
    numberSpirit.value = gameOption.numberSpirit
  }
  if (gameOption.adversaryLevel) {
    adversaryLevel.value = gameOption.adversaryLevel
  }
  randomSetup()
})

function showSelectAspect(index: number) {
  const spirit = SPIRIT[spirits.value[index]]
  if (!spirit.aspects) {
    return
  }
  currentAspectShowing.value = {
    aspect: spirit.aspects,
    spiritIndex: index,
  }
} 

function chooseAspect(index: number) {
  if(!currentAspectShowing.value) {
    return
  }
  aspects.value[currentAspectShowing.value.spiritIndex] = index
  currentAspectShowing.value = null
}

function toggleSpiritSelect(value: number) {
  if (spiritSelect.value === value) {
    spiritSelect.value = null
  } else {
    spiritSelect.value = value
  }
}

function randomSetup() {
  if (numberSpirit.value) {
    islands.value = []
    spirits.value = []
    for (let i = 0; i < numberSpirit.value; i++) {
      randomSpiritAndMap()
    }

    aspects.value = []
    for (let i = 0; i < numberSpirit.value; i++) {
      aspects.value.push(-1)
    }

    randomAdversary()
  }
}

function randomAdversary() {
  adversary.value = Math.floor(Math.random() * ADVERSARY.length)
}

function randomSpiritAndMap(index?: number) {
  if (index !== undefined) {
    islands.value[index] = -1
    spirits.value[index] = -1
    aspects.value[index] = -1
  }

  let island = Math.floor(Math.random() * MAP.length)
  let spirit = Math.floor(Math.random() * SPIRIT.length)

  while (
    islands.value.includes(island) ||
    (MAP[island] === 'E' && islands.value.includes(MAP.indexOf('B'))) ||
    (MAP[island] === 'B' && islands.value.includes(MAP.indexOf('E'))) ||
    (MAP[island] === 'F' && islands.value.includes(MAP.indexOf('D'))) ||
    (MAP[island] === 'D' && islands.value.includes(MAP.indexOf('F')))
  ) {
    island = Math.floor(Math.random() * MAP.length)
  }
  while (spirits.value.includes(spirit)) {
    spirit = Math.floor(Math.random() * SPIRIT.length)
  }

  if (index !== undefined) {
    islands.value[index] = island
    spirits.value[index] = spirit
    return
  }
  islands.value.push(island)
  spirits.value.push(spirit)
}

const canStartGame = computed(() => {
  return (
    numberSpirit.value !== undefined &&
    adversary.value !== undefined &&
    islands.value.length > 0 &&
    spirits.value.length > 0
  )
})

function startGame() {
  if (canStartGame.value) {
    gameOption.setSetupState({
      numberSpirit: numberSpirit.value as number,
      adversary: adversary.value as number,
      adversaryLevel: adversaryLevel.value,
      islands: islands.value,
      spirits: spirits.value,
      aspects: aspects.value,
    })
  }

  impendingCardStore.clear()
  blightDeck.newDeck()
  eventDeck.newDeck(gameOption.hasFranceEvent)
  majorDeck.newDeck()
  minorDeck.newDeck()
  const invaderPos =  ADVERSARY[adversary.value as number].invaders?.[adversaryLevel.value as number]
  invaderCard.newDeck(invaderPos && invaderPos !== '' ? invaderPos : undefined)
  if (gameOption.hasEngland3) {
    invaderCard.extraBuild = []
  }
  daysThatNeverWereDeck.reset()
  fearDeck.newDeck(gameOption.fearSetup, numberSpirit.value as number, gameOption.hasEngland6)
  gameState.isNewGame = true
  playerCard.reset()

  spirits.value.forEach((spiritIndex) => {
    const { cards, setup } = SPIRIT[spiritIndex]
    const hand = []
    const playerIndex = playerCard.addPlayer()
    for (let i = 0; i < cards.length; i++) {
      hand.push(`unique${spiritIndex}-${i}`)
    }
    playerCard.changeCurrent(playerIndex)
    playerCard.setHand(hand)

    if (setup) {
      setup(playerIndex)
    }
  })

  playerCard.changeCurrent(0)

  gameOption.aspectsDetail.forEach((aspects, playerIndex) => {
    if (aspects && aspects.setupFunction) {
      aspects.setupFunction(playerIndex)
    }
  })



  router.push({ name: 'GameView' })
}

function selectSpirit(newSpirit: number) {
  //spiritSelect.value as index
  spirits.value[spiritSelect.value as number] = newSpirit
  aspects.value[spiritSelect.value as number] = -1
  spiritSelect.value = null
}

watch(numberSpirit, randomSetup)
</script>
<template>
  <div
    class="bg-gradient-to-r from-orange-400 to-orange-600 pt-2 px-4 h-screen relative overflow-hidden"
  >
    <base-button
      button-style="secondary"
      class="mb-2"
      @click="randomSetup"
    >
      Re-Random
    </base-button>
    <button
      class="mb-2 absolute top-2 right-2"
      @click="router.push({ name: 'HomeView' })"
    >
      Back to Home
    </button>
    <div class="space-x-2 grid grid-cols-12">
      <div class="col-span-3">
        <base-select
          v-model="numberSpirit"
          class="w-full"
          :options="spiritOptions"
          default-label="Number Spirits"
        />
        <div class="flex w-full space-x-2 mt-4">
          <div>
            <base-select
              v-model="adversary"
              class="w-full"
              item-group-class="w-full"
              :options="adversaryOption"
              default-label="Adversary"
            />
            <div
              v-if="adversary || adversary === 0"
              class="mt-2 text-gray-700"
            >
              <div>Adversary level:</div>
              <base-counter
                v-model="adversaryLevel"
                :min="0"
                :max="6"
                class="w-full"
              />
              <div class="mt-0.5 text-right">
                Difficultly: {{ ADVERSARY[adversary]['difficultly'][adversaryLevel] }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="numberSpirit"
        class="col-span-9 flex flex-wrap"
      >
        <div
          v-for="n in numberSpirit"
          :key="`spirit-${n}`"
          class="w-1/2 px-3 mt-3"
        >
          <div class="flex space-x-1 space-y-2 items-center">
            <div
              class="bg-gray-800 hover:bg-gray-800/90 transition rounded-full p-1 text-white mt-3 flex items-center"
            >
              <span
                class="icon-refresh"
                @click="randomSpiritAndMap(n - 1)"
              />
            </div>
            <div class="text-xl">
              {{ MAP[islands[n - 1]] }}:
            </div>
            <div class="relative">
              <div
                class="w-14 h-14 rounded-full bg-white right-2 border-2 overflow-hidden"
                @click="toggleSpiritSelect(n - 1)"
              >
                <img
                  :src="`/img/spirit_avatar/${getSpiritAvatar(spirits[n - 1])}`"
                  alt="Spirit avatar"
                  class="h-full max-w-max"
                >
              </div>
              <spirit-dropdown
                v-if="spiritSelect === n - 1"
                :spirits="spirits"
                class="max-h-40 absolute overflow-y-auto z-10"
                @close.stop="spiritSelect = null"
                @select-spirit="selectSpirit"
              />
            </div>
            <div
              v-if="aspectsOption[n-1]"
              class="mt-1 overflow-hidden"
            >
              <div
                class="flex items-center space-x-1"
                @click="showSelectAspect(n-1)"
              >
                <div>Aspect</div>
                <div> 
                  <span class="icon-pencil" />
                </div>
              </div>
              <div class="text-lg font-semibold">
                <span v-if="aspects[n-1] === -1">
                  None
                </span>
                <div
                  v-else
                  class="flex items-center space-x-1"
                >
                  <div
                    class="text-red-800"
                    @click.stop="aspects[n-1] = -1"
                  >
                    <span class="icon-trash-x" />
                  </div>
                  <div>
                    {{ aspectsOption[n-1]?.[aspects[n-1]].label }}
                  </div> 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center absolute w-full bottom-8">
      <base-button
        :disabled="!canStartGame"
        button-style="primary"
        class="mt-4"
        @click="startGame"
      >
        Start Game
      </base-button>
    </div>
    <modal-aspect
      v-if="currentAspectShowing"
      :aspects="currentAspectShowing.aspect"
      :current="aspects[currentAspectShowing.spiritIndex]"
      @close="currentAspectShowing = null"
      @choose="chooseAspect"
    />
  </div>
</template>
@/stores/PowerDeckStore