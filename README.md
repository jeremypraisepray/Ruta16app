# Mariscos Ruta 16 y Más — "Parada Nocturna"

Static marketing site for Mariscos Ruta 16 y Más (Sinaloa-style seafood — 2726 Spencer Hwy,
Pasadena, TX 77504). Built from the design handoff bundle; the current spec lives in
`design/handoff-2026-08/` (menu v2 — 8 paradas, dish and drink cut-outs).

**Stack:** Next.js 15 (App Router) + React 19, no backend, no data fetching.
`next.config.mjs` sets `output: 'export'`, so `npm run build` emits a fully static `out/`
directory that Vercel (or any static host) serves as-is.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # static export → out/
```

## Pages

| Route        | Source                  | Notes |
| ------------ | ----------------------- | ----- |
| `/`          | `app/page.js`           | Video hero, parada rail, top sellers, *Platos de la Ruta*, *La Barra* marquee, specials, patio, reviews |
| `/menu`      | `app/menu/page.js`      | Opens on *La Ruta Completa* (route map), then the filterable listings, per-parada art and *Plato destacado* |
| `/nosotros`  | `app/nosotros/page.js`  | Video hero, story, pillars, *Lo que sale del pase*, postales grid |
| `/visitanos` | `app/visitanos/page.js` | Address / contact / horario, specials, *Pide pa' llevar*, service areas |

## Menu data

`data/menu.json` is the content source of truth: 8 paradas, 29 groups, 112 items with prices and
descriptions. Prices follow the owner's final pricing pass (September 2026), which supersedes both
the printed menu and the earlier $4 Topo Chico correction.
It was extracted programmatically from the logic class of `Ruta16 Menu.dc.html` so nothing was lost
in transcription. `components/MenuBoard.js` renders it and owns the single piece of state on the
site — `active: 'all' | '01'…'08'`. Changing the filter calls
`window.scrollTo({ top: 0 })` (never `scrollIntoView`), and the "ON THE ROAD AHEAD" button advances
the filter to the next parada.

Shared facts (hours, socials, service areas, specials, order/maps URLs) live in `data/site.js`.

Nothing outside the listings hardcodes a price: the home Top Sellers, each parada's *Plato
destacado* and the route map read them through `data/menuLookup.js` (`priceOf`, `paradaStats`),
so a price change in `menu.json` shows up everywhere. Per-parada art lives in `data/menuArt.js`.

### La Ruta Completa

The menu opens on a road map (`components/RouteMap.js`): a highway with one stop per parada, each
showing its dish, dish count and lowest price. The road draws itself, then the Ruta 16 shield
drives it and each stop pulses as it passes. Clicking a stop filters to that parada and scrolls to
the listings (`window.scrollTo`, as before). Below 900px it becomes a vertical road. Stop positions
and the road are computed from one set of points, so they always line up.

## Design system

Tokens are CSS custom properties at the top of `app/globals.css`:

- Navy `#141722` · deep panel `#0e1119` · nav `rgba(20,23,34,.93)` + `backdrop-filter: blur(8px)`
- Red `#e2493b` · blue `#2f6fb5` · light blue `#2f8fd5` · hairline `rgba(255,255,255,.08)`
- Barlow Condensed 500–800 (headings, nav, prices, labels) and Barlow 400–700 (body), loaded with
  `next/font/google` so the woff2 files are self-hosted in the build — no runtime request to Google.

Signature motifs are implemented as reusable classes: `.barSplit` (6px red/blue split bar),
`.ring` (dashed-ring circles, alternating red/blue), `.dotLeader` (dotted leader lines),
`.hero__ghost` / `.parada__ghost` (giant ghost numerals), `.hero__dots` (dot-grid overlay),
`.hero__rail` (vertical rail text).

## Motion

- **Reveal on scroll** — any element with `data-reveal` fades up as it enters the viewport
  (`components/RevealObserver.js`, one observer in the root layout; `--d` staggers siblings). It
  animates the `translate` property so it never fights hover `transform`s, and content is only
  hidden once an inline `<head>` script has marked `<html class="js">` — without JavaScript
  everything is simply visible.
- **Home hero** — the headline lines rise out of a clip, eyebrow/copy/buttons follow, the ghost
  "16" drifts up.
- **Top Sellers** — the dashed ring turns like a wheel on hover while the dish lifts.
- All of it switches off under `prefers-reduced-motion`.

## Assets

All assets are self-hosted under `public/`.

- **Photos** — the ten `.webp` files from the bundle, copied and renamed by subject
  (`torre-mariscos`, `molcajete-aguachile`, `ostiones-r16`, …).
- **Videos** — the two phone-quality source videos re-encoded for web with ffmpeg:
  scaled to 720×1280, audio stripped (they play muted), H.264 CRF 28, `+faststart`.
  `hero-home.mp4` 8.0 MB → **2.0 MB**; `hero-nosotros.mp4` 5.4 MB → **1.3 MB**.
  Each ships a `-poster.webp` still, and the `<video>` elements are
  `autoplay muted loop playsinline preload="metadata"` with the poster as the first paint.
  (VP9/WebM variants were encoded and discarded — both came out larger than the H.264 files.)
