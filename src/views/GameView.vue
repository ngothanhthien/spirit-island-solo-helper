<script setup lang="ts">
import { onMounted, watch } from 'vue'
import type { Aspect } from '@/types'
import CardGroupView from '@/components/CardGroupView.vue'
import ElementTrack from '@/components/ElementTrack.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { changePosition, getSpiritAvatar } from '@/utils'
import AspectPower from '@/components/AspectPower.vue'
import PowerDiscard from '@/components/PowerDiscard.vue'
import SpiritPanelTrigger from '@/components/SpiritPanel/Trigger.vue'
import GameViewModals from '@/components/GameView/Modals.vue'

import { OnClickOutside } from '@vueuse/components'
import PowerPick from '@/components/PowerPick.vue'
import GameCard from '@/components/base/GameCard.vue'
import InvaderBar from '@/components/InvaderBar.vue'
import { MENU_1 } from '@/constant'
import { usePlayerCardStore } from '@/stores/PlayerCardStore'
import { useEventDeckStore } from '@/stores/EventDeckStore'
import MessageInfo from '@/components/MessageInfo.vue'

import { useFearDeckStore } from '@/stores/FearDeckStore'
import { useGameOptionStore } from '@/stores/GameOptionStore'
import { useBlightDeckStore } from '@/stores/BlightDeckStore'
import { useDiscardPowerStore } from '@/stores/PowerDeckStore'
import { useDaysThatNeverWereStore } from '@/stores/DaysThatNeverWhereStore'
import { useMessageStore } from '@/stores/MessageStore'
import FearCounter from '@/components/FearCounter.vue'
import { useImpendingCardStore } from '@/stores/ImpendingCardStore'
import injectWakeScreen from '@/plugins/wakeScreen'
import { useFieldFunctional } from '@/composable/useFieldFunctional'
import { exitPicking, timePassed } from '@/utils/interact'
import { canInGameView } from '@/utils/middleware'
import { tryUploadResult } from '@/utils/result'
import { useTakePowerMenu } from '@/composable/useTakePowerMenu'
import DayThatNeverWereTrigger from '@/components/DayThatNeverWereTrigger.vue'
import { useAspectView } from '@/composable/useAspectView'
import { useModalStore } from '@/stores/ModalStore'

const playerCard = usePlayerCardStore()
const eventDeck = useEventDeckStore()
const fearDeck = useFearDeckStore()
const gameOption = useGameOptionStore()
const blightDeck = useBlightDeckStore()
const modal = useModalStore()

const { isShow2xAspect } = useAspectView()

function buttonQuickBlightClick() {
  modal.zoomBlightCard = true
  if (blightDeck.current) {
    return
  }
  blightDeck.turnUp()
}

function quickShowEarnedFear() {
  if (fearDeck.earned.length === 0) {
    return
  }
  modal.earnedFear = true
}

const { isShowQuickPower, quickTake, closeQuickPower, toggleQuickPower } = useTakePowerMenu()

const {
  discardViewSwipeDown,
  handSwipeUp,
  discardViewSwipeUp,
  switchMenu,
  switchToPlayField,
  playViewSwipeUp,
  playViewSwipeDown,
  handChangePosition,

  currentMenu1
} = useFieldFunctional()

watch(() => playerCard.isPicking, switchToPlayField)
watch(
  () => fearDeck.earned.length,
  (newValue) => {
    if (newValue === 0) {
      modal.earnedFear = false
    }
  }
)
canInGameView()
injectWakeScreen()

onMounted(async () => {
  useMessageStore().setMessage('Welcome to Spirit Island!')
  setTimeout(async () => {
    await tryUploadResult()
  }, 10000)
})
</script>

