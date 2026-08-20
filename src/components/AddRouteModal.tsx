import React, { useState } from 'react';
import { RouteCategory, RouteItem } from '../types';
import { estimateDrivingDistanceAndMinutes } from '../utils/navigation';
import { X, Plus, MapPin, Sparkles } from 'lucide-react';

interface AddRouteModalProps {
  baseLat: number;
  baseLng: number;
  initialCoords?: { lat: number; lng: number } | null;
  onClose: () => void;
  onAddRoute: (newRoute: RouteItem) => void;
}

export const AddRouteModal: React.FC<AddRouteModalProps> = ({
  baseLat,
  baseLng,
  initialCoords,
  onClose,
  onAddRoute,
}) => {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState<RouteCategory>('sightseeing');
  const [latStr, setLatStr] = useState(initialCoords ? initialCoords.lat.toFixed(6) : '');
  const [lngStr, setLngStr] = useState(initialCoords ? initialCoords.lng.toFixed(6) : '');
  const [description, setDescription] = useState('');
  const [highlightsStr, setHighlightsStr] = useState('');
  const [tipsStr, setTipsStr] = useState('');
  const [hikingTimeMinStr, setHikingTimeMinStr] = useState('');
  const [trailDifficulty, setTrailDifficulty] = useState<'Easy' | 'Moderate' | 'Challenging'>('Easy');
  const [photoUrl, setPhotoUrl] = useState('');
  const [galleryUrlsStr, setGalleryUrlsStr] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lat = parseFloat(latStr);
    const lng = parseFloat(lngStr);

    if (!title.trim() || isNaN(lat) || isNaN(lng)) {
      alert('Please provide a title and valid GPS coordinates.');
      return;
    }

    const { distanceKm, timeMin } = estimateDrivingDistanceAndMinutes(baseLat, baseLng, lat, lng);

    const highlights = highlightsStr
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const practicalTips = tipsStr
      .split('\n')
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const galleryList = galleryUrlsStr
      .split(/[\n,]+/)
      .map((s) => s.trim())
      .filter((s) => s.length > 0)
      .map((url) => ({ url, caption: title.trim() }));

    const newRoute: RouteItem = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      subtitle: subtitle.trim() || `${distanceKm} km from Base`,
      category,
      lat,
      lng,
      distanceKm,
      drivingTimeMin: timeMin,
      hikingTimeMin: hikingTimeMinStr ? parseInt(hikingTimeMinStr, 10) : undefined,
      trailDifficulty,
      description: description.trim() || 'Custom destination added for our Italy itinerary.',
      highlights: highlights.length > 0 ? highlights : ['Custom scenic stop'],
      practicalTips: practicalTips.length > 0 ? practicalTips : ['Check local parking and road conditions.'],
      photoUrl: photoUrl.trim() || undefined,
      gallery: galleryList.length > 0 ? galleryList : (photoUrl.trim() ? [{ url: photoUrl.trim(), caption: title.trim() }] : undefined),
      isUserCreated: true,
    };

    onAddRoute(newRoute);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 bg-[#232722]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E6E1D6] p-6">
        <div className="flex items-center justify-between pb-3 border-b border-[#EFECE4] mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#FBF0E8] text-[#B4643B] flex items-center justify-center border border-[#ECD4C3]">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-[#333028] text-base font-display">Add Route or Destination</h3>
              <p className="text-xs text-[#6B665A]">Add a custom Tuscan stop with automatic distance and Waze navigation</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#9E988A] hover:text-[#333028] p-1.5 rounded-lg hover:bg-[#F4F1EA] transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#4A453B] mb-1">
              Title / Destination Name <span className="text-[#B4643B]">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. San Quirico d'Orcia, Capanna di Civitella"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-[#D0C9BA] bg-[#FAF8F5] text-[#333028] focus:outline-none focus:ring-2 focus:ring-[#B4643B] focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#4A453B] mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as RouteCategory)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#D0C9BA] bg-white text-[#333028] focus:outline-none focus:ring-2 focus:ring-[#B4643B]"
              >
                <option value="sightseeing">Historic Sightseeing</option>
                <option value="trekking">Trekking & Hiking</option>
                <option value="thermal">Thermal Springs & Baths</option>
                <option value="viewpoint">Scenic Viewpoint</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#4A453B] mb-1">Subtitle / Quick Note</label>
              <input
                type="text"
                placeholder="e.g. Romantic cypress gardens"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#D0C9BA] bg-[#FAF8F5] text-[#333028] focus:outline-none focus:ring-2 focus:ring-[#B4643B] focus:bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#4A453B] mb-1">
                Latitude <span className="text-[#B4643B]">*</span>
              </label>
              <input
                type="number"
                step="any"
                required
                placeholder="42.9266..."
                value={latStr}
                onChange={(e) => setLatStr(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#D0C9BA] bg-[#FAF8F5] text-[#333028] font-mono focus:outline-none focus:ring-2 focus:ring-[#B4643B] focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#4A453B] mb-1">
                Longitude <span className="text-[#B4643B]">*</span>
              </label>
              <input
                type="number"
                step="any"
                required
                placeholder="11.7006..."
                value={lngStr}
                onChange={(e) => setLngStr(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#D0C9BA] bg-[#FAF8F5] text-[#333028] font-mono focus:outline-none focus:ring-2 focus:ring-[#B4643B] focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4A453B] mb-1">Description</label>
            <textarea
              rows={2}
              placeholder="What makes this place special? What to see?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-[#D0C9BA] bg-[#FAF8F5] text-[#333028] focus:outline-none focus:ring-2 focus:ring-[#B4643B] focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-[#4A453B] mb-1">Hiking/Walking Time (mins)</label>
              <input
                type="number"
                placeholder="e.g. 45"
                value={hikingTimeMinStr}
                onChange={(e) => setHikingTimeMinStr(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#D0C9BA] bg-[#FAF8F5] text-[#333028] focus:outline-none focus:ring-2 focus:ring-[#B4643B] focus:bg-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#4A453B] mb-1">Trail Difficulty</label>
              <select
                value={trailDifficulty}
                onChange={(e) => setTrailDifficulty(e.target.value as 'Easy' | 'Moderate' | 'Challenging')}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#D0C9BA] bg-white text-[#333028] focus:outline-none focus:ring-2 focus:ring-[#B4643B]"
              >
                <option value="Easy">Easy</option>
                <option value="Moderate">Moderate</option>
                <option value="Challenging">Challenging</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#4A453B] mb-1">
              Practical Tips (One per line)
            </label>
            <textarea
              rows={2}
              placeholder="e.g. Park outside town walls&#10;Bring walking shoes"
              value={tipsStr}
              onChange={(e) => setTipsStr(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-[#D0C9BA] bg-[#FAF8F5] text-[#333028] focus:outline-none focus:ring-2 focus:ring-[#B4643B] focus:bg-white"
            />
          </div>

          <div className="space-y-3 pt-1 border-t border-[#EFECE4]">
            <div>
              <label className="block text-xs font-semibold text-[#4A453B] mb-1">
                Main Cover Photo URL (Optional)
              </label>
              <input
                type="url"
                placeholder="https://images.unsplash.com/..."
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#D0C9BA] bg-[#FAF8F5] text-[#333028] focus:outline-none focus:ring-2 focus:ring-[#B4643B] focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#4A453B] mb-1">
                Additional Gallery Photos (Optional, URLs separated by line or comma)
              </label>
              <textarea
                rows={2}
                placeholder="https://...&#10;https://..."
                value={galleryUrlsStr}
                onChange={(e) => setGalleryUrlsStr(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-[#D0C9BA] bg-[#FAF8F5] text-[#333028] focus:outline-none focus:ring-2 focus:ring-[#B4643B] focus:bg-white"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#EFECE4]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-[#6B665A] hover:bg-[#F4F1EA] rounded-xl transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 bg-[#B4643B] hover:bg-[#9A4C25] text-white text-xs font-bold px-4 py-2 rounded-xl shadow-xs transition cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Save to Trip Itinerary</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
