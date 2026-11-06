# Barber Shop – уебсайт

Модерен, тъмен и responsive сайт за бръснарница с **онлайн резервации и
админ панел**. Изграден с **React + Vite + Tailwind CSS + Firebase**
(Firestore + Auth, безплатен план) – подходящ за безплатен хостинг в
**GitHub Pages**.

## Секции

Header (бургер меню на мобилен) · Hero · За нас · Услуги и цени · Галерия (с
lightbox) · Екип · Отзиви · Запази час (реални свободни часове) · Контакти с
Google Maps · Footer · `/admin` – панел за екипа.

## Резервации – как работи

1. Клиентът избира **бръснар** (или „Без значение“), **услуга**, ден от
   **календара** и един от **свободните часове**.
2. Свободните часове се изчисляват от работното време на бръснаря,
   продължителността на услугата (`durationMinutes`) и вече заетите
   интервали – клиентът вижда **само свободните** часове, никакви имена.
3. Резервацията се записва веднага. Два клиента не могат да вземат един и
   същ час (атомарен запис във Firestore).
4. В `/admin` (вход с e-mail/парола) екипът вижда по дни и бръснари всички
   резервации **с име, телефон и бележка**, може да ги изтрива и да
   блокира време (почивка, отпуск, резервация по телефона).

### Демо режим

Без настроен Firebase сайтът работи в **демо режим**: резервациите се пазят
в `localStorage` на браузъра (само на това устройство), а паролата за
`/admin` е `admin`. Удобно за тестване, не за реална употреба.

### Настройка на Firebase (≈10 минути, безплатно)

1. [console.firebase.google.com](https://console.firebase.google.com) →
   **Add project** (Google Analytics не е нужен).
2. **Build → Firestore Database → Create database** → production mode →
   регион `europe-west` (напр. `eur3` или `europe-west3`).
3. Във Firestore → таб **Rules** → изтрий всичко и постави съдържанието на
   `firestore.rules` от това репо → **Publish**. Правилата гарантират, че
   имена и телефони се четат само от логнат администратор.
4. **Build → Authentication → Get started → Sign-in method → Email/Password
   → Enable**. После таб **Users → Add user** – създай акаунта на
   собственика (e-mail + парола). В сайта няма регистрация, така че само
   акаунтите, създадени тук, имат достъп до `/admin`.
5. **Project settings (зъбчето) → Your apps → `</>` Web** → регистрирай
   приложение → копирай `apiKey`, `authDomain`, `projectId`, `appId`.
6. Копирай `.env.example` като `.env.local` и попълни стойностите.
7. `npm run dev` – банерът „Демо режим“ трябва да изчезне.
8. **Authentication → Settings → Authorized domains** → добави
   `<user>.github.io` (и собствен домейн, ако има).

Firebase web ключовете не са тайна – сигурността идва от
`firestore.rules`. `.env.local` е в `.gitignore`; при `npm run deploy`
стойностите се вграждат в билда.

## Структура

```
index.html            – шрифтове (Google Fonts), мета данни
firestore.rules       – правила за достъп във Firestore (копират се в конзолата)
.env.example          – шаблон за Firebase конфигурацията
src/
  App.jsx             – рутове: / (сайт) и /admin
  index.css           – Tailwind + цветова тема (злато/черно)
  data/               – ВСИЧКО, което се сменя без да пипаш компоненти:
    site.js           – име, адрес, телефон, работно време (schedule),
                        настройки на резервациите, соц. мрежи, карта
    services.js       – услуги, цени и продължителност
    team.js           – бръснари (id, лично работно време, почивни дни)
    reviews.js        – отзиви
    gallery.js        – снимки в галерията
  components/         – Header, Hero, About, Services, Gallery, Team,
                        Reviews, Booking, Contact, Footer
    booking/          – wizard за резервации, календар, изчисляване на часове
  pages/              – Home, Admin
  lib/time.js         – изчисляване на свободни часове
  lib/store/          – хранилище: firebaseStore.js / localStore.js (демо)
public/images/        – снимките (виж public/images/README.md)
```

## Локално пускане

```bash
npm install
npm run dev        # http://localhost:5173/BarberShop/
```

Production билд и преглед:

```bash
npm run build
npm run preview
```

## Публикуване в GitHub Pages

1. В `vite.config.js` `base` трябва да е `'/<име-на-репото>/'` (сега е
   `/BarberShop/`). Ако сайтът ще е на собствен домейн или на
   `<user>.github.io`, сложи `base: '/'`.
2. Пусни:

   ```bash
   npm run deploy
   ```

   Това билдва проекта и качва папка `dist/` в клон `gh-pages`.
3. В GitHub: **Settings → Pages → Source: Deploy from a branch → Branch:
   `gh-pages` / `(root)`**. След минута сайтът е на
   `https://<user>.github.io/BarberShop/`.

## Смяна на съдържание

- Текстове, телефон, адрес, работно време → `src/data/site.js`
- Цени → `src/data/services.js`
- Снимки → `public/images/` (имената са описани в `public/images/README.md`)
- Цветове и шрифтове → `@theme` в `src/index.css`

- Работно време на салона → `schedule` в `src/data/site.js`; на отделен
  бръснар → `schedule` / `daysOff` в `src/data/team.js`
- Стъпка на часовете, дни напред, минимално време преди часа →
  `booking` в `src/data/site.js`

## Бележки

- `npm run build` копира `index.html` като `404.html`, за да работи
  директен достъп до `/admin` в GitHub Pages.
- Не променяй `id` на бръснар или услуга, след като има резервации.
