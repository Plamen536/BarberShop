// ======================================================================
//  ДЕМО САЛОНИ
//  Един и същ сайт показва различен салон според линка:
//    …/BarberShop/?salon=nv-barbers
//
//  Ключът (напр. 'nv-barbers') е това, което се пише в линка – само
//  малки латински букви, цифри и тирета.
//
//  Всичко е по желание. Каквото липсва, се взима от примерните данни:
//    site      – от data/site.js (име, адрес, телефон, работно време…)
//    services  – от data/services.js (целият списък се заменя);
//                price може да липсва – тогава цената не се показва
//    team      – от data/team.js (целият списък се заменя)
//    reviews   – от data/reviews.js
//    aboutText – от data/site.js
//    stats     – НЕ се наследяват; показват се само ако ги зададеш
//    currency  – от data/services.js (по подразбиране €)
//
//  Имейлът, социалните мрежи и картата НЕ се наследяват от примерния
//  салон – ако не ги попълниш, просто не се показват.
//
//  Шаблон за нов салон:
//
//  'ime-na-salona': {
//    site: {
//      name: 'Име на салона',
//      tagline: 'Първо изречение. Второ изречение.',
//      address: 'ул. „…“ 1',
//      city: '1000 София',
//      phone: '+359 88 000 0000',
//      hours: [
//        { days: 'Понеделник – Събота', time: '10:00 – 20:00' },
//        { days: 'Неделя', time: 'Почивен ден', closed: true },
//      ],
//      // 0 = неделя … 6 = събота; null = почивен ден. Да съвпада с hours!
//      schedule: {
//        0: null,
//        1: { open: '10:00', close: '20:00' },
//        2: { open: '10:00', close: '20:00' },
//        3: { open: '10:00', close: '20:00' },
//        4: { open: '10:00', close: '20:00' },
//        5: { open: '10:00', close: '20:00' },
//        6: { open: '10:00', close: '20:00' },
//      },
//      socials: [{ name: 'Instagram', url: 'https://instagram.com/…', icon: 'instagram' }],
//    },
//    services: [
//      // icon: scissors | razor | beard | combo | kid
//      { id: 'haircut', name: 'Подстригване', description: '…', durationMinutes: 45, price: 15, icon: 'scissors' },
//    ],
//    team: [
//      { id: 'ivan', name: 'Иван', role: 'Бръснар', specialty: '…', experience: '…' },
//    ],
//  },
// ======================================================================

