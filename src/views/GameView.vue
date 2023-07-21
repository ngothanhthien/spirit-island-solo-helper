<script setup lang="ts">
import { defineAsyncComponent, ref, watch } from 'vue'
import CardGroupView from '@/components/CardGroupView.vue'
import { IconCards, IconAlbum, IconAdjustments, IconX } from '@tabler/icons-vue'
import ElementTrack from '@/components/ElementTrack.vue'
import CardReveal from '@/components/base/CardReveal.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { getSpiritAvatar } from '@/utils'

const PowerDeckComponent = defineAsyncComponent(
  () => import('@/components/PowerDeck.vue'),
)
const ModalDiscardPower = defineAsyncComponent(
  () => import('@/components/ModalDiscardPower.vue'),
)
const CardZoomModal = defineAsyncComponent(
  () => import('@/components/CardZoomModal.vue'),
)
const PowerPick = defineAsyncComponent(
  () => import('@/components/PowerPick.vue'),
)

import { usePlayerCardStore } from '@/stores/PlayerCardStore'
import { useEventDeckStore } from '@/stores/EventDeckStore'
import { useModalDiscardStore } from '@/stores/ModalDiscardStore'
import { useGameStateStore } from '@/stores/GameStateStore'

import { onMounted } from 'vue'
import { useCardZoomStore } from '@/stores/CardZoomStore'
import { useFearDeckStore } from '@/stores/FearDeckStore'
import { usePowerDeckStore } from '@/stores/PowerDeckStore'
import { useGameOptionStore } from '@/stores/GameOptionStore'
import router from '@/router'
import useEvent from '@/composable/useEvent'
import { useElementSize } from '@vueuse/core'

const MENU_1 = {
  PLAY: 0,
  CONTROL: 1,
}
const MENU_2 = {
  HAND: 0,
  SPIRIT: 1,
}

const currentMenu1 = ref(MENU_1.PLAY)
const currentMenu2 = ref(MENU_2.HAND)

const playerCard = usePlayerCardStore()
const eventDeck = useEventDeckStore()
const modalDiscard = useModalDiscardStore()
const cardZoom = useCardZoomStore()
const fearDeck = useFearDeckStore()
const gameState = useGameStateStore()
const minorDeck = usePowerDeckStore('minor')
const majorDeck = usePowerDeckStore('major')
const gameOption = useGameOptionStore()

const { putUnderTwoTopCard, discardEvent, revealEvent, currentEvent } =
  useEvent()
const menuControlEl = ref<HTMLElement | null>(null)
const { width: powerPickSize } = useElementSize(menuControlEl)

if (
  !eventDeck.isAvailable ||
  !minorDeck.isAvailable ||
  !majorDeck.isAvailable ||
  !fearDeck.isAvailable
) {
  router.push({ name: 'HomeView' })
}

onMounted(() => {
  window.addEventListener(
    'touchmove',
    function (event) {
      if (document.body.scrollTop === 0) {
        event.preventDefault()
      }
    },
    { passive: false },
  )
})

function putFromHandToDiscard(cardId: string) {
  playerCard.putCardInDiscard(cardId)
}

function putFromHandToPlay(cardId: string) {
  playerCard.playCard(cardId)
}

function putFromDiscardToHand(cardId: string) {
  playerCard.returnCardFromPlay(cardId)
}

function forgetCard(cardId: string) {
  playerCard.removeCardFromPlay(cardId)
  playerCard.forgetCard(cardId)
}

function switchMenu(menu: number) {
  if (menu === 1) {
    const length = Object.keys(MENU_1).length
    currentMenu1.value = (currentMenu1.value + 1) % length
  } else if (menu === 2) {
    const length = Object.keys(MENU_2).length
    currentMenu2.value = (currentMenu2.value + 1) % length
  }
}

function nextPhase() {
  gameState.nextPhase()
  switch (gameState.currentPhaseName) {
    case 'Event':
      if (gameState.currentRound === 1) {
        eventDeck.popEvent()
        nextPhase()
      } else {
        revealEvent()
      }
      break
    case 'Fear':
      break
    default:
  }
}

function resetPicking() {
  playerCard.picking.forEach((card) => {
    const [type] = card.split('-')
    if (type === 'minor') {
      minorDeck.addToDiscard(card)
    } else if (type === 'major') {
      majorDeck.addToDiscard(card)
    }
  })
  playerCard.resetPicking()
}

function pickCard(cardId: string) {
  playerCard.takeCardFromPicking(cardId)
}

function addPowerToPicking() {
  const type = playerCard.getTypePicking
  const card = usePowerDeckStore(type).reveal()
  playerCard.addToPicking(card)
}
watch(
  () => cardZoom.waiting.card,
  (cardId) => {
    if (cardId) {
      if (cardZoom.waiting.from === 'discard') {
        playerCard.take(cardId)
        const [type] = cardId.split('-')
        usePowerDeckStore(type).removeFromDiscard(cardId)

        modalDiscard.removeFromModal(cardId)
      }

      if (cardZoom.waiting.from === 'hand') {
        playerCard.playCard(cardId)
      }

      if (cardZoom.waiting.from === 'play') {
        playerCard.returnCardFromPlay(cardId)
      }

      cardZoom.reset()
    }
  },
)
</script>

