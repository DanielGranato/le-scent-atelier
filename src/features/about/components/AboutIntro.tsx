import { HERO_IMAGES, INTRO } from '../content'

/** Full-screen hero: two photos side by side, the title and the intro at the bottom left. */
export default function AboutIntro() {
  return (
    <header className="relative flex min-h-svh flex-col justify-end overflow-hidden bg-ink text-paper">
      <div className="absolute inset-0 grid grid-cols-2">
        {HERO_IMAGES.map((image) => (
          <img
            key={image.src}
            src={`${import.meta.env.BASE_URL}${image.src}`}
            alt={image.alt}
            fetchPriority="high"
            className="size-full object-cover"
          />
        ))}
      </div>

      {/* flat dark layer so the light text stays readable over the photos */}
      <div aria-hidden="true" className="absolute inset-0 bg-ink/40" />

      <div className="relative mx-auto w-full max-w-[1440px] px-(--gutter) pb-[calc(var(--section-y)*1.5)]">
        <div className="flex flex-col gap-6 md:w-1/2 md:pr-10">
          <h1 className="text-[clamp(2.75rem,7vw,6.25rem)] leading-[0.95] tracking-(--tracking-display)">
            {INTRO.title}
          </h1>
          <p className="max-w-[44ch] text-lg">{INTRO.text}</p>
        </div>
      </div>
    </header>
  )
}
