import { defineStore } from "pinia"
import { removeCard } from "@/utils"

export const usePlayerCardStore = defineStore('playerCard', {
  state: () => ({
    hand: [] as string[],
    discard: [] as string[],
    play: [] as string[],
    used: [] as string[],
  }),
  actions: {
    reclaim() {
      this.hand = [...this.hand, ...this.discard]
      this.discard = []
    },
    cleanUp() {
      this.discard = [...this.discard, ...this.play]
      this.play = []
      this.used = []
    },
    setHand(cards: string[]) {
      this.hand = [...cards]
    },
    take(card: string) {
      this.hand.push(card)
    },
    playCard(card: string) {
      removeCard(this.hand, card)
      this.play.push(card)
    },
    putCardInDiscard(card: string) {
      removeCard(this.hand, card)
      this.discard.push(card)
    },
    returnCardFromPlay(card: string) {
      removeCard(this.play, card)
      this.hand.push(card)
    },
    removeCardFromPlay(card: string) {
      removeCard(this.play, card)
    },
    toggleUseCard(card: string) {
      if (this.used.includes(card)) {
        removeCard(this.used, card)
      } else {
        this.used.push(card)
      }
    },
    addToPlay(card: string) {
      this.play.push(card)
    },
  },
})
