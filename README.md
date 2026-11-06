# Barber Shop – уебсайт

Модерен, тъмен и responsive single-page сайт за бръснарница. Изграден с
**React + Vite + Tailwind CSS**, без бекенд – подходящ за безплатен хостинг в
**GitHub Pages**.

## Секции

Header (бургер меню на мобилен) · Hero · За нас · Услуги и цени · Галерия (с
lightbox) · Екип · Отзиви · Запази час (форма без бекенд) · Контакти с Google
Maps · Footer.

## Структура

```
index.html            – шрифтове (Google Fonts), мета данни
src/
  App.jsx             – подредба на секциите
  index.css           – Tailwind + цветова тема (злато/черно)
  data/               – ВСИЧКО, което се сменя без да пипаш компоненти:
    site.js           – име, адрес, телефон, работно време, соц. мрежи, карта
    services.js       – услуги и цени
    team.js           – бръснари
    reviews.js        – отзиви
    gallery.js        – снимки в галерията
  components/         – Header, Hero, About, Services, Gallery, Team,
                        Reviews, Booking, Contact, Footer
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

## Формата „Запази час“

Засега само показва съобщение за успех. За реално изпращане свържи
`onSubmit` в `src/components/Booking.jsx` към услуга като
[Formspree](https://formspree.io), [Web3Forms](https://web3forms.com) или
собствен бекенд.
