import { useState } from 'react'
import { asset } from '../utils'
import Icon from './Icons'

/**
 * Снимка с автоматичен placeholder.
 * Показва <img src=public/{src}>; ако файлът липсва, рисува тъмен панел
 * с етикет, за да се вижда коя снимка къде трябва да се сложи.
 */
export default function Placeholder({ src, alt, label, className = '', imgClassName = '' }) {
  const [missing, setMissing] = useState(false)

  if (missing) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center gap-2 bg-[linear-gradient(135deg,#1f1f1f_0%,#141414_100%)] text-muted ${className}`}
      >
        <Icon name="scissors" className="h-8 w-8 text-gold/60" />
        <span className="px-3 text-center text-[11px] uppercase tracking-[0.2em]">{label ?? src}</span>
      </div>
    )
  }

  return (
    <img
      src={asset(src)}
      alt={alt}
      loading="lazy"
      onError={() => setMissing(true)}
      className={`${className} ${imgClassName}`}
    />
  )
}
