import React, { useState } from 'react';
import { BaseLocation } from '../types';
import { getWazeUrl } from '../utils/navigation';
import { Home, Navigation, MapPin, Copy, Check, ExternalLink, Edit3, Save, X, Sparkles } from 'lucide-react';

interface LivingBaseCardProps {
  baseLocation: BaseLocation;
  onUpdateBaseLocation: (updated: BaseLocation) => void;
  onCenterMap: () => void;
}

export const LivingBaseCard: React.FC<LivingBaseCardProps> = ({
  baseLocation,
  onUpdateBaseLocation,
  onCenterMap,
}) => {
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: baseLocation.name,
    address: baseLocation.address,
    lat: baseLocation.lat.toString(),
    lng: baseLocation.lng.toString(),
    description: baseLocation.description,
  });

  const wazeHomeUrl = getWazeUrl(baseLocation.lat, baseLocation.lng);
  const gmapsHomeUrl = `https://www.google.com/maps/search/?api=1&query=${baseLocation.lat},${baseLocation.lng}`;
  const appleHomeUrl = `https://maps.apple.com/?daddr=${baseLocation.lat},${baseLocation.lng}&dirflg=d`;

  const handleCopyCoords = () => {
    navigator.clipboard.writeText(`${baseLocation.lat}, ${baseLocation.lng}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    const latNum = parseFloat(editForm.lat);
    const lngNum = parseFloat(editForm.lng);
    if (!isNaN(latNum) && !isNaN(lngNum)) {
      onUpdateBaseLocation({
        ...baseLocation,
        name: editForm.name.trim() || 'Our Living Base',
        address: editForm.address.trim() || `${latNum}, ${lngNum}`,
        lat: latNum,
        lng: lngNum,
        description: editForm.description.trim(),
      });
      setIsEditing(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-5 border border-[#E6E1D6] shadow-xs relative overflow-hidden">
      {/* Decorative Warm Accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#B4643B] via-[#D48259] to-[#607B57]" />

      {isEditing ? (
        <form onSubmit={handleSaveEdit} className="space-y-3 pt-1">
          <div className="flex items-center justify-between pb-2 border-b border-[#EFECE4]">
            <h3 className="font-bold text-[#333028] text-sm flex items-center gap-2">
              <Edit3 className="w-4 h-4 text-[#B4643B]" /> Edit Base Living Location
            </h3>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="text-[#9E988A] hover:text-[#333028] p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#6B665A] mb-1">Base Name / Label</label>
              <input
                type="text"
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#DCD6C9] bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#B4643B]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#6B665A] mb-1">Region / Note</label>
              <input
                type="text"
                value={editForm.address}
                onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#DCD6C9] bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#B4643B]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#6B665A] mb-1">Latitude</label>
              <input
                type="number"
                step="any"
                value={editForm.lat}
                onChange={(e) => setEditForm({ ...editForm, lat: e.target.value })}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#DCD6C9] bg-[#FAF8F5] font-mono focus:outline-none focus:ring-2 focus:ring-[#B4643B]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#6B665A] mb-1">Longitude</label>
              <input
                type="number"
                step="any"
                value={editForm.lng}
                onChange={(e) => setEditForm({ ...editForm, lng: e.target.value })}
                className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#DCD6C9] bg-[#FAF8F5] font-mono focus:outline-none focus:ring-2 focus:ring-[#B4643B]"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#6B665A] mb-1">Description / Living notes</label>
            <textarea
              rows={2}
              value={editForm.description}
              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              className="w-full px-3 py-1.5 text-xs rounded-lg border border-[#DCD6C9] bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#B4643B]"
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-3 py-1.5 text-xs font-medium text-[#6B665A] hover:bg-[#F2EFE9] rounded-lg cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1 bg-[#607B57] hover:bg-[#4F6847] text-white px-3 py-1.5 text-xs font-semibold rounded-lg shadow-xs cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" /> Save Location
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Base Info */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#FBF0E8] text-[#9A4C25] border border-[#ECD4C3]">
                <Home className="w-3 h-3 text-[#B4643B]" />
                LIVING LOCATION
              </span>
              <button
                onClick={handleCopyCoords}
                className="inline-flex items-center gap-1 text-[11px] font-mono text-[#6B665A] hover:text-[#333028] bg-[#F4F1EA] hover:bg-[#EAE5DA] px-2 py-0.5 rounded transition cursor-pointer"
                title="Click to copy GPS coordinates"
              >
                <span>{baseLocation.lat.toFixed(6)}, {baseLocation.lng.toFixed(6)}</span>
                {copied ? <Check className="w-3 h-3 text-[#607B57]" /> : <Copy className="w-3 h-3" />}
              </button>
            </div>

            <div className="flex items-baseline gap-2">
              <h2 className="text-lg font-bold text-[#333028] font-display tracking-tight">
                {baseLocation.name}
              </h2>
              <span className="text-xs text-[#8A8477] font-medium hidden sm:inline">&bull; {baseLocation.region}</span>
            </div>

            <p className="text-xs text-[#6B665A] max-w-2xl leading-relaxed">
              {baseLocation.description}
            </p>
          </div>

          {/* Quick Actions (Waze, Gmaps, Center) */}
          <div className="flex flex-wrap items-center gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#EFECE4]">
            {/* Waze 1-Click Navigate Home */}
            <a
              id="waze-navigate-home-btn"
              href={wazeHomeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-[#00A0DC] hover:bg-[#008CBE] text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-xs hover:shadow transition transform active:scale-95"
              title="Open direct Waze navigation back to living base"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14.5v-9l6 4.5-6 4.5z"/>
              </svg>
              <span>Waze Home</span>
            </a>

            {/* Google Maps Home */}
            <a
              id="gmaps-home-btn"
              href={gmapsHomeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-[#607B57] hover:bg-[#4F6847] text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-xs transition"
              title="Open base in Google Maps"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Google Maps</span>
            </a>

            {/* Apple Maps */}
            <a
              href={appleHomeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1 bg-[#F4F1EA] hover:bg-[#EAE5DA] text-[#4A453B] text-xs font-medium px-2.5 py-2 rounded-xl transition border border-[#E6E1D6]"
              title="Open base in Apple Maps"
            >
              <span>Apple Maps</span>
            </a>

            {/* Locate on Map */}
            <button
              onClick={onCenterMap}
              className="flex items-center gap-1 bg-[#F4F1EA] hover:bg-[#EEF3EC] text-[#4A453B] hover:text-[#607B57] text-xs font-medium px-2.5 py-2 rounded-xl transition border border-[#E6E1D6] cursor-pointer"
              title="Center Map on Base"
            >
              <Navigation className="w-3.5 h-3.5 text-[#607B57]" />
              <span className="hidden sm:inline">Locate</span>
            </button>

            {/* Edit */}
            <button
              onClick={() => setIsEditing(true)}
              className="text-[#9E988A] hover:text-[#333028] p-2 rounded-xl hover:bg-[#F4F1EA] transition cursor-pointer"
              title="Adjust base coordinates"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
