import { get } from '../../services/http'
import type { Product } from './types'

export function getProducts(): Promise<Product[]> {
  return get<Product[]>('/products')
}

/** Bestsellers first, then new arrivals, each group in catalog order. */
export async function getFeaturedProducts(limit: number): Promise<Product[]> {
  const products = await getProducts()
  const bestsellers = products.filter((p) => p.isBestseller)
  const newArrivals = products.filter((p) => p.isNew && !p.isBestseller)
  return [...bestsellers, ...newArrivals].slice(0, limit)
}

/** One perfume by its slug (the last part of its address), or null if there is none. */
export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts()
  return products.find((product) => product.slug === slug) ?? null
}
