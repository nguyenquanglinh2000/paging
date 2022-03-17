import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyCeHxL7OaZPkTxuP3TkOKLenorkkXTpTLI',
  authDomain: 'hand-1e0c4.firebaseapp.com',
  projectId: 'hand-1e0c4',
  storageBucket: 'hand-1e0c4.appspot.com',
  messagingSenderId: '542577922463',
  appId: '1:542577922463:web:0792f9d0461a3403b5edaa'
})
const db = getFirestore()

export {
  firebaseApp,
  db
}
