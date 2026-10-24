import { useEffect, useMemo, useState } from 'react'
import Input from '../../../components/ui/Input'
import Select from '../../../components/ui/Select'
import { getProducts } from '../api'
import { useCatalogFilters } from '../hooks/useCatalogFilters'
import { useSearch } from '../hooks/useSearch'
import { SORT_OPTIONS, sortProducts, type SortKey } from '../sorting'
import type { Product } from '../types'
import Filters from './Filters'
import ProductGrid from './ProductGrid'
import ProductGridSkeleton from './ProductGridSkeleton'

const NO_PRODUCTS: Product[] = []

export default function CatalogBrowser() {
  const { family, sort, query, input, setInput, setFamily, setSort, clear } = useCatalogFilters()
  const [products, setProducts] = useState<Product[] | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    getProducts()
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

  const inFamily = useMemo(
    () => (products ?? NO_PRODUCTS).filter((product) => !family || product.family === family),
    [products, family],
  )
  const matches = useSearch(inFamily, query)
  const visible = useMemo(() => sortProducts(matches, sort), [matches, sort])

  if (failed) {
    return <p className="px-(--gutter)">We could not load the perfumes. Please try again.</p>
  }

  return (
    <div className="flex flex-col gap-10 md:gap-6">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-(--gutter) lg:flex-row lg:items-end lg:justify-between lg:gap-6">
        <Filters value={family} onChange={setFamily} />

        <div className="flex items-end gap-4 md:gap-3">
          <div className="flex-1 sm:w-64 sm:flex-none">
            <Input
              label="Search perfumes"
              hideLabel
              type="search"
              placeholder="Search perfumes"
              autoComplete="off"
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
          </div>
          <div className="w-44 shrink-0">
            <Select label="Sort by" value={sort} onChange={(event) => setSort(event.target.value as SortKey)}>
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </Select>
          </div>
        </div>
      </div>

      {/* the line and the grid keep their space while loading (skeleton), so the footer does not jump */}
      <p role="status" className="mx-auto min-h-4 w-full max-w-[1440px] px-(--gutter) text-sm text-olive">
        {products ? (visible.length === 1 ? '1 perfume' : `${visible.length} perfumes`) : ''}
      </p>

      {!products ? <ProductGridSkeleton /> : null}

      {products ? (
        <>
          {visible.length > 0 ? (
            <ProductGrid products={visible} headingLevel="h2" />
          ) : (
            <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-4 px-(--gutter) py-(--section-y)">
              <p className="text-lg">Nothing matches that. Even we are surprised.</p>
              <button
                type="button"
                onClick={clear}
                className="cursor-pointer text-xs font-semibold uppercase tracking-(--tracking-label) underline underline-offset-4"
              >
                Clear filters
              </button>
            </div>
          )}
        </>
      ) : null}
    </div>
  )
}
