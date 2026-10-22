/**
 * The 1px line (the text color) that draws under a link on hover. Put it inside an element with the classes
 * `group relative` (it sizes itself to that element).
 *
 * Hover in: the line grows from the left to the right. Hover out: it keeps going to the right and
 * disappears. That works by flipping the transform origin: right at rest (so the line leaves
 * through the right side), left while hovered (so it starts from the left). Only `scale` is
 * transitioned, so the origin flips instantly.
 *
 * Keyboard focus draws the line too. With reduced motion the line appears without movement.
 */
export default function HoverLine() {
  return (
    <span
      aria-hidden="true"
      className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-current transition-[scale] duration-500 ease-out group-hover:origin-left group-hover:scale-x-100 group-focus-visible:origin-left group-focus-visible:scale-x-100 motion-reduce:transition-none"
    />
  )
}
