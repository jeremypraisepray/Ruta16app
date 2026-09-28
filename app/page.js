import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import SiteFooter from '@/components/SiteFooter';
import SpecialsStrip from '@/components/SpecialsStrip';
import Cutout from '@/components/Cutout';
import { priceOf } from '@/data/menuLookup';
import {
  ORDER_URL,
  ADDRESS_LINE_1,
  ADDRESS_LINE_2,
  PHONE_DISPLAY,
  PHONE_HREF,
  RED,
  BLUE,
  plateGlow,
  ring,
} from '@/data/site';

const PARADAS = [
  'APPETIZERS',
  'ZONA CULICHI',
  'RUTA CALIENTE',
  'MARISCOS',
  'PARRILLADAS',
  'Y MÁS',
  'MORRITOS & DESSERT',
  'CHEVES',
].map((name, i) => ({ num: `0${i + 1}`, name, ring: ring(i) }));

const TOP_SELLERS = [
  {
    name: 'TORRE 16',
    item: 'Torre 16',
    img: '/images/dishes/torre-16.webp',
    ring: 'red',
    desc: 'Mixed ceviche, scallops, boiled shrimp, 6 aguachiles — dipped in culichi sauce.',
  },
  {
    name: 'LA CHAPARRA',
    item: 'La Chaparra',
    img: '/images/dishes/chaparra.webp',
    ring: 'blue',
    desc: 'Molcajete bowl: seafood tower, green mussels, avocado, culichi sauce.',
  },
  {
    name: 'OSTIONES R16',
    item: 'Ostiones R16',
    img: '/images/dishes/ostiones-r16.webp',
    ring: 'red',
    desc: 'Grilled oysters — bacon, chorizo, mozzarella, jalapeño, camarada sauce.',
  },
  {
    name: 'PIÑA LA MALECONA',
    item: 'Piña La Malecona',
    img: '/images/dishes/pina-malecona.webp',
    ring: 'blue',
    desc: 'Pineapple stuffed with mixed ceviche — fish, shrimp, octopus, red onion.',
  },
];

const PLATOS = [
  {
    num: '01',
    parada: 'APPETIZERS',
    name: 'OSTIONES EN CONCHA',
    img: '/images/dishes/ostiones.webp',
    accent: RED,
    desc: 'Docena fresca sobre hielo, con salsa de la casa.',
  },
  {
    num: '02',
    parada: 'ZONA CULICHI',
    name: 'AGUACHILE',
    img: '/images/dishes/aguachile-negro.webp',
    accent: BLUE,
    desc: 'Camarón curtido, pepino, cebolla morada y aguacate.',
  },
  {
    num: '03',
    parada: 'RUTA CALIENTE',
    name: 'CALDO DE MARISCOS',
    img: '/images/dishes/caldo-mariscos.webp',
    accent: RED,
    desc: 'Jaiba, almeja y calamar — con arroz y pan de ajo.',
  },
  {
    num: '04',
    parada: 'MARISCOS',
    name: 'SALMÓN R16',
    img: '/images/dishes/salmon-r16.webp',
    accent: BLUE,
    desc: 'Relleno de crema, espinaca y queso — arroz de la casa y vegetales.',
  },
  {
    num: '05',
    parada: 'PARRILLADAS',
    name: 'MAR Y TIERRA',
    img: '/images/dishes/parrillada-marina.webp',
    accent: RED,
    desc: "Barco pa' la mesa grande — mar, tierra y brasa. $45",
  },
  {
    num: '06',
    parada: 'Y MÁS',
    name: 'TACOS DE LA CASA',
    img: '/images/dishes/tacos.webp',
    accent: BLUE,
    desc: 'Gobernador, quesabirria, rib eye o bang bang shrimp.',
  },
];

