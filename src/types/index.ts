export interface PowerCard {
  name: string
  cost: number
  speed: Speed
  elements: Array<Element>
  description: string
}
export type Speed = 'Slow' | 'Fast'
const ELEMENT_VALUES = [
  'Fire',
  'Moon',
  'Air',
  'Sun',
  'Earth',
  'Water',
  'Animal',
  'Plant',
  'Any'
]
export type Element = (typeof ELEMENT_VALUES)[number]
export function isElement(value: Element): value is Element {
  return ELEMENT_VALUES.includes(value)
}

export type CardListStatus = 'pick-power' | 'view-discard' | ''
export interface Player {
  hand: string[]
  discard: string[]
  play: string[]
  used: string[]
  picking: string[]
  energy: number
  energyThisTurn: number
  permanentElements: { [K in Element]?: number }
  showAspect: boolean
  aspectMode: '1x' | '2x'
}
export interface Adversary {
  title: string
  fear: number[][]
  difficultly: number[]
  invaders?: string[]
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
  }
  setup: Array<{
    piece?: string
    invaders?: string
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
  faq?: FAQ[]
}

export interface FAQ {
  title: string
  description: string | null
  links: string[]
}
export interface SpiritType {
  name: string
  cards: Array<PowerCard>
  aspects?: Aspect[]
  setup?: (playerIndex: number) => void
  faq?: FAQ[]
}

export interface Result {
  adversary: string
  fear_stage: number
  level: number
  invader_card_left: number
  win: boolean
  spirits: string[]
}

export interface PendingResult {
  createdAt: Date
  offset: number
  result: Result
  id: number
}

export interface SpiritsChart {
  [spirit: string]: {
    [adversary: string]:
      | {
          win: number
          lose: number
        }
      | number
    total: number
  }
}

export interface ChartData {
  total: number
  spirit_chart: SpiritsChart
  last: { createdAt: Date }
  lastUpdate?: Date
}

export type ButtonStyle =
  | 'primary'
  | 'secondary'
  | 'warning'
  | 'success'
  | 'impending'
  | 'daysThatNeverWere'

export interface AspectOption {
  label: string
  value: number
}
