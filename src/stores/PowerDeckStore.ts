import { defineStore } from 'pinia'
import { MINOR_CARDS, MAJOR_CARDS } from '@/constant'
import { shuffle, removeCard } from '@/utils'

function createDeck() {
  return {
    draw: [] as string[],
    discard: [] as string[],
    forget: [] as string[],
  }
}

function createDeckStore(name: string) {
  return defineStore(`${name}Deck`, {
    state: () => createDeck(),
    getters: {
      isAvailable (state) {
        return state.draw.length > 0
      },
      canShowDiscardPile(state) {
        return state.discard.length > 0
      },
    },
    actions: {
      newDeck() {
        const unShuffle = Array.from(Array(name === 'minor' ? MINOR_CARDS.length : MAJOR_CARDS.length).keys())
        const shuffled = shuffle(unShuffle)
        this.draw = shuffled.map(i => `${name}-${i}`)
      },
      addToDiscard(card: string) {
        this.discard.push(card)
      },
      forget(card: string) {
        this.forget.push(card)
      },
      shuffle() {
        this.draw = shuffle(this.draw) as string[]
      },
      getTopCard() {
        return this.draw.pop()
      },
      reveal() {
        return this.draw.pop() as string
      },
    },
    persist: true,
  })
}

export const usePowerDeckStore = (type: string) => type === 'minor' ? createDeckStore('minor')() : createDeckStore('major')()