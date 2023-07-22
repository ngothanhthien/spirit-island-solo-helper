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
const PowerDiscard = defineAsyncComponent(
  () => import('@/components/PowerDiscard.vue'),
)
const ModalForgetPower = defineAsyncComponent(
  () => import('@/components/ModalForgetPower.vue'),
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
  CONTROL: 1,
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

const isShowDiscard = ref(false)
const isShowModalForgetPower = ref(false)

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

function toggleDiscard() {
  isShowDiscard.value = !isShowDiscard.value
  currentMenu1.value = MENU_1.PLAY
}

function putFromHandToDiscard(cardId: string) {
  playerCard.putCardInDiscard(cardId)
}

function putFromHandToPlay(cardId: string) {
  playerCard.playCard(cardId)
}

function putFromPlayToHand(cardId: string) {
  playerCard.returnCardFromPlay(cardId)
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

function timePassed() {
  playerCard.cleanUp()
  currentMenu2.value = MENU_2.HAND
}

function reclaimAll() {
  playerCard.reclaim()
  currentMenu2.value = MENU_2.HAND
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

function reclaimOneCard(card: string) {
  playerCard.reclaimOneCard(card)
  isShowDiscard.value = false
  currentMenu2.value = MENU_2.HAND
}

function returnCardFromForget(card: string) {
  playerCard.returnCardFromForget(card)
  isShowModalForgetPower.value = false
  currentMenu2.value = MENU_2.HAND
}

watch(
  () => cardZoom.waiting.card,
  (cardId) => {
    if (cardId) {
      switch (cardZoom.waiting.from) {
        case 'discard': {
          playerCard.take(cardId)
          const [type] = cardId.split('-')
          usePowerDeckStore(type).removeFromDiscard(cardId)
          modalDiscard.removeFromModal(cardId)
          break
        }

        case 'player-discard': {
          playerCard.reclaimOneCard(cardId)
          isShowDiscard.value = false
          currentMenu2.value = MENU_2.HAND
          break
        }

        case 'player-discard-forget': {
          playerCard.forgetCardFromDiscard(cardId)
          break
        }

        case 'hand': {
          playerCard.playCard(cardId)
          break
        }

        case 'forget': {
          returnCardFromForget(cardId)
          break
        }

        case 'pick': {
          playerCard.takeCardFromPicking(cardId)
          break
        }

        case 'play': {
          playerCard.returnCardFromPlay(cardId)
          break
        }

        default:
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
        class="h-10 bg-orange-800 flex items-center z-40 text-white w-full"
      >
        <button
          class="bg-orange-900 px-2 h-full"
          @click="router.push({ name: 'HomeView' })"
        >
          Exit game
        </button>
        <div class="flex items-center h-full px-3">
          <div>Cost: {{ playerCard.energyCost }}</div>
          <element-track class="ml-3" />
        </div>
        <button
          class="ml-auto bg-orange-900 px-2 h-full"
          @click="nextPhase()"
        >
          {{ gameState.currentPhaseName }} phase
        </button>
      </div>
      <div
        id="game-area"
        class="flex h-screen"
      >
        <div
          id="game-showing-area"
          class="grid grid-rows-2 grid-cols-1 w-full relative"
        >
          <div
            id="game-showing-top"
            ref="menuControlEl"
            class="bg-neutral-100 my-2 flex px-2 relative"
          >
            <template v-if="currentMenu1 === MENU_1.PLAY">
              <div
                class="absolute text-6xl top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 whitespace-nowrap font-bold text-gray-300 z-0"
              >
                <span v-if="isShowDiscard">Player Discard</span>
                <span v-else>Player Play</span>
              </div>
              <power-discard
                v-if="isShowDiscard"
                :discard="playerCard.discard"
                :container-length="powerPickSize"
                @swipe-down="reclaimOneCard"
                @swipe-up="playerCard.forgetCardFromDiscard"
              />
              <card-group-view
                v-else
                from="play"
                :cards="playerCard.play"
                @swipe-down="putFromPlayToHand"
                @swipe-up="playerCard.putFromPlayToDiscard"
              />
            </template>
            <div
              v-if="currentMenu1 === MENU_1.CONTROL"
              class="flex items-stretch relative w-full"
            >
              <div
                v-if="!playerCard.isPicking"
                class="space-x-2 absolute h-full"
              >
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
                  class="w-7 h-7 absolute -right-2 -top-2 text-blue-900 z-50"
                  style="stroke-width: 3px"
                  @click="resetPicking"
                />
              </template>
            </div>
          </div>

          <div
            id="game-showing-bottom"
            class="bg-stone-300 flex px-2 row-auto relative"
          >
            <card-group-view
              v-if="currentMenu2 === MENU_2.HAND"
              from="hand"
              :cards="playerCard.hand"
              class="pt-2"
              @swipe-down="putFromHandToDiscard"
              @swipe-up="putFromHandToPlay"
            />
            <div
              v-if="currentMenu2 === MENU_2.CONTROL"
              class="w-full flex items-center justify-end space-x-4"
            >
              <div class="flex flex-col relative w-32 space-y-2 mt-2">
                <base-button
                  class="h-fit w-full"
                  button-style="secondary"
                  :disabled="playerCard.forget.length === 0"
                  @click="isShowModalForgetPower = true"
                >
                  {{ 'Show Forget' }}
                </base-button>
              </div>
              <div class="flex flex-col relative w-32 space-y-2 mt-2">
                <base-button
                  class="h-fit w-full"
                  button-style="secondary"
                  @click="timePassed"
                >
                  Time Passed
                </base-button>
                <base-button
                  class="h-fit w-full"
                  button-style="secondary"
                  @click="reclaimAll"
                >
                  Reclaim All
                </base-button>
                <base-button
                  class="h-fit w-full"
                  button-style="secondary"
                  @click="toggleDiscard"
                >
                  {{
                    isShowDiscard ? 'Show Play' : 'Show Discard'
                  }}
                </base-button>
              </div>
            </div>
          </div>

          <div
            v-for="(spirit, index) in gameOption.spirits"
            :key="`spirit-${spirit}`"
            :style="`top: ${index * 64 + 4}px;`"
            :class="[
              playerCard.current === index
                ? 'border-orange-800'
                : 'border-gray-800 opacity-60',
            ]"
            class="absolute w-14 h-14 rounded-full right-2 border-2 overflow-hidden"
            @click="playerCard.changeCurrent(index)"
          >
            <img
              :src="`/img/spirit_avatar/${getSpiritAvatar(spirit)}`"
              alt="Spirit avatar"
              class="h-full max-w-max"
            >
          </div>
        </div>

        <div
          id="game-control-right-bar"
          class="ml-auto grid grid-rows-2 text-white relative x-40"
        >
          <div class="bg-neutral-700 px-2 flex items-center">
            <transition
              name="switch"
              mode="out-in"
            >
              <icon-album
                v-if="currentMenu1 === MENU_1.PLAY"
                class="w-8 h-8"
                @click="switchMenu(1)"
              />
            </transition>
            <transition
              name="switch"
              mode="out-in"
            >
              <icon-adjustments
                v-if="currentMenu1 === MENU_1.CONTROL"
                class="w-8 h-8"
                @click="switchMenu(1)"
              />
            </transition>
          </div>
          <div class="flex items-center bg-stone-900 px-2">
            <transition
              name="switch"
              mode="out-in"
            >
              <icon-cards
                v-if="currentMenu2 === MENU_2.HAND"
                class="w-8 h-8"
                @click="switchMenu(2)"
              />
            </transition>
            <transition
              name="switch"
              mode="out-in"
            >
              <icon-adjustments
                v-if="currentMenu2 === MENU_2.CONTROL"
                class="w-8 h-8"
                @click="switchMenu(2)"
              />
            </transition>
          </div>
        </div>
      </div>
    </div>
    <div id="modal">
      <modal-discard-power v-if="modalDiscard.getType === 'power'" />
      <modal-forget-power
        v-if="isShowModalForgetPower"
        @close="isShowModalForgetPower = false"
        @take-back="returnCardFromForget"
      />
      <card-zoom-modal v-if="cardZoom.isShow" />
      <card-reveal
        v-if="currentEvent"
        :card="currentEvent"
      >
        <template #button>
          <base-button @click="discardEvent">
            Discard Event
          </base-button>
          <base-button
            button-style="secondary"
            @click="putUnderTwoTopCard"
          >
            Put under two card
          </base-button>
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
