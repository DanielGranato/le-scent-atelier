import { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo-le-scent-atelier-horizontal.svg'
import MenuSidebar, { type SidebarView } from './MenuSidebar'

const labelClass =
  'whitespace-nowrap text-xs font-medium sm:text-sm uppercase tracking-(--tracking-label) hover:underline underline-offset-4'

export default function Header() {
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
    // give focus back to the button that opened the panel
    const trigger = sidebarView === 'menu' ? menuButtonRef : contactButtonRef
    trigger.current?.focus()
  }, [sidebarView])

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-[70px] bg-paper">
      <div className="mx-auto grid h-full max-w-[1440px] grid-cols-[1fr_auto_1fr] items-center gap-3 px-(--gutter)">
        <div className="justify-self-start">
          <button
            ref={contactButtonRef}
            type="button"
            onClick={() => openSidebar('contact')}
            className={`${labelClass} cursor-pointer`}
            aria-expanded={sidebarOpen && sidebarView === 'contact'}
            aria-controls="site-menu"
          >
            + Contact us
          </button>
        </div>

        <Link to="/" aria-label="Le Scent Atelier, home">
          <img src={logo} alt="" className="h-4 w-auto sm:h-6" />
        </Link>

        <div className="justify-self-end">
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
          </button>
        </div>
      </div>

      <MenuSidebar open={sidebarOpen} view={sidebarView} onClose={closeSidebar} />
    </header>
  )
}
