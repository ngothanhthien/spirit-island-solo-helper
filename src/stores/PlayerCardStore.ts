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
    }
  },
  actions: {
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
    cleanUp() {
      const player = this.players[this.current]
      player.discard = [...player.discard, ...player.play]
      player.play = []
      player.used = []
    },
    setHand(cards: string[]) {
      this.players[this.current].hand = [...cards]
    },
    take(card: string) {
      this.players[this.current].hand.push(card)
    },
    playCard(card: string) {
      const player = this.players[this.current]
      removeCard(player.hand, card)
      player.play.push(card)
    },
    putCardInDiscard(card: string) {
      const player = this.players[this.current]
      removeCard(player.hand, card)
      player.discard.push(card)
    },
    returnCardFromPlay(card: string) {
      const player = this.players[this.current]
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
  },
  persist: true,
})