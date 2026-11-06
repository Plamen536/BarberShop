import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router'
import Icon from '../components/Icons'
import { services } from '../data/services'
import { site } from '../data/site'
import { team } from '../data/team'
import { store } from '../lib/store'
import { addDays, formatDateBG, getDaySchedule, isoDate, parseISO, toHHMM, toMin, todayISO } from '../lib/time'
import { telHref } from '../utils'

const BLOCK_SERVICE = 'block'

export default function Admin() {
  const [authed, setAuthed] = useState(null)
  useEffect(() => store.onAuth(setAuthed), [])

  return (
    <div className="min-h-screen bg-ink text-cream">
      <header className="border-b border-line bg-coal">
        <div className="container-x flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5">
            <Icon name="scissors" className="h-6 w-6 text-gold" />
            <span className="font-display text-lg font-semibold">{site.name}</span>
            <span className="ml-2 rounded-sm border border-gold/40 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
              Админ
            </span>
          </Link>
          {authed && (
            <button type="button" onClick={() => store.signOut()} className="inline-flex items-center gap-2 text-sm text-muted hover:text-gold">
              <Icon name="logout" className="h-5 w-5" /> Изход
            </button>
          )}
        </div>
      </header>

      {store.mode === 'demo' && (
        <div className="border-b border-gold/30 bg-gold/10 px-4 py-2 text-center text-xs text-gold">
          <strong>Демо режим:</strong> резервациите се пазят само в този браузър (localStorage). Настрой Firebase по README за реална работа.
        </div>
      )}

      <main className="container-x py-8">
        {authed === null ? <p className="text-muted">Зареждане…</p> : authed ? <Dashboard /> : <Login />}
      </main>
    </div>
  )
}

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const demo = store.mode === 'demo'

  const submit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      await store.signIn(email, password)
    } catch {
      setError(demo ? 'Грешна парола.' : 'Грешен e-mail или парола.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} className="card mx-auto mt-10 max-w-sm p-8 hover:translate-y-0">
      <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold">
        <Icon name="lock" className="h-6 w-6" />
      </span>
      <h1 className="font-display text-2xl font-semibold">Вход за администратор</h1>
      <p className="mt-2 text-sm text-muted">Само за екипа на бръснарницата.</p>
      {!demo && (
        <div className="mt-6">
          <label htmlFor="a-email" className="label">
            E-mail
          </label>
          <input id="a-email" type="email" required autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} className="field" />
        </div>
      )}
      <div className="mt-4">
        <label htmlFor="a-pass" className="label">
          Парола
        </label>
        <input id="a-pass" type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="field" />
        {demo && <p className="mt-2 text-xs text-muted">Демо парола: „admin“ (VITE_ADMIN_DEMO_PASSWORD).</p>}
      </div>
      {error && (
        <p role="alert" className="mt-4 text-sm text-red-300">
          {error}
        </p>
      )}
      <button type="submit" disabled={busy} className="btn-primary mt-6 w-full disabled:opacity-60">
        {busy ? 'Проверка…' : 'Вход'}
      </button>
    </form>
  )
}

