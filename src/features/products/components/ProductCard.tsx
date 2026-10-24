import { Link } from 'react-router-dom'
import { formatPrice } from '../../../lib/formatPrice'
import { defaultImageFit, imageFit } from '../imageFit'
import { getStartingPrice, type Product } from '../types'

interface ProductCardProps {
  product: Product
  /** Level of the name: h3 under a section title (the Home carousel), h2 on a page where the cards are the first headings. */
  headingLevel?: 'h2' | 'h3'
}

export default function ProductCard({ product, headingLevel: Heading = 'h3' }: ProductCardProps) {
  const tag = product.isBestseller ? 'Bestseller' : product.isNew ? 'New' : null
  const sizes = `${product.sizes.map((size) => size.ml).join(' · ')} mL`
  const fit = imageFit[product.slug] ?? defaultImageFit

  return (
    // The whole card is one link.
    <Link to={`/product/${product.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-bottle">
        <img
          src={`${import.meta.env.BASE_URL}${product.image}`}
          alt={`${product.name} perfume bottle`}
          width={600}
          height={600}
          loading="lazy"
          // translate/scale align the bottle (see imageFit); the hover zoom uses the separate `scale` property
          style={{ transform: `translateY(${fit.y}%) scale(${fit.scale})` }}
          className="size-full object-cover transition-[scale] duration-300 ease-out group-hover:scale-[1.02]"
        />
        {tag ? (
          <span className="absolute left-0 top-0 bg-paper px-2.5 py-1.5 text-xs font-medium uppercase tracking-(--tracking-label)">
            {tag}
          </span>
        ) : null}
      </div>

      <div className="flex flex-col items-center gap-1.5 px-2 py-4 text-center">
        <p className="text-xs font-medium uppercase tracking-(--tracking-label) text-olive">Eau de parfum</p>
        {/* text-base overrides the bigger default size of h2 */}
        <Heading className="text-base font-semibold uppercase leading-tight tracking-[0.04em]">{product.name}</Heading>
        <p className="text-sm">{product.descriptor}</p>
        <p className="mt-1 text-sm font-medium">From {formatPrice(getStartingPrice(product))}</p>
        <p className="text-xs text-olive">{sizes}</p>
      </div>
    </Link>
  )
}
