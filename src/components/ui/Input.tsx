import { useId, type ComponentPropsWithRef, type ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface InputProps extends ComponentPropsWithRef<'input'> {
  label: string
  error?: string
  /** Renders a <textarea> instead of an <input>. */
  multiline?: boolean
  rows?: number
  /** Keeps the label for screen readers only (for compact fields like the newsletter). */
  hideLabel?: boolean
  /** Something shown inside the field, on the right (e.g. the Show / Hide button of a password). */
  adornment?: ReactNode
}

const fieldClass =
  'w-full border border-ink bg-transparent py-[0.65rem] pl-4 text-base text-ink placeholder:text-olive'

/** Field with a label above and a short error below. Works with React Hook Form's register() (the ref is a prop in React 19). */
export default function Input({
  label,
  error,
  multiline,
  rows = 5,
  hideLabel,
  adornment,
  className,
  ...props
}: InputProps) {
  const id = useId()
  const errorId = `${id}-error`
  const shared = {
    id,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
    className: cn(fieldClass, adornment ? 'pr-20' : 'pr-4', className),
  }

  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor={id}
        className={cn('text-xs font-medium uppercase tracking-(--tracking-label)', hideLabel && 'sr-only')}
      >
        {label}
      </label>
      <div className="relative">
        {multiline ? (
          <textarea rows={rows} {...shared} {...(props as ComponentPropsWithRef<'textarea'>)} />
        ) : (
          <input {...shared} {...props} />
        )}
        {adornment ? <div className="absolute inset-y-0 right-0 flex items-center pr-3">{adornment}</div> : null}
      </div>
      {error ? (
        <p id={errorId} className="text-sm">
          {error}
        </p>
      ) : null}
    </div>
  )
}
