import { defineStore } from "pinia";

export const useCardZoomStore = defineStore('cardZoom', {
  state: () => ({
    current: null as null | string,
    waiting: {} as {
      target: 'pick' | 'discard' | null,
      card: string | null
    }, 
    deck: [] as string[],
  }),
  getters: {
    isShow: (state) => state.current !== null,
    canNext: (state) => {
      if (state.current) {
        const index = state.deck.indexOf(state.current)
        return index < state.deck.length - 1
      }
      return false
    },
    canPrevious: (state) => {
      if (state.current) {
        const index = state.deck.indexOf(state.current)
        return index > 0
      }
      return false
    },
  },
  actions: {
    next() {
      if (this.current) {
        const index = this.deck.indexOf(this.current)
        this.current = this.deck[index + 1] || this.deck[0]
      }
    },
    previous() {
      if (this.current) {
        const index = this.deck.indexOf(this.current)
        this.current = this.deck[index - 1] || this.deck[this.deck.length - 1]
      }
    },
    setZoom(card: string, deck: string[], target: 'pick' | 'discard') {
      this.current = card
      this.deck = [...deck]
      this.waiting.target = target
    },
    reset() {
      this.current = null
      this.deck = []
    },
    setWaiting(card: string) {
      this.waiting = {
        card,
        target: this.waiting.target
      }
    },
    getWaiting() {
      const card = this.waiting.card
      this.waiting = {
        card: null,
        target: null
      }
      return card
    }
  },
})
