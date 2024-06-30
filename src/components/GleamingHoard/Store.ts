import { defineStore } from 'pinia'
import { usePlayerCardStore } from '@/stores/PlayerCardStore'
import type { Element } from '@/types'
type GleamHoardMap = {
  [key in Exclude<Element, 'Any'>]: boolean
}
const DEFAULT_MAP: GleamHoardMap = {
  Air: false,
  Earth: false,
  Fire: false,
  Water: false,
  Sun: false,
  Moon: false,
  Animal: false,
  Plant: false
}
export const useGleamingHoardStore = defineStore('gleamingHoard', {
  state: () => ({
    current: null as number | null,
    isShowModal: false,
    map: DEFAULT_MAP,
    extra: 0
  }),
  getters: {
    hasGleamingHoard(state) {
      return state.current === usePlayerCardStore().current
    },
    totalTook(state) {
      return Object.values(state.map).filter(Boolean).length + state.extra
    }
  },
  actions: {
    reset() {
      this.map = DEFAULT_MAP
      this.current = null
      this.extra = 0
    },
    showModal() {
      this.isShowModal = true
    },
    hideModal() {
      this.isShowModal = false
    },
    toggleMap(key: string) {
      // @ts-ignore
      this.map[key] = !this.map[key]
    },
    increaseExtra() {
      this.extra++
    },
    decreaseExtra() {
      if (this.extra > 0) {
        this.extra--
      }
    }
  },
  persist: true
})
