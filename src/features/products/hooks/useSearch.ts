import { useMemo } from 'react'
import type { Product } from '../types'

/**
 * Filters products by a free-text query. Every word of the query has to appear somewhere in the
 * name, descriptor, family or notes of the product ("rose floral" finds Dry rose perfumes in floral).
 */
export function useSearch(products: Product[], query: string): Product[] {
  return useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean)
    if (words.length === 0) return products

    return products.filter((product) => {
      const text = [
        product.name,
        product.descriptor,
        product.family,
        ...product.notes.top,
        ...product.notes.heart,
        ...product.notes.base,
      ]
        .join(' ')
        .toLowerCase()
      return words.every((word) => text.includes(word))
    })
  }, [products, query])
}
