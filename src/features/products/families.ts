import type { ScentFamily } from './types';

export interface FamilyInfo {
  id: ScentFamily;
  title: string;
  blurb: string;
  notes: string[];
  image: string; // relative to public/
}

export const FAMILIES: FamilyInfo[] = [
  {
    id: 'fresh',
    title: 'Fresh',
    blurb: 'Clean, bright and a little restless. Citrus peel, green leaves and tea for people who open the window first.',
    notes: ['Bergamot', 'Black tea', 'Green fig', 'Basil', 'Mint', 'Neroli'],
    image: 'images/families/fresh.avif',
  },
  {
    id: 'floral',
    title: 'Floral',
    blurb: 'Petals, but not the polite kind. Iris, tuberose and peach with a dry, powdery edge.',
    notes: ['Iris', 'Tuberose', 'White peach', 'Violet', 'Dry rose', 'Gardenia'],
    image: 'images/families/floral.avif',
  },
  {
    id: 'woody',
    title: 'Woody',
    blurb: 'Warm, dry and a bit bookish. Cedar, leather and sawdust, like a workshop at closing time.',
    notes: ['Cedarwood', 'Pine', 'Leather', 'Sandalwood', 'Vetiver', 'Old books'],
    image: 'images/families/woody.avif',
  },
  {
    id: 'amber',
    title: 'Amber',
    blurb: 'Slow, smoky and sweet. Vanilla, clove and honey that stay after you leave the room.',
    notes: ['Smoked vanilla', 'Clove', 'Honey', 'Saffron', 'Tonka', 'Dark rum'],
    image: 'images/families/amber.avif',
  },
];
