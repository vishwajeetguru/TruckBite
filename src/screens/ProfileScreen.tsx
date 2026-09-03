import React from 'react';
import { useCart } from '../context/CartContext';
import { TRUCKBITE_ASSETS } from '../data/mockData';
import { AppHeader } from '../components/AppHeader';
import { BottomNav } from '../components/BottomNav';

export const ProfileScreen: React.FC = () => {
  const { navigateTo } = useCart();

  return (
    <div className="flex-1 flex flex-col relative w-full min-h-screen bg-surface pb-24 select-none">
      <AppHeader variant="feed" title="My Profile" subtitle="TruckBite Account" />

      <main className="flex-1 flex flex-col pt-[88px] px-4 gap-4">
        {/* User Card */}
        <div className="p-4 rounded-3xl bg-surface-container-lowest shadow-sm border border-black/5 flex items-center gap-4">
          <img
            src={TRUCKBITE_ASSETS.profile}
            alt="Profile Avatar"
            className="w-16 h-16 rounded-full object-cover ring-4 ring-primary/20"
          />
          <div className="flex flex-col min-w-0">
            <h3 className="font-headline-sm text-[18px] font-bold text-on-surface">
              Shreya Patel
            </h3>
            <p className="font-body-sm text-[12px] text-secondary">
              shreya.patel@example.com
            </p>
            <div className="flex items-center gap-1 mt-1 text-primary font-label-sm text-[11px] font-bold">
              <span className="material-symbols-outlined text-[14px]">stars</span>
              <span>TruckBite Gold Member</span>
            </div>
          </div>
        </div>

        {/* Settings Links */}
        <div className="bg-surface-container-lowest rounded-3xl p-2 shadow-sm border border-black/5 divide-y divide-surface-container-high">
          <div className="flex items-center justify-between p-3 cursor-pointer hover:bg-surface-container-low rounded-2xl transition-colors">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[20px]">location_on</span>
              <div className="flex flex-col">
                <span className="font-label-md text-[13px] font-bold text-on-surface">
                  Saved Locations
                </span>
                <span className="font-body-sm text-[11px] text-secondary">
                  Ahmedabad, Gujarat (Home &amp; Office)
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-secondary text-[18px]">
              chevron_right
            </span>
          </div>

          <div className="flex items-center justify-between p-3 cursor-pointer hover:bg-surface-container-low rounded-2xl transition-colors">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[20px]">credit_card</span>
              <div className="flex flex-col">
                <span className="font-label-md text-[13px] font-bold text-on-surface">
                  Payment Methods
                </span>
                <span className="font-body-sm text-[11px] text-secondary">UPI, Cards &amp; Cash</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-secondary text-[18px]">
              chevron_right
            </span>
          </div>

          <div className="flex items-center justify-between p-3 cursor-pointer hover:bg-surface-container-low rounded-2xl transition-colors">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[20px]">local_offer</span>
              <div className="flex flex-col">
                <span className="font-label-md text-[13px] font-bold text-on-surface">
                  Coupons &amp; Offers
                </span>
                <span className="font-body-sm text-[11px] text-secondary">
                  Code TRUCKBITE50 active
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-secondary text-[18px]">
              chevron_right
            </span>
          </div>

          <div
            onClick={() => navigateTo('location')}
            className="flex items-center justify-between p-3 cursor-pointer hover:bg-surface-container-low rounded-2xl transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-primary text-[20px]">my_location</span>
              <div className="flex flex-col">
                <span className="font-label-md text-[13px] font-bold text-on-surface">
                  Location Radar Simulation
                </span>
                <span className="font-body-sm text-[11px] text-secondary">
                  Rerun location onboarding
                </span>
              </div>
            </div>
            <span className="material-symbols-outlined text-secondary text-[18px]">
              chevron_right
            </span>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};
