import router from '@/router'
import { useEventDeckStore } from '@/stores/EventDeckStore'
import { useFearDeckStore } from '@/stores/FearDeckStore'
import { usePowerDeckStore } from '@/stores/PowerDeckStore'

async function canInGameView() {
  if (
    !useEventDeckStore().isAvailable ||
    !usePowerDeckStore('minor').isAvailable ||
    !usePowerDeckStore('major').isAvailable ||
    !useFearDeckStore().isAvailable
  ) {
    await router.push({ name: 'HomeView' })
  }
}

export { canInGameView }
