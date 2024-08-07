import { usePlayerCardStore } from '@/stores/PlayerCardStore'
import { usePowerDeckStore } from '@/stores/PowerDeckStore'
import { getPowerIdByName, removeCard } from '.'

export function setupViolence(playerPos: number) {
  const playerCard = usePlayerCardStore()
  const players = playerCard.players[playerPos]
  players.energy++

  const cardId1 = getPowerIdByName('Dreams of the Dahan', 'unique')
  if (!cardId1) {
    console.error('Card --Dreams of the Dahan-- not found')
    return false
  }
  removeCard(players.hand, cardId1)

  const cardId2 = getPowerIdByName('Bats Scout for Raids by Darkness', 'minor-major')
  if (!cardId2) {
    console.error('Card --Bats Scout for Raids by Darkness-- not found')
    return false
  }
  const type = cardId2.split('-')[0]
  const deck = usePowerDeckStore(type)
  removeCard(deck.draw, cardId2)
  players.hand.push(cardId2)

  return true
}

export function setupNourishing(playerPos: number) {
  const playerCard = usePlayerCardStore()
  const players = playerCard.players[playerPos]
  const cardId1 = getPowerIdByName('A Year of Perfect Stillness', 'unique')
  if (!cardId1) {
    console.error('Card --A Year of Perfect Stillness-- not found')
    return false
  }
  removeCard(players.hand, cardId1)

  const cardId2 = getPowerIdByName('Voracious Growth')
  if (!cardId2) {
    console.error('Card --Voracious Growth-- not found')
    return false
  }
  const type = cardId2.split('-')[0]
  const deck = usePowerDeckStore(type)
  removeCard(deck.draw, cardId2)
  players.hand.push(cardId2)
  playerCard.addInnate('Imbue with Nourishing Vitality')
  return true
}

export function setupMight(playerPos: number) {
  const playerCard = usePlayerCardStore()
  playerCard.addInnate('Earth Move with Vigor and Might', playerPos)

  return true
}

export function setupSunshine(playerPos: number) {
  const playerCard = usePlayerCardStore()
  const players = playerCard.players[playerPos]
  const card = getPowerIdByName('Boon of Vigor', 'unique')
  if (!card) {
    console.error('Card --Boon of Vigor-- not found')
    return false
  }
  removeCard(players.hand, card)
  players.energy++
  playerCard.addInnate("Boon of Sunshine's Promise", playerPos)
  return true
}

export function setupDarkFire(playerPos: number) {
  const playerCard = usePlayerCardStore()
  const players = playerCard.players[playerPos]

  const card = getPowerIdByName('Unquenchable Flames', 'minor-major')
  if (!card) {
    console.error('Card --Unquenchable Flames-- not found')
    return false
  }
  const type = card.split('-')[0]
  const deck = usePowerDeckStore(type)
  removeCard(deck.draw, card)
  players.hand.push(card)

  if (players.permanentElements['Fire'] === undefined) {
    console.error('Element --Fire-- not set on player')
    return false
  }
  players.permanentElements['Fire']++

  return true
}

export function setupSparking(playerPos: number) {
  const playerCard = usePlayerCardStore()
  const players = playerCard.players[playerPos]
  const card = getPowerIdByName('Raging Storm', 'unique')
  if (!card) {
    console.error('Card --Raging Storm-- not found')
    return false
  }
  removeCard(players.hand, card)

  const extra = getPowerIdByName('Smite the Land with Fulmination', 'extra')
  if (!extra) {
    console.error('Card --Smite the Land with Fulmination-- not found')
    return false
  }
  players.hand.push(extra)

  playerCard.addInnate('Gift of the Sparking Sky', playerPos)
  playerCard.removeInnate('Thundering Destruction', playerPos)
  return true
}

