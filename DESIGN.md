# Design system – Le Scent Atelier

Inspired by the *principles* of independent niche-perfume sites (D.S. & Durga was the main reference): stark, square, typographic, product-first. We take the rules, never the copy, photos, logo or the paid font (Sofia Pro). Everything here is original to this project.

## 1. Principles
- Square and flat: zero border-radius, thin 1px lines, no shadows, no gradients.- Typography does the work: one sans family, tight negative tracking on big headings, small uppercase labels with wide tracking.
- Product first: edge-to-edge image grids with almost no gaps, minimal chrome around them.
- Calm palette: paper background, near-black ink. Amber only as a rare accent.
- Light theme only (no dark mode for now).
- Voice: short, playful, a little ironic. Example hero: "Perfume for small moments."

## 2. Tokens (Tailwind v4, in `src/styles/index.css`)
```css
@import "tailwindcss";

@theme {
  --font-sans: "Jost", ui-sans-serif, system-ui, sans-serif;

  --color-paper: #F5F1EA;   /* page background */
  --color-ink: #1C1A17;     /* text, borders, primary buttons */
  --color-amber: #B5793B;   /* accent: tags, focus ring, decorative only */
  --color-olive: #6B6F4E;   /* muted text (about 4.6:1 on paper) */
  --color-bottle: #F3F3EF;  /* background of the product photos */

  --text-xs: 0.6875rem;   /* 11px  micro labels */
  --text-sm: 0.8125rem;   /* 13px  nav, card text */
  --text-base: 0.875rem;  /* 14px  body */
  --text-lg: 1.0625rem;   /* 17px  lead text */

  --tracking-label: 0.08em;     /* uppercase labels, nav, buttons */
  --tracking-heading: -0.04em;  /* h1-h4 */
  --tracking-display: -0.05em;  /* hero */
}

:root {
  --gutter: 1.25rem;     /* 20px page side padding */
  --section-y: 2.5rem;   /* vertical space between sections (mobile) */
  --grid-gap: 2px;       /* product grid gap */
}
@media (min-width: 1024px) { :root { --section-y: 4rem; } }

html { background: var(--color-paper); color: var(--color-ink); }
body { font-family: var(--font-sans); font-size: var(--text-base); line-height: 1.3; }
```
- Load Jost (weights 300–700) from Google Fonts with a `<link>` in `index.html`. No new npm dependency.
- Amber is about 3.2:1 on paper: use it only for large text, borders, tags or focus rings, never for small body text.

## 3. Typography scale (Jost)
| Use | Size | Weight | Tracking | Line height | Case |
|---|---|---|---|---|---|
| Hero / display | clamp(3rem, 8vw, 7rem) | 400 | -0.05em | 0.9 | normal |
| h1 | clamp(2.5rem, 5vw, 4.25rem) | 400 | -0.04em | 0.95 | normal |
| h2 | clamp(2rem, 4vw, 3.5rem) | 400 | -0.04em | 1 | normal |
| h3 / product title (PDP) | 1.5–2rem | 500 | -0.03em | 1.1 | normal |
| Body | 14px (0.875rem) | 400 | 0 | 1.3 | normal |
| Label / nav / footer links | 12–13px | 500–600 | +0.08em | 1 | UPPERCASE |
| Card category ("Eau de parfum") | 11px | 500 | +0.08em | 1 | UPPERCASE |
| Card name | 14px | 600 | +0.04em | 1.2 | UPPERCASE |
- Inputs must be at least 16px on mobile (avoids iOS zoom).

## 4. Shape and spacing
- Border radius: 0 on buttons, inputs, cards, tags, modals. Only `rounded-full` for carousel arrow buttons and the cart-count badge.
- Borders: 1px solid ink (or ink at 15% opacity for quiet dividers).
- Container: full-bleed for grids and heroes; text content max-width ~1440px, side padding `--gutter`.
- Section spacing: `--section-y`; gap inside a section stack: 2rem.

## 5. Components
**Announcement bar**: ink background, paper text, 12px uppercase, tracking 0.08em, ~36px high, centered one-liner (e.g. "Perfume, one notch higher").

**Header**: sticky, ~70px, paper background, 1px bottom border at 15% ink. Logo left (horizontal SVG), uppercase nav 13px (New, Perfume, Scent type, About), icons right (account, search, cart with count). Mobile: hamburger menu.

