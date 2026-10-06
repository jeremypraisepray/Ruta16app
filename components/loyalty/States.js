import { IconActivity } from './Icons';

/** Friendly empty / error state, always with a way forward. */
export function EmptyState({ num = '16', title, text, children, tone }) {
  return (
    <div className={`mr-empty${tone ? ` mr-empty--${tone}` : ''}`} role={tone === 'error' ? 'alert' : undefined}>
      <span className="ring mr-empty__ring" aria-hidden="true">
        {num}
      </span>
      <div className="mr-empty__title">{title}</div>
      {text && <p className="mr-empty__text">{text}</p>}
      {children && <div className="mr-empty__actions">{children}</div>}
    </div>
  );
}

export function LoadError({ onRetry }) {
  return (
    <EmptyState
      tone="error"
      num="!"
      title="SE NOS PONCHÓ UNA LLANTA"
      text="No pudimos cargar tu ruta. Revisa tu conexión e inténtalo otra vez."
    >
      <button type="button" className="mr-btn mr-btn--red" onClick={onRetry}>
        REINTENTAR
      </button>
    </EmptyState>
  );
}

/** Skeleton shaped like the screen it stands in for. */
export function Skeleton({ variant = 'home' }) {
  return (
    <div className={`mr-skel mr-skel--${variant}`} aria-busy="true" aria-label="Cargando tu ruta">
      <span className="mr-skel__line mr-skel__line--sm" />
      <span className="mr-skel__line mr-skel__line--xl" />
      <span className="mr-skel__block" />
      <span className="mr-skel__block mr-skel__block--tall" />
    </div>
  );
}

export function NoActivity() {
  return (
    <div className="mr-noTx">
      <IconActivity />
      <span>Tu actividad aparece aquí después de tu primera visita.</span>
    </div>
  );
}
