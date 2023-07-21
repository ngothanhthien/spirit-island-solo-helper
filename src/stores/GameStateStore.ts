import { defineStore } from "pinia"
import { PHASE_ENUM } from "@/constant"
export const useGameStateStore = defineStore('gameState', {
  state: () => ({
    currentRound: 1,
    currentPhase: 0,
  }),
  getters: { 
    currentPhaseName: (state) => {
      return PHASE_ENUM[state.currentPhase]
    }
  },
  actions: {
    nextPhase() {
      if (this.currentPhase < PHASE_ENUM.length - 1) {
        this.currentPhase++
      } else {
        this.currentPhase = 0
        this.currentRound++
      }
    }
  },
  persist: true,
})
