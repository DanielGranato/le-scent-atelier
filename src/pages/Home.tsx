import { SprayBanner } from '../components/SprayBanner'
import HoverLine from '../components/ui/HoverLine'
import FamilyShowcase from '../features/products/components/FamilyShowcase'
import FeaturedProducts from '../features/products/components/FeaturedProducts'

import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <SprayBanner title="Le Scent Atelier. Scent. Elevating Everyday." backgroundImage="images/img01.webp">
      <p className="text-sm font-medium uppercase tracking-label">
        Scent.
        {/* two lines on phones keeps the box narrow; one line from sm up */}
        <br className="sm:hidden" /> Elevating Everyday
      </p>
      {/* black button; on hover the same line as the other links draws under the text (paper colored) */}
      <Link to="/catalog" className="group whitespace-nowrap bg-ink px-5 py-2 text-base uppercase text-paper">
        <span className="relative inline-block py-0.5">
          Shop all
          <HoverLine />
        </span>
      </Link>
    </SprayBanner>
      <FeaturedProducts />
      <FamilyShowcase />
    </main>
  )
}
