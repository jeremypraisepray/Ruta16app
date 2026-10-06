import BrandLogo from '@/components/BrandLogo';
import { memberSince, pts } from '@/lib/loyalty/format';

/**
 * "Mi Ruta" — the member's card. Designed to be screenshot-worthy and, later,
 * scanned at the register. The QR slot is a labelled placeholder until a real
 * member-lookup endpoint exists; it encodes nothing.
 */
export default function MemberCard({ member, level, isDemo }) {
  return (
    <figure className="mr-card" aria-label={`Tarjeta Mi Ruta de ${member.firstName}`}>
      <div className="mr-card__split" aria-hidden="true">
        <i />
        <i />
      </div>
      <span className="mr-card__ghost" aria-hidden="true">
        16
      </span>
      <div className="mr-card__top">
        <BrandLogo className="mr-card__logo" alt="" />
        <div className="mr-card__brand">
          <span className="mr-card__title">MI RUTA</span>
          <span className="mr-card__sub">MARISCOS RUTA 16 Y MÁS</span>
        </div>
        {isDemo && <span className="mr-card__demo">DEMO</span>}
      </div>

      <div className="mr-card__name">
        {member.firstName} {member.lastName || ''}
      </div>
      <div className="mr-card__level">
        {level.name} · DESDE {memberSince(member.memberSince)}
      </div>

      <div className="mr-card__foot">
        <div>
          <span className="mr-card__label">PUNTOS</span>
          <span className="mr-card__pts">{pts(member.points)}</span>
        </div>
        <div>
          <span className="mr-card__label">MIEMBRO</span>
          <span className="mr-card__id">{member.id}</span>
        </div>
        <div className="mr-card__qr" role="img" aria-label="Código QR — próximamente">
          <span>QR</span>
          <small>PRONTO</small>
        </div>
      </div>
      <div className="mr-card__perf" aria-hidden="true" />
    </figure>
  );
}
