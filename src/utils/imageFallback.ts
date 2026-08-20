import type { SyntheticEvent } from 'react';

/**
 * Shared placeholder for photos that fail to load (missing file, corrupt bytes,
 * offline). Rendered inline as a data URI so it never triggers a second request.
 */
const FALLBACK_SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="#EFECE6"/>
  <path d="M0 430 L210 300 L340 380 L470 250 L620 350 L800 240 L800 600 L0 600 Z" fill="#DED8CB"/>
  <path d="M0 500 L180 420 L360 480 L560 400 L800 470 L800 600 L0 600 Z" fill="#CFC7B6"/>
  <circle cx="640" cy="150" r="46" fill="#E4D7C4"/>
  <text x="400" y="560" text-anchor="middle" font-family="Georgia, serif" font-size="30" fill="#9E988A">Photo unavailable</text>
</svg>`;

export const IMAGE_FALLBACK_SRC = `data:image/svg+xml;utf8,${encodeURIComponent(FALLBACK_SVG)}`;

/** Swap a broken photo for the placeholder exactly once (avoids an error loop). */
export const handleImageError = (event: SyntheticEvent<HTMLImageElement>) => {
  const img = event.currentTarget;
  if (img.dataset.fallbackApplied === 'true') return;
  img.dataset.fallbackApplied = 'true';
  img.src = IMAGE_FALLBACK_SRC;
};
