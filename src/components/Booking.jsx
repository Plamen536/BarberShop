import { site } from '../data/site'
import { telHref } from '../utils'
import Icon from './Icons'
import SectionTitle from './SectionTitle'
import BookingWizard from './booking/BookingWizard'

export default function Booking() {
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
            text="Избери бръснар, услуга и свободен час. Виждаш само реално свободните часове."
            align="left"
          />
          <ul className="reveal space-y-4 text-sm text-muted">
            <li className="flex items-start gap-3">
              <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              Часът се запазва веднага, без чакане за потвърждение
            </li>
            <li className="flex items-start gap-3">
              <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
              Безплатна отмяна до 2 часа преди часа – обади ни се
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
          <BookingWizard />
        </div>
      </div>
    </section>
  )
}
