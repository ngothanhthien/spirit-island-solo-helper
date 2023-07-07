import { defineStore } from "pinia"
export const useLogStore = defineStore('log', {
  state: () => ({
    logs: [] as Array<{
      message: string
      createdAt: number
      type: 'info' | 'error' | 'success'
    }>,
    isShow: true,
  }),
  getters: { 
    getLogs(state) {
      return state.logs.map((log) => {
        const date = new Date(log.createdAt)
        return {
          ...log,
          createdAt: `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
        }
      })
    }
  },
  actions: {
    toggle() {
      this.isShow = !this.isShow
    },
    add(message: string, type: 'info' | 'error' | 'success' = 'info') {
      this.logs.push({
        message,
        type,
        createdAt: Date.now(),
      })
    },
  },
})
