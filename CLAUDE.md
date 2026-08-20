# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page React + Vite app ("Italy Trip Hub") that acts as a route companion for a Tuscany trip: one *living base* location plus a catalog of day-trip routes (thermal springs, hikes, hill towns, wine), each with an interactive Leaflet map, real driving geometry, and deep links to Waze / Google Maps / Apple Maps.

**There is no server and no AI/LLM call anywhere in `src/`** — it is a purely client-side static app with no API keys. Don't assume a backend exists.

## Commands

```bash
npm install          # package-lock.json is the committed lockfile
npm run dev          # vite on port 3000, host 0.0.0.0
npm run build
npm run preview
npm run lint         # tsc --noEmit — this is the only check; there is no test suite and no ESLint
```

There are no tests. `npm run lint` (type-check) is the verification step for any change.

`DISABLE_HMR=true` disables both HMR and file watching (`vite.config.ts`); it exists so automated in-place edits don't trigger reload flicker. Leave that block alone.

## Architecture

State lives entirely in `src/App.tsx` — there is no store, router, or context. Everything below flows from props.

**Persistence & the merge-on-load rule.** Two `localStorage` keys: `italy_base_location` and `italy_trip_routes`. On boot, saved routes are *merged over* `DEFAULT_ROUTES` by `id` rather than replacing them: the saved copy wins for user-edited fields, but `photoUrl`, `gallery`, and `isPrimaryPick` are always taken from `defaultRoutes.ts`, and user routes (`isUserCreated`) are appended. This is deliberate — it lets edits to curated content ship to returning users. If you add a field to `RouteItem` that must stay authoritative in code, add it to that override list in `App.tsx`; otherwise stale localStorage will shadow it.

**Distances are computed, not authoritative.** The `distanceKm` / `drivingTimeMin` values in `defaultRoutes.ts` are seed values only — an effect in `App.tsx` recomputes every route whenever the base location changes, via `estimateDrivingDistanceAndMinutes` (Haversine × 1.32 winding factor, 45 km/h average). Selecting a route then calls `fetchDrivingRouteCoordinates`, which hits the public OSRM demo server (`router.project-osrm.org`) with a 4s abort and silently falls back to a straight line plus the estimate. Any code touching distance must tolerate both sources.

**Components** (`src/components/`) are presentational and receive `baseLocation` + callbacks:
- `InteractiveMap.tsx` — imperative Leaflet, mounted via refs (`mapInstanceRef`, layer-group refs), not react-leaflet. Separate effects own init, tile-layer swap, markers, and the active polyline; keep that separation when editing. Tile layers are defined in the local `TILE_CONFIG` map, keyed by `MapTileLayerType`. Clicking bare map emits coordinates that prefill the add-route modal.
- `RouteCard.tsx` / `RouteDetailModal.tsx` / `ImageGallery.tsx` / `LivingBaseCard.tsx` / `AddRouteModal.tsx` — user routes get `id: custom-<timestamp>` and `isUserCreated: true`.

**Navigation links** are all generated in `src/utils/navigation.ts` (Waze/Google/Apple deep links, GPX export). Never hand-build a maps URL in a component. `getGoogleMapsDirUrl` prefers a route's curated `googleMapsUrl` when it points at google.com/maps.

`src/types.ts` is the single source of truth for `RouteItem`, `BaseLocation`, `RouteCategory`, `MapTileLayerType`.

## Content conventions

`src/data/defaultRoutes.ts` is the curated content file — long, prose-heavy entries with `highlights` and `practicalTips` written in a travel-guide voice. New routes should match that density and tone.

Images are static files under `public/images/<place-slug>/<descriptive-name>.jpg`, referenced as `/images/...`. Filenames are SEO-descriptive, not abbreviated. `gallery` entries accept either a bare URL string or `{ url, caption }`.

**Always downscale images for web and phone view before committing them.** Never commit a camera- or Maps-resolution original (multi-megapixel, multi-megabyte) — the app has no `srcset` and serves one file per image to both desktop and mobile, so the committed file *is* the display file. Every image under `public/images/` must be:

- **max 1200px on the long edge** (the existing house size; phones at 2x still get a sharp image at typical card/gallery widths),
- **progressive JPEG, quality ~78-82, 4:2:0 chroma**, with all EXIF/metadata stripped,
- **under ~350KB**; drop quality (not below ~72) before raising dimensions if a dense, detailed photo overshoots.

The one-liner that produces a compliant file:

```bash
convert source.jpg -auto-orient -resize '1200x1200>' -strip \
  -sampling-factor 4:2:0 -interlace JPEG -quality 78 \
  public/images/<place-slug>/<descriptive-name>.jpg
```

Verify with `identify -format "%f %wx%h %b\n" public/images/*/*.jpg` — anything wider than 1200px or heavier than ~350KB should be re-encoded, not committed.

## Styling

Tailwind v4 via `@tailwindcss/vite` (no `tailwind.config.js`; `@import "tailwindcss"` in `src/index.css`). Colors are written as inline hex arbitrary values (`bg-[#FAF8F5]`, `text-[#B4643B]`) throughout the JSX; the warm Tuscan palette is also mirrored as CSS variables in `index.css`, and per-category color sets are duplicated in local helpers like `getCategoryTheme` in `RouteCard.tsx`. Match the surrounding hex-literal style rather than introducing a new theming layer. Leaflet's CSS and Google Fonts load from CDN in `index.html`.

The `@` path alias resolves to the project root (not `src/`), though current code uses relative imports.

## Git workflow

**`main` is the only branch. Always work directly on `main`.** Never create a branch, never create a git worktree (including automated/cloud sessions — if a harness offers to isolate work in a worktree, decline and edit `main` in place), never rebase, and never amend or reorder earlier commits. If stray branches or worktrees ever appear, merge them back into `main` and delete them.

The repo has one remote, `origin` (`github.com/acirulis/italy-trip`), and `main` there is what GitHub Pages deploys: `.github/workflows/deploy.yml` builds and publishes on every push to `main`. So a push to `main` is a production deploy — only push when the user asks.

**Commit each finished feature as its own commit on `main`.** This is standing authorization: when a feature is complete and `npm run lint` passes, commit it without asking. Rules:

- One commit per feature — not one per file, and not one bundle at the end of a session. If a session delivers three features, that's three commits.
- Commit only when the feature actually works; don't commit a half-built state to "checkpoint" it.
- Stay on `main` — see the single-branch rule above.
- Run `npm run lint` before each commit; a failing type-check means the feature isn't finished.
- Subject line names the user-visible feature (e.g. `Add GPX export to route detail modal`), not the files touched.
- Leave unrelated in-progress edits out of the commit — stage the feature's files explicitly rather than `git add -A`.

If the repo has no `.git` yet, initialize it on `main` first: `git init -b main`. `.gitignore` already covers `node_modules/`, `dist/`, and `.env*`.
