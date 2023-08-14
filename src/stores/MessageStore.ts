import { defineStore } from 'pinia'

export const useMessageStore = defineStore('messageStore', {
  state: () => ({
    message: null as string | null,
    timeoutId: null as number | null,
  }),
  actions: {
    setMessage(message: string, time = 3000) {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId)
        this.timeoutId = null
      }

      this.message = message
      this.timeoutId = setTimeout(() => {
        this.message = null
        this.timeoutId = null
      }, time) as unknown as number
    },
    clearMessage() {
      if (this.timeoutId) {
        clearTimeout(this.timeoutId)
        this.timeoutId = null
      }
        this.message = null
    },
  },
})
