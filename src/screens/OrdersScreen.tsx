import React from 'react';
import { useCart } from '../context/CartContext';
import { AppHeader } from '../components/AppHeader';
import { BottomNav } from '../components/BottomNav';
import { FOOD_ITEMS } from '../data/mockData';

export const OrdersScreen: React.FC = () => {
  const { navigateTo, addToCart } = useCart();

  return (
    <div className="flex-1 flex flex-col relative w-full min-h-screen bg-surface pb-24 select-none">
      <AppHeader variant="feed" title="Your Orders" subtitle="Live Street Bites" />

      <main className="flex-1 flex flex-col pt-[88px] px-4 gap-4">
        {/* Active Order Card */}
        <div className="p-4 rounded-2xl bg-surface-container-lowest border border-primary/20 shadow-md flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
              </span>
              <span className="font-label-sm text-[11px] font-bold text-primary uppercase tracking-wide">
                Active Order • #TB-8942
              </span>
            </div>
            <span className="font-label-md text-[12px] bg-primary-fixed text-on-primary-fixed px-2 py-0.5 rounded-full font-bold">
              Preparing
            </span>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary-fixed flex items-center justify-center text-primary shrink-0">
              <span className="material-symbols-outlined text-[24px]">local_shipping</span>
            </div>
            <div className="flex flex-col min-w-0">
              <h4 className="font-headline-sm text-[15px] font-bold text-on-surface">
                Ahmedabad Food Truck #4
              </h4>
              <p className="font-body-sm text-[12px] text-secondary">
                2x Classic Cheese Burger, 1x Fries · Arriving in ~18 min
              </p>
            </div>
          </div>

          {/* Progress Tracker Bar */}
          <div className="w-full bg-surface-container-high h-2 rounded-full overflow-hidden my-1">
            <div className="bg-primary h-full rounded-full w-2/3 animate-pulse" />
          </div>

          <div className="flex items-center justify-between text-[11px] text-secondary">
            <span className="text-primary font-bold">✓ Order Placed</span>
            <span className="text-primary font-bold">● Searing Patty</span>
            <span>○ Out for Pickup</span>
          </div>
        </div>

        {/* Past Orders Section */}
        <div className="flex flex-col gap-3 mt-2">
          <h3 className="font-headline-sm text-[16px] font-bold text-on-surface">
            Past Street Orders
          </h3>

          {/* Past Order 1 */}
          <div className="p-4 rounded-2xl bg-surface-container-lowest border border-black/5 shadow-sm flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-[11px] text-secondary">
                Yesterday, 8:45 PM • Delivered
              </span>
              <span className="font-price-tag text-[15px] font-bold text-on-surface">₹448</span>
            </div>
            <div className="flex items-center gap-3">
              <img
                src={FOOD_ITEMS[0].imageUrl}
                alt="Classic Burger"
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div className="flex flex-col">
                <span className="font-headline-sm text-[14px] font-bold text-on-surface">
                  1x Classic Cheese Burger, 1x Cold Coffee
                </span>
                <span className="font-body-sm text-[11px] text-secondary">
                  Delivered to Vastrapur Lake, Ahmedabad
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                addToCart(FOOD_ITEMS[0], 1);
                navigateTo('checkout');
              }}
              className="mt-1 py-2 px-4 rounded-full bg-surface-container hover:bg-surface-container-high text-primary font-label-md text-[12px] font-bold transition-all text-center"
            >
              Reorder Items
            </button>
          </div>
        </div>
      </main>

      <BottomNav />
    </div>
  );
};
