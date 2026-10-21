/**
 * Per-photo fit so every bottle shows at the same size and height in a card.
 * The photos are all 600x600 but the bottle is framed a little differently in each one.
 * Measured from the bottle bounding box of each image. scale brings every bottle to the same
 * height (always >= 1, so the photo keeps covering the card); y (in % of the tile height)
 * centers it vertically, limited so the photo edge never shows.
 */
export interface ImageFit {
  scale: number
  y: number
}

export const imageFit: Record<string, ImageFit> = {
  'small-hours': { scale: 1.034, y: 0.00 },
  'sunday-market': { scale: 1.118, y: -3.35 },
  'rooftop-rain': { scale: 1.074, y: -3.04 },
  'linen-morning': { scale: 1.070, y: -2.68 },
  'closed-garden': { scale: 1.100, y: -2.75 },
  'night-florist': { scale: 1.093, y: -1.82 },
  'pressed-petals': { scale: 1.062, y: -1.77 },
  'violet-hour': { scale: 1.056, y: -1.76 },
  'the-library': { scale: 1.087, y: -1.81 },
  'cabin-fever': { scale: 1.109, y: -2.03 },
  'studio-floor': { scale: 1.074, y: -2.15 },
  'embers': { scale: 1.068, y: -1.60 },
  'golden-hour': { scale: 1.098, y: -1.83 },
  'velvet-bar': { scale: 1.109, y: -1.85 },
  'spice-route': { scale: 1.070, y: -1.61 },
}

export const defaultImageFit: ImageFit = { scale: 1, y: 0 }
