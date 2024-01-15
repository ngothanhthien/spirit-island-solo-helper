import { useEventDeckStore } from "@/stores/EventDeckStore";
import { useFearDeckStore } from "@/stores/FearDeckStore";
import { useGameOptionStore } from "@/stores/GameOptionStore";
import {useInvaderCardStore} from "@/stores/InvaderCardStore";

export function addFearToTop() {
  const fearDeck = useFearDeckStore()
  fearDeck.addNewFearPool()
}

export function putEventUnderTwo() {
  const eventDeck = useEventDeckStore()
  eventDeck.putUnderTwoTopCard()
}

export function moveBack2FearPerPlayer() {
    const fearDeck = useFearDeckStore()
    const gameOption = useGameOptionStore()
    const fearReduce = gameOption.numberSpirit as number * 2
    if (fearDeck.currentFear <= fearReduce) {
      fearDeck.currentFear = 0
    } else {
        fearDeck.currentFear -= fearReduce
    }
}

export function returnTopFearToBox() {
  const fearDeck = useFearDeckStore()
  fearDeck.draw.pop()
}

export function returnTopInvaderCardToBox() {
  const invaderDeck = useInvaderCardStore()
  invaderDeck.draw.pop()
}