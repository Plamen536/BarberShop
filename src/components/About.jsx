import { aboutText, stats, site } from '../data/site'
import Placeholder from './Placeholder'
import SectionTitle from './SectionTitle'

export default function About() {
  return (
    <section id="about" className="section bg-ink">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="reveal relative order-2 lg:order-1">
          <div className="absolute -top-4 -left-4 h-full w-full border border-gold/40" aria-hidden="true" />
          <Placeholder
            src="images/about.jpg"
            alt={`Интериорът на ${site.name}`}
            label="about.jpg"
            className="relative aspect-[4/5] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/5]"
          />
          <div className="absolute right-4 -bottom-6 bg-gold px-5 py-4 text-ink shadow-xl sm:right-8">
            <p className="font-display text-3xl font-bold leading-none">{stats[0].value}</p>
            <p className="text-xs font-semibold uppercase tracking-[0.2em]">{stats[0].label}</p>
          </div>
        </div>

        <div className="order-1 lg:order-2">
          <SectionTitle eyebrow="За нас" title={`Добре дошъл в ${site.name}`} align="left" />
          <div className="reveal space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            {aboutText.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <dl className="reveal mt-10 grid grid-cols-3 gap-4 border-t border-line pt-8">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="order-2 text-xs uppercase tracking-[0.15em] text-muted">{s.label}</dt>
                <dd className="font-display text-2xl font-semibold text-gold sm:text-3xl">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
