export type RouteCategory = 
  | 'thermal' 
  | 'trekking' 
  | 'sightseeing' 
  | 'viewpoint';

export interface RouteImage {
  url: string;
  caption?: string;
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
  hikingTimeMin?: number; // optional hiking/walking duration
  trailDifficulty?: 'Easy' | 'Moderate' | 'Challenging';
  elevationGainM?: number;
  bestTimeToVisit?: string;
  practicalTips: string[];
  googleMapsUrl?: string;
  wazeUrl?: string;
  appleMapsUrl?: string;
  photoUrl?: string;
  gallery?: (string | RouteImage)[];
  isUserCreated?: boolean;
  isPrimaryPick?: boolean;
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
