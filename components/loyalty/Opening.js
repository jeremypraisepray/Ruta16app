'use client';

import { useEffect, useRef, useState } from 'react';
import BrandLogo from '@/components/BrandLogo';
import Cutout from '@/components/Cutout';
import { pts } from '@/lib/loyalty/format';
import { prefersReducedMotion, useCountUp } from '@/lib/loyalty/useCountUp';
import { IconArrowRight } from './Icons';

const MARKERS = ['01', '02', '03', '04', '05', '06', '07', '08'];

/**
 * Entering La Ruta. About two seconds: the shield lands, the highway rushes
 * toward you past the eight paradas and settles, the copy rises, the balance
 * counts up, and the door opens. Tap anywhere to skip to the end; reduced
 * motion shows the end state straight away.
 */
export default function Opening({ loyalty, onDone }) {
  const [skipped, setSkipped] = useState(false);
  const [phase, setPhase] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const root = useRef(null);
  const settled = skipped || phase >= 3;

  useEffect(() => {
    if (prefersReducedMotion()) {
      setSkipped(true);
      return;
    }
    const t = [setTimeout(() => setPhase(1), 250), setTimeout(() => setPhase(2), 1250), setTimeout(() => setPhase(3), 2050)];
    return () => t.forEach(clearTimeout);
  }, []);

  const shownPhase = skipped ? 3 : phase;
  const ready = loyalty.status === 'ready';
  const points = ready ? loyalty.member.points : 0;
  const counting = ready && shownPhase >= 2 && !skipped;
  const value = useCountUp(points, { from: 0, duration: 950, run: counting });

  // move focus into the dialog so screen readers land on it; the CTA is the next stop
  useEffect(() => {
    root.current?.focus({ preventScroll: true });
  }, []);

  const enter = () => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(onDone, prefersReducedMotion() ? 0 : 520);
  };

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && enter();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  });

  const isNew = ready && loyalty.isNew;
  const line = !ready
    ? ''
    : isNew
      ? 'Tu próxima visita ya cuenta.'
      : !loyalty.next
        ? 'Llegaste a la última parada. Todo es tuyo.'
        : loyalty.toGo <= Math.max(100, loyalty.avgEarn)
          ? 'Ya casi llegas a tu próxima recompensa.'
          : `Te faltan ${pts(loyalty.toGo)} pts para tu próxima parada.`;

  return (
    <div
      ref={root}
      tabIndex={-1}
      className={`mr-open${[1, 2, 3].map((p) => (shownPhase >= p ? ` is-p${p}` : '')).join('')}${skipped ? ' is-skipped' : ''}${leaving ? ' is-leaving' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Bienvenido a Mi Ruta"
      onClick={(e) => {
        if (!settled && e.target.closest('button') == null) setSkipped(true);
      }}
    >
      <div className="mr-open__glow" aria-hidden="true" />
      <div className="mr-open__dots" aria-hidden="true" />

      {/* the highway, laid flat and running toward the viewer */}
      <div className="mr-open__road" aria-hidden="true">
        <div className="mr-open__plane">
          <div className="mr-open__strip">
            {MARKERS.map((m, i) => (
              <span key={m} className={`mr-open__mark${i % 2 ? ' is-blue' : ''}`} style={{ '--i': i }}>
                {m}
              </span>
            ))}
          </div>
        </div>
      </div>

      <Cutout className="mr-open__dish mr-open__dish--a" src="/images/dishes/torre-16.webp" alt="" priority />
      <Cutout className="mr-open__dish mr-open__dish--b" src="/images/drinks/michelada.webp" alt="" priority />

      <div className="mr-open__content">
        <BrandLogo className="mr-open__logo" />

        <div className="mr-open__copy">
          <p className="mr-open__eyebrow">BIENVENIDO A LA RUTA</p>
          <h1 className="mr-open__title">
            {(isNew ? ['TU RUTA', 'EMPIEZA', 'AQUÍ.'] : ['COME.', 'GANA.', 'REGRESA.']).map((w, i) => (
              <span key={w} className="mr-open__line" style={{ '--i': i }}>
                <span>{w}</span>
              </span>
            ))}
          </h1>
        </div>

        <div className="mr-open__points" aria-live="polite">
          {ready && (
            <>
              <div className="mr-open__num">
                {pts(value)}
                <span>PTS</span>
              </div>
              <p className="mr-open__line2">{line}</p>
            </>
          )}
        </div>

        <button type="button" className="mr-btn mr-btn--red mr-btn--xl mr-open__cta" onClick={enter} disabled={!ready}>
          {isNew ? 'EMPEZAR MI RUTA' : 'ENTRAR A MI RUTA'} <IconArrowRight />
        </button>
      </div>
    </div>
  );
}
