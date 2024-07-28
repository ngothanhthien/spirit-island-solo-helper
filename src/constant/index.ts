import type { PowerCard, InnatePower } from '@/types'
export { MINOR_CARDS } from '@/constant/minor.cards'
export { MAJOR_CARDS } from '@/constant/major.cards'
export { EVENT_CARDS } from '@/constant/event.cards'
export { FEAR_CARDS } from '@/constant/fear.cards'
export { ADVERSARY } from '@/constant/adversary'
export { SPIRIT } from '@/constant/spirit'
export { BLIGHT_CARDS } from '@/constant/blight.cards'

export const EXTRA_INNATE: InnatePower[] = [
  {
    name: 'Imbue with Nourishing Vitality',
    elements: [
      {
        Water: 1,
        Plant: 1
      },
      {
        Water: 1,
        Plant: 2
      },
      {
        Water: 1,
        Earth: 1,
        Plant: 2
      }
    ],
    fast: true
  },
  {
    name: 'Earth Move with Vigor and Might',
    elements: [
      {
        Plant: 1
      },
      {
        Sun: 1,
        Earth: 2
      },
      {
        Plant: 2,
        Earth: 3
      },
      {
        Sun: 1,
        Plant: 3
      }
    ],
    fast: true
  },
  {
    name: 'Violent Outburst',
    fast: false,
    elements: [
      {
        Fire: 1,
        Earth: 1
      },
      {
        Fire: 2,
        Earth: 2
      },
      {
        Fire: 3,
        Air: 2,
        Earth: 3
      }
    ]
  },
  {
    name: 'Harrowing Gaze',
    fast: false,
    elements: [
      {
        Air: 1,
        Earth: 1,
        Animal: 1
      },
      {
        Air: 2,
        Earth: 1,
        Animal: 2
      },
      {
        Air: 3,
        Earth: 3,
        Animal: 3
      }
    ]
  },
  {
    name: 'Imposing Demands',
    fast: false,
    elements: [
      {
        Sun: 1,
        Earth: 1,
        Animal: 1
      },
      {
        Sun: 2,
        Earth: 1,
        Animal: 2
      },
      {
        Sun: 3,
        Earth: 2,
        Animal: 3
      }
    ]
  },
  {
    name: 'Afflict with Bloodthirst',
    elements: [
      {
        Animal: 1
      },
      {
        Animal: 3,
        Fire: 1
      },
      {
        Sun: 1,
        Fire: 2,
        Animal: 4
      },
      {
        Fire: 1,
        Animal: 2
      }
    ],
    fast: true
  },
  {
    name: 'Call to a Fastness of Renewal',
    elements: [
      {
        Water: 1
      },
      {
        Water: 2,
        Plant: 1
      },
      {
        Water: 3,
        Plant: 1
      },
      {
        Water: 4,
        Plant: 2,
        Sun: 1
      }
    ],
    fast: true
  },
  {
    "name": "Exaltation of the Transforming Flame",
    "elements": [
      {
        "Fire": 4,
        "Plant": 1
      },
      {
        "Fire": 3,
        "Earth": 1,
        "Plant": 2
      },
      {
        "Sun": 1,
        "Fire": 3,
        "Animal": 1
      }
    ],
    "fast": true
  },
  {
    "name": "Water Eats Away the Deep Roots of Earth",
    "elements": [
      {
        "Water": 2
      },
      {
        "Water": 3
      },
      {
        "Water": 4,
        "Earth": 3,
        "Moon": 3
      }
    ],
    "fast": false
  },
  {
    "name": "Reclaimed by the Deeps",
    "elements": [
      {
        "Water": 2
      },
      {
        "Water": 4,
        "Earth": 2
      },
      {
        "Water": 3,
        "Moon": 2
      }
    ],
    "fast": false
  }
]
export const EXTRA_POWERS: PowerCard[] = [
  {
    name: 'Belligerent and Aggressive Crops',
    cost: 1,
    speed: 'Slow',
    elements: ['Sun', 'Fire', 'Plant'],
    description: ''
  },
  {
    name: 'Smite the Land with Fulmination',
    cost: 2,
    speed: 'Slow',
    elements: ['Sun', 'Fire', 'Air'],
    description: ''
  }
]
type InvaderCard = 'S-1' | 'W-1' | 'J-1' | 'M-1' | 'S-2' | 'W-2' | 'J-2' | 'M-2' | 'C-2' | 'SW-3' | 'SJ-3' | 'SM-3' | 'WJ-3' | 'WM-3' | 'JM-3'
export const INVADER_CARD: Array<Array<InvaderCard>> = [
  ['S-1', 'W-1', 'J-1', 'M-1'],
  ['S-2', 'W-2', 'J-2', 'M-2', 'C-2'],
  ['SW-3', 'SJ-3', 'SM-3', 'WJ-3', 'WM-3', 'JM-3']
]
export const MAP = ['A', 'B', 'C', 'D', 'E', 'F']
export const CARD_RATIO = 5 / 7
export const MENU_1 = {
  PLAY: 0,
  TAB_2: 1 //discard
}
export const MENU_2 = {
  HAND: 0,
  FUNCTION: 1
}
