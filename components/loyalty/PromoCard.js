import Cutout from '@/components/Cutout';

const KICKER = { multiplier: 'PUNTOS EXTRA', bonus: 'BONO', special: 'HOY EN LA RUTA' };

/**
 * One promotion, from data/loyalty/promotions.js. Renders nothing when there is
 * no live promotion — Home never shows a filler offer.
 */
export default function PromoCard({ promo }) {
  if (!promo) return null;
  const body = (
    <>
      <span className="mr-promo__body">
        <span className="mr-kicker">{KICKER[promo.kind]}</span>
        <span className="mr-promo__title">{promo.title}</span>
        <span className="mr-promo__text">{promo.text}</span>
        {promo.cta && <span className="mr-promo__cta">{promo.cta.label} →</span>}
      </span>
      {promo.image && <Cutout className="mr-promo__art" src={promo.image} alt="" box={[150, 130]} />}
    </>
  );
  const cls = `mr-promo mr-promo--${promo.variant || 'dark'}${promo.accent ? ` mr-promo--edge-${promo.accent}` : ''}`;
  if (!promo.cta) return <aside className={cls}>{body}</aside>;
  return (
    <a
      className={cls}
      href={promo.cta.href}
      {...(promo.cta.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      {body}
    </a>
  );
}
