/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { BaseLocation, RouteCategory, RouteItem } from './types';
import { INITIAL_BASE_LOCATION, DEFAULT_ROUTES } from './data/defaultRoutes';
import { Header } from './components/Header';
import { LivingBaseCard } from './components/LivingBaseCard';
import { InteractiveMap } from './components/InteractiveMap';
import { RouteCard } from './components/RouteCard';
import { RouteDetailModal } from './components/RouteDetailModal';
import { AddRouteModal } from './components/AddRouteModal';
import { fetchDrivingRouteCoordinates, estimateDrivingDistanceAndMinutes } from './utils/navigation';
import { 
  Search, 
  SlidersHorizontal, 
  MapPin, 
  Footprints, 
  Waves, 
  Castle, 
  Sparkles, 
  Compass, 
  Check, 
  ArrowUpDown,
  Navigation
} from 'lucide-react';

export default function App() {
  // 1. Persistent State for Living Base Location & Custom Routes
  const [baseLocation, setBaseLocation] = useState<BaseLocation>(() => {
    const saved = localStorage.getItem('italy_base_location');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // ignore parse error
      }
    }
    return INITIAL_BASE_LOCATION;
  });

  const [routes, setRoutes] = useState<RouteItem[]>(() => {
    const saved = localStorage.getItem('italy_trip_routes');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Merge default routes with latest gallery/photo definitions, while preserving user routes
          const merged = DEFAULT_ROUTES.map((defaultItem) => {
            const savedItem = parsed.find((p: RouteItem) => p.id === defaultItem.id);
            if (savedItem) {
              return {
                ...defaultItem,
                ...savedItem,
                // Ensure latest default galleries, photos, and primary pick designations are used
                photoUrl: defaultItem.photoUrl,
                gallery: defaultItem.gallery,
                // Curated prose is authoritative in code — there is no UI to edit it, so a stale
                // localStorage copy must never shadow updated guide content.
                title: defaultItem.title,
                subtitle: defaultItem.subtitle,
                description: defaultItem.description,
                highlights: defaultItem.highlights,
                practicalTips: defaultItem.practicalTips,
                bestTimeToVisit: defaultItem.bestTimeToVisit,
                isPrimaryPick: defaultItem.isPrimaryPick !== undefined ? defaultItem.isPrimaryPick : savedItem.isPrimaryPick,
              };
            }
            return defaultItem;
          });

          // Add any custom user-created routes
          const userRoutes = parsed.filter((p: RouteItem) => p.isUserCreated && !DEFAULT_ROUTES.some((d) => d.id === p.id));
          return [...merged, ...userRoutes];
        }
      } catch {
        // ignore parse error
      }
    }
    return DEFAULT_ROUTES;
  });

  // 2. Selection & Filter State
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>('sentierelsa-trail');
  const [activePolyline, setActivePolyline] = useState<[number, number][]>([]);
  const [activeDistanceKm, setActiveDistanceKm] = useState<number | undefined>(undefined);
  const [activeDurationMin, setActiveDurationMin] = useState<number | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<RouteCategory | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'distance' | 'time' | 'alphabetical'>('distance');

  // 3. Modals State
  const [detailModalRoute, setDetailModalRoute] = useState<RouteItem | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [mapClickedCoords, setMapClickedCoords] = useState<{ lat: number; lng: number } | null>(null);

  // Save changes to local storage
  useEffect(() => {
    localStorage.setItem('italy_base_location', JSON.stringify(baseLocation));
  }, [baseLocation]);

  useEffect(() => {
    localStorage.setItem('italy_trip_routes', JSON.stringify(routes));
  }, [routes]);

  // Recalculate distances for all routes if base location changes
  useEffect(() => {
    setRoutes((prevRoutes) =>
      prevRoutes.map((r) => {
        const { distanceKm, timeMin } = estimateDrivingDistanceAndMinutes(
          baseLocation.lat,
          baseLocation.lng,
          r.lat,
          r.lng
        );
        return {
          ...r,
          distanceKm,
          drivingTimeMin: timeMin,
        };
      })
    );
  }, [baseLocation.lat, baseLocation.lng]);

  // Fetch true driving route geometry when a route is selected
  const handleSelectRoute = useCallback(
    async (routeId: string) => {
      setSelectedRouteId(routeId);
      const targetRoute = routes.find((r) => r.id === routeId);
      if (!targetRoute) {
        setActivePolyline([]);
        setActiveDistanceKm(undefined);
        setActiveDurationMin(undefined);
        return;
      }

      // Quick visual fallback
      setActivePolyline([
        [baseLocation.lat, baseLocation.lng],
        [targetRoute.lat, targetRoute.lng],
      ]);
      setActiveDistanceKm(targetRoute.distanceKm);
      setActiveDurationMin(targetRoute.drivingTimeMin);

      // Async fetch real road path
      try {
        const routeData = await fetchDrivingRouteCoordinates(
          baseLocation.lat,
          baseLocation.lng,
          targetRoute.lat,
          targetRoute.lng
        );
        setActivePolyline(routeData.coordinates);
        setActiveDistanceKm(routeData.distanceKm);
        setActiveDurationMin(routeData.durationMin);
      } catch {
        // keep fallback
      }
    },
    [baseLocation, routes]
  );

  // Initialize first route tracing on load
  useEffect(() => {
    if (selectedRouteId) {
      handleSelectRoute(selectedRouteId);
    }
  }, []);

  // Filtered & Sorted Routes
  const filteredRoutes = useMemo(() => {
    return routes
      .filter((route) => {
        const matchesCategory = selectedCategory === 'all' || route.category === selectedCategory;
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          route.title.toLowerCase().includes(q) ||
          route.subtitle.toLowerCase().includes(q) ||
          route.description.toLowerCase().includes(q) ||
          route.highlights.some((h) => h.toLowerCase().includes(q));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'distance') return a.distanceKm - b.distanceKm;
        if (sortBy === 'time') return a.drivingTimeMin - b.drivingTimeMin;
        if (sortBy === 'alphabetical') return a.title.localeCompare(b.title);
        return 0;
      });
  }, [routes, selectedCategory, searchQuery, sortBy]);

  // Add Custom Route Handler
  const handleAddRoute = (newRoute: RouteItem) => {
    setRoutes((prev) => [newRoute, ...prev]);
    setSelectedRouteId(newRoute.id);
    handleSelectRoute(newRoute.id);
  };

  // Delete User Route Handler
  const handleDeleteUserRoute = (id: string) => {
    setRoutes((prev) => prev.filter((r) => r.id !== id));
    if (selectedRouteId === id) {
      setSelectedRouteId(null);
      setActivePolyline([]);
    }
  };

  // Handle map click to prefill add custom spot
  const handleMapClickCoordinates = (coords: { lat: number; lng: number }) => {
    setMapClickedCoords(coords);
    setIsAddModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex flex-col text-[#333028] selection:bg-[#FBF0E8] selection:text-[#B4643B]">
      {/* Top Header */}
      <Header
        totalRoutes={routes.length}
        onOpenAddModal={() => {
          setMapClickedCoords(null);
          setIsAddModalOpen(true);
        }}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex-1 w-full space-y-6">
        {/* 1. Living Location Base Card */}
        <LivingBaseCard
          baseLocation={baseLocation}
          onUpdateBaseLocation={setBaseLocation}
          onCenterMap={() => {
            if (selectedRouteId) {
              handleSelectRoute(selectedRouteId);
            }
          }}
        />

        {/* 2. Interactive Map & Driving Explorer */}
        <section className="space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 px-1">
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-bold text-[#333028] font-display flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#B4643B]" />
                Live Map & Route Navigation
              </h2>
              <span className="text-xs text-[#6B665A] font-medium">
                (Click any route pin or card to trace road trajectory)
              </span>
            </div>
            <div className="text-xs text-[#6B665A]">
              Tip: Click anywhere on map to add a custom waypoint
            </div>
          </div>

          <div className="h-[460px] sm:h-[520px] w-full">
            <InteractiveMap
              baseLocation={baseLocation}
              routes={routes}
              selectedRouteId={selectedRouteId}
              onSelectRoute={(id) => {
                handleSelectRoute(id);
                // Scroll card into view on small screens
                const el = document.getElementById(`route-card-${id}`);
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
              }}
              onOpenDetails={(r) => setDetailModalRoute(r)}
              activePolylineCoordinates={activePolyline}
              activeDistanceKm={activeDistanceKm}
              activeDurationMin={activeDurationMin}
              onMapClickCoordinates={handleMapClickCoordinates}
            />
          </div>
        </section>

        {/* 3. Search, Filter & Itinerary Navigation Hub */}
        <section className="space-y-4 pt-2">
          <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#E6E1D6] shadow-xs space-y-3.5">
            {/* Row 1: Search & Sort */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-[#9E988A] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search routes, towns, hikes, thermal springs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-8 py-2.5 text-xs sm:text-sm rounded-xl border border-[#E6E1D6] focus:outline-none focus:ring-2 focus:ring-[#B4643B] bg-[#FAF8F5] text-[#333028]"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-[#9E988A] hover:text-[#333028] cursor-pointer"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center justify-between sm:justify-end gap-2 shrink-0">
                <span className="text-[11px] font-bold text-[#9E988A] uppercase flex items-center gap-1">
                  <ArrowUpDown className="w-3 h-3 text-[#B4643B]" />
                  Sort By:
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'distance' | 'time' | 'alphabetical')}
                  className="text-xs sm:text-sm font-semibold bg-[#FAF8F5] hover:bg-[#F4F1EA] text-[#4A453B] rounded-xl px-3 py-2 border border-[#E6E1D6] focus:outline-none focus:ring-2 focus:ring-[#B4643B] cursor-pointer"
                >
                  <option value="distance">Nearest Distance (km)</option>
                  <option value="time">Shortest Drive Time</option>
                  <option value="alphabetical">Alphabetical</option>
                </select>
              </div>
            </div>

            {/* Row 2: Category Filter Chips - Wrapped cleanly for all screen sizes (no horizontal scroll) */}
            <div className="pt-2 border-t border-[#EFECE4] flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-[#9E988A] uppercase mr-1 hidden sm:inline">
                Categories:
              </span>

              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === 'all'
                    ? 'bg-[#232722] text-white shadow-xs'
                    : 'bg-[#F4F1EA] text-[#6B665A] hover:bg-[#EAE5DA]'
                }`}
              >
                <span>All Itineraries</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${selectedCategory === 'all' ? 'bg-white/20 text-white' : 'bg-[#E5E0D4] text-[#4A453B]'}`}>
                  {routes.length}
                </span>
              </button>

              <button
                onClick={() => setSelectedCategory('thermal')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  selectedCategory === 'thermal'
                    ? 'bg-[#4E878C] text-white shadow-xs'
                    : 'bg-[#EBF4F5] text-[#2F6166] hover:bg-[#D9EBED]'
                }`}
              >
                <span>♨️ Thermal Springs</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${selectedCategory === 'thermal' ? 'bg-white/20 text-white' : 'bg-[#D2E7EA] text-[#1E3B3E]'}`}>
                  {routes.filter(r => r.category === 'thermal').length}
                </span>
              </button>

              <button
                onClick={() => setSelectedCategory('trekking')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  selectedCategory === 'trekking'
                    ? 'bg-[#607B57] text-white shadow-xs'
                    : 'bg-[#EEF3EC] text-[#3F5B37] hover:bg-[#E0EBDD]'
                }`}
              >
                <span>🥾 Trekking & Hikes</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${selectedCategory === 'trekking' ? 'bg-white/20 text-white' : 'bg-[#D9E6D5] text-[#2D4526]'}`}>
                  {routes.filter(r => r.category === 'trekking').length}
                </span>
              </button>

              <button
                onClick={() => setSelectedCategory('sightseeing')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  selectedCategory === 'sightseeing'
                    ? 'bg-[#B4643B] text-white shadow-xs'
                    : 'bg-[#FBF0E8] text-[#9A4C25] hover:bg-[#F5DFD0]'
                }`}
              >
                <span>🏰 Historic Towns</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${selectedCategory === 'sightseeing' ? 'bg-white/20 text-white' : 'bg-[#F4D9C7] text-[#7A3614]'}`}>
                  {routes.filter(r => r.category === 'sightseeing').length}
                </span>
              </button>
            </div>
          </div>

          {/* Route Cards Grid */}
          {filteredRoutes.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-[#E6E1D6] space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#FAF8F5] text-[#9E988A] flex items-center justify-center mx-auto border border-[#EFECE4]">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-[#333028] text-base">No routes match your search</h3>
              <p className="text-xs text-[#6B665A] max-w-sm mx-auto">
                Try searching for a different keyword or switch the category filter.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
                className="text-xs font-semibold text-[#B4643B] hover:text-[#9A4C25] underline cursor-pointer"
              >
                Reset filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredRoutes.map((route) => (
                <RouteCard
                  key={route.id}
                  route={route}
                  baseLat={baseLocation.lat}
                  baseLng={baseLocation.lng}
                  isSelected={selectedRouteId === route.id}
                  onSelect={(id) => handleSelectRoute(id)}
                  onOpenDetails={(r) => setDetailModalRoute(r)}
                  onDeleteUserRoute={handleDeleteUserRoute}
                />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#232722] text-[#B5B0A2] text-xs py-8 border-t border-[#343B2F] mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B4643B]" />
            <span className="text-[#F2EFE9] font-semibold font-display">Tuscany Living Base & Route Navigator</span>
            <span>&bull; Living at 42.9458216, 11.8524569</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-[#8C877A]">
            <span>Integrated Waze Deep Linking</span>
            <span>&bull;</span>
            <span>OpenStreetMap & Topo Layers</span>
            <span>&bull;</span>
            <span>Val d’Orcia, Tuscany</span>
          </div>
        </div>
      </footer>

      {/* Modal 1: Route Guide & Tips Detail Modal */}
      {detailModalRoute && (
        <RouteDetailModal
          route={detailModalRoute}
          baseLocation={baseLocation}
          onClose={() => setDetailModalRoute(null)}
          onSelectOnMap={(id) => handleSelectRoute(id)}
        />
      )}

      {/* Modal 2: Add Custom Route / Spot Modal */}
      {isAddModalOpen && (
        <AddRouteModal
          baseLat={baseLocation.lat}
          baseLng={baseLocation.lng}
          initialCoords={mapClickedCoords}
          onClose={() => {
            setIsAddModalOpen(false);
            setMapClickedCoords(null);
          }}
          onAddRoute={handleAddRoute}
        />
      )}
    </div>
  );
}
