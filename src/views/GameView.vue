<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import CardGroupView from '@/components/CardGroupView.vue'
import IconCards from '@/components/icon/IconCards.vue'
import IconPlay from '@/components/icon/IconPlay.vue'
import IconControl from '@/components/icon/IconControl.vue'

const ControlArea = defineAsyncComponent(() => import('@/components/ControlArea.vue'))
const ModalDiscardCommon = defineAsyncComponent(() => import('@/components/ModalDiscardCommon.vue'))
const CardZoomModal = defineAsyncComponent(() => import('@/components/CardZoomModal.vue'))


import { usePlayerCardStore } from '@/stores/PlayerCardStore'
import { useMinorDeckStore } from '@/stores/MinorDeckStore'
import { useMajorDeckStore } from '@/stores/MajorDeckStore'
import { useEventDeckStore } from '@/stores/EventDeckStore'
import { useModalDiscardStore } from '@/stores/ModalDiscardStore'

import { onMounted } from 'vue'
import { useCardZoomStore } from '@/stores/CardZoomStore'

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
const minorDeck = useMinorDeckStore()
const majorDeck = useMajorDeckStore()
const eventDeck = useEventDeckStore()
const modalDiscard = useModalDiscardStore()
const cardZoom = useCardZoomStore()

eventDeck.newDeck()

onMounted(() => {
  window.addEventListener('touchmove', function (event) {
    if (document.body.scrollTop === 0) {
        event.preventDefault();
    }
  }, { passive: false })
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
  const [type] = cardId.split('-')
  if (type === 'minor') {
    minorDeck.addToDiscard(cardId)
  } else if (type === 'major') {
    majorDeck.addToDiscard(cardId)
  }
  else {
    //error
  }
  playerCard.removeCardFromPlay(cardId)
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
</script>

<template>
  <div class="relative h-screen bg-gray-100 flex flex-col overflow-hidden">
    <div class="grow flex h-screen">
      <!-- <div class="w-14 bg-stone-500">
        <div class="p-1">
          <img class="w-full rounded" :src="`/img/card-back/event.webp`" alt="Event card back`">
        </div>
        <div class="p-1">
          <img class="w-full rounded" :src="`/img/card-back/fear.webp`" alt="Fear card back`">
        </div>
      </div> -->
      <div class="grid grid-rows-2 grid-cols-1 w-full">
        <div class="bg-neutral-100 flex py-2 px-2">
          <card-group-view v-if="currentMenu1 === MENU_1.PLAY" @swipe-down="putFromDiscardToHand" @swipe-up="forgetCard" class="w-full" :cards="playerCard.play" />
          <control-area v-if="currentMenu1 === MENU_1.CONTROL" class="w-full" />
        </div>
        <div class="bg-stone-300 flex pt-2 px-2">
          <card-group-view @swipe-down="putFromHandToDiscard" @swipe-up="putFromHandToPlay" class="w-full" :cards="playerCard.hand" />
        </div>
      </div>
      <div class="ml-auto grid grid-rows-2 text-white relative x-40">
        <div class="bg-neutral-700 px-2 flex items-center">
          <transition name="switch" mode="out-in">
            <icon-play @click="switchMenu(1)" v-if="currentMenu1 === MENU_1.PLAY" class="w-8 h-8" />
          </transition>
          <transition name="switch" mode="out-in">
            <icon-control @click="switchMenu(1)" v-if="currentMenu1 === MENU_1.CONTROL" class="w-8 h-8" />
          </transition>
        </div>
        <div class="flex items-center bg-stone-900 px-2">
          <icon-cards class="w-8 h-8" />
        </div>
      </div>
    </div>
    <div id="modal">
      <modal-discard-common v-if="modalDiscard.type === 'common'" />
      <card-zoom-modal v-if="cardZoom.isShow" />
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
.switch-enter-to, .switch-leave-from {
  opacity: 1;
  transform: translateX(0px);
}
</style>
