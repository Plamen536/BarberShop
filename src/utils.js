// Път до файл в public/, съобразен с base path-а на Vite (GitHub Pages).
export const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

// Телефон -> tel: линк без интервали.
export const telHref = (phone) => `tel:${phone.replace(/[^+\d]/g, '')}`
