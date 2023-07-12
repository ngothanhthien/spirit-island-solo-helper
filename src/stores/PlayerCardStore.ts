import { defineStore } from 'pinia'
import { removeCard } from '@/utils'
import type { Player } from '@/types'

function createPlayer(): Player {
  return {
    hand: [],
    discard: [],
    play: [],
    used: [],
  }
}

export const usePlayerCardStore = defineStore('playerCard', {
  state: () => ({
    players: [] as Player[],
  }),
  actions: {
    addPlayer() {
      this.players.push(createPlayer())
      return this.players.length - 1
    },
    reclaim(index: number) {
      this.players[index].hand = [
        ...this.players[index].hand,
        ...this.players[index].discard,
      ]
      this.players[index].discard = []
    },
    cleanUp(index: number) {
      this.players[index].discard = [
        ...this.players[index].discard,
        ...this.players[index].play,
      ]
      this.players[index].play = []
      this.players[index].used = []
    },
    setHand(cards: string[], index: number) {
      this.players[index].hand = [...cards]
    },
    take(card: string, index: number) {
      this.players[index].hand.push(card)
    },
    playCard(card: string, index: number) {
      removeCard(this.players[index].hand, card)
      this.players[index].play.push(card)
    },
    putCardInDiscard(card: string, index: number) {
      removeCard(this.players[index].hand, card)
      this.players[index].discard.push(card)
    },
    returnCardFromPlay(card: string, index: number) {
      removeCard(this.players[index].play, card)
      this.players[index].hand.push(card)
    },
    removeCardFromPlay(card: string, index: number) {
      removeCard(this.players[index].play, card)
    },
    toggleUseCard(card: string, index: number) {
      if (this.players[index].used.includes(card)) {
        removeCard(this.players[index].used, card)
      } else {
        this.players[index].used.push(card)
      }
    },
    addToPlay(card: string, index: number) {
      this.players[index].play.push(card)
    },
  },
})
