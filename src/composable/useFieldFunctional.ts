import { usePlayerCardStore } from '@/stores/PlayerCardStore'
import { readonly, ref } from 'vue'
import { MENU_1 } from '@/constant'
import { changePosition } from '@/utils'

// functional discard field, hand field, play field, settings field
export function useFieldFunctional() {
  const currentMenu1 = ref(MENU_1.PLAY)

  const playerCard = usePlayerCardStore()

  function discardViewSwipeDown(card: string) {
    playerCard.reclaimOneCard(card)
  }
  function discardViewSwipeUp(cardId: string) {
    playerCard.forgetCardFromDiscard(cardId)
    currentMenu1.value = MENU_1.PLAY
  }

  function handSwipeUp(
    cardId: string,
    posId: { id: string; isFront: boolean }
  ) {
    if (playerCard.isPicking && currentMenu1.value === MENU_1.PLAY) {
      playerCard.putCardToPicking(cardId)
      return
    }
    if (currentMenu1.value === MENU_1.TAB_2) {
      playerCard.putCardInDiscard(cardId)
      return
    }
    playerCard.playCard(cardId, posId)
  }

  function handChangePosition(
    cardId: string,
    posId: { id: string; isFront: boolean }
  ) {
    playerCard.changePosition('hand', cardId, posId)
  }

  function playViewSwipeUp(card: string) {
    playerCard.putFromPlayToDiscard(card)
  }

  function playViewSwipeDown(
    card: string,
    posId: { id: string; isFront: boolean }
  ) {
    playerCard.returnCardFromPlay(card, posId)
  }

  function switchMenu(menu: number) {
    if (menu === 1) {
      const length = Object.keys(MENU_1).length
      currentMenu1.value = (currentMenu1.value + 1) % length
    }
  }

  function switchToPlayField() {
    currentMenu1.value = MENU_1.PLAY
  }

  return {
    discardViewSwipeDown,
    handSwipeUp,
    discardViewSwipeUp,
    switchMenu,
    switchToPlayField,
    playViewSwipeUp,
    playViewSwipeDown,
    handChangePosition,

    currentMenu1: readonly(currentMenu1)
  }
}
