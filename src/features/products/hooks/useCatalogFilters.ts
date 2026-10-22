import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDebounce } from '../../../hooks/useDebounce'
import { FAMILIES } from '../families'
import { DEFAULT_SORT, isSortKey, type SortKey } from '../sorting'
import type { ScentFamily } from '../types'

/**
 * Catalog filters kept in the URL (?family=fresh&q=rose&sort=name), so a filtered catalog can be
 * linked to, and the back button works. The search box has its own text state that is copied to the
 * URL after a short pause, so the list does not re-filter on every key.
 */
export function useCatalogFilters() {
  const [params, setParams] = useSearchParams()

  const familyParam = params.get('family')
  const family = FAMILIES.find((item) => item.id === familyParam)?.id ?? null
  const sortParam = params.get('sort')
  const sort: SortKey = isSortKey(sortParam) ? sortParam : DEFAULT_SORT
  const query = params.get('q') ?? ''

  const update = (changes: Record<string, string | null>, replace: boolean) =>
    setParams(
      (previous) => {
        const next = new URLSearchParams(previous)
        for (const [key, value] of Object.entries(changes)) {
          if (value) next.set(key, value)
          else next.delete(key)
        }
        return next
      },
      { replace },
    )

  const [input, setInput] = useState(query)
  const debouncedInput = useDebounce(input).trim()

  // typed text -> URL
  useEffect(() => {
    if (debouncedInput !== query) update({ q: debouncedInput || null }, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only react to the typed text
  }, [debouncedInput])

  // URL changed from outside (a menu link, the back button) -> text box
  useEffect(() => {
    if (query !== debouncedInput) setInput(query)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only react to the URL
  }, [query])

  return {
    family,
    sort,
    query,
    input,
    setInput,
    setFamily: (next: ScentFamily | null) => update({ family: next }, false),
    setSort: (next: SortKey) => update({ sort: next === DEFAULT_SORT ? null : next }, true),
    clear: () => {
      setInput('')
      setParams(new URLSearchParams())
    },
  }
}
