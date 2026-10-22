import { getStartingPrice, type Product } from './types';

export type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'name';

export const DEFAULT_SORT: SortKey = 'featured';

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
  { value: 'name', label: 'Name: A to Z' },
];

export const isSortKey = (value: string | null): value is SortKey =>
  SORT_OPTIONS.some((option) => option.value === value);

// Bestsellers first, then new arrivals, then the rest (same idea as the Home carousel).
const featuredRank = (product: Product): number => (product.isBestseller ? 0 : product.isNew ? 1 : 2);

export function sortProducts(products: Product[], sort: SortKey): Product[] {
  const list = [...products]; // Array.sort is stable, so ties keep the catalog order
  switch (sort) {
    case 'price-asc':
      return list.sort((a, b) => getStartingPrice(a) - getStartingPrice(b));
    case 'price-desc':
      return list.sort((a, b) => getStartingPrice(b) - getStartingPrice(a));
    case 'name':
      return list.sort((a, b) => a.name.localeCompare(b.name));
    default:
      return list.sort((a, b) => featuredRank(a) - featuredRank(b));
  }
}
