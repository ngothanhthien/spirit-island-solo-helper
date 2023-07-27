import { defineStore } from 'pinia'
import { removeCard } from '@/utils'
import type { Element, Player, PowerCard } from '@/types'
import { getCard } from '@/utils'

function createPlayer(): Player {
  return {
    hand: [],
    discard: [],
    play: [],
    used: [],
    picking: [],
    forget: [],
    energy: 0,
    permanentElements: createDefaultElement(),
  }
}
function createDefaultElement() {
  return {
    'Sun': 0,
    'Moon': 0,
    'Fire': 0,
    'Air': 0,
    'Water': 0,
    'Earth': 0,
    'Plant': 0,
    'Animal': 0,
  }
}
export const usePlayerCardStore = defineStore('playerCard', {
  state: () => ({
    current: 0,
    players: [] as Player[],
  }),
  getters: {
    hand(state) {
      return state.players[state.current].hand
    },
    discard(state) {
      return state.players[state.current].discard
    },
    play(state) {
      return state.players[state.current].play
    },
    used(state) {
      return state.players[state.current].used
    },
    picking(state) {
      return state.players[state.current].picking
    },
    forget(state) {
      return state.players[state.current].forget
    },
    isPicking(state) {
      return state.players[state.current].picking.length > 0
    },
    getTypePicking(state) {
      const card = state.players[state.current].picking[0]
      return card?.split('-')[0]
    },
    elements(state) {
      const elements = createDefaultElement()
      state.players[state.current].play.forEach((id) => {
        const card = getCard(id) as PowerCard
        if (card) {
          card.elements.forEach((element) => {
            elements[element]++
          })
        }
      })
      Object.entries(state.players[state.current].permanentElements).forEach(([key, value]) => {
        elements[key as Element] += value
      })
      return elements
    },
    permanentElements(state) {
      return state.players[state.current].permanentElements
    },
    energyCost(state) {
      let cost = 0
      state.players[state.current].play.forEach((id) => {
        const card = getCard(id) as PowerCard
        if (card) {
          cost += card.cost
        }
      })
      return cost
    },
    energy(state) {
      return state.players[state.current].energy
    },
  },
  actions: {
    reset() {
      this.current = 0
      this.players = []
    },
    addPlayer() {
      this.players.push(createPlayer())
      return this.players.length - 1
    },
    changeCurrent(index: number) {
      this.current = index
    },
    reclaim() {
      const player = this.players[this.current]
      player.hand = [...player.hand, ...player.discard]
      player.discard = []
    },
    reclaimOneCard(card: string) {
      const player = this.players[this.current]
      removeCard(player.discard, card)
      player.hand.push(card)
    },
    cleanUp() {
      this.players.forEach((player) => {
        player.discard = [...player.discard, ...player.play]
        player.play = []
        player.used = []
      })
    },
    setHand(cards: string[]) {
      this.players[this.current].hand = [...cards]
    },
    take(card: string) {
      this.players[this.current].hand.push(card)
    },
    playCard(card: string) {
      const cardData = getCard(card) as PowerCard
      const player = this.players[this.current]
      if (cardData.cost <= player.energy) {
        player.energy -= cardData.cost
        removeCard(player.hand, card)
        player.play.push(card)
      }
    },
    putCardInDiscard(card: string) {
      const player = this.players[this.current]
      removeCard(player.hand, card)
      player.discard.push(card)
    },
    returnCardFromPlay(card: string) {
      const player = this.players[this.current]
      const cardData = getCard(card) as PowerCard
      player.energy += cardData.cost
      removeCard(player.play, card)
      player.hand.push(card)
    },
    removeCardFromPlay(card: string) {
      removeCard(this.players[this.current].play, card)
    },
    toggleUseCard(card: string) {
      const player = this.players[this.current]
      if (player.used.includes(card)) {
        removeCard(player.used, card)
      } else {
        player.used.push(card)
      }
    },
    addToPlay(card: string) {
      this.players[this.current].play.push(card)
    },
    forgetCardFromHand(card: string) {
      const player = this.players[this.current]
      removeCard(player.hand, card)
      player.forget.push(card)
    },
    forgetCardFromDiscard(card: string) {
      const player = this.players[this.current]
      removeCard(player.discard, card)
      player.forget.push(card)
    },
    returnCardFromForget(card: string) {
      const player = this.players[this.current]
      removeCard(player.forget, card)
      player.hand.push(card)
    },
    addToPicking(card: string) {
      this.players[this.current].picking.push(card)
    },
    takeCardFromPicking(card: string) {
      removeCard(this.players[this.current].picking, card)
      this.players[this.current].hand.push(card)
    },
    putCardToPicking(card: string) {
      const player = this.players[this.current]
      removeCard(player.hand, card)
      player.picking.push(card)
    },
    removeCardFromPicking(card: string) {
      removeCard(this.players[this.current].picking, card)
    },
    resetPicking() {
      this.players[this.current].picking = []
    },
    putFromPlayToDiscard(card: string) {
      const player = this.players[this.current]
      removeCard(player.play, card)
      player.discard.push(card)
    },
    setEnergy(energy: number) {
      this.players[this.current].energy = energy
    },
    addEnergy() {
      this.players[this.current].energy++
    },
    reduceEnergy() {
      if(this.players[this.current].energy > 0) {
        this.players[this.current].energy--
      }
    },
    increaseElement(element: Element) {
      (this.players[this.current].permanentElements[element] as number)++
    },
    decreaseElement(element: Element) {
      if(this.players[this.current].permanentElements[element] as number > 0)
      {
        (this.players[this.current].permanentElements[element] as number)--
      }
    }
  },
  persist: true,
})
