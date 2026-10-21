import { useId, type ComponentPropsWithRef } from 'react'
import { cn } from '../../lib/cn'

interface InputProps extends ComponentPropsWithRef<'input'> {
  label: string
  error?: string
  /** Renders a <textarea> instead of an <input>. */
  multiline?: boolean
  rows?: number
  /** Keeps the label for screen readers only (for compact fields like the newsletter). */
  hideLabel?: boolean
}

const fieldClass =
  'w-full border border-ink bg-transparent px-4 py-[0.65rem] text-base text-ink placeholder:text-olive'

export default function Input({
  label,
  error,
  multiline,
  rows = 5,
  hideLabel,
  className,
  ...props
}: InputProps) {
  const id = useId()
  const errorId = `${id}-error`
  const shared = {
    id,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
    className: cn(fieldClass, className),
  }

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className={cn('text-xs font-medium uppercase tracking-(--tracking-label)', hideLabel && 'sr-only')}
      >
        {label}
      </label>
      {multiline ? (
        <textarea rows={rows} {...shared} {...(props as ComponentPropsWithRef<'textarea'>)} />
      ) : (
        <input {...shared} {...props} />
      )}
      {error ? (
        <p id={errorId} className="text-sm">
          {error}
        </p>
      ) : null}
    </div>
  )
}
