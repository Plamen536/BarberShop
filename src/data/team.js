// ======================================================================
//  ЕКИП  (снимките са в public/images/team-*.jpg)
//
//  id        – уникален, НЕ го променяй след като има резервации
//  schedule  – (по желание) лично работно време, същия формат като
//              site.schedule; ако липсва, важи това на салона
//  daysOff   – (по желание) дати 'ГГГГ-ММ-ДД', в които бръснарят почива
// ======================================================================

export const team = [
  {
    id: 'georgi',
    name: 'Георги Иванов',
    role: 'Главен бръснар / собственик',
    specialty: 'Класически прически и бръснене с бръснач',
    experience: '12 години опит',
    daysOff: [],
    image: 'images/team-1.jpg',
    instagram: 'https://instagram.com/',
  },
  {
    id: 'martin',
    name: 'Мартин Петров',
    role: 'Бръснар',
    specialty: 'Skin fade и модерни стилове',
    experience: '7 години опит',
    // Пример: Мартин не работи в понеделник и е в отпуск на 24.12.
    schedule: {
      0: null,
      1: null,
      2: { open: '10:00', close: '20:00' },
      3: { open: '10:00', close: '20:00' },
      4: { open: '10:00', close: '20:00' },
      5: { open: '10:00', close: '20:00' },
      6: { open: '10:00', close: '16:00' },
    },
    daysOff: ['2026-12-24'],
    image: 'images/team-2.jpg',
    instagram: 'https://instagram.com/',
  },
  {
    id: 'alex',
    name: 'Александър Димитров',
    role: 'Бръснар',
    specialty: 'Оформяне на брада и детско подстригване',
    experience: '5 години опит',
    daysOff: [],
    image: 'images/team-3.jpg',
    instagram: 'https://instagram.com/',
  },
]
