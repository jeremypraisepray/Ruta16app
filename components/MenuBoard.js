'use client';

import { useRef, useState } from 'react';
import Cutout from '@/components/Cutout';
import RouteMap from '@/components/RouteMap';
import menu from '@/data/menu.json';
import { MENU_ART } from '@/data/menuArt';
import { priceOf } from '@/data/menuLookup';
import { BLUE, plateGlow, ring } from '@/data/site';

const TABS = [{ num: '★', name: 'LA RUTA COMPLETA', key: 'all', ring: 'red' }].concat(
  menu.map((s, i) => ({ num: s.num, name: s.name, key: s.num, ring: ring(i) }))
);

export default function MenuBoard({ header }) {
  const [active, setActive] = useState('all');
  const listings = useRef(null);

  // The route map sits above the listings, so a new filter lands on the
  // listings rather than the page top. window.scrollTo, never scrollIntoView.
  const go = (key) => {
    setActive(key);
    const nav = document.querySelector('.nav');
    const top = listings.current.getBoundingClientRect().top + window.scrollY - (nav ? nav.offsetHeight : 0);
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: Math.max(0, top), behavior: reduce ? 'auto' : 'smooth' });
  };

  const sections = active === 'all' ? menu : menu.filter((s) => s.num === active);

  return (
    <>
      <RouteMap header={header} onStop={go} />

      <div ref={listings} className="menuAnchor" />
      <div className="tabs" role="tablist" aria-label="Filtrar por parada">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            aria-selected={t.key === active}
            className={`tab${t.key === active ? ' is-active' : ''}`}
            onClick={() => go(t.key)}
          >
            <span className={`ring tab__num${t.ring === 'blue' ? ' ring--blue' : ''}`}>{t.num}</span>
            <span className="tab__name">{t.name}</span>
          </button>
        ))}
      </div>

      <div className="menuSections">
        {sections.map((sec) => {
          const next = menu[menu.indexOf(sec) + 1];
          const showNext = active !== 'all' && next;
          const art = MENU_ART[sec.num];
          const glow = plateGlow(sec.accent, '50% 52%', '.28');
          const featPrice = art.feat.item ? priceOf(art.feat.item, sec.num) : art.feat.price;
          return (
            <section key={sec.num} className="parada">
              <div className="parada__ghost" aria-hidden="true">
                {sec.num}
              </div>

              <div className="parada__head" data-reveal>
                <div className="parada__headText">
                  <div className="eyebrow" style={{ color: sec.accent }}>
                    PARADA {sec.num} · {sec.tag}
                  </div>
                  <h2 className="parada__name">{sec.name}</h2>
                  <p className="parada__desc">{sec.desc}</p>
                </div>
                <div className="parada__art" style={{ background: glow }}>
                  <Cutout src={art.img} alt={sec.name} box={[400, 300]} />
                </div>
              </div>

              <div className="parada__groups">
                {sec.groups.map((g, gi) => (
                  <div key={g.title} className="group" data-reveal style={{ '--d': `${(gi % 2) * 90}ms` }}>
                    <div className={`group__head${g.accent === BLUE ? ' group__head--blue' : ''}`}>
                      <div className="group__title">{g.title}</div>
                      {/* rendered even when empty so the flex gap matches the reference */}
                      <div className="group__note">{g.note}</div>
                    </div>
                    {g.items.map((it) => (
                      <div key={it.name} className="item">
                        <div className="item__row">
                          <div className="item__name">{it.name}</div>
                          <div className="dotLeader" />
                          <div className="item__price">{it.price}</div>
                        </div>
                        <div className="item__desc">{it.desc}</div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              <div className="feat" data-reveal>
                <div className="feat__plate" style={{ background: glow }}>
                  <Cutout src={art.feat.img} alt={art.feat.name} box={[330, 250]} />
                </div>
                <div className="feat__body">
                  <div className="feat__label" style={{ color: sec.accent }}>
                    PLATO DESTACADO
                  </div>
                  <div className="feat__row">
                    <div className="feat__name">{art.feat.name}</div>
                    <div className="feat__lead" />
                    <div className="feat__price">{featPrice}</div>
                  </div>
                  <div className="feat__desc">{art.feat.desc}</div>
                </div>
              </div>

              {showNext ? (
                <button type="button" className="nextStop" onClick={() => go(next.num)}>
                  <span className="nextStop__label">ON THE ROAD AHEAD</span>
                  <span className="nextStop__target">
                    PARADA {next.num} · {next.name} →
                  </span>
                </button>
              ) : null}
            </section>
          );
        })}
      </div>
    </>
  );
}
