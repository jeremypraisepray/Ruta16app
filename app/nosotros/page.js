import Link from 'next/link';
import SiteNav from '@/components/SiteNav';
import Cutout from '@/components/Cutout';
import { RED, BLUE, plateGlow } from '@/data/site';

export const metadata = {
  title: 'Nosotros',
  description:
    'De Culiacán a Spencer Hwy — mariscos estilo Sinaloa, raw bar de la Zona Culichi y asador de fuego abierto en Pasadena, TX.',
};

const PILLARS = [
  {
    num: '01',
    color: '#e2493b',
    title: 'ZONA CULICHI',
    text: 'Raw bar estilo Sinaloa: aguachiles, torres, copas y molcajetes — siempre crudo, frío y con limón.',
  },
  {
    num: '02',
    color: '#2f8fd5',
    title: 'FUEGO ABIERTO',
    text: 'Zarandeados y parrilladas en barco, del asador con salsa secreta y arroz recién salteado.',
  },
  {
    num: '03',
    color: '#e2493b',
    title: 'EL PATIO',
    text: 'La ruta del sabor al aire libre — música en vivo, micheladas preparadas y buckets de cheves.',
  },
];

const COCINA = [
  {
    name: 'CAMARONES A LA DIABLA',
    img: '/images/dishes/camarones-diabla.webp',
    accent: RED,
    desc: 'Salsa devil, papas salteadas y ensalada de la casa.',
  },
  {
    name: 'MOJARRA AL GUSTO',
    img: '/images/dishes/mojarra.webp',
    accent: BLUE,
    desc: 'Al ajo rostizado, molcajeteada o a la plancha.',
  },
  {
    name: 'EMPANIZADOS',
    img: '/images/dishes/empanizados.webp',
    accent: RED,
    desc: 'Filete y camarón empanizado con arroz frito.',
  },
  {
    name: 'MOLCAJETE REGIO',
    img: '/images/dishes/molcajete-regio.webp',
    accent: BLUE,
    desc: 'Fajita, pollo, chorizo, camarón y queso asado en salsa molcajeteada.',
  },
];

const POSTALES = [
  { src: '/media/parrillada-mixta-barco.webp', alt: 'Parrillada mixta en barco' },
  { src: '/media/patio-letrero.webp', alt: 'El patio y el letrero de Ruta 16' },
  { src: '/media/pescado-mariscos.webp', alt: 'Pescado entero con mariscos' },
  { src: '/media/parrillada-marina-barco.webp', alt: 'Parrillada marina en barco' },
  { src: '/media/mariscos-empanizados.webp', alt: 'Mariscos empanizados con papas' },
  { src: '/media/langosta.webp', alt: 'Langosta' },
  { src: '/media/parrillada-comal.webp', alt: 'Parrillada en comal' },
  { src: '/media/micheladas-pina.webp', alt: 'Micheladas y piña colada' },
];

export default function NosotrosPage() {
  return (
    <>
      <SiteNav />

      <header className="subHero">
        <video
          className="hero__video"
          src="/media/hero-nosotros.mp4"
          poster="/media/hero-nosotros-poster.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
        <div className="subHero__scrim" />
        <Cutout
          className="subHero__dish"
          src="/images/dishes/coctel-ceviche.webp"
          alt="Cóctel de camarón y ceviche"
          priority
        />
        <div className="subHero__content">
          <div className="subHero__eyebrow">NOSOTROS</div>
          <h1 className="subHero__title">
            DE CULIACÁN
            <br />
            A SPENCER HWY
          </h1>
        </div>
      </header>

      <section className="story" data-reveal>
        <div className="story__text">
          <h2 className="story__title">
            LA RUTA EMPIEZA
            <br />
            EN SINALOA
          </h2>
          <p className="story__p">
            Ruta 16 nació de un antojo: mariscos como se comen en Culiacán — crudos, fríos y con limón
            — servidos con la música alta y los platos al centro de la mesa. Del aguachile negro a la
            torre de mariscos, cada receta viajó la ruta desde Sinaloa hasta Pasadena, Texas.
          </p>
          <p className="story__p">
            Nuestro menú se recorre como una carretera: ocho paradas, del raw bar de la Zona Culichi
            al asador de fuego abierto, con la última parada siempre en las cheves.
          </p>
        </div>
        <div className="story__media">
          <img src="/media/ostiones-gratinados.webp" alt="Ostiones gratinados con jalapeño" loading="lazy" />
          <div className="story__frame" aria-hidden="true" />
        </div>
      </section>

      <section className="pillars">
        {PILLARS.map((p, i) => (
          <article key={p.num} className="pillar" data-reveal style={{ '--d': `${i * 110}ms` }}>
            <div className="pillar__num" style={{ color: p.color }}>
              {p.num}
            </div>
            <div className="pillar__title">{p.title}</div>
            <p className="pillar__text">{p.text}</p>
          </article>
        ))}
      </section>

      <section className="cocina">
        <div className="dotOverlay" />
        <div className="cocina__inner">
          <div className="eyebrow" data-reveal>
            DE LA COCINA A LA MESA
          </div>
          <h2 className="cocina__title" data-reveal>
            LO QUE SALE DEL PASE
          </h2>
          <div className="cocina__grid">
            {COCINA.map((c, i) => (
              <article
                key={c.name}
                className="dishCard dishCard--cocina"
                data-reveal
                style={{ '--accent': c.accent, '--d': `${i * 100}ms` }}
              >
                <div className="dishCard__plate" style={{ background: plateGlow(c.accent) }}>
                  <Cutout src={c.img} alt={c.name} box={[250, 210]} />
                </div>
                <div className="dishCard__name">{c.name}</div>
                <div className="dishCard__desc">{c.desc}</div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="postales">
        <div className="postales__head" data-reveal>
          <h2 className="postales__title">POSTALES DE LA RUTA</h2>
          <a
            className="postales__handle"
            href="https://www.instagram.com/r16_pasadena"
            target="_blank"
            rel="noopener noreferrer"
          >
            @R16_PASADENA
          </a>
        </div>
        <div className="postales__grid">
          {POSTALES.map((p, i) => (
            <img
              key={p.src}
              src={p.src}
              alt={p.alt}
              loading="lazy"
              data-reveal
              style={{ '--d': `${(i % 4) * 90}ms` }}
            />
          ))}
        </div>
      </section>

      <section className="closer" data-reveal>
        <h2 className="closer__title">VEN A RECORRER LA RUTA</h2>
        <div className="closer__actions">
          <Link href="/menu" className="btn btn--fill btn--md">
            VER MENÚ
          </Link>
          <Link href="/visitanos" className="btn btn--outline btn--md">
            VISÍTANOS
          </Link>
        </div>
      </section>

      <div className="barSplit" aria-hidden="true">
        <i />
        <i />
      </div>
    </>
  );
}
