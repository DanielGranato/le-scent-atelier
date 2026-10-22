import type { Product, ScentFamily } from './types'

export interface FamilyNotes {
  top: string[]
  heart: string[]
  base: string[]
}

/** Top, heart and base notes of one family: the notes of all its perfumes, each listed once. */
export function getFamilyNotes(products: Product[], family: ScentFamily): FamilyNotes {
  const unique = (lists: string[][]): string[] => [...new Set(lists.flat())]
  const inFamily = products.filter((product) => product.family === family)

  return {
    top: unique(inFamily.map((product) => product.notes.top)),
    heart: unique(inFamily.map((product) => product.notes.heart)),
    base: unique(inFamily.map((product) => product.notes.base)),
  }
}
