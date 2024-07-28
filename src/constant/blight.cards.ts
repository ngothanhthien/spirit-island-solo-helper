import type { BlightCard } from '@/types'
import { setupInvadersFindTheLand } from '@/utils/blight'

export const BLIGHT_CARDS: BlightCard[] = [
  {
    name: 'A Pall Upon The Land',
    isBlighted: true
  },
  {
    name: 'Attenuated Essence',
    isBlighted: true
  },
  {
    name: 'Blighted Corrodes the Spirit',
    isBlighted: true
  },
  {
    name: 'Burn Brightest Before the End',
    isBlighted: true
  },
  {
    name: 'Disintegrating Ecosystem',
    isBlighted: true
  },
  {
    name: 'Downward Spiral',
    isBlighted: true
  },
  {
    name: 'Erosion of Will',
    isBlighted: true
  },
  {
    name: 'Intensifying Exploitation',
    isBlighted: true
  },
  {
    name: 'Invaders Find the Land to Their Liking',
    isBlighted: false,
    setup: setupInvadersFindTheLand
  },
  {
    name: 'Memory Fades to Dust',
    isBlighted: true
  },
  {
    name: 'Power Corrodes the Spirit',
    isBlighted: true
  },
  {
    name: 'Promising Farmlands',
    isBlighted: true
  },
  {
    name: 'Shattered Fragments of Power',
    isBlighted: true
  },
  {
    name: 'Slow Dissolution of Will',
    isBlighted: true
  },
  {
    name: 'Strong Earth Shatters Slowly',
    isBlighted: false
  },
  {
    name: 'The Border of Life and Death',
    isBlighted: false
  },
  {
    name: 'Thriving Communities',
    isBlighted: true
  },
  {
    name: 'Thriving Crops',
    isBlighted: false
  },
  {
    name: 'Unnatural Proliferation',
    isBlighted: true
  },
  {
    name: 'Untended Land Crumbles',
    isBlighted: true
  }
]
