import type { ComponentPropsWithRef } from 'react'
import { buttonBase, buttonVariants, type ButtonVariant } from '../../lib/buttonStyles'
import { cn } from '../../lib/cn'

interface ButtonProps extends ComponentPropsWithRef<'button'> {
  variant?: ButtonVariant
}

/** A real <button> (forms, actions). For a link that looks like a button, use ButtonLink. */
export default function Button({ variant = 'primary', type = 'button', className, ...props }: ButtonProps) {
  return (
    <button
      type={type}
      {...props}
      className={cn(
        buttonBase,
        buttonVariants[variant],
        'cursor-pointer disabled:cursor-wait disabled:opacity-60 disabled:hover:bg-ink disabled:hover:text-paper',
        className,
      )}
    />
  )
}
