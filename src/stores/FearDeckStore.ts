import { defineStore } from "pinia"
import { FEAR_CARDS } from "@/constant"
import { removeCard, shuffle } from "@/utils"
export const useFearDeckStore = defineStore('fearDeck', {
  state: () => ({
    draw: [] as string[],
    earned: [] as string[],
    fearStage: [3, 3, 3] as number[],
    showing: [] as string[],
    discard: [] as string[],
    currentReveal: null as string | null,
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
      const totalCard = state.draw.length
      const stage_2 = state.fearStage[0] + state.fearStage[1]
      const stage_3 = state.fearStage[0]
      if (totalCard > stage_2) {
        return 1
      }
      if (totalCard > stage_3) {
        return 2
      }
      return 3
    },
    numberCardNeedToStage2(state) {
      const totalCard = state.draw.length
      const stage_2 = state.fearStage[0] + state.fearStage[1]
      return totalCard - stage_2
    },
    numberCardNeedToStage3(state) {
      const totalCard = state.draw.length
      const stage_3 = state.fearStage[0]
      return totalCard - stage_3
    },
    canShowEarned(state) {
      return state.earned.length > 0
    },
    canShowDiscard(state) {
      return state.discard.length > 0
    },
    isAvailable(state) {
      return state.draw.length > 0
    },
  },
  actions: {
    newDeck(fearStage?: number[], numberSpirit?: number, hasEngland6 = false) {
      if (fearStage) {
        this.fearStage = [...fearStage]
      } else {
        this.fearStage = [3, 3, 3]
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
      this.earned = []
      this.showing = []
      this.discard = []
      this.currentFear = 0
      if (numberSpirit) {
        this.maxFear = numberSpirit * 4
      } else {
        this.maxFear = 4
      }
      if (hasEngland6) {
        this.maxFear += numberSpirit || 1
      }
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
    setReveal(card: string) {
      this.currentReveal = card
    },
    markShowing() {
      if (this.currentReveal) {
        this.showing.push(this.currentReveal)
      }
      this.currentReveal = null
    },
    addToShowing(card: string) {
      this.showing.push(card)
    },
    markDiscard() {
      if (this.currentReveal) {
        removeCard(this.earned, this.currentReveal)
        this.discard.push(this.currentReveal)
      }
      this.currentReveal = null
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
    increaseFear() {
      this.currentFear++
      if (this.currentFear >= this.maxFear) {
        this.currentFear = 0
        this.earn()
        return
      }
    },
    decreaseFear() {
      this.currentFear--
      if (this.currentFear <= 0) {
        this.currentFear = this.maxFear
        this.unEarn()
        return
      }
    }
  },
  persist: true,
})
