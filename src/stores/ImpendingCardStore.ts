import { defineStore } from "pinia"
import { getCard } from "@/utils";
import type { PowerCard } from "@/types";
import { usePlayerCardStore } from "@/stores/PlayerCardStore";

interface ImpendingCard {
    card: string,
    energy: number,
}

export const useImpendingCardStore = defineStore("impendingCardStore", {
  state: () => ({
    cards: [] as ImpendingCard[],
    index: null as number | null,
  }),
  getters: {
    canAutoPlay: (state) => {
      return state.cards.some(({ card, energy }) => {
        const cardDetail = getCard(card) as PowerCard
        return cardDetail.cost <= energy
      })
    },
    cardIds(state) {
      return state.cards.map(card => card.card)
    },
    cardsDeck(state) {
        return state.cards.reverse()
    },
    hasImpendingFeature(state) {
      const playerCardStore = usePlayerCardStore()
      return state.index === playerCardStore.current
    }
  },
  actions: {
    clear() {
      this.cards = []
      this.index = null
    },
    add(card: string, energy: number) {
      this.cards.push({ card, energy })
    },
    allPlusOne() {
      this.cards.forEach(card => card.energy++)
    },
    autoPlay() {
      for(let i = 0; i < this.cards.length; i++) {
        const { card, energy } = this.cards[i]
        const cardDetail = getCard(card) as PowerCard
        if(cardDetail.cost <= energy) {
          usePlayerCardStore().addCardToPlay(card, this.index as number)
          this.cards.splice(i, 1)
          i--
        }
      }
    },
    increaseEnergy(card: string) {
      const index = this.cards.findIndex(c => c.card === card)
      if(index > -1) {
          this.cards[index].energy ++
      }
    },
    decreaseEnergy(card: string) {
      const index = this.cards.findIndex(c => c.card === card)
      if(index > -1) {
          this.cards[index].energy --
      }
    },
    setIndex(index: number) {
      this.index = index
    }
  },
  persist: true,
});