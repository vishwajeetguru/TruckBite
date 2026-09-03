import React from 'react';
import { useCart } from '../context/CartContext';

export const FloatingCartBar: React.FC = () => {
  const { currentScreen, cartItems, finalTotal, totalCartCount, navigateTo } = useCart();

  // Only show on home, burgers, or search screens when cart is not empty
  if (
    cartItems.length === 0 ||
    (currentScreen !== 'home' && currentScreen !== 'burgers' && currentScreen !== 'search')
  ) {
    return null;
  }

  return (
    <div className="fixed bottom-20 inset-x-0 z-40 px-4 max-w-md mx-auto pointer-events-none transition-all duration-300">
      <div className="pointer-events-auto flex items-center justify-between p-2.5 pl-4 rounded-full bg-inverse-surface text-inverse-on-surface shadow-[0_12px_28px_-4px_rgba(26,26,30,0.35)] backdrop-blur-md border border-white/10 animate-fade-in">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary-fixed flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[18px]">shopping_bag</span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-label-sm text-[11px] text-surface-dim uppercase font-bold tracking-wider">
              {totalCartCount} {totalCartCount === 1 ? 'Item' : 'Items'} in cart
            </span>
            <span className="font-headline-sm text-[18px] text-inverse-on-surface font-extrabold leading-none">
              ₹{finalTotal}
            </span>
          </div>
        </div>

        <button
          onClick={() => navigateTo('checkout')}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-lg text-[13px] font-bold shadow-sm active:scale-95 transition-all"
        >
          <span>View Cart</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
