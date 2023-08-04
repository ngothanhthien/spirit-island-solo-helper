import { defineStore } from "pinia";
import { ADVERSARY, SPIRIT } from "@/constant";
import type { Aspect } from "@/types";

export const useGameOptionStore = defineStore("gameOption", {
  state: () => ({
    numberSpirit: undefined as undefined | number,
    spirits: [] as number[],
    aspects: [] as number[],
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
    },
    hasRussia5(state) {
      return ADVERSARY[state.adversary as number].id === 'russia' && state.adversaryLevel >= 5
    },
    hasHabsburg5(state) {
      return ADVERSARY[state.adversary as number].id === 'habsburg' && state.adversaryLevel >= 5
    },
    hasSweden4(state) {
      return ADVERSARY[state.adversary as number].id === 'sweden' && state.adversaryLevel >= 4
    },
    aspectsDetail(state) {
      const spiritsRawAspect = state.spirits.map((spiritIndex) => SPIRIT[spiritIndex].aspects)
      return state.aspects.map((aspectIndex, index) => {
        if (aspectIndex === -1) {
          return null
        }
        const aspects = spiritsRawAspect[index] as Aspect[]
        return aspects[aspectIndex]
      })
    }
  },
  actions: {
    setSetupState(option: {
      numberSpirit: number;
      spirits: number[];
      islands: number[];
      adversary: number;
      adversaryLevel: number;
      aspects: number[];
    }) {
      this.numberSpirit = option.numberSpirit;
      this.spirits = option.spirits;
      this.islands = option.islands;
      this.adversary = option.adversary;
      this.adversaryLevel = option.adversaryLevel;
      this.aspects = option.aspects;
    },
  },
  persist: true,
});
