import { initializeApp } from 'firebase/app'
import { addDoc, collection, getFirestore } from 'firebase/firestore'

export const firebaseApp = initializeApp({
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: 'spirit-island-solo-app.firebaseapp.com',
  projectId: 'spirit-island-solo-app',
  storageBucket: 'spirit-island-solo-app.appspot.com',
  messagingSenderId: import.meta.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.FIREBASE_APP_ID,
})

const db = getFirestore(firebaseApp)

interface Result {
  adversary: string
  fear_stage: number
  level: number
  invader_card_left: number
  win: boolean
  spirits: string[]
}

export const results = collection(db, 'result')

export async function addResult(result: Result) {
  const docRef = await addDoc(collection(db, "result"), result)
  return docRef
}

export async function addError(error: Error) {
  const docRef = await addDoc(collection(db, "error"), error)
  return docRef
}