'use client';

import { useEffect, useRef } from 'react';
import { pts } from '@/lib/loyalty/format';
import RewardArt from './RewardArt';

const GAP = 120; // px between stops — even spacing reads as "paradas", not a chart
const PAD = 52;

/**
 * The member's road. Every reward is a parada along a stretch of highway; the
 * Ruta 16 shield sits at the member's balance and drives forward as `shown`
 * counts up. The road behind them is lit, the road ahead is dashed.
 *
 * Stops are evenly spaced and the shield is placed by interpolating between
 * the two stops it sits between, so a cheap and an expensive reward both get
 * room to breathe.
 */
export default function RutaRoad({ steps, points, shown = points }) {
  const scroller = useRef(null);
  const stops = [{ id: 'salida', cost: 0, start: true }, ...steps];
  const width = PAD * 2 + GAP * (stops.length - 1);

  const xFor = (p) => {
    for (let i = 0; i < stops.length - 1; i++) {
      const a = stops[i].cost;
      const b = stops[i + 1].cost;
      if (p < b) return PAD + GAP * (i + Math.max(0, (p - a) / (b - a)));
    }
    return PAD + GAP * (stops.length - 1);
  };
  const x = xFor(shown);

  // open the road with the member a third of the way in, so the next stop is in view
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    el.scrollLeft = Math.max(0, xFor(points) - el.clientWidth * 0.36);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points, steps.length]);

  const next = steps.find((s) => s.status === 'next');
  const summary = next
    ? `Tienes ${pts(points)} puntos. Próxima parada: ${next.title}, a ${pts(next.cost)} puntos — te faltan ${pts(next.toGo)}.`
    : `Tienes ${pts(points)} puntos. Llegaste a la última parada.`;

  return (
    <div className="mr-road" ref={scroller} tabIndex={0} aria-label={`${summary} Desliza para ver la ruta.`} role="region">
      <div className="mr-road__track" style={{ width }} aria-hidden="true">
        <div className="mr-road__asphalt">
          <div className="mr-road__lit" style={{ width: x }} />
        </div>

        {stops.map((s, i) => {
          const left = PAD + GAP * i;
          const state = s.start ? 'start' : s.status;
          return (
            <div key={s.id} className={`mr-stop mr-stop--${state}`} style={{ left, '--i': i }}>
              {!s.start && (
                <span className="mr-stop__art">
                  <RewardArt reward={s} box={[84, 64]} />
                </span>
              )}
              <span className={`ring mr-stop__ring${i % 2 ? ' ring--blue' : ''}`}>
                {s.start ? '16' : s.status === 'claimable' ? '✓' : pts(s.cost)}
              </span>
              <span className="mr-stop__label">
                <span className="mr-stop__name">{s.start ? 'SALIDA' : s.short}</span>
                <span className="mr-stop__meta">
                  {s.start ? '0 PTS' : s.status === 'claimable' ? 'LISTA' : `${pts(s.cost)} PTS`}
                </span>
              </span>
            </div>
          );
        })}

        <div className="mr-road__you" style={{ left: x }}>
          <span className="mr-road__youTag">TÚ</span>
          <img src="/brand/ruta16-logo.png" alt="" width={405} height={587} />
        </div>
      </div>
    </div>
  );
}
