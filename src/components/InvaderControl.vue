<script setup lang="ts">
import { useInvaderCardStore } from '@/stores/InvaderCardStore'
import InvaderBox from '@/components/InvaderBox.vue'
import { useManualRefHistory, watchDebounced } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import BaseButton from './base/BaseButton.vue'
import { type Ref, ref, computed } from 'vue'
import { useGameOptionStore } from '@/stores/GameOptionStore'
import { ADVERSARY } from '@/constant'
import FearCounter from './FearCounter.vue'
import { usePlayerCardStore } from '@/stores/PlayerCardStore'
import { useDaysThatNeverWereStore } from '@/stores/DaysThatNeverWhereStore'
import { useModalStore } from '@/stores/ModalStore'
import { useSweden4 } from '@/composable/useSweden4'

const invaderCard = useInvaderCardStore()
const gameOption = useGameOptionStore()
const playerCard = usePlayerCardStore()
const { doSweden4 } = useSweden4()

const showSaltDeposit = ref(false)
const showingVision = ref(false)
const modal = useModalStore()

const { draw, explore, build, ravage, extraBuild, discard, box } = storeToRefs(invaderCard)
const deck = [
  {
    title: 'draw',
    deck: draw
  },
  {
    title: 'explore',
    deck: explore
  },
  {
    title: 'build',
    deck: build
  },
  {
    title: 'ravage',
    deck: ravage
  },
  {
    title: 'extraBuild',
    deck: extraBuild
  },
  {
    title: 'discard',
    deck: discard
  },
  {
    title: 'box',
    deck: box
  }
]

const adversaryImage = computed(() => {
  if (gameOption.adversary !== undefined) {
    return '/img/adversary/' + ADVERSARY[gameOption.adversary].id + '-flag.webp'
  }
  return null
})

const lastCommit = ref<string[][]>([])
const history = deck.map((area) => {
  const { undo, commit } = useManualRefHistory(area.deck as Ref<unknown>, {
    capacity: 10,
    clone: true
  })
  return { undo, commit, title: area.title }
})

function undo() {
  if (lastCommit.value.length === 0) return
  const commit = lastCommit.value.pop() as string[]
  history.forEach((area) => {
    if (lastCommit.value && !commit.includes(area.title)) return
    area.undo()
  })
}
function commit(title: string[]) {
  history.forEach((area) => {
    if (title && !title.includes(area.title)) return
    area.commit()
  })
  lastCommit.value.push(title)
}
function shuffle() {
  invaderCard.reShuffle()
  commit(['draw', 'box'])
}
function doExplore() {
  invaderCard.doExplore()
  commit(['explore', 'draw'])
}
function next() {
  invaderCard.next()
  commit(['explore', 'discard', 'ravage', 'build', 'extraBuild'])
}
function close() {
  useModalStore().invaderControl = false
}

if (gameOption.isEngland3 && invaderCard.extraBuild !== null) {
  watchDebounced(
    () => invaderCard.extraBuild as string[],
    (newList) => {
      if (!newList || newList.length === 0) return
      for (let i = 0; i < newList.length; i++) {
        if (newList[i].includes('2')) {
          invaderCard.extraBuild = null
          invaderCard.discard = [...invaderCard.discard, ...newList]
          break
        }
      }
    },
    { debounce: 300 }
  )
}
</script>

