import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo-le-scent-atelier-horizontal.svg'
import AccountMenu from '../../features/auth/components/AccountMenu'
import CartButton from '../../features/cart/components/CartButton'
import ContactPanel from '../../features/contact/components/ContactPanel'
import Drawer from '../ui/Drawer'
import HoverLine from '../ui/HoverLine'
import MenuSidebar from './MenuSidebar'

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
  /** Dark theme (checkout): the logo, which is drawn in black, is turned light. */
  dark?: boolean
}

export default function Header({ transparent = false, dark = false }: HeaderProps) {
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

  const [menuOpen, setMenuOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)
  // changes on every opening, so the contact form always starts empty (the old one leaves during the slide-out)
  const [contactKey, setContactKey] = useState(0)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const contactButtonRef = useRef<HTMLButtonElement>(null)
  // where focus goes when the contact drawer closes
  const contactReturnRef = useRef<HTMLElement | null>(null)

  const closeMenu = useCallback(() => {
    setMenuOpen(false)
    menuButtonRef.current?.focus()
  }, [])

  const openContact = () => {
    // On phones the "+ Contact us" button is hidden (offsetParent is null): the way in is the menu.
    const buttonVisible = contactButtonRef.current?.offsetParent != null
    contactReturnRef.current = buttonVisible ? contactButtonRef.current : menuButtonRef.current
    setContactKey((key) => key + 1)
    setContactOpen(true)
  }

  const openContactFromMenu = () => {
    setMenuOpen(false) // no focus change here: the drawer takes focus right away
    openContact()
  }

  const closeContact = useCallback(() => setContactOpen(false), [])

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
            onClick={openContact}
            className={`${labelClass} cursor-pointer`}
            aria-haspopup="dialog"
            aria-expanded={contactOpen}
            aria-controls="contact-drawer"
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
            className={`h-4 w-auto sm:h-6 ${overPhoto || dark ? 'brightness-0 invert' : ''}`}
          />
        </Link>

        <div className="flex items-center gap-5 justify-self-end sm:gap-6">
          <AccountMenu />
          <CartButton />
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen(true)}
            className={`${labelClass} flex cursor-pointer items-center gap-2`}
            aria-label="Open menu"
            aria-expanded={menuOpen}
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

      <MenuSidebar open={menuOpen} onClose={closeMenu} onContact={openContactFromMenu} />

      <Drawer
        id="contact-drawer"
        open={contactOpen}
        onClose={closeContact}
        title="Contact us"
        closeLabel="Close contact form"
        returnFocusRef={contactReturnRef}
      >
        <ContactPanel key={contactKey} />
      </Drawer>
    </header>
  )
}
