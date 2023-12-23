<script setup lang="ts">
import { computed, onMounted, ref, watch, type Ref, defineAsyncComponent } from 'vue'
import type { Aspect } from '@/types'
import CardGroupView from '@/components/CardGroupView.vue'
import {
  IconAlbum,
  IconX,
  IconBolt,
  IconLayersOff,
  IconAlbumOff,
  IconSettings,
  IconHourglassHigh
} from '@tabler/icons-vue'
import ElementTrack from '@/components/ElementTrack.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { changePosition, getSpiritAvatar, removeCard } from '@/utils'
import EventZoomModal from '@/components/EventZoomModal.vue'
import ModalDiscardCommon from '@/components/ModalDiscardCommon.vue'
import ModalEarnedFear from '@/components/ModalEarnedFear.vue'
import ModalFearReveal from '@/components/ModalFearReveal.vue'
import ModalFearDeck from '@/components/ModalFearDeck.vue'
import AspectPower from '@/components/AspectPower.vue'
import AspectDetail from '@/components/AspectDetail.vue'
import PowerDiscard from '@/components/PowerDiscard.vue'
import IconReclaim from '@/components/icons/IconReclaim.vue'
import {addResult} from "@/database/result";

const DaysThatNeverWere = defineAsyncComponent(() => import('@/components/DaysThatNeverWere.vue'))
const DaysThatNeverWerePick = defineAsyncComponent(() => import('@/components/DaysThatNeverWerePick.vue'))
const VisionOfAShiftingFutureEvent = defineAsyncComponent(() => import('@/components/VisionOfAShiftingFutureEvent.vue'))
const HabsburgReminder = defineAsyncComponent(() => import('@/components/HabsburgReminder.vue'))
const Russia5Modal = defineAsyncComponent(() => import('@/components/Russia5Modal.vue'))

import { OnClickOutside } from '@vueuse/components'
import ModalDiscardPower from '@/components/ModalDiscardPower.vue'
import CardZoomModal from '@/components/CardZoomModal.vue'
import PowerPick from '@/components/PowerPick.vue'
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
import GameSettingModal from '@/components/GameSettingModal.vue'

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
import { useLocalStorageStore } from "@/stores/LocalStorageStore";

const MENU_1 = {
  PLAY: 0,
  TAB_2: 1, //discard
}

const currentMenu1 = ref(MENU_1.PLAY)

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
const localStorage = useLocalStorageStore()

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
const isShowInvaderControl = ref(false)
const isShowGameSettings = ref(false)

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

  watch(() => powerDiscardDeck.discard.length, (newLength, oldLength) => {
    const gap = newLength - oldLength
    if (gap > 1 && playerCard.current === daysThatNeverWereDeck.current) {
      const newItems = powerDiscardDeck.discard.slice(-gap)
      daysThatNeverWereDeck.picking = [...newItems]
    }
  })
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
  })
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