const BARRA = [
  { name: 'MICHELADA', img: '/images/drinks/michelada-botella.webp' },
  { name: 'BARCO DE SHOTS', img: '/images/drinks/barco-shots.webp' },
  { name: 'MARGARITA DE FRESA', img: '/images/drinks/margarita-fresa.webp' },
  { name: 'PIÑA COLADA', img: '/images/drinks/pina-colada.webp' },
  { name: 'SEMÁFORO', img: '/images/drinks/semaforo.webp' },
  { name: 'BLUE LAGOON', img: '/images/drinks/blue-lagoon.webp' },
  { name: 'HURACÁN VERDE', img: '/images/drinks/hurricane-verde.webp' },
  { name: 'PONCHE R16', img: '/images/drinks/ponche.webp' },
  { name: 'MOJITO', img: '/images/drinks/mojito.webp' },
  { name: 'CARAJILLO', img: '/images/drinks/carajillo.webp' },
];

const REVIEWS = [
  { quote: '"The food was delicious and fresh… the music really set the mood."', name: 'R C.' },
  {
    quote: '"Hosted a 30-person birthday and the manager Johan took care of everything."',
    name: 'CRYSTAL S.',
  },
  { quote: '"Rachel made sure our table never waited — great service, great ceviche."', name: 'TERESA G.' },
];

