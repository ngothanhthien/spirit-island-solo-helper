import { EVENT_CARDS, MAJOR_CARDS, MINOR_CARDS } from "@/constant"

export const getCardImage = (name: string, path: string) => {
  return `/img/${path}/${name.toLowerCase().replace(/ /g, "_").replace('-', '').replace(',', '').replace(/'/g, '')}.webp`
}
export const getCard = (id: string) => {
  const [type, index] = id.split('-')
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
      return {
        path: 'events',
        ...EVENT_CARDS[parseInt(index)]
      }
    default:
      return null
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
