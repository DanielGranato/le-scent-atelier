const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
})

/** 48 -> "$48" */
export function formatPrice(amount: number): string {
  return usd.format(amount)
}
