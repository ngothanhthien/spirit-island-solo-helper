import { addDoc, collection } from "firebase/firestore";
import { db } from "@/plugins/firebase";

export const results = collection(db, 'result')
interface Result {
    adversary: string
    fear_stage: number
    level: number
    invader_card_left: number
    win: boolean
    spirits: string[]
}
export async function addResult(result: Result) {
    return await addDoc(collection(db, "result"), result)
}