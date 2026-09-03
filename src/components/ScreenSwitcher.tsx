import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ScreenId } from '../types';

export const ScreenSwitcher: React.FC = () => {
  const { currentScreen, navigateTo, viewMode, setViewMode } = useCart();
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const screens: Array<{ id: ScreenId; label: string; icon: string }> = [
    { id: 'splash', label: '1. Splash', icon: 'electric_bolt' },
    { id: 'location', label: '2. Location', icon: 'my_location' },
    { id: 'home', label: '3. Home Feed', icon: 'local_dining' },
    { id: 'burgers', label: '4. Burgers Menu', icon: 'lunch_dining' },
    { id: 'search', label: '5. Search Trucks', icon: 'search' },
    { id: 'details', label: '6. Truck Details', icon: 'description' },
    { id: 'checkout', label: '7. Checkout', icon: 'shopping_cart' },
    { id: 'orders', label: '8. Orders', icon: 'receipt_long' },
    { id: 'profile', label: '9. Profile', icon: 'person' }
  ];

  return (
    <aside aria-label="Client testing navigation" className="fixed top-2 right-2 z-[999] font-sans">
      {!isExpanded ? (
        <button
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-inverse-surface/90 hover:bg-inverse-surface text-inverse-on-surface shadow-lg backdrop-blur-md text-[12px] font-bold tracking-tight border border-white/20 transition-transform active:scale-95"
          title="Open Client Screen Switcher"
        >
          <span className="material-symbols-outlined text-[16px] text-tertiary-fixed-dim animate-pulse">
            layers
          </span>
          <span>Screens ({currentScreen})</span>
          <span className="material-symbols-outlined text-[14px]">expand_more</span>
        </button>
      ) : (
        <div className="bg-inverse-surface text-inverse-on-surface p-3 rounded-2xl shadow-2xl backdrop-blur-xl border border-white/15 w-72 max-w-[95vw] animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-white/10 mb-2">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-tertiary-fixed-dim text-[18px]">touch_app</span>
              <span className="text-[12px] font-extrabold uppercase tracking-wider text-white">
                Client Test Suite
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="w-6 h-6 rounded-full hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white text-[14px]"
            >
              ✕
            </button>
          </div>

          <div className="text-[11px] text-white/60 mb-2">
            Instant jump to any client prototype screen:
          </div>

          <div className="grid grid-cols-1 gap-1 max-h-60 overflow-y-auto pr-1 no-scrollbar">
            {screens.map(s => {
              const active = currentScreen === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => {
                    navigateTo(s.id);
                    setIsExpanded(false);
                  }}
                  className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-[12px] font-medium transition-colors text-left ${
                    active
                      ? 'bg-primary text-white font-bold'
                      : 'hover:bg-white/10 text-white/90'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[16px] opacity-80">
                      {s.icon}
                    </span>
                    <span>{s.label}</span>
                  </div>
                  {active && (
                    <span className="text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-bold">
                      Active
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* View mode toggle (Phone frame vs Fluid) */}
          <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[11px]">
            <span className="text-white/70">Frame Mode:</span>
            <div className="flex items-center bg-white/10 rounded-full p-0.5">
              <button
                onClick={() => setViewMode('device')}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  viewMode === 'device' ? 'bg-primary text-white' : 'text-white/70'
                }`}
              >
                📱 Mobile
              </button>
              <button
                onClick={() => setViewMode('fluid')}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  viewMode === 'fluid' ? 'bg-primary text-white' : 'text-white/70'
                }`}
              >
                🖥️ Fluid
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
