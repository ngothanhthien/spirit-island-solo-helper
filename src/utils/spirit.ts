import { useGameOptionStore } from "@/stores/GameOptionStore";
import { usePowerDeckStore } from "@/stores/PowerDeckStore";
import { useDaysThatNeverWereStore } from "@/stores/DaysThatNeverWhereStore";

export function setupDaysThatNeverWere(playerIndex: number) {
    const minor = usePowerDeckStore('minor')
    const major = usePowerDeckStore('major')
    const gameOption = useGameOptionStore()
    const deck = useDaysThatNeverWereStore()
    let numberCard = 4
    if (gameOption.numberSpirit && gameOption.numberSpirit < 3) {
        numberCard = 6
    }
    for(let i = 0; i < numberCard; i++) {
        const minorCard = minor.reveal()
        const majorCard = major.reveal()
        deck.minor.push(minorCard)
        deck.major.push(majorCard)        
    }

    deck.current = playerIndex
}