import { defineStore } from "pinia";
import { ADVERSARY } from "@/constant";

export const useGameOptionStore = defineStore("gameOption", {
  state: () => ({
    numberSpirit: undefined as undefined | number,
    spirits: [] as number[],
    islands: [] as number[],
    adversary: undefined as undefined | number,
    adversaryLevel: 0,
  }),
  getters: {
    fearSetup(state) {
      return ADVERSARY[state.adversary as number].fear[state.adversaryLevel];
    },
    hasFranceEvent(state) {
      return ADVERSARY[state.adversary as number].id === 'france' && state.adversaryLevel >= 2
    },
    hasEngland6(state) {
      return ADVERSARY[state.adversary as number].id === 'england' && state.adversaryLevel === 6
    }
  },
  actions: {
    setSetupState(option: {
      numberSpirit: number;
      spirits: number[];
      islands: number[];
      adversary: number;
      adversaryLevel: number;
    }) {
      this.numberSpirit = option.numberSpirit;
      this.spirits = option.spirits;
      this.islands = option.islands;
      this.adversary = option.adversary;
      this.adversaryLevel = option.adversaryLevel;
    },
  },
  persist: true,
});
