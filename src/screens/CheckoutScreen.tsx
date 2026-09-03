import React from 'react';
import { useCart } from '../context/CartContext';
import { AppHeader } from '../components/AppHeader';
import { OrderSuccessModal } from '../components/OrderSuccessModal';

export const CheckoutScreen: React.FC = () => {
  const {
    cartItems,
    updateQuantity,
    removeItem,
    clearCart,
    couponApplied,
    couponCode,
    toggleCoupon,
    cookingInstructions,
    setCookingInstructions,
    itemTotal,
    discountAmount,
    taxesAndPackaging,
    finalTotal,
    setIsOrderPlacedModalOpen,
    navigateTo
  } = useCart();

  return (
    <div className="flex-1 flex flex-col relative w-full min-h-screen bg-surface select-none">
      <AppHeader variant="checkout" title="Checkout" showBack />

      <main className="flex-1 flex flex-col pt-[88px] pb-36">
        {/* Subheader / Clear cart action strip */}
        <div className="px-4 pt-1 pb-3 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-headline-sm text-[18px] text-on-surface font-bold">
              Your Cart
            </span>
            <span className="font-label-md text-[12px] text-secondary bg-surface-container px-2.5 py-0.5 rounded-full font-bold">
              {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          {cartItems.length > 0 && (
            <button
              onClick={clearCart}
              className="min-h-touch-min px-2 flex items-center gap-1 font-label-md text-[12px] text-primary hover:text-primary-container active:scale-95 transition-all font-bold"
            >
              <span className="material-symbols-outlined text-[18px]">delete_sweep</span>
              <span>Clear Cart</span>
            </button>
          )}
        </div>

        {/* Delivery Destination Card */}
        <div className="px-4 mb-3">
          <div className="bg-surface-container-low rounded-2xl p-3.5 shadow-sm flex items-center justify-between gap-3 border border-black/5">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed shrink-0">
                <span className="material-symbols-outlined text-[20px]">location_on</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-label-md text-[13px] text-on-surface font-bold truncate">
                    Delivering to your location
                  </span>
                  <span className="font-label-sm text-[10px] text-on-tertiary-container bg-tertiary-container/20 text-tertiary px-1.5 py-0.2 rounded font-bold">
                    Fast
                  </span>
                </div>
                <p className="font-body-sm text-[12px] text-secondary truncate">
                  Ahmedabad, Gujarat · 25–30 min
                </p>
              </div>
            </div>

            <button
              onClick={() => alert('Delivery address is set to your current GPS food-truck zone: Ahmedabad.')}
              className="min-h-touch-min px-3 py-1.5 rounded-full bg-surface-container-highest text-on-surface font-label-md text-[12px] font-semibold shrink-0 hover:bg-surface-variant active:scale-95 transition-all"
            >
              Change
            </button>
          </div>
        </div>

        {/* Cart Items Section */}
        <div className="px-4 flex flex-col gap-3 mb-4">
          {cartItems.length === 0 ? (
            <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm flex flex-col items-center text-center gap-3 border border-black/5">
              <span className="material-symbols-outlined text-[48px] text-outline">
                shopping_cart
              </span>
              <h3 className="font-headline-sm text-[16px] font-bold text-on-surface">
                Your cart is empty
              </h3>
              <p className="font-body-sm text-[13px] text-secondary">
                Explore hot street food trucks cooking right by you!
              </p>
              <button
                onClick={() => navigateTo('burgers')}
                className="mt-2 px-6 py-2.5 bg-primary text-on-primary rounded-full font-bold text-[13px]"
              >
                Browse Food Trucks
              </button>
            </div>
          ) : (
            cartItems.map(item => {
              const linePrice = item.foodItem.price * item.quantity;
              return (
                <div
                  key={item.foodItem.id}
                  className="bg-surface-container-lowest rounded-2xl p-3 shadow-sm flex gap-3 items-center border border-black/5"
                >
                  <img
                    alt={item.foodItem.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0 shadow-sm bg-surface-container"
                    src={item.foodItem.imageUrl}
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between self-stretch">
                    <div className="flex items-start justify-between gap-1">
                      <div className="min-w-0 pr-1">
                        <h3 className="font-headline-sm text-[15px] text-on-surface font-bold leading-tight truncate">
                          {item.foodItem.name}
                        </h3>
                        <p className="font-body-sm text-[12px] text-secondary truncate mt-0.5">
                          {item.selectedSize || item.foodItem.customization || 'Regular'}
                        </p>
                      </div>

                      <button
                        aria-label={`Remove ${item.foodItem.name}`}
                        onClick={() => removeItem(item.foodItem.id)}
                        className="w-8 h-8 min-w-touch-min min-h-touch-min -mr-2 -mt-1 flex items-center justify-center text-outline hover:text-error active:scale-90 transition-all shrink-0"
                      >
                        <span className="material-symbols-outlined text-[20px]">delete_outline</span>
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="font-price-tag text-[16px] font-black text-on-surface">
                        ₹{linePrice}
                      </span>

                      <div className="flex items-center bg-surface-container-high rounded-full px-1 py-0.5 shadow-inner border border-outline-variant/50">
                        <button
                          aria-label="Decrease quantity"
                          onClick={() => updateQuantity(item.foodItem.id, -1)}
                          className="w-7 h-7 min-w-[30px] min-h-[30px] flex items-center justify-center rounded-full text-on-surface active:bg-surface-container-highest transition-colors"
                        >
                          <span className="material-symbols-outlined text-[16px]">remove</span>
                        </button>
                        <span className="font-label-lg text-[13px] text-on-surface px-2.5 font-bold select-none">
                          {item.quantity}
                        </span>
                        <button
                          aria-label="Increase quantity"
                          onClick={() => updateQuantity(item.foodItem.id, 1)}
                          className="w-7 h-7 min-w-[30px] min-h-[30px] flex items-center justify-center rounded-full text-on-surface active:bg-surface-container-highest transition-colors"
                        >
                          <span className="material-symbols-outlined text-[16px]">add</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {/* Add more items quick button */}
          <button
            onClick={() => navigateTo('burgers')}
            className="w-full min-h-touch-min py-3 px-4 rounded-xl bg-surface-container-low hover:bg-surface-container active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-primary font-label-lg text-[13px] font-bold shadow-sm border border-black/5"
          >
            <span className="material-symbols-outlined text-[20px]">add_circle</span>
            <span>Add more items</span>
          </button>
        </div>

        {/* Coupon Section */}
        <div className="px-4 mb-3">
          <div className="bg-surface-container-lowest rounded-2xl p-3.5 shadow-sm flex items-center justify-between gap-3 border border-black/5">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[20px]">local_offer</span>
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-label-md text-[13px] text-on-surface font-extrabold tracking-wide">
                    {couponCode}
                  </span>
                  {couponApplied ? (
                    <span className="bg-surface-container-highest text-primary font-label-sm text-[10px] px-2 py-0.2 rounded-full font-bold">
                      Applied
                    </span>
                  ) : (
                    <span className="bg-surface-container text-secondary font-label-sm text-[10px] px-2 py-0.2 rounded-full font-semibold">
                      Available
                    </span>
                  )}
                </div>
                <p className="font-body-sm text-[12px] text-secondary">
                  {couponApplied ? 'Saved ₹50 on this feast!' : 'Save ₹50 with this code'}
                </p>
              </div>
            </div>

            <button
              onClick={() => toggleCoupon(!couponApplied)}
              className={`min-h-touch-min px-2 font-label-md text-[12px] font-bold active:scale-95 transition-all shrink-0 ${
                couponApplied ? 'text-error hover:opacity-85' : 'text-primary hover:underline'
              }`}
            >
              {couponApplied ? 'Remove' : 'Apply'}
            </button>
          </div>
        </div>

        {/* Cooking Instructions & Tip */}
        <div className="px-4 mb-3">
          <div className="bg-surface-container-lowest rounded-2xl p-3 shadow-sm flex items-center gap-3 border border-black/5">
            <span className="material-symbols-outlined text-outline text-[22px]">notes</span>
            <input
              value={cookingInstructions}
              onChange={e => setCookingInstructions(e.target.value)}
              className="w-full bg-transparent font-body-sm text-[13px] text-on-surface placeholder:text-outline focus:outline-none"
              placeholder="Add cooking instructions (extra crispy, no onions...)"
              type="text"
            />
          </div>
        </div>

        {/* Bill Details Section */}
        <div className="px-4 mb-5">
          <div className="bg-surface-container-lowest rounded-2xl p-4 shadow-sm flex flex-col gap-2.5 border border-black/5">
            <h4 className="font-label-lg text-[14px] text-on-surface font-bold">Bill Details</h4>

            <div className="flex items-center justify-between font-body-sm text-[13px] text-secondary">
              <span>Item Total</span>
              <span className="font-medium text-on-surface">₹{itemTotal}</span>
            </div>

            <div className="flex items-center justify-between font-body-sm text-[13px] text-secondary">
              <div className="flex items-center gap-1">
                <span>Delivery Fee</span>
                <span className="text-label-sm text-[11px] text-primary line-through font-semibold">
                  ₹49
                </span>
              </div>
              <span className="text-primary font-bold">FREE</span>
            </div>

            <div className="flex items-center justify-between font-body-sm text-[13px] text-secondary">
              <span>Taxes &amp; Packaging</span>
              <span className="font-medium text-on-surface">₹{taxesAndPackaging}</span>
            </div>

            {couponApplied && (
              <div className="flex items-center justify-between font-body-sm text-[13px] text-primary font-semibold">
                <span>Coupon Discount</span>
                <span>-₹{discountAmount}</span>
              </div>
            )}

            <div className="h-0.5 bg-surface-container-high my-1 rounded-full" />

            <div className="flex items-center justify-between pt-1">
              <div className="flex flex-col">
                <span className="font-headline-sm text-[17px] text-on-surface font-bold">To Pay</span>
                <span className="font-label-sm text-[11px] text-secondary">Incl. all taxes</span>
              </div>
              <span className="font-display-sm text-[26px] text-primary font-black tracking-tight">
                ₹{finalTotal}
              </span>
            </div>
          </div>
        </div>

        {/* Trust / Delight Micro Banner */}
        <div className="px-4 mb-4 flex items-center justify-center gap-2 text-secondary">
          <span className="material-symbols-outlined text-[18px] text-tertiary">verified_user</span>
          <span className="font-body-sm text-[12px]">
            100% Hygienic Food Trucks · Contactless Prep
          </span>
        </div>
      </main>

      {/* Sticky Bottom Checkout Bar */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-surface/95 backdrop-blur-xl shadow-[0_-4px_20px_-2px_rgba(26,26,30,0.08)] pb-safe pt-3 px-4 border-t border-surface-container-high">
        <div className="max-w-md mx-auto flex items-center justify-between gap-3 mb-2">
          <div className="flex flex-col">
            <span className="font-label-sm text-[10px] text-secondary uppercase tracking-wider font-bold">
              Total Amount
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="font-display-sm text-[24px] font-extrabold text-on-surface leading-none">
                ₹{finalTotal}
              </span>
              <span className="font-label-sm text-[11px] text-primary font-bold">Save ₹99</span>
            </div>
          </div>

          <button
            onClick={() => setIsOrderPlacedModalOpen(true)}
            disabled={cartItems.length === 0}
            className="flex-1 min-h-touch-min py-3.5 px-6 rounded-full bg-primary hover:bg-primary-container active:scale-[0.98] disabled:opacity-50 text-on-primary font-label-lg text-[13px] font-bold shadow-lg shadow-primary/25 flex items-center justify-center gap-2 transition-all"
          >
            <span>Proceed to Checkout</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>
        </div>

        <div className="text-center pb-1">
          <p className="font-label-sm text-[11px] text-secondary">
            Login or register requested on next step
          </p>
        </div>
      </div>

      <OrderSuccessModal />
    </div>
  );
};
