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
import { IconRefresh } from '@tabler/icons-vue'
import { usePowerDeckStore } from '@/stores/PowerDeckStore'

const MAX_SPIRIT = 4

const gameOption = useGameOptionStore()
const eventDeck = useEventDeckStore()
const fearDeck = useFearDeckStore()
const playerCard = usePlayerCardStore()
const majorDeck = usePowerDeckStore('major')
const minorDeck = usePowerDeckStore('minor')

const numberSpirit = ref<undefined | number>()
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

const adversary = ref<undefined | number>()
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
const adversaryLevel = ref<number>(1)
const islands = ref<number[]>([])
const spirits = ref<number[]>([])

onMounted(() => {
  if (gameOption.numberSpirit) {
    numberSpirit.value = gameOption.numberSpirit
  }
  if (gameOption.adversaryLevel) {
    adversaryLevel.value = gameOption.adversaryLevel
  }
  randomSetup()
})

function randomSetup() {
  if (numberSpirit.value) {
    islands.value = []
    spirits.value = []
    for (let i = 0; i < numberSpirit.value; i++) {
      randomSpiritAndMap()
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
    })
  }

  eventDeck.newDeck(gameOption.hasFranceEvent)
  majorDeck.newDeck()
  minorDeck.newDeck()
  fearDeck.newDeck(gameOption.fearSetup, numberSpirit.value as number)
  playerCard.reset()
  spirits.value.forEach((spiritIndex) => {
    const { cards } = SPIRIT[spiritIndex]
    const hand = []
    const playerIndex = playerCard.addPlayer()
    for (let i = 0; i < cards.length; i++) {
      hand.push(`unique${spiritIndex}-${i}`)
    }
    playerCard.changeCurrent(playerIndex)
    playerCard.setHand(hand)
  })

  router.push({ name: 'GameView' })
}

watch(numberSpirit, randomSetup)
</script>
<template>
  <div
    class="bg-gradient-to-r from-orange-400 to-orange-600 pt-2 px-4 h-screen"
  >
    <base-button
      button-style="secondary"
      class="mb-2"
      @click="randomSetup"
    >
      Re-Random
    </base-button>
    <div class="space-x-2 grid grid-cols-12">
      <div class="col-span-8">
        <base-select
          v-model="numberSpirit"
          class="w-40"
          :options="spiritOptions"
          default-label="Number Spirits"
        />
        <div
          v-if="numberSpirit"
          class="mt-4"
        >
          <div
            v-for="n in numberSpirit"
            :key="`spirit-${n}`"
            class="flex space-x-2 space-y-2 items-center"
          >
            <div
              class="bg-gray-800 hover:bg-gray-800/90 transition rounded-full p-1 text-white mt-3"
            >
              <icon-refresh
                class="w-4 h-4"
                @click="randomSpiritAndMap(n - 1)"
              />
            </div>
            <div class="text-xl">
              {{ MAP[islands[n - 1]] }}:
            </div>
            <div>{{ SPIRIT[spirits[n - 1]].name }}</div>
          </div>
        </div>
      </div>
      <div class="col-span-4 flex space-x-2">
        <div
          class="bg-gray-800 hover:bg-gray-800/90 transition rounded-full p-1 text-white self-start mt-3"
        >
          <icon-refresh
            class="w-4 h-4"
            @click="randomAdversary"
          />
        </div>
        <div>
          <base-select
            v-model="adversary"
            class="w-40"
            item-group-class="w-40"
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
              class="w-32"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center mt-4">
      <base-button
        :disabled="!canStartGame"
        button-style="primary"
        class="mt-4"
        @click="startGame"
      >
        Start Game
      </base-button>
    </div>
  </div>
</template>
@/stores/PowerDeckStore