const DAY = 86400000;

const dayMonth = new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'short' });
const monthYear = new Intl.DateTimeFormat('es-MX', { month: 'short', year: 'numeric' });
const fullDate = new Intl.DateTimeFormat('es-MX', { day: 'numeric', month: 'long' });

const clean = (s) => s.replace('.', '').toUpperCase();

export const pts = (n) => n.toLocaleString('en-US');

/** "Hoy" · "Ayer" · "28 SEP" */
export function relativeDay(iso, now = new Date()) {
  const d = new Date(iso);
  const days = Math.floor((startOfDay(now) - startOfDay(d)) / DAY);
  if (days <= 0) return 'Hoy';
  if (days === 1) return 'Ayer';
  return clean(dayMonth.format(d));
}

/** "JUL 2026" */
export const memberSince = (iso) => clean(monthYear.format(new Date(iso)));

/** "5 de noviembre" */
export const longDate = (iso) => fullDate.format(new Date(iso));

/** "OCTUBRE 2026" — activity list group headers */
export const monthHeader = (iso) =>
  new Intl.DateTimeFormat('es-MX', { month: 'long', year: 'numeric' }).format(new Date(iso)).toUpperCase();

function startOfDay(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x.getTime();
}

export const initials = (m) => `${m.firstName[0] || ''}${m.lastName?.[0] || ''}`.toUpperCase();
