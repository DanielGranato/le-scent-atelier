import type { ReactNode } from 'react'

interface DisclosureProps {
  title: string
  /** Open when the page loads. */
  defaultOpen?: boolean
  children: ReactNode
}

/** An accordion row made with the native <details>: keyboard and screen reader support come for free. */
export default function Disclosure({ title, defaultOpen = false, children }: DisclosureProps) {
  return (
    <details open={defaultOpen} className="group border-t border-ink">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-xs font-semibold uppercase tracking-label [&::-webkit-details-marker]:hidden">
        {title}
        <span aria-hidden="true" className="text-xl leading-none transition-transform duration-150 group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="pb-5 text-base">{children}</div>
    </details>
  )
}
