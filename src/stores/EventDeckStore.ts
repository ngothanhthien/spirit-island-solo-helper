import { defineStore } from 'pinia'
import { EVENT_CARDS } from '@/constant'
import { shuffle } from '@/utils'
export const useEventDeckStore = defineStore('eventDeck', {
  state: () => ({
    draw: [] as string[],
    discard: [] as string[],
    reveal: null as string | null,
    franceEvent: null as number | null,
    isPingEvent: false
  }),
  getters: {
    isAvailable(state) {
      return state.draw.length > 0
    },
    canShowDiscardPile(state) {
      return state.discard.length > 0
    },
    revealDetail(state) {
      const index = state.reveal?.split('-')[1]
      if (index && index !== 'france') {
        return EVENT_CARDS[parseInt(index)]
      }
      return null
    }
  },
  actions: {
    newDeck(hasFranceEvent = false) {
      const unShuffle = Array.from(Array(EVENT_CARDS.length).keys())
      const shuffled = shuffle(unShuffle)
      this.draw = shuffled.map((i) => `event-${i}`)
      this.discard = []
      this.reveal = null
      this.franceEvent = null
      if (hasFranceEvent) {
        this.franceEvent = 1
        this.draw.splice(-3, 0, 'event-france')
      }
    },
    popEvent() {
      const popped = this.draw.pop()
      if (popped) {
        this.discard.push(popped)
        this.reveal = null
        this.isPingEvent = false
        return popped
      }
    },
    shuffle() {
      this.draw = shuffle(this.draw) as string[]
    },
    remove() {
      const removed = this.draw.pop()
      if (removed) {
        return removed
      }
    },
    putUnderTwoTopCard() {
      if (this.draw.length > 2) {
        const lastItem = this.draw.pop()
        if (lastItem) {
          this.draw.splice(-2, 0, lastItem)
          this.reveal = null
          this.isPingEvent = false
          return lastItem
        }
      }
    },
    revealEvent() {
      this.reveal = this.draw[this.draw.length - 1]
      this.isPingEvent = true
    },
    doFranceEvent() {
      if (!this.franceEvent) {
        return
      }
      if (this.franceEvent === 1) {
        const lastItem = this.draw.pop()
        if (lastItem) {
          this.draw.splice(-4, 0, lastItem)
        }
        this.revealEvent()
        this.franceEvent = 2
        return
      }
      if (this.franceEvent === 2) {
        this.franceEvent = null
        this.popEvent()
        this.revealEvent()
      }
    }
  },
  persist: true
})
