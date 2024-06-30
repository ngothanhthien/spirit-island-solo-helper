import { EVENT_CARDS, MAJOR_CARDS, MINOR_CARDS, SPIRIT, FEAR_CARDS, BLIGHT_CARDS, EXTRA_POWERS } from '@/constant'
import { Random } from 'random-js'
const random = new Random()
export const getCardImage = (name: string, path: string) => {
  const sanitized = name.toLowerCase().replace(/[-',]/g, '').replace(/\s/g, '_')
  return `/img/${path}/${sanitized}.webp`
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
        name: 'default'
      }
  }
}

export const shuffle = (array: Array<string | number>) => {
  const shuffled = [...array]
  random.shuffle(shuffled)
  return shuffled
}

export const removeCard = (array: Array<string | number>, card: string | number) => {
  const index = array.indexOf(card)
  if (index > -1) {
    array.splice(index, 1)
  }
}

export const getSpiritAvatar = (id: number) => {
  const name = SPIRIT[id].name
  return nameParser(name) + '_small.webp'
}

export const getSpiritAvatarByName = (name: string) => {
  return nameParser(name) + '_small.webp'
}

export function nameParser(name: string) {
  return name.replace(/'/g, '').replace(/[\s']/g, '_')
}

export const getPowerIdByName = (name: string, type?: 'unique' | 'minor-major' | 'extra') => {
  const search = name.toLowerCase()
  if (type === 'extra') {
    for (let i = 0; i < EXTRA_POWERS.length; i++) {
      if (EXTRA_POWERS[i].name.toLowerCase() === search) {
        return `extra-${i}`
      }
    }
  }

  if (!type || type !== 'unique') {
    for (let i = 0; i < MINOR_CARDS.length; i++) {
      if (MINOR_CARDS[i].name.toLowerCase() === search) {
        return `minor-${i}`
      }
    }
  }

  if (!type || type !== 'minor-major') {
    const spiritCards = SPIRIT.map((spirit) => spirit.cards)
    for (let i = 0; i < spiritCards.length; i++) {
      for (let j = 0; j < spiritCards[i].length; j++) {
        if (spiritCards[i][j].name.toLowerCase() === search) {
          return `unique${i}-${j}`
        }
      }
    }
  }

  if (!type || type !== 'unique') {
    for (let i = 0; i < MAJOR_CARDS.length; i++) {
      if (MAJOR_CARDS[i].name.toLowerCase() === search) {
        return `major-${i}`
      }
    }
  }
}

export const nameToImage = (name: string) => {
  return (
    name
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .replace(/\s+/g, '_')
      .toLowerCase() + '.webp'
  )
}

export const adversaryNameToImage = (name: string) => {
  return (
    name
      .replace(/[^a-zA-Z0-9 ]/g, '')
      .replace(/\s+/g, '-')
      .toLowerCase() + '-flag.webp'
  )
}

export const changePosition = (
  arr: string[],
  cardId: string,
  posId: {
    id: string
    isFront: boolean
  }
) => {
  if (posId.id) {
    removeCard(arr, cardId)
    if (posId.isFront) {
      insertAfter(arr, cardId, posId.id)
    } else {
      insertBefore(arr, cardId, posId.id)
    }
  }
}

export function getDayAgo(date: Date) {
  const now = new Date()
  const lastMatch = new Date(date)
  // @ts-ignore
  const diffInMs = now - lastMatch
  const diffInHours = diffInMs / 1000 / 60 / 60

  if (diffInHours < 1) {
    return 'Recently'
  }

  if (diffInHours > 48) {
    return `${Math.floor(diffInHours / 24)} day(s) ago`
  } else {
    return `${Math.floor(diffInHours)} hour(s) ago`
  }
}

function insertAfter(arr: string[], newElement: string, insertAfter: string) {
  const index = arr.indexOf(insertAfter)
  if (index !== -1) {
    arr.splice(index + 1, 0, newElement)
  }
}

function insertBefore(arr: string[], newElement: string, insertBefore: string) {
  const index = arr.indexOf(insertBefore)
  if (index !== -1) {
    arr.splice(index, 0, newElement)
  }
}

function downloadObjectAsJson(obj: object, exportName: string) {
  const formattedJson = JSON.stringify(obj, null, 2)
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(formattedJson)
  const downloadAnchorNode = document.createElement('a')
  downloadAnchorNode.setAttribute('href', dataStr)
  downloadAnchorNode.setAttribute('download', exportName + '.json')
  document.body.appendChild(downloadAnchorNode) // required for Firefox
  downloadAnchorNode.click()
  downloadAnchorNode.remove()
}

function toFixed(num: number, fixed = 2) {
  return parseFloat(num.toFixed(fixed))
}

function toPercent(num: number, compare: number) {
  return toFixed((num / compare) * 100)
}

function toAbsolute(num: number, compare: number) {
  return (num / 100) * compare
}

export { insertAfter, insertBefore, downloadObjectAsJson, toFixed, toPercent, toAbsolute }
