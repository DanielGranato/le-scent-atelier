import { Link, type LinkProps } from 'react-router-dom'
import { buttonBase, buttonVariants, type ButtonVariant } from '../../lib/buttonStyles'
import { cn } from '../../lib/cn'

interface ButtonLinkProps extends LinkProps {
  variant?: ButtonVariant
}

/** A link that looks like a button (DESIGN.md buttons: square, uppercase, 150 ms transition). */
export default function ButtonLink({ variant = 'primary', className, ...props }: ButtonLinkProps) {
  return <Link {...props} className={cn(buttonBase, buttonVariants[variant], className)} />
}
