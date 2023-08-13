<script setup lang="ts">
import { computed, onMounted, ref, watch, type Ref, defineAsyncComponent } from 'vue'
import type { Aspect, Element } from '@/types'
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
  IconAlbumOff,
} from '@tabler/icons-vue'
import ElementTrack from '@/components/ElementTrack.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { changePosition, getSpiritAvatar, removeCard } from '@/utils'
import EventZoomModal from '@/components/EventZoomModal.vue'
import ModalDiscardCommon from '@/components/ModalDiscardCommon.vue'
import FearIcon from '@/components/icons/FearIcon.vue'
import ModalEarnedFear from '@/components/ModalEarnedFear.vue'
import ModalFearReveal from '@/components/ModalFearReveal.vue'
import ModalFearDeck from '@/components/ModalFearDeck.vue'
import AspectPower from '@/components/AspectPower.vue'
import AspectDetail from '@/components/AspectDetail.vue'
import PowerDiscard from '@/components/PowerDiscard.vue'

const DaysThatNeverWere = defineAsyncComponent(() => import('@/components/DaysThatNeverWere.vue'))
const DaysThatNeverWerePick = defineAsyncComponent(() => import('@/components/DaysThatNeverWerePick.vue'))
const VisionOfAShiftingFutureEvent = defineAsyncComponent(() => import('@/components/VisionOfAShiftingFutureEvent.vue'))
const HabsburgReminder = defineAsyncComponent(() => import('@/components/HabsburgReminder.vue'))
const Russia5Modal = defineAsyncComponent(() => import('@/components/Russia5Modal.vue'))

import { OnClickOutside } from '@vueuse/components'
import ModalDiscardPower from '@/components/ModalDiscardPower.vue'
import CardZoomModal from '@/components/CardZoomModal.vue'
import PowerPick from '@/components/PowerPick.vue'
import ModalForgetPower from '@/components/ModalForgetPower.vue'
import ModalZoomBlightCard from '@/components/ModalZoomBlightCard.vue'
import GameCard from '@/components/base/GameCard.vue'
import InvaderBar from '@/components/InvaderBar.vue'
import InvaderControl from '@/components/InvaderControl.vue'
import { ADVERSARY } from '@/constant'
import { usePlayerCardStore } from '@/stores/PlayerCardStore'
import { useEventDeckStore } from '@/stores/EventDeckStore'
import { useModalDiscardStore } from '@/stores/ModalDiscardStore'
import AdversaryText from '@/components/base/AdversaryText.vue'
import MessageInfo from '@/components/MessageInfo.vue'

import { useCardZoomStore } from '@/stores/CardZoomStore'
import { useFearDeckStore } from '@/stores/FearDeckStore'
import { usePowerDeckStore } from '@/stores/PowerDeckStore'
import { useGameOptionStore } from '@/stores/GameOptionStore'
import { useBlightDeckStore } from '@/stores/BlightDeckStore'
import { useDiscardPowerStore } from '@/stores/PowerDeckStore'
import router from '@/router'
import { useDaysThatNeverWereStore } from '@/stores/DaysThatNeverWhereStore'
import { useGameStateStore } from '@/stores/GameStateStore'
import { useMessageStore } from '@/stores/MessageStore'
import FearCounter from '@/components/FearCounter.vue'

