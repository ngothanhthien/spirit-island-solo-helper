export interface PowerCard {
  name: string
  cost: number
  speed: Speed
  elements: Array<Element>
  description: string
}
export type Speed = 'Slow' | 'Fast'
export type Element = 'Fire' | 'Air' | 'Earth' | 'Water' | 'Sun' | 'Animal' | 'Moon' | 'Plant' | ''
export type CardListStatus = 'pick-power' | 'view-discard' | ''
