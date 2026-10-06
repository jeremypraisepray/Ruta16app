import Link from 'next/link';
import { nudge } from '@/lib/loyalty/progress';
import { pts } from '@/lib/loyalty/format';
import RewardArt from './RewardArt';
import Meter from './Meter';
import { IconArrowRight } from './Icons';

/**
 * "Tu próxima parada" — the one reward the member is driving toward, led by
 * the distance left rather than the balance.
 */
export default function NextRewardCard({ next, points, avgEarn, isNew, top }) {
  if (!next) {
    return (
      <Link href="/app/rewards" className="mr-next mr-next--done">
        <span className="mr-next__body">
          <span className="mr-kicker mr-kicker--yellow">ÚLTIMA PARADA</span>
          <span className="mr-next__title">LLEGASTE AL FINAL DE LA RUTA</span>
          <span className="mr-next__togo">Todas las recompensas son tuyas.</span>
          <span className="mr-next__cta">
            CANJEAR <IconArrowRight />
          </span>
        </span>
        {top && (
          <span className="mr-next__art">
            <RewardArt reward={top} box={[220, 180]} />
          </span>
        )}
      </Link>
    );
  }

  return (
    <Link href="/app/rewards" className="mr-next" aria-label={`Próxima parada: ${next.title}. Te faltan ${next.toGo} puntos. Ver recompensas.`}>
      <span className="mr-next__body">
        <span className="mr-kicker">{isNew ? 'TU PRIMERA PARADA' : 'TU PRÓXIMA PARADA'}</span>
        <span className="mr-next__title">{next.title}</span>
        <span className="mr-next__togo">
          Te faltan <b>{pts(next.toGo)} pts</b>
        </span>
        <Meter pct={points / next.cost} label={`${pts(points)} de ${pts(next.cost)} puntos`} />
        <span className="mr-next__scale" aria-hidden="true">
          <span>{pts(points)}</span>
          <span>{pts(next.cost)} PTS</span>
        </span>
        <span className="mr-next__nudge">{nudge(next.toGo, avgEarn)}</span>
        <span className="mr-next__cta">
          VER RECOMPENSAS <IconArrowRight />
        </span>
      </span>
      <span className="mr-next__art">
        <RewardArt reward={next} box={[220, 180]} priority />
      </span>
    </Link>
  );
}
