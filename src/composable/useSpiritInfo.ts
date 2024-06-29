import { computed } from 'vue'
import { usePlayerCardStore } from '@/stores/PlayerCardStore'
import { useGameOptionStore } from '@/stores/GameOptionStore'
import { SPIRIT } from '@/constant'

export function useSpiritInfo() {
  const player = usePlayerCardStore()
  const gameOption = useGameOptionStore()
  const spiritInfo = computed(() => {
    const index = gameOption.spirits[player.current]
    return SPIRIT[index]
  })

  const aspectInfo = computed(() => {
    const index = gameOption.aspects[player.current]
    if (!index || !spiritInfo.value.aspects) {
      return undefined
    }
    return spiritInfo.value.aspects[index]
  })

  return {
    spiritInfo,
    aspectInfo
  }
}