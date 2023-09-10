import { defineStore } from 'pinia'
import { useMessageStore } from './MessageStore'
import { removeCard, shuffle } from '@/utils'
import { INVADER_CARD } from '@/constant'
const POS_DEFAULT = '111222233333'
export const useInvaderCardStore = defineStore('invaderCardStore', {
  state: () => ({
    draw: [] as string[],
    explore: [] as string[],
    build: [] as string[],
    ravage: [] as string[],
    extraBuild: null as string[] | null,
    discard: [] as string[],
    hidden: [] as string[], // days that never were
    box: [[], [], []] as string[][],
    pos: POS_DEFAULT,
    lock: [] as Array<'build' | 'ravage'>,
  }),
  getters: {
    getBackCardTop(state) {
      if (state.draw.length === 0) return 'Empty'
      const stage = parseInt(state.draw[state.draw.length - 1].split('-')[1])
      if (stage === 1) return 'I'
      if (stage === 2) return 'II'
      return 'III'
    },
    getStage(state) {
      return parseInt(state.draw[state.draw.length - 1].split('-')[1])
    },
    exploreView(state) {
      return compile(state.explore)
    },
    buildView(state) {
      return compile(state.build)
    },
    ravageView(state) {
      return compile(state.ravage)
    },
    extraBuildView(state) {
      if (!state.extraBuild) return null
      return compile(state.extraBuild)
    },
    discardView(state) {
      return state.discard.slice().reverse()
    },
    drawView(state) {
      return state.draw.slice().reverse().map((card) => {
        const stage = parseInt(card.split('-')[1])
        return {
          stage,
          name: card,
        }
      })
    },
    canNext(state) {
      return state.explore.length > 0 || state.build.length > 0 || state.ravage.length > 0 || (state.extraBuild !== null && state.extraBuild.length > 0)
    },
    isShowHabsburg(state) {
      return state.explore.length === 0 && state.draw.length === 6
    },
  },
  actions: {
    newDeck(pos = POS_DEFAULT) {
      this.draw = []
      this.explore = []
      this.build = []
      this.ravage = []
      this.extraBuild = null
      this.discard = []
      this.box = [[], [], []]
      this.pos = pos
      this.lock = []
      const shuffled = [
        [...(shuffle(INVADER_CARD[0]) as string[])],
        [...(shuffle(INVADER_CARD[1]) as string[])],
        [...(shuffle(INVADER_CARD[2]) as string[])],
      ]
      const deck = [] as string[]

      //Habsburg Mining setup
      //Scotland setup
      if (pos.includes('C') || pos.includes('D')) { 
        removeCard(shuffled[1] as string[], 'C-2')
      }

      Array.from(this.pos.replace('C', '').replace('D', '')).forEach((pos) => {
        const card = shuffled[parseInt(pos) - 1].pop()
        if (!card) {
          console.error('Some thing went wrong')
          return
        }
        deck.push(card)
      })

      //Scotland setup
      if (pos.includes('C')) {
        deck.splice(deck.length - 5, 0, 'C-2')
      }

      //Habsburg Mining setup
      if (pos.includes('D')) {
        deck.splice(deck.length - 7, 0, 'D-2')
      }

      this.draw = deck.slice().reverse()
      this.box = [...shuffled]
    },
    doExplore() {
      if (this.draw.length === 0) {
        useMessageStore().setMessage('End of time. Invaders win.')
        return
      }
      this.explore.push(this.draw.pop() as string)
    },
    next() {
      let build = [...this.build]
      let ravage = [...this.ravage]
      const hasSaltDeposits = ravage.includes('D-2')
      if (this.lock.includes('build')) {
        build = []
      } else {
        this.build = []
      }
      if (this.lock.includes('ravage')) {
        ravage = []
      } else {
        this.ravage = []
      }
      if (this.extraBuild !== null) {
        this.discard = [...this.discard, ...this.extraBuild]
        this.extraBuild = [...ravage]
      } else {
        this.discard = [...this.discard, ...ravage]
      }
      this.ravage = [...this.ravage, ...build]
      if (hasSaltDeposits) {
        this.ravage.push('D-2')
        removeCard(this.discard, 'D-2')
      }
      this.build = [...this.build, ...this.explore]
      this.explore = []
      this.lock = []
    },
    reShuffle() {
      let pos = this.pos.slice(-this.draw.length)
      const draw = this.draw.slice().reverse()
      const raw: Array<Array<string>> = [
        [...this.box[0]],
        [...this.box[1]],
        [...this.box[2]],
      ]
      //check if deck has not changed
      for (let i = 0; i < draw.length; i++) {
        const stage = draw[i].split('-')[1]
        if (stage === '2' && (pos[i] === 'C' || pos[i] === 'D')) {
          continue
        }
        if (parseInt(stage) !== parseInt(pos[i])) {
          useMessageStore().setMessage(
            'Deck has changed. Cannot reset the deck.',
          )
          return
        }
        raw[parseInt(stage) - 1].push(draw[i])
      }

      const shuffled = [
        [...(shuffle(raw[0]) as string[])],
        [...(shuffle(raw[1]) as string[])],
        [...(shuffle(raw[2]) as string[])],
      ]
      const deck = [] as string[]
      Array.from(pos).forEach((pos) => {
        if (pos === 'C') {
            deck.push('C-2')
            return
        }
        if (pos === 'D') {
            deck.push('D-2')
            return
        }
        const card = shuffled[parseInt(pos) - 1].pop()
        if (!card) {
          console.error('Some thing went wrong')
          return
        }
        deck.push(card)
      })

      this.draw = deck.slice().reverse()
      this.box = [...shuffled]
      useMessageStore().setMessage('Invader deck shuffled as setup')
    },
    lockToggle(type: 'build' | 'ravage') {
      if (this.lock.includes(type)) {
        removeCard(this.lock, type)
      } else {
        this.lock.push(type)
      }
    },
    doRussia(stage: number) {
      const card = this.box[stage - 1].pop()
      if (!card) {
        console.error('Some thing went wrong')
        return
      }
      this.build.push(card)
      useMessageStore().setMessage(`Added Stage ${stage} Invader Card to Build`)
    },
    doSweden() {
      const card = this.draw.pop() as string
      this.discard.push(card)
      return card
    },
    visionShuffle() {
      if (this.draw.length >= 2) {
        if (Math.random() < 0.5) {
          const lastIndex = this.draw.length - 1
          const secondLastIndex = this.draw.length - 2
    
          const temp = this.draw[lastIndex]
          this.draw[lastIndex] = this.draw[secondLastIndex]
          this.draw[secondLastIndex] = temp
        }
      }
    },
    visionBottom() {
      const card = this.draw.pop()
      if (card) {
        this.draw.unshift(card)
      }
    },
    swapInvaderCard(swap: string) {
      const card = this.draw.pop()
      if (card === 'D-2') {
        this.draw.push(card)
        useMessageStore().setMessage('Salt Deposits cannot be swapped')
      }
      if (card) {
        this.discard.push(card)
        this.hidden.push(card)
        removeCard(this.discard, swap)
        this.draw.push(swap)
        removeCard(this.hidden, swap)
        useMessageStore().setMessage('Invader Card swapped')
      } else {
        useMessageStore().setMessage('No Invader Card to swap')
      }
    }
  },
  persist: true,
})

function compile(deck: string[]) {
  const _deck = deck.map((card) => {
    const [land, stage] = card.split('-')
    if (parseInt(stage) === 2) {
      return land + stage
    }
    if (parseInt(stage) === 3) {
      return [land[0], land[1]]
    }
    return land
  })
  return _deck.flat()
}
