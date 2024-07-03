import { useGameOptionStore } from '@/stores/GameOptionStore'
import { usePowerDeckStore } from '@/stores/PowerDeckStore'
import { useDaysThatNeverWereStore } from '@/stores/DaysThatNeverWhereStore'
import { usePlayerCardStore } from '@/stores/PlayerCardStore'
import { useImpendingCardStore } from '@/stores/ImpendingCardStore'
import { useGleamingHoardStore } from '@/components/GleamingHoard/Store'
import type { Element } from '@/types'
import { useSwitchElement } from '@/components/SwitchElement/functional'
import { useSpiritInfo } from '@/composable/useSpiritInfo'
import { EXTRA_INNATE, SPIRIT } from '@/constant'
import { removeCard } from '@/utils/index'

export function setupDaysThatNeverWere(playerIndex: number) {
  const minor = usePowerDeckStore('minor')
  const major = usePowerDeckStore('major')
  const gameOption = useGameOptionStore()
  const deck = useDaysThatNeverWereStore()
  let numberCard = 4
  if (gameOption.numberSpirit && gameOption.numberSpirit < 3) {
    numberCard = 6
  }
  for (let i = 0; i < numberCard; i++) {
    const minorCard = minor.reveal()
    const majorCard = major.reveal()
    deck.minor.push(minorCard)
    deck.major.push(majorCard)
  }

  deck.current = playerIndex
}

export function setupGleamingHoard(playerIndex: number) {
  useGleamingHoardStore().current = playerIndex
}

export function setupHearthVigil(playerIndex: number) {
  const players = usePlayerCardStore().players[playerIndex]
  players.energy++
}

export function setupWoundedWaters(playerIndex: number) {
  const players = usePlayerCardStore().players[playerIndex]
  players.energy += 4
}

export function setupDancesUpEarthquakes(playerIndex: number) {
  useImpendingCardStore().setIndex(playerIndex)
}

export function energyChange(energy: number, reverse: boolean) {
  const player = usePlayerCardStore()
  if (reverse) {
    for (let i = 0; i < energy; i++) {
      player.reduceEnergy()
    }
  } else {
    for (let i = 0; i < energy; i++) {
      player.addEnergy()
    }
  }
}

export function woundedWatersPresence3(reverse: boolean) {
  const player = usePlayerCardStore()
  player.setIncome(reverse ? 0 : 1)
  player.setCardPlay(reverse ? 1 : 2)
}

export function addSwitchElement(reverse: boolean, element_1: Element, element_2: Element) {
  const { add, remove } = useSwitchElement()
  if (reverse) {
    remove(element_1, element_2)
  } else {
    add(element_1, element_2)
  }
}

export function addAnyElement(reverse: boolean) {
  const player = usePlayerCardStore()
  if (reverse) {
    player.increaseElement('Any')
  } else {
    player.decreaseElement('Any')
  }
}

export function exchangeInnate(added: string, removed: string) {
  const player = usePlayerCardStore()
  const localInnate = SPIRIT[player.rawIndex].innate ?? []
  const libInnate = EXTRA_INNATE
  localInnate.forEach(innate => { libInnate.push(innate) })
  const addedResult = libInnate.find(innate => innate.name === added)
  const removedIndex = player.innate.findIndex(innate => innate.name === removed)
  if (addedResult && removedIndex !== -1) {
    player.innate[removedIndex] = addedResult
  }
}
