import { EVENT_CARDS, MAJOR_CARDS, MINOR_CARDS, SPIRIT, FEAR_CARDS, BLIGHT_CARDS, EXTRA_POWERS } from "@/constant"

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
    case 'blight':
      return {
        path: 'blights',
        ...BLIGHT_CARDS[parseInt(index)]
      }
    case 'extra':
      return {
        path: 'powers',
        ...EXTRA_POWERS[parseInt(index)]
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

export const getPowerIdByName = (name: string, type?: 'unique' | 'minor-major' | 'extra') => {
  const search = name.toLowerCase()
  if (type === 'extra') {
    for(let i = 0; i < EXTRA_POWERS.length; i++) {
      if (EXTRA_POWERS[i].name.toLowerCase() === search) {
        return `extra-${i}`
      }
    }
  }

  if (!type || type !== 'unique') {
    for(let i = 0; i < MINOR_CARDS.length; i++) {
      if (MINOR_CARDS[i].name.toLowerCase() === search) {
        return `minor-${i}`
      }
    }
  }

  if (!type || type !== 'minor-major') {
    const spiritCards = SPIRIT.map(spirit => spirit.cards)
    for(let i = 0; i < spiritCards.length; i++) {
      for(let j = 0; j < spiritCards[i].length; j++) {
        if (spiritCards[i][j].name.toLowerCase() === search) {
          return `unique${i}-${j}`
        }
      }
    }
  }
  
  if(!type || type !== 'unique') {
    for(let i = 0; i < MAJOR_CARDS.length; i++) {
      if (MAJOR_CARDS[i].name.toLowerCase() === search) {
        return `major-${i}`
      }
    }
  }
}

export const getSpiritById = (id: number) => {
  return SPIRIT[id]
}

export const nameToImage = (name: string) => {
  return name.replace(/[^a-zA-Z0-9 ]/g, '').replace(/\s+/g, '_').toLowerCase() + '.webp'
}

export const changePosition = (arr: string[], cardId: string, posId: string) => {
  if (posId) {
    removeCard(arr, cardId)
    insertAfter(arr, cardId, posId)
  }
}

function insertAfter(arr: string[] ,newElement: string, insertAfter: string) {
  const index = arr.indexOf(insertAfter);
  if (index !== -1) {
    arr.splice(index + 1, 0, newElement);
  }
}