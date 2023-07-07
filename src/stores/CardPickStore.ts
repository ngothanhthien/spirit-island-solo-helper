import { defineStore } from "pinia";

export const useCardPickStore = defineStore('cardPick', {
  state: () => ({
    deck: [] as string[],
    type: '' as 'minor' | 'major' | '',
    isShow: true,
    pickOnlyFour: true,
  }),
  getters: {
    getDeck(state) {
      return state.deck.reverse()
    },
    getLength(state) {
      return state.deck.length
    }
  },
  actions: {
    setDeck(deck: string[], type: 'minor' | 'major', pickOnlyFour: boolean = true) {
      if(this.deck.length === 0) {  
        this.deck = [...deck]
        this.type = type
        this.pickOnlyFour = pickOnlyFour
        this.isShow = true
      }
    },
    add(card: string) {
      this.deck.push(card)
    },
    reset() {
      this.deck = []
      this.type = ''
      this.pickOnlyFour = true
      this.isShow = true
    },
    show() {
      this.isShow = true
    },
    hide() {
      this.isShow = false
    }
  },
})
