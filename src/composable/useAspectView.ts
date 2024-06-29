import { computed, type Ref } from 'vue'
import { usePlayerCardStore } from '@/stores/PlayerCardStore'
import { useGameOptionStore } from '@/stores/GameOptionStore'

export function useAspectView() {
  const playerCard = usePlayerCardStore()
  const gameOption = useGameOptionStore()
  let isHasAspect = null as null | Ref<boolean>
  let isShow2xAspect = null as null | Ref<boolean | null>
  if (gameOption.isHasAspect) {
    isHasAspect = computed(() => Boolean(gameOption.aspectsDetail[playerCard.current]))
    isShow2xAspect = computed(() => {
      return playerCard.aspectMode === '2x' && isHasAspect && isHasAspect.value && playerCard.showAspect
    })
  }

  return {
    isHasAspect,
    isShow2xAspect
  }
}
