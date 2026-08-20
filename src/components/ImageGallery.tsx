import React, { useState, useEffect } from 'react';
import { RouteImage } from '../types';
import { withBasePath } from '../utils/assets';
import { ChevronLeft, ChevronRight, Maximize2, X, Image as ImageIcon } from 'lucide-react';

interface ImageGalleryProps {
  mainPhotoUrl?: string;
  gallery?: (string | RouteImage)[];
  title: string;
  className?: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  mainPhotoUrl,
  gallery,
  title,
  className = '',
}) => {
  // Normalize items to { url: string, caption?: string }
  const normalizedImages: RouteImage[] = React.useMemo(() => {
    const list: RouteImage[] = [];
    if (gallery && gallery.length > 0) {
      gallery.forEach((item) => {
        if (typeof item === 'string') {
          if (item) list.push({ url: item });
        } else if (item && item.url) {
          list.push(item);
        }
      });
    } else if (mainPhotoUrl) {
      list.push({ url: mainPhotoUrl, caption: title });
    }

    // Ensure mainPhotoUrl is at index 0 if not already in list
    if (mainPhotoUrl && !list.some((img) => img.url === mainPhotoUrl)) {
      list.unshift({ url: mainPhotoUrl, caption: title });
    }

    return list.map((img) => ({ ...img, url: withBasePath(img.url) }));
  }, [gallery, mainPhotoUrl, title]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Reset index when title/photos change
  useEffect(() => {
    setCurrentIndex(0);
  }, [title]);

  if (normalizedImages.length === 0) {
    return (
      <div className="w-full h-48 bg-[#EFECE6] flex flex-col items-center justify-center text-[#9E988A] rounded-xl border border-[#E6E1D6]">
        <ImageIcon className="w-8 h-8 mb-1 opacity-50" />
        <span className="text-xs">No images available</span>
      </div>
    );
  }

  const currentImage = normalizedImages[currentIndex] || normalizedImages[0];

  const handlePrev = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? normalizedImages.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentIndex((prev) => (prev === normalizedImages.length - 1 ? 0 : prev + 1));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLightboxOpen) {
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === 'ArrowRight') handleNext();
        if (e.key === 'Escape') setIsLightboxOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, normalizedImages.length]);

  return (
    <div className={`space-y-2.5 ${className}`}>
      {/* Main Image Stage */}
      <div className="relative h-64 sm:h-80 w-full rounded-xl overflow-hidden bg-[#232722] border border-[#E6E1D6] group select-none">
        <img
          src={currentImage.url}
          alt={currentImage.caption || `${title} photo ${currentIndex + 1}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-opacity duration-300"
          loading="lazy"
        />

        {/* Gradient vignette for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#232722]/85 via-transparent to-black/20 pointer-events-none" />

        {/* Counter Badge */}
        <div className="absolute top-3 left-3 bg-[#232722]/80 backdrop-blur-xs text-white text-[11px] font-mono px-2.5 py-1 rounded-lg border border-white/15 flex items-center gap-1.5 shadow-sm">
          <ImageIcon className="w-3 h-3 text-[#D48259]" />
          <span>
            {currentIndex + 1} / {normalizedImages.length}
          </span>
        </div>

        {/* Expand / Lightbox Trigger */}
        <button
          onClick={() => setIsLightboxOpen(true)}
          className="absolute top-3 right-3 bg-[#232722]/80 hover:bg-[#232722] text-white p-1.5 rounded-lg border border-white/15 backdrop-blur-xs transition shadow-sm cursor-pointer"
          title="Open Fullscreen View"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Navigation Arrows */}
        {normalizedImages.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#232722]/80 hover:bg-[#232722] text-white flex items-center justify-center backdrop-blur-xs transition shadow-md cursor-pointer opacity-90 hover:opacity-100 hover:scale-105"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#232722]/80 hover:bg-[#232722] text-white flex items-center justify-center backdrop-blur-xs transition shadow-md cursor-pointer opacity-90 hover:opacity-100 hover:scale-105"
              aria-label="Next photo"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Caption Overlay */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <p className="text-xs font-medium text-[#EDE8DE] drop-shadow-sm line-clamp-2">
            {currentImage.caption || `${title} — View ${currentIndex + 1}`}
          </p>
        </div>
      </div>

      {/* Thumbnails Row */}
      {normalizedImages.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-[#D0C9BA]">
          {normalizedImages.map((img, idx) => {
            const isSelected = idx === currentIndex;
            return (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative h-14 w-20 sm:h-16 sm:w-24 rounded-lg overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'border-[#B4643B] ring-2 ring-[#B4643B]/30 opacity-100 scale-95 shadow-sm'
                    : 'border-[#E6E1D6] opacity-65 hover:opacity-95 hover:border-[#9E988A]'
                }`}
                title={img.caption || `Photo ${idx + 1}`}
              >
                <img
                  src={img.url}
                  alt={`Thumbnail ${idx + 1}`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                {isSelected && (
                  <div className="absolute inset-0 bg-[#B4643B]/10 pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[3000] bg-black/95 flex flex-col items-center justify-between p-4 sm:p-8 animate-in fade-in duration-150"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Top Bar */}
          <div
            className="w-full max-w-5xl flex items-center justify-between text-white py-2 z-10"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-sm sm:text-base text-[#EDE8DE]">
                {title}
              </span>
              <span className="text-xs text-[#9E988A] font-mono">
                ({currentIndex + 1} of {normalizedImages.length})
              </span>
            </div>
            <button
              onClick={() => setIsLightboxOpen(false)}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Central Image Container */}
          <div
            className="relative flex-1 w-full max-w-5xl flex items-center justify-center my-auto overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentImage.url}
              alt={currentImage.caption || title}
              referrerPolicy="no-referrer"
              className="max-h-[78vh] max-w-full object-contain rounded-lg shadow-2xl transition-all"
            />

            {/* Lightbox Navigation buttons */}
            {normalizedImages.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition cursor-pointer"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center border border-white/20 transition cursor-pointer"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {/* Bottom Caption Bar */}
          <div
            className="w-full max-w-4xl text-center py-3 text-sm text-[#D0C9BA] bg-black/40 backdrop-blur-xs rounded-xl px-4 mt-2"
            onClick={(e) => e.stopPropagation()}
          >
            <p>{currentImage.caption || title}</p>
          </div>
        </div>
      )}
    </div>
  );
};
