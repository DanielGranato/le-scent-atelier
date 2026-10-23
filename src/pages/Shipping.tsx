import ButtonLink from '../components/ui/ButtonLink'
import ShippingNotes from '../features/shipping/components/ShippingNotes'
import ShippingOptions from '../features/shipping/components/ShippingOptions'
import { HELP, INTRO, SHIPPING_META } from '../features/shipping/content'
import { useDocumentMeta } from '../hooks/useDocumentMeta'

export default function Shipping() {
  useDocumentMeta(SHIPPING_META)

  return (
    <main className="flex flex-1 flex-col">
      <header className="mx-auto flex w-full max-w-[1440px] flex-col gap-5 px-(--gutter) py-(--section-y)">
        <h1>{INTRO.title}</h1>
        <p className="max-w-[60ch] text-lg">{INTRO.text}</p>
        <p className="max-w-[60ch] text-sm text-olive">{INTRO.note}</p>
      </header>

      <ShippingOptions />
      <ShippingNotes />

      <section className="border-t border-ink/15">
        <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-6 px-(--gutter) py-(--section-y) lg:py-[calc(var(--section-y)*1.25)]">
          <h2>{HELP.title}</h2>
          <p className="max-w-[60ch] text-lg">{HELP.text}</p>
          <ButtonLink to="/contact">{HELP.button}</ButtonLink>
        </div>
      </section>
    </main>
  )
}
