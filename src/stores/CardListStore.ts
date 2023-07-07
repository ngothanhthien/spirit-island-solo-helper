import { defineStore } from "pinia";

export const useCardListStore = defineStore('cardList', {
  state: () => ({
    deck: [] as string[],
    type: '' as 'power' | 'event' | '',
  }),
  getters: {
    getDeck(state) {
      return state.deck.reverse()
    }
  },
  actions: {
    setDeck(deck: string[], type: 'power' | 'event') {
      this.deck = [...deck]
      this.type = type
    },
    reset() {
      this.deck = []
      this.type = ''
    },
  },
})
