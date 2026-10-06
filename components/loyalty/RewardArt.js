import Dish from './Dish';

/**
 * A reward's picture: its dish cut-out; else its photo cropped round like a
 * plate; else — for non-dish rewards like credit — the Ruta 16 shield with the
 * value printed on it, like a route number.
 */
export default function RewardArt({ reward, box, priority, className = '' }) {
  if (reward.image) {
    return (
      <Dish
        src={reward.image}
        alt=""
        box={box}
        priority={priority}
        accent={reward.tier === 'quick' ? 'blue' : 'red'}
        className={className}
      />
    );
  }
  if (reward.photo) {
    return (
      <span className={`mr-photoArt ${className}`}>
        <img src={reward.photo} alt="" loading={priority ? undefined : 'lazy'} decoding="async" />
      </span>
    );
  }
  return (
    <span className={`mr-shieldArt ${className}`}>
      <svg viewBox="0 0 100 112" aria-hidden="true">
        <path
          className="mr-shieldArt__top"
          d="M8 10c14 5 29 4 42-6 13 10 28 11 42 6 3 8 2 15-2 21H10C6 25 5 18 8 10Z"
        />
        <path
          className="mr-shieldArt__body"
          d="M10 34h80c4 7 5 15 2 23-6 25-22 40-42 51C30 97 14 82 8 57c-3-8-2-16 2-23Z"
        />
        <text x="50" y="25" textAnchor="middle" className="mr-shieldArt__small">
          RUTA
        </text>
        <text x="50" y="80" textAnchor="middle" className="mr-shieldArt__big">
          {reward.sign || '16'}
        </text>
      </svg>
    </span>
  );
}
