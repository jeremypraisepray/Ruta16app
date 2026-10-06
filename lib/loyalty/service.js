import { REWARDS } from '@/data/loyalty/rewards';
import { POINT_PROMOTIONS, WEEKLY_SPECIALS } from '@/data/loyalty/promotions';
import { DEFAULT_DEMO_PROFILE, DEMO_PROFILES } from '@/data/loyalty/demo';

/**
 * The loyalty service — the ONLY module that knows where loyalty data lives.
 *
 * Screens talk to it through four async calls:
 *
 *   getAccount()        → { member, transactions, redemptions }
 *   getRewards()        → Reward[]
 *   getPromotions(date) → Promotion[]   (best first)
 *   redeem(rewardId)    → { redemption, transaction }
 *
 * Today it is backed by `demoService`: fictional members, with claims kept in
 * this browser's localStorage so the flow can be tried end to end. To go live,
 * implement the same four calls against the points/redemption API (POS, Toast
 * loyalty, etc.) and swap the export at the bottom of this file. No component
 * needs to change.
 */

const STORE_KEY = 'r16-mi-ruta-demo-v1';
const DAY = 86400000;
const CODE_CHARS = 'ACDEFGHJKMNPQRTUVWXY34679'; // no 0/O, 1/I/L, 5/S, 8/B, 2/Z

function readStore() {
  try {
    const raw = window.localStorage.getItem(STORE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* private mode or blocked storage — fall through to a fresh demo */
  }
  return { profile: DEFAULT_DEMO_PROFILE, transactions: [], redemptions: [] };
}

function writeStore(store) {
  try {
    window.localStorage.setItem(STORE_KEY, JSON.stringify(store));
  } catch {
    /* the demo still works for this session, it just won't persist */
  }
}

const daysAgo = (n) => new Date(Date.now() - n * DAY).toISOString();

function code() {
  const bytes = new Uint8Array(4);
  crypto.getRandomValues(bytes);
  return `R16-${[...bytes].map((b) => CODE_CHARS[b % CODE_CHARS.length]).join('')}`;
}

function buildAccount(store) {
  const profile = DEMO_PROFILES[store.profile] || DEMO_PROFILES[DEFAULT_DEMO_PROFILE];
  const seeded = profile.transactions.map(({ daysAgo: d, ...t }) => ({
    ...t,
    // spread today's visit over the morning so "Hoy" sorts sensibly
    date: d === 0 ? new Date(Date.now() - 2 * 3600000).toISOString() : daysAgo(d),
  }));
  const transactions = [...store.transactions, ...seeded].sort((a, b) => (a.date < b.date ? 1 : -1));
  const points = transactions.reduce((n, t) => n + t.points, 0);
  const lifetimePoints = transactions.filter((t) => t.points > 0).reduce((n, t) => n + t.points, 0);
  const { memberSinceDaysAgo, ...m } = profile.member;
  const now = Date.now();
  const redemptions = store.redemptions.map((r) =>
    r.status === 'active' && new Date(r.expiresAt).getTime() < now ? { ...r, status: 'expired' } : r
  );
  return {
    member: { ...m, memberSince: daysAgo(memberSinceDaysAgo), points, lifetimePoints },
    transactions,
    redemptions,
  };
}

export const demoService = {
  isDemo: true,

  async getAccount() {
    return buildAccount(readStore());
  },

  async getRewards() {
    return REWARDS;
  },

  async getPromotions(date = new Date()) {
    const day = date.getDay();
    const live = (p) =>
      (!p.days || p.days.includes(day)) &&
      (!p.startsAt || new Date(p.startsAt) <= date) &&
      (!p.endsAt || new Date(p.endsAt) >= date);
    // points offers outrank the standing weekly specials
    return [...POINT_PROMOTIONS.filter(live), ...WEEKLY_SPECIALS.filter(live)];
  },

  async redeem(rewardId) {
    const store = readStore();
    const reward = REWARDS.find((r) => r.id === rewardId && r.available);
    if (!reward) throw new Error('Esta recompensa ya no está disponible.');
    const { member } = buildAccount(store);
    if (member.points < reward.cost) throw new Error('Todavía no tienes puntos suficientes.');

    const now = new Date();
    const redemption = {
      id: `rd-${now.getTime()}`,
      rewardId,
      code: code(),
      claimedAt: now.toISOString(),
      expiresAt: new Date(now.getTime() + (reward.validDays || 30) * DAY).toISOString(),
      status: 'active',
    };
    const transaction = {
      id: `tx-${now.getTime()}`,
      kind: 'redeem',
      points: -reward.cost,
      date: now.toISOString(),
      label: `Canjeaste: ${titleCase(reward.title)}`,
    };
    writeStore({
      ...store,
      transactions: [transaction, ...store.transactions],
      redemptions: [redemption, ...store.redemptions],
    });
    return { redemption, transaction };
  },

  /* demo-only controls, used by the profile sheet */
  profiles: Object.keys(DEMO_PROFILES),
  currentProfile: () => readStore().profile,
  setProfile(profile) {
    writeStore({ profile, transactions: [], redemptions: [] });
  },
  reset() {
    writeStore({ profile: readStore().profile, transactions: [], redemptions: [] });
  },
};

function titleCase(s) {
  return s
    .toLowerCase()
    .replace(/(^|\s)(\S)/g, (_, a, b) => a + b.toUpperCase())
    .replace(/ Y /g, ' y ');
}

export const loyaltyService = demoService;
