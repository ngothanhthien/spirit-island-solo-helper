import { useEventDeckStore } from "@/stores/EventDeckStore"
import { useModalDiscardStore } from "@/stores/ModalDiscardStore"
import { computed, ref } from "vue"

export default function () {
    const eventDeck = useEventDeckStore()
    const currentEvent = ref<string | null>(null)
    const modalDiscard = useModalDiscardStore()
    
    const canShowDiscardPile = computed(() => eventDeck.canShowDiscardPile)

    function discardEvent() {
      eventDeck.popEvent()
      currentEvent.value = null
    }
    function putUnderTwoTopCard() {
      eventDeck.putUnderTwoTopCard()
      currentEvent.value = null
    }
    // function showDiscardPile() {
    //   if(eventDeck.canShowDiscardPile) {
    //     modalDiscard.setDeck(eventDeck.discard, 'common')
    //   }
    // }
    function revealEvent() {
      currentEvent.value = eventDeck.reveal()
    }

    return {
        // showDiscardPile,
        discardEvent,
        putUnderTwoTopCard,
        currentEvent,
        revealEvent,
        canShowDiscardPile,
    }
}