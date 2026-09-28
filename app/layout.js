import { Barlow, Barlow_Condensed } from 'next/font/google';
import RevealObserver from '@/components/RevealObserver';
import { SITE_URL } from '@/data/site';
import './globals.css';

const barlow = Barlow({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-barlow',
  display: 'swap',
});

const barlowCondensed = Barlow_Condensed({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-barlow-condensed',
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Mariscos Ruta 16 y Más — La Ruta del Sabor · Pasadena, TX',
    template: '%s — Mariscos Ruta 16 y Más',
  },
  description:
    'Aguachiles, torres y zarandeados del asador — servidos como en Culiacán, aquí en Pasadena, TX.',
  openGraph: {
    type: 'website',
    locale: 'es_MX',
    siteName: 'Mariscos Ruta 16 y Más',
    title: 'Mariscos Ruta 16 y Más — La Ruta del Sabor',
    description:
      'Aguachiles, torres y zarandeados del asador — servidos como en Culiacán, aquí en Pasadena, TX.',
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: 'Mariscos Ruta 16 y Más — La Ruta del Sabor' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mariscos Ruta 16 y Más — La Ruta del Sabor',
    description:
      'Aguachiles, torres y zarandeados del asador — servidos como en Culiacán, aquí en Pasadena, TX.',
    images: ['/og.jpg'],
  },
  icons: { icon: '/brand/ruta16-icon.png', apple: '/brand/ruta16-icon.png' },
};

export const viewport = {
  themeColor: '#141722',
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={`${barlow.variable} ${barlowCondensed.variable}`} suppressHydrationWarning>
      <head>
        {/* reveal-on-scroll only hides content once we know JS is running */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        {children}
        <RevealObserver />
      </body>
    </html>
  );
}
