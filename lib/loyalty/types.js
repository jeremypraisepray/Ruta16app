/**
 * Shapes shared by the loyalty app. Plain JSDoc so the JS codebase gets editor
 * hints without a TypeScript migration. A production points API only has to
 * return objects in these shapes for every screen to keep working.
 */

/**
 * @typedef {Object} Member
 * @property {string} id            Stable member id (shown on the Mi Ruta card)
 * @property {string} firstName
 * @property {string} [lastName]
 * @property {string} memberSince   ISO date
 * @property {number} points        Spendable balance
 * @property {number} lifetimePoints Total ever earned — drives the level label
 */

/**
 * @typedef {'earn' | 'redeem' | 'adjust'} TransactionKind
 *
 * @typedef {Object} PointsTransaction
 * @property {string} id
 * @property {TransactionKind} kind
 * @property {number} points        Signed: +46 earned, −100 redeemed
 * @property {string} date          ISO timestamp
 * @property {string} label         "Visita · Ruta 16 Pasadena", "Canjeaste: Bebida de la casa"
 * @property {'dine-in' | 'online'} [channel]
 */

/**
 * @typedef {'quick' | 'mid' | 'aspirational'} RewardTier
 *
 * @typedef {Object} Reward
 * @property {string} id
 * @property {string} title         Display name, e.g. "TORRE 16"
 * @property {string} short         Fits under a stop on the road, e.g. "MAR Y TIERRA"
 * @property {string} kicker        Short category label, e.g. "BEBIDA", "PLATO FIRMA"
 * @property {string} description
 * @property {number} cost          Points needed
 * @property {RewardTier} tier
 * @property {string} [image]       Cut-out under /images (transparent WebP)
 * @property {string} [photo]       Full-bleed photo under /media (aspirational cards)
 * @property {string} [sign]        Short value printed on the shield when there is no dish ("$10")
 * @property {string} [terms]
 * @property {boolean} available    false hides it from the catalog without deleting it
 * @property {string} [expiresAt]   ISO date the offer leaves the catalog
 * @property {number} [validDays]   How long a claimed code stays valid
 */

/**
 * @typedef {'claimable' | 'next' | 'upcoming'} RewardStatus
 * Derived on the client from the balance — never stored.
 */

/**
 * @typedef {Object} Redemption
 * @property {string} id
 * @property {string} rewardId
 * @property {string} code          What staff key into the POS
 * @property {string} claimedAt     ISO timestamp
 * @property {string} expiresAt     ISO timestamp
 * @property {'active' | 'used' | 'expired'} status
 */

/**
 * @typedef {Object} Promotion
 * @property {string} id
 * @property {'multiplier' | 'bonus' | 'special'} kind
 * @property {string} title
 * @property {string} text
 * @property {string} [image]
 * @property {'red' | 'blue' | 'dark'} [variant]
 * @property {'red' | 'blue'} [accent]  Edge colour on a dark card
 * @property {number[]} [days]      0 = Sunday … 6 = Saturday; omit for every day
 * @property {string} [startsAt]
 * @property {string} [endsAt]
 * @property {{ label: string, href: string, external?: boolean }} [cta]
 */

/**
 * @typedef {Object} Level
 * @property {string} id
 * @property {string} name
 * @property {number} minLifetime
 */

export {};
