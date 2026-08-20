/**
 * Deep-linkable URL state.
 *
 * The app ships as a static bundle on GitHub Pages, which has no SPA fallback —
 * a real path like /italy-trip/route/pienza-unesco-ring would 404 before any JS
 * runs. So the canonical shape is hash-based and always resolvable:
 *
 *   #/                          nothing selected
 *   #/route/<id>                route selected and traced on the map
 *   #/route/<id>/guide          route selected with its guide modal open
 *
 * Older/hand-written `?route=<id>&guide=1` query links are also understood and
 * normalised to the hash form on load.
 */

export interface RouteUrlState {
  routeId: string | null;
  guideOpen: boolean;
}

export const EMPTY_ROUTE_URL_STATE: RouteUrlState = { routeId: null, guideOpen: false };

/** Builds the canonical hash for a selection, e.g. `#/route/pienza-unesco-ring/guide`. */
export const buildRouteHash = (routeId: string | null, guideOpen = false): string => {
  if (!routeId) return '#/';
  return `#/route/${encodeURIComponent(routeId)}${guideOpen ? '/guide' : ''}`;
};

/** Reads a `#/route/<id>[/guide]` hash, tolerating a missing or legacy-shaped one. */
export const parseRouteHash = (hash: string): RouteUrlState => {
  const cleaned = hash.replace(/^#\/?/, '').replace(/\/+$/, '');
  if (!cleaned) return EMPTY_ROUTE_URL_STATE;

  const segments = cleaned.split('/').filter(Boolean);
  if (segments[0] !== 'route' || !segments[1]) return EMPTY_ROUTE_URL_STATE;

  return {
    routeId: decodeURIComponent(segments[1]),
    guideOpen: segments[2] === 'guide',
  };
};

/** Fallback for `?route=<id>&guide=1` links shared before hash routing existed. */
export const parseRouteQuery = (search: string): RouteUrlState => {
  const params = new URLSearchParams(search);
  const routeId = params.get('route');
  if (!routeId) return EMPTY_ROUTE_URL_STATE;
  const guide = params.get('guide');
  return { routeId, guideOpen: guide === '1' || guide === 'true' };
};

/** Current URL state, hash first and query as a fallback. */
export const readRouteUrlState = (
  hash: string = window.location.hash,
  search: string = window.location.search
): RouteUrlState => {
  const fromHash = parseRouteHash(hash);
  return fromHash.routeId ? fromHash : parseRouteQuery(search);
};

/** Absolute, shareable link to a route (optionally opening straight into the guide). */
export const getRoutePermalink = (routeId: string, guideOpen = false): string => {
  const { origin, pathname } = window.location;
  return `${origin}${pathname}${buildRouteHash(routeId, guideOpen)}`;
};
