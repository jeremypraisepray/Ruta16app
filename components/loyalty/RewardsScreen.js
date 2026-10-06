'use client';

import { useState } from 'react';
import { ORDER_URL } from '@/data/site';
import { useLoyalty } from '@/lib/loyalty/LoyaltyProvider';
import { longDate, pts } from '@/lib/loyalty/format';
import { nudge } from '@/lib/loyalty/progress';
import { useCountUp } from '@/lib/loyalty/useCountUp';
import RewardArt from './RewardArt';
import RewardClaimSheet from './RewardClaimSheet';
import Meter from './Meter';
import { EmptyState, LoadError, Skeleton } from './States';
import { HowItWorks } from './HowItWorks';
import { DemoNote } from './HomeScreen';
import { IconArrowUpRight } from './Icons';

export default function RewardsScreen() {
  const loyalty = useLoyalty();
  if (loyalty.status === 'loading') return <Skeleton variant="rewards" />;
  if (loyalty.status === 'error') return <LoadError onRetry={loyalty.reload} />;
  return <RewardsReady loyalty={loyalty} />;
}

function RewardsReady({ loyalty }) {
  const { member, steps, next, claimable, avgEarn, activeRedemptions, rewards } = loyalty;
  const [claim, setClaim] = useState({ open: false, reward: null, redemption: null });
  const shown = useCountUp(member.points, { from: Math.max(0, member.points - 60), duration: 700 });
  const upcoming = steps.filter((s) => s.status !== 'claimable');

  const openClaim = (reward, redemption = null) => setClaim({ open: true, reward, redemption });
  const close = () => setClaim((c) => ({ ...c, open: false }));

  return (
    <div className="mr-screen mr-rewards">
      <header className="mr-rhead">
        <p className="mr-kicker">TUS RECOMPENSAS</p>
        <h1 className="mr-rhead__pts">
          {pts(shown)}
          <span>
            PTS
            <br />
            DISPONIBLES
          </span>
        </h1>
        {next ? (
          <div className="mr-rhead__next">
            <div className="mr-rhead__nextRow">
              <span>
                Próxima parada: <b>{next.title}</b>
              </span>
              <span className="mr-rhead__togo">{pts(next.toGo)} PTS</span>
            </div>
            <Meter pct={member.points / next.cost} label={`${pts(member.points)} de ${pts(next.cost)} puntos para ${next.title}`} />
          </div>
        ) : (
          <p className="mr-rhead__done">Llegaste a la última parada — todo el menú de recompensas es tuyo.</p>
        )}
      </header>

      <section className="mr-section" aria-labelledby="mr-ready-h">
        <div className="mr-section__head">
          <h2 id="mr-ready-h" className="mr-section__title">
            LISTAS PARA CANJEAR
          </h2>
          {claimable.length > 0 && <span className="mr-count">{claimable.length}</span>}
        </div>
        {claimable.length ? (
          <ul className="mr-unlocked" aria-label="Recompensas listas para canjear">
            {[...claimable].reverse().map((r) => (
              <li key={r.id}>
                <UnlockedCard reward={r} onClaim={() => openClaim(r)} />
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState
            num={next ? pts(next.cost) : '16'}
            title={next ? `TU PRIMERA PARADA ESTÁ A ${pts(next.toGo)} PTS` : 'NADA POR AHORA'}
            text="Cada visita suma. Pide hoy y empieza a llenar tu ruta."
          >
            <a className="mr-btn mr-btn--red" href={ORDER_URL} target="_blank" rel="noopener noreferrer">
              ORDENA EN LÍNEA <IconArrowUpRight />
            </a>
          </EmptyState>
        )}
      </section>

      {activeRedemptions.length > 0 && (
        <section className="mr-section" aria-labelledby="mr-wallet-h">
          <div className="mr-section__head">
            <h2 id="mr-wallet-h" className="mr-section__title">
              EN TU CARTERA
            </h2>
          </div>
          <ul className="mr-wallet">
            {activeRedemptions.map((rd) => {
              const r = rewards.find((x) => x.id === rd.rewardId);
              if (!r) return null;
              return (
                <li key={rd.id}>
                  <button type="button" className="mr-walletItem" onClick={() => openClaim(r, rd)}>
                    <span className="mr-walletItem__art">
                      <RewardArt reward={r} box={[64, 48]} />
                    </span>
                    <span className="mr-walletItem__body">
                      <span className="mr-walletItem__title">{r.title}</span>
                      <span className="mr-walletItem__exp">Vence el {longDate(rd.expiresAt)}</span>
                    </span>
                    <span className="mr-walletItem__code">VER CÓDIGO</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {upcoming.length > 0 && (
        <section className="mr-section" aria-labelledby="mr-route-h">
          <div className="mr-section__head">
            <h2 id="mr-route-h" className="mr-section__title">
              EN LA RUTA
            </h2>
          </div>
          <ol className="mr-ladder">
            <li className="mr-ladder__you">
              <span className="mr-ladder__shield">
                <img src="/brand/ruta16-logo.png" alt="" width={405} height={587} />
              </span>
              <span className="mr-ladder__youText">
                <b>TÚ ESTÁS AQUÍ</b> · {pts(member.points)} PTS
              </span>
            </li>
            {upcoming.map((r, i) => (
              <li key={r.id} className={`mr-ladder__stop mr-ladder__stop--${r.tier}${r.status === 'next' ? ' is-next' : ''}`}>
                <span className={`ring mr-ladder__ring${i % 2 ? ' ring--blue' : ''}`}>{pts(r.cost)}</span>
                <LadderCard reward={r} avgEarn={avgEarn} />
              </li>
            ))}
          </ol>
        </section>
      )}

      <HowItWorks withFineprint />
      {loyalty.isDemo && <DemoNote />}

      <RewardClaimSheet
        open={claim.open}
        reward={claim.reward}
        redemption={claim.redemption}
        balance={member.points}
        isDemo={loyalty.isDemo}
        onClaim={loyalty.redeem}
        onClose={close}
      />
    </div>
  );
}

function UnlockedCard({ reward, onClaim }) {
  return (
    <article className={`mr-unlock mr-unlock--${reward.tier}`}>
      <span className="mr-unlock__stamp" aria-hidden="true">
        LISTA
      </span>
      <div className="mr-unlock__art">
        <RewardArt reward={reward} box={[220, 150]} />
      </div>
      <div className="mr-unlock__body">
        <p className="mr-kicker">{reward.kicker}</p>
        <h3 className="mr-unlock__title">{reward.title}</h3>
        <p className="mr-unlock__desc">{reward.description}</p>
        <button type="button" className="mr-btn mr-btn--yellow mr-btn--block" onClick={onClaim}>
          CANJEAR · {pts(reward.cost)} PTS
        </button>
      </div>
    </article>
  );
}

function LadderCard({ reward, avgEarn }) {
  const big = reward.tier === 'aspirational';
  return (
    <article className={`mr-rung mr-rung--${reward.tier}${big && reward.photo ? ' has-photo' : ''}`}>
      {big && reward.photo && (
        <img className="mr-rung__photo" src={reward.photo} alt="" loading="lazy" decoding="async" />
      )}
      <div className="mr-rung__art">
        <RewardArt reward={reward} box={big ? [220, 170] : [130, 100]} />
      </div>
      <div className="mr-rung__body">
        <p className="mr-kicker">{reward.kicker}</p>
        <h3 className="mr-rung__title">{reward.title}</h3>
        {big && <p className="mr-rung__desc">{reward.description}</p>}
        <p className="mr-rung__togo">
          <b>{pts(reward.toGo)} PTS</b> PA’ LLEGAR
        </p>
        <Meter pct={reward.pct} label={`${Math.round(reward.pct * 100)}% del camino a ${reward.title}`} />
        {reward.status === 'next' && (
          <p className="mr-rung__nudge">{nudge(reward.toGo, avgEarn)}</p>
        )}
      </div>
    </article>
  );
}
