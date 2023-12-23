import axios from 'axios'
import { API_CREATE_MATCH_LOG } from "@/constant/api"
import {type PendingResult, type Result} from "@/types"
import {useLocalStorageStore} from "@/stores/LocalStorageStore";

// @ts-ignore
export async function addResult(result: Result | PendingResult, {  fromPending = false } = {}) {
    try {
        const payload = {
            ...result
        }
        if (fromPending) {
            // @ts-ignore
            payload.real_created_at = convertToDatabaseTime(result.createdAt, result.offset)
        }
        await axios.post(API_CREATE_MATCH_LOG, payload)
        if (fromPending) {
            // @ts-ignore
            useLocalStorageStore().removePendingMatchLog(result.id)
        }

        return true
    } catch (e) {
        if (!fromPending) {
            useLocalStorageStore().addPendingMatchLog(result as Result)
        }

        return false
    }
}

function convertToDatabaseTime(date: Date, offset: number) {
    const utcDate = new Date(date.getTime() - (offset * 60000));
    return utcDate.toISOString();
}