- **Dish & drink cut-outs** — the transparent PNGs from the `assets-v2` and `assets-v3` releases,
  resized to the largest box the design renders them in (×2 for retina) and converted to alpha WebP:
  49.9 MB → 3.0 MB for the first 26, 39.4 MB → 2.2 MB for the 19 that followed. 45 in the library, 35 placed. Five v2 images were superseded by better v3 shots and kept rather
  than deleted (`aguachile`, `mar-y-tierra`, `salmon`, `tostadas-ceviche`, `pasta-alfredo`); five v3
  images have no slot that fits them yet (`brochetas`, `caesar-salad`, `pina-malecona`,
  `bucket-tecate`, `bucket-victoria`). `components/Cutout.js` renders them; `data/cutouts.json` carries each file's
  intrinsic size so lazy loading reserves the right box, and the component releases whichever axis
  the CSS does not constrain so the aspect ratio is never squashed.
- **Photos** — the original ten are small (287–680px) and were named from the design bundle's
  notes, which had them mixed up (the file called `patio` was a michelada, `ostiones-r16` was the
  patio). They are renamed to what they actually show, with matching alt text.
- **Social preview** — `public/og.jpg` (1200×630), rendered from the site's own fonts and art.
  `app/sitemap.js` and `app/robots.js` emit `sitemap.xml` / `robots.txt`; URLs use the Vercel
  production domain (`SITE_URL` in `data/site.js`).
- **Logo** — `public/brand/ruta16-logo.png`, the official artwork extracted from the client's
  `LOGO_RUTA_16` PDF (a 406×587 raster with an alpha mask, lifted off the PDF's white page so it sits
  transparent on the navy nav). `public/brand/ruta16-icon.png` is the same mark on a navy square,
  used as the favicon and Apple touch icon. `components/BrandLogo.js` is the only place it is used.

## Known deviations from the handoff

One thing differs from the bundle, deliberately:

1. **Top-seller circles are 3px shorter per row than the design reference.** In the reference the
   photos are inline images, so each ring picks up ~3px of line-box descender space below the photo.
   This build sets `img { display: block }`, which removes it. Everything else on Home matches the
   reference to the pixel; the cumulative page-height difference is 6px across the two rows.

The handoff's logo URL (`ruta16.com/pluto-images/brand-logos/…`) was unreachable from this build
environment, so the mark comes from the client-supplied `LOGO_RUTA_16` PDF instead. It renders at the
58px height the design specifies; since the artwork is portrait (405×587), that works out to 40px
wide in the nav.

Every other measured box — position, size, font size, weight, letter-spacing and color — matches the
rendered design references exactly at 1440px. Menú, Nosotros and Visítanos match to a document height
of 0px difference, and every cut-out renders at the reference's size (two portrait drinks differ by
1px from rounding in the WebP resize).

Three bits of copy in the v2 references still described the 7-parada menu. They were corrected at
the client's request, so these three strings intentionally differ from the design reference:

- Home, above *Platos de la Ruta*: "SIETE PARADAS · UN SOLO VIAJE" → "OCHO PARADAS · UN SOLO VIAJE".
- Home, above *La Barra*: "PARADA 07 · ÚLTIMA PARADA" → "PARADA 08 · ÚLTIMA PARADA" (Cheves, whose
  section tag in the menu data is likewise "ÚLTIMA PARADA").
- Nosotros, second story paragraph: "siete paradas" → "ocho paradas".

## Responsive

Below ~1100px is not designed; `app/globals.css` implements the stacking rules from the handoff:
nav collapses to a hamburger drawer, hero headline drops to 56px (44px under 640px), the parada rail
scrolls horizontally, top sellers go 2-col (1-col under 640px), specials stack, 2-col layouts stack,
menu groups go 1-col, postales go 2-col. No horizontal overflow at 320–1440px.

Two further rules earn their place on phones:

- **Menu rows wrap.** In one narrow column a long name plus a multi-price string ("6 pc $13 · 12 pc
  $17 · 16 pc $21") made the row wider than its section, and `overflow: hidden` (there for the ghost
  numerals) cut the price off. Below 1100px the row wraps: the price drops to its own line,
  right-aligned, and keeps the leader dots.
- **Hero cut-outs stay.** Rather than hiding them, the three hero cut-outs move above the copy —
  into what is otherwise dead video space — capped in size so they never reach the headline. The
  eyebrows drop to 15px/3px tracking there so the 8px desktop tracking does not orphan a word.

## External links

All open in a new tab with `rel="noopener noreferrer"`: Order Online → Toast, address → Google Maps,
Instagram `r16_pasadena`, Facebook, TikTok `@mariscosr16`. Phone numbers are `tel:` links.