const MENU_1 = {
  PLAY: 0,
  TAB_2: 1, //discard
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
const minorDeck = usePowerDeckStore('minor')
const majorDeck = usePowerDeckStore('major')
const powerDiscardDeck = useDiscardPowerStore()
const gameOption = useGameOptionStore()
const blightDeck = useBlightDeckStore()
const gameState = useGameStateStore()
const daysThatNeverWereDeck = useDaysThatNeverWereStore()
const messageStore = useMessageStore()

const menuControlEl = ref<HTMLElement | null>(null)

const isShowModalForgetPower = ref(false)
const isShowEarnedFear = ref(false)
const isShowFearDeck = ref(false)
const isShowAspectDetail = ref(false)
const showQuickPower = ref(false)
const isZoomBlightCard = ref(false)
const isPingEvent = ref(false)
const isShowModalDiscardPower = ref(false)
const isShowDaysThatNeverWere = ref(false)
const showHabsburgReminderCard = ref(true)
const isShowSetupRef = ref(true)
const isShowVisionsOfAShiftingFutureEvent = ref(false)
const modeIncrease = ref(true)
const isShowInvaderControl = ref(false)

if (
  !eventDeck.isAvailable ||
  !minorDeck.isAvailable ||
  !majorDeck.isAvailable ||
  !fearDeck.isAvailable
) {
  router.push({ name: 'HomeView' })
}

const adversaryName = computed(() => {
  if (gameOption.adversary !== undefined) {
    return ADVERSARY[gameOption.adversary].title
  }
  return null
})

const adversarySetup = computed(() => {
  if (gameOption.adversary !== undefined) {
    const setup = ADVERSARY[gameOption.adversary].setup
    const pieces = []
    let invaders = ''
    for(let i = 0; i < gameOption.adversaryLevel + 1; i++) {
      if (setup[i].invaders) {
        invaders = setup[i].invaders as string
      }
      if (setup[i].piece) {
        pieces.push(`- ${setup[i].piece}`)
      }
    }
    const invadersText = invaders === '' ? '' : `:break:- Invaders: ${invaders}`
    if (pieces.length === 0 && invaders === '') {
      return null
    }
    return {
      name: null,
      text: pieces.join(':break:') + invadersText
    }
  }
  return null
})

let isPickingDaysThatNeverWere = null as null | Ref<boolean>
let menu1Tab1BackgroundStyle = null as null | Ref<string>
if (daysThatNeverWereDeck.current !== null) {
  isPickingDaysThatNeverWere = computed(() => 
    playerCard.current === daysThatNeverWereDeck.current
    && daysThatNeverWereDeck.picking && daysThatNeverWereDeck.picking.length > 0
  )

  menu1Tab1BackgroundStyle = computed(() => {
    if (isPickingDaysThatNeverWere && isPickingDaysThatNeverWere.value) {
      return `background-image: url('/img/icon/days_that_never_were.webp');`
    }
    return ''
  })

  watch(() => playerCard.picking, (newDeck, oldDeck) => {
    if (newDeck.length === 0 && oldDeck.length !== 1 && playerCard.current === daysThatNeverWereDeck.current) {
      daysThatNeverWereDeck.picking = [...oldDeck]
    }
  }, { deep: true })
}

let isHasAspect = null as null | Ref<boolean>
let isShow2xAspect = null as null | Ref<boolean | null>
if (gameOption.isHasAspect) {
  isHasAspect = computed(() => Boolean(gameOption.aspectsDetail[playerCard.current]))
  isShow2xAspect = computed(() => {
    return playerCard.aspectMode === '2x'
    && isHasAspect
    && isHasAspect.value
    && playerCard.showAspect
    && currentMenu2.value === MENU_2.HAND
  })

  watch(() => playerCard.aspectMode, (mode) => {
    if (mode === '2x') {
      currentMenu2.value = MENU_2.HAND
    }
  })
}

function adjustElement(element: Element) {
  if (modeIncrease.value) {
    playerCard.increaseElement(element)
  } else {
    playerCard.decreaseElement(element)
  }
}

function discardViewSwipeUp(cardId: string) {
  playerCard.forgetCardFromDiscard(cardId)
  currentMenu1.value = MENU_1.PLAY
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
  showQuickPower.value = false
  if (playerCard.isPicking) {
    return
  }
  const card = usePowerDeckStore(type).reveal()
  playerCard.addToPicking(card)
}

function handSwipeUp(cardId: string, posId: string) {
  if (playerCard.isPicking && currentMenu1.value === MENU_1.PLAY) {
    playerCard.putCardToPicking(cardId)
    return
  }
  if (currentMenu1.value === MENU_1.TAB_2) {
    playerCard.putCardInDiscard(cardId)
    return
  }
  playerCard.playCard(cardId, posId)
}

function putFromPlayToHand(cardId: string, posId: string) {
  playerCard.returnCardFromPlay(cardId, posId)
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
  fearDeck.cleanUp()
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
  playerCard.resetPicking()
}
function finishPickDaysThatNeverWere() {
  currentMenu1.value = MENU_1.PLAY
  daysThatNeverWereDeck.picking = []
}
function manageAspectButtonClick() {
  playerCard.toggleShowAspect()
}

function reclaimOneCard(card: string) {
  playerCard.reclaimOneCard(card)
  currentMenu2.value = MENU_2.HAND
}

function returnCardFromForget(card: string) {
  playerCard.returnCardFromForget(card)
  isShowModalForgetPower.value = false
  currentMenu2.value = MENU_2.HAND
}

function addCardToDaysThatNeverWere(cardId: string) {
  const [type] = cardId.split('-')
  if (type === 'minor') {
    daysThatNeverWereDeck.minor.push(cardId)
  } else if (type === 'major') {
    daysThatNeverWereDeck.major.push(cardId)
  }
  daysThatNeverWereDeck.picking = []
}

watch(() => cardZoom.waiting.card,
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

        case 'days-that-never-were': {
          const type = cardId.split('-')[0]
          if (type === 'minor') {
            removeCard(daysThatNeverWereDeck.minor, cardId)
          }
          if (type === 'major') {
            removeCard(daysThatNeverWereDeck.major, cardId)
          }
          playerCard.take(cardId)
          isShowDaysThatNeverWere.value = false
          break
        }

        case 'days-that-never-were-store': {
          addCardToDaysThatNeverWere(cardId)
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

watch(() => playerCard.isPicking, () => {
  currentMenu1.value = MENU_1.PLAY
})

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

watch(() => playerCard.current, () => {
  currentMenu2.value = MENU_2.HAND
})

onMounted(() => {
  messageStore.setMessage('Welcome to Spirit Island!')
})
</script>

<template>
  <div class="relative h-screen bg-gray-100 flex flex-col overflow-hidden">
    <div class="h-screen flex flex-col">
      <div
        id="game-header"
        class="h-12 bg-orange-800 flex items-center z-40 text-white w-full"
      >
        <div class="flex items-center h-full pr-3">
          <button
            class="h-full px-2 flex items-center bg-orange-600"
            @click="playerCard.addEnergy"
          >
            <icon-bolt /> {{ playerCard.energy }}
            <span
              class="text-xs relative -top-2"
            >+{{ playerCard.energyThisTurn }}</span>
          </button>
          <element-track class="ml-3" />
        </div>
        <div class="flex ml-auto h-full">
          <invader-bar @click="isShowInvaderControl = true" />
          <fear-counter />
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
        </div>
      </div>
      <div
        id="game-area"
        class="flex flex-1 relative"
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
                  class="w-9 h-9 text-white"
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
          class="w-full relative h-full flex"
        >
          <div class="w-full relative h-full">
            <div
              id="game-showing-top"
              ref="menuControlEl"
              class="bg-neutral-100 flex px-2 relative h-1/2"
              :style="menu1Tab1BackgroundStyle ? `${menu1Tab1BackgroundStyle}` : undefined"
            >
              <template v-if="currentMenu1 === MENU_1.PLAY">
                <div
                  class="absolute text-6xl top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 whitespace-nowrap font-bold text-gray-300 z-0"
                >
                  <span v-if="playerCard.isPicking">Picking Power</span>
                  <span
                    v-else-if="isPickingDaysThatNeverWere"
                    class="text-gray-200 opacity-60"
                  >Days That Never Were</span>
                  <span v-else>Player Play</span>
                </div>
                <div
                  v-if="playerCard.isPicking"
                  class="flex items-stretch relative w-full"
                >
                  <power-pick />
                  <icon-x
                    class="w-8 h-8 absolute right-1 -top-1 text-red-600 z-50"
                    style="stroke-width: 3px"
                    @click="resetPicking"
                  />
                </div>
                <div
                  v-else-if="isPickingDaysThatNeverWere"
                  class="flex items-stretch relative w-full"
                >
                  <!-- v-if="daysThatNeverWereDeck.picking.length > 0" -->
                  <days-that-never-were-pick
                    :picking="daysThatNeverWereDeck.picking"
                    @swipe-down="addCardToDaysThatNeverWere"
                  />
                  <icon-x
                    class="w-7 h-7 absolute -right-2 -top-2 text-blue-900 z-50"
                    style="stroke-width: 3px"
                    @click="finishPickDaysThatNeverWere"
                  />
                </div>
                <div
                  v-else
                  class="w-full flex"
                >
                  <div class="relative flex-1">
                    <card-group-view
                      from="play"
                      :cards="playerCard.play"
                      @swipe-down="putFromPlayToHand"
                      @swipe-up="playerCard.putFromPlayToDiscard"
                    />
                  </div>
                  <template
                    v-for="(player, index) in playerCard.players"
                    :key="`player-${index}`"
                  >
                    <div
                      v-if="gameOption.aspectsDetail[index] && player.showAspect"
                      v-show="playerCard.current === index"
                      class="w-1/3 relative"
                    >
                      <aspect-power
                        :key="`1x-${index}`"
                        :aspect="(gameOption.aspectsDetail[index] as Aspect)"
                        @show-aspect-detail="isShowAspectDetail = true"
                      />
                    </div>
                  </template>
                </div>
              </template>
              <div
                v-if="currentMenu1 === MENU_1.TAB_2"
                class="flex items-stretch relative w-full"
              >
                <div
                  class="space-x-2 absolute h-full w-full"
                >
                  <div
                    class="absolute text-6xl top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 whitespace-nowrap font-bold text-gray-300 z-0"
                  >
                    Player Discard
                  </div>
                  <power-discard
                    :discard="playerCard.discard"
                    @swipe-down="reclaimOneCard"
                    @swipe-up="discardViewSwipeUp"
                  />
                </div>
              </div>
              <div
                v-if="!isShow2xAspect"
                class="w-8"
              />
            </div>
  
            <div
              id="game-showing-bottom"
              class="bg-stone-300 flex px-2 relative h-1/2"
            >
              <template v-if="currentMenu2 === MENU_2.HAND">
                <div class="flex flex-1 relative">
                  <card-group-view
                    from="hand"
                    :cards="playerCard.hand"
                    class="pt-2"
                    @swipe-down="playerCard.forgetCardFromHand"
                    @swipe-up="handSwipeUp"
                    @change-position="(cardId: string, posId: string) => changePosition(playerCard.hand ,cardId, posId)"
                  />
                  <base-button
                    v-if="
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
              </template>
              <div
                v-if="currentMenu2 === MENU_2.CONTROL"
                class="w-full flex items-center justify-end space-x-4 mx-4"
              >
                <div class="space-y-3 w-28 flex flex-col h-full overflow-hidden">
                  <div
                    class="flex flex-row h-10 w-full rounded-lg relative bg-orange-700 mt-1 text-white"
                  >
                    <button
                      class="h-full px-2 rounded-l bg-inherit"
                      @click="playerCard.reduceEnergy"
                    >
                      <icon-minus class="w-4 h-4 mx-auto" />
                    </button>
                    <div class="bg-orange-700 flex items-center">
                      <input
                        type="number"
                        :value="playerCard.energy"
                        class="outline-none focus:outline-none bg-inherit text-center w-full flex items-center font-semibold text-lg"
                        @change="
                          playerCard.setEnergy(
                            Number(($event.target as HTMLInputElement).value),
                          )
                        "
                      >
                      <icon-bolt class="w-10 h-10 -ml-1" />
                    </div>
                    <button
                      class="bg-inherit h-full px-2 rounded-r"
                      @click="playerCard.addEnergy"
                    >
                      <icon-plus class="w-4 h-4 mx-auto" />
                    </button>
                  </div>
                  <div
                    class="flex w-full h-10 rounded-lg relative bg-gray-800 mt-1 text-white shrink-0"
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
                  <div class="flex flex-1 items-center space-x-1 justify-center">
                    <div
                      class="rounded-full inline-block h-fit bg-purple-900 text-white p-1"
                      @click="fearDeck.unEarn"
                    >
                      <icon-minus class="w-3.5 h-3.5" />
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
                      <icon-plus class="w-3.5 h-3.5" />
                    </div>
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
                  <div class="flex select-none w-20 flex-wrap">
                    <div
                      v-for="element in ['Sun', 'Moon', 'Fire', 'Air', 'Water', 'Earth', 'Plant', 'Animal']"
                      :key="element"
                      class="flex items-center w-1/2 space-x-0.5 my-1"
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
                    v-if="isHasAspect && playerCard.showAspect"
                    button-style="secondary"
                    class="w-full"
                    @click="playerCard.switchAspectMode"
                  >
                    Aspect: {{ playerCard.aspectMode }}
                  </base-button>
                  <base-button
                    button-style="secondary"
                    class="mx-auto"
                    @click="router.push({ name: 'HomeView' })"
                  >
                    Exit Game
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
                    :disabled="playerCard.forget.length === 0"
                    @click="isShowModalForgetPower = true"
                  >
                    Show Forget
                  </base-button>
                  <base-button
                    class="h-fit w-full"
                    button-style="secondary"
                    @click="reclaimAll"
                  >
                    Reclaim All
                  </base-button>
                </div>
              </div>
            </div>
          </div>

          <div class="absolute -right-3 top-3 space-y-2 z-10">
            <div
              v-for="(spirit, index) in gameOption.spirits"
              :key="`spirit-${spirit}`"
              :class="[
                playerCard.current === index
                  ? 'border-orange-800'
                  : 'border-gray-800/50',
              ]"
              class="w-12 h-12 rounded-full bg-white border-2 overflow-hidden"
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
            v-if="daysThatNeverWereDeck.current === playerCard.current"
            class="absolute w-12 h-12 rounded-full bg-green-800 border-2 border-purple-700 overflow-hidden bottom-2 right-2"
            @click="isShowDaysThatNeverWere = true"
          >
            <img
              src="/img/icon/days_that_never_were.webp"
              alt="days that never were"
              class="h-full"
            >
          </div>
          <div
            v-if="isShow2xAspect"
            class="w-1/3 shrink-0 flex"
            @click="isShowAspectDetail = true"
          >
            <div class="relative flex-1">
              <aspect-power />
            </div>
            <div class="w-6">
              <div class="h-1/2 bg-neutral-100" />
              <div class="h-1/2 bg-stone-300" />
            </div>
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
              <icon-album-off
                v-if="currentMenu1 === MENU_1.TAB_2"
                class="w-8 h-8"
                @click="switchMenu(1)"
              />
            </transition>
          </div>
          <div class="flex flex-col justify-center items-center bg-stone-900 px-2">
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
            <div class="h-8" />
          </div>
        </div>
        <message-info />
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
        v-if="isShowFearDeck && fearDeck.draw.length > 0"
        @close="isShowFearDeck = false"
      />
      <modal-fear-reveal v-if="fearDeck.currentReveal" />
      <card-zoom-modal v-if="cardZoom.isShow" />
      <event-zoom-modal v-if="eventDeck.reveal" />
      <aspect-detail
        v-if="isShowAspectDetail"
        @close="isShowAspectDetail = false"
      />
      <russia5-modal v-if="gameOption.hasRussia5" />
      <days-that-never-were
        v-if="isShowDaysThatNeverWere"
        @close="isShowDaysThatNeverWere = false"
        @do-visions-of-a-shifting-future="isShowVisionsOfAShiftingFutureEvent = true"
      />
      <VisionOfAShiftingFutureEvent
        v-if="isShowVisionsOfAShiftingFutureEvent"
        @close="isShowVisionsOfAShiftingFutureEvent = false"
      />
      <invader-control
        v-if="isShowInvaderControl"
        @close="isShowInvaderControl = false"
      />
      <div
        v-if="adversaryName && isShowSetupRef && adversarySetup && gameState.isNewGame"
        class="absolute w-full h-full bg-gray-900/30 top-0 left-0"
        @click.self="isShowSetupRef = false"
      >
        <div class="bg-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md max-w-[60%]">
          <div class="bg-orange-800 text-white font-semibold text-lg py-1 px-2 rounded-t-md">
            {{ `${adversaryName} ${gameOption.adversaryLevel}` }} setup
          </div>
          <div class="px-3 py-1.5">
            <adversary-text :message="adversarySetup" />
          </div>
        </div>
      </div>
      <habsburg-reminder
        v-if="showHabsburgReminderCard && gameOption.hasHabsburg5"
        @close="showHabsburgReminderCard = false"
      />
    </div>
  </div>
</template>