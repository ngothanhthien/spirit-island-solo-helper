import { addResult } from '@/database/result'

async function tryUploadResult() {
  const pendingResult = localStorage.pendingResult
  if (pendingResult && pendingResult.length > 0) {
    const isSuccess = await addResult(pendingResult[0], { fromPending: true })
    if (isSuccess) {
      setTimeout(() => {
        tryUploadResult()
      }, 10000)
    }
  }
}

export { tryUploadResult }
