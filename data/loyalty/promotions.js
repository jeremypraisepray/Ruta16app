import { SPECIALS } from '@/data/site';

/**
 * Promotions shown on Home (one at a time — the strongest one wins).
 *
 * POINT_PROMOTIONS is where Ruta 16 would schedule loyalty offers such as
 * "2X PUNTOS HOY". It ships EMPTY on purpose: the app must never advertise a
 * points offer the restaurant is not actually running. Example entry:
 *
 *   {
 *     id: 'doble-martes',
 *     kind: 'multiplier',
 *     title: '2X PUNTOS HOY',
 *     text: 'Todo lo que pidas hoy cuenta doble.',
 *     variant: 'red',
 *     days: [2],
 *     startsAt: '2026-11-01',
 *     endsAt: '2026-11-30',
 *   }
 *
 * @type {import('@/lib/loyalty/types').Promotion[]}
 */
export const POINT_PROMOTIONS = [];

/**
 * The weekly specials the restaurant already runs (from data/site.js), as
 * promotions. These are real, so they can show without any extra approval.
 * @type {import('@/lib/loyalty/types').Promotion[]}
 */
export const WEEKLY_SPECIALS = [
  { ...pick(0), id: 'martes-tacos', days: [2] },
  { ...pick(1), id: 'miercoles-jaleday', days: [3] },
];

function pick(i) {
  const s = SPECIALS[i];
  // the app keeps solid red for ordering; specials get a dark card with the site's accent
  return { kind: 'special', title: s.title, text: s.text, image: s.art.src, variant: 'dark', accent: s.variant };
}
