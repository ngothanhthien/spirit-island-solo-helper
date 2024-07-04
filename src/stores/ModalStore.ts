import { defineStore } from 'pinia'

export const useModalStore = defineStore('ModalStore', {
  state: () => ({
    panel: false,
    discardPower: false,
    zoomBlightCard: false,
    earnedFear: false,
    fearDeck: false,
    gameSettings: false,
    aspectDetail: false,
    invaderControl: false,
    adversarySetup: false,
    habsburgReminder: false,
    impendingCardModel: false,
    faq: false,
    confirmLog: false,
    adversary: false,
    invaderDraw: false,
    invaderDiscard: false,
    visionsOfAShiftingFutureEvent: false,
    saltDeposit: false,
    visionShiftingFuture: false,
    baseZoom: [] as string[]
  })
})
