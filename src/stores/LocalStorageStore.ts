import { defineStore } from 'pinia'
import type { Result, PendingResult, ChartData } from '@/types'

export const useLocalStorageStore = defineStore('localStorage', {
  state: () => ({
    chart: null as ChartData | null,
    pendingResult: [] as PendingResult[]
  }),
  actions: {
    setChart(data: ChartData) {
      this.chart = {
        ...data,
        lastUpdate: new Date()
      }
    },
    addPendingMatchLog(result: Result) {
      this.pendingResult.push({
        createdAt: new Date(),
        offset: new Date().getTimezoneOffset(),
        result,
        id: new Date().getTime()
      })
    },
    removePendingMatchLog(id: number) {
      const index = this.pendingResult.findIndex((result) => result.id === id)
      if (index !== -1) {
        this.pendingResult.splice(index, 1)
      }
    }
  },
  persist: true
})
