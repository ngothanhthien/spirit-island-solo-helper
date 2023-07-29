<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import type { Element } from '@/types'
import CardGroupView from '@/components/CardGroupView.vue'
import {
  IconCards,
  IconAlbum,
  IconAdjustments,
  IconX,
  IconPlus,
  IconMinus,
  IconBolt,
  IconLayersOff,
} from '@tabler/icons-vue'
import ElementTrack from '@/components/ElementTrack.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { getSpiritAvatar } from '@/utils'
import AdversaryModal from '@/components/AdversaryModal.vue'
import FearDeckComponent from '@/components/FearDeck.vue'
import EventZoomModal from '@/components/EventZoomModal.vue'
import ModalDiscardCommon from '@/components/ModalDiscardCommon.vue'
import FearIcon from '@/components/icons/FearIcon.vue'
import ModalEarnedFear from '@/components/ModalEarnedFear.vue'
import ModalFearReveal from '@/components/ModalFearReveal.vue'
import ModalFearDeck from '@/components/ModalFearDeck.vue'
import AspectPower from '@/components/AspectPower.vue'
import AspectDetail from '@/components/AspectDetail.vue'
import { OnClickOutside } from '@vueuse/components'

import ModalDiscardPower from '@/components/ModalDiscardPower.vue'
import CardZoomModal from '@/components/CardZoomModal.vue'
import PowerPick from '@/components/PowerPick.vue'
import PowerDiscard from '@/components/PowerDiscard.vue'
import ModalForgetPower from '@/components/ModalForgetPower.vue'
import ModalZoomBlightCard from '@/components/ModalZoomBlightCard.vue'
import GameCard from '@/components/base/GameCard.vue'

import { usePlayerCardStore } from '@/stores/PlayerCardStore'
import { useEventDeckStore } from '@/stores/EventDeckStore'
import { useModalDiscardStore } from '@/stores/ModalDiscardStore'
// import { useGameStateStore } from '@/stores/GameStateStore'

import { useCardZoomStore } from '@/stores/CardZoomStore'
import { useFearDeckStore } from '@/stores/FearDeckStore'
import { usePowerDeckStore } from '@/stores/PowerDeckStore'
import { useGameOptionStore } from '@/stores/GameOptionStore'
import { useBlightDeckStore } from '@/stores/BlightDeckStore'
import { useDiscardPowerStore } from '@/stores/PowerDeckStore'
import router from '@/router'
import { useScroll, watchDebounced } from '@vueuse/core'

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
// const gameState = useGameStateStore()
const minorDeck = usePowerDeckStore('minor')
const majorDeck = usePowerDeckStore('major')
const powerDiscardDeck = useDiscardPowerStore()
const gameOption = useGameOptionStore()
const blightDeck = useBlightDeckStore()


const menuControlEl = ref<HTMLElement | null>(null)

const isShowDiscard = ref(false)
const isShowModalForgetPower = ref(false)
const isShowAdversary = ref(false)
const isShowEarnedFear = ref(false)
const isShowFearDeck = ref(false)
const isShowAspectDetail = ref(false)
const showQuickPower = ref(false)
const isZoomBlightCard = ref(false)
const isPingEvent = ref(false)
const isShowModalDiscardPower = ref(false)
const modeIncrease = ref(true)

const aspectEl = ref<HTMLElement | null>(null)
const { y: aspectPos } = useScroll(aspectEl, {
  behavior: 'instant'
})

if (
  !eventDeck.isAvailable ||
  !minorDeck.isAvailable ||
  !majorDeck.isAvailable ||
  !fearDeck.isAvailable
) {
  router.push({ name: 'HomeView' })
}

const isHasAspect = computed(() => Boolean(gameOption.aspectsDetail[playerCard.current]))
function adjustElement(element: Element) {
  if (modeIncrease.value) {
    playerCard.increaseElement(element)
  } else {
    playerCard.decreaseElement(element)
  }
}

function showPowerDiscard() {
  isShowModalDiscardPower.value = true
}

function buttonQuickBlightClick() {
  isZoomBlightCard.value = true
  if (blightDeck.current) {
    return
  }
  blightDeck.turnUp()
}

function quickShowEarnedFear() {
  if (fearDeck.earned.length === 0) {
    return
  }
  isShowEarnedFear.value = true
}

function quickTake(type: 'minor' | 'major') {
  currentMenu1.value = MENU_1.CONTROL
  showQuickPower.value = false
  if (playerCard.isPicking) {
    return
  }
  const card = usePowerDeckStore(type).reveal()
  playerCard.addToPicking(card)
}

function toggleDiscard() {
  isShowDiscard.value = !isShowDiscard.value
  currentMenu1.value = MENU_1.PLAY
}

