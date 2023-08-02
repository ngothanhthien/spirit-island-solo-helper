export interface PowerCard {
  name: string
  cost: number
  speed: Speed
  elements: Array<Element>
  description: string
}
export type Speed = 'Slow' | 'Fast'
export type Element =
  | 'Fire'
  | 'Air'
  | 'Earth'
  | 'Water'
  | 'Sun'
  | 'Animal'
  | 'Moon'
  | 'Plant'
export type CardListStatus = 'pick-power' | 'view-discard' | ''
export interface Player {
  hand: string[]
  discard: string[]
  play: string[]
  used: string[]
  picking: string[]
  forget: string[]
  energy: number
  energyThisTurn: number
  permanentElements: { [K in Element]?: number }
  showAspect: boolean
  aspectPos: number
  aspectMode: '1x' | '2x'
}
export interface Adversary {
  title: string
  fear: number[][]
  difficultly: number[]
  // invaders: string[];
  id: string
  detail: {
    title: string
    loss: {
      name: string | null
      text: string
    }
    escalation: {
      name: string
      text: string
    }
    levelText: Array<{
      name: string
      text: string
      isHighlight?: boolean
    }>
  },
  setup: Array<{
    piece?: string,
    invaders?: string,
  }>
}
export interface BlightCard {
  name: string
  isBlighted: boolean
  setup?: () => void
}
export interface Aspect {
  title: string
  requirements?: string[]
  setupFunction?: (pos: number) => boolean
  images?: string[]
  cards?: {
    name: string
    description: string
    target?: {
      speed: 'Slow' | 'Fast'
      range: number | null
      scaredSite: boolean | null
      targetLand:
        | 'Another Spirit'
        | 'Any'
        | 'no-blight'
        | 'yourself'
        | 'Invaders'
        | 'any-spirit'
        | 'Coastal'
        | 'j-w'
    }
  }[]
}
export interface SpiritType {
  name: string
  cards: Array<PowerCard>
  aspects?: Aspect[]
  setup?: (playerIndex: number) => void
}
