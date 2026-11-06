import { reviews } from '../data/reviews'
import Icon from './Icons'
import SectionTitle from './SectionTitle'

function Stars({ n }) {
  return (
    <div className="flex gap-0.5 text-gold" role="img" aria-label={`${n} от 5 звезди`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Icon key={i} name="star" className={`h-4 w-4 ${i < n ? '' : 'opacity-25'}`} filled />
      ))}
    </div>
  )
}

export default function Reviews() {
  return (
    <section id="reviews" className="section bg-ink">
      <div className="container-x">
        <SectionTitle eyebrow="Отзиви" title="Какво казват клиентите" />

        <ul className="grid gap-6 md:grid-cols-3">
          {reviews.map((r, i) => (
            <li key={r.name} className="card reveal relative flex flex-col p-7" style={{ transitionDelay: `${i * 80}ms` }}>
              <Icon name="quote" className="absolute top-5 right-5 h-10 w-10 text-gold/15" filled />
              <Stars n={r.rating} />
              <blockquote className="mt-5 flex-1 text-base leading-relaxed text-cream/85">„{r.text}“</blockquote>
              <footer className="mt-6 flex items-center gap-3 border-t border-line pt-5">
                <span
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 font-display text-lg font-semibold text-gold"
                  aria-hidden="true"
                >
                  {r.name.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-semibold">{r.name}</p>
                  <p className="text-xs text-muted">{r.date}</p>
                </div>
              </footer>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
