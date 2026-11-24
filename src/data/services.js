// ======================================================================
//  УСЛУГИ И ЦЕНИ  (примерни – смени ги със своите)
//  durationMinutes се ползва за изчисляване на свободните часове.
//  icon: scissors | razor | beard | combo | kid
// ======================================================================

import { salon } from './salon'

const baseServices = [
  {
    id: 'haircut',
    name: 'Мъжко подстригване',
    description: 'Консултация, подстригване с машинка и ножица, измиване и стайлинг.',
    durationMinutes: 45,
    price: 15,
    icon: 'scissors',
  },
  {
    id: 'shave',
    name: 'Класическо бръснене',
    description: 'Топла кърпа, пяна с четка и бръснене с бръснач. Завършва със студена кърпа и балсам.',
    durationMinutes: 30,
    price: 13,
    icon: 'razor',
  },
  {
    id: 'beard',
    name: 'Оформяне на брада',
    description: 'Оформяне с машинка и бръснач, контуриране и грижа с масло за брада.',
    durationMinutes: 30,
    price: 10,
    icon: 'beard',
  },
  {
    id: 'combo',
    name: 'Комбо: коса + брада',
    description: 'Пълният пакет – подстригване и оформяне на брада на преференциална цена.',
    durationMinutes: 75,
    price: 23,
    icon: 'combo',
    featured: true,
  },
  {
    id: 'kids',
    name: 'Детско подстригване',
    description: 'За малките господа до 12 години. Търпение, внимание и приятелска атмосфера.',
    durationMinutes: 30,
    price: 10,
    icon: 'kid',
  },
]

export const services = salon?.services ?? baseServices
export const currency = salon?.currency ?? '€'
