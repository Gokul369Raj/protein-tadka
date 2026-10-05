# Protein Tadka

Premium brand website for **Protein Tadka** — a high-protein meal kitchen. Built as a fast,
fully-responsive single-page application (SPA) with React Router, no page reloads.

> Built on Protein. Powered by Tadka.

## What's inside

- **10 routes** — Home, Menu, Order, Meal Plans, Nutrition, About, Delivery, Contact, FAQ, 404
- **24 dishes** across 5 collections (bowls, mac, salads, tofu, tofu salads) with full macro data
  and a live cart that persists to `localStorage`
- **WhatsApp checkout** — orders are sent as deep links (`wa.me`), no payment gateway
- **Client media** — a behind-the-scenes "making" video and three real customer review clips,
  all poster-first and mute-by-default so nothing downloads until tapped
- **Two-tone brand system** — deep-green base with flame-orange accents sampled from the logo roundel
- **Accessible & responsive** — verified from 320 px to 1440 px, real `<nav>`/landmarks, focus states,
  `prefers-reduced-motion` support

## Tech stack

| | |
|---|---|
| Framework | React 18 |
| Routing | React Router v6 |
| Build | Vite 5 |
| Styling | Hand-written CSS with custom-property design tokens |
| Fonts | Barlow Condensed (display) + Barlow (body) |

## Getting started

```bash
cd app
npm install
npm run dev        # dev server
npm run build      # production build -> app/dist
npm run preview    # preview the production build
```

## Project structure

```
app/
  src/
    components/     # Header, Footer, CartDrawer, Video player, UI primitives
    data/           # site.js (business info), menu.js (dishes, plans, reviews)
    pages/          # one component per route
    styles/app.css  # design system + all page styles
  public/assets/    # imagery + video (img/, video/)
site/               # original static HTML version (superseded by app/)
build/              # generator for the static version
qa/                 # automated QA harness (see below)
brand/              # logo extraction source
```

## QA

The `qa/` folder holds a headless-Chrome harness (no Playwright needed):

| Script | What it checks |
|---|---|
| `qa/interact.js` | 39 functional assertions — cart maths, filters, search, sort, FAQ, delivery checker, form validation, SPA routing, console health |
| `qa/cdp_qa.js` | Horizontal-overflow audit across 10 routes × 7 viewports (320→1440 px) |
| `qa/video_test.js` | Video/review component behaviour — play, mute, `playsInline`, poster load |

```bash
node qa/interact.js
node qa/cdp_qa.js
node qa/video_test.js
```

## License

All rights reserved. Content, imagery and branding belong to Protein Tadka.