function Dashboard() {
  const [date, setDate] = useState(todayISO())
  const [bookings, setBookings] = useState([])
  const [error, setError] = useState('')
  const [blockOpen, setBlockOpen] = useState(false)

  useEffect(() => {
    return store.subscribeBookings(date, setBookings, (e) => setError(`Грешка при зареждане: ${e.message}`))
  }, [date])

  const byBarber = useMemo(() => {
    const map = Object.fromEntries(team.map((b) => [b.id, []]))
    for (const b of bookings) (map[b.barberId] ??= []).push(b)
    for (const list of Object.values(map)) list.sort((a, b) => toMin(a.start) - toMin(b.start))
    return map
  }, [bookings])

  const shift = (n) => setDate(isoDate(addDays(parseISO(date), n)))
  const real = bookings.filter((b) => b.serviceId !== BLOCK_SERVICE)

  const cancel = async (b) => {
    const label = b.serviceId === BLOCK_SERVICE ? 'блокираното време' : `резервацията на ${b.name}`
    if (!window.confirm(`Сигурен ли си, че искаш да изтриеш ${label} (${b.start} – ${b.end})?`)) return
    try {
      await store.cancelBooking(b)
    } catch (e) {
      setError(`Неуспешно изтриване: ${e.message}`)
    }
  }

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="label">Резервации за</p>
          <div className="flex items-center gap-2">
            <button type="button" onClick={() => shift(-1)} aria-label="Предишен ден" className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-line hover:border-gold hover:text-gold">
              <Icon name="chevronLeft" className="h-5 w-5" />
            </button>
            <input type="date" value={date} onChange={(e) => e.target.value && setDate(e.target.value)} className="field !w-auto" aria-label="Дата" />
            <button type="button" onClick={() => shift(1)} aria-label="Следващ ден" className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-line hover:border-gold hover:text-gold">
              <Icon name="chevronRight" className="h-5 w-5" />
            </button>
            <button type="button" onClick={() => setDate(todayISO())} className="btn-ghost !px-4 !py-2.5 !text-xs">
              Днес
            </button>
          </div>
          <p className="mt-2 text-sm text-muted first-letter:uppercase">
            {formatDateBG(date, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} · {real.length}{' '}
            {real.length === 1 ? 'резервация' : 'резервации'}
          </p>
        </div>
        <button type="button" onClick={() => setBlockOpen((v) => !v)} className="btn-ghost !px-4 !py-2.5 !text-xs">
          <Icon name="calendar" className="h-4 w-4" /> Блокирай време
        </button>
      </div>

      {blockOpen && <BlockForm date={date} onDone={() => setBlockOpen(false)} />}

      {error && (
        <p role="alert" className="mt-6 rounded-sm border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
          {error}
        </p>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {team.map((barber) => {
          const day = getDaySchedule(barber, date, site.schedule)
          const list = byBarber[barber.id] ?? []
          return (
            <section key={barber.id} className="rounded-md border border-line bg-coal" aria-labelledby={`h-${barber.id}`}>
              <header className="flex items-center justify-between border-b border-line px-5 py-4">
                <div>
                  <h2 id={`h-${barber.id}`} className="font-display text-lg font-semibold">
                    {barber.name}
                  </h2>
                  <p className="text-xs text-muted">{day ? `${toHHMM(day.open)} – ${toHHMM(day.close)}` : 'Не работи'}</p>
                </div>
                <span className="rounded-full bg-gold/15 px-2.5 py-1 text-xs font-semibold text-gold">{list.filter((b) => b.serviceId !== BLOCK_SERVICE).length}</span>
              </header>
              <ul className="divide-y divide-line">
                {list.length === 0 && <li className="px-5 py-6 text-center text-sm text-muted">Няма резервации</li>}
                {list.map((b) => {
                  const isBlock = b.serviceId === BLOCK_SERVICE
                  const svc = services.find((s) => s.id === b.serviceId)
                  return (
                    <li key={b.id} className={`flex gap-4 px-5 py-4 ${isBlock ? 'bg-slate/60' : ''}`}>
                      <div className="w-24 shrink-0">
                        <p className="font-display text-lg font-semibold text-gold">{b.start}</p>
                        <p className="text-xs text-muted">до {b.end}</p>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold">{isBlock ? `⛔ ${b.name}` : b.name}</p>
                        <p className="text-sm text-muted">{isBlock ? 'Блокирано време' : (svc?.name ?? b.serviceId)}</p>
                        {!isBlock && (
                          <a href={telHref(b.phone)} className="mt-1 inline-flex items-center gap-1.5 text-sm text-cream hover:text-gold">
                            <Icon name="phone" className="h-4 w-4" /> {b.phone}
                          </a>
                        )}
                        {b.note && <p className="mt-1 text-xs text-muted italic">„{b.note}“</p>}
                      </div>
                      <button type="button" onClick={() => cancel(b)} aria-label={`Изтрий ${b.start}`} className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-sm text-muted hover:bg-red-500/10 hover:text-red-300">
                        <Icon name="trash" className="h-5 w-5" />
                      </button>
                    </li>
                  )
                })}
              </ul>
            </section>
          )
        })}
      </div>
    </>
  )
}

// Блокира интервал (почивка, отпуск, ръчна резервация по телефона).
function BlockForm({ date, onDone }) {
  const [form, setForm] = useState({ barberId: team[0].id, start: '12:00', end: '13:00', name: 'Почивка', phone: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const set = (patch) => setForm((f) => ({ ...f, ...patch }))
  const step = site.booking.stepMinutes

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    const s = toMin(form.start)
    const en = toMin(form.end)
    if (en <= s) return setError('Крайният час трябва да е след началния.')
    if (s % step || en % step) return setError(`Часовете трябва да са кратни на ${step} мин.`)
    setBusy(true)
    try {
      await store.createBooking({
        barberId: form.barberId,
        serviceId: form.phone ? 'manual' : BLOCK_SERVICE,
        date,
        start: form.start,
        end: form.end,
        name: form.name.trim() || 'Блокирано',
        phone: form.phone.trim() || '000000',
        note: '',
      })
      onDone()
    } catch (err) {
      setError(err.code === 'slot-taken' ? 'В този интервал вече има резервация.' : `Грешка: ${err.message}`)
    } finally {
      setBusy(false)
    }
  }

  return (
    <form onSubmit={submit} className="mt-6 grid gap-4 rounded-md border border-gold/30 bg-coal p-5 sm:grid-cols-5">
      <div>
        <label htmlFor="bl-barber" className="label">
          Бръснар
        </label>
        <select id="bl-barber" value={form.barberId} onChange={(e) => set({ barberId: e.target.value })} className="field">
          {team.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="bl-start" className="label">
          От
        </label>
        <input id="bl-start" type="time" step={step * 60} value={form.start} onChange={(e) => set({ start: e.target.value })} className="field" />
      </div>
      <div>
        <label htmlFor="bl-end" className="label">
          До
        </label>
        <input id="bl-end" type="time" step={step * 60} value={form.end} onChange={(e) => set({ end: e.target.value })} className="field" />
      </div>
      <div>
        <label htmlFor="bl-name" className="label">
          Етикет / клиент
        </label>
        <input id="bl-name" type="text" value={form.name} onChange={(e) => set({ name: e.target.value })} className="field" />
      </div>
      <div>
        <label htmlFor="bl-phone" className="label">
          Телефон (ако е клиент)
        </label>
        <input id="bl-phone" type="tel" value={form.phone} onChange={(e) => set({ phone: e.target.value })} className="field" placeholder="по избор" />
      </div>
      {error && (
        <p role="alert" className="text-sm text-red-300 sm:col-span-5">
          {error}
        </p>
      )}
      <div className="flex gap-3 sm:col-span-5">
        <button type="submit" disabled={busy} className="btn-primary !px-5 !py-2.5 !text-xs disabled:opacity-60">
          Запази
        </button>
        <button type="button" onClick={onDone} className="btn-ghost !px-5 !py-2.5 !text-xs">
          Отказ
        </button>
      </div>
    </form>
  )
}
