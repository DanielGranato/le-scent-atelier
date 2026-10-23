import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo-le-scent-atelier-horizontal.svg'
import AccountMenu from '../../features/auth/components/AccountMenu'
import HoverLine from '../ui/HoverLine'
import MenuSidebar, { type SidebarView } from './MenuSidebar'

const labelClass =
  'group relative whitespace-nowrap py-2 text-xs font-medium sm:text-sm uppercase tracking-(--tracking-label)'

const HEADER_HEIGHT = 70

interface HeaderProps {
  /**
   * Transparent header with light text, for a page that starts with a full-screen photo.
   * Once the page is scrolled past that first screen it turns into the normal paper header,
   * so the text never lands on a light background.
   */
  transparent?: boolean
}

export default function Header({ transparent = false }: HeaderProps) {
  const [pastFirstScreen, setPastFirstScreen] = useState(false)

  useEffect(() => {
    if (!transparent) return undefined
    const update = () => setPastFirstScreen(window.scrollY > window.innerHeight - HEADER_HEIGHT)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => {
      window.removeEventListener('scroll', update)
      setPastFirstScreen(false)
    }
  }, [transparent])

  const overPhoto = transparent && !pastFirstScreen

  const [sidebarOpen, setSidebarOpen] = useState(false)
  // stays set after closing, so the panel content does not change during the slide-out
  const [sidebarView, setSidebarView] = useState<SidebarView>('menu')
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const contactButtonRef = useRef<HTMLButtonElement>(null)

  const openSidebar = (view: SidebarView) => {
    setSidebarView(view)
    setSidebarOpen(true)
  }

  const closeSidebar = useCallback(() => {
    setSidebarOpen(false)
    // give focus back to the button that opened the panel; on mobile the contact button is
    // hidden (offsetParent is null), so the contact view was reached through the menu
    const contactVisible = contactButtonRef.current?.offsetParent != null
    const trigger = sidebarView === 'contact' && contactVisible ? contactButtonRef : menuButtonRef
    trigger.current?.focus()
  }, [sidebarView])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 h-[70px] transition-colors duration-300 ${
        overPhoto ? 'bg-transparent text-paper' : 'bg-paper text-ink'
      }`}
    >
      {/* mobile: logo left, menu right ("+ Contact us" lives inside the menu); sm and up: 3 columns with the logo centered */}
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between gap-3 px-(--gutter) sm:grid sm:grid-cols-[1fr_auto_1fr]">
        <div className="hidden justify-self-start sm:block">
          <button
            ref={contactButtonRef}
            type="button"
            onClick={() => openSidebar('contact')}
            className={`${labelClass} cursor-pointer`}
            aria-expanded={sidebarOpen && sidebarView === 'contact'}
            aria-controls="site-menu"
          >
            + Contact us
            <HoverLine />
          </button>
        </div>

        <Link to="/" aria-label="Le Scent Atelier, home">
          {/* the logo SVG is drawn in black; over a photo it is turned white */}
          <img
            src={logo}
            alt=""
            className={`h-4 w-auto sm:h-6 ${overPhoto ? 'brightness-0 invert' : ''}`}
          />
        </Link>

        <div className="flex items-center gap-5 justify-self-end sm:gap-6">
          <AccountMenu />
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => openSidebar('menu')}
            className={`${labelClass} flex cursor-pointer items-center gap-2`}
            aria-label="Open menu"
            aria-expanded={sidebarOpen && sidebarView === 'menu'}
            aria-controls="site-menu"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M2 5h16M2 10h16M2 15h16" />
            </svg>
            Menu
            <HoverLine />
          </button>
        </div>
      </div>

      <MenuSidebar
        open={sidebarOpen}
        view={sidebarView}
        onViewChange={setSidebarView}
        onClose={closeSidebar}
      />
    </header>
  )
}
