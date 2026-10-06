/**
 * Loyalty program rules — the one place Ruta 16 edits to change how the program
 * is explained. Everything here is SAMPLE configuration for the demo; none of it
 * is an approved business offer until the restaurant signs off.
 */

export const PROGRAM = {
  name: 'Mi Ruta',
  /**
   * Points earned per dollar. Only used to explain the program — the app never
   * promises a specific number of points for a dish, because the real figure
   * comes from the POS after tax, discounts and tip.
   */
  pointsPerDollar: 1,
  /** Whether online (Toast) orders earn points. Drives the "order & earn" copy. */
  onlineOrdersEarn: true,
  howToEarn: [
    { title: 'COME', text: 'Cada compra en Ruta 16 suma puntos a tu cuenta.' },
    { title: 'GANA', text: 'Tus puntos te mueven por la ruta, parada por parada.' },
    { title: 'REGRESA', text: 'Canjea tus recompensas en tu próxima visita.' },
  ],
  fineprint: [
    'Los puntos no tienen valor en efectivo y no son transferibles.',
    'Una recompensa por cuenta, por visita.',
    'Ruta 16 puede cambiar las recompensas y sus puntos en cualquier momento.',
  ],
};

/**
 * Member levels by lifetime points — a status label only, no extra benefits
 * are implied anywhere in the UI.
 * @type {import('@/lib/loyalty/types').Level[]}
 */
export const LEVELS = [
  { id: 'copiloto', name: 'COPILOTO', minLifetime: 0 },
  { id: 'piloto', name: 'PILOTO', minLifetime: 500 },
  { id: 'leyenda', name: 'LEYENDA DE LA RUTA', minLifetime: 1500 },
];
