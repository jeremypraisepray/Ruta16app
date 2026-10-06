import { LEVELS } from '@/data/loyalty/program';

/**
 * Pure loyalty math — no React, no storage — so the same rules apply on every
 * screen and are trivial to unit test or move server-side later.
 */

/** Available rewards, cheapest first, each tagged with its status for this balance. */
export function ladder(rewards, points, now = new Date()) {
  const live = rewards
    .filter((r) => r.available && (!r.expiresAt || new Date(r.expiresAt) > now))
    .sort((a, b) => a.cost - b.cost);
  let nextSeen = false;
  return live.map((r) => {
    const toGo = Math.max(0, r.cost - points);
    let status = 'claimable';
    if (toGo > 0) {
      status = nextSeen ? 'upcoming' : 'next';
      nextSeen = true;
    }
    return { ...r, status, toGo, pct: Math.min(1, points / r.cost) };
  });
}

/**
 * Where the member is on the road: the last stop passed, the next one ahead,
 * and how far between them (0–1).
 */
export function position(steps, points) {
  const next = steps.find((s) => s.status === 'next') || null;
  const passed = steps.filter((s) => s.status === 'claimable');
  const prevCost = passed.length ? passed[passed.length - 1].cost : 0;
  const span = next ? next.cost - prevCost : 1;
  const segment = next ? Math.min(1, Math.max(0, (points - prevCost) / span)) : 1;
  return { next, claimable: passed, prevCost, segment, toGo: next ? next.toGo : 0 };
}

export function levelFor(lifetimePoints) {
  let level = LEVELS[0];
  for (const l of LEVELS) if (lifetimePoints >= l.minLifetime) level = l;
  return level;
}

/** Average points per earning visit — used for "una visita más" nudges. */
export function averageEarn(transactions) {
  const earns = transactions.filter((t) => t.kind === 'earn');
  if (!earns.length) return 0;
  return Math.round(earns.reduce((n, t) => n + t.points, 0) / earns.length);
}

/**
 * The motivating line under a progress bar. Leads with distance remaining —
 * "80 pts to go" pulls harder than "420 / 500".
 */
export function nudge(toGo, avgEarn) {
  if (toGo <= 0) return 'Ya es tuya. Canjéala cuando quieras.';
  if (!avgEarn) return 'Tu primera visita te pone en camino.';
  if (avgEarn && toGo <= avgEarn) return 'Una visita más y llegas.';
  if (toGo <= 100) return 'Ya merito — estás muy cerca.';
  if (avgEarn && toGo <= avgEarn * 2) return 'Un par de visitas y es tuya.';
  return 'Cada visita te acerca.';
}
