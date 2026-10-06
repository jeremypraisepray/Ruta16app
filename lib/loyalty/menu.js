import menu from '@/data/menu.json';
import { MENU_ART } from '@/data/menuArt';
import { ITEM_MEDIA, TOP_PICKS } from '@/data/loyalty/menuMedia';
import { displayPrice, paradaStats } from '@/data/menuLookup';

/**
 * The menu reshaped for the app: every item gets a stable id, its parada and
 * group, its photo/badges (if any) and a short display price. Built once at
 * module load from the same data/menu.json the website renders.
 */

const strip = (s) =>
  s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');

export const PARADAS = menu.map((p) => ({
  num: p.num,
  name: p.name,
  tag: p.tag,
  desc: p.desc,
  accent: p.accent,
  img: MENU_ART[p.num].img,
  ...paradaStats(p.num),
  groups: p.groups.map((g) => ({
    title: g.title,
    note: g.note,
    items: g.items.map((it) => {
      const key = `${p.num}:${it.name}`;
      const media = ITEM_MEDIA[key] || {};
      return {
        id: key,
        name: it.name,
        price: it.price,
        shortPrice: displayPrice(it.price),
        desc: it.desc,
        group: g.title,
        groupNote: g.note,
        parada: p.num,
        paradaName: p.name,
        accent: p.accent,
        img: media.img || null,
        badges: media.badges || [],
        search: strip(`${it.name} ${it.desc} ${g.title} ${p.name}`),
      };
    }),
  })),
}));

export const ALL_ITEMS = PARADAS.flatMap((p) => p.groups.flatMap((g) => g.items));

const byId = Object.fromEntries(ALL_ITEMS.map((i) => [i.id, i]));
export const TOP_ITEMS = TOP_PICKS.map((id) => byId[id]).filter(Boolean);

export function searchMenu(query) {
  const words = strip(query).split(/\s+/).filter(Boolean);
  if (!words.length) return [];
  return ALL_ITEMS.filter((i) => words.every((w) => i.search.includes(w)));
}

/** "6 pc $13 · 12 pc $21" → ["6 pc $13", "12 pc $21"] for the detail sheet. */
export const priceOptions = (price) => price.split('·').map((s) => s.trim()).filter(Boolean);
