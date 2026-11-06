// Помощни функции за дати и часове. Всичко е в локално време на браузъра.

export const toMin = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number)
  return h * 60 + m
}

export const toHHMM = (min) =>
  `${String(Math.floor(min / 60)).padStart(2, '0')}:${String(min % 60).padStart(2, '0')}`

// Date -> 'ГГГГ-ММ-ДД' (локално, НЕ toISOString, което е в UTC)
export const isoDate = (d) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`

export const parseISO = (s) => {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}

export const addDays = (d, n) => {
  const x = new Date(d)
  x.setDate(x.getDate() + n)
  return x
}

export const todayISO = () => isoDate(new Date())

export const formatDuration = (min) => {
  const h = Math.floor(min / 60)
  const m = min % 60
  if (h && m) return `${h} ч ${m} мин`
  if (h) return `${h} ч`
  return `${m} мин`
}

export const formatDateBG = (iso, opts = { weekday: 'long', day: 'numeric', month: 'long' }) =>
  parseISO(iso).toLocaleDateString('bg-BG', opts)

// Начални минути на всички блокове [start, end) със стъпка step.
export const blocksBetween = (startMin, endMin, step) => {
  const out = []
  for (let m = startMin; m < endMin; m += step) out.push(m)
  return out
}

// ID на документ за един зает блок – уникално за бръснар + дата + час.
export const blockId = (barberId, date, startMin) => `${barberId}_${date}_${toHHMM(startMin).replace(':', '')}`

// Работно време на бръснар за конкретна дата или null, ако не работи.
export function getDaySchedule(barber, dateISO, siteSchedule) {
  if (barber?.daysOff?.includes(dateISO)) return null
  const weekday = parseISO(dateISO).getDay()
  const sched = barber?.schedule ?? siteSchedule
  const day = sched[weekday]
  if (!day) return null
  return { open: toMin(day.open), close: toMin(day.close) }
}

// Най-ранният допустим начален час (в минути) за дадена дата.
export function minStartFor(dateISO, { minLeadMinutes, stepMinutes }, now = new Date()) {
  if (dateISO !== isoDate(now)) return 0
  const nowMin = now.getHours() * 60 + now.getMinutes() + minLeadMinutes
  return Math.ceil(nowMin / stepMinutes) * stepMinutes
}

/**
 * Свободни начални часове (в минути) за един бръснар в един ден.
 * busySet – Set от началните минути на заетите блокове.
 */
export function freeStarts({ day, durationMinutes, stepMinutes, busySet, minStart = 0 }) {
  if (!day) return []
  const out = []
  for (let start = day.open; start + durationMinutes <= day.close; start += stepMinutes) {
    if (start < minStart) continue
    const blocks = blocksBetween(start, start + durationMinutes, stepMinutes)
    if (blocks.every((b) => !busySet.has(b))) out.push(start)
  }
  return out
}
