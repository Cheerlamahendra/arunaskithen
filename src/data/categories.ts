export const categories = [
  'All',
  'Snacks',
  'Sweets',
  'Karjikay',
  'Karam & Spices',
  'Pickles',
  'Farm Products',
] as const;

export type CategoryFilter = (typeof categories)[number];