<template>
  <div class="absolute w-full h-full top-0 left-0 bg-gray-900/30 z-50" @click.self="close()">
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[90%] bg-white rounded-lg flex-col flex">
      <div class="bg-gray-900 text-white py-2 pl-3 rounded-t-lg flex">
        <div>Invader Card</div>
        <div class="ml-auto mr-2" @click="close()">
          <span class="icon-x text-2xl" />
        </div>
      </div>
      <div class="flex-1 flex flex-col">
        <div class="flex">
          <base-button class="capitalize mt-1 mx-2" button-style="secondary" :disabled="lastCommit.length === 0" @click="undo"> undo </base-button>
          <div class="ml-auto flex space-x-2">
            <base-button v-if="useDaysThatNeverWereStore().current === playerCard.current" :button-style="'daysThatNeverWere'" @click="showingVision = true">
              Visions of a shifting future
            </base-button>
            <fear-counter />
            <div v-if="gameOption.hasMining4" class="relative h-10" @click="showSaltDeposit = true">
              <img src="/img/invader/d-2.webp" alt="Salt Deposit" class="h-full w-8" />
            </div>
            <div v-if="adversaryImage" class="w-fit h-10 bottom-2 border-t border-b border-orange-700" @click="modal.adversary = true">
              <img :src="adversaryImage" alt="Adversary Flag" class="h-full" />
            </div>
          </div>
        </div>
        <div class="flex-1 px-4 py-2 flex space-x-2 text-2xl">
          <div class="basis-full flex flex-col">
            <div class="text-base">&nbsp;</div>
            <button class="flex justify-center items-center text-orange-600 w-full flex-1" :disabled="invaderCard.discard.length === 0" @click="modal.invaderDiscard = true">
              <span class="text-4xl">{{ invaderCard.discard.length }}</span>
              <span class="icon-trash text-4xl" />
            </button>
            <div class="text-white bg-gray-800 px-4 py-1.5 w-fit mx-auto rounded-lg mt-1 opacity-0">
              <span class="icon-player-track-prev" />
            </div>
          </div>
          <div v-if="invaderCard.extraBuildView" class="flex items-center mb-3">
            <span class="icon-chevron-left text-3xl" />
          </div>
          <div v-if="invaderCard.extraBuildView" class="basis-full flex-col flex">
            <div class="text-center text-base">Extra Build</div>
            <div v-if="gameOption.hasEngland1" class="text-center text-xs bg-red-200 rounded">England 1</div>
            <invader-box v-if="invaderCard.extraBuild?.length !== 1" :deck="invaderCard.extraBuildView" class="flex-1 rounded-lg overflow-hidden" />
            <div v-else class="flex-1 overflow-hidden relative flex items-center">
              <img :src="`/img/invader/${invaderCard.extraBuild[0].toLowerCase()}.webp`" alt="Invader Card" class="absolute w-full max-h-full rounded-lg" />
            </div>
            <button class="text-white bg-gray-800 px-4 py-1.5 w-fit mx-auto rounded-lg mt-1 opacity-0" :disabled="invaderCard.extraBuildView.length === 0">
              <span class="icon-player-track-prev text-3xl" />
            </button>
          </div>
          <div class="flex items-center mb-3">
            <span class="text-3xl icon-chevron-left" />
          </div>
          <div class="basis-full flex-col flex">
            <div class="h-10">
              <div class="text-center text-base">Ravage</div>
              <div v-if="gameOption.hasRussia1" class="text-center text-xs bg-red-200 rounded">
                Russia 1<span v-if="gameOption.hasRussia3">,&nbsp;3</span><span v-if="gameOption.hasRussia6">,&nbsp;6</span>
              </div>
              <div v-if="gameOption.hasSweden1" class="text-center text-xs bg-red-200 rounded">Sweden 1<span v-if="gameOption.hasSweden5">,&nbsp;5</span></div>
              <div v-if="gameOption.hasMining1" class="text-center text-xs bg-red-200 rounded">Mining 1</div>
              <div v-if="gameOption.hasScotLand5" class="text-center text-xs bg-red-200 rounded">Scotland 5<span v-if="gameOption.hasScotLand6">,&nbsp;6</span></div>
              <div v-if="gameOption.hasHabsburg" class="text-center text-xs bg-red-200 rounded">Habsburg loss<span v-if="gameOption.hasHabsburg6">, 6</span></div>
            </div>
            <invader-box
              v-if="invaderCard.ravage.length !== 1"
              :deck="invaderCard.ravageView"
              :class="{
                'border-4 border-red-700': invaderCard.lock.includes('ravage')
              }"
              class="flex-1 rounded-lg overflow-hidden"
            />
            <div v-else class="flex-1 overflow-hidden relative flex items-center">
              <img
                :src="`/img/invader/${invaderCard.ravage[0].toLowerCase()}.webp`"
                alt="Invader Card"
                :class="{
                  'border-4 border-red-700': invaderCard.lock.includes('ravage')
                }"
                class="absolute w-full max-h-full rounded-lg"
              />
            </div>
            <button
              class="text-white bg-gray-800 px-4 py-1.5 w-fit mx-auto rounded-lg mt-1 disabled:bg-gray-800/60"
              :disabled="invaderCard.ravage.length === 0"
              @click="invaderCard.lockToggle('ravage')"
            >
              <span v-if="invaderCard.lock.includes('ravage')" class="icon-lock" />
              <span v-else class="icon-lock-off" />
            </button>
          </div>
          <div class="flex items-center mb-3">
            <span class="icon-chevron-left text-3xl" />
          </div>
          <div class="basis-full flex-col flex">
            <div class="h-10">
              <div class="text-center text-base">Build</div>
              <div v-if="gameOption.hasEngland1" class="text-center text-xs bg-red-200 rounded">England 1</div>
              <div v-if="gameOption.hasScotland3" class="text-center text-xs bg-red-200 rounded">Scotland 3</div>
              <div v-if="gameOption.hasMining1" class="text-center text-xs bg-red-200 rounded">
                Mining 1<span v-if="gameOption.hasMining5">, 5</span><span v-else-if="gameOption.hasMining3">, 3</span>
              </div>
              <div v-if="gameOption.hasHabsburg1" class="text-center text-xs bg-red-200 rounded">Habsburg 1<span v-if="gameOption.hasHabsburg2">, 2</span></div>
              <div v-if="gameOption.hasFrance" class="text-center text-xs bg-red-200 rounded">
                France loss<span v-if="gameOption.hasFranceEvent">, 2</span><span v-if="gameOption.hasFrance4">, 4</span>
              </div>
            </div>
            <invader-box
              v-if="invaderCard.build.length !== 1"
              :deck="invaderCard.buildView"
              :class="{
                'border-4 border-red-700': invaderCard.lock.includes('build')
              }"
              class="flex-1 rounded-lg overflow-hidden"
            />
            <div v-else class="flex-1 overflow-hidden relative flex items-center">
              <img
                :src="`/img/invader/${invaderCard.build[0].toLowerCase()}.webp`"
                alt="Invader Card"
                :class="{
                  'border-4 border-red-700': invaderCard.lock.includes('build')
                }"
                class="absolute w-full max-h-full rounded-lg"
              />
            </div>
            <button
              class="text-white bg-gray-800 px-4 py-1.5 w-fit mx-auto rounded-lg mt-1 disabled:bg-gray-800/60"
              :disabled="invaderCard.build.length === 0"
              @click="invaderCard.lockToggle('build')"
            >
              <span v-if="invaderCard.lock.includes('build')" class="icon-lock" />
              <span v-else class="icon-lock-off" />
            </button>
          </div>
          <div class="flex items-center mb-3">
            <span class="icon-chevron-left text-3xl" />
          </div>
          <div class="basis-full flex-col flex">
            <div class="text-center text-base">Explore</div>
            <div v-if="gameOption.hasFrance1" class="text-center text-xs bg-red-200 rounded">France 1<span v-if="gameOption.hasFrance6">, 6</span></div>
            <div v-if="gameOption.hasScotland1" class="text-center text-xs bg-red-200 rounded">Scotland 1</div>
            <div v-if="gameOption.hasMining6" class="text-center text-xs bg-red-200 rounded">Mining 6</div>
            <div
              v-if="invaderCard.explore.length === 0 && invaderCard.draw.length > 0"
              class="relative flex-1 text-semibold rounded-lg overflow-hidden font-serif h-full text-white bg-gray-900 flex items-center justify-center"
              @click="modal.invaderDraw = true"
            >
              {{ invaderCard.getBackCardTop }}
              <div class="absolute top-0 right-0 p-2" @click.stop="shuffle">
                <span class="icon-reload" />
              </div>
            </div>
            <div v-else-if="invaderCard.explore.length === 0 && invaderCard.draw.length === 0" class="flex-1 flex items-center justify-center text-red-700 font-bold">Empty</div>
            <template v-else>
              <invader-box v-if="invaderCard.explore.length !== 1" :deck="invaderCard.exploreView" class="flex-1 rounded-lg overflow-hidden" />
              <div v-else class="flex-1 overflow-hidden relative flex items-center">
                <img :src="`/img/invader/${invaderCard.explore[0].toLowerCase()}.webp`" alt="Invader Card" class="absolute w-full max-h-full rounded-lg" />
              </div>
            </template>
            <div class="flex">
              <button
                v-if="gameOption.hasSweden4 && invaderCard.draw.length === invaderCard.pos.length"
                class="text-white bg-gray-800 px-4 py-1.5 w-fit mx-auto rounded-lg mt-1 disabled:bg-gray-800/60 text-sm"
                @click="doSweden4"
              >
                Sweden 4
              </button>
              <template v-else>
                <button class="text-white bg-gray-800 px-4 py-1.5 w-fit mx-auto rounded-lg mt-1 disabled:opacity-0" :disabled="!invaderCard.canNext" @click="next">
                  <span class="icon-player-track-prev" />
                </button>
                <button class="text-white bg-gray-800 px-4 py-1.5 w-fit mx-auto rounded-lg mt-1 disabled:opacity-0" :disabled="invaderCard.draw.length === 0" @click="doExplore">
                  <span class="icon-eye" />
                </button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
