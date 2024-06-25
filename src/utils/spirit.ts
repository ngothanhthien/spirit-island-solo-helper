import { useGameOptionStore } from '@/stores/GameOptionStore'
import { usePowerDeckStore } from '@/stores/PowerDeckStore'
import { useDaysThatNeverWereStore } from '@/stores/DaysThatNeverWhereStore'
import { usePlayerCardStore } from '@/stores/PlayerCardStore'
import { useImpendingCardStore } from '@/stores/ImpendingCardStore'

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
