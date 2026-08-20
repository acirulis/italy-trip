/**
 * Resolves an app-relative asset path against Vite's configured base URL.
 *
 * Curated content in `defaultRoutes.ts` references images as `/images/...`,
 * which only resolves when the app is served from the domain root. On GitHub
 * Pages the app lives under `/<repo>/`, so those paths must be rebased.
 * Absolute URLs, data URIs and already-based paths are returned untouched.
 */
export const withBasePath = (url: string): string => {
  if (!url) return url;
  if (/^([a-z]+:)?\/\//i.test(url) || url.startsWith('data:') || url.startsWith('blob:')) {
    return url;
  }

  const base = import.meta.env.BASE_URL || '/';
  if (base === '/' || base === './') return url;
  if (url.startsWith(base)) return url;

  return `${base.replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
};
