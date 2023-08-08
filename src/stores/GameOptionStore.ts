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
    hasScotland1(state) {
      return ADVERSARY[state.adversary as number].id === 'scotland' && state.adversaryLevel >= 1
    },
    hasScotland3(state) {
      return ADVERSARY[state.adversary as number].id === 'scotland' && state.adversaryLevel >= 3
    },
    hasScotLand5(state) {
      return ADVERSARY[state.adversary as number].id === 'scotland' && state.adversaryLevel >= 5
    },
    hasScotLand6(state) {
      return ADVERSARY[state.adversary as number].id === 'scotland' && state.adversaryLevel === 6
    },
    hasFranceEvent(state) {
      return ADVERSARY[state.adversary as number].id === 'france' && state.adversaryLevel >= 2
    },
    hasFrance(state) {
      return ADVERSARY[state.adversary as number].id === 'france'
    },
    hasFrance1(state) {
      return ADVERSARY[state.adversary as number].id === 'france' && state.adversaryLevel >= 1
    },
    hasFrance4(state) {
      return ADVERSARY[state.adversary as number].id === 'france' && state.adversaryLevel >= 4
    },
    hasFrance6(state) {
      return ADVERSARY[state.adversary as number].id === 'france' && state.adversaryLevel === 6
    },
    isEngland3(state) {
      return ADVERSARY[state.adversary as number].id === 'england' && state.adversaryLevel === 3
    },
    hasEngland1(state) {
      return ADVERSARY[state.adversary as number].id === 'england' && state.adversaryLevel >= 1
    },
    hasEngland3(state) {
      return ADVERSARY[state.adversary as number].id === 'england' && state.adversaryLevel >= 3
    },
    hasEngland4(state) {
      return ADVERSARY[state.adversary as number].id === 'england' && state.adversaryLevel >= 4
    },
    hasEngland6(state) {
      return ADVERSARY[state.adversary as number].id === 'england' && state.adversaryLevel === 6
    },
    hasRussia1(state) {
      return ADVERSARY[state.adversary as number].id === 'russia' && state.adversaryLevel >= 1
    },
    hasRussia3(state) {
      return ADVERSARY[state.adversary as number].id === 'russia' && state.adversaryLevel >= 3
    },
    hasRussia5(state) {
      return ADVERSARY[state.adversary as number].id === 'russia' && state.adversaryLevel >= 5
    },
    hasRussia6(state) {
      return ADVERSARY[state.adversary as number].id === 'russia' && state.adversaryLevel === 6
    },
    hasHabsburg(state) {
      return ADVERSARY[state.adversary as number].id === 'habsburg'
    },
    hasHabsburg1(state) {
      return ADVERSARY[state.adversary as number].id === 'habsburg' && state.adversaryLevel >= 1
    },
    hasHabsburg2(state) {
      return ADVERSARY[state.adversary as number].id === 'habsburg' && state.adversaryLevel >= 2
    },
    hasHabsburg5(state) {
      return ADVERSARY[state.adversary as number].id === 'habsburg' && state.adversaryLevel >= 5
    },
    hasHabsburg6(state) {
      return ADVERSARY[state.adversary as number].id === 'habsburg' && state.adversaryLevel === 6
    },
    hasMining1(state) {
      return ADVERSARY[state.adversary as number].id === 'habsburg-mining' && state.adversaryLevel >= 1
    },
    hasMining3(state) {
      return ADVERSARY[state.adversary as number].id === 'habsburg-mining' && state.adversaryLevel >= 3
    },
    hasMining5(state) {
      return ADVERSARY[state.adversary as number].id === 'habsburg-mining' && state.adversaryLevel >= 5
    },
    hasMining4(state) {
      return ADVERSARY[state.adversary as number].id === 'habsburg-mining' && state.adversaryLevel >= 4
    },
    hasSweden1(state) {
      return ADVERSARY[state.adversary as number].id === 'sweden' && state.adversaryLevel >= 1
    },
    hasSweden4(state) {
      return ADVERSARY[state.adversary as number].id === 'sweden' && state.adversaryLevel >= 4
    },
    hasSweden5(state) {
      return ADVERSARY[state.adversary as number].id === 'sweden' && state.adversaryLevel >= 5
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
    },
    isHasAspect(state) {
      return state.aspects.length > 0
    },
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
