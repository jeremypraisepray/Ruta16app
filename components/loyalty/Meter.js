/** Progress toward a reward, drawn as a short stretch of lit road. */
export default function Meter({ pct, label, className = '' }) {
  const value = Math.round(Math.min(1, Math.max(0, pct)) * 100);
  return (
    <span
      className={`mr-meter ${className}`}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      aria-label={label}
    >
      <i style={{ '--pct': `${value}%` }} />
    </span>
  );
}
