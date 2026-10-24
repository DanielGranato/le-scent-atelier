import type { Product } from '../types'
import ProductCard from './ProductCard'

interface ProductGridProps {
  products: Product[]
  /** Level of the product names (see ProductCard). */
  headingLevel?: 'h2' | 'h3'
}

/** The grid classes, shared with the loading skeleton so both take exactly the same space. */
export const gridClass =
  'mx-auto grid w-full max-w-[1440px] grid-cols-2 gap-x-(--gutter) gap-y-(--grid-gap) px-(--gutter) md:grid-cols-3 lg:grid-cols-4'

/**
 * Grid inside the same side margins as the rest of the page (--gutter, max 1440px).
 * Space between images: --gutter sideways, 2px between rows. 2 columns on mobile, 3 on md, 4 on lg.
 */
export default function ProductGrid({ products, headingLevel }: ProductGridProps) {
  return (
    <ul className={gridClass}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  )
}
