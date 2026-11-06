import { useEffect, useState } from 'react'
import { navLinks } from '../data/nav'
import { site } from '../data/site'
import Icon from './Icons'

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open ? 'border-b border-line bg-ink/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between sm:h-20">
        <a href="#top" className="group flex items-center gap-2.5" onClick={close} aria-label={`${site.name} – начало`}>
          <Icon name="scissors" className="h-6 w-6 text-gold transition-transform duration-500 group-hover:rotate-90" />
          <span className="font-display text-lg font-semibold tracking-wide sm:text-xl">{site.name}</span>
        </a>

        <nav aria-label="Главно меню" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="relative text-sm font-medium tracking-wide text-cream/80 transition-colors hover:text-gold after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-gold after:transition-all after:duration-300 hover:after:w-full"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href="#booking" className="btn-primary !px-5 !py-2.5 !text-xs">
                Запази час
              </a>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-cream transition-colors hover:text-gold md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Затвори менюто' : 'Отвори менюто'}
          onClick={() => setOpen((v) => !v)}
        >
          <Icon name={open ? 'close' : 'menu'} className="h-7 w-7" />
        </button>
      </div>

      {/* Мобилно меню */}
      <div
        id="mobile-menu"
        className={`md:hidden ${open ? 'max-h-[80vh] border-t border-line' : 'max-h-0'} overflow-hidden bg-ink/95 backdrop-blur-md transition-[max-height] duration-400 ease-in-out`}
      >
        <nav aria-label="Мобилно меню" className="container-x py-4">
          <ul className="flex flex-col">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={close}
                  className="block border-b border-line/60 py-3.5 font-display text-xl text-cream transition-colors hover:text-gold"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className="pt-5">
              <a href="#booking" onClick={close} className="btn-primary w-full">
                Запази час
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
