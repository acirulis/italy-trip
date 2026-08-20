import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { BaseLocation, MapTileLayerType, RouteItem } from '../types';
import { getWazeUrl, getGoogleMapsDirUrl } from '../utils/navigation';
import { Layers, Navigation, Home, ZoomIn, ZoomOut, Compass, MapPin, Sparkles } from 'lucide-react';

interface InteractiveMapProps {
  baseLocation: BaseLocation;
  routes: RouteItem[];
  selectedRouteId: string | null;
  onSelectRoute: (id: string) => void;
  onOpenDetails?: (route: RouteItem) => void;
  activePolylineCoordinates?: [number, number][];
  activeDistanceKm?: number;
  activeDurationMin?: number;
}

const TILE_CONFIG: Record<
  MapTileLayerType,
  { url: string; attribution: string; maxZoom: number; label: string }
> = {
  osm: {
    label: 'Standard OSM',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19,
  },
  topo: {
    label: 'Topographic / Trails',
    url: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a>',
    maxZoom: 17,
  },
  satellite: {
    label: 'Satellite Imagery',
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
    maxZoom: 18,
  },
  voyager: {
    label: 'Clean Voyager',
    url: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
    maxZoom: 19,
  },
};

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  baseLocation,
  routes,
  selectedRouteId,
  onSelectRoute,
  onOpenDetails,
  activePolylineCoordinates,
  activeDistanceKm,
  activeDurationMin,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const tileLayerRef = useRef<L.TileLayer | null>(null);
  const markersGroupRef = useRef<L.LayerGroup | null>(null);
  const polylineLayerRef = useRef<L.Polyline | null>(null);
  const startEndMarkersRef = useRef<L.LayerGroup | null>(null);

  const [currentLayerType, setCurrentLayerType] = useState<MapTileLayerType>('voyager');
  const [showLayerMenu, setShowLayerMenu] = useState(false);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [baseLocation.lat, baseLocation.lng],
      zoom: 11,
      zoomControl: false,
    });

    const cfg = TILE_CONFIG[currentLayerType];
    const tileLayer = L.tileLayer(cfg.url, {
      attribution: cfg.attribution,
      maxZoom: cfg.maxZoom,
    }).addTo(map);

    tileLayerRef.current = tileLayer;
    markersGroupRef.current = L.layerGroup().addTo(map);
    startEndMarkersRef.current = L.layerGroup().addTo(map);
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Tile Layer when layer type changes
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    if (tileLayerRef.current) {
      map.removeLayer(tileLayerRef.current);
    }

    const cfg = TILE_CONFIG[currentLayerType];
    const newTileLayer = L.tileLayer(cfg.url, {
      attribution: cfg.attribution,
      maxZoom: cfg.maxZoom,
    }).addTo(map);

    tileLayerRef.current = newTileLayer;
  }, [currentLayerType]);

  // Update Markers (Base Location + Route Points)
  useEffect(() => {
    if (!mapInstanceRef.current || !markersGroupRef.current) return;
    const group = markersGroupRef.current;
    group.clearLayers();

    // 1. Living Base Pin (Distinct Terracotta pulsing marker)
    const baseIconHtml = `
      <div class="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2 cursor-pointer group">
        <div class="w-12 h-12 rounded-full bg-[#B4643B]/25 living-pulse-icon absolute"></div>
        <div class="w-9 h-9 rounded-full bg-gradient-to-tr from-[#B4643B] to-[#D48259] border-2 border-white shadow-lg flex items-center justify-center text-white z-10 hover:scale-110 transition-transform">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
        </div>
        <div class="absolute -bottom-6 bg-[#232722]/95 backdrop-blur-xs text-[#FBF0E8] text-[10px] font-bold px-2 py-0.5 rounded-md shadow whitespace-nowrap pointer-events-none border border-[#444B3F]">
          LIVING BASE
        </div>
      </div>
    `;

    const baseIcon = L.divIcon({
      html: baseIconHtml,
      className: 'custom-base-marker',
      iconSize: [36, 36],
      iconAnchor: [18, 18],
      popupAnchor: [0, -22],
    });

    const baseMarker = L.marker([baseLocation.lat, baseLocation.lng], { icon: baseIcon });
    const baseWaze = getWazeUrl(baseLocation.lat, baseLocation.lng);
    const baseGmaps = `https://www.google.com/maps/search/?api=1&query=${baseLocation.lat},${baseLocation.lng}`;

    baseMarker.bindPopup(`
      <div class="p-3 max-w-xs font-sans">
        <div class="flex items-center gap-2 mb-1.5">
          <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-[#FBF0E8] text-[#9A4C25] uppercase tracking-wide border border-[#ECD4C3]">Living Base</span>
          <span class="text-xs text-[#6B665A] font-mono">${baseLocation.lat.toFixed(4)}, ${baseLocation.lng.toFixed(4)}</span>
        </div>
        <h4 class="font-bold text-sm text-[#333028] mb-1 font-display">${baseLocation.name}</h4>
        <p class="text-xs text-[#6B665A] mb-3">${baseLocation.description}</p>
        <div class="grid grid-cols-2 gap-1.5 pt-2 border-t border-[#EFECE4]">
          <a href="${baseWaze}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-1 bg-[#00A0DC] hover:bg-[#008CBE] text-white text-[11px] font-bold py-1.5 px-2 rounded-lg transition">
            <span>Waze Home</span>
          </a>
          <a href="${baseGmaps}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-1 bg-[#607B57] hover:bg-[#4F6847] text-white text-[11px] font-semibold py-1.5 px-2 rounded-lg transition">
            <span>Google Maps</span>
          </a>
        </div>
      </div>
    `, { className: 'custom-popup' });

    group.addLayer(baseMarker);

    // 2. Route Destination Markers
    routes.forEach((route) => {
      const isSelected = selectedRouteId === route.id;
      let categoryBg = 'bg-[#3D3A30]';
      let categoryEmoji = '📍';

      if (route.category === 'thermal') {
        categoryBg = 'bg-[#4E878C]';
        categoryEmoji = '♨️';
      } else if (route.category === 'trekking') {
        categoryBg = 'bg-[#607B57]';
        categoryEmoji = '🥾';
      } else if (route.category === 'ferrata') {
        categoryBg = 'bg-[#6B7A85]';
        categoryEmoji = '🧗';
      } else if (route.category === 'sightseeing') {
        categoryBg = 'bg-[#B4643B]';
        categoryEmoji = '🏰';
      } else if (route.category === 'viewpoint') {
        categoryBg = 'bg-[#5A6B5C]';
        categoryEmoji = '🔭';
      }

      const isPrimary = Boolean(route.isPrimaryPick);

      const markerHtml = `
        <div class="relative flex flex-col items-center cursor-pointer group">
          <div class="w-8 h-8 rounded-full ${categoryBg} ${isSelected ? 'ring-4 ring-[#B4643B] scale-125' : 'hover:scale-110'} ${isPrimary ? 'ring-2 ring-[#4E878C]' : ''} border-2 border-white shadow-md flex items-center justify-center text-xs text-white transition-all">
            <span>${categoryEmoji}</span>
          </div>
          <div class="mt-1 bg-white/95 backdrop-blur-xs text-[#333028] text-[10px] font-semibold px-1.5 py-0.5 rounded shadow-sm border border-[#E6E1D6] whitespace-nowrap max-w-[120px] truncate ${isSelected ? 'font-bold text-[#B4643B] border-[#ECD4C3] bg-[#FBF0E8]' : ''}">
            ${route.title.split(' ')[0]} ${route.distanceKm ? `(${route.distanceKm}km)` : ''}
          </div>
        </div>
      `;

      const routeIcon = L.divIcon({
        html: markerHtml,
        className: 'custom-route-marker',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
        popupAnchor: [0, -18],
      });

      const marker = L.marker([route.lat, route.lng], { icon: routeIcon });
      const wazeLink = getWazeUrl(route.lat, route.lng);
      const gmapsLink = getGoogleMapsDirUrl(baseLocation.lat, baseLocation.lng, route.lat, route.lng, route.googleMapsUrl);

      const photoCount = route.gallery && route.gallery.length > 0 ? route.gallery.length : 1;

      marker.bindPopup(`
        <div class="p-3 max-w-xs font-sans">
          <div class="flex items-center justify-between gap-2 mb-1.5">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
              route.category === 'thermal' ? 'bg-[#EBF4F5] text-[#2F6166]' :
              route.category === 'trekking' ? 'bg-[#EEF3EC] text-[#3F5B37]' :
              route.category === 'ferrata' ? 'bg-[#EDF1F4] text-[#3B4C57]' :
              route.category === 'sightseeing' ? 'bg-[#FBF0E8] text-[#9A4C25]' : 'bg-[#F2EFE9] text-[#333028]'
            }">
              ${route.category}
            </span>
            <span class="text-xs font-bold text-[#6B665A] font-mono">${route.distanceKm} km &bull; ~${route.drivingTimeMin} min</span>
          </div>

          <!-- Clickable Title opening Guide & Gallery -->
          <div class="mb-1 cursor-pointer group/title" data-open-details-id="${route.id}">
            <h4 class="font-bold text-sm text-[#333028] group-hover/title:text-[#B4643B] font-display flex items-center justify-between gap-1 leading-tight">
              <span class="group-hover/title:underline">${route.title}</span>
              <span class="text-[10px] font-semibold text-[#B4643B] bg-[#FBF0E8] px-1.5 py-0.5 rounded border border-[#ECD4C3] shrink-0">Guide &rarr;</span>
            </h4>
          </div>

          <p class="text-xs text-[#6B665A] mb-2.5 line-clamp-2">${route.description}</p>

          <!-- Primary Action Button: Open Guide & Gallery -->
          <button type="button" data-open-details-id="${route.id}" class="w-full mb-2.5 flex items-center justify-center gap-1.5 bg-[#FAF5EE] hover:bg-[#F3ECE0] text-[#9A4C25] hover:text-[#7A3614] border border-[#ECD4C3] hover:border-[#B4643B] text-xs font-bold py-1.5 px-2 rounded-lg shadow-xs transition cursor-pointer">
            <span>📖 Open Guide & Gallery (${photoCount} ${photoCount === 1 ? 'photo' : 'photos'})</span>
          </button>

          <!-- Secondary Navigation -->
          <div class="pt-1.5 border-t border-[#EFECE4]">
            <div class="text-[9px] font-bold uppercase tracking-wider text-[#9E988A] mb-1">Navigation (Secondary)</div>
            <div class="grid grid-cols-2 gap-1.5">
              <a href="${wazeLink}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-1 bg-[#00A0DC] hover:bg-[#008CBE] text-white text-[11px] font-bold py-1.5 px-2 rounded-lg transition">
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/></svg>
                <span>Waze Nav</span>
              </a>
              <a href="${gmapsLink}" target="_blank" rel="noopener noreferrer" class="flex items-center justify-center gap-1 bg-[#607B57] hover:bg-[#4F6847] text-white text-[11px] font-semibold py-1.5 px-2 rounded-lg transition">
                <span>Google Maps</span>
              </a>
            </div>
          </div>
        </div>
      `, { className: 'custom-popup' });

      marker.on('click', () => {
        onSelectRoute(route.id);
      });

      group.addLayer(marker);
    });
  }, [baseLocation, routes, selectedRouteId]);

  // Handle active polyline drawing & camera fitting
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    if (polylineLayerRef.current) {
      map.removeLayer(polylineLayerRef.current);
      polylineLayerRef.current = null;
    }

    if (activePolylineCoordinates && activePolylineCoordinates.length > 0) {
      const polyline = L.polyline(activePolylineCoordinates, {
        color: '#B4643B', // Warm Tuscan terracotta road line
        weight: 5,
        opacity: 0.9,
        lineCap: 'round',
        lineJoin: 'round',
        dashArray: undefined,
      }).addTo(map);

      polylineLayerRef.current = polyline;

      // Fit bounds to show both origin and destination cleanly
      const bounds = L.latLngBounds(activePolylineCoordinates);
      map.fitBounds(bounds, { padding: [60, 60], maxZoom: 13 });
    }
  }, [activePolylineCoordinates]);

  const handleCenterBase = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo([baseLocation.lat, baseLocation.lng], 12, { duration: 1.2 });
    }
  };

  const handleFitAllRoutes = () => {
    if (!mapInstanceRef.current) return;
    const points: [number, number][] = [
      [baseLocation.lat, baseLocation.lng],
      ...routes.map((r) => [r.lat, r.lng] as [number, number]),
    ];
    const bounds = L.latLngBounds(points);
    mapInstanceRef.current.fitBounds(bounds, { padding: [50, 50] });
  };

  const handleZoomIn = () => {
    mapInstanceRef.current?.zoomIn();
  };

  const handleZoomOut = () => {
    mapInstanceRef.current?.zoomOut();
  };

  return (
    <div className="relative w-full h-full min-h-[480px] rounded-2xl overflow-hidden shadow-xs border border-[#E6E1D6] bg-[#EFECE6]">
      {/* Map Container */}
      <div
        ref={mapContainerRef}
        onClick={(e) => {
          const target = (e.target as HTMLElement).closest('[data-open-details-id]');
          if (target) {
            const routeId = target.getAttribute('data-open-details-id');
            if (routeId && onOpenDetails) {
              const found = routes.find((r) => r.id === routeId);
              if (found) {
                onOpenDetails(found);
              }
            }
          }
        }}
        className="w-full h-full"
        id="leaflet-map-canvas"
      />

      {/* Floating Active Route Banner if selected */}
      {activeDistanceKm !== undefined && activeDurationMin !== undefined && (
        <div className="absolute top-4 left-4 z-[1000] bg-white/95 backdrop-blur-md rounded-xl shadow-md border border-[#E6E1D6] px-3.5 py-2.5 flex items-center gap-3 text-[#333028]">
          <div className="w-8 h-8 rounded-lg bg-[#FBF0E8] text-[#B4643B] flex items-center justify-center shrink-0">
            <Navigation className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[11px] font-semibold text-[#8A8477] uppercase tracking-wider">Driving from Base</div>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-extrabold text-[#333028] font-mono">{activeDistanceKm} km</span>
              <span className="text-xs text-[#6B665A] font-medium">~{activeDurationMin} mins driving</span>
            </div>
          </div>
        </div>
      )}

      {/* Map Layer Switcher Control */}
      <div className="absolute top-4 right-4 z-[1000]">
        <div className="relative">
          <button
            id="map-layer-selector-btn"
            onClick={() => setShowLayerMenu(!showLayerMenu)}
            className="flex items-center gap-1.5 bg-white/95 hover:bg-white text-[#4A453B] text-xs font-semibold px-3 py-2 rounded-xl shadow-md border border-[#E6E1D6] transition cursor-pointer"
            title="Change Map Style"
          >
            <Layers className="w-4 h-4 text-[#6B665A]" />
            <span className="hidden sm:inline">{TILE_CONFIG[currentLayerType].label}</span>
          </button>

          {showLayerMenu && (
            <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-xl shadow-xl border border-[#E6E1D6] py-1 z-50 animate-in fade-in slide-in-from-top-1">
              <div className="px-3 py-1.5 text-[10px] font-bold text-[#9E988A] uppercase tracking-wider">
                Map Layer Style
              </div>
              {(Object.keys(TILE_CONFIG) as MapTileLayerType[]).map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    setCurrentLayerType(key);
                    setShowLayerMenu(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#FAF8F5] transition cursor-pointer ${
                    currentLayerType === key ? 'text-[#B4643B] font-bold bg-[#FBF0E8]' : 'text-[#4A453B]'
                  }`}
                >
                  <span>{TILE_CONFIG[key].label}</span>
                  {currentLayerType === key && <span className="w-1.5 h-1.5 rounded-full bg-[#B4643B]" />}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Quick Controls */}
      <div className="absolute bottom-4 right-4 z-[1000] flex flex-col gap-2">
        <button
          id="center-base-btn"
          onClick={handleCenterBase}
          className="w-9 h-9 bg-white/95 hover:bg-[#B4643B] hover:text-white text-[#4A453B] rounded-xl shadow-md border border-[#E6E1D6] flex items-center justify-center transition group cursor-pointer"
          title="Center Living Base (Home)"
        >
          <Home className="w-4 h-4" />
        </button>
        <button
          id="fit-all-routes-btn"
          onClick={handleFitAllRoutes}
          className="w-9 h-9 bg-white/95 hover:bg-[#232722] hover:text-white text-[#4A453B] rounded-xl shadow-md border border-[#E6E1D6] flex items-center justify-center transition cursor-pointer"
          title="Fit All Tuscany Routes on Screen"
        >
          <Compass className="w-4 h-4" />
        </button>
        <div className="flex flex-col bg-white/95 rounded-xl shadow-md border border-[#E6E1D6] overflow-hidden">
          <button
            onClick={handleZoomIn}
            className="w-9 h-8 hover:bg-[#F4F1EA] text-[#4A453B] flex items-center justify-center border-b border-[#E6E1D6] cursor-pointer"
            title="Zoom in"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-9 h-8 hover:bg-[#F4F1EA] text-[#4A453B] flex items-center justify-center cursor-pointer"
            title="Zoom out"
          >
            <ZoomOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Legend pill bottom left */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-white/90 backdrop-blur-xs px-3 py-1.5 rounded-lg shadow-xs border border-[#E6E1D6] text-[11px] text-[#6B665A] flex items-center gap-3 hidden sm:flex">
        <span className="flex items-center gap-1 font-medium"><span className="w-2.5 h-2.5 rounded-full bg-[#B4643B] inline-block"></span> Base</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#4E878C] inline-block"></span> Springs</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#607B57] inline-block"></span> Trekking</span>
        <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-[#B4643B] inline-block"></span> Sightseeing</span>
      </div>
    </div>
  );
};
