import { useEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

/**
 * React Router keeps the scroll position when the page changes, so a link in the footer would open
 * the next page halfway down. This sends the window back to the top on every navigation.
 *
 * Exception: a REPLACE that only changes the query string (the catalog search and sort write to
 * the URL like that) keeps the scroll position.
 */
export default function ScrollToTop() {
  const { pathname, search, key } = useLocation()
  const navigationType = useNavigationType()
  const previous = useRef({ pathname, search })

  useEffect(() => {
    const before = previous.current
    previous.current = { pathname, search }

    const onlyQueryChanged = pathname === before.pathname && search !== before.search
    if (navigationType === 'REPLACE' && onlyQueryChanged) return

    window.scrollTo(0, 0)
  }, [key, pathname, search, navigationType])

  return null
}
