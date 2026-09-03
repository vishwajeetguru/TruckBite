import React from 'react';
import { useCart } from '../context/CartContext';
import { TRUCKBITE_ASSETS } from '../data/mockData';
import { StatusBar } from './StatusBar';

interface AppHeaderProps {
  variant?: 'feed' | 'details' | 'checkout' | 'category';
  title?: string;
  subtitle?: string;
  showBack?: boolean;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  variant = 'feed',
  title = 'Home Feed',
  subtitle = 'Street Bites',
  showBack = false
}) => {
  const { goBack, navigateTo } = useCart();

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] border-b border-surface-container-high/60">
      <StatusBar />
      <div className="h-14 px-4 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-2.5 min-w-0">
          {showBack && (
            <button
              aria-label="Back"
              onClick={goBack}
              className="w-9 h-9 min-w-touch-min min-h-touch-min flex items-center justify-center text-on-surface hover:text-primary active:scale-95 transition-transform rounded-full -ml-1.5"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
          )}

          <img
            alt="TruckBite Logo"
            className="h-8 w-auto object-contain cursor-pointer"
            src={TRUCKBITE_ASSETS.logo}
            onClick={() => navigateTo('home')}
          />

          {variant === 'feed' ? (
            <div className="flex flex-col">
              <span className="font-label-sm text-[10px] text-primary uppercase tracking-wider font-bold">
                {subtitle}
              </span>
              <h1 className="font-headline-sm text-[18px] leading-tight font-bold text-on-surface truncate">
                {title}
              </h1>
            </div>
          ) : (
            <h1 className="font-headline-sm text-[18px] font-bold text-on-surface truncate">
              {title}
            </h1>
          )}
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-1.5">
          {variant === 'details' && (
            <button
              aria-label="Share"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({ title: 'Classic Cheese Burger - TruckBite', url: window.location.href }).catch(() => {});
                } else {
                  alert('Link copied to clipboard!');
                }
              }}
              className="w-9 h-9 flex items-center justify-center rounded-full text-on-surface hover:text-primary transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">share</span>
            </button>
          )}

          {variant === 'feed' && (
            <button
              aria-label="Notifications"
              onClick={() => alert('No new notifications for your area.')}
              className="w-9 h-9 min-w-touch-min min-h-touch-min flex items-center justify-center text-on-surface-variant hover:text-on-surface transition-colors rounded-full relative"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary ring-2 ring-surface"></span>
            </button>
          )}

          <button
            onClick={() => navigateTo('profile')}
            aria-label="Profile"
            className="relative"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20 hover:ring-primary transition-all"
              src={TRUCKBITE_ASSETS.profile}
            />
          </button>
        </div>
      </div>
    </header>
  );
};
