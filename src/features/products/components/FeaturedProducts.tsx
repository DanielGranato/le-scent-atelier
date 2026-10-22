import { useEffect, useState } from 'react'
import Carousel from '../../../components/ui/Carousel'
import NavItem from '../../../components/ui/NavItem'
import { getFeaturedProducts } from '../api'
import type { Product } from '../types'
import ProductCard from './ProductCard'

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[] | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    getFeaturedProducts(6)
      .then((items) => {
        if (!cancelled) setProducts(items)
      })
      .catch(() => {
        if (!cancelled) setFailed(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  if (failed) {
    return <p className="px-(--gutter) py-(--section-y)">We could not load the perfumes. Please try again.</p>
  }
  if (!products) return null

  return (
    <div className="pb-(--section-y) pt-[calc(var(--section-y)*1.5)]">
      <Carousel
        label="Perfume"
        action={<NavItem to="/catalog">Shop all</NavItem>}
      >
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </Carousel>
    </div>
  )
}
