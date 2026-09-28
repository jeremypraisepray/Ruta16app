'use client';

import { useEffect, useRef } from 'react';
import menu from '@/data/menu.json';
import { MENU_ART } from '@/data/menuArt';
import { paradaStats, totalDishes } from '@/data/menuLookup';
import { ring } from '@/data/site';
import Cutout from './Cutout';

/*
 * "La Ruta Completa" — the menu's landing view. A highway crosses the page with
 * one stop per parada; the road draws itself, then the Ruta 16 shield drives
 * it and each stop lights up as it passes. Stops jump to that parada.
 *
 * Geometry is in a 1200-unit-wide viewBox. Stops sit exactly on the road
 * because the road is a Catmull-Rom curve built through the stop points.
 * HTML stops are positioned in the same units via container query units
 * (1200 units = 100cqw, so 1 unit = 1/12 cqw).
 */

const W = 1200;
const TOP = 96; // nothing is drawn above this line, so the viewBox starts here
const H = 440;
const VH = H - TOP;
const LABEL_Y = 368; // every label hangs on one baseline below the road
const DRIVE = 3.4; // seconds for the shield to cross the map

const STOPS = menu.map((p, i) => ({
  num: p.num,
  name: p.name,
  tag: p.tag,
  x: 75 + 150 * i,
  y: i % 2 === 0 ? 250 : 330,
  ring: ring(i),
  img: MENU_ART[p.num].img,
  ...paradaStats(p.num),
}));

function curveThrough(points) {
  const r = (n) => Math.round(n * 10) / 10;
  let d = `M${r(points[0][0])},${r(points[0][1])}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += ` C${r(c1[0])},${r(c1[1])} ${r(c2[0])},${r(c2[1])} ${r(p2[0])},${r(p2[1])}`;
  }
  return d;
}

const ROAD = curveThrough([[-60, 290], ...STOPS.map((s) => [s.x, s.y]), [W + 60, 290]]);
const TOTAL = totalDishes();

// when the road reaches each stop, as a fraction of the draw
const reach = (x) => (x + 60) / (W + 120);

export default function RouteMap({ header, onStop }) {
  const root = useRef(null);
  const motion = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timers = [];
    const later = (fn, ms) => timers.push(setTimeout(fn, ms));

    // the road has drawn itself by now; send the shield down it
    later(() => {
      const el = root.current;
      if (!el) return;
      el.classList.add('is-driving');
      motion.current?.beginElement?.();
      STOPS.forEach((s) => {
        later(() => {
          const stop = el.querySelector(`[data-stop="${s.num}"]`);
          if (!stop) return;
          stop.classList.add('is-ping');
          later(() => stop.classList.remove('is-ping'), 900);
        }, reach(s.x) * DRIVE * 1000);
      });
    }, 1900);

    return () => timers.forEach(clearTimeout);
  }, []);

  const label = (s) => `Parada ${s.num} · ${s.name} — ${s.count} platos, desde ${s.from}`;

  return (
    <section className="routeHero" aria-label="La ruta completa">
      <div className="dotOverlay" />
      <div className="routeHero__inner">
        <div className="routeHero__head">
          <div className="routeHero__intro">{header}</div>
          <div className="routeHero__tally" aria-hidden="true">
            <span>
              <b>{STOPS.length}</b> paradas
            </span>
            <span>
              <b>{TOTAL}</b> platos
            </span>
          </div>
        </div>

        {/* desktop & tablet: the highway */}
        <div className="routeMap" ref={root}>
          <svg className="routeMap__svg" viewBox={`0 ${TOP} ${W} ${VH}`} aria-hidden="true">
            <defs>
              <mask id="r16-road-draw" maskUnits="userSpaceOnUse" x="-100" y={TOP} width={W + 200} height={VH}>
                <path className="routeMap__drawPath" d={ROAD} pathLength="1" />
              </mask>
            </defs>
            <g mask="url(#r16-road-draw)">
              <path className="routeMap__shoulder" d={ROAD} />
              <path className="routeMap__edge" d={ROAD} />
              <path className="routeMap__asphalt" d={ROAD} />
              <path id="r16-road" className="routeMap__center" d={ROAD} />
            </g>
            <g className="routeMap__car">
              <image href="/brand/ruta16-logo.png" x="-15" y="-44" width="30" height="44" />
              <animateMotion
                ref={motion}
                dur={`${DRIVE}s`}
                begin="indefinite"
                fill="freeze"
                calcMode="linear"
                keyPoints="0;1"
                keyTimes="0;1"
              >
                <mpath href="#r16-road" />
              </animateMotion>
            </g>
          </svg>

          {STOPS.map((s, i) => (
            <button
              key={s.num}
              type="button"
              data-stop={s.num}
              className={`rstop rstop--${s.ring}`}
              aria-label={label(s)}
              onClick={() => onStop(s.num)}
              style={{
                left: `${(s.x / W) * 100}%`,
                top: `${((s.y - TOP) / VH) * 100}%`,
                '--drop': `${(LABEL_Y - s.y) / 12}cqw`,
                '--in': `${0.15 + reach(s.x) * 1.6}s`,
                '--bob': `${i * 0.45}s`,
              }}
            >
              <span className="rstop__dish">
                <Cutout src={s.img} alt="" box={[134, 104]} />
              </span>
              <span className={`ring rstop__ring${s.ring === 'blue' ? ' ring--blue' : ''}`}>{s.num}</span>
              <span className="rstop__post" />
              <span className="rstop__label">
                <span className="rstop__name">{s.name}</span>
                <span className="rstop__meta">
                  {s.count} platos · desde <b>{s.from}</b>
                </span>
              </span>
            </button>
          ))}
        </div>

        {/* phones: the same route, running down the page */}
        <ol className="routeList">
          {STOPS.map((s, i) => (
            <li key={s.num} style={{ '--in': `${0.1 + i * 0.09}s` }}>
              <button type="button" className={`vstop vstop--${s.ring}`} aria-label={label(s)} onClick={() => onStop(s.num)}>
                <span className={`ring vstop__ring${s.ring === 'blue' ? ' ring--blue' : ''}`}>{s.num}</span>
                <span className="vstop__label">
                  <span className="vstop__tag">{s.tag}</span>
                  <span className="vstop__name">{s.name}</span>
                  <span className="vstop__meta">
                    {s.count} platos · desde <b>{s.from}</b>
                  </span>
                </span>
                <span className="vstop__dish">
                  <Cutout src={s.img} alt="" box={[120, 96]} />
                </span>
              </button>
            </li>
          ))}
        </ol>

        <button type="button" className="routeHero__cue" onClick={() => onStop('all')}>
          <span>RECORRE LA RUTA COMPLETA</span>
          <span className="routeHero__chev" aria-hidden="true">
            ↓
          </span>
        </button>
      </div>
    </section>
  );
}
