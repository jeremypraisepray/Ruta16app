'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ORDER_URL } from '@/data/site';
import { PROGRAM } from '@/data/loyalty/program';
import { PARADAS, TOP_ITEMS, searchMenu } from '@/lib/loyalty/menu';
import Dish from './Dish';
import MenuItemSheet from './MenuItemSheet';
import { EmptyState } from './States';
import { IconArrowRight, IconArrowUpRight, IconClose, IconSearch } from './Icons';

const TABS = [{ num: 'top', label: 'TOP', mark: '★' }, ...PARADAS.map((p) => ({ num: p.num, label: p.name, mark: p.num }))];
const SUGGESTIONS = ['Aguachile', 'Torre', 'Tacos', 'Parrillada', 'Cheve'];

export default function MenuScreen() {
  const [tab, setTab] = useState('top');
  const [query, setQuery] = useState('');
  const [item, setItem] = useState(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const rail = useRef(null);
  const body = useRef(null);

  const results = useMemo(() => searchMenu(query), [query]);
  const searching = query.trim().length > 0;

  const open = (it) => {
    setItem(it);
    setSheetOpen(true);
  };

  const go = (num) => {
    setQuery('');
    setTab(num);
    // land at the top of the listings (not the page) if we're scrolled past them
    const top = body.current.getBoundingClientRect().top + window.scrollY - 64;
    if (window.scrollY > top) window.scrollTo({ top });
  };

  // keep the active stop visible in the rail
  useEffect(() => {
    const r = rail.current;
    const el = r?.querySelector('[aria-selected="true"]');
    if (!el) return;
    const left = el.offsetLeft - (r.clientWidth - el.offsetWidth) / 2;
    r.scrollTo({ left, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }, [tab]);

  const onRailKey = (e) => {
    const i = TABS.findIndex((t) => t.num === tab);
    let n = null;
    if (e.key === 'ArrowRight') n = Math.min(TABS.length - 1, i + 1);
    if (e.key === 'ArrowLeft') n = Math.max(0, i - 1);
    if (n == null) return;
    e.preventDefault();
    go(TABS[n].num);
    rail.current.querySelectorAll('[role="tab"]')[n]?.focus();
  };

  const parada = PARADAS.find((p) => p.num === tab);
  const nextParada = parada ? PARADAS[PARADAS.indexOf(parada) + 1] : null;

  return (
    <div className="mr-screen mr-menu">
      <header className="mr-mhead">
        <p className="mr-kicker">MARISCOS · SINALOA STYLE · Y MÁS</p>
        <h1 className="mr-mhead__title">EL MENÚ</h1>
        <label className="mr-search">
          <IconSearch />
          <span className="mr-sr">Buscar en el menú</span>
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busca aguachile, torre, cheve…"
            autoComplete="off"
            enterKeyHint="search"
          />
          {searching && (
            <button type="button" className="mr-search__clear" onClick={() => setQuery('')} aria-label="Borrar búsqueda">
              <IconClose />
            </button>
          )}
        </label>
      </header>

      <div className="mr-rail" ref={rail} role="tablist" aria-label="Paradas del menú" onKeyDown={onRailKey}>
        {TABS.map((t, i) => {
          const active = !searching && tab === t.num;
          return (
            <button
              key={t.num}
              type="button"
              role="tab"
              id={`mr-tab-${t.num}`}
              aria-selected={active}
              aria-controls="mr-menu-panel"
              tabIndex={active || (searching && i === 0) ? 0 : -1}
              className={`mr-rail__stop${active ? ' is-active' : ''}${t.num === 'top' ? ' is-top' : ''}`}
              onClick={() => go(t.num)}
            >
              <span className={`mr-rail__num${i % 2 === 0 ? '' : ' is-blue'}`}>{t.mark}</span>
              <span className="mr-rail__name">{t.label}</span>
            </button>
          );
        })}
      </div>

      <div
        ref={body}
        id="mr-menu-panel"
        role="tabpanel"
        aria-labelledby={searching ? undefined : `mr-tab-${tab}`}
        aria-label={searching ? `Resultados para ${query}` : undefined}
        className="mr-menu__body"
        key={searching ? 'search' : tab}
      >
        {searching ? (
          <SearchResults query={query} results={results} onOpen={open} onSuggest={setQuery} onReset={() => go('top')} />
        ) : tab === 'top' ? (
          <TopTab onOpen={open} onParada={go} />
        ) : (
          <ParadaTab parada={parada} next={nextParada} onOpen={open} onNext={go} />
        )}
      </div>

      <a className="mr-orderBar" href={ORDER_URL} target="_blank" rel="noopener noreferrer">
        <span className="mr-orderBar__copy">{PROGRAM.onlineOrdersEarn ? 'Pide. Gana puntos. Regresa.' : "Pide pa' llevar."}</span>
        <span className="mr-orderBar__cta">
          ORDENA EN LÍNEA <IconArrowUpRight />
        </span>
      </a>

      <MenuItemSheet item={item} open={sheetOpen} onClose={() => setSheetOpen(false)} />
    </div>
  );
}

function TopTab({ onOpen, onParada }) {
  const [hero, ...rest] = TOP_ITEMS;
  return (
    <>
      <section className="mr-mblock">
        <p className="mr-kicker mr-kicker--blue">LOS QUE VUELAN DE LA COCINA</p>
        <h2 className="mr-mblock__title">TOP SELLERS</h2>
        <FoodCard item={hero} onOpen={onOpen} feature priority />
        <div className="mr-foodGrid">
          {rest.map((it) => (
            <FoodCard key={it.id} item={it} onOpen={onOpen} />
          ))}
        </div>
      </section>

      <section className="mr-mblock">
        <p className="mr-kicker">OCHO PARADAS · UN SOLO VIAJE</p>
        <h2 className="mr-mblock__title">RECORRE LA RUTA</h2>
        <ol className="mr-stops">
          {PARADAS.map((p, i) => (
            <li key={p.num}>
              <button type="button" className="mr-stopTile" onClick={() => onParada(p.num)}>
                <span className={`ring mr-stopTile__ring${i % 2 ? ' ring--blue' : ''}`}>{p.num}</span>
                <span className="mr-stopTile__text">
                  <span className="mr-stopTile__tag">{p.tag}</span>
                  <span className="mr-stopTile__name">{p.name}</span>
                  <span className="mr-stopTile__meta">
                    {p.count} platos · desde <b>{p.from}</b>
                  </span>
                </span>
                <span className="mr-stopTile__art">
                  <Dish src={p.img} box={[110, 84]} accent={i % 2 ? 'blue' : 'red'} />
                </span>
              </button>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}

function ParadaTab({ parada, next, onOpen, onNext }) {
  const blue = parada.accent === '#2f8fd5';
  return (
    <>
      <section className={`mr-phead${blue ? ' is-blue' : ''}`}>
        <span className="mr-phead__ghost" aria-hidden="true">
          {parada.num}
        </span>
        <div className="mr-phead__text">
          <p className={`mr-kicker${blue ? ' mr-kicker--blue' : ''}`}>
            PARADA {parada.num} · {parada.tag}
          </p>
          <h2 className="mr-phead__name">{parada.name}</h2>
          <p className="mr-phead__desc">{parada.desc}</p>
          <p className="mr-phead__meta">
            {parada.count} platos · desde <b>{parada.from}</b>
          </p>
        </div>
        <span className="mr-phead__art">
          <Dish src={parada.img} box={[170, 130]} accent={blue ? 'blue' : 'red'} priority />
        </span>
      </section>

      {parada.groups.map((g) => {
        const withImg = g.items.filter((i) => i.img);
        const rows = g.items.filter((i) => !i.img);
        return (
          <section key={g.title} className="mr-group">
            <h3 className="mr-group__title">
              {g.title}
              {g.note && <span className="mr-group__note">{g.note}</span>}
            </h3>
            {withImg.length > 0 && (
              <div className="mr-foodGrid">
                {withImg.map((it) => (
                  <FoodCard key={it.id} item={it} onOpen={onOpen} />
                ))}
              </div>
            )}
            {rows.length > 0 && (
              <ul className="mr-rows">
                {rows.map((it) => (
                  <li key={it.id}>
                    <MenuRow item={it} onOpen={onOpen} />
                  </li>
                ))}
              </ul>
            )}
          </section>
        );
      })}

      {next ? (
        <button type="button" className="mr-nextStop" onClick={() => onNext(next.num)}>
          <span className="mr-nextStop__label">SIGUIENTE PARADA</span>
          <span className="mr-nextStop__name">
            {next.num} · {next.name}
          </span>
          <IconArrowRight />
        </button>
      ) : (
        <button type="button" className="mr-nextStop" onClick={() => onNext('top')}>
          <span className="mr-nextStop__label">ÚLTIMA PARADA · GRACIAS POR VIAJAR</span>
          <span className="mr-nextStop__name">VOLVER AL INICIO DE LA RUTA</span>
          <IconArrowRight />
        </button>
      )}
    </>
  );
}

function SearchResults({ query, results, onOpen, onSuggest, onReset }) {
  if (!results.length) {
    return (
      <EmptyState num="?" title="ESO NO ESTÁ EN LA RUTA… TODAVÍA" text={`No encontramos “${query.trim()}”. Prueba con:`}>
        <div className="mr-chips">
          {SUGGESTIONS.map((s) => (
            <button key={s} type="button" className="mr-chip" onClick={() => onSuggest(s)}>
              {s}
            </button>
          ))}
        </div>
        <button type="button" className="mr-link" onClick={onReset}>
          VER TODO EL MENÚ →
        </button>
      </EmptyState>
    );
  }
  const withImg = results.filter((i) => i.img);
  const rows = results.filter((i) => !i.img);
  return (
    <section className="mr-mblock" aria-live="polite">
      <p className="mr-kicker">
        {results.length} {results.length === 1 ? 'RESULTADO' : 'RESULTADOS'}
      </p>
      {withImg.length > 0 && (
        <div className="mr-foodGrid">
          {withImg.map((it) => (
            <FoodCard key={it.id} item={it} onOpen={onOpen} showParada />
          ))}
        </div>
      )}
      {rows.length > 0 && (
        <ul className="mr-rows">
          {rows.map((it) => (
            <li key={it.id}>
              <MenuRow item={it} onOpen={onOpen} showParada />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function FoodCard({ item, onOpen, feature, priority, showParada }) {
  const blue = item.accent === '#2f8fd5';
  return (
    <button type="button" className={`mr-food${feature ? ' mr-food--feature' : ''}${blue ? ' is-blue' : ''}`} onClick={() => onOpen(item)}>
      <span className="mr-food__plate">
        <Dish src={item.img} alt={item.name} box={feature ? [340, 230] : [170, 128]} priority={priority} accent={blue ? 'blue' : 'red'} num={item.parada} />
        {item.badges.length > 0 && (
          <span className="mr-food__badges">
            {item.badges.map((b) => (
              <span key={b} className="mr-badge">
                {b}
              </span>
            ))}
          </span>
        )}
      </span>
      <span className="mr-food__body">
        {(showParada || feature) && (
          <span className="mr-food__parada">
            {item.parada} · {item.paradaName}
          </span>
        )}
        <span className="mr-food__name">{item.name}</span>
        {item.desc && <span className="mr-food__desc">{item.desc}</span>}
        <span className="mr-food__price">{item.shortPrice}</span>
      </span>
    </button>
  );
}

function MenuRow({ item, onOpen, showParada }) {
  return (
    <button type="button" className="mr-row" onClick={() => onOpen(item)}>
      <span className="mr-row__line">
        <span className="mr-row__name">{item.name}</span>
        <span className="mr-row__dots" aria-hidden="true" />
        <span className="mr-row__price">{item.shortPrice}</span>
      </span>
      {(item.desc || showParada || item.badges.length > 0) && (
        <span className="mr-row__desc">
          {item.badges.map((b) => (
            <span key={b} className="mr-badge mr-badge--inline">
              {b}
            </span>
          ))}
          {showParada && `${item.parada} · ${item.paradaName}${item.desc ? ' — ' : ''}`}
          {item.desc}
        </span>
      )}
    </button>
  );
}
