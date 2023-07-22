import { defineStore } from "pinia";

type ZoomFrom = 'pick' | 'discard' | 'hand' | 'play' | 'forget' | 'player-discard' | 'player-discard-forget'
export const useCardZoomStore = defineStore('cardZoom', {
  state: () => ({
    current: null as null | string,
    waiting: {} as {
      from: ZoomFrom | null,
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
    setZoom(card: string, deck: string[], from: ZoomFrom) {
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
    setWaiting(from: ZoomFrom | null = null) {
      this.waiting = {
        card: this.current,
        from: from || this.waiting.from
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