<template>
  <div id="game-view" class="relative h-screen bg-gray-100 flex flex-col overflow-hidden">
    <div class="h-screen flex flex-col">
      <div id="game-header" class="h-12 bg-orange-800 flex items-center z-40 text-white w-full">
        <div class="flex items-center h-full pr-3">
          <div class="w-10 flex justify-center">
            <span class="icon-settings text-xl" @click="modal.gameSettings = true" />
          </div>
          <button class="h-full px-2 flex items-center bg-orange-600" @click="playerCard.addEnergy">
            <span class="icon-bolt" /> {{ playerCard.energy }}
            <span class="text-xs relative -top-2">+{{ playerCard.energyThisTurn }}</span>
          </button>
          <element-track class="ml-3" />
        </div>
        <div class="flex ml-auto h-full">
          <invader-bar @click="modal.invaderControl = true" />
          <fear-counter />
          <div class="px-2" @click="modal.fearDeck = true">
            <div class="text-sm">Fear Level</div>
            <div class="text-center text-lg font-serif">
              {{ fearDeck.currentStageRoman }}
            </div>
          </div>
        </div>
      </div>
      <div id="game-area" class="flex flex-1 relative">
        <div id="game-quick-bar" class="w-14 bg-gray-900 flex flex-col justify-end space-y-4">
          <div class="h-14 w-full flex justify-center relative" @click="buttonQuickBlightClick">
            <game-card v-if="blightDeck.current" :id="blightDeck.current" class="h-full" />
            <img v-else src="/img/card-back/blight.webp" alt="Card back" class="h-full" />
          </div>
          <div class="h-14 w-full flex justify-center relative" @click="eventDeck.revealEvent">
            <img src="/img/card-back/event.webp" alt="Card back" class="h-full" />
            <div v-if="eventDeck.discard.length === 0" class="absolute text-xs font-semibold text-white flex items-center justify-center w-full h-full">First</div>
            <span v-if="eventDeck.isPingEvent" class="absolute -top-1 right-0 flex h-3 w-3">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-500 opacity-75" />
              <span class="relative inline-flex rounded-full h-3 w-3 bg-purple-600" />
            </span>
          </div>
          <div class="h-14 w-full flex justify-center relative" @click="quickShowEarnedFear">
            <img src="/img/card-back/fear.webp" alt="Card back" class="h-full" />
            <div class="text-2xl font-semibold text-white absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              {{ fearDeck.totalEarned }}
            </div>
          </div>
          <OnClickOutside class="h-14 w-full relative" @trigger="closeQuickPower">
            <div class="relative overflow-hidden h-full" @click="toggleQuickPower">
              <img :src="`/img/card-back/minor.webp`" alt="Card back" class="h-full absolute" style="transform: rotate(-10deg)" />
              <img :src="`/img/card-back/major.webp`" alt="Card back" class="h-full absolute" style="transform: translateX(20px) rotate(10deg)" />
            </div>
            <div v-if="isShowQuickPower" class="bg-gray-900/30 absolute z-20 top-0 right-0 translate-x-full h-full flex px-1">
              <div v-if="useDiscardPowerStore().discard.length > 0" class="flex items-center justify-center border-2" @click="modal.discardPower = true">
                <span class="text-2xl w-9 text-center text-white icon-layers-off" />
              </div>
              <img :src="`/img/card-back/minor.webp`" alt="Card back" class="h-full ml-1" @click="quickTake('minor')" />
              <img :src="`/img/card-back/major.webp`" alt="Card back" class="h-full ml-1" @click="quickTake('major')" />
            </div>
          </OnClickOutside>
        </div>
        <div id="game-showing-area" class="w-full relative h-full flex">
          <div class="w-full relative h-full">
            <div id="game-showing-top" class="bg-neutral-100 flex px-2 relative h-1/2">
              <div v-if="currentMenu1 === MENU_1.PLAY" class="absolute text-6xl top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 whitespace-nowrap font-bold text-gray-300 z-0">
                <span v-if="playerCard.isPicking">Picking Power</span>
                <span v-else>Player Play</span>
              </div>
              <div v-if="playerCard.isPicking && currentMenu1 === MENU_1.PLAY" class="flex items-stretch relative w-full">
                <power-pick />
                <span class="icon-x text-3xl absolute right-1 -top-1 text-red-600 z-50" style="stroke-width: 3px" @click="exitPicking()" />
              </div>
              <div v-show="!playerCard.isPicking && currentMenu1 === MENU_1.PLAY" class="w-full flex">
                <div class="relative flex-1">
                  <card-group-view
                    from="play"
                    :cards="playerCard.play"
                    @swipe-down="playViewSwipeDown"
                    @swipe-up="playViewSwipeUp"
                    @change-position="(cardId, posId) => changePosition(playerCard.play, cardId, posId)"
                  />
                </div>
                <template v-for="(player, index) in playerCard.players" :key="`player-${index}`">
                  <div v-if="gameOption.aspectsDetail[index] && player.showAspect && player.aspectMode === '1x'" v-show="playerCard.current === index" class="w-1/3 relative">
                    <aspect-power :aspect="gameOption.aspectsDetail[index] as Aspect" @show-aspect-detail="modal.aspectDetail = true" />
                  </div>
                </template>
              </div>
              <div v-if="currentMenu1 === MENU_1.TAB_2" class="flex items-stretch relative w-full">
                <div class="space-x-2 absolute h-full w-full">
                  <div class="absolute text-6xl top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 whitespace-nowrap font-bold text-gray-300 z-0">Player Discard</div>
                  <power-discard :discard="playerCard.discard" @swipe-down="discardViewSwipeDown" @swipe-up="discardViewSwipeUp" />
                </div>
              </div>
              <div v-if="!isShow2xAspect" class="w-8" />
            </div>

            <div id="game-showing-bottom" class="bg-stone-300 flex px-2 relative h-1/2">
              <div class="flex flex-1 relative">
                <card-group-view from="hand" :cards="playerCard.hand" class="pt-2" @swipe-down="playerCard.forgetCardFromHand" @swipe-up="handSwipeUp" @change-position="handChangePosition" />
                <base-button v-if="playerCard.canReclaim" button-style="secondary" class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" @click="playerCard.reclaim()">
                  Reclaim All
                </base-button>
              </div>
            </div>
          </div>

          <div class="absolute -right-3 top-3 space-y-2 z-10">
            <div
              v-for="(spirit, index) in gameOption.spirits"
              :key="`spirit-${spirit}`"
              :class="[playerCard.current === index ? 'border-orange-800' : 'border-gray-800/50']"
              class="w-12 h-12 rounded-full bg-white border-2 overflow-hidden"
              @click="playerCard.changeCurrent(index)"
            >
              <img :src="`/img/spirit_avatar/${getSpiritAvatar(spirit)}`" alt="Spirit avatar" :class="[playerCard.current === index ? 'opacity-100' : 'opacity-50']" class="h-full max-w-max" />
            </div>
          </div>

          <div class="absolute -right-10 bottom-1 space-x-2 z-10 flex">
            <day-that-never-were-trigger v-if="useDaysThatNeverWereStore().hasDaysThatNeverWere" />
            <div
              v-if="useImpendingCardStore().hasImpendingFeature"
              class="w-11 h-11 rounded-full bg-red-500 border-2 border-purple-700 overflow-hidden flex items-center justify-center text-2xl"
              @click="modal.impendingCardModel = true"
            >
              <span class="icon-impending">
                <span class="path1" />
                <span class="path2" />
                <span class="path3" />
                <span class="path4" />
                <span class="path5" />
                <span class="path6" />
                <span class="path7" />
                <span class="path8" />
                <span class="path9" />
                <span class="path10" />
              </span>
            </div>
            <div class="cs-trigger text-white bg-purple-800 border-purple-900" @click="timePassed()">
              <span class="icon-hourglass-high text-xl" />
            </div>
            <spirit-panel-trigger />
          </div>

          <template v-for="(player, index) in playerCard.players" :key="`player2x-${index}`">
            <div
              v-if="player.showAspect && player.aspectMode === '2x'"
              v-show="playerCard.current === index && currentMenu1 === MENU_1.PLAY"
              class="w-1/3 shrink-0 flex"
              @click="modal.aspectDetail = true"
            >
              <div class="relative flex-1">
                <aspect-power :aspect="gameOption.aspectsDetail[index] as Aspect" />
              </div>
              <div class="w-6">
                <div class="h-1/2 bg-neutral-100" />
                <div class="h-1/2 bg-stone-300" />
              </div>
            </div>
          </template>
        </div>
        <div id="game-control-right-bar" class="ml-auto grid grid-rows-2 text-white relative">
          <div class="bg-neutral-700 px-2 flex items-center">
            <transition name="switch" mode="out-in">
              <span v-if="currentMenu1 === MENU_1.PLAY" class="icon-album text-4xl" @click="switchMenu(1)" />
            </transition>
            <transition name="switch" mode="out-in">
              <span v-if="currentMenu1 === MENU_1.TAB_2" class="icon-album-off text-4xl" @click="switchMenu(1)" />
            </transition>
          </div>
          <div class="flex flex-col justify-center items-center bg-stone-900 px-2" />
        </div>
        <message-info />
      </div>
      <game-view-modals id="modal" />
    </div>
  </div>
</template>
