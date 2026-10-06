/* Line icons drawn on a 24px grid, 2px stroke, to sit with Barlow Condensed. */

const base = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  'aria-hidden': true,
  focusable: false,
};

/** The highway shield, as the "home" icon — the brand mark doubles as nav. */
export const IconShield = (p) => (
  <svg {...base} {...p}>
    <path d="M4.5 4.5c2.2.9 5 .9 7.5-1 2.5 1.9 5.3 1.9 7.5 1 .6 1.6.4 3-.4 4.3.9 1.4 1.1 3 .5 4.7-1.2 3.6-4.2 5.8-7.6 7.5-3.4-1.7-6.4-3.9-7.6-7.5-.6-1.7-.4-3.3.5-4.7-.8-1.3-1-2.7-.4-4.3Z" />
    <path d="M5 9.2h14" />
  </svg>
);

export const IconMenu = (p) => (
  <svg {...base} {...p}>
    <path d="M7 3v8M4.5 3v5a2.5 2.5 0 0 0 5 0V3M7 11v10" />
    <path d="M17 21V3c-2.2 1.2-3.3 3.6-3.3 7v4H17" />
  </svg>
);

export const IconTicket = (p) => (
  <svg {...base} {...p}>
    <path d="M3 7.5V5h18v2.5a2.5 2.5 0 0 0 0 5V19H3v-6.5a2.5 2.5 0 0 0 0-5Z" />
    <path d="m12 8.6 1.1 2.2 2.4.3-1.8 1.7.5 2.4-2.2-1.2-2.2 1.2.5-2.4-1.8-1.7 2.4-.3Z" />
  </svg>
);

export const IconArrowUpRight = (p) => (
  <svg {...base} {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
);

export const IconArrowRight = (p) => (
  <svg {...base} {...p}>
    <path d="M4 12h15M13 6l6 6-6 6" />
  </svg>
);

export const IconSearch = (p) => (
  <svg {...base} {...p}>
    <circle cx="11" cy="11" r="6.5" />
    <path d="m20 20-4.4-4.4" />
  </svg>
);

export const IconClose = (p) => (
  <svg {...base} {...p}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
);

export const IconActivity = (p) => (
  <svg {...base} {...p}>
    <path d="M3 12h4l2.5-6 5 12L17 12h4" />
  </svg>
);

export const IconCheck = (p) => (
  <svg {...base} {...p}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);

export const IconPin = (p) => (
  <svg {...base} {...p}>
    <path d="M12 21s-6.5-6-6.5-11a6.5 6.5 0 0 1 13 0c0 5-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10" r="2.3" />
  </svg>
);

export const IconWifiOff = (p) => (
  <svg {...base} {...p}>
    <path d="M3 3l18 18M8.5 16.4a5 5 0 0 1 7 0M5 12.9a10 10 0 0 1 4.2-2.6M14.6 10.2A10 10 0 0 1 19 12.9M2 9.4a15 15 0 0 1 4.4-2.8M11 5.1a15 15 0 0 1 11 4.3" />
    <path d="M12 20h.01" />
  </svg>
);
