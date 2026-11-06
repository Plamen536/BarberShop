import { useEffect, useMemo, useState } from 'react'
import { currency, services } from '../../data/services'
import { site } from '../../data/site'
import { team } from '../../data/team'
import { store } from '../../lib/store'
import { addDays, formatDateBG, formatDuration, isoDate, parseISO, toHHMM } from '../../lib/time'
import Icon from '../Icons'
import Placeholder from '../Placeholder'
import Calendar from './Calendar'
import { useFreeSlots, useSlotsFor, worksOn } from './useFreeSlots'

const STEPS = ['Бръснар', 'Услуга', 'Дата и час', 'Данни']

const initial = { barberId: '', serviceId: '', date: '', startMin: null, name: '', phone: '', note: '' }

export default function BookingWizard() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState(initial)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(null)

  const service = services.find((s) => s.id === form.serviceId)
  const barber = team.find((b) => b.id === form.barberId)
  const { slots, loading } = useSlotsFor(form.date)
  const free = useFreeSlots({ dateISO: form.date, barberId: form.barberId, durationMinutes: service?.durationMinutes, slots })

  // „Запази“ от картата на услуга: избира услугата и прескача на стъпка 1.
  useEffect(() => {
    const onSelect = (e) => {
      setDone(null)
      setForm((f) => ({ ...f, serviceId: e.detail, date: '', startMin: null }))
      setStep((s) => (s === 0 && !form.barberId ? 0 : Math.max(s, 2)))
    }
    window.addEventListener('select-service', onSelect)
    return () => window.removeEventListener('select-service', onSelect)
  }, [form.barberId])

  const set = (patch) => setForm((f) => ({ ...f, ...patch }))
  const minDate = useMemo(() => new Date(), [])
  const maxDate = useMemo(() => addDays(new Date(), site.booking.maxDaysAhead), [])

  const isDayDisabled = (iso) => {
    const d = parseISO(iso)
    if (iso < isoDate(minDate) || d > maxDate) return true
    return !worksOn(form.barberId, iso)
  }

  // Ако избраният час междувременно е зает (live update), той отпада.
  const startMin = form.startMin !== null && free.some((f) => f.startMin === form.startMin) ? form.startMin : null

  const canNext = [!!form.barberId, !!form.serviceId, form.date && startMin !== null, true][step]

  const submit = async (e) => {
    e.preventDefault()
    if (!canNext) return
    setSubmitting(true)
    setError('')
    const slot = free.find((f) => f.startMin === startMin)
    const chosenBarber = form.barberId === 'any' ? slot?.barberIds[0] : form.barberId
    const data = {
      barberId: chosenBarber,
      serviceId: form.serviceId,
      date: form.date,
      start: toHHMM(startMin),
      end: toHHMM(startMin + service.durationMinutes),
      name: form.name.trim(),
      phone: form.phone.trim(),
      note: form.note.trim(),
    }
    try {
      await store.createBooking(data)
      setDone({ ...data, barberName: team.find((b) => b.id === chosenBarber)?.name, serviceName: service.name })
      setForm(initial)
      setStep(0)
    } catch (err) {
      setError(
        err.code === 'slot-taken'
          ? 'Този час току-що беше зает от друг клиент. Моля, избери друг.'
          : 'Възникна грешка при записването. Опитай отново или ни се обади.',
      )
      if (err.code === 'slot-taken') setStep(2)
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  if (done) {
    return (
      <div role="status" aria-live="polite" className="card flex flex-col items-center p-8 text-center hover:translate-y-0 sm:p-10">
        <span className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold text-ink">
          <Icon name="check" className="h-8 w-8" />
        </span>
        <h3 className="font-display text-2xl font-semibold sm:text-3xl">Благодарим, {done.name}!</h3>
        <p className="mt-3 max-w-md text-muted">Часът ти е запазен:</p>
        <dl className="mt-5 w-full max-w-sm divide-y divide-line rounded-sm border border-line text-left text-sm">
          {[
            ['Услуга', done.serviceName],
            ['Бръснар', done.barberName],
            ['Дата', formatDateBG(done.date)],
            ['Час', `${done.start} – ${done.end}`],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 px-4 py-2.5">
              <dt className="text-muted">{k}</dt>
              <dd className="text-right font-medium text-cream">{v}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 max-w-md text-sm text-muted">
          Ако се наложи промяна, обади ни се на{' '}
          <a href={`tel:${site.phone.replace(/[^+\d]/g, '')}`} className="text-cream hover:text-gold">
            {site.phone}
          </a>
          .
        </p>
        <button type="button" onClick={() => setDone(null)} className="btn-ghost mt-8">
          Нова резервация
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={submit} className="card p-5 hover:translate-y-0 sm:p-8">
      {/* Стъпки */}
      <ol className="mb-8 grid grid-cols-4 gap-2" aria-label="Стъпки">
        {STEPS.map((label, i) => (
          <li key={label} className="flex flex-col items-center gap-2 text-center">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold transition-colors ${
                i < step ? 'border-gold bg-gold text-ink' : i === step ? 'border-gold text-gold' : 'border-line text-muted'
              }`}
              aria-current={i === step ? 'step' : undefined}
            >
              {i < step ? <Icon name="check" className="h-4 w-4" /> : i + 1}
            </span>
            <span className={`text-[11px] uppercase tracking-wider ${i === step ? 'text-cream' : 'text-muted'}`}>{label}</span>
          </li>
        ))}
      </ol>

      {/* Стъпка 1: бръснар */}
      {step === 0 && (
        <fieldset>
          <legend className="label">Избери бръснар</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {[...team, { id: 'any', name: 'Без значение', role: 'Първият свободен бръснар' }].map((b) => (
              <label
                key={b.id}
                className={`flex cursor-pointer items-center gap-4 rounded-sm border p-3 transition-all hover:border-gold/60 ${
                  form.barberId === b.id ? 'border-gold bg-gold/10' : 'border-line bg-slate'
                }`}
              >
                <input
                  type="radio"
                  name="barber"
                  value={b.id}
                  checked={form.barberId === b.id}
                  onChange={() => set({ barberId: b.id, date: '', startMin: null })}
                  className="sr-only"
                />
                {b.image ? (
                  <Placeholder src={b.image} alt="" label="" className="h-14 w-14 shrink-0 rounded-full object-cover" />
                ) : (
                  <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                    <Icon name="scissors" className="h-6 w-6" />
                  </span>
                )}
                <span>
                  <span className="block font-semibold">{b.name}</span>
                  <span className="block text-xs text-muted">{b.specialty ?? b.role}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {/* Стъпка 2: услуга */}
      {step === 1 && (
        <fieldset>
          <legend className="label">Избери услуга</legend>
          <div className="grid gap-3">
            {services.map((s) => (
              <label
                key={s.id}
                className={`flex cursor-pointer items-center justify-between gap-4 rounded-sm border p-4 transition-all hover:border-gold/60 ${
                  form.serviceId === s.id ? 'border-gold bg-gold/10' : 'border-line bg-slate'
                }`}
              >
                <input
                  type="radio"
                  name="service"
                  value={s.id}
                  checked={form.serviceId === s.id}
                  onChange={() => set({ serviceId: s.id, startMin: null })}
                  className="sr-only"
                />
                <span className="flex items-center gap-3">
                  <Icon name={s.icon} className="h-6 w-6 shrink-0 text-gold" />
                  <span>
                    <span className="block font-semibold">{s.name}</span>
                    <span className="block text-xs text-muted">{formatDuration(s.durationMinutes)}</span>
                  </span>
                </span>
                <span className="font-display text-xl font-semibold text-gold">
                  {s.price} <span className="text-sm text-cream/70">{currency}</span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      {/* Стъпка 3: дата и час */}
      {step === 2 && (
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <p className="label">Избери ден</p>
            <Calendar value={form.date} onChange={(d) => set({ date: d, startMin: null })} isDisabled={isDayDisabled} minDate={minDate} maxDate={maxDate} />
          </div>
          <div>
            <p className="label">
              Свободни часове{service ? ` · ${formatDuration(service.durationMinutes)}` : ''}
            </p>
            {!form.date ? (
              <p className="rounded-sm border border-dashed border-line p-6 text-center text-sm text-muted">Първо избери ден от календара.</p>
            ) : loading ? (
              <p className="rounded-sm border border-dashed border-line p-6 text-center text-sm text-muted">Зареждане…</p>
            ) : free.length === 0 ? (
              <p className="rounded-sm border border-dashed border-line p-6 text-center text-sm text-muted">
                Няма свободни часове на {formatDateBG(form.date)}. Опитай друг ден{form.barberId !== 'any' ? ' или друг бръснар' : ''}.
              </p>
            ) : (
              <div className="grid max-h-80 grid-cols-3 gap-2 overflow-y-auto pr-1 sm:grid-cols-4 lg:grid-cols-3" role="radiogroup" aria-label="Свободни часове">
                {free.map((f) => (
                  <button
                    key={f.startMin}
                    type="button"
                    role="radio"
                    aria-checked={startMin === f.startMin}
                    onClick={() => set({ startMin: f.startMin })}
                    className={`rounded-sm border py-2.5 text-sm font-medium transition-all ${
                      startMin === f.startMin
                        ? 'border-gold bg-gold text-ink'
                        : 'border-line bg-slate text-cream hover:border-gold hover:text-gold'
                    }`}
                  >
                    {toHHMM(f.startMin)}
                  </button>
                ))}
              </div>
            )}
            {form.date && startMin !== null && service && (
              <p className="mt-4 text-sm text-muted">
                {formatDateBG(form.date)}, <strong className="text-cream">{toHHMM(startMin)} – {toHHMM(startMin + service.durationMinutes)}</strong>
              </p>
            )}
          </div>
        </div>
      )}

      {/* Стъпка 4: данни */}
      {step === 3 && (
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2 rounded-sm border border-gold/30 bg-gold/5 p-4 text-sm">
            <p className="label !mb-1">Твоята резервация</p>
            <p>
              <strong>{service?.name}</strong> · {barber?.name ?? 'първият свободен бръснар'} ·{' '}
              {formatDateBG(form.date)} в <strong>{toHHMM(startMin)}</strong>
            </p>
          </div>
          <div>
            <label htmlFor="b-name" className="label">
              Име *
            </label>
            <input id="b-name" type="text" required minLength={2} maxLength={80} autoComplete="name" placeholder="Иван Иванов" value={form.name} onChange={(e) => set({ name: e.target.value })} className="field" />
          </div>
          <div>
            <label htmlFor="b-phone" className="label">
              Телефон *
            </label>
            <input
              id="b-phone"
              type="tel"
              required
              inputMode="tel"
              autoComplete="tel"
              pattern="\+?[0-9\s\-\(\)]{6,20}"
              title="Въведи валиден телефонен номер"
              placeholder="+359 88 000 0000"
              value={form.phone}
              onChange={(e) => set({ phone: e.target.value })}
              className="field"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="b-note" className="label">
              Бележка
            </label>
            <textarea id="b-note" rows={3} maxLength={500} placeholder="Специални желания…" value={form.note} onChange={(e) => set({ note: e.target.value })} className="field resize-none" />
          </div>
        </div>
      )}

      {error && (
        <p role="alert" className="mt-5 rounded-sm border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
          {error}
        </p>
      )}

      {/* Навигация */}
      <div className="mt-8 flex items-center justify-between gap-3 border-t border-line pt-6">
        <button type="button" onClick={() => setStep((s) => s - 1)} disabled={step === 0} className="btn-ghost disabled:invisible">
          Назад
        </button>
        {step < STEPS.length - 1 ? (
          <button type="button" onClick={() => setStep((s) => s + 1)} disabled={!canNext} className="btn-primary disabled:cursor-not-allowed disabled:opacity-40">
            Напред
          </button>
        ) : (
          <button type="submit" disabled={submitting} className="btn-primary disabled:opacity-60">
            {submitting ? 'Записване…' : 'Потвърди часа'}
          </button>
        )}
      </div>
    </form>
  )
}
