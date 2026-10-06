'use client';

import { useEffect, useState } from 'react';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Animates a number from `from` to `to` (ease-out), e.g. a points balance
 * ticking up after a visit. Jumps straight to `to` under reduced motion.
 */
export function useCountUp(to, { from = 0, duration = 1100, delay = 0, run = true } = {}) {
  const [value, setValue] = useState(run ? from : to);

  useEffect(() => {
    if (to == null) return;
    if (!run || from === to || prefersReducedMotion()) {
      setValue(to);
      return;
    }
    setValue(from);
    let raf;
    let start;
    const timer = setTimeout(() => {
      const tick = (t) => {
        start ??= t;
        const p = Math.min(1, (t - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setValue(Math.round(from + (to - from) * eased));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    }, delay);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
  }, [to, from, duration, delay, run]);

  return value;
}
