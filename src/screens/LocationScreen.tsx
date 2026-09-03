import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { TRUCKBITE_ASSETS } from '../data/mockData';
import { StatusBar } from '../components/StatusBar';

export const LocationScreen: React.FC = () => {
  const { navigateTo } = useCart();
  const [isLocating, setIsLocating] = useState<boolean>(false);

  const handleAllowLocation = () => {
    setIsLocating(true);
    setTimeout(() => {
      setIsLocating(false);
      navigateTo('home');
    }, 600);
  };

  return (
    <main className="flex-1 flex flex-col relative w-full min-h-screen px-4 pb-6 bg-surface select-none">
      <StatusBar />

      {/* Top Action Bar with Skip */}
      <div className="flex items-center justify-between py-2 mb-4">
        <div className="flex items-center gap-2 bg-surface-container-low px-3 py-1.5 rounded-full shadow-sm border border-black/5">
          <img
            alt="TruckBite Emblem"
            className="w-6 h-6 rounded-full object-cover shadow-sm"
            src={TRUCKBITE_ASSETS.locationEmblem}
          />
          <span className="font-label-sm text-[11px] uppercase tracking-wider text-on-surface-variant font-bold">
            TruckBite
          </span>
        </div>
        <button
          onClick={() => navigateTo('home')}
          className="font-label-lg text-[14px] text-secondary px-3.5 py-1.5 rounded-full hover:bg-surface-container transition-colors duration-200 active:scale-95"
          type="button"
        >
          Skip
        </button>
      </div>

      {/* Center Visual & Text Body */}
      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-6 my-auto">
        {/* Hero Radar & Location Graphic */}
        <div className="relative w-64 h-64 flex items-center justify-center mb-6">
          {/* Ambient Glow Backing */}
          <div className="absolute w-64 h-64 bg-primary-fixed/30 rounded-full blur-3xl pointer-events-none" />

          {/* Radar Waves */}
          <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping opacity-40 duration-1000" />
          <div className="absolute w-52 h-52 rounded-full border border-primary/25 bg-surface-container-low/60 shadow-inner" />
          <div className="absolute w-36 h-36 rounded-full border border-primary/30 bg-primary-fixed/15" />

          {/* Floating Truck Badge 1 */}
          <div
            className="absolute top-4 right-6 flex items-center gap-1.5 bg-surface-container-lowest px-3 py-1 rounded-full shadow-md border border-black/5 animate-bounce"
            style={{ animationDuration: '3s' }}
          >
            <span className="material-symbols-outlined text-primary text-[16px]">local_shipping</span>
            <span className="font-label-sm text-[11px] text-on-surface font-bold">Amdo Momos • 450m</span>
          </div>

          {/* Floating Truck Badge 2 */}
          <div
            className="absolute bottom-6 left-2 flex items-center gap-1.5 bg-surface-container-lowest px-3 py-1 rounded-full shadow-md border border-black/5 animate-bounce"
            style={{ animationDuration: '3.6s' }}
          >
            <span className="material-symbols-outlined text-tertiary text-[16px]">lunch_dining</span>
            <span className="font-label-sm text-[11px] text-on-surface font-bold">Karnavati Rolls • 1.1km</span>
          </div>

          {/* Floating Snack Pin */}
          <div className="absolute top-20 left-2 w-8 h-8 rounded-full bg-surface-container-lowest shadow-md border border-black/5 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-[18px]">fastfood</span>
          </div>

          {/* Center GPS Pin Radar Target */}
          <div className="relative z-10 w-20 h-20 rounded-full bg-primary flex items-center justify-center shadow-xl shadow-primary/25">
            <div className="w-14 h-14 rounded-full bg-primary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-on-primary text-[32px]">near_me</span>
            </div>
            <div className="absolute -inset-1.5 rounded-full border-2 border-primary-fixed animate-pulse" />
          </div>
        </div>

        {/* Headline & Subtitle */}
        <h1 className="font-display-sm text-[26px] text-on-surface font-extrabold tracking-tight mb-2">
          Enable your location
        </h1>
        <p className="font-body-md text-[14px] text-on-surface-variant max-w-xs mx-auto leading-relaxed">
          To find hot food trucks cooking near you in Ahmedabad.
        </p>
      </div>

      {/* Bottom Action CTA Buttons */}
      <div className="flex flex-col gap-3 pb-2 pt-2 w-full max-w-sm mx-auto">
        <button
          onClick={handleAllowLocation}
          disabled={isLocating}
          className="w-full h-14 py-3.5 px-6 rounded-full bg-primary text-on-primary flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary-container active:scale-[0.98] transition-all font-bold"
          type="button"
        >
          {isLocating ? (
            <span className="material-symbols-outlined text-[22px] animate-spin">sync</span>
          ) : (
            <span className="material-symbols-outlined text-[22px]">my_location</span>
          )}
          <span className="font-label-lg text-[14px] tracking-wide">
            {isLocating ? 'Detecting Ahmedabad GPS...' : 'Allow Location Access'}
          </span>
        </button>

        <button
          onClick={() => navigateTo('home')}
          className="w-full h-12 py-3 px-6 rounded-full bg-surface-container text-on-surface flex items-center justify-center gap-1.5 hover:bg-surface-container-high active:scale-[0.98] transition-all"
          type="button"
        >
          <span className="material-symbols-outlined text-[20px] text-secondary">search</span>
          <span className="font-label-lg text-[14px] font-semibold">Enter Location Manually</span>
        </button>

        <div className="text-center pt-1">
          <span className="font-body-sm text-[11px] text-on-surface-variant">
            Defaults to Ahmedabad, Gujarat • Change anytime in Settings
          </span>
        </div>
      </div>
    </main>
  );
};
