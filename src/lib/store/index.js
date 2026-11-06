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

const hasFirebase = Boolean(import.meta.env.VITE_FIREBASE_API_KEY && import.meta.env.VITE_FIREBASE_PROJECT_ID)

export const store = hasFirebase ? await import('./firebaseStore') : await import('./localStore')
