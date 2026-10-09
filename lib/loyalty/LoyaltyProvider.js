'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { loyaltyService } from './service';
import { averageEarn, ladder, levelFor, position } from './progress';

const LoyaltyContext = createContext(null);
const SEEN_KEY = 'r16-mi-ruta-seen-points';

/**
 * Loads the member's account once for the whole app and derives everything the
 * screens need (reward ladder, next stop, level). State survives tab changes
 * because the provider lives in the /app layout.
 */
export function LoyaltyProvider({ children }) {
  const [state, setState] = useState({ status: 'loading' });
  const [online, setOnline] = useState(true);
  // before any child effect runs (Home reads the "opening played" flag in its own effect)
  useState(() => typeof window !== 'undefined' && applyDemoLink());

  const load = useCallback(async () => {
    setState((s) => (s.status === 'ready' ? s : { status: 'loading' }));
    try {
      const [account, rewards, promotions] = await Promise.all([
        loyaltyService.getAccount(),
        loyaltyService.getRewards(),
        loyaltyService.getPromotions(new Date()),
      ]);
      setState({ status: 'ready', ...account, rewards, promotions });
    } catch (error) {
      setState({ status: 'error', error });
    }
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.has('demo')) {
      url.searchParams.delete('demo');
      window.history.replaceState(window.history.state, '', url.pathname + url.search + url.hash);
    }
    load();
    const sync = () => setOnline(navigator.onLine);
    sync();
    window.addEventListener('online', sync);
    window.addEventListener('offline', sync);
    return () => {
      window.removeEventListener('online', sync);
      window.removeEventListener('offline', sync);
    };
  }, [load]);

  const redeem = useCallback(
    async (rewardId) => {
      const result = await loyaltyService.redeem(rewardId);
      await load();
      return result;
    },
    [load]
  );

  const value = useMemo(() => {
    if (state.status !== 'ready') return { ...state, online, reload: load, redeem };
    const { member, transactions, rewards } = state;
    const steps = ladder(rewards, member.points);
    return {
      ...state,
      online,
      reload: load,
      redeem,
      steps,
      ...position(steps, member.points),
      level: levelFor(member.lifetimePoints),
      avgEarn: averageEarn(transactions),
      isNew: member.lifetimePoints === 0,
      activeRedemptions: state.redemptions.filter((r) => r.status === 'active'),
      isDemo: Boolean(loyaltyService.isDemo),
      service: loyaltyService,
    };
  }, [state, online, load, redeem]);

  return <LoyaltyContext.Provider value={value}>{children}</LoyaltyContext.Provider>;
}

/**
 * Shareable test links: /app/?demo=nuevo (brand-new member), ?demo=regular
 * (420 pts), ?demo=reset (regular, claims cleared). Starts the tester fresh —
 * opening included. The provider's effect then drops the parameter so a refresh
 * doesn't reset again (done after hydration, or Next's router puts it back).
 */
function applyDemoLink() {
  const url = new URL(window.location.href);
  const demo = url.searchParams.get('demo');
  if (!demo || !loyaltyService.isDemo) return;
  const profile = demo === 'reset' ? 'regular' : demo;
  if (!loyaltyService.profiles.includes(profile)) return;
  loyaltyService.setProfile(profile);
  try {
    window.localStorage.removeItem(SEEN_KEY);
    window.sessionStorage.removeItem('r16-mi-ruta-opened');
  } catch {}
}

export function useLoyalty() {
  const ctx = useContext(LoyaltyContext);
  if (!ctx) throw new Error('useLoyalty must be used inside <LoyaltyProvider>');
  return ctx;
}

/**
 * The balance the member last saw, so a fresh earn can animate in as "+46".
 * First run assumes they've seen everything except their latest earn.
 */
export function useSeenPoints(points, transactions) {
  const [from, setFrom] = useState(null);
  const handled = useRef(null);
  useEffect(() => {
    // the guard keeps a re-run of this effect (Strict Mode, re-render) from
    // reading back the value it just wrote and swallowing the animation
    if (points == null || handled.current === points) return;
    handled.current = points;
    let seen = null;
    try {
      const raw = window.localStorage.getItem(SEEN_KEY);
      if (raw != null) seen = Number(raw);
    } catch {}
    if (seen == null || Number.isNaN(seen)) {
      const latest = transactions?.[0];
      seen = latest?.kind === 'earn' ? points - latest.points : points;
    }
    // only gains animate — a balance that dropped (a claim, a different account) just shows
    setFrom(Math.min(seen, points));
    try {
      window.localStorage.setItem(SEEN_KEY, String(points));
    } catch {}
  }, [points, transactions]);
  return from;
}
