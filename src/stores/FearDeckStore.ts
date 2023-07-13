import { defineStore } from "pinia"
import { FEAR_CARDS } from "@/constant"
import { shuffle } from "@/utils"
export const useFearDeckStore = defineStore('fearDeck', {
  state: () => ({
    draw: [] as string[],
    earned: [] as string[],
    fearStage: [3, 3, 3] as number[],
    showing: [] as string[],
    currentFear: 0,
    maxFear: 0,
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
    canShowEarned(state) {
      return state.earned.length > 0
    },
    isAvailable(state) {
      return state.draw.length > 0
    },
  },
  actions: {
    newDeck(fearStage?: number[]) {
      if (fearStage) {
        this.fearStage = [...fearStage]
      }
      const unShuffle = Array.from(Array(FEAR_CARDS.length).keys())
      const shuffled = shuffle(unShuffle)
      const fearDeck = []
      const totalFearCard = this.fearStage.reduce((a, b) => a + b, 0)
      for (let i = 0; i < totalFearCard; i++) {
        const card = shuffled.pop()
        if (card !== undefined) {
          fearDeck.push(`fear-${card}`)
        }
      }
      this.draw = [...fearDeck]
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
    earn() {
      const card = this.draw.pop()
      if (card) {
        this.earned.push(card)
      }
      return card
    },
    unEarn() {
      const card = this.earned.pop()
      if (card) {
        this.draw.push(card)
      }
      return card
    },
    timePass() {
      this.showing = []
    }
  },
  persist: true,
})
