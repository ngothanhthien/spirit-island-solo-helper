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
  'Sun',
  'Fire',
  'Moon',
  'Water',
  'Air',
  'Earth',
  'Plant',
  'Animal',
  'Slowicon.png',
  'Fasticon.png',
  'Sacred Site',
  'Vitality',
  'Deeps',
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
