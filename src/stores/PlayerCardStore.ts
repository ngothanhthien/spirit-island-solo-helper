import { defineStore } from "pinia";

export const usePlayerCardStore = defineStore('playerCard', {
  state: () => ({
    hand: ['minor-1', 'minor-2', 'minor-1', 'minor-2', 'minor-1', 'minor-2', 'minor-2', 'minor-1', 'minor-2', 'minor-2', 'minor-1', 'minor-2'] as string[],
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
    playCard(card: string) {
      this.hand = this.hand.filter(c => c !== card)
      this.play.push(card)
    },
    putCardInDiscard(card: string) {
      this.hand = this.hand.filter(c => c !== card)
      this.discard.push(card)
    },
    addToPlay(card: string) {
      this.play.push(card)
    }
  },
})
