import menu from './menu.json';

/**
 * Price helpers over data/menu.json, so every price shown outside the menu
 * listings (home top sellers, feature cards, the route map) comes from the one
 * source of truth instead of being copied by hand and drifting.
 */

const fmt = (n) => (Number.isInteger(n) ? String(n) : n.toFixed(2));

/** Dollar amounts in a price string, ignoring add-ons like "+$2". */
const amounts = (price) =>
  [...price.matchAll(/(^|[^+])\$(\d+(?:\.\d+)?)/g)].map((m) => parseFloat(m[2]));

export function findItem(name, parada) {
  for (const p of menu) {
    if (parada && p.num !== parada) continue;
    for (const g of p.groups) for (const it of g.items) if (it.name === name) return it;
  }
  throw new Error(`menuLookup: no menu item named "${name}"`);
}

/** "$30" → "$30" · "$MP" → "$MP" · "6 pc $16 · 12 pc $28" → "desde $16" */
export function displayPrice(price) {
  const found = amounts(price);
  if (found.length <= 1) return price;
  return `desde $${fmt(Math.min(...found))}`;
}

export const priceOf = (name, parada) => displayPrice(findItem(name, parada).price);

/** Dish count and lowest price for one parada — used by the route map. */
export function paradaStats(num) {
  const p = menu.find((s) => s.num === num);
  let count = 0;
  const all = [];
  for (const g of p.groups) {
    for (const it of g.items) {
      count += 1;
      all.push(...amounts(it.price));
    }
  }
  return { count, from: all.length ? `$${fmt(Math.min(...all))}` : null };
}

export const totalDishes = () => menu.reduce((n, p) => n + paradaStats(p.num).count, 0);
