export type ScentFamily = 'fresh' | 'floral' | 'woody' | 'amber';

export type SizeMl = 10 | 50 | 100;

export interface ProductSize {
  ml: SizeMl;
  price: number; // USD
  inStock: boolean;
}

export interface ScentNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  descriptor: string; // short card line, e.g. "Bergamot & black tea"
  family: ScentFamily;
  story: string; // the "moment" behind the scent
  notes: ScentNotes;
  sizes: ProductSize[];
  image: string; // path relative to /public
  isNew: boolean;
  isBestseller: boolean;
}

// Helper: lowest price, for cards like "From $48"
export const getStartingPrice = (product: Product): number =>
  Math.min(...product.sizes.map((size) => size.price));
