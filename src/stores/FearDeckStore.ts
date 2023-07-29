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
    drawView(state) {
      return state.draw.slice().reverse()
    },
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
    currentStageRoman() {
      if (this.currentStage === 1) {
        return 'I'
      }
      if (this.currentStage === 2) {
        return 'II'
      }
      if (this.currentStage === 3 && this.draw.length === 0) {
        return 'Win'
      }
      return 'III'
    },

    numberCardNeedToStage2(state) {
      const totalCard = state.fearStage.reduce((a, b) => a + b, 0)
      const leftCard = state.draw.length
      const stage_2 = state.fearStage[0]
      return stage_2 - (totalCard - leftCard)
    },
    numberCardNeedToStage3(state) {
      const totalCard = state.fearStage.reduce((a, b) => a + b, 0)
      const leftCard = state.draw.length
      const stage_3 = state.fearStage[0] + state.fearStage[1]
      return stage_3 - (totalCard - leftCard)
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
      if (this.draw.length === 0) {
        return
      }
      this.currentFear++
      if (this.currentFear >= this.maxFear) {
        this.currentFear = 0
        this.earn()
        return
      }
    },
    decreaseFear() {
      this.currentFear--
      if (this.currentFear <= 0 && this.earned.length > 0) {
        this.currentFear = this.maxFear
        this.unEarn()
        return
      }
    }
  },
  persist: true,
})
