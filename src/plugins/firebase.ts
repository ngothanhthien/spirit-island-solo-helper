import { initializeApp } from 'firebase/app'
import { addDoc, collection, getFirestore, initializeFirestore, CACHE_SIZE_UNLIMITED } from 'firebase/firestore'

export const firebaseApp = initializeApp({
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: 'spirit-island-solo-app.firebaseapp.com',
  projectId: 'spirit-island-solo-app',
  storageBucket: 'spirit-island-solo-app.appspot.com',
  messagingSenderId: import.meta.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.FIREBASE_APP_ID,
})
initializeFirestore(firebaseApp, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
})

export const db = getFirestore(firebaseApp)
export async function addError(error: Error) {
  return await addDoc(collection(db, "error"), error)
}