export const salons = {
  'nv-barbers': {
    site: {
      name: 'NV BARBERS',
      tagline: 'Вашият стил. Нашата мисия.',
      address: 'ж.к. Дианабад, ул. „Никола Габровски“ 51',
      city: 'София',
      phone: '087 611 4119',
    },
    // TODO: услуги, цени, екип и работно време – засега са примерните.
  },

  // Имат три салона (All-Time, All-Time 2, All-Time GOLD) – демото е
  // за първия. Другите: All-Time 2 – 0878 373 778, GOLD – 0877 959 597.
  'all-time': {
    site: {
      name: 'The Barber Shop All-Time',
      // TODO: провери адреса – посочван е и като „Рони 91“
      address: 'ж.к. Люлин 3, бул. „Панчо Владигеров“ 60',
      city: 'София',
      phone: '0876 621 764',
    },
    // TODO: услуги, цени, екип и работно време – засега са примерните.
  },

  sham: {
    site: {
      name: 'The Barber Shop Sham',
      address: 'кв. Гео Милев, бул. „Шипченски проход“ 11',
      city: '1111 София',
      phone: '089 616 7561',
      hours: [
        { days: 'Понеделник – Събота', time: '10:00 – 20:00' },
        { days: 'Неделя', time: '12:00 – 18:00' },
      ],
      schedule: {
        0: { open: '12:00', close: '18:00' },
        1: { open: '10:00', close: '20:00' },
        2: { open: '10:00', close: '20:00' },
        3: { open: '10:00', close: '20:00' },
        4: { open: '10:00', close: '20:00' },
        5: { open: '10:00', close: '20:00' },
        6: { open: '10:00', close: '20:00' },
      },
    },
    // TODO: цени (price) – липсват, затова не се показват.
    // TODO: времетраенията са ориентировъчни – провери ги.
    services: [
      {
        id: 'haircut',
        name: 'Подстригване',
        description: 'Мъжко подстригване с машинка и ножица.',
        durationMinutes: 45,
        icon: 'scissors',
      },
      {
        id: 'beard',
        name: 'Оформяне на брада',
        description: 'Подстригване и контуриране на брадата с бръснач.',
        durationMinutes: 30,
        icon: 'beard',
      },
      {
        id: 'fade',
        name: 'Преливка: коса + брада',
        description: 'Постепенна преливка на косата и брадата.',
        durationMinutes: 60,
        icon: 'combo',
        featured: true,
      },
      {
        id: 'brows',
        name: 'Вежди',
        description: 'Оформяне с бръснач или конец и боядисване на вежди.',
        durationMinutes: 20,
        icon: 'razor',
      },
      {
        id: 'skin',
        name: 'Почистване на кожата',
        description: 'Почистване и грижа за кожата на лицето.',
        durationMinutes: 30,
        icon: 'razor',
      },
      {
        id: 'color',
        name: 'Оцветяване, къдрици и изправяне',
        description: 'Оцветяване на косата, къдрене или изправяне.',
        durationMinutes: 60,
        icon: 'scissors',
      },
    ],
    // TODO: екип – засега е примерният.
  },

  mernush: {
    site: {
      name: 'MERNUSH Barber Shop',
      address: 'ж.к. Люлин – Център, ул. „арх. Георги Ненов“ 2, магазин 38',
      city: '1343 София',
      phone: '088 331 4666',
      hours: [
        { days: 'Понеделник', time: 'Почивен ден', closed: true },
        { days: 'Вторник – Петък', time: '09:00 – 19:00' },
        { days: 'Събота – Неделя', time: '10:00 – 18:00' },
      ],
      schedule: {
        0: { open: '10:00', close: '18:00' },
        1: null,
        2: { open: '09:00', close: '19:00' },
        3: { open: '09:00', close: '19:00' },
        4: { open: '09:00', close: '19:00' },
        5: { open: '09:00', close: '19:00' },
        6: { open: '10:00', close: '18:00' },
      },
    },
    // TODO: услуги, цени и екип – засега са примерните.
  },

  '8-blade': {
    site: {
      name: 'The 8 Blade Barbershop',
      address: 'кв. Подуяне, ул. „Тодорини кукли“ 1',
      city: '1505 София',
      phone: '087 707 8164',
      hours: [
        { days: 'Понеделник – Събота', time: '11:00 – 19:30' },
        { days: 'Неделя', time: '11:00 – 17:00' },
      ],
      schedule: {
        0: { open: '11:00', close: '17:00' },
        1: { open: '11:00', close: '19:30' },
        2: { open: '11:00', close: '19:30' },
        3: { open: '11:00', close: '19:30' },
        4: { open: '11:00', close: '19:30' },
        5: { open: '11:00', close: '19:30' },
        6: { open: '11:00', close: '19:30' },
      },
    },
    // Истинската им оценка: 5.0 от 47 отзива.
    stats: [
      { value: '5.0', label: 'оценка от клиенти' },
      { value: '47', label: 'отзива' },
    ],
    // TODO: цени (price) – липсват, затова не се показват.
    // TODO: времетраенията са ориентировъчни – провери ги.
    services: [
      {
        id: 'haircut',
        name: 'Мъжко подстригване',
        description: 'Класическо подстригване с машинка и ножица.',
        durationMinutes: 45,
        icon: 'scissors',
      },
      {
        id: 'fade',
        name: 'Фейд',
        description: 'Модерна преливка с прецизен преход.',
        durationMinutes: 45,
        icon: 'razor',
        featured: true,
      },
      {
        id: 'beard',
        name: 'Оформяне на брада',
        description: 'Подстригване и контуриране на брадата.',
        durationMinutes: 30,
        icon: 'beard',
      },
      {
        id: 'kids',
        name: 'Детско подстригване',
        description: 'Салонът е подходящ и за деца.',
        durationMinutes: 30,
        icon: 'kid',
      },
    ],
    // TODO: екип – засега е примерният.
  },

  lineup: {
    site: {
      name: 'Lineup Barbershop',
      address: 'кв. Хиподрума, ул. „Нишава“ 3',
      city: '1612 София',
      phone: '088 777 6329',
      // TODO: понеделник и вторник не са посочени – приети са за почивни.
      hours: [
        { days: 'Понеделник – Вторник', time: 'Почивни дни', closed: true },
        { days: 'Сряда – Петък', time: '10:00 – 19:00' },
        { days: 'Събота – Неделя', time: '11:00 – 17:00' },
      ],
      schedule: {
        0: { open: '11:00', close: '17:00' },
        1: null,
        2: null,
        3: { open: '10:00', close: '19:00' },
        4: { open: '10:00', close: '19:00' },
        5: { open: '10:00', close: '19:00' },
        6: { open: '11:00', close: '17:00' },
      },
    },
    // Истинската им оценка в Google: 5.0 от 42 отзива.
    stats: [
      { value: '5.0', label: 'рейтинг в Google' },
      { value: '42', label: 'отзива' },
    ],
    // TODO: цени (price) – липсват, затова не се показват.
    // TODO: времетраенията са ориентировъчни – провери ги.
    services: [
      {
        id: 'haircut',
        name: 'Подстригване',
        description: 'Мъжко подстригване с машинка и ножица.',
        durationMinutes: 45,
        icon: 'scissors',
      },
      {
        id: 'beard',
        name: 'Оформяне на брада',
        description: 'Подстригване и контуриране на брадата.',
        durationMinutes: 30,
        icon: 'beard',
      },
      {
        id: 'combo',
        name: 'Подстригване + брада',
        description: 'Коса и брада в едно посещение.',
        durationMinutes: 75,
        icon: 'combo',
        featured: true,
      },
      {
        id: 'kids',
        name: 'Детско подстригване',
        description: 'Салонът е подходящ и за деца.',
        durationMinutes: 30,
        icon: 'kid',
      },
    ],
    // TODO: екип – засега е примерният.
  },

  'right-place': {
    site: {
      name: 'Right Place Barbershop',
      // TODO: в Google няма номер на улицата
      address: 'ж.к. Дружба 1, ул. „Иван Арабаджията“',
      city: '1592 София',
      phone: '087 704 7700',
      hours: [{ days: 'Всеки ден', time: '11:00 – 20:00' }],
      schedule: {
        0: { open: '11:00', close: '20:00' },
        1: { open: '11:00', close: '20:00' },
        2: { open: '11:00', close: '20:00' },
        3: { open: '11:00', close: '20:00' },
        4: { open: '11:00', close: '20:00' },
        5: { open: '11:00', close: '20:00' },
        6: { open: '11:00', close: '20:00' },
      },
    },
    // TODO: услуги, цени и екип – засега са примерните.
  },

  brasnarnica: {
    site: {
      name: 'БръснарницЪ',
      address: 'бул. „България“ 58',
      city: '1680 София',
      phone: '098 888 3855',
      hours: [{ days: 'Всеки ден', time: '10:00 – 20:00' }],
      schedule: {
        0: { open: '10:00', close: '20:00' },
        1: { open: '10:00', close: '20:00' },
        2: { open: '10:00', close: '20:00' },
        3: { open: '10:00', close: '20:00' },
        4: { open: '10:00', close: '20:00' },
        5: { open: '10:00', close: '20:00' },
        6: { open: '10:00', close: '20:00' },
      },
    },
    // TODO: цени (price) – липсват, затова не се показват.
    // TODO: времетраенията са ориентировъчни – провери ги.
    services: [
      {
        id: 'haircut',
        name: 'Мъжко подстригване',
        description: 'Прическа, подбрана според формата на лицето и стила ти.',
        durationMinutes: 45,
        icon: 'scissors',
      },
      {
        id: 'beard',
        name: 'Брада и мустаци',
        description: 'Оформяне на брада и мустаци.',
        durationMinutes: 30,
        icon: 'beard',
      },
      {
        id: 'combo',
        name: 'Подстригване + брада',
        description: 'Коса, брада и мустаци в едно посещение.',
        durationMinutes: 75,
        icon: 'combo',
        featured: true,
      },
    ],
    // TODO: екип – засега е примерният.
  },

  uppercut: {
    site: {
      name: 'Uppercut Barbershop',
      // TODO: провери адреса – във Facebook е само „ж.к. Младост 1 12А 2“
      address: 'ж.к. Младост 1, бл. 12А, вх. 2',
      city: '1750 София',
      phone: '+359 89 730 8614',
      socials: [
        { name: 'Instagram', url: 'https://instagram.com/uppercut_barbershop_sofia', icon: 'instagram' },
      ],
    },
    // TODO: услуги, цени, екип и работно време – засега са примерните.
  },
}
