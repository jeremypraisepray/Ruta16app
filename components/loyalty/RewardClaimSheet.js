'use client';

import { useEffect, useState } from 'react';
import { longDate, pts } from '@/lib/loyalty/format';
import { prefersReducedMotion } from '@/lib/loyalty/useCountUp';
import RewardArt from './RewardArt';
import Sheet from './Sheet';
import { IconArrowRight } from './Icons';

/**
 * Confirm → stamp → code. Points only move after an explicit confirm, and the
 * code screen is also how an already-claimed reward is shown again
 * (pass `redemption` to open straight on it).
 */
export default function RewardClaimSheet({ open, reward, redemption: existing, balance, isDemo, onClaim, onClose }) {
  const [step, setStep] = useState('confirm'); // confirm | working | done | error
  const [redemption, setRedemption] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!open) return;
    setRedemption(existing || null);
    setStep(existing ? 'done' : 'confirm');
    setError(null);
  }, [open, existing]);

  if (!reward) return <Sheet open={false} onClose={onClose} label="Recompensa" />;

  const confirm = async () => {
    setStep('working');
    try {
      const { redemption: r } = await onClaim(reward.id);
      setRedemption(r);
      setStep('done');
      if (!prefersReducedMotion()) navigator.vibrate?.([12, 40, 18]);
    } catch (e) {
      setError(e.message || 'Algo salió mal.');
      setStep('error');
    }
  };

  const fresh = step === 'done' && !existing;

  return (
    <Sheet open={open} onClose={onClose} label={reward.title} tone={step === 'done' ? 'win' : undefined}>
      {step === 'done' && redemption ? (
        <div className="mr-sheetBody mr-win" aria-live="polite">
          <div className="mr-win__stamp" aria-hidden="true">
            <span>RUTA 16</span>
            <b>CANJEADA</b>
            <span>{new Date(redemption.claimedAt).toLocaleDateString('es-MX')}</span>
          </div>
          <div className="mr-win__art">
            <RewardArt reward={reward} box={[240, 180]} priority />
          </div>
          <p className="mr-kicker mr-kicker--yellow">{fresh ? 'RECOMPENSA DESBLOQUEADA' : 'EN TU CARTERA'}</p>
          <h2 className="mr-win__title">{reward.title}</h2>
          {fresh && <p className="mr-win__line">Te la ganaste. Buen provecho.</p>}

          <div className="mr-ticket" aria-label={`Código ${redemption.code}`}>
            <span className="mr-ticket__label">TU CÓDIGO</span>
            <span className="mr-ticket__code">{redemption.code}</span>
            <span className="mr-ticket__how">Muéstraselo a tu mesero al pagar.</span>
            <span className="mr-ticket__exp">Válido hasta el {longDate(redemption.expiresAt)}</span>
          </div>
          {reward.terms && <p className="mr-terms">{reward.terms}</p>}
          {isDemo && <p className="mr-demoInline">Código de demostración — todavía no se puede usar en el restaurante.</p>}
          <button type="button" className="mr-btn mr-btn--yellow mr-btn--block" onClick={onClose}>
            LISTO
          </button>
        </div>
      ) : (
        <div className="mr-sheetBody mr-claim">
          <div className="mr-claim__art">
            <RewardArt reward={reward} box={[240, 180]} priority />
          </div>
          <p className="mr-kicker">{reward.kicker}</p>
          <h2 className="mr-claim__title">{reward.title}</h2>
          <p className="mr-claim__desc">{reward.description}</p>

          <dl className="mr-claim__math">
            <div>
              <dt>Cuesta</dt>
              <dd>{pts(reward.cost)} pts</dd>
            </div>
            <div>
              <dt>Tus puntos</dt>
              <dd>{pts(balance)} pts</dd>
            </div>
            <div className="is-after">
              <dt>Te quedan</dt>
              <dd>{pts(balance - reward.cost)} pts</dd>
            </div>
          </dl>

          {reward.terms && <p className="mr-terms">{reward.terms}</p>}
          <p className="mr-terms">
            Al canjear recibes un código válido por {reward.validDays || 30} días. Los puntos no se devuelven.
          </p>
          {isDemo && <p className="mr-demoInline">Modo demo: no se descuentan puntos reales.</p>}
          {step === 'error' && (
            <p className="mr-claim__error" role="alert">
              {error}
            </p>
          )}

          <div className="mr-claim__actions">
            <button
              type="button"
              className="mr-btn mr-btn--yellow mr-btn--block mr-btn--xl"
              onClick={confirm}
              disabled={step === 'working'}
              aria-busy={step === 'working'}
            >
              {step === 'working' ? 'CANJEANDO…' : step === 'error' ? 'INTENTAR OTRA VEZ' : `CANJEAR POR ${pts(reward.cost)} PTS`}
              {step !== 'working' && <IconArrowRight />}
            </button>
            <button type="button" className="mr-btn mr-btn--ghost mr-btn--block" onClick={onClose}>
              AHORITA NO
            </button>
          </div>
        </div>
      )}
    </Sheet>
  );
}
