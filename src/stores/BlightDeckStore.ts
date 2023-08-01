import { defineStore } from 'pinia'
import { BLIGHT_CARDS } from '@/constant'
import { getCard, shuffle } from '@/utils'
import type { BlightCard } from '@/types'
export const useBlightDeckStore = defineStore('blightDeck', {
  state: () => ({
    draw: [] as string[],
    current: null as string | null,
  }),
  getters: {
    isAvailable(state) {
      return state.draw.length > 0
    },
    isBlighted(state) {
      if (state.current === null) {
        return false
      }
      const card = getCard(state.current) as BlightCard
      return card.isBlighted
    },
  },
  actions: {
    newDeck() {
      const unShuffle = Array.from(Array(BLIGHT_CARDS.length).keys())
      const shuffled = shuffle(unShuffle)
      this.draw = shuffled.map((i) => `blight-${i}`)
      this.current = null
    },
    turnUp() {
      const card = this.draw.pop() as string
      this.current = card
      const blightCard = getCard(card) as BlightCard
      if (blightCard.setup) {
        blightCard.setup()
      }
    },
  },
  persist: true,
})
