import { defineStore } from 'pinia'
import { changePosition, getCard, insertAfter, insertBefore, removeCard } from '@/utils'
import type { Element, Player, PowerCard, Presence } from '@/types'
import { useMessageStore } from './MessageStore'
import { useDiscardPowerStore } from './PowerDeckStore'
import { EXTRA_INNATE, SPIRIT } from '@/constant'
import { useGameOptionStore } from '@/stores/GameOptionStore'
import { useSpiritInfo } from '@/composable/useSpiritInfo'
import { useAnyElement } from '@/components/AnyElement/functional'

function createPlayer(index: number): Player {
  const { cards, panel, innate } = SPIRIT[index]
  const hand: string[] = []
  for (let i = 0; i < cards.length; i++) {
    hand.push(`unique${index}-${i}`)
  }
  let totalCardPlay = 0
  let income = 0
  if (panel) {
    const { energy, cardPlay, presences } = panel
    totalCardPlay = cardPlay
    income = energy
  }

  return {
    hand,
    discard: [],
    play: [],
    used: [],
    picking: [],
    energy: 0,
    energyThisTurn: 0,
    permanentElements: createDefaultElement(),
    showAspect: true,
    aspectMode: '1x',
    hasTakeIncome: false,
    disk: [],
    totalCardPlay,
    income,
    innate: innate ?? [],
    saved: []
  }
}
function createDefaultElement(): { [K in Element]: number } {
  return {
    Any: 0,
    Sun: 0,
    Moon: 0,
    Fire: 0,
    Air: 0,
    Water: 0,
    Earth: 0,
    Plant: 0,
    Animal: 0
  }
}

