import { defineStore } from 'pinia'
import { useMessageStore } from "@/stores/MessageStore"
import { usePlayerCardStore } from "@/stores/PlayerCardStore"
import {removeCard} from "@/utils";
export const useDaysThatNeverWereStore = defineStore('daysThatNeverWere', {
  state: () => ({
    minor: [] as string[],
    major: [] as string[],
    current: null as number | null,
    isShowModal: false,
  }),
  getters: {
    hasDaysThatNeverWere(state) {
      return state.current === usePlayerCardStore().current
    }
  },
  actions: {
    reset() {
        this.minor = []
        this.major = []
        this.current = null
    },
    add(card: string) {
      const [type] = card.split('-') as ['minor' | 'major']
      usePlayerCardStore().removeCardFromPicking(card)
      this[type].push(card)
      useMessageStore().setMessage('Add card to Days That Never Were')
    },
    takeToHand(card: string) {
      const [type] = card.split('-') as ['minor' | 'major']
      removeCard(this[type], card)
      usePlayerCardStore().take(card)
      this.isShowModal = false
    },
    showModal() {
      this.isShowModal = true
    },
    hideModal() {
      this.isShowModal = false
    }
  },
  persist: true,
})
