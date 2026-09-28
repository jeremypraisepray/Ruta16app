/**
 * Cut-out art per parada. `img` is the section's hero dish (also its stop on
 * the route map); `feat` is the "plato destacado" card. Feature prices are
 * looked up from menu.json by `item`, so they never drift from the listings.
 */
export const MENU_ART = {
  '01': {
    img: '/images/dishes/ostiones-r16.webp',
    feat: {
      img: '/images/dishes/buddy-shrimp.webp',
      name: 'BUDDY SHRIMP',
      item: 'Buddy Shrimp',
      desc: 'La favorita de la casa — 3 rellenos, 3 camarada y 3 empanizados, con curtido, papas y salsa camarada.',
    },
  },
  '02': {
    img: '/images/dishes/chaparra.webp',
    feat: {
      img: '/images/dishes/gran-culichi.webp',
      name: 'GRAN CULICHI',
      item: 'Gran Culichi',
      desc: '5 ostiones, 5 almejas con ceviche de pescado y pico, 6 aguachiles, 12 camarones, 6 callos de hacha y 5 balazos — con tu salsa culichi.',
    },
  },
  '03': {
    img: '/images/dishes/caldo-mariscos.webp',
    feat: {
      img: '/images/dishes/arroz-mixto.webp',
      name: 'ARROZ MIXTO',
      item: 'Arroz Mixto',
      desc: 'Arroz frito recién salteado con camarón y pollo, verduras y cebollín.',
    },
  },
  '04': {
    img: '/images/dishes/mojarra.webp',
    feat: {
      img: '/images/dishes/salmon-r16.webp',
      name: 'SALMÓN R16',
      item: 'Salmón R16',
      desc: 'Relleno de crema, espinaca y queso — con arroz de la casa y vegetales.',
    },
  },
  '05': {
    img: '/images/dishes/parrillada-terrestre.webp',
    feat: {
      img: '/images/dishes/parrillada-marina.webp',
      name: 'MAR Y TIERRA',
      item: 'Mar y Tierra',
      desc: 'Bagre entero, pulpo zarandeado, camarón, pollo, fajita de res, quesadillas, nopal y queso asado.',
    },
  },
  '06': {
    img: '/images/dishes/hamburguesa.webp',
    feat: {
      img: '/images/dishes/poboy.webp',
      name: 'PO-BOYS',
      item: 'Po-Boys',
      desc: 'Baguette francés con chile con queso — camarón, ostión o pescado, con papas.',
    },
  },
  '07': {
    img: '/images/dishes/el-guapo.webp',
    feat: {
      img: '/images/drinks/margarita-fresa.webp',
      name: 'DAIQUIRI',
      item: 'Daiquiri',
      desc: 'Fresa, mango, guayaba o sandía — con escarchado de chamoy y chile.',
    },
  },
  '08': {
    img: '/images/drinks/bucket-corona.webp',
    feat: {
      img: '/images/drinks/semaforo.webp',
      name: 'SEMÁFORO',
      price: '$MP',
      desc: 'Tres capas, un solo vaso — la que se pide cuando el patio ya se puso bueno.',
    },
  },
};
