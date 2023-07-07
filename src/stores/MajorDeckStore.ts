import { defineStore } from "pinia"
import { MAJOR_CARDS } from "@/constant"
import { shuffle } from "@/utils"
export const useMajorDeckStore = defineStore('majorDeck', {
  state: () => ({
    draw: [] as string[],
    discard: [] as string[],
    forget: [] as string[],
    revealCard: null as string | null,
  }),
  actions: {
    newDeck() {
      const unShuffle = Array.from(Array(MAJOR_CARDS.length).keys())
      const shuffled = shuffle(unShuffle)
      this.draw = shuffled.map(i => `major-${i}`)
    },
    putToDiscard(card: string) {
      this.discard.push(card)
    },
    forget(card: string) {
      this.forget.push(card)
    },
    shuffle() {
      this.draw = shuffle(this.draw) as string[]
    },
    getTopCard() {
      return this.draw.pop()
    },
    reveal() {
      this.revealCard = this.draw.pop() || null
    },
    clearReveal() {
      this.revealCard = null
    },
  },
})
