'use client';

import { useEffect } from 'react';

/**
 * Adds `is-in` to any [data-reveal] element as it scrolls into view. Mounted
 * once in the root layout; a MutationObserver picks up elements that appear
 * later (client-side navigation, the menu filter swapping sections).
 *
 * Elements only start hidden once the inline script in <head> has put `js` on
 * <html>, so without JavaScript everything is simply visible.
 */
export default function RevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0.08 }
    );

    const scan = (root) => {
      if (root.matches?.('[data-reveal]:not(.is-in)')) io.observe(root);
      root.querySelectorAll?.('[data-reveal]:not(.is-in)').forEach((el) => io.observe(el));
    };
    scan(document.body);

    const mo = new MutationObserver((muts) => {
      for (const m of muts) m.addedNodes.forEach((n) => n.nodeType === 1 && scan(n));
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