function handSwipeUp(cardId: string) {
  if (playerCard.isPicking && currentMenu1.value === MENU_1.CONTROL) {
    playerCard.putCardToPicking(cardId)
  } else {
    playerCard.playCard(cardId)
  }
}

function onCloseModalAdversary() {
  isShowAdversary.value = false
  currentMenu2.value = MENU_2.HAND
}

function powerPickSwipeUp(cardId: string) {
  const type = cardId.split('-')[0]
  if (type === 'minor' || type === 'major') {
    usePowerDeckStore(type).addToDraw(cardId)
  } else {
    playerCard.putCardToPicking(cardId)
  }
  playerCard.removeCardFromPicking(cardId)
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

function resetPicking() {
  playerCard.picking.forEach((card) => {
    const [type] = card.split('-')
    if (type === 'minor') {
      minorDeck.addToDiscard(card)
    } else if (type === 'major') {
      majorDeck.addToDiscard(card)
    }
  })
  currentMenu1.value = MENU_1.PLAY
  playerCard.resetPicking()
}
function manageAspectButtonClick() {
  playerCard.toggleShowAspect()
  currentMenu2.value = MENU_2.HAND
  restoreAspectPos()
}
function pickCard(cardId: string) {
  playerCard.takeCardFromPicking(cardId)
  if (playerCard.picking.length === 0) {
    currentMenu1.value = MENU_1.PLAY
  }
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

onMounted(() => {
  restoreAspectPos()
})

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
watch(() => fearDeck.earned.length, (newValue) => {
  if (newValue === 0) {
    isShowEarnedFear.value = false
  }
})

watchDebounced(
  aspectPos,
  (pos) => { 
    playerCard.setAspectPos(pos)
   },
  { debounce: 300 },
)

const aspectLoading = ref(false)
function restoreAspectPos() {
  aspectLoading.value = true
  setTimeout(() => {
    aspectPos.value = playerCard.aspectPos
    aspectLoading.value = false
  }, 100)
}
watch(() => playerCard.current, restoreAspectPos)
watch(() => eventDeck.discard.length, function () {
  setTimeout(() => {
    isPingEvent.value = false
  }, 200);
})
watch(() => eventDeck.reveal, function (newValue) {
  if (!newValue) {
    isPingEvent.value = true
  }
})
</script>

<template>
  <div class="relative h-screen bg-gray-100 flex flex-col overflow-hidden">
    <div class="h-screen flex flex-col">
      <div
        id="game-header"
        class="h-12 bg-orange-800 flex items-center z-40 text-white w-full"
      >
        <button
          class="bg-orange-900 px-2 h-full"
          @click="router.push({ name: 'HomeView' })"
        >
          Exit game
        </button>
        <div class="flex items-center h-full pr-3">
          <button
            class="h-full px-2 flex items-center bg-orange-600"
            @click="playerCard.addEnergy"
          >
            <icon-bolt /> {{ playerCard.energy }}
            <span
              class="text-xs ml-1 -translate-y-1.5"
            >+{{ playerCard.energyThisTurn }}</span>
          </button>
          <element-track class="ml-3" />
        </div>
        <div class="flex ml-auto h-full">
          <button
            class="h-full px-2.5 flex items-center space-x-1 bg-purple-900"
            @click="fearDeck.increaseFear"
          >
            <div><fear-icon class="w-5 h-5 mb-1 text-white" /></div>
            <div>{{ fearDeck.currentFear }}</div>
          </button>
          <div
            class="px-2"
            @click="isShowFearDeck = true"
          >
            <div class="text-sm">
              Fear Level
            </div>
            <div class="text-center text-lg font-serif">
              {{ fearDeck.currentStageRoman }}
            </div>
          </div>
          <!-- <button
            class="bg-orange-900 px-2 h-full"
            @click="nextPhase()"
          >
            {{ gameState.currentPhaseName }} phase
          </button> -->
        </div>
      </div>
      <div
        id="game-area"
        class="flex flex-1"
      >
        <div
          id="game-quick-bar"
          class="w-14 bg-gray-900 flex flex-col justify-end space-y-4"
        >
          <div
            class="h-14 w-full flex justify-center relative"
            @click="buttonQuickBlightClick"
          >
            <game-card
              v-if="blightDeck.current"
              :id="blightDeck.current"
              class="h-full"
            />
            <img
              v-else
              src="/img/card-back/blight.webp"
              alt="Card back"
              class="h-full"
            >
          </div>
          <div
            class="h-14 w-full flex justify-center relative"
            @click="eventDeck.revealEvent"
          >
            <img
              src="/img/card-back/event.webp"
              alt="Card back"
              class="h-full"
            >
            <div
              v-if="eventDeck.discard.length === 0"
              class="absolute text-xs font-semibold text-white flex items-center justify-center w-full h-full"
            >
              First
            </div>
            <span
              v-if="isPingEvent"
              class="absolute -top-1 right-0 flex h-3 w-3"
            >
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75" />
              <span class="relative inline-flex rounded-full h-3 w-3 bg-purple-600" />
            </span>
          </div>
          <div
            class="h-14 w-full flex justify-center relative"
            @click="quickShowEarnedFear"
          >
            <img
              src="/img/card-back/fear.webp"
              alt="Card back"
              class="h-full"
            >
            <div class="text-2xl font-semibold text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              {{ fearDeck.totalEarned }}
            </div>
          </div>
          <OnClickOutside
            class="h-14 w-full relative"
            @trigger="showQuickPower = false"
          >
            <div
              class="relative overflow-hidden h-full"
              @click="showQuickPower = !showQuickPower"
            >
              <img
                :src="`/img/card-back/minor.webp`"
                alt="Card back"
                class="h-full absolute"
                style="transform: rotate(-10deg);;"
              >
              <img
                :src="`/img/card-back/major.webp`"
                alt="Card back"
                class="h-full absolute"
                style="transform: translateX(20px) rotate(10deg);"
              >
            </div>
            <div
              v-if="showQuickPower"
              class="bg-gray-900/30 absolute z-20 top-0 right-0 translate-x-full h-full flex px-1"
            >
              <div
                v-if="powerDiscardDeck.discard.length > 0"
                class="flex items-center justify-center border-2"
                @click="showPowerDiscard"
              >
                <icon-layers-off
                  class="w-10 h-10 text-white"
                  style="stroke-width: 1px;"
                />
              </div>
              <img
                :src="`/img/card-back/minor.webp`"
                alt="Card back"
                class="h-full ml-1"
                @click="quickTake('minor')"
              >
              <img
                :src="`/img/card-back/major.webp`"
                alt="Card back"
                class="h-full ml-1"
                @click="quickTake('major')"
              >
            </div>
          </OnClickOutside>
        </div>
        <div
          id="game-showing-area"
          class="w-full relative h-full"
        >
          <div
            id="game-showing-top"
            ref="menuControlEl"
            class="bg-neutral-100 py-2 flex px-2 relative h-1/2"
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
                <fear-deck-component
                  @show-earned-fear="isShowEarnedFear = true"
                  @show-fear-deck="isShowFearDeck = true"
                />
              </div>
              <template v-if="playerCard.isPicking">
                <power-pick
                  :picking="playerCard.picking"
                  @swipe-down="pickCard"
                  @swipe-up="powerPickSwipeUp"
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
            class="bg-stone-300 flex px-2 relative h-1/2"
          >
            <div
              v-show="currentMenu2 === MENU_2.HAND"
              class="flex flex-1 relative"
            >
              <card-group-view
                from="hand"
                :cards="playerCard.hand"
                class="pt-2"
                @swipe-down="playerCard.forgetCardFromHand"
                @swipe-up="handSwipeUp"
              />
              <base-button
                v-show="
                  playerCard.hand.length === 0 &&
                    playerCard.play.length === 0 &&
                    playerCard.discard.length > 0
                "
                button-style="secondary"
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                @click="reclaimAll"
              >
                Reclaim All
              </base-button>
            </div>
            <div
              v-if="isHasAspect"
              v-show="currentMenu2 === MENU_2.HAND && playerCard.showAspect"
              class="w-1/3 relative"
            >
              <div
                ref="aspectEl"
                class="w-full pl-2 py-2 overflow-y-auto absolute hide-scrollbar h-full"
                :class="aspectLoading ? 'opacity-0':''"
                @click="isShowAspectDetail = true"
              >
                <aspect-power />
              </div>
            </div>
            <div
              v-if="currentMenu2 === MENU_2.CONTROL"
              class="w-full flex items-center justify-end space-x-4"
            >
              <div class="space-y-4">
                <div
                  id="energy-manual"
                  class="px-2"
                >
                  <div class="font-semibold text-orange-900 text-lg mr-2">
                    Energy<span
                      
                      class="text-gray-500 ml-1 text-sm"
                    >+{{ playerCard.energyThisTurn }}</span>
                  </div>
                  <div
                    class="flex flex-row h-10 w-24 rounded-lg relative bg-transparent mt-1"
                  >
                    <button
                      class="bg-white h-full px-2 rounded-l text-gray-400"
                      @click="playerCard.reduceEnergy"
                    >
                      <icon-minus class="w-4 h-4 mx-auto" />
                    </button>
                    <input
                      type="number"
                      :value="playerCard.energy"
                      class="outline-none focus:outline-none text-center w-full bg-white flex items-center text-orange-700 font-semibold text-lg"
                      @change="
                        playerCard.setEnergy(
                          Number(($event.target as HTMLInputElement).value),
                        )
                      "
                    >
                    <button
                      class="bg-white h-full px-2 rounded-r text-gray-400"
                      @click="playerCard.addEnergy"
                    >
                      <icon-plus class="w-4 h-4 mx-auto" />
                    </button>
                  </div>
                </div>
                <div
                  class="flex justify-center items-center relative bg-transparent mt-1"
                >
                  <button
                    class="mt-3 h-full p-1 rounded-full text-white bg-gray-900"
                    @click="fearDeck.decreaseFear"
                  >
                    <icon-minus class="w-4 h-4 mx-auto" />
                  </button>
                  <div class="relative">
                    <fear-icon class="w-14 h-14 mx-auto" />
                    <div
                      class="mt-2 absolute top-1/2 -translate-y-1/2 text-lg left-1/2 -translate-x-1/2 px-2 bg-gray-900 text-white rounded-full"
                    >
                      {{ fearDeck.currentFear }}
                    </div>
                  </div>
                  <button
                    class="mt-3 h-full p-1 rounded-full text-white bg-gray-900"
                    @click="fearDeck.increaseFear"
                  >
                    <icon-plus class="w-4 h-4 mx-auto" />
                  </button>
                </div>
              </div>
              <div class="grow">
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
                <div class="flex select-none max-w-[400px] flex-wrap">
                  <div
                    v-for="element in ['Sun', 'Moon', 'Fire', 'Air', 'Water', 'Earth', 'Plant', 'Animal']"
                    :key="element"
                    class="flex items-center w-1/4 space-x-0.5 my-1"
                  >
                    <img
                      class="h-6"
                      :src="`/img/elements/${element.toLocaleLowerCase()}.webp`"
                      :alt="`${element} element`"
                      @click="adjustElement(element as Element)"
                    >
                    {{ playerCard.permanentElements[element as Element] }}
                  </div>
                </div>
              </div>
              <div class="flex flex-col relative w-32 space-y-2 mt-2">
                <base-button
                  v-if="isHasAspect"
                  button-style="secondary"
                  class="w-full"
                  @click="manageAspectButtonClick"
                >
                  {{ playerCard.showAspect ? 'Hide' : 'Show' }} Aspect
                </base-button>
                <base-button
                  class="h-fit w-full"
                  button-style="secondary"
                  :disabled="playerCard.forget.length === 0"
                  @click="isShowModalForgetPower = true"
                >
                  Show Forget
                </base-button>
                <base-button
                  v-if="gameOption.adversary !== undefined"
                  class="h-fit w-full"
                  button-style="secondary"
                  @click="isShowAdversary = true"
                >
                  Adversary
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
                  :disabled="!isShowDiscard && playerCard.discard.length === 0"
                  @click="toggleDiscard"
                >
                  {{ isShowDiscard ? 'Show Play' : 'Show Discard' }}
                </base-button>
              </div>
            </div>
          </div>

          <div
            v-for="(spirit, index) in gameOption.spirits"
            :key="`spirit-${spirit}`"
            :style="`top: ${(index % 2) * 64 + 24}px;`"
            :class="[
              playerCard.current === index
                ? 'border-orange-800'
                : 'border-gray-800/50',
              index > 1 ? 'right-16 mr-1' : 'right-2'
            ]"
            class="absolute w-14 h-14 rounded-full bg-white border-2 overflow-hidden"
            @click="playerCard.changeCurrent(index)"
          >
            <img
              :src="`/img/spirit_avatar/${getSpiritAvatar(spirit)}`"
              alt="Spirit avatar"
              :class="[
                playerCard.current === index ? 'opacity-100' : 'opacity-50',
              ]"
              class="h-full max-w-max"
            >
          </div>
        </div>
        <div
          id="game-control-right-bar"
          class="ml-auto grid grid-rows-2 text-white relative"
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
      <modal-discard-common v-if="modalDiscard.getType === 'common'" />
      <modal-discard-power
        v-if="isShowModalDiscardPower"
        @close="isShowModalDiscardPower = false"
      />
      <modal-forget-power
        v-if="isShowModalForgetPower"
        @close="isShowModalForgetPower = false"
        @take-back="returnCardFromForget"
      />
      <modal-zoom-blight-card
        v-if="isZoomBlightCard"
        @close="isZoomBlightCard = false"
      />
      <modal-earned-fear
        v-if="isShowEarnedFear"
        @close="isShowEarnedFear = false"
      />
      <modal-fear-deck
        v-if="isShowFearDeck"
        @close="isShowFearDeck = false"
      />
      <modal-fear-reveal v-if="fearDeck.currentReveal" />
      <card-zoom-modal v-if="cardZoom.isShow" />
      <event-zoom-modal v-if="eventDeck.reveal" />
      <adversary-modal
        v-if="isShowAdversary"
        @close="onCloseModalAdversary"
      />
      <aspect-detail
        v-if="isShowAspectDetail"
        @close="isShowAspectDetail = false"
      />
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
