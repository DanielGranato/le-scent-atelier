import ButtonLink from '../../../components/ui/ButtonLink'
import { STORY } from '../content'

/** An invitation to read the About page. */
export default function StoryInvite() {
  return (
    <section className="border-t border-ink/15">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-start gap-6 px-(--gutter) py-(--section-y) lg:py-[calc(var(--section-y)*1.25)]">
        <h2>{STORY.title}</h2>
        <p className="max-w-[60ch] text-lg">{STORY.text}</p>
        <ButtonLink to="/about">{STORY.button}</ButtonLink>
      </div>
    </section>
  )
}
