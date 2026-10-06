'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import BrandLogo from '@/components/BrandLogo';
import { ORDER_URL } from '@/data/site';
import { useLoyalty } from '@/lib/loyalty/LoyaltyProvider';
import { IconArrowUpRight, IconMenu, IconShield, IconTicket, IconWifiOff } from './Icons';

const TABS = [
  { href: '/app', label: 'INICIO', Icon: IconShield },
  { href: '/app/menu', label: 'MENÚ', Icon: IconMenu },
  { href: '/app/rewards', label: 'RECOMPENSAS', Icon: IconTicket },
];

export default function AppShell({ children }) {
  const pathname = usePathname() || '/app';
  const path = pathname.replace(/\/$/, '') || '/app';
  const { online, status, steps } = useLoyalty();
  const ready = status === 'ready' ? steps.filter((s) => s.status === 'claimable').length : 0;

  return (
    <div className="mr-app">
      <a href="#mr-main" className="mr-skip">
        Saltar al contenido
      </a>

      <nav className="mr-nav" aria-label="Mi Ruta">
        <Link href="/app" className="mr-nav__brand" aria-label="Mi Ruta — inicio">
          <BrandLogo />
          <span className="mr-nav__brandText">
            MI RUTA
            <small>La ruta del sabor</small>
          </span>
        </Link>

        <ul className="mr-nav__tabs">
          {TABS.map(({ href, label, Icon }) => {
            const active = path === href;
            return (
              <li key={href}>
                <Link href={href} className={`mr-tab${active ? ' is-active' : ''}`} aria-current={active ? 'page' : undefined}>
                  <span className="mr-tab__bar" aria-hidden="true" />
                  <span className="mr-tab__icon">
                    <Icon />
                    {href === '/app/rewards' && ready > 0 && (
                      <span className="mr-tab__badge" aria-label={`${ready} listas para canjear`}>
                        {ready}
                      </span>
                    )}
                  </span>
                  <span className="mr-tab__label">{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="mr-nav__foot">
          <a className="mr-btn mr-btn--red mr-btn--block" href={ORDER_URL} target="_blank" rel="noopener noreferrer">
            ORDENA EN LÍNEA <IconArrowUpRight />
          </a>
          <Link href="/" className="mr-nav__site">
            ← ruta16.com
          </Link>
        </div>
      </nav>

      <div className="mr-stage">
        {!online && (
          <div className="mr-offline" role="status">
            <IconWifiOff /> Sin conexión — te mostramos tu última info guardada.
          </div>
        )}
        <main id="mr-main" className="mr-main" tabIndex={-1}>
          {children}
        </main>
      </div>
    </div>
  );
}
