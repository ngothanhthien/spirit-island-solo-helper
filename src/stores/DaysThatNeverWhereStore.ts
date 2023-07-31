import { defineStore } from 'pinia'
export const useDaysThatNeverWereStore = defineStore('daysThatNeverWere', {
  state: () => ({
    minor: [] as string[],
    major: [] as string[],
    current: null as number | null,
    picking: [] as string[],
  }),
  getters: {
  },
  actions: {
    reset() {
        this.minor = []
        this.major = []
        this.picking = []
        this.current = null
    }
  },
  persist: true,
})
