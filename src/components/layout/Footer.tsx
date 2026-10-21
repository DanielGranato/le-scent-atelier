import { Link } from 'react-router-dom'
import logo from '../../assets/logo-le-scent-atelier.svg'
import NewsletterForm from '../../features/newsletter/NewsletterForm'

// Most of these pages do not exist yet; they fall back to NotFound until they are built.
const columns = [
  {
    title: 'Shop',
    links: [
      { label: 'Perfume', to: '/catalog' },
      { label: 'Sample sets', to: '/sample-sets' },
      { label: 'Special editions', to: '/catalog' },
    ],
  },
  {
    title: 'About',
    links: [
      { label: 'Our story', to: '/about' },
      { label: 'Notes', to: '/about' },
    ],
  },
  {
    title: 'Info',
    links: [
      { label: 'Shipping', to: '/info' },
      { label: 'Returns', to: '/info' },
      { label: 'FAQ', to: '/info' },
      { label: 'Contact', to: '/contact' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Terms', to: '/legal' },
      { label: 'Privacy', to: '/legal' },
      { label: 'Cookies', to: '/legal' },
    ],
  },
]

const linkClass =
  'text-xs font-semibold uppercase tracking-(--tracking-label) hover:underline underline-offset-4'

export default function Footer() {
  return (
    <footer className="border-t border-ink/15 px-(--gutter) py-(--section-y)">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_minmax(0,22rem)] lg:gap-16">
          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4">
            {columns.map(({ title, links }) => (
              <nav key={title} aria-label={title} className="flex flex-col gap-4">
                <h2 className="text-xs font-medium uppercase tracking-(--tracking-label) text-olive">
                  {title}
                </h2>
                <ul className="flex flex-col gap-3">
                  {links.map(({ label, to }) => (
                    <li key={label}>
                      <Link to={to} className={linkClass}>
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <section aria-labelledby="newsletter-title" className="flex flex-col gap-4">
            {/* big on purpose: uses the default h2 style (size, tight tracking) */}
            <h2 id="newsletter-title">Small mail, rarely. New scents and the occasional joke.</h2>
            <NewsletterForm />
          </section>
        </div>

        <div className="flex flex-col gap-6 border-t border-ink/15 pt-8 md:flex-row md:items-end md:justify-between">
          <Link to="/" aria-label="Le Scent Atelier, home">
            <img src={logo} alt="" className="h-14 w-auto" />
          </Link>

          <div className="flex flex-col gap-1 text-sm md:items-end md:text-right">
            <p>Portfolio project. Fictional brand, no real products are sold.</p>
            <p className="text-olive">&copy; {new Date().getFullYear()} Le Scent Atelier</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
