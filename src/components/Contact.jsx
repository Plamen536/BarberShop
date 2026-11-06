import { site } from '../data/site'
import { telHref } from '../utils'
import Icon from './Icons'
import SectionTitle from './SectionTitle'

const mapSrc =
  site.mapEmbedUrl ||
  `https://www.google.com/maps?q=${encodeURIComponent(`${site.address}, ${site.city}`)}&output=embed&hl=bg`

export default function Contact() {
  return (
    <section id="contact" className="section bg-ink">
      <div className="container-x">
        <SectionTitle eyebrow="Контакти" title="Ела да ни видиш" />

        <div className="grid gap-8 lg:grid-cols-5">
          <address className="reveal card flex flex-col gap-8 p-7 not-italic hover:translate-y-0 lg:col-span-2 sm:p-8">
            <div className="flex gap-4">
              <Icon name="pin" className="h-6 w-6 shrink-0 text-gold" />
              <div>
                <p className="label">Адрес</p>
                <p className="text-lg">{site.address}</p>
                <p className="text-muted">{site.city}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <Icon name="phone" className="h-6 w-6 shrink-0 text-gold" />
              <div>
                <p className="label">Телефон</p>
                <a href={telHref(site.phone)} className="text-lg transition-colors hover:text-gold">
                  {site.phone}
                </a>
              </div>
            </div>

            {site.email && (
              <div className="flex gap-4">
                <Icon name="mail" className="h-6 w-6 shrink-0 text-gold" />
                <div>
                  <p className="label">E-mail</p>
                  <a href={`mailto:${site.email}`} className="text-lg break-all transition-colors hover:text-gold">
                    {site.email}
                  </a>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <Icon name="clock" className="h-6 w-6 shrink-0 text-gold" />
              <div className="flex-1">
                <p className="label">Работно време</p>
                <dl>
                  {site.hours.map((h) => (
                    <div key={h.days} className="flex justify-between gap-4 border-b border-line/60 py-2 text-sm last:border-0">
                      <dt className="text-muted">{h.days}</dt>
                      <dd className={h.closed ? 'text-gold/80' : 'text-cream'}>{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            {site.socials.length > 0 && (
              <div className="flex gap-3 border-t border-line pt-6">
                {site.socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.name}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-line text-cream transition-all hover:border-gold hover:text-gold"
                  >
                    <Icon name={s.icon} className="h-5 w-5" />
                  </a>
                ))}
              </div>
            )}
          </address>

          <div className="reveal overflow-hidden rounded-md border border-line lg:col-span-3">
            <iframe
              title={`Карта – ${site.name}, ${site.address}`}
              src={mapSrc}
              className="h-full min-h-[360px] w-full grayscale-[0.6] contrast-[1.1] transition-all duration-500 hover:grayscale-0"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
