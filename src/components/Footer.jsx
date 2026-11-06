import { site } from '../data/site'
import { navLinks } from '../data/nav'
import Icon from './Icons'

const year = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="border-t border-line bg-coal">
      <div className="container-x grid gap-10 py-14 md:grid-cols-3">
        <div>
          <a href="#top" className="flex items-center gap-2.5">
            <Icon name="scissors" className="h-6 w-6 text-gold" />
            <span className="font-display text-xl font-semibold">{site.name}</span>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{site.tagline}</p>
        </div>

        <nav aria-label="Футър меню">
          <p className="label">Навигация</p>
          <ul className="grid grid-cols-2 gap-2 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="text-cream/80 transition-colors hover:text-gold">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#booking" className="text-gold transition-colors hover:text-gold-light">
                Запази час
              </a>
            </li>
          </ul>
        </nav>

        <div>
          <p className="label">Последвай ни</p>
          <div className="flex gap-3">
            {site.socials.map((s) => (
              <a
                key={s.name}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                aria-label={s.name}
                className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-line text-cream transition-all hover:-translate-y-0.5 hover:border-gold hover:text-gold"
              >
                <Icon name={s.icon} className="h-5 w-5" />
              </a>
            ))}
          </div>
          <p className="mt-5 text-sm text-muted">
            {site.address}, {site.city}
          </p>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-5 text-xs text-muted sm:flex-row">
          <p>
            © {year} {site.name}. Всички права запазени.
          </p>
          <a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-gold">
            Нагоре <Icon name="arrowUp" className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
