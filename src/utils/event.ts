import { useEventDeckStore } from "@/stores/EventDeckStore";
import { useFearDeckStore } from "@/stores/FearDeckStore";
import { useGameOptionStore } from "@/stores/GameOptionStore";

export function addFearToTop() {
  const fearDeck = useFearDeckStore()
  fearDeck.addNewFearPool()
}

export function putEventUnderTwo() {
  const eventDeck = useEventDeckStore()
  eventDeck.putUnderTwoTopCard()
  eventDeck.reveal = null 
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