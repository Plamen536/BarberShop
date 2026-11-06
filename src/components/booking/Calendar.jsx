import { useState } from 'react'
import Icon from '../Icons'
import { addDays, isoDate, parseISO } from '../../lib/time'

const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд']

/**
 * Месечен календар. isDisabled(iso) казва кои дни не могат да се избират.
 */
export default function Calendar({ value, onChange, isDisabled, minDate, maxDate }) {
  const initial = value ? parseISO(value) : new Date()
  const [view, setView] = useState(new Date(initial.getFullYear(), initial.getMonth(), 1))

  const monthLabel = view.toLocaleDateString('bg-BG', { month: 'long', year: 'numeric' })
  const firstWeekday = (view.getDay() + 6) % 7 // понеделник = 0
  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate()
  const cells = [...Array(firstWeekday).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => i + 1)]

  const canPrev = addDays(view, -1) >= new Date(minDate.getFullYear(), minDate.getMonth(), 1)
  const canNext = new Date(view.getFullYear(), view.getMonth() + 1, 1) <= maxDate
  const today = isoDate(new Date())

  return (
    <div className="rounded-md border border-line bg-slate p-4">
      <div className="mb-3 flex items-center justify-between">
        <button
          type="button"
          onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}
          disabled={!canPrev}
          aria-label="Предишен месец"
          className="inline-flex h-10 w-10 items-center justify-center rounded-sm text-cream hover:text-gold disabled:opacity-25"
        >
          <Icon name="chevronLeft" className="h-5 w-5" />
        </button>
        <p className="font-display text-lg font-semibold first-letter:uppercase" aria-live="polite">
          {monthLabel}
        </p>
        <button
          type="button"
          onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}
          disabled={!canNext}
          aria-label="Следващ месец"
          className="inline-flex h-10 w-10 items-center justify-center rounded-sm text-cream hover:text-gold disabled:opacity-25"
        >
          <Icon name="chevronRight" className="h-5 w-5" />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center" role="grid" aria-label="Календар">
        {WEEKDAYS.map((w) => (
          <div key={w} className="py-1 text-[11px] font-semibold uppercase tracking-wider text-muted" role="columnheader">
            {w}
          </div>
        ))}
        {cells.map((d, i) => {
          if (!d) return <div key={`e${i}`} role="gridcell" />
          const iso = isoDate(new Date(view.getFullYear(), view.getMonth(), d))
          const disabled = isDisabled(iso)
          const selected = iso === value
          return (
            <div key={iso} role="gridcell">
              <button
                type="button"
                disabled={disabled}
                onClick={() => onChange(iso)}
                aria-pressed={selected}
                aria-label={parseISO(iso).toLocaleDateString('bg-BG', { day: 'numeric', month: 'long' })}
                className={`relative h-10 w-full rounded-sm text-sm transition-colors ${
                  selected
                    ? 'bg-gold font-semibold text-ink'
                    : disabled
                      ? 'text-muted/40 line-through'
                      : 'text-cream hover:bg-gold/20 hover:text-gold'
                } ${iso === today && !selected ? 'ring-1 ring-gold/60' : ''}`}
              >
                {d}
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