function BarraGroup({ ariaHidden }) {
  return (
    <div className="barra__group" aria-hidden={ariaHidden || undefined}>
      {BARRA.map((b) => (
        <div key={b.name} className="barra__item">
          <Cutout src={b.img} alt={b.name} fit="height" />
          <div className="barra__name">{b.name}</div>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <SiteNav />

      <header className="hero">
        <video
          className="hero__video"
          src="/media/hero-home.mp4"
          poster="/media/hero-home-poster.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="hero__scrim" />
        <div className="hero__glow" />
        <div className="hero__dots" />
        <div className="hero__rail" aria-hidden="true">
          <span>PARADA 01 · BIENVENIDOS A LA RUTA</span>
        </div>
        <div className="hero__ghost" aria-hidden="true">
          16
        </div>
        <div className="hero__content">
          <div className="hero__eyebrow">MARISCOS · SINALOA STYLE · Y MÁS</div>
          <h1 className="hero__title">
            <span className="hero__line">
              <span>LA RUTA</span>
            </span>
            <span className="hero__line">
              <span>DEL SABOR</span>
            </span>
          </h1>
          <p className="hero__copy">
            Aguachiles, torres y zarandeados del asador — servidos como en Culiacán, aquí en Pasadena,
            TX.
          </p>
          <div className="hero__actions">
            <Link href="/menu" className="btn btn--fill">
              VER MENÚ
            </Link>
            <a
              className="btn btn--outline"
              href={ORDER_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              ORDER ONLINE
            </a>
          </div>
        </div>
      </header>

      <div className="chevronBar" aria-hidden="true" />

      <nav className="paradaRail" aria-label="Las ocho paradas">
        {PARADAS.map((p, i) => (
          <Link
            key={p.num}
            href="/menu"
            className="paradaRail__stop"
            data-reveal
            style={{ '--d': `${i * 70}ms` }}
          >
            <div className={`ring paradaRail__num${p.ring === 'blue' ? ' ring--blue' : ''}`}>
              {p.num}
            </div>
            <div className="paradaRail__name">{p.name}</div>
            <div className="paradaRail__line" />
          </Link>
        ))}
      </nav>

      <section className="section sellers">
        <div className="sellers__head" data-reveal>
          <div className="sellers__headL">
            <div className="eyebrow eyebrow--blue">LOS QUE VUELAN DE LA COCINA</div>
            <h2 className="sellers__title">TOP SELLERS</h2>
          </div>
          <p className="sellers__intro">
            Crudo, frío y con limón — como se come en Culiacán. Con tu salsa culichi.
          </p>
        </div>

        <div className="sellers__grid">
          {TOP_SELLERS.map((t, i) => (
            <Link
              key={t.name}
              href="/menu"
              className={`seller${t.ring === 'blue' ? ' seller--blue' : ''}`}
              data-reveal
              style={{ '--d': `${i * 110}ms` }}
            >
              <div className="seller__stage">
                <span className="seller__ring" aria-hidden="true" />
                <Cutout className="seller__dish" src={t.img} alt={t.name} box={[300, 260]} />
              </div>
              <div className="seller__row">
                <div className="seller__name">{t.name}</div>
                <div className="seller__lead" />
                <div className="seller__price">{priceOf(t.item)}</div>
              </div>
              <p className="seller__desc">{t.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="platos">
        <div className="dotOverlay" />
        <div className="platos__inner">
          <div className="platos__head" data-reveal>
            <div className="platos__headL">
              <div className="eyebrow">OCHO PARADAS · UN SOLO VIAJE</div>
              <h2 className="platos__title">PLATOS DE LA RUTA</h2>
            </div>
            <Link href="/menu" className="platos__link">
              VER EL MENÚ COMPLETO →
            </Link>
          </div>

          <div className="platos__grid">
            {PLATOS.map((d, i) => (
              <Link
                key={d.name}
                href="/menu"
                className="dishCard dishCard--plato"
                data-reveal
                style={{ '--accent': d.accent, '--d': `${(i % 3) * 110}ms` }}
              >
                <div className="dishCard__plate" style={{ background: plateGlow(d.accent) }}>
                  <Cutout src={d.img} alt={d.name} box={[270, 230]} />
                </div>
                <div className="plato__meta">
                  <div
                    className={`ring plato__num${d.accent === BLUE ? ' ring--blue' : ''}`}
                  >
                    {d.num}
                  </div>
                  <div className="plato__parada">{d.parada}</div>
                </div>
                <div className="dishCard__name">{d.name}</div>
                <div className="dishCard__desc">{d.desc}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="barra">
        <div className="barra__head" data-reveal>
          <div className="eyebrow eyebrow--blue">PARADA 08 · ÚLTIMA PARADA</div>
          <h2 className="barra__title">LA BARRA</h2>
          <p className="barra__copy">
            Micheladas preparadas, daiquiris y buckets de cheves — el patio se pone bueno después de
            las 9.
          </p>
        </div>
        <div className="barra__track">
          <BarraGroup />
          <BarraGroup ariaHidden />
        </div>
      </section>

      <SpecialsStrip />

      <section className="patio">
        <div className="patio__media">
          <img src="/media/michelada-patron.webp" alt="Michelada preparada en el patio" loading="lazy" />
        </div>
        <div className="patio__body" data-reveal>
          <Cutout className="patio__art" src="/images/drinks/michelada.webp" />
          <div className="eyebrow">EL PATIO · PASADENA, TX</div>
          <h2 className="patio__title">
            LA RUTA DEL SABOR,
            <br />
            AL AIRE LIBRE
          </h2>
          <p className="patio__meta">
            {ADDRESS_LINE_1}, {ADDRESS_LINE_2}
            <br />
            <a href={PHONE_HREF}>{PHONE_DISPLAY}</a>
          </p>
          <div className="patio__hours">
            <div className="patio__hourCol">
              <div className="patio__hourLabel">DOM – MAR</div>
              <div className="patio__hourVal">11 AM – 10 PM</div>
            </div>
            <div className="patio__hourCol">
              <div className="patio__hourLabel">MIÉ – SÁB</div>
              <div className="patio__hourVal">11 AM – MEDIANOCHE +</div>
            </div>
          </div>
          <Link href="/visitanos" className="btn btn--sm patio__cta">
            CÓMO LLEGAR →
          </Link>
        </div>
      </section>

      <section className="section reviews">
        <h2 className="reviews__title" data-reveal>
          DICEN EN LA RUTA
        </h2>
        <div className="reviews__grid">
          {REVIEWS.map((r, i) => (
            <blockquote
              key={r.name}
              className="review"
              data-reveal
              style={{ '--d': `${i * 110}ms` }}
            >
              <div className="review__stars" aria-label="5 de 5 estrellas">
                ★★★★★
              </div>
              <p className="review__quote">{r.quote}</p>
              <cite className="review__name">{r.name}</cite>
            </blockquote>
          ))}
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
