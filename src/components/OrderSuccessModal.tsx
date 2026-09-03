import React from 'react';
import { useCart } from '../context/CartContext';

export const OrderSuccessModal: React.FC = () => {
  const { isOrderPlacedModalOpen, setIsOrderPlacedModalOpen, navigateTo, clearCart, finalTotal } = useCart();

  if (!isOrderPlacedModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-surface rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-surface-container-high flex flex-col items-center text-center">
        {/* Animated Checkmark Bubble */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4 ring-8 ring-emerald-50">
          <span className="material-symbols-outlined text-[36px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            check_circle
          </span>
        </div>

        <span className="font-label-sm text-[11px] text-primary uppercase tracking-wider font-extrabold mb-1">
          Order Confirmed • #TB-8942
        </span>
        <h3 className="font-headline-lg text-[22px] font-extrabold text-on-surface mb-2">
          Cooking in Progress!
        </h3>
        <p className="font-body-sm text-[13px] text-on-surface-variant mb-4 leading-relaxed">
          TruckBite mobile unit near <strong>Ahmedabad, Gujarat</strong> has received your order. Fresh patties are on the griddle!
        </p>

        {/* ETA & Status Card */}
        <div className="w-full bg-surface-container-low rounded-2xl p-3.5 mb-5 flex items-center justify-between border border-surface-container-high">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">local_shipping</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-label-md text-[12px] font-bold text-on-surface">Estimated Arrival</span>
              <span className="font-body-sm text-[11px] text-secondary">20–25 minutes</span>
            </div>
          </div>
          <span className="font-price-tag text-[15px] font-black text-primary">
            ₹{finalTotal || 778}
          </span>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2.5 w-full">
          <button
            onClick={() => {
              setIsOrderPlacedModalOpen(false);
              clearCart();
              navigateTo('orders');
            }}
            className="w-full py-3.5 px-5 rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-lg text-[14px] font-bold shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <span>Track Live Order</span>
            <span className="material-symbols-outlined text-[18px]">near_me</span>
          </button>
          <button
            onClick={() => {
              setIsOrderPlacedModalOpen(false);
              clearCart();
              navigateTo('home');
            }}
            className="w-full py-3 px-5 rounded-full bg-surface-container-high hover:bg-surface-variant text-on-surface font-label-md text-[13px] font-semibold active:scale-95 transition-all"
          >
            Back to Home Feed
          </button>
        </div>
      </div>
    </div>
  );
};
