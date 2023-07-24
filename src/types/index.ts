export interface PowerCard {
  name: string
  cost: number
  speed: Speed
  elements: Array<Element>
  description: string
}
export type Speed = 'Slow' | 'Fast'
export type Element = 'Fire' | 'Air' | 'Earth' | 'Water' | 'Sun' | 'Animal' | 'Moon' | 'Plant'
export type CardListStatus = 'pick-power' | 'view-discard' | ''
export interface Player {
  hand: string[]
  discard: string[]
  play: string[]
  used: string[]
  picking: string[]
  forget: string[]
  energy: number
}
export interface Adversary {
  title: string;
  fear: number[][];
  difficultly: number[];
  // invaders: string[];
  id: string;
  detail: {
    title: string;
    loss: {
      name: string | null;
      text: string;
    };
    escalation: {
      name: string;
      text: string;
    };
    levelText: Array<{
      name: string;
      text: string;
    }>;
  };
}