'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ORDER_URL } from '@/data/site';
import { PROGRAM } from '@/data/loyalty/program';
import { useLoyalty, useSeenPoints } from '@/lib/loyalty/LoyaltyProvider';
import { initials, pts } from '@/lib/loyalty/format';
import { useCountUp } from '@/lib/loyalty/useCountUp';
import BrandLogo from '@/components/BrandLogo';
import Opening from './Opening';
import RutaRoad from './RutaRoad';
import NextRewardCard from './NextRewardCard';
import PromoCard from './PromoCard';
import MemberCard from './MemberCard';
import Sheet from './Sheet';
import { ActivityByMonth, ActivityList } from './Activity';
import { LoadError, NoActivity, Skeleton } from './States';
import { HowItWorks } from './HowItWorks';
import { IconActivity, IconArrowRight, IconArrowUpRight, IconMenu } from './Icons';

const OPENED_KEY = 'r16-mi-ruta-opened';

export default function HomeScreen() {
  const loyalty = useLoyalty();
  const [opening, setOpening] = useState(null); // null = not decided yet
  const [sheet, setSheet] = useState(null); // 'activity' | 'card' | null
  const [lastSheet, setLastSheet] = useState(null);

  useEffect(() => {
    let seen = false;
    try {
      seen = window.sessionStorage.getItem(OPENED_KEY) === '1';
    } catch {}
    setOpening(!seen);
  }, []);

  const finishOpening = () => {
    try {
      window.sessionStorage.setItem(OPENED_KEY, '1');
    } catch {}
    setOpening(false);
    document.getElementById('mr-main')?.focus({ preventScroll: true });
  };

  const openSheet = (s) => {
    setLastSheet(s);
    setSheet(s);
  };

  if (opening === null) return <Skeleton />;

  return (
    <>
      {opening && <Opening loyalty={loyalty} onDone={finishOpening} />}
      <div className="mr-screen mr-home" inert={opening ? true : undefined}>
        {loyalty.status === 'loading' && <Skeleton />}
        {loyalty.status === 'error' && <LoadError onRetry={loyalty.reload} />}
        {loyalty.status === 'ready' && <HomeReady loyalty={loyalty} paused={opening} onSheet={openSheet} />}
      </div>

      {loyalty.status === 'ready' && (
        <>
          <Sheet open={sheet === 'activity'} onClose={() => setSheet(null)} label="Tu actividad">
            {lastSheet === 'activity' && (
              <div className="mr-sheetBody">
                <p className="mr-kicker">TU ACTIVIDAD</p>
                <h2 className="mr-sheetTitle">
                  {pts(loyalty.member.points)} <span>PTS DISPONIBLES</span>
                </h2>
                {loyalty.transactions.length ? <ActivityByMonth transactions={loyalty.transactions} /> : <NoActivity />}
              </div>
            )}
          </Sheet>
          <Sheet open={sheet === 'card'} onClose={() => setSheet(null)} label="Mi Ruta" tone="card">
            {lastSheet === 'card' && <CardSheet loyalty={loyalty} onDone={() => setSheet(null)} />}
          </Sheet>
        </>
      )}
    </>
  );
}

