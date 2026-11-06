export default function SectionTitle({ eyebrow, title, text, align = 'center' }) {
  const isCenter = align === 'center'
  return (
    <div className={`reveal mb-12 max-w-2xl ${isCenter ? 'mx-auto text-center' : ''}`}>
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">{eyebrow}</p>
      )}
      <h2 className="font-display text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">{title}</h2>
      <span
        className={`mt-5 block h-px w-16 bg-gradient-to-r from-gold to-transparent ${isCenter ? 'mx-auto bg-gradient-to-r from-transparent via-gold to-transparent' : ''}`}
        aria-hidden="true"
      />
      {text && <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{text}</p>}
    </div>
  )
}
