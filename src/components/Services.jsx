import { currency, services } from '../data/services'
import Icon from './Icons'
import SectionTitle from './SectionTitle'

export default function Services() {
  return (
    <section id="services" className="section bg-coal">
      <div className="container-x">
        <SectionTitle
          eyebrow="Услуги и цени"
          title="Какво предлагаме"
          text="Прозрачни цени, без изненади. Всяка услуга включва консултация и завършващ стайлинг."
        />

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <li
              key={s.id}
              className={`card reveal group relative flex flex-col p-7 ${s.featured ? 'border-gold/60 bg-gradient-to-br from-slate to-coal' : ''}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {s.featured && (
                <span className="absolute top-4 right-4 rounded-sm bg-gold px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-ink">
                  Най-търсено
                </span>
              )}
              <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-sm border border-gold/40 text-gold transition-all duration-300 group-hover:border-gold group-hover:bg-gold group-hover:text-ink">
                <Icon name={s.icon} className="h-7 w-7" />
              </div>
              <h3 className="font-display text-xl font-semibold sm:text-2xl">{s.name}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{s.description}</p>
              <div className="mt-6 flex items-end justify-between border-t border-line pt-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-muted">{s.duration}</p>
                  <p className="font-display text-3xl font-semibold text-gold">
                    {s.price} <span className="text-base text-cream/70">{currency}</span>
                  </p>
                </div>
                <a
                  href={`#booking?service=${s.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    window.dispatchEvent(new CustomEvent('select-service', { detail: s.id }))
                    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-gold underline-offset-4 hover:underline"
                >
                  Запази →
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
