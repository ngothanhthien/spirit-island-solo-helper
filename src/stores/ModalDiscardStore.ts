import { defineStore } from "pinia";

export const useModalDiscardStore = defineStore('modalDiscard', {
  state: () => ({
    deck: [] as string[],
    type: '' as 'power' | 'common' | '',
  }),
  getters: {
    getDeck(state) {
      return state.deck.reverse()
    },
  },
  actions: {
    setDeck(deck: string[], type: 'power' | 'common') {
      this.deck = [...deck]
      this.type = type
    },
    reset() {
      this.deck = []
      this.type = ''
    },
  },
})
