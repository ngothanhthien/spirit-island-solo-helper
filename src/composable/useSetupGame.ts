import { computed, type Ref, type UnwrapRef } from 'vue'
import { ADVERSARY, MAP, SPIRIT } from '@/constant'
import router from '@/router'
import { usePowerDeckStore } from '@/stores/PowerDeckStore'
import { useBlightDeckStore } from '@/stores/BlightDeckStore'
import { useDaysThatNeverWereStore } from '@/stores/DaysThatNeverWhereStore'
import { useGameStateStore } from '@/stores/GameStateStore'
import { useInvaderCardStore } from '@/stores/InvaderCardStore'
import { useImpendingCardStore } from '@/stores/ImpendingCardStore'
import { useEventDeckStore } from '@/stores/EventDeckStore'
import { useGameOptionStore } from '@/stores/GameOptionStore'
import { useFearDeckStore } from '@/stores/FearDeckStore'
import { usePlayerCardStore } from '@/stores/PlayerCardStore'

export function useSetupGame(
  spirits: Ref<Array<number>>,
  islands: Ref<Array<number>>,
  aspects: Ref<Array<number>>,
  numberSpirit: Ref<number | undefined>,
  adversary: Ref<number | undefined>,
  adversaryLevel: number
) {
  const canStartGame = computed(() => {
    return (
      numberSpirit.value !== undefined &&
      adversary.value !== undefined &&
      islands.value.length > 0 &&
      spirits.value.length > 0
    )
  })

  function randomSetup() {
    if (numberSpirit.value) {
      islands.value = []
      spirits.value = []
      for (let i = 0; i < numberSpirit.value; i++) {
        randomSpiritAndMap()
      }

      aspects.value = []
      for (let i = 0; i < numberSpirit.value; i++) {
        aspects.value.push(-1)
      }

      randomAdversary()
    }
  }

  async function startGame() {
    const majorDeck = usePowerDeckStore('major')
    const minorDeck = usePowerDeckStore('minor')
    const blightDeck = useBlightDeckStore()
    const gameState = useGameStateStore()
    const invaderCard = useInvaderCardStore()
    const impendingCardStore = useImpendingCardStore()
    const eventDeck = useEventDeckStore()
    const gameOption = useGameOptionStore()
    const fearDeck = useFearDeckStore()
    const playerCard = usePlayerCardStore()

    if (canStartGame.value) {
      gameOption.setSetupState({
        numberSpirit: numberSpirit.value as number,
        adversary: adversary.value as number,
        adversaryLevel: adversaryLevel,
        islands: islands.value,
        spirits: spirits.value,
        aspects: aspects.value
      })
    }

    impendingCardStore.clear()
    blightDeck.newDeck()
    eventDeck.newDeck(gameOption.hasFranceEvent)
    majorDeck.newDeck()
    minorDeck.newDeck()
    const invaderPos =
      ADVERSARY[adversary.value as number].invaders?.[adversaryLevel]
    invaderCard.newDeck(
      invaderPos && invaderPos !== '' ? invaderPos : undefined
    )
    if (gameOption.hasEngland3) {
      invaderCard.extraBuild = []
    }
    useDaysThatNeverWereStore().reset()
    fearDeck.newDeck(
      gameOption.fearSetup,
      numberSpirit.value as number,
      gameOption.hasEngland6
    )
    gameState.isNewGame = true
    playerCard.reset()

    spirits.value.forEach((spiritIndex) => {
      const { cards, setup } = SPIRIT[spiritIndex]
      const hand = []
      const playerIndex = playerCard.addPlayer()
      for (let i = 0; i < cards.length; i++) {
        hand.push(`unique${spiritIndex}-${i}`)
      }
      playerCard.changeCurrent(playerIndex)
      playerCard.setHand(hand)

      if (setup) {
        setup(playerIndex)
      }
    })

    playerCard.changeCurrent(0)

    gameOption.aspectsDetail.forEach((aspects, playerIndex) => {
      if (aspects && aspects.setupFunction) {
        aspects.setupFunction(playerIndex)
      }
    })

    await router.push({ name: 'GameView' })
  }

  function randomAdversary() {
    adversary.value = Math.floor(Math.random() * ADVERSARY.length)
  }

  function randomSpiritAndMap(index?: number) {
    if (index !== undefined) {
      islands.value[index] = -1
      spirits.value[index] = -1
      aspects.value[index] = -1
    }

    let island = Math.floor(Math.random() * MAP.length)
    let spirit = Math.floor(Math.random() * SPIRIT.length)

    while (
      islands.value.includes(island) ||
      (MAP[island] === 'E' && islands.value.includes(MAP.indexOf('B'))) ||
      (MAP[island] === 'B' && islands.value.includes(MAP.indexOf('E'))) ||
      (MAP[island] === 'F' && islands.value.includes(MAP.indexOf('D'))) ||
      (MAP[island] === 'D' && islands.value.includes(MAP.indexOf('F')))
    ) {
      island = Math.floor(Math.random() * MAP.length)
    }
    while (spirits.value.includes(spirit)) {
      spirit = Math.floor(Math.random() * SPIRIT.length)
    }

    if (index !== undefined) {
      islands.value[index] = island
      spirits.value[index] = spirit
      return
    }
    islands.value.push(island)
    spirits.value.push(spirit)
  }

  return {
    randomSetup,
    startGame,
    randomSpiritAndMap,

    canStartGame
  }
}
