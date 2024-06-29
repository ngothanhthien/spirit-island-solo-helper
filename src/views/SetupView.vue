<script setup lang="ts">
import { computed, onMounted, ref, unref, watch } from 'vue'
import BaseSelect from '@/components/base/BaseSelect.vue'
import BaseCounter from '@/components/base/BaseCounter.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { ADVERSARY, MAP } from '@/constant'
import { useGameOptionStore } from '@/stores/GameOptionStore'
import router from '@/router'
import { useFearDeckStore } from '@/stores/FearDeckStore'
import { usePlayerCardStore } from '@/stores/PlayerCardStore'
import SpiritDropdown from '@/components/SpiritDropdown.vue'
import { getSpiritAvatar } from '@/utils'
import ModalAspect from '@/components/ModalAspect.vue'
import { useAspectSelect } from '@/composable/useAspectSelect'
import { useSpiritSelect } from '@/composable/useSpiritSelect'
import { useSetupGame } from '@/composable/useSetupGame'

const MAX_SPIRIT = 4

const gameOption = useGameOptionStore()
const fearDeck = useFearDeckStore()
const playerCard = usePlayerCardStore()

const adversary = ref<undefined | number>()
const adversaryLevel = ref<number>(1)
const numberSpirit = ref<undefined | number>()
const islands = ref<number[]>([])
const spirits = ref<number[]>([]) // Manage selected spirits
const aspects = ref<Array<number>>([]) // Manage selected aspects of spirits

const spiritOptions = computed(() => {
  const options = []
  for (let i = 1; i <= MAX_SPIRIT; i++) {
    options.push({
      label: `${i} spirit`,
      value: i
    })
  }
  return options
})
const adversaryOption = computed(() => {
  const options = []
  for (let i = 0; i < ADVERSARY.length; i++) {
    options.push({
      label: ADVERSARY[i].title,
      value: i
    })
  }
  return options
})
const { showSelectAspect, chooseAspect, closeAspect, currentAspect, currentAspectList, aspectsOption } = useAspectSelect(spirits, aspects)
const { spiritSelect, closeSpiritSelect, selectSpirit, toggleSpiritSelect } = useSpiritSelect(spirits, aspects)
const { randomSetup, startGame, randomSpiritAndMap, canStartGame } = useSetupGame(spirits, islands, aspects, numberSpirit, adversary, adversaryLevel)

onMounted(() => {
  if (gameOption.numberSpirit) {
    numberSpirit.value = gameOption.numberSpirit
  }
  if (gameOption.adversaryLevel) {
    adversaryLevel.value = gameOption.adversaryLevel
  }

  randomSetup()
})

watch(numberSpirit, randomSetup)
</script>
<template>
  <div class="bg-gradient-to-r from-orange-400 to-orange-600 pt-2 px-4 h-screen relative overflow-hidden">
    <base-button button-style="secondary" class="mb-2" @click="randomSetup"> Re-Random </base-button>
    <button class="mb-2 absolute top-2 right-2" @click="router.push({ name: 'HomeView' })">Back to Home</button>
    <div class="space-x-2 grid grid-cols-12">
      <div class="col-span-3">
        <base-select v-model="numberSpirit" class="w-full" :options="spiritOptions" default-label="Number Spirits" />
        <div class="flex w-full space-x-2 mt-4">
          <div>
            <base-select v-model="adversary" class="w-full" item-group-class="w-full" :options="adversaryOption" default-label="Adversary" />
            <div v-if="adversary || adversary === 0" class="mt-2 text-gray-700">
              <div>Adversary level:</div>
              <base-counter v-model="adversaryLevel" :min="0" :max="6" class="w-full" />
              <div class="mt-0.5 text-right">
                Difficultly:
                {{ ADVERSARY[adversary]['difficultly'][adversaryLevel] }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="numberSpirit" class="col-span-9 flex flex-wrap">
        <div v-for="n in numberSpirit" :key="`spirit-${n}`" class="w-1/2 px-3 mt-3">
          <div class="flex space-x-1 space-y-2 items-center">
            <div class="bg-gray-800 hover:bg-gray-800/90 transition rounded-full p-1 text-white mt-3 flex items-center">
              <span class="icon-refresh" @click="randomSpiritAndMap(n - 1)" />
            </div>
            <div class="text-xl">{{ MAP[islands[n - 1]] }}:</div>
            <div class="relative">
              <div class="w-14 h-14 rounded-full bg-white right-2 border-2 overflow-hidden" @click="toggleSpiritSelect(n - 1)">
                <img :src="`/img/spirit_avatar/${getSpiritAvatar(spirits[n - 1])}`" alt="Spirit avatar" class="h-full max-w-max" />
              </div>
              <spirit-dropdown v-if="spiritSelect === n - 1" :spirits="spirits" class="max-h-40 absolute overflow-y-auto z-10" @close.stop="closeSpiritSelect" @select-spirit="selectSpirit" />
            </div>
            <div v-if="aspectsOption[n - 1]" class="mt-1 overflow-hidden">
              <div class="flex items-center space-x-1" @click="showSelectAspect(n - 1)">
                <div>Aspect</div>
                <div>
                  <span class="icon-pencil" />
                </div>
              </div>
              <div class="text-lg font-semibold">
                <span v-if="aspects[n - 1] === -1"> None </span>
                <div v-else class="flex items-center space-x-1">
                  <div class="text-red-800" @click.stop="aspects[n - 1] = -1">
                    <span class="icon-trash-x" />
                  </div>
                  <div>
                    {{ aspectsOption[n - 1]?.[aspects[n - 1]].label }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-center absolute w-full bottom-8">
      <base-button :disabled="!canStartGame" button-style="primary" class="mt-4" @click="startGame"> Start Game </base-button>
    </div>
    <modal-aspect v-if="currentAspectList && currentAspectList.length" :aspects="currentAspectList" :current="currentAspect" @close="closeAspect" @choose="chooseAspect" />
  </div>
</template>
@/stores/PowerDeckStore
