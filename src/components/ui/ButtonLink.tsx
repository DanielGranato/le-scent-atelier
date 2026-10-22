import { Link, type LinkProps } from 'react-router-dom'
import { cn } from '../../lib/cn'

interface ButtonLinkProps extends LinkProps {
  variant?: 'primary' | 'secondary'
}

const variants = {
  // ink background; on hover it inverts (paper background, ink text)
  primary: 'bg-ink text-paper hover:bg-paper hover:text-ink',
  // transparent with a 1px ink border; on hover it fills with ink
  secondary: 'bg-transparent text-ink hover:bg-ink hover:text-paper',
}

/** A link that looks like a button (DESIGN.md buttons: square, uppercase, 150 ms transition). */
export default function ButtonLink({ variant = 'primary', className, ...props }: ButtonLinkProps) {
  return (
    <Link
      {...props}
      className={cn(
        'inline-flex items-center justify-center border border-ink px-5 py-2.5 text-center text-base uppercase tracking-label transition-colors duration-150 ease-out',
        variants[variant],
        className,
      )}
    />
  )
}
