import { useFearDeckStore } from "@/stores/FearDeckStore";
import { useGameOptionStore } from "@/stores/GameOptionStore";
import { useMessageStore } from "@/stores/MessageStore";

export function setupInvadersFindTheLand() {
    const fearDeck = useFearDeckStore()
    const gameOption = useGameOptionStore()
    const fearAdd = Math.floor((1 + 0.5 * (fearDeck.currentStage - 1)) * (gameOption.numberSpirit as number))
    fearDeck.maxFear += fearAdd
    useMessageStore().setMessage(`Fear max +${fearAdd}`)
}