function HomeReady({ loyalty, paused, onSheet }) {
  const { member, level, steps, next, claimable, avgEarn, isNew, transactions, promotions } = loyalty;
  const from = useSeenPoints(member.points, transactions);
  const earned = from != null && member.points > from ? member.points - from : 0;
  // hold the count until the opening hands over, so the member sees it happen
  const shown = useCountUp(member.points, {
    from: from ?? member.points,
    duration: 1300,
    delay: 450,
    run: from != null && !paused,
  });
  const topReward = steps[steps.length - 1];

  return (
    <>
      <header className="mr-hello">
        <button type="button" className="mr-hello__me" onClick={() => onSheet('card')} aria-label="Ver mi tarjeta Mi Ruta">
          <span className="ring mr-hello__avatar">{initials(member)}</span>
          <span className="mr-hello__text">
            <span className="mr-hello__hi">Qué onda, {member.firstName}</span>
            <span className="mr-hello__level">
              {level.name}
              {isNew ? ' · MIEMBRO NUEVO' : ''}
            </span>
          </span>
        </button>
        <Link href="/" className="mr-hello__logo" aria-label="Ir a ruta16.com">
          <BrandLogo alt="" />
        </Link>
      </header>

      <section className="mr-hero" aria-labelledby="mr-pts">
        <div className="mr-hero__row">
          <div>
            <p className="mr-kicker">{isNew ? 'TU RUTA EMPIEZA AQUÍ' : 'TUS PUNTOS'}</p>
            <h1 id="mr-pts" className="mr-hero__pts">
              <span className="mr-sr">Tienes </span>
              {pts(shown)}
              <span className="mr-hero__unit">PTS</span>
            </h1>
          </div>
          {earned > 0 && !paused && (
            <span className="mr-gain" aria-label={`Ganaste ${earned} puntos en tu última visita`}>
              +{earned} <small>PTS</small>
            </span>
          )}
        </div>
        {isNew && <p className="mr-hero__sub">Tu próxima visita ya cuenta.</p>}

        <RutaRoad steps={steps} points={member.points} shown={shown} />

        {claimable.length > 0 && (
          <Link href="/app/rewards" className="mr-ready">
            <span className="mr-ready__n">{claimable.length}</span>
            <span className="mr-ready__text">
              {claimable.length === 1 ? 'LISTA' : 'LISTAS'} PARA CANJEAR
            </span>
            <IconArrowRight />
          </Link>
        )}
      </section>

      <NextRewardCard next={next} points={member.points} avgEarn={avgEarn} isNew={isNew} top={topReward} />

      <section className="mr-actions" aria-label="Acciones rápidas">
        <a className="mr-order" href={ORDER_URL} target="_blank" rel="noopener noreferrer">
          <span className="mr-order__main">
            ORDENA EN LÍNEA <IconArrowUpRight />
          </span>
          <span className="mr-order__sub">
            {PROGRAM.onlineOrdersEarn ? "Pide pa' llevar y suma puntos" : "Pide pa' llevar"}
          </span>
        </a>
        <div className="mr-actions__row">
          <Link href="/app/menu" className="mr-tile">
            <IconMenu />
            VER MENÚ
          </Link>
          <button type="button" className="mr-tile" onClick={() => onSheet('activity')}>
            <IconActivity />
            MI ACTIVIDAD
          </button>
        </div>
      </section>

      <PromoCard promo={promotions[0]} />

      {isNew && <HowItWorks />}

      <section className="mr-section" aria-labelledby="mr-card-h">
        <div className="mr-section__head">
          <h2 id="mr-card-h" className="mr-section__title">
            TU TARJETA
          </h2>
        </div>
        <button type="button" className="mr-cardBtn" onClick={() => onSheet('card')} aria-label="Abrir mi tarjeta Mi Ruta">
          <MemberCard member={member} level={level} isDemo={loyalty.isDemo} />
        </button>
      </section>

      <section className="mr-section" aria-labelledby="mr-tx-h">
        <div className="mr-section__head">
          <h2 id="mr-tx-h" className="mr-section__title">
            TU ACTIVIDAD
          </h2>
          {transactions.length > 3 && (
            <button type="button" className="mr-link" onClick={() => onSheet('activity')}>
              VER TODO →
            </button>
          )}
        </div>
        {transactions.length ? <ActivityList transactions={transactions} limit={3} /> : <NoActivity />}
      </section>

      {loyalty.isDemo && <DemoNote />}
    </>
  );
}

function CardSheet({ loyalty, onDone }) {
  const { member, level, service } = loyalty;
  const switchTo = (profile) => {
    service.setProfile(profile);
    try {
      window.sessionStorage.removeItem(OPENED_KEY);
      window.localStorage.removeItem('r16-mi-ruta-seen-points');
    } catch {}
    window.location.reload();
  };
  return (
    <div className="mr-sheetBody">
      <MemberCard member={member} level={level} isDemo={loyalty.isDemo} />
      <p className="mr-sheetNote">
        Pronto vas a poder mostrar esta tarjeta al pagar para sumar tus puntos. Toma screenshot — se ve bien.
      </p>
      {loyalty.isDemo && (
        <div className="mr-demoCtl">
          <p className="mr-kicker">MODO DEMO · VER COMO</p>
          <div className="mr-demoCtl__row">
            <button type="button" className="mr-btn mr-btn--ghost" onClick={() => switchTo('regular')}>
              CLIENTE FRECUENTE
            </button>
            <button type="button" className="mr-btn mr-btn--ghost" onClick={() => switchTo('nuevo')}>
              MIEMBRO NUEVO
            </button>
          </div>
          <button
            type="button"
            className="mr-link"
            onClick={() => {
              service.reset();
              loyalty.reload();
              onDone();
            }}
          >
            Reiniciar canjes del demo
          </button>
        </div>
      )}
    </div>
  );
}

export function DemoNote() {
  return (
    <p className="mr-demoNote">
      <b>MODO DEMO.</b> Cuenta, puntos y recompensas son de ejemplo — todavía no están conectados al
      sistema de Ruta 16.
    </p>
  );
}
