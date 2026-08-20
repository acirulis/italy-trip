/**
 * Navigation and geospatial utility helpers
 */

// Generate standard Waze 1-click navigation deep link
export function getWazeUrl(lat: number, lng: number): string {
  return `https://waze.com/ul?ll=${lat.toFixed(6)},${lng.toFixed(6)}&navigate=yes`;
}

// Generate Google Maps driving directions link starting from living base
export function getGoogleMapsDirUrl(
  originLat: number,
  originLng: number,
  destLat: number,
  destLng: number,
  customPlaceUrl?: string
): string {
  if (customPlaceUrl && customPlaceUrl.includes('google.com/maps')) {
    return customPlaceUrl;
  }
  return `https://www.google.com/maps/dir/?api=1&origin=${originLat.toFixed(6)},${originLng.toFixed(6)}&destination=${destLat.toFixed(6)},${destLng.toFixed(6)}&travelmode=driving`;
}

// Calculate straight-line distance in km (Haversine formula)
export function calculateHaversineDistanceKm(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(1));
}

// Estimate realistic driving distance accounting for winding Tuscan country roads (~1.28 - 1.35 multiplier)
export function estimateDrivingDistanceAndMinutes(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): { distanceKm: number; timeMin: number } {
  const straightKm = calculateHaversineDistanceKm(lat1, lon1, lat2, lon2);
  // Average winding factor for Tuscan hills (SP roads)
  const roadKm = Number((straightKm * 1.32).toFixed(1));
  // Average mountain/rural speed ~45 km/h in Val d'Orcia
  const minutes = Math.max(5, Math.round((roadKm / 45) * 60));
  return { distanceKm: roadKm, timeMin: minutes };
}

// Fetch real road route geometry from public OSRM service with instant timeout fallback
export async function fetchDrivingRouteCoordinates(
  originLat: number,
  originLng: number,
  destLat: number,
  destLng: number
): Promise<{ coordinates: [number, number][]; distanceKm: number; durationMin: number }> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const url = `https://router.project-osrm.org/route/v1/driving/${originLng},${originLat};${destLng},${destLat}?overview=full&geometries=geojson`;
    const res = await fetch(url, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data.routes && data.routes.length > 0) {
        const route = data.routes[0];
        // OSRM returns [lng, lat], Leaflet polyline expects [lat, lng]
        const latLngCoords: [number, number][] = route.geometry.coordinates.map(
          (c: [number, number]) => [c[1], c[0]]
        );
        const distanceKm = Number((route.distance / 1000).toFixed(1));
        const durationMin = Math.max(1, Math.round(route.duration / 60));
        return { coordinates: latLngCoords, distanceKm, durationMin };
      }
    }
  } catch {
    // Graceful fallback to direct line
  }

  const { distanceKm, timeMin } = estimateDrivingDistanceAndMinutes(originLat, originLng, destLat, destLng);
  return {
    coordinates: [
      [originLat, originLng],
      [destLat, destLng],
    ],
    distanceKm,
    durationMin: timeMin,
  };
}

// Generate simple GPX file content for download
export function exportToGpx(
  title: string,
  origin: { lat: number; lng: number; name: string },
  destination: { lat: number; lng: number; name: string }
): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Italy Trip Hub" xmlns="http://www.topografix.com/GPX/1/1">
  <metadata>
    <name>${title}</name>
    <desc>Route from ${origin.name} to ${destination.name}</desc>
  </metadata>
  <wpt lat="${origin.lat}" lon="${origin.lng}">
    <name>${origin.name}</name>
    <sym>Residence</sym>
  </wpt>
  <wpt lat="${destination.lat}" lon="${destination.lng}">
    <name>${destination.name}</name>
    <sym>Flag</sym>
  </wpt>
  <rte>
    <name>${title}</name>
    <rtept lat="${origin.lat}" lon="${origin.lng}">
      <name>Start: ${origin.name}</name>
    </rtept>
    <rtept lat="${destination.lat}" lon="${destination.lng}">
      <name>End: ${destination.name}</name>
    </rtept>
  </rte>
</gpx>`;
}

// Render a driving duration as hours + minutes ("50 min", "1h 20min", "2h")
export function formatDriveTime(totalMinutes: number): string {
  const minutes = Math.max(0, Math.round(totalMinutes));
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (hours === 0) return `${rest} min`;
  if (rest === 0) return `${hours}h`;
  return `${hours}h ${rest}min`;
}
