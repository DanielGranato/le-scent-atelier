import { SprayBanner } from '../components/SprayBanner'
import FamilyShowcase from '../features/products/components/FamilyShowcase'
import FeaturedProducts from '../features/products/components/FeaturedProducts'

import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <SprayBanner title="Le Scent Atelier. Scent. Elevating Everyday.">
      <p className="text-sm font-medium uppercase tracking-label">Scent. Elevating Everyday</p>
      <Link to="/catalog" className="bg-ink px-5 py-2 text-base uppercase text-paper">
        Shop all
      </Link>
    </SprayBanner>
      <FeaturedProducts />
      <FamilyShowcase />
    </main>
  )
}
