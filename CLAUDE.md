# Le Scent Atelier

Portfolio project: a fictional niche-perfume brand storefront. Front-end only (no real back end), with a strong focus on visual design. Not affiliated with any real brand. Footer must say: "Portfolio project. Fictional brand, no real products are sold."

## How to work with me
- Talk to me in Portuguese (Brazil). Code, comments, UI copy and commit messages in English.
- I am learning: briefly explain what you changed and why before big edits. Keep explanations short.
- Prefer small, reviewable steps. Ask before adding a new dependency not listed here.

## Stack
- Vite + React + TypeScript (strict)
- Tailwind CSS
- React Router (use `HashRouter` so GitHub Pages works on reload)
- React Hook Form + Zod (forms and validation)
- Context API: `AuthProvider` (mock auth in localStorage) and `CartProvider`
- Custom hooks, e.g. `useSearch`, `useAuth`, `useCart`
- Mock data from `src/mocks/products.json`, wrapped by a small `services/http.ts` so a real API can replace it later
- Deploy: GitHub Pages (set `base: '/<repo-name>/'` in `vite.config.ts`). Build paths with `import.meta.env.BASE_URL`.

## Folder structure
```
public/images/products/   # <slug>.webp, 600x600
src/
  app/          App.tsx, router.tsx, providers.tsx
  pages/        Home, Catalog, ProductDetail, Cart, Login, NotFound (pages only compose; no business logic)
  features/
    auth/       AuthProvider, useAuth, schemas.ts (Zod), components/
    cart/       CartProvider, useCart, components/
    products/   api.ts, types.ts, hooks/, components/ (ProductCard, ProductGrid, Filters, SizeSelector)
  components/
    ui/         Button, Input, Badge, Modal
    layout/     Header, Footer, Layout
  mocks/        products.json
  services/     http.ts
  hooks/        useDebounce, useLocalStorage
  lib/          formatPrice, cn
  styles/       index.css (Tailwind + design tokens)
```
Each feature is self-contained so new ones (favorites, reviews) can be added as a new folder.

## Data
- `src/features/products/types.ts` and `src/mocks/products.json` already exist (15 products).
- Scent families: `fresh | floral | woody | amber`. Sizes: 10, 50, 100 mL, each with its own price and `inStock`.
- Product page: size selector changes the price; out-of-stock sizes are disabled.
- Cards show `descriptor` (e.g. "Bergamot & black tea") and "From $X" via `getStartingPrice`.
- Extra feature to build later: customizable sample set (pick 3 scents) using Context.
- Image path in JSON is relative to `public/`, e.g. `images/products/small-hours.webp`.
- Golden Hour, Velvet Bar and Spice Route have a different cap on purpose. Idea: a small "Special editions" section.

## Brand and design
- Name: Le Scent Atelier. Concept: "Elevating Everyday" (perfume that lifts ordinary moments one notch higher). Tone: modern, urban, conceptual, light and a little ironic. Not traditional luxury.
- Copy angle: start from everyday scenes (tea at 4 a.m., Sunday market, summer rain), never yachts, deserts or movie stars. Use "Elevating everyday" as the tagline; do not use the old "Perfume for small moments" line.
- Hero tagline on the home page may read "Scent. Elevating everyday" (a local choice in the hero only, not a brand rule).
- Logo: stacked uppercase wordmark "LE SCENT / ATELIER" in Jost Light, wide letter-spacing. Files: `logo-le-scent-atelier.svg` (stacked, for home and footer) and `logo-le-scent-atelier-horizontal.svg` (header). They use `currentColor`.
- Full visual rules (tokens, typography, components, page structure) live in @DESIGN.md. Follow it for every UI task; ask me before deviating.
- UI copy in English. Mobile-first and responsive.

## Rules
- No real brand names, logos or photos anywhere. Images must be AI-generated or the author's own (the hero photo is AI-generated); keep them credited in the README.
- No secrets, tokens or API keys in this file or in the repo.
- Keep pages thin; put logic in features/hooks.
- Run `npm run build` and fix type errors before saying a task is done.

## Commands
- `npm run dev` – local dev server
- `npm run build` – type-check and build
- `npm run preview` – preview the production build
