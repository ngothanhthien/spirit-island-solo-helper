import { defineStore } from "pinia"
import { EVENT_CARDS } from "@/constant"
import { shuffle } from "@/utils"
export const useEventDeckStore = defineStore('event', {
  state: () => ({
    draw: [] as string[],
    discard: [] as string[],
    current: null as string | null,
  }),
  actions: {
    newDeck() {
      const unShuffle = Array.from(Array(EVENT_CARDS.length).keys())
      const shuffled = shuffle(unShuffle)
      this.draw = shuffled.map(i => `event-${i}`)
    },
    popEvent () {
      const popped = this.draw.pop()
      if (popped) {
        this.discard.push(popped)
        return popped
      }
    },
    shuffle() {
      this.draw = shuffle(this.draw) as string[]
    },
    remove () {
      const removed = this.draw.pop()
      if (removed) {
        return removed
      }
    },
    putUnderTwoTopCard () {
      if (this.draw.length > 2) {
        const lastItem = this.draw.pop()
        if (lastItem) {
          this.draw.splice(this.draw.length - 2, 0, lastItem)
          return lastItem
        }
      }
    },
    reveal() {
      const cardId = this.draw[this.draw.length - 1]
      this.current = this.draw[this.draw.length - 1]
      return cardId
    },
    hide() {
      this.current = null
    }
  },
})