function handSwipeUp(cardId: string, posId: { id: string, isFront: boolean }) {
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

function putFromPlayToHand(cardId: string, posId: { id: string, isFront: boolean }) {
  playerCard.returnCardFromPlay(cardId, posId)
}

function switchMenu(menu: number) {
  if (menu === 1) {
    const length = Object.keys(MENU_1).length
    currentMenu1.value = (currentMenu1.value + 1) % length
  }
}

function timePassed() {
  playerCard.cleanUp()
  fearDeck.cleanUp()
  messageStore.setMessage('Time passed')
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

function reclaimOneCard(card: string) {
  playerCard.reclaimOneCard(card)
}

function addCardToDaysThatNeverWere(cardId: string) {
  const [type] = cardId.split('-') as ['minor' | 'major']
  powerDiscardDeck.removeFromDiscard(cardId)
  daysThatNeverWereDeck[type].push(cardId)
  daysThatNeverWereDeck.picking = []
  messageStore.setMessage('Add card to Days That Never Were')
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

onMounted(() => {
  messageStore.setMessage('Welcome to Spirit Island!')

  setTimeout(() => {
    isShowSetupRef.value = false
  }, 10000)
})

async function tryUploadResult() {
  const pendingResult = localStorage.pendingResult
  if (pendingResult.length > 0) {
    const isSuccess = await addResult(pendingResult[0], { fromPending: true })
    if (isSuccess) {
      setTimeout(() => {
        tryUploadResult()
      }, 10000)
    }
  }
}
</script>

<template>
  <div class="relative h-screen bg-gray-100 flex flex-col overflow-hidden">
    <div class="h-screen flex flex-col">
      <div
        id="game-header"
        class="h-12 bg-orange-800 flex items-center z-40 text-white w-full"
      >
        <div class="flex items-center h-full pr-3">
          <icon-settings
            class="w-10"
            @click="isShowGameSettings = true"
          />
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
              <div
                v-if="currentMenu1 === MENU_1.PLAY"
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
                v-if="playerCard.isPicking && currentMenu1 === MENU_1.PLAY"
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
                v-else-if="isPickingDaysThatNeverWere && currentMenu1 === MENU_1.PLAY"
                class="flex items-stretch relative w-full"
              >
                <days-that-never-were-pick
                  :picking="daysThatNeverWereDeck.picking"
                  @swipe-down="addCardToDaysThatNeverWere"
                />
                <icon-x
                  class="w-7 h-7 absolute right-2 text-gray-800 z-50"
                  style="stroke-width: 3px"
                  @click="finishPickDaysThatNeverWere"
                />
              </div>
              <div
                v-show="!playerCard.isPicking && !isPickingDaysThatNeverWere && currentMenu1 === MENU_1.PLAY"
                class="w-full flex"
              >
                <div class="relative flex-1">
                  <card-group-view
                    from="play"
                    :cards="playerCard.play"
                    @swipe-down="putFromPlayToHand"
                    @swipe-up="playerCard.putFromPlayToDiscard"
                    @change-position="(cardId, posId) => changePosition(playerCard.play ,cardId, posId)"
                  />
                </div>
                <template
                  v-for="(player, index) in playerCard.players"
                  :key="`player-${index}`"
                >
                  <div
                    v-if="gameOption.aspectsDetail[index] && player.showAspect && player.aspectMode === '1x'"
                    v-show="playerCard.current === index"
                    class="w-1/3 relative"
                  >
                    <aspect-power
                      :aspect="(gameOption.aspectsDetail[index] as Aspect)"
                      @show-aspect-detail="isShowAspectDetail = true"
                    />
                  </div>
                </template>
              </div>
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
              <div class="flex flex-1 relative">
                <card-group-view
                  from="hand"
                  :cards="playerCard.hand"
                  class="pt-2"
                  @swipe-down="playerCard.forgetCardFromHand"
                  @swipe-up="handSwipeUp"
                  @change-position="(cardId, posId) => changePosition(playerCard.hand ,cardId, posId)"
                />
                <base-button
                  v-if="
                    playerCard.hand.length === 0 &&
                      playerCard.play.length === 0 &&
                      playerCard.discard.length > 0
                  "
                  button-style="secondary"
                  class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  @click="playerCard.reclaim"
                >
                  Reclaim All
                </base-button>
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

          <div class="absolute -right-10 bottom-1 space-x-2 z-10 flex">
            <div
              v-if="daysThatNeverWereDeck.current === playerCard.current"
              class="w-11 h-11 rounded-full bg-green-800 border-2 border-purple-700 overflow-hidden"
              @click="isShowDaysThatNeverWere = true"
            >
              <img
                src="/img/icon/days_that_never_were.webp"
                alt="days that never were"
                class="h-full"
              >
            </div>
            <div
              class="h-11 w-11 p-2 rounded-full text-white bg-purple-800 border-2 border-purple-900"
              @click="timePassed"
            >
              <icon-hourglass-high
                class="w-full h-full"
                style="stroke-width: 1px;"
              />
            </div>
            <div
              class="h-11 w-11 p-2 rounded-full text-white bg-orange-800 border-2 border-orange-900"
              @click="playerCard.reclaim"
            >
              <icon-reclaim
                class="w-full h-full"
              />
            </div>
          </div>
          
          <template
            v-for="(player, index) in playerCard.players"
            :key="`player2x-${index}`"
          >
            <div
              v-if="player.showAspect && player.aspectMode === '2x'"
              v-show="playerCard.current === index && currentMenu1 === MENU_1.PLAY"
              class="w-1/3 shrink-0 flex"
              @click="isShowAspectDetail = true"
            >
              <div class="relative flex-1">
                <aspect-power :aspect="(gameOption.aspectsDetail[index] as Aspect)" />
              </div>
              <div class="w-6">
                <div class="h-1/2 bg-neutral-100" />
                <div class="h-1/2 bg-stone-300" />
              </div>
            </div>
          </template>
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
          <div class="flex flex-col justify-center items-center bg-stone-900 px-2" />
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
      <game-setting-modal
        v-if="isShowGameSettings"
        @close="isShowGameSettings = false"
        @show-forget="isShowModalForgetPower = true"
      />
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