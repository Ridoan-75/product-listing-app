export const CATEGORIES = [
  'electronics',
  'jewelery',
  "men's clothing",
  "women's clothing",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const PRICE_RANGE = {
  MIN: 0,
  MAX: 1000,
} as const;
