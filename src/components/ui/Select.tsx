import { useId, type ComponentPropsWithRef } from 'react'
import { cn } from '../../lib/cn'

interface SelectProps extends ComponentPropsWithRef<'select'> {
  label: string
  error?: string
}

/** Native <select> with the same square look as Input. 16px text, so iOS does not zoom in. */
export default function Select({ label, error, children, className, ...props }: SelectProps) {
  const id = useId()
  const errorId = `${id}-error`

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xs font-medium uppercase tracking-(--tracking-label)">
        {label}
      </label>
      <select
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn('w-full cursor-pointer border border-ink bg-transparent px-4 py-[0.65rem] text-base text-ink', className)}
        {...props}
      >
        {children}
      </select>
      {error ? (
        <p id={errorId} className="text-sm">
          {error}
        </p>
      ) : null}
    </div>
  )
}
