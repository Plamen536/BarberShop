import { useState } from 'react'
import { site } from '../data/site'
import { asset } from '../utils'
import Icon from './Icons'

export default function Hero() {
  const [hasImage, setHasImage] = useState(true)

  return (
    <section id="top" className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Фон: снимка (public/images/hero.jpg) + градиент. Без снимка остава тъмен градиент с текстура. */}
      <div className="absolute inset-0 -z-10">
        {hasImage && (
          <img
            src={asset('images/hero.jpg')}
            alt=""
            aria-hidden="true"
            onError={() => setHasImage(false)}
            className="h-full w-full object-cover opacity-50"
          />
        )}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(201,162,77,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/70 to-ink" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(45deg, transparent 0 14px, rgba(244,239,228,0.6) 14px 15px)',
          }}
          aria-hidden="true"
        />
      </div>

      <div className="container-x pt-28 pb-20 sm:pt-32">
        <div className="max-w-3xl">
          <p className="reveal is-visible mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-gold">
            <span className="h-px w-10 bg-gold" aria-hidden="true" />
            Бръснарница · {site.city.replace(/^\d+\s*/, '')}
          </p>
          <h1 className="font-display text-5xl font-semibold leading-[1.05] sm:text-6xl lg:text-7xl">
            {site.tagline.split('. ').map((part, i, arr) => (
              <span key={part} className={i === arr.length - 1 ? 'block text-gold-light italic' : 'block'}>
                {part.replace(/\.$/, '')}
                {i < arr.length - 1 ? '.' : ''}
              </span>
            ))}
          </h1>
          <p className="mt-7 max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">{site.heroText}</p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <a href="#booking" className="btn-primary">
              Запази час
            </a>
            <a href="#services" className="btn-ghost">
              Виж услугите
            </a>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted transition-colors hover:text-gold sm:flex"
        aria-label="Превърти надолу"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">Надолу</span>
        <Icon name="arrowDown" className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  )
}
