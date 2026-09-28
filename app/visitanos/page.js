import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import SpecialsStrip from '@/components/SpecialsStrip';
import Cutout from '@/components/Cutout';
import {
  ORDER_URL,
  MAPS_URL,
  PHONE_DISPLAY,
  PHONE_HREF,
  HOURS,
  SERVICE_AREAS,
  SPECIALS_VISIT,
  RED,
  BLUE,
  plateGlow,
} from '@/data/site';

const LLEVAR = [
  {
    name: 'CALDO DE MARISCOS',
    img: '/images/dishes/caldo-mariscos.webp',
    accent: RED,
    desc: 'Bien caliente, con arroz y pan de ajo aparte.',
  },
  {
    name: 'ARROZ MIXTO',
    img: '/images/dishes/arroz-mixto.webp',
    accent: BLUE,
    desc: 'Camarón y pollo — el que alcanza para dos.',
  },
  {
    name: 'EMPANIZADOS',
    img: '/images/dishes/empanizados.webp',
    accent: RED,
    desc: 'Filete y camarón, crujientes hasta la casa.',
  },
];

export const metadata = {
  title: 'Visítanos',
  description:
    'Última parada · 2726 Spencer Hwy, Pasadena, TX 77504. Horario, contacto y cómo llegar a Mariscos Ruta 16 y Más.',
};

export default function VisitanosPage() {
  return (
    <>
      <SiteNav />

      <div className="visitHero">
        <div className="dotOverlay" />
        <div className="visitHero__glow" />
        <Cutout
          className="visitHero__dish"
          src="/images/dishes/mar-y-tierra-v.webp"
          alt="Mar y tierra del asador"
          priority
        />
        <header className="visitHead">
          <div className="visitHead__eyebrow">ÚLTIMA PARADA · PASADENA, TX</div>
          <h1 className="visitHead__title">VISÍTANOS</h1>
        </header>
      </div>

      <section className="visit">
        <div className="visit__media">
          <img src="/media/michelada-patron.webp" alt="Michelada preparada en el patio de Ruta 16" />
          <div className="visit__caption">
            <div className="visit__captionTitle">EL PATIO</div>
            <div className="visit__captionText">La ruta del sabor, al aire libre.</div>
          </div>
        </div>

        <div className="visit__panel" data-reveal>
          <div className="visit__block">
            <div className="visit__label">DIRECCIÓN</div>
            <a className="visit__address" href={MAPS_URL} target="_blank" rel="noopener noreferrer">
              2726 SPENCER HWY
              <br />
              PASADENA, TX 77504 ↗
            </a>
          </div>

          <div className="visit__block">
            <div className="visit__label">CONTACTO</div>
            <a className="visit__phone" href={PHONE_HREF}>
              {PHONE_DISPLAY}
            </a>
          </div>

          <div className="visit__block visit__block--hours">
            <div className="visit__label">HORARIO</div>
            <div className="visit__hours">
              {HOURS.map((h) => (
                <div key={h.day} className="visit__hourRow">
                  <div className="visit__day">{h.day}</div>
                  <div className="visit__lead" />
                  <div className="visit__time">{h.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SpecialsStrip items={SPECIALS_VISIT} />

      <section className="zona">
        <div className="llevar">
          {LLEVAR.map((l, i) => (
            <article
              key={l.name}
              className="llevar__card"
              data-reveal
              style={{ '--accent': l.accent, '--d': `${i * 110}ms` }}
            >
              <div className="llevar__plate" style={{ background: plateGlow(l.accent, '50% 52%') }}>
                <Cutout src={l.img} alt={l.name} box={[210, 170]} />
              </div>
              <div className="llevar__body">
                <div className="llevar__name">{l.name}</div>
                <div className="llevar__desc">{l.desc}</div>
              </div>
            </article>
          ))}
        </div>
        <div className="zona__eyebrow" data-reveal>PIDE PA&apos; LLEVAR · TOAST ONLINE</div>
        <h2 className="zona__title">SERVIMOS TODA LA ZONA</h2>
        <div className="zona__chips">
          {SERVICE_AREAS.map((a) => (
            <div key={a} className="zona__chip">
              {a}
            </div>
          ))}
        </div>
        <div className="zona__actions">
          <a className="btn btn--fill btn--md" href={ORDER_URL} target="_blank" rel="noopener noreferrer">
            ORDER ONLINE
          </a>
          <a className="btn btn--outline btn--md" href={MAPS_URL} target="_blank" rel="noopener noreferrer">
            CÓMO LLEGAR
          </a>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
