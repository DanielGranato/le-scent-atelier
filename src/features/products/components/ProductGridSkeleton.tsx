import { gridClass } from './ProductGrid'

// as many as the whole catalog, so the page keeps its height when the real cards arrive
const SKELETON_COUNT = 15

/**
 * Empty cards shown while the products load: the same grid, the same 4/5 picture box and the same
 * text lines as ProductCard (hidden text keeps the line heights), so nothing below moves when the cards appear.
 */
export default function ProductGridSkeleton() {
  return (
    <ul aria-hidden="true" className={gridClass}>
      {Array.from({ length: SKELETON_COUNT }, (_, index) => (
        <li key={index}>
          <div className="aspect-[4/5] bg-ink/5" />
          <div className="invisible flex flex-col items-center gap-1.5 px-2 py-4 text-center">
            <p className="text-xs font-medium">Eau de parfum</p>
            <p className="text-base font-semibold leading-tight">Perfume</p>
            <p className="text-sm">Descriptor</p>
            <p className="mt-1 text-sm font-medium">From $0</p>
            <p className="text-xs">10 · 50 · 100 mL</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
