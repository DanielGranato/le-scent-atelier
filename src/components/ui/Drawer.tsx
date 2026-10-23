import { useEffect, useId, useRef, type ReactNode, type RefObject } from 'react'
import { cn } from '../../lib/cn'

interface DrawerProps {
  id?: string
  open: boolean
  onClose: () => void
  /** Shown at the top of the panel; it also names the dialog for screen readers. */
  title: string
  /** Accessible name of the close button. */
  closeLabel?: string
  /** Where focus goes when the drawer closes. Without it, focus goes back to whatever had it before opening. */
  returnFocusRef?: RefObject<HTMLElement | null>
  children: ReactNode
}

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Side panel that slides in from the right, full height, with a 1px ink line on its left edge. It is
 * 640px wide from md up (full width on phones) and has inner padding on the sides and at the top
 * (24px on phones, 40px from md up). A flat ink overlay sits behind it. While open: focus moves into the panel and stays there
 * (Tab and Shift+Tab loop), Esc and a click on the overlay close it, the page behind cannot scroll,
 * and focus goes back to the opener when it closes. With reduced motion it just appears.
 */
export default function Drawer({ id, open, onClose, title, closeLabel = 'Close', returnFocusRef, children }: DrawerProps) {
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  // always the latest onClose, so a new function on each render does not restart the effect below
  const onCloseRef = useRef(onClose)
  useEffect(() => {
    onCloseRef.current = onClose
  })

  useEffect(() => {
    const panel = panelRef.current
    if (!open || !panel) return undefined

    // where focus goes on close: the target given by the parent (set before opening), or whatever has focus now
    const returnTarget = returnFocusRef?.current ?? (document.activeElement as HTMLElement | null)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    // The panel is still `visibility: hidden` on the very first frame of its slide-in, and a hidden
    // element cannot take focus, so focus it a moment later.
    const focusTimer = window.setTimeout(() => panel.focus(), 50)

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onCloseRef.current()
        return
      }
      if (event.key !== 'Tab') return

      const items = [...panel.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((item) => item.offsetParent !== null)
      if (items.length === 0) {
        event.preventDefault()
        panel.focus()
        return
      }
      const first = items[0]
      const last = items[items.length - 1]
      const active = document.activeElement
      if (event.shiftKey && (active === first || active === panel)) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      window.clearTimeout(focusTimer)
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      if (returnTarget && document.contains(returnTarget)) returnTarget.focus()
    }
  }, [open, returnFocusRef])

  return (
    <>
      {/* flat ink overlay at 40%; a click on it closes the drawer */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={cn(
          'fixed inset-0 z-[55] bg-ink/40 transition-[opacity,visibility] duration-500 ease-out motion-reduce:transition-none',
          open ? 'visible opacity-100' : 'invisible opacity-0',
        )}
      />

      <div
        id={id}
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={cn(
          'fixed inset-y-0 right-0 z-[60] flex w-full flex-col border-l border-ink bg-paper text-ink focus:outline-none md:w-[640px]',
          'transition-[translate,visibility] duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none',
          open ? 'visible translate-x-0' : 'invisible translate-x-full',
        )}
      >
        <div className="flex shrink-0 items-center justify-between gap-4 px-6 pb-4 pt-6 md:px-10 md:pt-10">
          <h2 id={titleId} className="text-[clamp(1.25rem,2vw,1.5rem)] leading-none">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label={closeLabel}
            className="flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-full border border-ink transition-colors duration-150 hover:bg-ink hover:text-paper"
          >
            <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <path d="M4 4l12 12M16 4L4 16" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-10 md:px-10">{children}</div>
      </div>
    </>
  )
}
