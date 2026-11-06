import { useEffect, useState } from 'react'
import { gallery } from '../data/gallery'
import { asset } from '../utils'
import Icon from './Icons'
import Placeholder from './Placeholder'
import SectionTitle from './SectionTitle'

export default function Gallery() {
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (active === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setActive(null)
      if (e.key === 'ArrowRight') setActive((i) => (i + 1) % gallery.length)
      if (e.key === 'ArrowLeft') setActive((i) => (i - 1 + gallery.length) % gallery.length)
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [active])

  return (
    <section id="gallery" className="section bg-ink">
      <div className="container-x">
        <SectionTitle eyebrow="Галерия" title="Нашата работа" text="Част от прическите и моментите в салона." />

        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
          {gallery.map((img, i) => (
            <li key={img.src} className={`reveal ${i === 0 ? 'col-span-2 row-span-2 lg:col-span-1 lg:row-span-1' : ''}`}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className="group relative block aspect-square w-full overflow-hidden rounded-sm border border-line"
                aria-label={`Отвори снимка: ${img.alt}`}
              >
                <Placeholder
                  src={img.src}
                  alt={img.alt}
                  label={img.src.split('/').pop()}
                  className="h-full w-full"
                  imgClassName="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-left text-sm text-cream opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  {img.alt}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {active !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={gallery[active].alt}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/95 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
        >
          <button
            type="button"
            className="absolute top-4 right-4 inline-flex h-11 w-11 items-center justify-center text-cream hover:text-gold"
            aria-label="Затвори"
            onClick={() => setActive(null)}
          >
            <Icon name="close" className="h-7 w-7" />
          </button>
          <figure className="max-h-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <img
              src={asset(gallery[active].src)}
              alt={gallery[active].alt}
              className="max-h-[80vh] w-auto rounded-sm object-contain"
            />
            <figcaption className="mt-3 text-center text-sm text-muted">
              {gallery[active].alt} · {active + 1}/{gallery.length}
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  )
}