<template>
  <div class="relative h-screen bg-gray-100 flex flex-col overflow-hidden">
    <div class="h-screen flex flex-col">
      <div
        id="game-header"
        class="h-8 bg-orange-800 flex items-center z-40 text-white w-full"
      >
        <button class="bg-orange-900 px-2 py-1" @click="router.push({name: 'HomeView'})">Exit game</button>
        <div class="flex items-center h-full px-3">
          <div>Cost: {{ playerCard.energyCost }}</div>
          <element-track class="ml-3" />
        </div>
        <button class="ml-auto bg-orange-900 px-2 py-1" @click="nextPhase()">
          {{ gameState.currentPhaseName }} phase
        </button>
      </div>
      <div id="game-area" class="flex h-screen">
        <div
          id="game-showing-area"
          class="grid grid-rows-2 grid-cols-1 w-full relative"
        >
          <div id="game-showing-top" class="bg-neutral-100 py-2 flex px-2">
            <card-group-view
              v-if="currentMenu1 === MENU_1.PLAY"
              from="play"
              @swipe-down="putFromDiscardToHand"
              @swipe-up="forgetCard"
              class="w-full"
              :cards="playerCard.play"
            />
            <div
              ref="menuControlEl"
              v-if="currentMenu1 === MENU_1.CONTROL"
              class="flex items-stretch relative w-full"
            >
              <div v-if="!playerCard.isPicking" class="space-x-2">
                <power-deck-component deck="minor" />
                <power-deck-component deck="major" />
              </div>
              <template v-if="playerCard.isPicking">
                <power-pick
                  :picking="playerCard.picking"
                  :container-length="powerPickSize"
                  @swipe-down="pickCard"
                  @add-power="addPowerToPicking"
                />
                <icon-x
                  class="w-7 h-7 absolute -right-2 -top-2 text-blue-900"
                  @click="resetPicking"
                />
              </template>
            </div>
          </div>
          <div
            id="game-showing-bottom"
            class="bg-stone-300 flex pt-2 px-2 row-auto"
          >
            <card-group-view
              from="hand"
              @swipe-down="putFromHandToDiscard"
              @swipe-up="putFromHandToPlay"
              class="w-full"
              :cards="playerCard.hand"
            />
          </div>
          <div
            v-for="(spirit, index) in gameOption.spirits"
            :key="`spirit-${spirit}`"
            :style="`top: ${index * 64 + 4}px;`"
            :class="[playerCard.current === index ? 'border-orange-800' : 'border-gray-800 opacity-60']"
            class="absolute w-14 h-14 rounded-full right-2 border-2 overflow-hidden"
            @click="playerCard.changeCurrent(index)"
          >
            <img
              :src="`/img/spirit_avatar/${getSpiritAvatar(spirit)}`"
              alt="Spirit avatar"
              class="h-full max-w-max"
            />
          </div>
        </div>
        <div
          id="game-control-right-bar"
          class="ml-auto grid grid-rows-2 text-white relative x-40"
        >
          <div class="bg-neutral-700 px-2 flex items-center">
            <transition name="switch" mode="out-in">
              <icon-album
                @click="switchMenu(1)"
                v-if="currentMenu1 === MENU_1.PLAY"
                class="w-8 h-8"
              />
            </transition>
            <transition name="switch" mode="out-in">
              <icon-adjustments
                @click="switchMenu(1)"
                v-if="currentMenu1 === MENU_1.CONTROL"
                class="w-8 h-8"
              />
            </transition>
          </div>
          <div class="flex items-center bg-stone-900 px-2">
            <icon-cards class="w-8 h-8" />
          </div>
        </div>
      </div>
    </div>
    <div id="modal">
      <!-- <modal-discard-common v-if="modalDiscard.type === 'common'" /> -->
      <modal-discard-power v-if="modalDiscard.getType === 'power'" />
      <card-zoom-modal v-if="cardZoom.isShow" />
      <card-reveal v-if="currentEvent" :card="currentEvent">
        <template #button>
          <base-button @click="discardEvent">Discard Event</base-button>
          <base-button button-style="secondary" @click="putUnderTwoTopCard"
            >Put under two card</base-button
          >
        </template>
      </card-reveal>
    </div>
  </div>
</template>
<style>
.switch-leave-active {
  transition: all 0.3s ease;
  position: absolute;
}
.switch-enter-active {
  transition: all 0.3s ease;
}

.switch-enter-from,
.switch-leave-to {
  opacity: 0;
  transform: translateX(-30px);
}
.switch-enter-to,
.switch-leave-from {
  opacity: 1;
  transform: translateX(0px);
}
</style>
