import { defineStore } from 'pinia'
import { MINOR_CARDS, MAJOR_CARDS } from '@/constant'
import { removeCard, shuffle } from '@/utils'
import { useMessageStore } from './MessageStore'

export const useDiscardPowerStore = defineStore('discardPower', {
  state: () => ({
    discard: [] as string[]
  }),
  getters: {
    isAvailable (state) {
      return state.discard.length > 0
    },
    discardView(state) {
      return state.discard.slice().reverse()
    }
  },
  actions: {
    addToDiscard(card: string) {
      this.discard.push(card)
    },
    removeFromDiscard(card: string) {
      removeCard(this.discard, card)
    },
  },
  persist: true,
})

function createDeck() {
  return {
    draw: [] as string[],
  }
}

function createDeckStore(name: string) {
  const discardPowerStore = useDiscardPowerStore()

  return defineStore(`${name}Deck`, {
    state: () => createDeck(),
    getters: {
      isAvailable (state) {
        return state.draw.length > 0
      },
      canShowDiscardPile() {
        return discardPowerStore.discard.length > 0
      },
    },
    actions: {
      newDeck() {
        const unShuffle = Array.from(Array(name === 'minor' ? MINOR_CARDS.length : MAJOR_CARDS.length).keys())
        const shuffled = shuffle(unShuffle)
        this.draw = shuffled.map(i => `${name}-${i}`)
        discardPowerStore.discard = []
      },
      addToDraw(card: string) {
        this.draw.push(card)
        this.shuffle()
        useMessageStore().setMessage(`Shuffle card back to deck`)
      },
      addToDiscard(card: string) {
        discardPowerStore.addToDiscard(card)
      },
      removeFromDiscard(card: string) {
        discardPowerStore.removeFromDiscard(card)
      },
      shuffle() {
        this.draw = shuffle(this.draw) as string[]
      },
      reveal() {
        return this.draw.pop() as string
      },
    },
    persist: true,
  })
}

export const usePowerDeckStore = (type: string) => type === 'minor' ? createDeckStore('minor')() : createDeckStore('major')()