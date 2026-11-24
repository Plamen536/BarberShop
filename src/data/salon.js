// Кой демо салон се показва в момента (виж data/salons.js).
//
// Чете се от ?salon=… в линка и се помни за този таб (sessionStorage),
// за да не се губи при /admin, презареждане или котви (#services).
// ?salon= (празно) връща към примерния салон.

import { salons } from './salons'

const KEY = 'barbershop.salon'

function resolveSalonId() {
  let stored = null
  try {
    stored = sessionStorage.getItem(KEY)
  } catch {
    // без sessionStorage (частен режим и т.н.) работим само по линка
  }

  const param = new URLSearchParams(window.location.search).get('salon')
  const id = param === null ? stored : param.trim().toLowerCase()
  const valid = id && Object.hasOwn(salons, id) ? id : null

  try {
    if (valid) sessionStorage.setItem(KEY, valid)
    else sessionStorage.removeItem(KEY)
  } catch {
    // виж по-горе
  }
  return valid
}

export const salonId = resolveSalonId()
export const salon = salonId ? salons[salonId] : null
