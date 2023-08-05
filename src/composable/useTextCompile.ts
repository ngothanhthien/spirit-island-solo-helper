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
  'destroy_presence',
]
export default function (message: string) {
  const compileText = computed(() =>
    message.split(
      new RegExp(`(?<=${iconList.join('|')})|(?=${iconList.join('|')})`),
    ),
  )

  return {
    compileText,
    iconList,
  }
}
