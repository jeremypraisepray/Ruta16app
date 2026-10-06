'use client';

import { ORDER_URL } from '@/data/site';
import { PROGRAM } from '@/data/loyalty/program';
import { useLoyalty } from '@/lib/loyalty/LoyaltyProvider';
import { priceOptions } from '@/lib/loyalty/menu';
import { pts } from '@/lib/loyalty/format';
import Dish from './Dish';
import Sheet from './Sheet';
import { IconArrowUpRight } from './Icons';

/** Dish detail in a sheet — the photo, the facts, and the way to order it. */
export default function MenuItemSheet({ item, open, onClose }) {
  const loyalty = useLoyalty();
  if (!item) return <Sheet open={false} onClose={onClose} label="Platillo" />;

  const blue = item.accent === '#2f8fd5';
  const options = priceOptions(item.price);
  const next = loyalty.status === 'ready' ? loyalty.next : null;

  return (
    <Sheet open={open} onClose={onClose} label={item.name}>
      <div className="mr-sheetBody mr-item">
        <div className={`mr-item__plate${blue ? ' is-blue' : ''}${item.img ? '' : ' is-empty'}`}>
          <Dish src={item.img} alt={item.name} box={[340, 250]} priority accent={blue ? 'blue' : 'red'} num={item.parada} />
        </div>
        <p className={`mr-kicker${blue ? ' mr-kicker--blue' : ''}`}>
          PARADA {item.parada} · {item.paradaName}
        </p>
        <h2 className="mr-item__name">{item.name}</h2>
        {item.badges.length > 0 && (
          <div className="mr-item__badges">
            {item.badges.map((b) => (
              <span key={b} className="mr-badge">
                {b}
              </span>
            ))}
          </div>
        )}
        {item.desc && <p className="mr-item__desc">{item.desc}</p>}
        <p className="mr-item__group">
          {item.group}
          {item.groupNote ? ` — ${item.groupNote}` : ''}
        </p>

        <ul className="mr-item__prices" aria-label="Precio">
          {options.map((o) => (
            <li key={o}>{o}</li>
          ))}
        </ul>
        {item.price.includes('$MP') && <p className="mr-terms">$MP = precio de mercado, pregúntale a tu mesero.</p>}

        {PROGRAM.onlineOrdersEarn && (
          <p className="mr-item__earn">
            <span className="mr-item__earnDot" aria-hidden="true" />
            {next
              ? `Esta orden te acerca a tu ${next.title} — te faltan ${pts(next.toGo)} pts.`
              : 'Esta orden suma puntos a tu ruta.'}
          </p>
        )}

        <a className="mr-btn mr-btn--red mr-btn--block mr-btn--xl" href={ORDER_URL} target="_blank" rel="noopener noreferrer">
          PEDIR EN LÍNEA <IconArrowUpRight />
        </a>
        <p className="mr-item__note">Abre nuestro menú en Toast. Busca “{item.name}”.</p>
      </div>
    </Sheet>
  );
}
