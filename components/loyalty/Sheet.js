'use client';

import { useEffect, useRef, useState } from 'react';
import { IconClose } from './Icons';

/**
 * Bottom sheet on phones, centred card on desktop. Built on <dialog> so focus
 * trapping, Escape and the top layer come from the browser. Drag the handle
 * down (or tap the backdrop) to dismiss.
 *
 * Parents keep their content mounted while `open` flips to false, so the
 * close animation has something to animate.
 */
export default function Sheet({ open, onClose, label, children, className = '', tone }) {
  const ref = useRef(null);
  const panel = useRef(null);
  const drag = useRef(null);
  const [closing, setClosing] = useState(false);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) {
      setClosing(false);
      d.showModal();
      document.documentElement.classList.add('mr-locked');
    } else if (!open && d.open) {
      setClosing(true);
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const t = setTimeout(() => {
        d.close();
        setClosing(false);
        document.documentElement.classList.remove('mr-locked');
      }, reduce ? 0 : 220);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => () => document.documentElement.classList.remove('mr-locked'), []);

  const onCancel = (e) => {
    e.preventDefault();
    onClose();
  };

  const onBackdrop = (e) => {
    if (e.target === ref.current) onClose();
  };

  const onPointerDown = (e) => {
    drag.current = { y: e.clientY, dy: 0 };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!drag.current) return;
    const dy = Math.max(0, e.clientY - drag.current.y);
    drag.current.dy = dy;
    panel.current.style.transform = `translateY(${dy}px)`;
    panel.current.style.transition = 'none';
  };
  const onPointerUp = () => {
    if (!drag.current) return;
    const { dy } = drag.current;
    drag.current = null;
    panel.current.style.transition = '';
    panel.current.style.transform = '';
    if (dy > 90) onClose();
  };

  return (
    <dialog
      ref={ref}
      className={`mr-sheet${closing ? ' is-closing' : ''}${tone ? ` mr-sheet--${tone}` : ''} ${className}`}
      aria-label={label}
      onCancel={onCancel}
      onClick={onBackdrop}
    >
      <div className="mr-sheet__panel" ref={panel}>
        <div className="mr-sheet__bar">
          <div
            className="mr-sheet__grab"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            aria-hidden="true"
          >
            <span />
          </div>
          <button type="button" className="mr-sheet__close" onClick={onClose} aria-label="Cerrar">
            <IconClose />
          </button>
        </div>
        {(open || closing) && children}
      </div>
    </dialog>
  );
}
