import { useEffect, useState } from 'react'
import { getProductBySlug } from '../api'
import type { Product } from '../types'

export type ProductState =
  | { status: 'loading' }
  | { status: 'ready'; product: Product }
  | { status: 'not-found' }
  | { status: 'error' }

interface Loaded {
  slug: string
  product: Product | null
  failed: boolean
}

/** Loads one perfume by slug. Reports loading, ready, not-found or error. */
export function useProduct(slug: string | undefined): ProductState {
  const [loaded, setLoaded] = useState<Loaded | null>(null)

  useEffect(() => {
    if (!slug) return undefined
    let cancelled = false
    getProductBySlug(slug)
      .then((product) => {
        if (!cancelled) setLoaded({ slug, product, failed: false })
      })
      .catch(() => {
        if (!cancelled) setLoaded({ slug, product: null, failed: true })
      })
    return () => {
      cancelled = true
    }
  }, [slug])

  if (!slug) return { status: 'not-found' }
  // the stored result belongs to another perfume (the address just changed): still loading
  if (!loaded || loaded.slug !== slug) return { status: 'loading' }
  if (loaded.failed) return { status: 'error' }
  return loaded.product ? { status: 'ready', product: loaded.product } : { status: 'not-found' }
}
