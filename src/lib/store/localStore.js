// ДЕМО хранилище: пази резервациите в localStorage на браузъра.
// Работи само на това устройство – подходящо за тестване, НЕ за реална
// употреба. Виж README за настройка на Firebase.

import { blocksBetween, blockId, toMin } from '../time'
import { site } from '../../data/site'

const KEY = 'barbershop.bookings'
const AUTH_KEY = 'barbershop.admin'
const DEMO_PASSWORD = import.meta.env.VITE_ADMIN_DEMO_PASSWORD || 'admin'

const listeners = new Set()
const emit = () => listeners.forEach((fn) => fn())
window.addEventListener('storage', (e) => e.key === KEY && emit())

const readAll = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY) || '[]')
  } catch {
    return []
  }
}
const writeAll = (arr) => {
  localStorage.setItem(KEY, JSON.stringify(arr))
  emit()
}

const slotsOf = (b) =>
  blocksBetween(toMin(b.start), toMin(b.end), site.booking.stepMinutes).map((m) => ({
    id: blockId(b.barberId, b.date, m),
    barberId: b.barberId,
    date: b.date,
    startMin: m,
    bookingId: b.id,
  }))

export const mode = 'demo'

export function subscribeSlots(dateISO, cb) {
  const run = () => cb(readAll().filter((b) => b.date === dateISO).flatMap(slotsOf))
  run()
  listeners.add(run)
  return () => listeners.delete(run)
}

export async function createBooking(data) {
  const all = readAll()
  const id = `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`
  const booking = { ...data, id, createdAt: new Date().toISOString(), status: 'confirmed' }
  const taken = new Set(all.filter((b) => b.date === data.date).flatMap((b) => slotsOf(b).map((s) => s.id)))
  if (slotsOf(booking).some((s) => taken.has(s.id))) {
    throw Object.assign(new Error('Часът току-що беше зает.'), { code: 'slot-taken' })
  }
  writeAll([...all, booking])
  return id
}

// ---- админ ----
const authListeners = new Set()
const isAuthed = () => sessionStorage.getItem(AUTH_KEY) === '1'

export async function signIn(_email, password) {
  if (password !== DEMO_PASSWORD) {
    throw Object.assign(new Error('Грешна парола.'), { code: 'auth/wrong-password' })
  }
  sessionStorage.setItem(AUTH_KEY, '1')
  authListeners.forEach((fn) => fn(true))
}

export async function signOut() {
  sessionStorage.removeItem(AUTH_KEY)
  authListeners.forEach((fn) => fn(false))
}

export function onAuth(cb) {
  cb(isAuthed())
  authListeners.add(cb)
  return () => authListeners.delete(cb)
}

export function subscribeBookings(dateISO, cb) {
  const run = () => cb(readAll().filter((b) => b.date === dateISO))
  run()
  listeners.add(run)
  return () => listeners.delete(run)
}

export async function cancelBooking(booking) {
  writeAll(readAll().filter((b) => b.id !== booking.id))
}
