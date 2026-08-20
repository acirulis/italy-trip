import React from 'react';
import { RouteItem, BaseLocation } from '../types';
import { getWazeUrl, getGoogleMapsDirUrl, getAppleMapsUrl, exportToGpx, formatDriveTime } from '../utils/navigation';
import { ImageGallery } from './ImageGallery';
import {
  X,
  Navigation,
  Clock,
  Footprints,
  MapPin,
  Sparkles,
  AlertCircle,
  Download,
  Share2,
  CheckCircle2,
  Images,
} from 'lucide-react';

interface RouteDetailModalProps {
  route: RouteItem | null;
  baseLocation: BaseLocation;
  onClose: () => void;
  onSelectOnMap: (id: string) => void;
}

// Turns bare http(s) URLs inside curated prose into clickable links.
const URL_SPLIT_PATTERN = /(https?:\/\/[^\s)]*[^\s).,;:])/g;
const URL_TEST_PATTERN = /^https?:\/\//;

const renderTextWithLinks = (text: string) =>
  text.split(URL_SPLIT_PATTERN).map((part, idx) =>
    URL_TEST_PATTERN.test(part) ? (
      <a
        key={idx}
        href={part}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#B4643B] underline underline-offset-2 hover:text-[#8F4A28] break-words"
      >
        {part}
      </a>
    ) : (
      part
    )
  );

