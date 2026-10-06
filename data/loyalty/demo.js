/**
 * DEMO ACCOUNTS — fictional members used until a real points API exists.
 * Nothing in here is a real customer or a real transaction.
 *
 * Dates are stored as "days ago" and resolved at load time, so the demo always
 * reads as recent activity.
 */

export const DEMO_PROFILES = {
  /** A regular, mid-route: 420 pts, three rewards ready, 80 pts from Torre 16. */
  regular: {
    member: {
      id: 'R16-0420-JP',
      firstName: 'Jeremy',
      lastName: 'P.',
      memberSinceDaysAgo: 82,
    },
    transactions: [
      { id: 't7', kind: 'earn', points: 46, daysAgo: 0, label: 'Visita · Ruta 16 Pasadena', channel: 'dine-in' },
      { id: 't6', kind: 'earn', points: 72, daysAgo: 8, label: 'Orden en línea', channel: 'online' },
      { id: 't5', kind: 'redeem', points: -100, daysAgo: 16, label: 'Canjeaste: Bebida de la casa' },
      { id: 't4', kind: 'earn', points: 104, daysAgo: 23, label: 'Visita · Ruta 16 Pasadena', channel: 'dine-in' },
      { id: 't3', kind: 'earn', points: 83, daysAgo: 37, label: 'Visita · Ruta 16 Pasadena', channel: 'dine-in' },
      { id: 't2', kind: 'earn', points: 63, daysAgo: 51, label: 'Orden en línea', channel: 'online' },
      { id: 't1', kind: 'earn', points: 94, daysAgo: 66, label: 'Visita · Ruta 16 Pasadena', channel: 'dine-in' },
      { id: 't0', kind: 'earn', points: 58, daysAgo: 82, label: 'Primera visita', channel: 'dine-in' },
    ],
  },
  /** Just joined: zero points, nothing yet. */
  nuevo: {
    member: {
      id: 'R16-0001-NV',
      firstName: 'Compa',
      memberSinceDaysAgo: 0,
    },
    transactions: [],
  },
};

export const DEFAULT_DEMO_PROFILE = 'regular';
