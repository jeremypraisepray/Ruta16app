/**
 * Photos and badges for menu items in the app, keyed by `${parada}:${item name}`
 * exactly as in data/menu.json.
 *
 * Only cut-outs that unmistakably show that dish are mapped — a wrong photo is
 * worse than none. Items without one render as a clean menu row.
 *
 * Badges are only used where the menu itself backs them:
 *   TOP SELLER    — the "Top Sellers" group in Zona Culichi and the home page's Top Sellers
 *   FAVORITA R16  — described as "House favorite" in the menu
 *   PA' COMPARTIR — the "Para compartir" group / parada, or "serves 2–4" in the menu
 */
export const ITEM_MEDIA = {
  '01:Ostiones en Concha': { img: '/images/dishes/ostiones.webp' },
  '01:Ostiones R16': { img: '/images/dishes/ostiones-r16.webp', badges: ['TOP SELLER'] },
  '01:Buddy Shrimp': { img: '/images/dishes/buddy-shrimp.webp', badges: ['FAVORITA R16'] },
  '01:Trash Can Nachos': { img: '/images/dishes/nachos.webp' },

  '02:Torre 16': { img: '/images/dishes/torre-16.webp', badges: ['TOP SELLER'] },
  '02:Copa 16': { badges: ['TOP SELLER'] },
  '02:La Chaparra': { img: '/images/dishes/chaparra.webp', badges: ['TOP SELLER'] },
  '02:7 Mares': { badges: ['TOP SELLER'] },
  '02:Piña La Malecona': { img: '/images/dishes/pina-malecona.webp', badges: ['TOP SELLER'] },
  '02:Aguachile Negro': { img: '/images/dishes/aguachile-negro.webp' },
  '02:Aguachile Mango Habanero': { img: '/images/dishes/aguachile.webp' },
  '02:Gran Culichi': { img: '/images/dishes/gran-culichi.webp', badges: ["PA' COMPARTIR"] },

  '03:Caldo de Mariscos': { img: '/images/dishes/caldo-mariscos.webp' },
  '03:Arroz Mixto': { img: '/images/dishes/arroz-mixto.webp' },

  '04:Salmón R16': { img: '/images/dishes/salmon-r16.webp' },
  '04:Mojarra': { img: '/images/dishes/mojarra.webp' },
  '04:Camarones': { img: '/images/dishes/camarones-diabla.webp' },
  '04:Camarón y Filete': { img: '/images/dishes/empanizados.webp' },

  '05:Mar y Tierra': { img: '/images/dishes/parrillada-marina.webp', badges: ["PA' COMPARTIR"] },
  '05:Marina': { badges: ["PA' COMPARTIR"] },
  '05:Zarandeadas': { badges: ["PA' COMPARTIR"] },
  '05:Terrestre': { img: '/images/dishes/parrillada-terrestre.webp', badges: ["PA' COMPARTIR"] },
  '05:Molcajete Regio': { img: '/images/dishes/molcajete-regio.webp' },

  '06:Po-Boys': { img: '/images/dishes/poboy.webp' },
  '06:Pasta Alfredo': { img: '/images/dishes/pasta-alfredo.webp' },
  '06:Brochetas Mixtas': { img: '/images/dishes/brochetas.webp' },
  '06:Caesar Salad': { img: '/images/dishes/caesar-salad.webp' },

  '07:El Guapo': { img: '/images/dishes/el-guapo.webp' },
  '07:Daiquiri': { img: '/images/drinks/margarita-fresa.webp' },
  '07:Piña Colada Virgen': { img: '/images/drinks/pina-colada.webp' },

  '08:Bucket Domestic': { img: '/images/drinks/bucket-ultra.webp' },
  '08:Bucket Imported': { img: '/images/drinks/bucket-corona.webp' },
  '08:Rutachelada Preparada': { img: '/images/drinks/michelada.webp' },
};

/** The "★ TOP" tab — the same four the home page calls Top Sellers, plus the house favorite. */
export const TOP_PICKS = [
  '02:Torre 16',
  '02:La Chaparra',
  '01:Ostiones R16',
  '02:Piña La Malecona',
  '01:Buddy Shrimp',
];
