import type { ReactNode } from 'react'
import { NavLink, type NavLinkProps } from 'react-router-dom'
import { cn } from '../../lib/cn'
import HoverLine from './HoverLine'

interface NavItemProps extends Omit<NavLinkProps, 'className' | 'children'> {
  children: ReactNode
  /**
   * sm: uppercase label (default, footer and nav links).
   * lg: big headline type, same as the side menu.
   */
  size?: 'sm' | 'lg'
}

const sizeClass = {
  sm: 'text-sm font-medium uppercase tracking-label',
  lg: 'text-[clamp(1.75rem,3vw,2.5rem)] leading-none tracking-(--tracking-heading)',
}

/**
 * Link built on React Router's NavLink. On hover (or keyboard focus) a 1px ink line draws under
 * the text from left to right; when the pointer leaves, it keeps moving right and disappears.
 * See HoverLine.
 */
export default function NavItem({ children, size = 'sm', ...props }: NavItemProps) {
  return (
    <NavLink {...props} className={cn('group relative inline-flex items-center py-2 text-ink', sizeClass[size])}>
      <span>{children}</span>
      <HoverLine />
    </NavLink>
  )
}
