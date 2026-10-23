import { useCallback, useEffect, useRef, useState } from 'react'

/** Reads a JSON value from localStorage. Gives `fallback` if it is missing, broken or storage is blocked. */
export function readLocalStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key)
    return raw === null ? fallback : (JSON.parse(raw) as T)
  } catch {
    return fallback
  }
}

function writeLocalStorage<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* private mode or storage blocked: the value then only lives in memory */
  }
}

/**
 * Like useState, but the value is kept in localStorage (as JSON) and follows changes made in other tabs.
 * Returns [value, set, read]. `read()` gives the latest value right away, even inside async code
 * where `value` may be stale. `set` accepts a function and always starts from the latest value.
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => readLocalStorage(key, initialValue))
  const latest = useRef(value)

  const set = useCallback(
    (next: T | ((previous: T) => T)) => {
      const resolved = typeof next === 'function' ? (next as (previous: T) => T)(latest.current) : next
      latest.current = resolved
      writeLocalStorage(key, resolved)
      setValue(resolved)
    },
    [key],
  )

  const read = useCallback(() => latest.current, [])

  // another tab changed the value
  useEffect(() => {
    const onStorage = (event: StorageEvent) => {
      if (event.key !== key) return
      const next = readLocalStorage(key, initialValue)
      latest.current = next
      setValue(next)
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
    // initialValue is only a fallback; it is not meant to retrigger this effect
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return [value, set, read] as const
}
