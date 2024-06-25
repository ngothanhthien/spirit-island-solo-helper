import { usePlayerCardStore } from '@/stores/PlayerCardStore'
import { useFearDeckStore } from '@/stores/FearDeckStore'
import { useMessageStore } from '@/stores/MessageStore'
import { usePowerDeckStore } from '@/stores/PowerDeckStore'

function timePassed() {
  usePlayerCardStore().cleanUp()
  useFearDeckStore().cleanUp()
  useMessageStore().setMessage('Time passed')
}

function exitPicking() {
  const playerCard = usePlayerCardStore()
  playerCard.picking.forEach((card) => {
    const [type] = card.split('-')
    usePowerDeckStore(type).addToDiscard(card)
  })
  playerCard.resetPicking()
}

export { timePassed, exitPicking }
