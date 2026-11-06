import { team } from '../data/team'
import Icon from './Icons'
import Placeholder from './Placeholder'
import SectionTitle from './SectionTitle'

export default function Team() {
  return (
    <section id="team" className="section bg-coal">
      <div className="container-x">
        <SectionTitle eyebrow="Екип" title="Майсторите" text="Хората, на които можеш да повериш стила си." />

        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((m, i) => (
            <li key={m.name} className="card reveal group overflow-hidden" style={{ transitionDelay: `${i * 80}ms` }}>
              <div className="relative aspect-[4/5] overflow-hidden">
                <Placeholder
                  src={m.image}
                  alt={`${m.name} – ${m.role}`}
                  label={m.image.split('/').pop()}
                  className="h-full w-full"
                  imgClassName="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                {m.instagram && (
                  <a
                    href={m.instagram}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${m.name} в Instagram`}
                    className="absolute right-4 bottom-4 inline-flex h-11 w-11 items-center justify-center rounded-full bg-ink/80 text-cream backdrop-blur transition-colors hover:bg-gold hover:text-ink"
                  >
                    <Icon name="instagram" className="h-5 w-5" />
                  </a>
                )}
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">{m.role}</p>
                <h3 className="mt-2 font-display text-2xl font-semibold">{m.name}</h3>
                <p className="mt-2 text-sm text-cream/80">{m.specialty}</p>
                <p className="mt-1 text-xs text-muted">{m.experience}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