export const RouteDetailModal: React.FC<RouteDetailModalProps> = ({
  route,
  baseLocation,
  onClose,
  onSelectOnMap,
}) => {
  if (!route) return null;

  const wazeUrl = route.wazeUrl || getWazeUrl(route.lat, route.lng);
  const gmapsUrl = getGoogleMapsDirUrl(baseLocation.lat, baseLocation.lng, route.lat, route.lng, route.googleMapsUrl);
  const appleMapsUrl = route.appleMapsUrl || getAppleMapsUrl(baseLocation.lat, baseLocation.lng, route.lat, route.lng);

  const handleDownloadGpx = () => {
    const gpxData = exportToGpx(
      route.title,
      { lat: baseLocation.lat, lng: baseLocation.lng, name: baseLocation.name },
      { lat: route.lat, lng: route.lng, name: route.title }
    );
    const blob = new Blob([gpxData], { type: 'application/gpx+xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${route.id}-route.gpx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopyShare = () => {
    const summary = `${route.title} (Italy Trip)\nDistance: ${route.distanceKm} km from Base (~${formatDriveTime(route.drivingTimeMin)} drive)\nCoordinates: ${route.lat}, ${route.lng}\nWaze Nav: ${wazeUrl}\nGoogle Maps: ${gmapsUrl}`;
    navigator.clipboard.writeText(summary);
    alert('Route summary and navigation links copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-3 sm:p-6 bg-[#232722]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#E6E1D6] flex flex-col">
        {/* Modal Top Bar */}
        <div className="p-4 sm:p-5 border-b border-[#EFECE4] flex items-start justify-between gap-3 bg-[#FAF8F5] sticky top-0 z-20">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#B4643B] text-white shadow-xs">
                {route.category}
              </span>
              {route.isPrimaryPick && (
                <span className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider bg-[#9A4C25] text-white shadow-xs">
                  ★ Primary Pick
                </span>
              )}
              {route.gallery && route.gallery.length > 1 && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-[#EFECE6] text-[#6B665A] border border-[#E6E1D6]">
                  <Images className="w-3 h-3 text-[#B4643B]" />
                  {route.gallery.length} Photos
                </span>
              )}
            </div>
            <h2 className="text-lg sm:text-xl font-bold font-display text-[#232722] leading-tight">
              {route.title}
            </h2>
            <p className="text-xs text-[#6B665A] mt-0.5 font-medium">
              {route.subtitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#EFECE6] hover:bg-[#E6E1D6] text-[#3D3A30] flex items-center justify-center transition cursor-pointer shrink-0"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-6">
          {/* Image Gallery Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-bold text-[#9E988A] uppercase tracking-wider flex items-center gap-1.5">
                <Images className="w-3.5 h-3.5 text-[#B4643B]" />
                Photo Gallery & Scenery
              </h4>
              <span className="text-[11px] text-[#9E988A]">
                Click photo to expand fullscreen
              </span>
            </div>
            <ImageGallery
              mainPhotoUrl={route.photoUrl}
              gallery={route.gallery}
              title={route.title}
            />
          </div>

          {/* Quick Metrics Ribbon */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-[#FAF8F5] rounded-xl border border-[#EFECE4] text-[#333028]">
            <div>
              <div className="text-[10px] font-bold text-[#9E988A] uppercase">Road Distance</div>
              <div className="text-sm font-extrabold font-mono text-[#333028] mt-0.5">
                {route.distanceKm} km
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-[#9E988A] uppercase">Driving Time</div>
              <div className="text-sm font-extrabold font-mono text-[#333028] mt-0.5">
                ~{formatDriveTime(route.drivingTimeMin)}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-[#9E988A] uppercase">Walking / Trek</div>
              <div className="text-sm font-extrabold text-[#333028] mt-0.5">
                {route.hikingTimeMin ? `~${route.hikingTimeMin} mins` : 'N/A'}
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold text-[#9E988A] uppercase">Difficulty</div>
              <div className="text-sm font-bold text-[#607B57] mt-0.5">
                {route.trailDifficulty || 'Easy stroll'}
              </div>
            </div>
          </div>

          {/* Direct Navigation Action Links */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold text-[#9E988A] uppercase tracking-wider">
              Launch Live Turn-by-Turn Navigation
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <a
                href={wazeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#00A0DC] hover:bg-[#008CBE] text-white text-xs font-bold py-2.5 px-3 rounded-xl shadow-xs transition"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/>
                </svg>
                <span>Navigate with Waze</span>
              </a>

              <a
                href={gmapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#607B57] hover:bg-[#4F6847] text-white text-xs font-semibold py-2.5 px-3 rounded-xl shadow-xs transition"
              >
                <MapPin className="w-4 h-4" />
                <span>Google Maps Route</span>
              </a>

              <a
                href={appleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-[#3D3A30] hover:bg-[#232722] text-white text-xs font-medium py-2.5 px-3 rounded-xl shadow-xs transition"
              >
                <span>Apple Maps</span>
              </a>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-[#9E988A] uppercase tracking-wider mb-2">
              About This Route & Destination
            </h4>
            <p className="text-[#4A453B] text-sm leading-relaxed">
              {renderTextWithLinks(route.description)}
            </p>
          </div>

          {/* Highlights */}
          {route.highlights.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-[#9E988A] uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#B4643B]" />
                Key Highlights
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {route.highlights.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-[#4A453B] bg-[#FAF8F5] p-2.5 rounded-lg border border-[#EFECE4]">
                    <CheckCircle2 className="w-4 h-4 text-[#607B57] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Practical Tips & Parking Advice */}
          {route.practicalTips.length > 0 && (
            <div className="bg-[#FBF0E8] p-4 rounded-xl border border-[#ECD4C3]">
              <h4 className="text-xs font-bold text-[#9A4C25] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-[#B4643B]" />
                Practical Tips, Parking & Etiquette
              </h4>
              <ul className="space-y-1.5 text-xs text-[#7A3617]">
                {route.practicalTips.map((tip, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-[#B4643B] font-bold">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* GPS Coordinates & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#EFECE4] text-xs text-[#6B665A]">
            <div className="font-mono">
              GPS: {route.lat.toFixed(6)}° N, {route.lng.toFixed(6)}° E
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyShare}
                className="flex items-center gap-1 text-[#4A453B] hover:text-[#232722] bg-[#F4F1EA] hover:bg-[#EAE5DA] px-2.5 py-1.5 rounded-lg font-medium transition cursor-pointer border border-[#E6E1D6]"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Copy Summary</span>
              </button>
              <button
                onClick={handleDownloadGpx}
                className="flex items-center gap-1 text-[#4A453B] hover:text-[#232722] bg-[#F4F1EA] hover:bg-[#EAE5DA] px-2.5 py-1.5 rounded-lg font-medium transition cursor-pointer border border-[#E6E1D6]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>GPX Track</span>
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF8F5] border-t border-[#EFECE4] flex items-center justify-between sticky bottom-0 z-20">
          <button
            onClick={() => {
              onSelectOnMap(route.id);
              onClose();
            }}
            className="flex items-center gap-1.5 bg-[#B4643B] hover:bg-[#9A4C25] text-white text-xs font-semibold px-4 py-2 rounded-xl transition shadow-xs cursor-pointer"
          >
            <Navigation className="w-4 h-4" />
            <span>Trace Driving Route on Map</span>
          </button>
          <button
            onClick={onClose}
            className="text-xs font-medium text-[#6B665A] hover:text-[#333028] px-3 py-2 cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

