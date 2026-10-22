import type { ReactNode } from 'react'

interface AboutSectionProps {
  title: string
  children: ReactNode
}

/** One block of the About page: a thin top line, the title, then the content. Same side margins as the rest of the site. */
export default function AboutSection({ title, children }: AboutSectionProps) {
  return (
    <section className="border-t border-ink/15">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-(--gutter) py-(--section-y) lg:py-[calc(var(--section-y)*1.25)]">
        <h2>{title}</h2>
        {children}
      </div>
    </section>
  )
}
