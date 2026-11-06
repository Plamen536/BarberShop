// Хранилище във Firebase (Firestore + Auth). Структура:
//   bookings/{id}  – пълните данни (име, телефон…) – четат само админи
//   slots/{barberId_дата_ЧЧММ} – един документ за всеки зает блок от
//                    stepMinutes – публично четене, само дата/час, без
//                    лични данни. Създаването им в един batch прави
//                    резервацията атомарна: ако блок вече съществува,
//                    целият запис се отхвърля (виж firestore.rules).

import { initializeApp } from 'firebase/app'
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as fbSignOut,
} from 'firebase/auth'
import {
  collection,
  doc,
  getFirestore,
  onSnapshot,
  query,
  serverTimestamp,
  where,
  writeBatch,
} from 'firebase/firestore'
import { blocksBetween, blockId, toHHMM, toMin } from '../time'
import { site } from '../../data/site'

const env = import.meta.env
const app = initializeApp({
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  appId: env.VITE_FIREBASE_APP_ID,
})
const db = getFirestore(app)
const auth = getAuth(app)

export const mode = 'firebase'

const slotIds = (b) =>
  blocksBetween(toMin(b.start), toMin(b.end), site.booking.stepMinutes).map((m) => ({
    id: blockId(b.barberId, b.date, m),
    startMin: m,
  }))

export function subscribeSlots(dateISO, cb, onError) {
  const q = query(collection(db, 'slots'), where('date', '==', dateISO))
  return onSnapshot(
    q,
    (snap) => {
      cb(
        snap.docs.map((d) => {
          const s = d.data()
          return { id: d.id, barberId: s.barberId, date: s.date, startMin: toMin(s.start), bookingId: s.bookingId }
        }),
      )
    },
    (err) => {
      console.error('Firestore slots error:', err)
      onError?.(err)
    },
  )
}

export async function createBooking(data) {
  const bookingRef = doc(collection(db, 'bookings'))
  const batch = writeBatch(db)
  batch.set(bookingRef, { ...data, status: 'confirmed', createdAt: serverTimestamp() })
  for (const s of slotIds(data)) {
    batch.set(doc(db, 'slots', s.id), {
      barberId: data.barberId,
      date: data.date,
      start: toHHMM(s.startMin),
      bookingId: bookingRef.id,
    })
  }
  try {
    await batch.commit()
  } catch (e) {
    // Правилата позволяват само create на slots -> ако блок съществува,
    // batch-ът се отхвърля с permission-denied.
    if (e.code === 'permission-denied') {
      throw Object.assign(new Error('Часът току-що беше зает. Избери друг.'), { code: 'slot-taken' })
    }
    throw e
  }
  return bookingRef.id
}

// ---- админ ----
export async function signIn(email, password) {
  await signInWithEmailAndPassword(auth, email, password)
}

export async function signOut() {
  await fbSignOut(auth)
}

export function onAuth(cb) {
  return onAuthStateChanged(auth, (user) => cb(!!user))
}

export function subscribeBookings(dateISO, cb, onError) {
  const q = query(collection(db, 'bookings'), where('date', '==', dateISO))
  return onSnapshot(
    q,
    (snap) => cb(snap.docs.map((d) => ({ id: d.id, ...d.data() }))),
    (err) => onError?.(err),
  )
}

export async function cancelBooking(booking) {
  const batch = writeBatch(db)
  batch.delete(doc(db, 'bookings', booking.id))
  for (const s of slotIds(booking)) batch.delete(doc(db, 'slots', s.id))
  await batch.commit()
}
