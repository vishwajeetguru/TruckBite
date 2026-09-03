import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { TRUCKBITE_ASSETS } from '../data/mockData';
import { StatusBar } from '../components/StatusBar';

export const SplashScreen: React.FC = () => {
  const { navigateTo } = useCart();
  const [progress, setProgress] = useState<number>(15);
  const [statusText, setStatusText] = useState<string>('Scanning street coordinates...');

  useEffect(() => {
    const stages = [
      { pct: 28, text: 'Scanning street coordinates...' },
      { pct: 64, text: 'Syncing fresh menus...' },
      { pct: 92, text: 'Preparing your taste map...' },
      { pct: 100, text: 'Ready to feast!' }
    ];

    let step = 0;
    const interval = setInterval(() => {
      if (step < stages.length) {
        setProgress(stages[step].pct);
        setStatusText(stages[step].text);
        step++;
      } else {
        clearInterval(interval);
      }
    }, 550);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="flex-1 flex flex-col relative w-full min-h-screen bg-surface overflow-hidden select-none">
      {/* Background Ambient Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary-fixed/25 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" />
      <div className="absolute bottom-1/3 right-1/4 w-60 h-60 bg-tertiary-fixed/30 rounded-full blur-2xl pointer-events-none -z-10" />

      {/* Top Status & Street Live indicator */}
      <div className="pt-2">
        <StatusBar />
        <div className="w-full flex items-center justify-between opacity-85 px-4 pt-3">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-low shadow-sm border border-black/5">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <span className="font-label-sm text-[11px] text-on-surface-variant uppercase tracking-wider font-bold">
              Street Live
            </span>
          </div>
          <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-[11px] font-bold">
            <span className="material-symbols-outlined text-[16px] text-primary">near_me</span>
            <span>GPS Connected</span>
          </div>
        </div>
      </div>

      {/* Central Brand Core */}
      <div className="flex-1 flex flex-col items-center justify-center my-auto text-center px-4">
        {/* Emblem Anchor with Ambient Pulsing Rings */}
        <div className="relative flex items-center justify-center mb-6">
          <div
            className="absolute w-36 h-36 rounded-full bg-primary/10 animate-ping opacity-60 pointer-events-none"
            style={{ animationDuration: '3s' }}
          />
          <div className="absolute w-28 h-28 rounded-full bg-tertiary-fixed-dim/20 scale-125 pointer-events-none" />

          {/* Icon Frame with Tactile Shadow */}
          <div className="relative w-24 h-24 rounded-2xl bg-surface-container-lowest shadow-xl flex items-center justify-center p-2.5 z-10 border border-black/5">
            <img
              alt="TruckBite Logo"
              className="w-full h-full object-contain rounded-xl select-none"
              src={TRUCKBITE_ASSETS.logo}
            />
          </div>

          {/* Floating Delight Badge */}
          <div className="absolute -bottom-2 -right-2 z-20 bg-primary text-on-primary rounded-full px-2 py-0.5 shadow-md flex items-center gap-1">
            <span
              className="material-symbols-outlined text-[13px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              local_fire_department
            </span>
            <span className="font-label-sm text-[10px] tracking-tight font-extrabold">FAST</span>
          </div>
        </div>

        {/* App Name & Narrative */}
        <div className="space-y-1 max-w-[280px]">
          <h1 className="font-display-lg text-[34px] text-on-surface tracking-tight font-extrabold leading-tight">
            TruckBite
          </h1>
          <p className="font-body-lg text-[15px] text-on-surface-variant font-medium">
            Fresh food. Right to your location.
          </p>
        </div>

        {/* Micro Highlights Bento */}
        <div className="grid grid-cols-3 gap-2 mt-7 w-full max-w-xs">
          <div className="bg-surface-container-low rounded-xl py-2 px-2.5 text-center shadow-sm flex flex-col items-center justify-center border border-black/5">
            <span className="material-symbols-outlined text-primary text-[18px] mb-0.5">timer</span>
            <span className="font-label-sm text-[11px] text-on-surface-variant font-bold">Live Cook</span>
          </div>
          <div className="bg-surface-container-low rounded-xl py-2 px-2.5 text-center shadow-sm flex flex-col items-center justify-center border border-black/5">
            <span className="material-symbols-outlined text-tertiary-container text-[18px] mb-0.5">
              location_on
            </span>
            <span className="font-label-sm text-[11px] text-on-surface-variant font-bold">Curbside</span>
          </div>
          <div className="bg-surface-container-low rounded-xl py-2 px-2.5 text-center shadow-sm flex flex-col items-center justify-center border border-black/5">
            <span className="material-symbols-outlined text-primary text-[18px] mb-0.5">
              cloud_download
            </span>
            <span className="font-label-sm text-[11px] text-on-surface-variant font-bold">0 Friction</span>
          </div>
        </div>
      </div>

      {/* Bottom Transition Engine & Progress Pulse */}
      <div className="w-full flex flex-col items-center gap-2 pb-8 px-6">
        <div className="flex items-center gap-2">
          <span
            className="material-symbols-outlined text-[16px] text-primary animate-spin"
            style={{ animationDuration: '2.2s' }}
          >
            progress_activity
          </span>
          <span className="font-label-md text-[12px] text-on-surface-variant tracking-wide font-semibold">
            {statusText}
          </span>
        </div>

        {/* Minimalist Smooth Progress Track */}
        <div className="w-48 h-1.5 bg-surface-container-highest rounded-full overflow-hidden relative shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-primary-container via-primary to-tertiary-container rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Navigation CTAs */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={() => navigateTo('location')}
            className="px-5 py-2 rounded-full bg-primary text-on-primary font-label-md text-[12px] font-bold shadow-md hover:bg-primary-container active:scale-95 transition-all"
          >
            Continue to App →
          </button>
          <button
            onClick={() => navigateTo('home')}
            className="px-3 py-2 text-secondary font-label-md text-[12px] hover:text-on-surface"
          >
            Skip to Menu
          </button>
        </div>

        <p className="font-body-sm text-[11px] text-secondary pt-1">
          Direct access • No sign-in required
        </p>
      </div>
    </main>
  );
};
