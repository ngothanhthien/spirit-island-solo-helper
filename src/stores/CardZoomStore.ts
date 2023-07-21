import { defineStore } from "pinia";

export const useCardZoomStore = defineStore('cardZoom', {
  state: () => ({
    current: null as null | string,
    waiting: {} as {
      from: 'pick' | 'discard' | 'hand' | 'play' | null,
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
    setZoom(card: string, deck: string[], from: 'pick' | 'discard' | 'hand' | 'play') {
      this.current = card
      this.deck = [...deck]
      this.waiting.from = from
    },
    reset() {
      this.current = null
      this.waiting = {
        from: null,
        card: null
      }
      this.deck = []
    },
    setWaiting(card: string) {
      this.waiting = {
        card,
        from: this.waiting.from
      }
    },
    getWaiting() {
      const card = this.waiting.card
      this.waiting = {
        card: null,
        from: null
      }
      return card
    }
  },
})
