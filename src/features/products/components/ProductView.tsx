import { useState } from 'react'
import Button from '../../../components/ui/Button'
import NavItem from '../../../components/ui/NavItem'
import { formatPrice } from '../../../lib/formatPrice'
import { useDocumentMeta } from '../../../hooks/useDocumentMeta'
import { useCart } from '../../cart/useCart'
import { FAMILIES } from '../families'
import type { Product, SizeMl } from '../types'
import Disclosure from './Disclosure'
import SizeSelector from './SizeSelector'

interface ProductViewProps {
  product: Product
}

const NOTE_LEVELS = [
  { key: 'top', label: 'Top' },
  { key: 'heart', label: 'Heart' },
  { key: 'base', label: 'Base' },
] as const

/** The page of one perfume: big photo on the left, details and choices on the right. */
export default function ProductView({ product }: ProductViewProps) {
  useDocumentMeta({ title: `${product.name} | Le Scent Atelier`, description: product.story })

  // start with the first size that is in stock
  const firstInStock = product.sizes.find((size) => size.inStock)
  const [sizeMl, setSizeMl] = useState<SizeMl | null>(firstInStock?.ml ?? null)
  const { addItem, openCart } = useCart()

  const selected = product.sizes.find((size) => size.ml === sizeMl) ?? null
  const family = FAMILIES.find((item) => item.id === product.family)

  const addToCart = () => {
    if (selected && addItem(product, selected.ml)) openCart()
  }

  return (
    <main className="mx-auto flex w-full max-w-[1440px] flex-1 flex-col gap-6 px-(--gutter) py-(--section-y)">
      <nav aria-label="Back">
        <NavItem to="/catalog">&larr; All perfumes</NavItem>
      </nav>

      {/* The photos are 600x600. A 4/5 box that is 600px tall (480px wide) shows them at their real size; wider than that they would be stretched and look soft. */}
      <div className="grid items-start gap-8 md:grid-cols-[minmax(0,480px)_minmax(0,560px)] md:gap-(--header-h)">
        <div className="aspect-[4/5] w-full max-w-[480px] overflow-hidden bg-bottle">
          <img
            src={`${import.meta.env.BASE_URL}${product.image}`}
            alt={`${product.name} perfume bottle`}
            fetchPriority="high"
            className="size-full object-cover"
          />
        </div>

        {/* sticky on desktop: the details stay in view while the page scrolls */}
        <div className="flex flex-col gap-6 md:sticky md:top-[calc(var(--header-h)+1.5rem)]">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-medium uppercase tracking-label text-olive">
              {family?.title ?? product.family} &middot; Eau de parfum
              {product.isBestseller ? ' · Bestseller' : product.isNew ? ' · New' : ''}
            </p>
            <h1>{product.name}</h1>
            <p className="text-lg">{product.descriptor}</p>
          </div>

          <p className="max-w-[44ch] text-base">{product.story}</p>

          <SizeSelector sizes={product.sizes} value={sizeMl ?? product.sizes[0].ml} onChange={setSizeMl} />

          <p aria-live="polite" className="text-2xl font-medium">
            {selected ? formatPrice(selected.price) : 'Sold out'}
          </p>

          <Button disabled={!selected} onClick={addToCart} className="w-full disabled:cursor-not-allowed">
            {selected ? 'Add to cart' : 'Sold out'}
          </Button>

          <div className="border-b border-ink">
            <Disclosure title="Notes" defaultOpen>
              <dl className="flex flex-col gap-3">
                {NOTE_LEVELS.map(({ key, label }) => (
                  <div key={key} className="flex flex-col gap-1">
                    <dt className="text-xs font-medium uppercase tracking-label text-olive">{label}</dt>
                    <dd>{product.notes[key].join(', ')}</dd>
                  </div>
                ))}
              </dl>
            </Disclosure>

            <Disclosure title="Details">
              <dl className="flex flex-col gap-3">
                <div className="flex flex-col gap-1">
                  <dt className="text-xs font-medium uppercase tracking-label text-olive">Type</dt>
                  <dd>Eau de parfum</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-xs font-medium uppercase tracking-label text-olive">Family</dt>
                  <dd>{family?.title ?? product.family}</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-xs font-medium uppercase tracking-label text-olive">Sizes</dt>
                  <dd>{product.sizes.map((size) => size.ml).join(' · ')} mL</dd>
                </div>
                <div className="flex flex-col gap-1">
                  <dt className="text-xs font-medium uppercase tracking-label text-olive">Made</dt>
                  <dd>In small batches</dd>
                </div>
              </dl>
            </Disclosure>

            <Disclosure title="Shipping">
              <p className="mb-3 max-w-[44ch]">
                Standard delivery takes 5 to 8 business days and is free over $120. Express takes 2 to 3 business days.
              </p>
              <NavItem to="/shipping">Read about shipping</NavItem>
            </Disclosure>
          </div>
        </div>
      </div>
    </main>
  )
}
