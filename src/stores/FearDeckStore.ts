import { defineStore } from "pinia"
import { FEAR_CARDS } from "@/constant"
import { shuffle } from "@/utils"
export const useFearDeckStore = defineStore('fearDeck', {
  state: () => ({
    draw: [] as string[],
    discard: [] as string[],
    earned: [] as string[],
    fearStage: [3, 3, 3] as number[]
  }),
  getters: {
    totalEarned(state) {
      return state.earned.length
    },
    totalCard(state) {
      return state.draw.length
    },
    currentStage(state) {
      const stage_2 = state.fearStage[0] + state.fearStage[1]
      const stage_3 = state.fearStage[0]
      if (this.totalCard > stage_2) {
        return 1
      }
      if (this.totalCard > stage_3) {
        return 2
      }
      return 3
    },
  },
  actions: {
    newDeck() {
      const unShuffle = Array.from(Array(FEAR_CARDS.length).keys())
      const shuffled = shuffle(unShuffle)
      this.draw = shuffled.map(i => `fear-${i}`)
    },
    shuffle() {
      this.draw = shuffle(this.draw) as string[]
    },
    removeTop () {
      return this.draw.pop()
    },
    returnToTop () {
      const card = this.earned.pop()
      if (card) {
        this.draw.push(card)
      }
      return card
    },
    reveal() {
      return this.earned.shift()
    },
  },
})
