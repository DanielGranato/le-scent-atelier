import { Link } from 'react-router-dom'
import NewsletterForm from '../../features/newsletter/NewsletterForm'
import NavItem from '../ui/NavItem'

// Read once, not on every render.
const YEAR = new Date().getFullYear()

// Width of the words "LE SCENT ATELIER" in Jost Light with 0.04em letter-spacing, in em (measured in the
// browser, minus the spacing after the last letter). It lets the font size be set so the word fills the width.
const WORDMARK_WIDTH_EM = 8.394

// Most of these pages do not exist yet; they fall back to NotFound until they are built.
const columns = [
  {
    title: 'Shop',
    links: [
      { label: 'Perfume', to: '/catalog' },
      { label: 'Special editions', to: '/special-editions' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'Our story', to: '/about' },
      { label: 'Notes', to: '/notes' },
    ],
  },
  {
    title: 'Info',
    links: [
      { label: 'Shipping', to: '/shipping' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms', to: '/legal/terms' },
      { label: 'Privacy', to: '/legal/privacy' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className="border-t border-ink/15 pt-(--section-y)">
      <div className="mx-auto w-full max-w-[1440px] px-(--gutter)">
        <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,22rem)] lg:grid-rows-[auto_1fr] lg:gap-x-16">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:col-start-1 lg:row-start-1">
            {columns.map(({ title, links }) => (
              <nav key={title} aria-label={title} className="flex flex-col gap-4">
                <h2 className="text-xs font-medium uppercase tracking-(--tracking-label) text-olive">
                  {title}
                </h2>
                <ul className="flex flex-col gap-1">
                  {links.map(({ label, to }) => (
                    <li key={label}>
                      <NavItem to={to}>{label}</NavItem>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <section
            aria-labelledby="newsletter-title"
            className="flex flex-col gap-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-end"
          >
            {/* big on purpose: uses the default h2 style (size, tight tracking) */}
            <h2 id="newsletter-title">Small mail, rarely. New scents and the occasional joke.</h2>
            <NewsletterForm />
          </section>

          {/* on desktop it sits at the bottom of the left column, level with the email field */}
          <div className="flex flex-col gap-1 text-sm lg:col-start-1 lg:row-start-2 lg:self-end">
            <p>Portfolio project. Fictional brand, no real products are sold.</p>
            <p className="text-olive">&copy; {YEAR} Le Scent Atelier</p>
          </div>
        </div>

        {/* thin line under the email field, with the same space above and below */}
        <div aria-hidden="true" className="mt-(--section-y) border-t border-ink/15" />
      </div>

      {/* the name, as big as the space left by its margins (70px on desktop, 32px on phones) allows */}
      <Link
        to="/"
        aria-label="Le Scent Atelier, home"
        className="block overflow-hidden px-[clamp(2rem,5vw,4.375rem)] pb-[clamp(2rem,5vw,4.375rem)] pt-(--section-y)"
      >
        <div style={{ containerType: 'inline-size' }}>
          <span
            aria-hidden="true"
            className="-mt-[0.07em] block whitespace-nowrap font-light uppercase leading-[0.9] tracking-[0.04em]"
            style={{ fontSize: `calc(100cqw / ${WORDMARK_WIDTH_EM})` }}
          >
            Le Scent Atelier
          </span>
        </div>
      </Link>
    </footer>
  )
}
