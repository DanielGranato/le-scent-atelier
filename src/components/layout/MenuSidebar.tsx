import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../../features/auth/useAuth'
import { useSignOut } from '../../features/auth/useSignOut'
import HoverLine from '../ui/HoverLine'
import NavItem from '../ui/NavItem'

interface MenuSidebarProps {
  open: boolean
  onClose: () => void
  /** "+ Contact us" (shown here on phones only): closes the menu and opens the contact drawer. */
  onContact: () => void
}

const links = [
  { label: 'Perfume', to: '/catalog' },
  { label: 'Special editions', to: '/special-editions' },
  { label: 'Notes', to: '/notes' },
  { label: 'About', to: '/about' },
]

export default function MenuSidebar({ open, onClose, onContact }: MenuSidebarProps) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const { pathname, search } = useLocation()
  const { user } = useAuth()
  const signOut = useSignOut()

  useEffect(() => {
    if (!open) return undefined

    // after a moment: on the first frame of the slide-in the panel is still `visibility: hidden`
    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 50)
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)

    return () => {
      window.clearTimeout(focusTimer)
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open, onClose])

  return (
    <>
      {/* blurred page behind the panel; clicking it closes the menu */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-[55] bg-ink/10 backdrop-blur-md transition-[opacity,visibility] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] ${
          open ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      />

      <aside
        id="site-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className={`fixed inset-y-0 right-0 z-[60] flex w-full flex-col bg-paper text-ink transition-[translate,visibility] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] md:w-[40%] ${
          open ? 'visible translate-x-0' : 'invisible translate-x-full'
        }`}
      >
        {/* same height as the header, so the close button sits where "Menu" was */}
        <div className="flex h-[70px] shrink-0 items-center justify-end px-(--gutter)">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="flex size-10 cursor-pointer items-center justify-center rounded-full border border-ink transition-colors duration-150 hover:bg-ink hover:text-paper"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M4 4l12 12M16 4L4 16" />
            </svg>
          </button>
        </div>

        <nav aria-label="Main" className="flex flex-1 flex-col justify-center px-(--gutter) pb-[70px]">
          {/* centered in the height of the panel (pb balances the close bar at the top), links stay left-aligned */}
          <ul className="flex flex-col items-start gap-5">
            <li>
              {user ? (
                <div className="flex flex-col items-start gap-1">
                  <p className="text-xs font-medium uppercase tracking-(--tracking-label) text-olive">
                    Signed in as {user.name}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      onClose()
                      signOut()
                    }}
                    className="group relative cursor-pointer py-2 text-[clamp(1.75rem,3vw,2.5rem)] leading-none tracking-(--tracking-heading)"
                  >
                    Sign out
                    <HoverLine />
                  </button>
                </div>
              ) : (
                // remembers this page, so after signing in the person comes back here
                <NavItem to="/login" size="lg" onClick={onClose} state={{ from: pathname + search }}>
                  Sign in
                </NavItem>
              )}
            </li>
            {links.map(({ label, to }) => (
              <li key={label}>
                <NavItem to={to} size="lg" onClick={onClose}>
                  {label}
                </NavItem>
              </li>
            ))}
            {/* mobile only: the header has no room for "+ Contact us", so it lives here */}
            <li className="sm:hidden">
              <button
                type="button"
                onClick={onContact}
                className="group relative cursor-pointer py-2 text-[clamp(1.75rem,3vw,2.5rem)] leading-none tracking-(--tracking-heading)"
              >
                + Contact us
                <HoverLine />
              </button>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  )
}
