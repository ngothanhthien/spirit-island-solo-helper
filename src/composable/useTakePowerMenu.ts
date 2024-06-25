import { readonly, ref } from 'vue'
import { usePowerDeckStore } from '@/stores/PowerDeckStore'
import { usePlayerCardStore } from '@/stores/PlayerCardStore'

export function useTakePowerMenu() {
  const isShowQuickPower = ref(false)
  const playerCard = usePlayerCardStore()

  function quickTake(type: 'minor' | 'major') {
    isShowQuickPower.value = false
    if (playerCard.isPicking) {
      return
    }
    const card = usePowerDeckStore(type).reveal()
    playerCard.addToPicking(card)
  }

  function closeQuickPower() {
    isShowQuickPower.value = false
  }

  function toggleQuickPower() {
    isShowQuickPower.value = !isShowQuickPower.value
  }

  return {
    isShowQuickPower: readonly(isShowQuickPower),

    quickTake,
    closeQuickPower,
    toggleQuickPower
  }
}
