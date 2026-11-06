import { useEffect, useMemo, useState } from 'react'
import { site } from '../../data/site'
import { team } from '../../data/team'
import { store } from '../../lib/store'
import { freeStarts, getDaySchedule, minStartFor } from '../../lib/time'

// Абонира се за заетите блокове на дадена дата.
export function useSlotsFor(dateISO) {
  const [state, setState] = useState({ slots: [], loading: true, error: null })
  useEffect(() => {
    if (!dateISO) return undefined
    const unsub = store.subscribeSlots(
      dateISO,
      (slots) => setState({ slots, loading: false, error: null }),
      (err) => setState({ slots: [], loading: false, error: err }),
    )
    return unsub
  }, [dateISO])
  return state
}

/**
 * Свободни начални часове за дата + услуга + бръснар (или 'any').
 * Връща [{ startMin, barberIds: [...] }] – кои бръснари са свободни в този час.
 */
export function useFreeSlots({ dateISO, barberId, durationMinutes, slots }) {
  return useMemo(() => {
    if (!dateISO || !durationMinutes) return []
    const barbers = barberId === 'any' ? team : team.filter((b) => b.id === barberId)
    const minStart = minStartFor(dateISO, site.booking)
    const byStart = new Map()
    for (const b of barbers) {
      const busySet = new Set(slots.filter((s) => s.barberId === b.id).map((s) => s.startMin))
      const day = getDaySchedule(b, dateISO, site.schedule)
      for (const start of freeStarts({ day, durationMinutes, stepMinutes: site.booking.stepMinutes, busySet, minStart })) {
        if (!byStart.has(start)) byStart.set(start, [])
        byStart.get(start).push(b.id)
      }
    }
    return [...byStart.entries()].sort((a, b) => a[0] - b[0]).map(([startMin, barberIds]) => ({ startMin, barberIds }))
  }, [dateISO, barberId, durationMinutes, slots])
}

// Дали някой от избраните бръснари изобщо работи на тази дата.
export function worksOn(barberId, dateISO) {
  const barbers = barberId === 'any' ? team : team.filter((b) => b.id === barberId)
  return barbers.some((b) => getDaySchedule(b, dateISO, site.schedule))
}
