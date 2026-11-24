// Избира хранилището: Firebase, ако има конфигурация в .env,
// иначе демо режим с localStorage.
//
// Общ интерфейс:
//   mode                              'firebase' | 'demo'
//   subscribeSlots(date, cb)          публично: заети блокове (без имена)
//   createBooking(data)               публично: нова резервация
//   signIn(email, pw) / signOut()     админ
//   onAuth(cb)                        админ: cb(isLoggedIn)
//   subscribeBookings(date, cb, err)  админ: пълни резервации
//   cancelBooking(booking)            админ

import { salonId } from '../../data/salon'

// Демо салоните (?salon=…) винаги са в демо режим, за да не пишат
// пробни резервации в истинската база.
const hasFirebase =
  !salonId && Boolean(import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_PROJECT_ID)

export const store = hasFirebase ? await import('./firebaseStore') : await import('./localStore')
