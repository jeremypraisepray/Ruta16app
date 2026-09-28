import Cutout from '@/components/Cutout';
import { SPECIALS } from '@/data/site';

export default function SpecialsStrip({ items = SPECIALS }) {
  return (
    <section className="specials" aria-label="Especiales de la semana">
      {items.map((s, i) => (
        <div
          key={s.title}
          className={`special special--${s.variant}`}
          data-reveal
          style={{ '--d': `${i * 110}ms` }}
        >
          <Cutout className="special__art" src={s.art.src} style={s.art.style} />
          <div className="special__title">{s.title}</div>
          <div className="special__text" style={{ maxWidth: `${s.textMax}px` }}>
            {s.text}
          </div>
        </div>
      ))}
    </section>
  );
}
