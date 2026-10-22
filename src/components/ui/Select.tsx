import { useId, type ComponentPropsWithRef } from 'react'

interface SelectProps extends ComponentPropsWithRef<'select'> {
  label: string
}

/** Native <select> with the same square look as Input. 16px text, so iOS does not zoom in. */
export default function Select({ label, children, className, ...props }: SelectProps) {
  const id = useId()

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-xs font-medium uppercase tracking-(--tracking-label)">
        {label}
      </label>
      <select
        id={id}
        className={`w-full cursor-pointer border border-ink bg-transparent px-4 py-[0.65rem] text-base text-ink ${className ?? ''}`.trim()}
        {...props}
      >
        {children}
      </select>
    </div>
  )
}
