import React from 'react';
import { useCart } from '../context/CartContext';
import { ScreenId } from '../types';

export const BottomNav: React.FC = () => {
  const { currentScreen, navigateTo } = useCart();

  const navItems: Array<{
    id: ScreenId;
    label: string;
    icon: string;
    hasBadge?: boolean;
  }> = [
    { id: 'home', label: 'Home', icon: 'local_dining' },
    { id: 'search', label: 'Search', icon: 'explore' },
    { id: 'orders', label: 'Orders', icon: 'receipt_long', hasBadge: true },
    { id: 'profile', label: 'Profile', icon: 'person' }
  ];

  // If currently on splash or location or details or checkout, don't show full bottom nav or keep it contextual
  if (currentScreen === 'splash' || currentScreen === 'location' || currentScreen === 'details' || currentScreen === 'checkout') {
    return null;
  }

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-4px_20px_-2px_rgba(26,26,30,0.06)] border-t border-surface-container-high/60">
      <div className="flex justify-around items-center h-16 px-4 max-w-md mx-auto">
        {navItems.map(item => {
          const isActive = currentScreen === item.id || (item.id === 'search' && currentScreen === 'burgers');
          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.id)}
              className={`flex flex-col items-center justify-center min-w-touch-min min-h-touch-min relative transition-all duration-200 ${
                isActive ? 'text-primary font-bold scale-105' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <div className="relative">
                <span
                  className="material-symbols-outlined text-[24px]"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
                {item.hasBadge && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2 rounded-full bg-primary ring-2 ring-surface"></span>
                )}
              </div>
              <span className="font-label-sm text-[11px] mt-0.5 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
