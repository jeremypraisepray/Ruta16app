import dims from '@/data/cutouts.json';

/**
 * A transparent dish/drink cut-out.
 *
 * The intrinsic width/height attributes (from data/cutouts.json) let the browser
 * reserve the right box before a lazy image loads. Only one axis may come from
 * those attributes, or the image would be stretched to fill both CSS limits — so
 * the axis the layout actually constrains keeps the attribute and the other is
 * released to `auto`:
 *   - `box`  the [width, height] limit the CSS puts on this image
 *   - `fit`  'width' (default — CSS pins the width) or 'height'
 */
export default function Cutout({ src, alt = '', className, style, priority = false, box, fit, onError }) {
  const key = src.replace('/images/', '').replace('.webp', '');
  const [w, h] = dims[key] || [];

  let axis = fit || 'width';
  if (box && w && h) {
    const [boxW, boxH] = box;
    axis = boxW / w <= boxH / h ? 'width' : 'height';
  }
  const sizing = axis === 'width' ? { height: 'auto' } : { width: 'auto' };

  return (
    <img
      className={className}
      style={{ ...sizing, ...style }}
      src={src}
      alt={alt}
      width={w}
      height={h}
      loading={priority ? undefined : 'lazy'}
      decoding="async"
      onError={onError}
    />
  );
}
