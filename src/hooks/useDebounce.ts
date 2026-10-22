import { useEffect, useState } from 'react'

/** Returns `value` only after it has stopped changing for `delay` ms. */
export function useDebounce<T>(value: T, delay = 250): T {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = window.setTimeout(() => setDebounced(value), delay)
    return () => window.clearTimeout(timer)
  }, [value, delay])

  return debounced
}
