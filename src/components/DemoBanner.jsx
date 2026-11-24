import { salon } from '../data/salon'

// Лента най-горе в демо салоните (?salon=…), за да е ясно, че данните
// са примерни. Висока е h-7 – Header се отмества със същото (top-7).
export default function DemoBanner() {
  if (!salon) return null
  return (
    <p
      role="note"
      className="fixed inset-x-0 top-0 z-[60] flex h-7 items-center justify-center bg-gold px-3 text-center text-[11px] font-semibold uppercase tracking-[0.15em] text-ink"
    >
      Демо – данните са примерни
    </p>
  )
}
