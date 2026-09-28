/**
 * Canonical origin for metadata, sitemap and social previews. On Vercel this is
 * the production domain (the custom domain once one is attached); locally it
 * falls back to the restaurant's domain.
 */
export const SITE_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : 'https://ruta16.com';

export const ORDER_URL =
  'https://www.toasttab.com/local/order/mariscos-ruta-16-y-mas-12810-suit-b-gulf-fwy';
export const MAPS_URL = 'https://maps.google.com/?q=2726+Spencer+Hwy,+Pasadena,+TX+77504';
export const PHONE_DISPLAY = '(346) 320-4136';
export const PHONE_HREF = 'tel:3463204136';
export const ADDRESS_LINE_1 = '2726 Spencer Hwy';
export const ADDRESS_LINE_2 = 'Pasadena, TX 77504';

export const SOCIALS = [
  { label: 'INSTAGRAM', href: 'https://www.instagram.com/r16_pasadena' },
  { label: 'FACEBOOK', href: 'https://www.facebook.com/profile.php?id=100085122138803' },
  { label: 'TIKTOK', href: 'https://www.tiktok.com/@mariscosr16' },
];

export const NAV_LINKS = [
  { label: 'MENÚ', href: '/menu' },
  { label: 'NOSOTROS', href: '/nosotros' },
  { label: 'VISÍTANOS', href: '/visitanos' },
];

export const RED = '#e2493b';
export const BLUE = '#2f8fd5';

/**
 * Cut-outs are never framed in a box — they sit on a radial "plato" glow that
 * fades to the page navy.
 */
export const plateGlow = (accent, at = '50% 66%', alpha = '.30') =>
  `radial-gradient(circle at ${at}, ${
    accent === RED ? `rgba(226,73,59,${alpha})` : `rgba(47,143,213,${alpha})`
  } 0%, rgba(20,23,34,0) 66%)`;

export const SPECIALS = [
  {
    variant: 'red',
    title: 'MARTES ¡DESTACADO!',
    text: 'Especial de tacos todos los martes.',
    textMax: 240,
    art: {
      src: '/images/dishes/tacos.webp',
      alt: 'Tacos',
      style: { right: '-30px', bottom: '-26px', width: '190px' },
    },
  },
  {
    variant: 'blue',
    title: 'MIÉRCOLES ¡JALEDAY!',
    text: 'El meridiano de la semana se celebra aquí.',
    textMax: 260,
    art: {
      src: '/images/drinks/semaforo.webp',
      alt: 'Semáforo',
      style: { right: '14px', bottom: '-40px', width: '150px' },
    },
  },
  {
    variant: 'dark',
    title: 'HAPPY HOUR',
    text: 'Cheves, micheladas y buckets — última parada.',
    textMax: 215,
    art: {
      src: '/images/drinks/bucket-ultra.webp',
      alt: 'Bucket de cheves',
      style: { right: '10px', bottom: '-30px', width: '150px' },
    },
  },
];

/** Visítanos runs the same strip with a michelada in the happy-hour panel. */
export const SPECIALS_VISIT = SPECIALS.map((s, i) =>
  i === 2
    ? {
        ...s,
        art: {
          src: '/images/drinks/michelada.webp',
          alt: 'Michelada preparada',
          style: { right: '6px', bottom: '-30px', width: '152px' },
        },
      }
    : s
);

export const HOURS = [
  { day: 'DOMINGO', time: '11 AM – 10 PM' },
  { day: 'LUNES', time: '11 AM – 12 AM' },
  { day: 'MARTES', time: '11 AM – 10 PM' },
  { day: 'MIÉRCOLES', time: '11 AM – 12 AM' },
  { day: 'JUEVES', time: '11 AM – 12 AM' },
  { day: 'VIERNES', time: '11 AM – 12 AM' },
  { day: 'SÁBADO', time: '11 AM – 2 AM' },
];

export const SERVICE_AREAS = [
  'PASADENA',
  'SOUTH HOUSTON',
  'DEER PARK',
  'GALENA PARK',
  'PEARLAND',
  'LA PORTE',
  'CLEAR LAKE CITY',
  'CHANNELVIEW',
];

export const ring = (i) => (i % 2 === 0 ? 'red' : 'blue');
