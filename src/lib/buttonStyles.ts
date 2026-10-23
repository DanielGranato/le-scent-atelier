// Button look from DESIGN.md: square, uppercase, 150 ms transition. Shared by Button and ButtonLink.

export const buttonBase =
  'inline-flex items-center justify-center border border-ink px-5 py-2.5 text-center text-base uppercase tracking-label transition-colors duration-150 ease-out'

export const buttonVariants = {
  // ink background; on hover it inverts (paper background, ink text)
  primary: 'bg-ink text-paper hover:bg-paper hover:text-ink',
  // transparent with a 1px ink border; on hover it fills with ink
  secondary: 'bg-transparent text-ink hover:bg-ink hover:text-paper',
}

export type ButtonVariant = keyof typeof buttonVariants
