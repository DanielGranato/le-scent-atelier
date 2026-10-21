import { Link } from 'react-router-dom'
import logo from '../../assets/logo-le-scent-atelier.svg'

export default function Footer() {
  return (
    <footer className="border-t border-ink/15 px-(--gutter) py-(--section-y)">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col items-start gap-6">
          <Link to="/" aria-label="Le Scent Atelier, home">
            <img src={logo} alt="" className="h-14 w-auto" />
          </Link>
          <Link
            to="/contact"
            className="text-sm font-semibold uppercase tracking-(--tracking-label) hover:underline underline-offset-4"
          >
            Contact us
          </Link>
        </div>

        <p className="max-w-[44ch] text-sm md:text-right">
          Portfolio project. Fictional brand, no real products are sold.
        </p>
      </div>
    </footer>
  )
}
