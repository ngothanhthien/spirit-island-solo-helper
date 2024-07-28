import { computed, type Ref } from 'vue'
import { usePlayerCardStore } from '@/stores/PlayerCardStore'
import { useGameOptionStore } from '@/stores/GameOptionStore'

export function useAspectView() {
  const playerCard = usePlayerCardStore()
  const gameOption = useGameOptionStore()
  let isHasAspect = null as null | Ref<boolean>
  if (gameOption.isHasAspect) {
    isHasAspect = computed(() => Boolean(gameOption.aspectsDetail[playerCard.current]))
  }

  return {
    isHasAspect
  }
}
