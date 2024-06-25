import { defineStore } from 'pinia'

export const useGameStateStore = defineStore('gameState', {
  state: () => ({
    isNewGame: false
  })
})
