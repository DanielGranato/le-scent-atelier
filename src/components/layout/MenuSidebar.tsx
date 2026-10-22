import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import HoverLine from '../ui/HoverLine'
import NavItem from '../ui/NavItem'

export type SidebarView = 'menu' | 'contact'

interface MenuSidebarProps {
  open: boolean
  /** Which content to show. Keep it set while closing so the content does not change mid-animation. */
  view: SidebarView
  onViewChange: (view: SidebarView) => void
  onClose: () => void
}

// Some of these routes do not exist yet; they fall back to NotFound until the pages are built.
const links = [
  { label: 'New', to: '/catalog' },
  { label: 'Perfume', to: '/catalog' },
  { label: 'Sample sets', to: '/sample-sets' },
  { label: 'Scent type', to: '/catalog' },
  { label: 'About', to: '/about' },
]

export default function MenuSidebar({ open, view, onViewChange, onClose }: MenuSidebarProps) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return undefined

    closeRef.current?.focus()
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKeyDown)

    return () => {
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
        aria-label={view === 'menu' ? 'Menu' : 'Contact us'}
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
            aria-label={view === 'menu' ? 'Close menu' : 'Close contact panel'}
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

        {view === 'menu' ? (
          <nav aria-label="Main" className="flex flex-1 flex-col justify-center px-(--gutter) pb-[70px]">
            {/* centered in the height of the panel (pb balances the close bar at the top), links stay left-aligned */}
            <ul className="flex flex-col items-start gap-5">
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
                  onClick={() => {
                    onViewChange('contact')
                    closeRef.current?.focus()
                  }}
                  className="group relative cursor-pointer py-2 text-[clamp(1.75rem,3vw,2.5rem)] leading-none tracking-(--tracking-heading)"
                >
                  + Contact us
                  <HoverLine />
                </button>
              </li>
            </ul>
          </nav>
        ) : (
          <div className="flex flex-1 flex-col items-start justify-center gap-6 px-(--gutter) pb-[70px]">
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] leading-none">Contact Us</h2>
            <p className="max-w-[28ch] text-lg">Do you need further assistance?</p>
            <Link
              to="/contact"
              onClick={onClose}
              className="border border-ink bg-ink px-5 py-2.5 text-base uppercase tracking-(--tracking-label) text-paper transition-colors duration-150 hover:bg-paper hover:text-ink"
            >
              Get in Contact with Us
            </Link>
          </div>
        )}
      </aside>
    </>
  )
}
