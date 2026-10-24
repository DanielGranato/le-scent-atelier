# Le Scent Atelier

> Scent. Elevating Everyday

**[Live demo](https://danielgranato.github.io/le-scent-atelier/)** · Fictional niche-perfume storefront · React + TypeScript + Tailwind

<!-- Add a screenshot or GIF of the home page here: -->
<!-- ![Le Scent Atelier home](docs/screenshot.png) -->

A front-end portfolio project: an online store for a made-up perfume brand, built to practice clean architecture and visual design. There is no real back end; products come from local mock data behind a small service layer, so a real API can be plugged in later.

> **Portfolio project. Fictional brand, no real products are sold.** Not affiliated with any real brand.

## Highlights

- **Spray hero**: words (scent notes) fly out of the bottle's nozzle in a fan, drawn on a `<canvas>` with no animation library. Click the bottle to spray. It pauses off-screen and respects `prefers-reduced-motion`.
- **15 fictional perfumes** in four scent families (fresh, floral, woody, amber), each with notes, a short story and three sizes.
- **Size selector** on the product page: price and stock change per size (10 / 50 / 100 mL).
- **Cart and mock auth** with the Context API; forms with React Hook Form and Zod.
- **A written design system** (`DESIGN.md`): square corners, thin lines, tight typography, a small palette. Mobile-first and responsive.

## Status

- [x] Design tokens and typography
- [x] Home with spray banner
- [x] Catalog with family filter and search
- [x] Product page with size selector
- [x] Cart
- [x] Login and sign-up (mock)
- [x] Deploy to GitHub Pages

<!-- Tick the boxes as you finish each item. -->

## Tech stack

| Area | Choice |
|---|---|
| Build tool | Vite |
| UI | React 19 + TypeScript (strict) |
| Styling | Tailwind CSS (design tokens in `src/styles/index.css`) |
| Routing | React Router (`HashRouter`, so GitHub Pages works on reload) |
| Forms | React Hook Form + Zod |
| State | Context API (`AuthProvider`, `CartProvider`) |
| Data | Local JSON mocks behind `services/http.ts` |
| Font | Jost (Google Fonts) |

## Getting started

You need Node.js 20 or newer.

```bash
git clone https://github.com/DanielGranato/le-scent-atelier.git
cd le-scent-atelier
npm install
npm run dev
```

| Script | What it does |
|---|---|
| `npm run dev` | Starts the local dev server |
| `npm run build` | Type-checks and builds for production |
| `npm run preview` | Serves the production build locally |

## Project structure

```
public/images/products/   product photos (<slug>.webp)
src/
  app/          App, router, providers
  pages/        Home, Catalog, ProductDetail, Cart, Login, NotFound
  features/     auth, cart, products (each one self-contained)
  components/   ui/ (Button, Input...), layout/ (Header, Footer), SprayBanner/
  mocks/        products.json
  services/     http.ts (data access layer)
  hooks/        useDebounce, useLocalStorage
  lib/          formatPrice, cn
  styles/       index.css (Tailwind + tokens)
```

Pages only compose; logic lives in `features/` and hooks. New features (favorites, reviews) are added as a new folder.

## Decisions worth mentioning

- **Feature folders** instead of grouping by file type, so each domain can grow without touching the rest.
- **Service layer for data**: components never read the JSON directly. Replacing the mocks with a real API only changes `services/` and `features/products/api.ts`.
- **`HashRouter`** because GitHub Pages cannot rewrite SPA routes. The Vite `base` is set to the repo name.
- **Spray animation split in two**: `sprayEngine.ts` (plain TypeScript, canvas) and `SprayBanner.tsx` (React wrapper), so the animation logic is independent from React.
- **Accessibility**: the words on the canvas are decorative (`aria-hidden`); the page has a real `<h1>`, keyboard focus on the bottle, and a still frame for reduced motion.

## Deployment

The site is published to GitHub Pages. In the repository settings go to **Pages** and choose **GitHub Actions** as the source. Make sure `base` in `vite.config.ts` matches the repository name (`/le-scent-atelier/`).

## Credits and notes

- Product photos were generated with AI tools. The brand, products and texts are invented.
- Logo drawn as SVG from the Jost typeface (open font, SIL OFL).
- Visual direction inspired by the general principles of independent perfume sites (typography-led, square, product-first). No text, images, logos or fonts were copied from any brand.

## Author

Made by **Daniel Granato** · [GitHub](https://github.com/DanielGranato)
