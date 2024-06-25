import { computed } from 'vue'
const iconList = [
  'Townicon.png',
  'Cityicon.png',
  'Explorericon.png',
  'Blight',
  'Dahan',
  'Beasts',
  'Fear',
  'plus1Rangeicon',
  'normal1Rangeicon',
  'Rangeicon.png',
  'Presence',
  ':break:',
  'Strife',
  'Wilds',
  'Disease',
  'Badlands',
  'Sun',
  'Fire',
  'Moon',
  'Water',
  'Air',
  'Earth',
  'Plant',
  'Animal',
  'Any Element',
  'Slowicon.png',
  'Fasticon.png',
  'Sacred Site',
  'Vitality',
  'Deeps',
  'Locus',
  'Lair',
  'air_range',
  'destroy_presence'
]
const iconMapping = {
  'Townicon.png': 'town',
  'Cityicon.png': 'city',
  'Explorericon.png': 'explorer',
  'Slowicon.png': 'slow',
  'Fasticon.png': 'fast',
  destroy_presence: 'destroy-presence'
}
export default function (message: string) {
  const compileText = computed(() =>
    message
      .split(new RegExp(`(?<=${iconList.join('|')})|(?=${iconList.join('|')})`))
      .map((item) => {
        if (Object.keys(iconMapping).includes(item)) {
          // @ts-ignore
          return iconMapping[item]
        }
        return item
      })
  )

  return {
    compileText,
    iconList,
    iconMapping
  }
}
