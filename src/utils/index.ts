import { EVENT_CARDS, MAJOR_CARDS, MINOR_CARDS, SPIRIT, FEAR_CARDS } from "@/constant"

export const getCardImage = (name: string, path: string) => {
  const sanitized = name.toLowerCase().replace(/[-',]/g, '').replace(/\s/g, '_');
  return `/img/${path}/${sanitized}.webp`;
}

export const getCard = (id: string) => {
  const [type, index] = id.split('-')
  if (type.startsWith('unique')) {
    const spiritIndex = Number(type.match(/\d+/g))
    return {
      path: 'powers',
      ...SPIRIT[spiritIndex].cards[parseInt(index)]
    }
  }
  switch (type) {
    case 'major':
      return {
        path: 'powers',
        ...MAJOR_CARDS[parseInt(index)]
      }
    case 'minor':
      return {
        path: 'powers',
        ...MINOR_CARDS[parseInt(index)]
      }
    case 'event':
      if (index === 'france') {
        return {
          path: 'events',
          name: 'slave_rebellion'
        }
      }
      return {
        path: 'events',
        ...EVENT_CARDS[parseInt(index)]
      }
    case 'fear':
      return {
        path: 'fears',
        ...FEAR_CARDS[parseInt(index)]
      }
    default:
      return {
        path: 'default',
        name: 'default',
      }
  }
}
export const shuffle = (array: Array<string | number>) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled
}
export const removeCard = (array: string[], card: string) => {
  const index = array.indexOf(card)
  if (index > -1) {
    array.splice(index, 1)
  }
}

export const generateTestCards = (type: string, n: number) => {
  const cards = []
  for (let i = 0; i < n; i++) {
    cards.push(`${type}-${i}`)
  }
  return cards
}

export const getSpiritAvatar = (id: number) => {
  const name = SPIRIT[id].name
  return name.replace(/'/g, "").replace(/[\s']/g, "_") + "_small.webp"
}