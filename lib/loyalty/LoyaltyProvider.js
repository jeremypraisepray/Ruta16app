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
