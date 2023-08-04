<script setup lang="ts">
import { useInvaderCardStore } from '@/stores/InvaderCardStore'
import {
  IconX,
  IconPlayerTrackPrev,
  IconEyeUp,
  IconReload,
} from '@tabler/icons-vue'
import InvaderBox from '@/components/InvaderBox.vue'
import { useManualRefHistory } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import BaseButton from './base/BaseButton.vue'
import { IconChevronLeft, IconLock, IconLockOff } from '@tabler/icons-vue'
import { type Ref, ref } from 'vue'
import { useGameOptionStore } from '@/stores/GameOptionStore'

defineEmits(['close'])

const invaderCard = useInvaderCardStore()
const gameOption = useGameOptionStore()

const sweden4 = ref<string | null>(null)

const { draw, explore, build, ravage, extraBuild, discard, box } =
  storeToRefs(invaderCard)
const deck = [
  {
    title: 'draw',
    deck: draw,
  },
  {
    title: 'explore',
    deck: explore,
  },
  {
    title: 'build',
    deck: build,
  },
  {
    title: 'ravage',
    deck: ravage,
  },
  {
    title: 'extraBuild',
    deck: extraBuild,
  },
  {
    title: 'discard',
    deck: discard,
  },
  {
    title: 'box',
    deck: box,
  },
]
const lastCommit = ref<string[][]>([])
const history = deck.map((area) => {
  const { undo, commit } = useManualRefHistory(area.deck as Ref<unknown>, {
    capacity: 10,
    clone: true
  })
  return { undo, commit, title: area.title }
})

function doSweden4() {
  sweden4.value = invaderCard.doSweden()
}

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
</script>

<template>
  <div
    class="absolute w-full h-full top-0 left-0 bg-gray-900/30 z-50"
    @click.self="$emit('close')"
  >
    <div
      class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-white rounded-lg flex-col flex"
    >
      <div class="bg-gray-900 text-white py-2 pl-3 rounded-t-lg flex">
        <div>Invader Card</div>
        <div
          class="ml-auto mr-2"
          @click="$emit('close')"
        >
          <icon-x />
        </div>
      </div>
      <div class="flex-1 flex flex-col">
        <base-button
          class="capitalize mt-1 mx-2"
          button-style="secondary"
          :disabled="lastCommit.length === 0"
          @click="undo"
        >
          undo
        </base-button>
        <div class="flex-1 px-4 py-2 flex space-x-2 text-2xl">
          <div class="basis-full flex flex-col">
            <div class="text-base">
              &nbsp;
            </div>
            <div
              class="flex justify-center items-center border-2 border-orange-600 rounded-lg text-orange-600 w-full flex-1"
            >
              <icon-x
                class="w-16 h-16"
                style="stroke-width: 1px"
              />
            </div>
            <div
              class="text-white bg-gray-800 px-4 py-1.5 w-fit mx-auto rounded-lg mt-1 opacity-0"
            >
              <icon-player-track-prev />
            </div>
          </div>
          <div
            v-if="invaderCard.extraBuildView"
            class="flex items-center mb-3"
          >
            <icon-chevron-left class="h-10" />
          </div>
          <div
            v-if="invaderCard.extraBuildView"
            class="basis-full flex-col flex"
          >
            <div class="text-center text-base">
              Extra Build
            </div>
            <invader-box
              :deck="invaderCard.extraBuildView"
              class="flex-1 rounded-lg overflow-hidden"
            />
            <button
              class="text-white bg-gray-800 px-4 py-1.5 w-fit mx-auto rounded-lg mt-1 opacity-0"
              :disabled="invaderCard.extraBuildView.length === 0"
            >
              <icon-player-track-prev />
            </button>
          </div>
          <div class="flex items-center mb-3">
            <icon-chevron-left class="h-10" />
          </div>
          <div class="basis-full flex-col flex">
            <div class="text-center text-base">
              Ravage
            </div>
            <invader-box
              :deck="invaderCard.ravageView"
              class="flex-1 rounded-lg overflow-hidden"
            />
            <button
              class="text-white bg-gray-800 px-4 py-1.5 w-fit mx-auto rounded-lg mt-1 disabled:bg-gray-800/60"
              :disabled="invaderCard.ravage.length === 0"
              @click="invaderCard.lockToggle('ravage')"
            >
              <icon-lock v-if="invaderCard.lock.includes('ravage')" />
              <icon-lock-off v-else />
            </button>
          </div>
          <div class="flex items-center mb-3">
            <icon-chevron-left class="h-10" />
          </div>
          <div class="basis-full flex-col flex">
            <div class="text-center text-base">
              Build
            </div>
            <invader-box
              :deck="invaderCard.buildView"
              :class="{'border-4 border-red-700' :invaderCard.lock.includes('build')}"
              class="flex-1 rounded-lg overflow-hidden"
            />
            <button
              class="text-white bg-gray-800 px-4 py-1.5 w-fit mx-auto rounded-lg mt-1 disabled:bg-gray-800/60"
              :disabled="invaderCard.build.length === 0"
              @click="invaderCard.lockToggle('build')"
            >
              <icon-lock v-if="invaderCard.lock.includes('build')" />
              <icon-lock-off v-else />
            </button>
          </div>
          <div class="flex items-center mb-3">
            <icon-chevron-left class="h-10" />
          </div>
          <div class="basis-full flex-col flex">
            <div class="text-center text-base">
              Explore
            </div>
            <div
              v-if="invaderCard.explore.length === 0"
              class="relative flex-1 text-semibold rounded-lg overflow-hidden font-serif h-full text-white bg-gray-900 flex items-center justify-center"
            >
              {{ invaderCard.getBackCardTop }}
              <div
                class="absolute top-0 right-0 p-2"
                @click="shuffle"
              >
                <icon-reload />
              </div>
            </div>
            <invader-box
              v-else
              :deck="invaderCard.exploreView"
              class="flex-1 rounded-lg overflow-hidden"
            />
            <div class="flex">
              <button
                v-if="gameOption.hasSweden4 && invaderCard.draw.length === invaderCard.pos.length"
                class="text-white bg-gray-800 px-4 py-1.5 w-fit mx-auto rounded-lg mt-1 disabled:bg-gray-800/60 text-sm"
                @click="doSweden4"
              >
                Sweden 4
              </button>
              <template v-else>
                <button
                  class="text-white bg-gray-800 px-4 py-1.5 w-fit mx-auto rounded-lg mt-1 disabled:bg-gray-800/60"
                  :disabled="!invaderCard.canNext"
                  @click="next"
                >
                  <icon-player-track-prev />
                </button>
                <button
                  class="text-white bg-gray-800 px-4 py-1.5 w-fit mx-auto rounded-lg mt-1"
                  @click="doExplore"
                >
                  <icon-eye-up />
                </button>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Teleport to="#modal">
      <div
        v-if="sweden4"
        class="absolute top-0 left-0 w-full h-full bg-gray-900/30 z-[9999]"
        @click.self="sweden4 = null"
      >
        <div class="h-[85%] rounded-lg overflow-hidden absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div class="text-center text-lg font-semibold text-white">
            Royal Backing
          </div>
          <img
            :src="`/img/invader/${sweden4.toLowerCase()}.webp`"
            alt="Invader Card"
            class="h-[90%]"
          >
        </div>
      </div>
    </Teleport>
  </div>
</template>
