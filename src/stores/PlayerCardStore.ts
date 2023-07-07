import { defineStore } from "pinia";

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
    take(card: string) {
      this.hand.push(card)
    },
    setHand(cards: string[]) {
      this.hand = [...cards]
    },
    playCard(card: string) {
      this.hand = this.hand.filter(c => c !== card)
      this.play.push(card)
    },
    putCardInDiscard(card: string) {
      const index = this.hand.indexOf(card)
      if (index > -1) {
        this.hand.splice(index, 1)
      }
      this.discard.push(card)
    },
    addToPlay(card: string) {
      this.play.push(card)
    }
  },
})
