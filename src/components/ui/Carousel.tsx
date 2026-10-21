import {
  Children,
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from 'react'
import { cn } from '../../lib/cn'

interface CarouselProps {
  /** Section label shown above the slides; also names the carousel for screen readers. */
  label: string
  /** Optional element next to the arrows, e.g. a "Shop all" link. */
  action?: ReactNode
  /** Width of one slide. Default: 2 per view on mobile, 3 from md up (uses --carousel-gap). */
  slideClassName?: string
  children: ReactNode
}

const arrowClass =
  'flex size-9 cursor-pointer items-center justify-center rounded-full border border-ink transition-colors duration-150 hover:bg-ink hover:text-paper disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-ink'

/** Generic horizontal carousel: CSS scroll-snap plus previous/next buttons. No library. */
export default function Carousel({
  label,
  action,
  slideClassName = 'basis-[46%] md:basis-[calc((100%-2*var(--carousel-gap))/3)]',
  children,
}: CarouselProps) {
  const trackRef = useRef<HTMLUListElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)

  const updateButtons = useCallback(() => {
    const track = trackRef.current
    if (!track) return
    setCanPrev(track.scrollLeft > 1)
    setCanNext(track.scrollLeft + track.clientWidth < track.scrollWidth - 1)
  }, [])

  useEffect(() => {
    const track = trackRef.current
    if (!track) return undefined
    updateButtons()
    const observer = new ResizeObserver(updateButtons)
    observer.observe(track)
    return () => observer.disconnect()
  }, [updateButtons, children])

  const scrollByPage = (direction: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollBy({ left: direction * track.clientWidth, behavior: reduced ? 'auto' : 'smooth' })
  }

  return (
    <section
      aria-roledescription="carousel"
      aria-label={label}
      className="mx-auto flex w-full max-w-[1215px] flex-col gap-6 px-(--gutter)"
    >
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-[clamp(1.5rem,3vw,2.25rem)]">{label}</h2>
        <div className="flex items-center gap-4">
          {action}
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollByPage(-1)}
              disabled={!canPrev}
              aria-label="Previous"
              className={arrowClass}
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M12 4l-6 6 6 6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollByPage(1)}
              disabled={!canNext}
              aria-label="Next"
              className={arrowClass}
            >
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M8 4l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* narrow gap between slides; the slide width is derived from the same variable */}
      <ul
        ref={trackRef}
        onScroll={updateButtons}
        style={{ '--carousel-gap': '2.25rem' } as CSSProperties}
        className="flex snap-x snap-mandatory gap-(--carousel-gap) overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {Children.map(children, (child) => (
          <li className={cn('shrink-0 snap-start', slideClassName)}>{child}</li>
        ))}
      </ul>
    </section>
  )
}
