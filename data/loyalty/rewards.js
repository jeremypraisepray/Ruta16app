/**
 * Reward catalog. SAMPLE values for the demo — titles, costs and terms are
 * placeholders until Ruta 16 approves the real ladder. Order does not matter;
 * the app sorts by cost.
 *
 * Tiers drive how much visual weight a reward gets:
 *   quick         reachable in a visit or two — proves points are worth it
 *   mid           a real plate, the reason to come back
 *   aspirational  worth saving for; gets the full-bleed photo treatment
 *
 * Images reuse the site's own cut-outs and photos.
 * @type {import('@/lib/loyalty/types').Reward[]}
 */
export const REWARDS = [
  {
    id: 'bebida',
    title: 'BEBIDA DE LA CASA',
    short: 'BEBIDA',
    kicker: 'BEBIDA',
    description: 'Daiquiri sin alcohol, piña colada virgen o agua fresca grande.',
    cost: 100,
    tier: 'quick',
    image: '/images/drinks/margarita-fresa.webp',
    terms: 'Bebidas sin alcohol. No incluye refills.',
    available: true,
    validDays: 30,
  },
  {
    id: 'ostiones',
    title: 'OSTIONES EN CONCHA',
    short: 'OSTIONES',
    kicker: 'APPETIZER',
    description: 'Media docena fresca sobre hielo, con salsa de la casa.',
    cost: 200,
    tier: 'quick',
    image: '/images/dishes/ostiones.webp',
    terms: 'Orden de 6 piezas. Sujeto a disponibilidad.',
    available: true,
    validDays: 30,
  },
  {
    id: 'credito',
    title: '$10 CRÉDITO RUTA',
    short: '$10 CRÉDITO',
    kicker: 'CRÉDITO',
    description: 'Diez dólares menos en tu cuenta. Úsalo en lo que se te antoje.',
    cost: 350,
    tier: 'mid',
    sign: '$10', // no dish photo — printed on the Ruta 16 shield instead
    terms: 'Mínimo de compra $25. No aplica a propina ni a alcohol.',
    available: true,
    validDays: 30,
  },
  {
    id: 'torre',
    title: 'TORRE 16',
    short: 'TORRE 16',
    kicker: 'PLATO FIRMA',
    description: 'Ceviche mixto, callo, camarón cocido y 6 aguachiles bañados en salsa culichi.',
    cost: 500,
    tier: 'mid',
    image: '/images/dishes/torre-16.webp',
    terms: 'Chiltepín extra +$2.',
    available: true,
    validDays: 30,
  },
  {
    id: 'parrillada-marina',
    title: 'PARRILLADA MARINA',
    short: 'P. MARINA',
    kicker: 'PA’ LA MESA GRANDE',
    description: 'Bagre con mariscos, callo, pulpo, camarón, calamar y almejas encima — pa’ 2 a 4 compas.',
    cost: 750,
    tier: 'aspirational',
    photo: '/media/parrillada-marina-barco.webp',
    terms: 'Versión con bagre. Solo para comer en el restaurante.',
    available: true,
    validDays: 45,
  },
  {
    id: 'gran-culichi',
    title: 'GRAN CULICHI',
    short: 'GRAN CULICHI',
    kicker: 'ÚLTIMA PARADA',
    description: 'La charola completa pa’ 4–6 compas: ostiones, almejas, aguachiles, callos y balazos.',
    cost: 1000,
    tier: 'aspirational',
    image: '/images/dishes/gran-culichi.webp',
    terms: 'Solo para comer en el restaurante. Avísale a tu mesero al llegar.',
    available: true,
    validDays: 45,
  },
];
