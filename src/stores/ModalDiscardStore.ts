import { removeCard } from "@/utils";
import { defineStore } from "pinia";

export const useModalDiscardStore = defineStore('modalDiscard', {
  state: () => ({
    deck: [] as string[],
  }),
  getters: {
    getDeck(state) {
      return state.deck.reverse()
    },

    getType(state) {
      if (state.deck.length === 0) {
        return null
      }

      const card = state.deck[0]
      const type = card.split('-')[0]
      if (type === 'major' || type === 'minor' || type.includes('unique')) {
        return 'power'
      }
      
      return 'common'
    },
  },
  actions: {
    setDeck(deck: string[]) {
      this.deck = [...deck]
    },
    removeFromModal(card: string) {
      removeCard(this.deck, card)
    },
    reset() {
      this.deck = []
    },
  },
})