export function setupTangles(playerPos: number) {
  const playerCard = usePlayerCardStore()
  const players = playerCard.players[playerPos]
  const unique = getPowerIdByName('Gift of Proliferation', 'unique')
  if (!unique) {
    console.error('Card --Gift of Proliferation-- not found')
    return false
  }
  removeCard(players.hand, unique)

  const extra = getPowerIdByName('Belligerent and Aggressive Crops', 'extra')
  if (!extra) {
    console.error('Card --Belligerent and Aggressive Crops-- not found')
    return false
  }
  players.hand.push(extra)

  return true
}

export function setupWarrior(playerPos: number) {
  const playerCard = usePlayerCardStore()
  const players = playerCard.players[playerPos]
  const card = getPowerIdByName('Manifestation of Power and Glory', 'unique')
  if (!card) {
    console.error('Card --Manifestation of Power and Glory-- not found')
    return false
  }
  removeCard(players.hand, card)

  const power = getPowerIdByName('Call to Bloodshed', 'minor-major')
  if (!power) {
    console.error('Card --Call to Bloodshed-- not found')
    return false
  }
  const type = power.split('-')[0]
  const deck = usePowerDeckStore(type)
  removeCard(deck.draw, power)
  players.hand.push(power)

  return true
}

export function setupSpreadingHostility(playerPos: number) {
  const playerCard = usePlayerCardStore()
  const players = playerCard.players[playerPos]
  players.energy++
  return true
}

export function setupIntensify(playerPos: number) {
  const playerCard = usePlayerCardStore()
  const players = playerCard.players[playerPos]
  if (players.permanentElements['Moon'] === undefined) {
    console.error('Element --Moon-- not set on player')
    return false
  }
  players.permanentElements['Moon']++
  return true
}

export function setupLocus(playerPos: number) {
  const playerCard = usePlayerCardStore()
  const minorDeck = usePowerDeckStore('minor')
  const players = playerCard.players[playerPos]
  const unique = getPowerIdByName('Elemental Aegis', 'unique')
  if (!unique) {
    console.error('Card --Elemental Aegis-- not found')
    return false
  }
  removeCard(players.hand, unique)
  if (players.permanentElements['Fire'] === undefined) {
    console.error('Element --Fire-- not set on player')
    return false
  }
  players.permanentElements['Fire']++

  const minor = getPowerIdByName('Pull Beneath the Hungry Earth', 'minor-major')
  if (!minor) {
    console.error('Card --Pull Beneath the Hungry Earth-- not found')
    return false
  }

  removeCard(minorDeck.draw, minor)
  players.hand.push(minor)

  return true
}

export function setupTransforming(playerPos: number) {
  const player = usePlayerCardStore()
  player.addInnate('Exaltation of the Transforming Flame', playerPos)
  player.removeInnate('The Burned Land Regrows', playerPos)

  return true
}

export function setupDeeps(playerPos: number) {
  const player = usePlayerCardStore()
  player.players[playerPos].innate = []
  player.addInnate('Water Eats Away the Deep Roots of Earth', playerPos)
  player.addInnate('Reclaimed by the Deeps', playerPos)

  return true
}

export function setupEncircle(playerPos: number) {
  const player = usePlayerCardStore()
  player.addInnate('Encircle the Unsuspecting Prey', playerPos)
  player.removeInnate('Ranging Hunt', playerPos)
  return true
}

export function setupHaven(playerPos: number) {
  const player = usePlayerCardStore()
  player.addInnate('Call to a Sunlit Haven', playerPos)
  player.removeInnate('Massive Flooding', playerPos)
  return true
}

export function setupWind(playerPos: number) {
  const player = usePlayerCardStore()
  player.addInnate('Exaltation of the Storm-Wind', playerPos)
  return true
}

export function setupPandemonium(playerPos: number) {
  const player = usePlayerCardStore()
  player.addInnate('Lightning-Torn Skies Incite Pandemonium', playerPos)
  player.removeInnate('Thundering Destruction', playerPos)
  return true
}
