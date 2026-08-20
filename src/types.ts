export type RouteCategory = 
  | 'thermal' 
  | 'trekking' 
  | 'ferrata' 
  | 'sightseeing' 
  | 'viewpoint';

export interface RouteImage {
  url: string;
  caption?: string;
}

export interface RouteWaypoint {
  /** Short label shown on the map pin and in the guide, e.g. "Cable car top station". */
  name: string;
  lat: number;
  lng: number;
  /** Emoji rendered inside the pin; falls back to a generic marker. */
  icon?: string;
  /** One line explaining why this point matters on the route. */
  note?: string;
  /** Curated google.com/maps link for this exact point, used for the directions deep link. */
  googleMapsUrl?: string;
}

export interface RouteItem {
  id: string;
  title: string;
  subtitle: string;
  category: RouteCategory;
  lat: number;
  lng: number;
  description: string;
  highlights: string[];
  distanceKm: number; // approximate road distance from base
  drivingTimeMin: number; // approximate driving time in minutes
  // Real-world driving time (e.g. from Google Maps) for routes where the
  // Haversine/45 km/h estimator is badly wrong — long motorway trips. When set,
  // it wins over both the estimator and the OSRM duration.
  curatedDrivingTimeMin?: number;
  hikingTimeMin?: number; // optional hiking/walking duration
  trailDifficulty?: 'Easy' | 'Moderate' | 'Challenging';
  elevationGainM?: number;
  bestTimeToVisit?: string;
  practicalTips: string[];
  googleMapsUrl?: string;
  wazeUrl?: string;
  photoUrl?: string;
  gallery?: (string | RouteImage)[];
  isPrimaryPick?: boolean;
  /** Secondary points pinned on the map alongside the main destination (trailheads, lifts, huts). */
  waypoints?: RouteWaypoint[];
}

export interface BaseLocation {
  name: string;
  region: string;
  address: string;
  lat: number;
  lng: number;
  description: string;
}

export type MapTileLayerType = 'osm' | 'topo' | 'satellite' | 'voyager';
