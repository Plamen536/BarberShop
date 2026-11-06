import { useEffect, useMemo, useState } from 'react'
import { currency, services } from '../data/services'
import { site } from '../data/site'
import { telHref } from '../utils'
import Icon from './Icons'
import SectionTitle from './SectionTitle'

// Генерира часове между firstSlot и lastSlot през stepMinutes.
function buildSlots({ firstSlot, lastSlot, stepMinutes }) {
  const toMin = (t) => t.split(':').map(Number).reduce((h, m) => h * 60 + m)
  const slots = []
  for (let m = toMin(firstSlot); m <= toMin(lastSlot); m += stepMinutes) {
    slots.push(`${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`)
  }
  return slots
}

const today = new Date().toISOString().slice(0, 10)
const emptyForm = { name: '', phone: '', service: '', date: '', time: '', note: '' }

export default function Booking() {
  const [form, setForm] = useState(emptyForm)
  const [submitted, setSubmitted] = useState(null)
  const slots = useMemo(() => buildSlots(site.booking), [])

  // Бутонът „Запази“ в картите на услугите предварително избира услугата.
  useEffect(() => {
    const onSelect = (e) => setForm((f) => ({ ...f, service: e.detail }))
    window.addEventListener('select-service', onSelect)
    return () => window.removeEventListener('select-service', onSelect)
  }, [])

  const update = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    // TODO: тук по-късно може да се прати към бекенд / Formspree / e-mail.
    const service = services.find((s) => s.id === form.service)
    setSubmitted({ ...form, serviceName: service?.name ?? form.service })
    setForm(emptyForm)
  }

  const isSunday = form.date && new Date(form.date).getDay() === 0

  return (
    <section id="booking" className="section relative overflow-hidden bg-coal">
      <div
        className="absolute inset-0 -z-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(201,162,77,0.12),transparent_55%)]"
        aria-hidden="true"
      />
      <div className="container-x relative grid gap-12 lg:grid-cols-5 lg:gap-16">
        <div className="lg:col-span-2">
          <SectionTitle
            eyebrow="Запази час"
            title="Резервирай своя стол"
            text="Избери услуга, ден и час – ще потвърдим резервацията по телефона."
            align="left"
          />
          <ul className="reveal space-y-4 text-sm text-muted">
            <li className="flex items-start gap-3">
              <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              Потвърждение до 1 час в работно време
            </li>
            <li className="flex items-start gap-3">
              <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              Безплатна отмяна до 2 часа преди часа
            </li>
            <li className="flex items-start gap-3">
              <Icon name="phone" className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              <span>
                Предпочиташ по телефона?{' '}
                <a href={telHref(site.phone)} className="text-cream underline-offset-4 hover:text-gold hover:underline">
                  {site.phone}
                </a>
              </span>
            </li>
          </ul>
        </div>

        <div className="reveal lg:col-span-3">
          {submitted ? (
            <div
              role="status"
              aria-live="polite"
              className="card flex flex-col items-center p-10 text-center hover:translate-y-0"
            >
              <span className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-full bg-gold text-ink">
                <Icon name="check" className="h-8 w-8" />
              </span>
              <h3 className="font-display text-2xl font-semibold sm:text-3xl">Благодарим, {submitted.name}!</h3>
              <p className="mt-3 max-w-md text-muted">
                Получихме заявката ти за <strong className="text-cream">{submitted.serviceName}</strong> на{' '}
                <strong className="text-cream">
                  {new Date(submitted.date).toLocaleDateString('bg-BG', { day: 'numeric', month: 'long', year: 'numeric' })}
                </strong>{' '}
                в <strong className="text-cream">{submitted.time}</strong> ч. Ще ти се обадим на{' '}
                <strong className="text-cream">{submitted.phone}</strong> за потвърждение.
              </p>
              <button type="button" onClick={() => setSubmitted(null)} className="btn-ghost mt-8">
                Нова резервация
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="card grid gap-5 p-6 hover:translate-y-0 sm:grid-cols-2 sm:p-8" noValidate={false}>
              <div>
                <label htmlFor="b-name" className="label">
                  Име *
                </label>
                <input
                  id="b-name"
                  name="name"
                  type="text"
                  required
                  minLength={2}
                  autoComplete="name"
                  placeholder="Иван Иванов"
                  value={form.name}
                  onChange={update}
                  className="field"
                />
              </div>
              <div>
                <label htmlFor="b-phone" className="label">
                  Телефон *
                </label>
                <input
                  id="b-phone"
                  name="phone"
                  type="tel"
                  required
                  inputMode="tel"
                  autoComplete="tel"
                  pattern="[+]?[0-9\s\-()]{6,20}"
                  title="Въведи валиден телефонен номер"
                  placeholder="+359 88 000 0000"
                  value={form.phone}
                  onChange={update}
                  className="field"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="b-service" className="label">
                  Услуга *
                </label>
                <select id="b-service" name="service" required value={form.service} onChange={update} className="field">
                  <option value="" disabled>
                    Избери услуга
                  </option>
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name} – {s.price} {currency} ({s.duration})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="b-date" className="label">
                  Дата *
                </label>
                <input
                  id="b-date"
                  name="date"
                  type="date"
                  required
                  min={today}
                  value={form.date}
                  onChange={update}
                  className="field"
                  aria-describedby={isSunday ? 'b-date-hint' : undefined}
                />
                {isSunday && (
                  <p id="b-date-hint" className="mt-2 text-xs text-gold">
                    В неделя сме почивни – избери друг ден.
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="b-time" className="label">
                  Час *
                </label>
                <select id="b-time" name="time" required value={form.time} onChange={update} className="field">
                  <option value="" disabled>
                    Избери час
                  </option>
                  {slots.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="b-note" className="label">
                  Бележка
                </label>
                <textarea
                  id="b-note"
                  name="note"
                  rows={3}
                  placeholder="Предпочитан бръснар, специални желания…"
                  value={form.note}
                  onChange={update}
                  className="field resize-none"
                />
              </div>
              <div className="sm:col-span-2">
                <button type="submit" disabled={isSunday} className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50">
                  Изпрати заявка
                </button>
                <p className="mt-3 text-center text-xs text-muted">* Задължителни полета</p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
