import { LoyaltyProvider } from '@/lib/loyalty/LoyaltyProvider';
import AppShell from '@/components/loyalty/AppShell';
import './loyalty.css';

/*
 * Mi Ruta — the loyalty app. Lives under /app beside the marketing site and
 * shares its fonts, tokens, menu data and photography. Runs fully client-side
 * (the site is a static export); the account comes from lib/loyalty/service.js.
 */

export const metadata = {
  title: { default: 'Mi Ruta', template: '%s · Mi Ruta' },
  description: 'Come. Gana. Regresa. Tus puntos y recompensas de Mariscos Ruta 16 y Más.',
  // demo data until the points API is connected — keep it out of search
  robots: { index: false, follow: false },
  manifest: '/app.webmanifest',
  appleWebApp: { capable: true, title: 'Mi Ruta', statusBarStyle: 'black-translucent' },
};

export const viewport = {
  themeColor: '#0e1119',
  viewportFit: 'cover',
};

export default function LoyaltyLayout({ children }) {
  return (
    <LoyaltyProvider>
      <AppShell>{children}</AppShell>
    </LoyaltyProvider>
  );
}