**Buttons** (radius 0, 14px, uppercase, padding 0.6em 1.2em):
- Primary: ink background, paper text. Hover: invert (paper bg, ink text, 1px ink border).
- Secondary: transparent, 1px ink border. Hover: ink background, paper text.
- Text link: uppercase 12px, underline, used for "Shop all".
- Transition 150ms ease-out. Visible focus ring: 2px outline ink, offset 2px.

**Link hover line** (`components/ui/HoverLine.tsx`, used by `NavItem`, the header buttons and the "Shop all" link): nothing is shown at rest. On hover (or keyboard focus) a 1px ink line draws under the text from left to right in 500 ms, ease-out, and stays while the pointer is over the link. When the pointer leaves, the line keeps moving to the right and disappears. With `prefers-reduced-motion` the line appears and disappears without movement. The line is solid ink, no gradient.

**NavItem** (`components/ui/NavItem.tsx`, nav and footer links, built on React Router's `NavLink`): uppercase 13px, weight 500, tracking `label`, ink text, with the hover line above. A `lg` size (headline type) is used by the side menu. The current page is not marked with a line (screen readers still get `aria-current`).

**Inputs**: 1px ink border, radius 0, padding 0.65rem 1rem, small 11–12px label above the field, gap 1rem between fields, error text in plain ink with a short message (do not rely on color alone).

**Product card** (`ProductCard`):
- Image area: aspect 4/5, `object-cover`, background `bottle`. The photos are square, so the crop trims the sides and keeps the bottle.
- Tag top-left (`New`, `Bestseller`, `Special edition`): 11px uppercase on paper, no radius.
- Text centered below: category label, NAME in uppercase, descriptor (13px), "From $X" and the sizes ("10 · 50 · 100 mL").
- Whole card is one link. Hover: slight image scale (1.02) or opacity change, nothing heavy.

**Product grid**: edge-to-edge, gap `--grid-gap` (2px). Columns: 2 on mobile, 3 on md, 4 on lg. On the home page the same cards live in a horizontal scroll-snap carousel with a section label, an underlined "Shop all" link and two circular arrow buttons.

**Size selector** (PDP): three square buttons (10 / 50 / 100 mL) with 1px border; selected = ink background; out of stock = disabled with a line-through and reduced opacity. Price updates when the size changes.

## 6. Page structure
**Home**: announcement bar → header → full-bleed hero (photo + display headline + one button: "Shop all") → "Perfume" carousel → scent-family tiles (Fresh, Floral, Woody, Amber) → "Special editions" strip (the 3 bottles with different caps) → one-line brand statement → newsletter (React Hook Form + Zod) → footer.

**Catalog**: page title, family filter as uppercase text links (All, Fresh, Floral, Woody, Amber), search (`useSearch`), sort select, product grid.

**Product page**: two columns. Left: large image. Right (sticky on desktop): name, descriptor, short story, size selector, price, full-width primary "Add to cart", then accordions: Notes (top / heart / base), Details, Shipping.

**Cart / Login / Register**: single centered column, max ~480px, same input and button styles.

**Checkout (`/checkout`, `/checkout/success`)**: two columns on desktop (form left, sticky order summary right); on phones the summary comes first and folds. Big display title. See the exception below.

**Footer**: columns Shop / About / Info / Legal, links 12px bold uppercase tracking 0.08em, logo (stacked), fictional-project disclaimer.

## Checkout exception (cinematic dark)
A deliberate, declared exception, like the About hero. Only the two checkout routes use a dark theme; every other page stays light. It is scoped with `data-theme="cinematic"` on the Layout wrapper (`src/styles/index.css`); the global tokens are not changed, inside the wrapper the same token names simply point to dark values, so header, footer, inputs and buttons adapt by themselves.
- Charcoal background `#151311` (as `paper`), surface `#1F1C19` (panels), text and lines in the old paper `#F5F1EA` (1px lines at 15% opacity), muted text `#A8A39A`.
- Amber `#B5793B` for accents and the focus ring (about 5.4:1 on charcoal). Soft gold `#D8B77A` only for highlights such as the total and the order number.
- Everything else still applies: square (radius 0), flat (no shadows, no gradients), Jost, uppercase labels.

## 7. Do and don't
- Do keep everything square, thin and typographic. Do keep lots of white space around text blocks.
- Don't add shadows, gradients, rounded corners, emojis or dark mode (the only dark theme is the checkout exception above).
- Don't copy any real brand's text, images, logo or layout one-to-one. Don't use the font Sofia Pro.
- Respect `prefers-reduced-motion`. Keep contrast AA for text.
