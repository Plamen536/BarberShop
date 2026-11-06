const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
}

const paths = {
  scissors: (
    <>
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M20 4 8.1 15.9M14.5 14.5 20 20M8.1 8.1 12 12" />
    </>
  ),
  razor: (
    <>
      <path d="M3 21 11 13" />
      <path d="M9.5 11.5 16 5a2.1 2.1 0 0 1 3 3l-6.5 6.5Z" />
      <path d="m14 7 3 3" />
      <path d="M7.5 13.5 10.5 16.5" />
    </>
  ),
  beard: (
    <>
      <path d="M7 4v7a5 5 0 0 0 10 0V4" />
      <path d="M5 10c-1 4 1 9 7 11 6-2 8-7 7-11" />
      <path d="M10 15h4" />
    </>
  ),
  combo: (
    <>
      <path d="m4 20 7-7" />
      <circle cx="18" cy="6" r="2.5" />
      <path d="M13 11 16 8" />
      <path d="M4 4l6 6M4 10l6-6" />
    </>
  ),
  kid: (
    <>
      <circle cx="12" cy="9" r="5" />
      <path d="M12 4c-1.5 0-2.8.7-3.5 1.8M12 4c1.5 0 2.8.7 3.5 1.8" />
      <path d="M5 21c0-3.5 3.1-6 7-6s7 2.5 7 6" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </>
  ),
  facebook: (
    <>
      <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8Z" />
    </>
  ),
  star: <path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1Z" />,
  pin: (
    <>
      <path d="M12 22s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  phone: <path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2Z" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  check: <path d="m5 12 5 5L20 7" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  arrowDown: <path d="M12 5v14m0 0-6-6m6 6 6-6" />,
  arrowUp: <path d="M12 19V5m0 0-6 6m6-6 6 6" />,
  chevronLeft: <path d="m15 6-6 6 6 6" />,
  chevronRight: <path d="m9 6 6 6-6 6" />,
  trash: (
    <>
      <path d="M4 7h16M10 11v6M14 11v6M6 7l1 13h10l1-13M9 7V4h6v3" />
    </>
  ),
  logout: <path d="M10 17l5-5-5-5M15 12H3M13 3h6v18h-6" />,
  lock: (
    <>
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  quote: <path d="M7 17h3l2-4V7H6v6h3l-2 4Zm8 0h3l2-4V7h-6v6h3l-2 4Z" />,
}

export default function Icon({ name, className = 'h-6 w-6', filled = false }) {
  return (
    <svg viewBox="0 0 24 24" className={className} {...base} fill={filled ? 'currentColor' : 'none'}>
      {paths[name]}
    </svg>
  )
}
