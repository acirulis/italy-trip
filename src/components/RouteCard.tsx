import React, { useState } from 'react';
import { RouteItem } from '../types';
import { getWazeUrl, getGoogleMapsDirUrl } from '../utils/navigation';
import { withBasePath } from '../utils/assets';
import { 
  Navigation, 
  Clock, 
  Footprints, 
  MapPin, 
  Sparkles, 
  Info, 
  Images,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { handleImageError } from '../utils/imageFallback';

interface RouteCardProps {
  route: RouteItem;
  baseLat: number;
  baseLng: number;
  isSelected: boolean;
  onSelect: (routeId: string) => void;
  onOpenDetails: (route: RouteItem) => void;
  onDeleteUserRoute?: (id: string) => void;
}

export const RouteCard: React.FC<RouteCardProps> = ({
  route,
  baseLat,
  baseLng,
  isSelected,
  onSelect,
  onOpenDetails,
}) => {
  const wazeUrl = route.wazeUrl || getWazeUrl(route.lat, route.lng);
  const gmapsUrl = getGoogleMapsDirUrl(baseLat, baseLng, route.lat, route.lng, route.googleMapsUrl);

  const isPrimary = Boolean(route.isPrimaryPick);

  // Normalize all photos for the card
  const allImages: string[] = React.useMemo(() => {
    const list: string[] = [];
    if (route.gallery && route.gallery.length > 0) {
      route.gallery.forEach((item) => {
        if (typeof item === 'string') {
          if (item) list.push(item);
        } else if (item && item.url) {
          list.push(item.url);
        }
      });
    } else if (route.photoUrl) {
      list.push(route.photoUrl);
    }
    if (route.photoUrl && !list.includes(route.photoUrl)) {
      list.unshift(route.photoUrl);
    }
    return list.map(withBasePath);
  }, [route.gallery, route.photoUrl]);

  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const currentDisplayPhoto = allImages[activeImgIndex] || route.photoUrl;

  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case 'thermal':
        return {
          bg: 'bg-[#EBF4F5]',
          text: 'text-[#2F6166]',
          border: 'border-[#C6E0E2]',
          dot: 'bg-[#4E878C]',
          label: 'Thermal Springs',
        };
      case 'trekking':
        return {
          bg: 'bg-[#EEF3EC]',
          text: 'text-[#3F5B37]',
          border: 'border-[#CBD8C8]',
          dot: 'bg-[#607B57]',
          label: 'Trekking & Hikes',
        };
      case 'sightseeing':
        return {
          bg: 'bg-[#FBF0E8]',
          text: 'text-[#9A4C25]',
          border: 'border-[#ECD4C3]',
          dot: 'bg-[#B4643B]',
          label: 'Historic Sightseeing',
        };
      default:
        return {
          bg: 'bg-[#F2EFE9]',
          text: 'text-[#4A453B]',
          border: 'border-[#DCD6C9]',
          dot: 'bg-[#7B855A]',
          label: 'Viewpoint / Route',
        };
    }
  };

  const theme = getCategoryTheme(route.category);

  return (
    <div
      id={`route-card-${route.id}`}
      className={`group rounded-2xl transition-all duration-200 border bg-white overflow-hidden flex flex-col justify-between ${
        isSelected
          ? 'border-[#B4643B] shadow-md ring-2 ring-[#B4643B]/20'
          : 'border-[#E6E1D6] hover:border-[#D0C9BA] hover:shadow-xs'
      } ${isPrimary ? 'bg-gradient-to-b from-[#FBF7F0] to-white' : ''}`}
    >
      {/* Top Media & Gallery Header */}
      <div>
        {currentDisplayPhoto ? (
          <div 
            onClick={() => onOpenDetails(route)}
            className="relative h-48 w-full overflow-hidden bg-[#EFECE6] group/image cursor-pointer"
            title="Click to open Guide & Gallery (Photos, tips, details)"
          >
            <img
              src={currentDisplayPhoto}
              alt={route.title}
              referrerPolicy="no-referrer"
          onError={handleImageError}
              className="w-full h-full object-cover group-hover/image:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#232722]/90 via-[#232722]/30 to-transparent" />
            
            {/* Top Badges overlay */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-xs ${
                  route.category === 'thermal' ? 'bg-[#1E3B3E]/85 text-[#B6E1E4] border border-[#4E878C]/40' :
                  route.category === 'trekking' ? 'bg-[#22351E]/85 text-[#CBE0C7] border border-[#607B57]/40' :
                  route.category === 'sightseeing' ? 'bg-[#3A2216]/85 text-[#F5C7AF] border border-[#B4643B]/40' :
                  'bg-[#232722]/85 text-[#E0DCCE] border border-[#444B3F]/40'
                }`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${theme.dot}`} />
                {theme.label}
              </span>

              <div className="flex items-center gap-1.5 pointer-events-auto">
                {isPrimary && (
                  <span className="bg-[#B4643B] text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md uppercase tracking-wider shadow">
                    ★ Primary Pick
                  </span>
                )}

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenDetails(route);
                  }}
                  className="flex items-center gap-1 bg-[#232722]/80 hover:bg-[#232722] text-white text-[10px] font-semibold px-2 py-1 rounded-md backdrop-blur-xs border border-white/20 transition cursor-pointer shadow-xs"
                  title={`View full gallery (${allImages.length} photos & guide)`}
                >
                  <Images className="w-3 h-3 text-[#D48259]" />
                  <span>{allImages.length} {allImages.length === 1 ? 'photo' : 'photos'}</span>
                </button>
              </div>
            </div>

            {/* Quick Image Navigation Arrows (on hover or touch) */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#232722]/75 hover:bg-[#232722] text-white flex items-center justify-center backdrop-blur-xs transition opacity-0 group-hover/image:opacity-100 shadow-md cursor-pointer pointer-events-auto"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-[#232722]/75 hover:bg-[#232722] text-white flex items-center justify-center backdrop-blur-xs transition opacity-0 group-hover/image:opacity-100 shadow-md cursor-pointer pointer-events-auto"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Dots indicator */}
                <div className="absolute bottom-11 left-0 right-0 flex items-center justify-center gap-1 pointer-events-none">
                  {allImages.map((_, idx) => (
                    <span
                      key={idx}
                      className={`h-1.5 rounded-full transition-all duration-200 ${
                        idx === activeImgIndex ? 'w-4 bg-white shadow-xs' : 'w-1.5 bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Bottom photo overlay title - Primary click target */}
            <div className="absolute bottom-2.5 left-3 right-3 text-white">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenDetails(route);
                }}
                className="text-left w-full group/title cursor-pointer flex items-center justify-between gap-1.5"
                title="Click to open Guide & Gallery"
              >
                <h3 className="font-bold text-base sm:text-lg font-display leading-tight drop-shadow-md group-hover/title:text-[#FDE68A] group-hover/title:underline transition-colors line-clamp-1">
                  {route.title}
                </h3>
                <span className="text-[11px] font-semibold bg-white/20 hover:bg-white/30 backdrop-blur-xs px-2 py-0.5 rounded text-white flex items-center gap-1 shrink-0 border border-white/20 shadow-xs">
                  <span>Guide</span>
                  <span>&rarr;</span>
                </span>
              </button>
            </div>
          </div>
        ) : null}

        {/* Content Body */}
        <div className="p-4">
          {!currentDisplayPhoto && (
            <div className="flex items-center justify-between mb-2">
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${theme.bg} ${theme.text} border ${theme.border}`}>
                <span className={`w-1.5 h-1.5 rounded-full ${theme.dot}`} />
                {theme.label}
              </span>
              {isPrimary && (
                <span className="bg-[#B4643B] text-white font-extrabold text-[10px] px-2 py-0.5 rounded-md uppercase tracking-wider">
                  ★ Primary Pick
                </span>
              )}
            </div>
          )}

          {/* Non-photo Title Click Target */}
          {!currentDisplayPhoto && (
            <button
              type="button"
              onClick={() => onOpenDetails(route)}
              className="text-left w-full group/title cursor-pointer mb-1 flex items-center justify-between gap-2"
              title="Click to open Guide & Gallery"
            >
              <h3 className="font-bold text-base sm:text-lg text-[#333028] font-display group-hover/title:text-[#B4643B] group-hover/title:underline transition-colors">
                {route.title}
              </h3>
              <span className="text-[11px] font-semibold text-[#B4643B] bg-[#FBF0E8] px-2 py-0.5 rounded-md border border-[#ECD4C3] shrink-0">
                Guide &rarr;
              </span>
            </button>
          )}

          <p 
            onClick={() => onOpenDetails(route)}
            className="text-xs text-[#6B665A] font-medium mb-3 line-clamp-1 cursor-pointer hover:text-[#333028]"
            title="Click to open Guide & Gallery"
          >
            {route.subtitle}
          </p>

          {/* Core Metrics: Distance (km), Driving Time (min), Trekking Time */}
          <div className="grid grid-cols-2 gap-2 p-2.5 bg-[#FAF8F5] rounded-xl border border-[#EFECE4] mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white shadow-xs border border-[#E6E1D6] flex items-center justify-center text-[#B4643B] shrink-0">
                <Navigation className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-[10px] text-[#9E988A] font-bold uppercase leading-none">Distance</div>
                <div className="text-xs font-extrabold text-[#333028] font-mono mt-0.5">
                  {route.distanceKm} km
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white shadow-xs border border-[#E6E1D6] flex items-center justify-center text-[#607B57] shrink-0">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="text-[10px] text-[#9E988A] font-bold uppercase leading-none">Drive Time</div>
                <div className="text-xs font-extrabold text-[#333028] font-mono mt-0.5">
                  ~{route.drivingTimeMin} min
                </div>
              </div>
            </div>

            {route.hikingTimeMin && (
              <div className="col-span-2 pt-1 border-t border-[#EFECE4] flex items-center justify-between text-[11px] text-[#6B665A]">
                <span className="flex items-center gap-1">
                  <Footprints className="w-3.5 h-3.5 text-[#607B57]" />
                  <span>Trek/Walk: <strong className="text-[#333028]">~{route.hikingTimeMin} min</strong></span>
                </span>
                {route.trailDifficulty && (
                  <span className="px-1.5 py-0.2 rounded bg-[#EEF3EC] text-[10px] font-semibold text-[#3F5B37] border border-[#CBD8C8]">
                    {route.trailDifficulty}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Description snippet */}
          <p 
            onClick={() => onOpenDetails(route)}
            className="text-xs text-[#6B665A] leading-relaxed line-clamp-2 mb-3 cursor-pointer hover:text-[#333028]"
            title="Click to view full description and tips"
          >
            {route.description}
          </p>

          {/* Top highlight pill */}
          {route.highlights.length > 0 && (
            <div 
              onClick={() => onOpenDetails(route)}
              className="text-[11px] text-[#6B665A] bg-[#FBF0E8] p-2 rounded-lg border border-[#ECD4C3] mb-3 flex items-start gap-1.5 cursor-pointer hover:border-[#D48259] transition"
              title="Click to view all highlights"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#B4643B] shrink-0 mt-0.5" />
              <span className="line-clamp-1">{route.highlights[0]}</span>
            </div>
          )}
        </div>
      </div>

      {/* Action Footer: Primary Guide & Gallery + Secondary Navigation */}
      <div className="p-4 pt-0 space-y-2.5">
        {/* PRIMARY ACTION: Open Guide & Gallery */}
        <button
          type="button"
          onClick={() => onOpenDetails(route)}
          className="w-full flex items-center justify-center gap-2 bg-[#FAF5EE] hover:bg-[#F3ECE0] active:bg-[#EBDDC8] text-[#9A4C25] hover:text-[#7A3614] border-2 border-[#ECD4C3] hover:border-[#B4643B] text-xs sm:text-sm font-bold py-2.5 px-3 rounded-xl transition shadow-xs cursor-pointer group/guide"
          title="Open complete destination guide, photo gallery, itinerary tips and parking"
        >
          <Images className="w-4 h-4 text-[#B4643B] group-hover/guide:scale-110 transition-transform" />
          <span>📖 Open Guide & Gallery ({allImages.length} {allImages.length === 1 ? 'Photo' : 'Photos'})</span>
          <span className="text-xs text-[#B4643B] font-extrabold ml-auto">&rarr;</span>
        </button>

        {/* SECONDARY SECTION: Navigation & Driving Tools */}
        <div className="pt-2 border-t border-[#EFECE4] space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-[#9E988A] px-0.5">
            <span>Navigation (Secondary)</span>
            <span>~{route.drivingTimeMin} min drive</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {/* Waze 1-Click Deep Link */}
            <a
              href={wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 bg-[#00A0DC] hover:bg-[#008CBE] active:scale-98 text-white text-xs font-bold py-2 px-2.5 rounded-xl shadow-xs transition"
              title="Start instant live turn-by-turn navigation in Waze"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/>
              </svg>
              <span>Waze Nav</span>
            </a>

            {/* Google Maps Directions */}
            <a
              href={gmapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 bg-[#607B57] hover:bg-[#4F6847] active:scale-98 text-white text-xs font-semibold py-2 px-2.5 rounded-xl shadow-xs transition"
              title="Open route directions in Google Maps"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Google Maps</span>
            </a>
          </div>

          {/* Trace on Map button */}
          <button
            onClick={() => onSelect(route.id)}
            className={`w-full text-xs font-semibold py-1.5 px-3 rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer ${
              isSelected
                ? 'bg-[#FBF0E8] text-[#9A4C25] border border-[#ECD4C3]'
                : 'text-[#6B665A] hover:text-[#333028] bg-[#FAF8F5] hover:bg-[#F2EFE9] border border-[#EFECE4]'
            }`}
          >
            <Navigation className="w-3.5 h-3.5 text-[#B4643B]" />
            <span>{isSelected ? '✓ Route Traced on Live Map' : 'Trace Road Path on Map'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
