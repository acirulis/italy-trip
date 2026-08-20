import React from 'react';
import { Compass } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-[#232722] text-[#EDE8DE] border-b border-[#343A30] sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand / Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#607B57] to-[#8FA885] flex items-center justify-center text-white shadow-md">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-base sm:text-lg font-display tracking-tight text-[#FBF9F5]">
                Tuscany Trip Explorer
              </h1>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#353C32] text-[#D8CCA3] border border-[#485244]">
                Living Base: 42.9458, 11.8524
              </span>
            </div>
            <p className="text-[11px] text-[#A8A396] hidden xs:block">
              Val d’Orcia Living Base &bull; Waze Navigation &bull; Sightseeing & Trekking Itineraries
            </p>
          </div>
        </div>

      </div>
    </header>
  );
};