export const usePlayerCardStore = defineStore('playerCard', {
  state: () => ({
    current: 0,
    players: [] as Player[]
  }),
  getters: {
    hand(state) {
      return state.players[state.current].hand
    },
    discard(state) {
      return state.players[state.current].discard
    },
    play(state) {
      const unused = state.players[state.current].play.filter((card) => !state.players[state.current].used.includes(card))
      return [...state.players[state.current].used, ...unused]
    },
    used(state) {
      return state.players[state.current].used
    },
    picking(state) {
      return state.players[state.current].picking.slice().reverse()
    },
    showAspect(state) {
      return state.players[state.current].showAspect
    },
    aspectMode(state) {
      return state.players[state.current].aspectMode
    },
    isPicking(state) {
      return state.players[state.current].picking.length > 0
    },
    getTypePicking(state) {
      const card = state.players[state.current].picking[0]
      return card?.split('-')[0]
    },
    elements(state) {
      const elements = createDefaultElement()
      state.players[state.current].play.forEach((id) => {
        const card = getCard(id) as PowerCard
        if (card) {
          card.elements.forEach((element) => {
            elements[element]++
          })
        }
      })
      Object.entries(state.players[state.current].permanentElements).forEach(([key, value]) => {
        elements[key] += value || 0
      })
      const { elements: extra } = useAnyElement()
      extra.value.forEach((e) => {
        if (e !== 'Any') {
          elements[e]++
        }
      })
      return elements
    },
    permanentElements(state) {
      return state.players[state.current].permanentElements
    },
    energy(state) {
      return state.players[state.current].energy
    },
    energyThisTurn(state) {
      return state.players[state.current].energyThisTurn
    },
    canReclaim(state) {
      const player = state.players[state.current]
      return player.hand.length === 0 && player.play.length === 0 && player.discard.length > 0
    },
    disk(state) {
      return state.players[state.current].disk
    },
    rawIndex(state) {
      return useGameOptionStore().spirits[state.current]
    },
    hasTakeIncome(state) {
      return state.players[state.current].hasTakeIncome
    },
    income(state) {
      return state.players[state.current].income
    },
    innate(state) {
      return state.players[state.current].innate
    },
    saved(state) {
      return state.players[state.current].saved
    }
  },
  actions: {
    reset() {
      this.current = 0
      this.players = []
    },
    addPlayer(spiritIndex: number) {
      this.players.push(createPlayer(spiritIndex))
      const index = this.players.length - 1
      this.current = index
      const rawIndex = useGameOptionStore().spirits[index]
      const { setup } = SPIRIT[rawIndex]
      if (setup) {
        setup(index)
      }
    },
    changeCurrent(index: number) {
      this.current = index
    },
    reclaim() {
      const player = this.players[this.current]
      player.hand = [...player.hand, ...player.discard]
      player.discard = []
      useMessageStore().setMessage('Reclaim cards')
    },
    reclaimOneCard(card: string) {
      const player = this.players[this.current]
      removeCard(player.discard, card)
      player.hand.push(card)
    },
    cleanUp() {
      this.players.forEach((player) => {
        player.discard = [...player.discard, ...player.play]
        player.play = []
        player.used = []
        player.energyThisTurn = 0
        player.hasTakeIncome = false
      })
    },
    take(card: string) {
      this.players[this.current].hand.push(card)
    },
    playCard(card: string, posId: { id: string; isFront: boolean } | undefined = undefined) {
      const cardData = getCard(card) as PowerCard
      const player = this.players[this.current]
      if (cardData.cost <= player.energy) {
        player.energy -= cardData.cost
        removeCard(player.hand, card)
        player.play.push(card)
        if (posId) {
          changePosition(player.play, card, posId)
        }
      } else {
        useMessageStore().setMessage('Not enough energy')
      }
    },
    addCardToPlay(card: string, playerIndex: number | undefined = undefined) {
      const player = this.players[playerIndex || this.current]
      player.play.push(card)
    },
    putCardInDiscard(card: string) {
      const player = this.players[this.current]
      removeCard(player.hand, card)
      player.discard.push(card)
    },
    returnCardFromPlay(card: string, posId: { id: string; isFront: boolean } | undefined = undefined) {
      const player = this.players[this.current]
      const cardData = getCard(card) as PowerCard
      player.energy += cardData.cost
      removeCard(player.play, card)
      removeCard(player.used, card)
      player.hand.push(card)
      if (posId) {
        changePosition(player.hand, card, posId)
      }
    },
    forgetCardFromHand(card: string) {
      const player = this.players[this.current]
      removeCard(player.hand, card)
      useDiscardPowerStore().discard.push(card)
      useMessageStore().setMessage('Forget card')
    },
    removeCardFromHand(card: string, playerIndex: number | undefined = undefined) {
      const player = this.players[playerIndex || this.current]
      removeCard(player.hand, card)
    },
    forgetCardFromDiscard(card: string) {
      const player = this.players[this.current]
      removeCard(player.discard, card)
      useDiscardPowerStore().discard.push(card)
      useMessageStore().setMessage('Forget card')
    },
    addToPicking(card: string) {
      this.players[this.current].picking.push(card)
    },
    takeCardFromPicking(card: string) {
      removeCard(this.players[this.current].picking, card)
      this.players[this.current].hand.push(card)
    },
    putCardToPicking(card: string) {
      const player = this.players[this.current]
      removeCard(player.hand, card)
      player.picking.push(card)
    },
    removeCardFromPicking(card: string) {
      removeCard(this.players[this.current].picking, card)
    },
    resetPicking() {
      this.players[this.current].picking = []
    },
    putFromPlayToDiscard(card: string) {
      const player = this.players[this.current]
      removeCard(player.play, card)
      removeCard(player.used, card)
      player.discard.push(card)
      useMessageStore().setMessage('Put card in discard')
    },
    addEnergy() {
      this.players[this.current].energy++
      this.players[this.current].energyThisTurn++
    },
    reduceEnergy(playerIndex: number | undefined = undefined) {
      if (this.players[playerIndex ?? this.current].energy > 0) {
        this.players[playerIndex ?? this.current].energy--
        if (this.players[playerIndex ?? this.current].energyThisTurn > 0) {
          this.players[playerIndex ?? this.current].energyThisTurn--
        }
      }
    },
    increaseElement(element: Element) {
      ;(this.players[this.current].permanentElements[element] as number)++
    },
    decreaseElement(element: Element) {
      if ((this.players[this.current].permanentElements[element] as number) > 0) {
        ;(this.players[this.current].permanentElements[element] as number)--
      }
    },
    setShowAspect(value: boolean) {
      this.players[this.current].showAspect = value
    },
    setAspectMode(mode: '1x' | '2x') {
      this.players[this.current].aspectMode = mode
    },
    toggleUsed(card: string) {
      const player = this.players[this.current]
      if (player.used.includes(card)) {
        removeCard(player.used, card)
      } else {
        player.used.push(card)
      }
    },
    changePosition(type: 'hand', card: string, posId: { id: string; isFront: boolean }) {
      const player = this.players[this.current]
      if (posId.id) {
        removeCard(player[type], card)
        if (posId.isFront) {
          insertAfter(player[type], card, posId.id)
        } else {
          insertBefore(player[type], card, posId.id)
        }
      }
    },
    diskClick(index: number) {
      const player = this.players[this.current]
      const { spiritInfo } = useSpiritInfo()
      const panel = spiritInfo.value.panel
      if (!panel) return
      const { presences } = panel
      const hasDisk = player.disk.includes(index)
      if (hasDisk) {
        removeCard(player.disk, index)
      } else {
        player.disk.push(index)
      }
      this.handleDiskEffect(presences[index], hasDisk, panel)
    },
    handleDiskEffect(presence: Presence, hasDisk: boolean, { presences, energy, cardPlay }: { presences: Presence[]; energy: number; cardPlay: number }) {
      const player = this.players[this.current]
      console.log(presence.type)
      switch (presence.type) {
        case 'energy':
          if (hasDisk) {
            let maxIncome = energy
            for (let i = 0; i < player.disk.length; i++) {
              const index = player.disk[i]
              const original = presences[index]
              if (original.type === 'energy') {
                maxIncome = Math.max(maxIncome, original.value as number)
              }
            }
            console.log(maxIncome)
            player.income = maxIncome
          } else {
            console.log(presence.value)
            player.income = presence.value as number
          }
          break
        case 'card-play':
          if (hasDisk) {
            let maxCardPlay = cardPlay
            for (let i = 0; i < player.disk.length; i++) {
              const index = player.disk[i]
              const original = presences[index]
              if (original.type === 'card-play') {
                maxCardPlay = Math.max(maxCardPlay, original.value as number)
              }
            }
            player.totalCardPlay = maxCardPlay
          } else {
            player.totalCardPlay = presence.value as number
          }
          break
        case 'element':
          if (hasDisk) {
            this.decreaseElement(presence.value as Element)
          } else {
            this.increaseElement(presence.value as Element)
          }
          break
        case 'another':
          if (presence.callback) {
            presence.callback(hasDisk)
          }
          break
      }
    },
    takeIncome() {
      const player = this.players[this.current]
      player.hasTakeIncome = true
      player.energy += player.income
      player.energyThisTurn += player.income
    },
    addInnate(name: string, playerIndex: number | undefined = undefined) {
      const player = this.players[playerIndex ?? this.current]
      const innate = EXTRA_INNATE.find((innate) => innate.name === name)
      if (innate) {
        player.innate.push(innate)
      }
    },
    removeInnate(name: string) {
      const player = this.players[this.current]
      const index = player.innate.findIndex((innate) => innate.name === name)
      if (index !== -1) {
        player.innate.splice(index, 1)
      }
    }
  },
  persist: true
})
