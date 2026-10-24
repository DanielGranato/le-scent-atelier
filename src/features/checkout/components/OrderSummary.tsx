import { formatPrice } from '../../../lib/formatPrice'
import { cn } from '../../../lib/cn'
import { useCart } from '../../cart/useCart'
import { useOrderTotals } from '../hooks/useOrderTotals'
import OrderLines from './OrderLines'
import OrderTotals from './OrderTotals'

interface OrderSummaryProps {
  /** Folds into a "Show order summary" row (for phones). Without it the summary is always open. */
  collapsible?: boolean
  className?: string
}

/** What is being bought: the lines of the cart, shipping and the total. */
export default function OrderSummary({ collapsible, className }: OrderSummaryProps) {
  const { lines } = useCart()
  const totals = useOrderTotals()

  const body = (
    <div className="flex flex-col gap-6">
      <OrderLines lines={lines} />
      <OrderTotals {...totals} />
    </div>
  )

  if (collapsible) {
    return (
      <details className={cn('group border border-ink/15 bg-(--surface)', className)}>
        <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 px-4 py-2 text-xs font-medium uppercase tracking-(--tracking-label) [&::-webkit-details-marker]:hidden">
          <span>
            <span className="group-open:hidden">Show order summary</span>
            <span className="hidden group-open:inline">Hide order summary</span>
          </span>
          <span className="text-base normal-case tracking-normal text-(color:--gold)">{formatPrice(totals.total)}</span>
        </summary>
        <div className="border-t border-ink/15 p-4">{body}</div>
      </details>
    )
  }

  return (
    <aside aria-label="Order summary" className={cn('border border-ink/15 bg-(--surface) p-6', className)}>
      <h2 className="mb-6 text-xs font-medium uppercase tracking-(--tracking-label) text-olive">Order summary</h2>
      {body}
    </aside>
  )
}
