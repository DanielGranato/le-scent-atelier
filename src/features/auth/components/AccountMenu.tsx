import { useEffect, useId, useRef, useState } from 'react'
import Button from '../../../components/ui/Button'
import HoverLine from '../../../components/ui/HoverLine'
import { useAuth } from '../useAuth'
import { useSignOut } from '../useSignOut'

function PersonIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <circle cx="10" cy="6.5" r="3.25" />
      <path d="M3.5 17c.6-3.2 3.2-5 6.5-5s5.9 1.8 6.5 5Z" />
    </svg>
  )
}

const triggerClass =
  'group relative flex cursor-pointer items-center gap-2 py-2 text-xs font-medium uppercase tracking-(--tracking-label) sm:text-sm'

/**
 * Account control for the Header. It only exists for a signed-in person: a person icon with the
 * first name, opening a small panel with "Sign out". Signing in starts from the side menu.
 * The part that holds the "open" state is its own component, so it is thrown away on sign-out
 * and the next person to sign in finds the panel closed.
 */
export default function AccountMenu() {
  const { user } = useAuth()
  return user ? <SignedInMenu name={user.name} email={user.email} /> : null
}

function SignedInMenu({ name, email }: { name: string; email: string }) {
  const signOut = useSignOut()
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // close with Escape (focus goes back to the button) or with a click outside
  useEffect(() => {
    if (!open) return undefined
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      triggerRef.current?.focus()
    }
    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const firstName = name.split(' ')[0]

  return (
    <div ref={rootRef} className="relative">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`Account menu, signed in as ${firstName}`}
        className={triggerClass}
      >
        <PersonIcon />
        <span className="hidden max-w-[10ch] truncate sm:inline">{firstName}</span>
        <HoverLine />
      </button>

      {/* text-ink: the header can be transparent with light text, the panel is always paper */}
      <div
        id={panelId}
        hidden={!open}
        className="absolute right-0 top-full z-10 mt-2 flex w-64 flex-col gap-1 border border-ink bg-paper p-4 text-ink"
      >
        <p className="text-xs font-medium uppercase tracking-(--tracking-label) text-olive">Signed in as</p>
        <p className="text-base font-semibold">{name}</p>
        <p className="break-all text-sm text-olive">{email}</p>
        <Button variant="secondary" onClick={signOut} className="mt-4 w-full">
          Sign out
        </Button>
      </div>
    </div>
  )
}
