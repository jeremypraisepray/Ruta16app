'use client';

import { useState } from 'react';
import Cutout from '@/components/Cutout';

/**
 * A dish cut-out sitting on its "plato" glow — or, when there is no photo (or
 * it fails to load), a dashed parada ring with the stop number, so a missing
 * image still reads as Ruta 16 rather than a broken box.
 */
export default function Dish({ src, alt = '', num, accent = 'red', box, priority, className = '' }) {
  const [failed, setFailed] = useState(false);
  const blue = accent === 'blue' || accent === '#2f8fd5';

  return (
    <span className={`mr-dish ${blue ? 'mr-dish--blue' : ''} ${className}`}>
      {src && !failed ? (
        <Cutout
          src={src}
          alt={alt}
          box={box}
          priority={priority}
          className="mr-dish__img"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="mr-dish__empty" role={alt ? 'img' : undefined} aria-label={alt || undefined}>
          <span className={`ring mr-dish__ring${blue ? ' ring--blue' : ''}`}>{num || '16'}</span>
        </span>
      )}
    </span>
  );
}
