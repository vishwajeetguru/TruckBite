import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { FOOD_ITEMS } from '../data/mockData';
import { FoodItem } from '../types';
import { AppHeader } from '../components/AppHeader';
import { BottomNav } from '../components/BottomNav';
import { FloatingCartBar } from '../components/FloatingCartBar';

export const BurgersScreen: React.FC = () => {
  const { navigateTo, goBack, setSelectedFoodItem, addToCart, cartItems, updateQuantity } = useCart();
  const [activeFilter, setActiveFilter] = useState<'popular' | 'price' | 'rating' | 'veg'>('popular');

  const burgerItems = useMemo(() => {
    let items = FOOD_ITEMS.filter(f => f.category === 'burgers');

    if (activeFilter === 'veg') {
      items = items.filter(f => f.isVeg);
    } else if (activeFilter === 'price') {
      items = [...items].sort((a, b) => a.price - b.price);
    } else if (activeFilter === 'rating') {
      items = [...items].sort((a, b) => b.rating - a.rating);
    }
    return items;
  }, [activeFilter]);

  const spotlightItem = FOOD_ITEMS[1]; // Double Smoked Crunch

  const handleOpenDetails = (item: FoodItem) => {
    setSelectedFoodItem(item);
    navigateTo('details');
  };

  const getItemQuantity = (itemId: string) => {
    const found = cartItems.find(ci => ci.foodItem.id === itemId);
    return found ? found.quantity : 0;
  };

  return (
    <div className="flex-1 flex flex-col relative w-full min-h-screen bg-surface pb-28 select-none">
      <AppHeader variant="feed" title="Search Trucks" subtitle="Street Bites" />

      <main className="flex-1 flex flex-col pt-[88px]">
        {/* Sub-Header / Category Context */}
        <div className="px-4 pt-1 pb-2 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              aria-label="Go Back"
              onClick={goBack}
              className="w-10 h-10 min-w-touch-min min-h-touch-min rounded-full flex items-center justify-center bg-surface-container-low text-on-surface active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="font-headline-md text-[20px] font-bold text-on-surface truncate">
                  Burgers
                </h2>
                <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-[11px] font-bold">
                  {burgerItems.length} options
                </span>
              </div>
              <p className="font-body-sm text-[12px] text-on-surface-variant truncate">
                Delicious burgers made fresh for you
              </p>
            </div>
          </div>

          <div className="relative flex items-center">
            <button
              aria-label="View Cart"
              onClick={() => navigateTo('checkout')}
              className="w-10 h-10 min-w-touch-min min-h-touch-min rounded-full flex items-center justify-center bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
            </button>
            {cartItems.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary font-label-sm text-[10px] text-on-primary font-bold shadow-sm pointer-events-none">
                {cartItems.length}
              </span>
            )}
          </div>
        </div>

        {/* Featured Spotlight Banner */}
        <div className="px-4 pt-1 pb-2">
          <div
            onClick={() => handleOpenDetails(spotlightItem)}
            className="relative overflow-hidden rounded-2xl bg-surface-container-high p-4 flex items-center justify-between shadow-sm cursor-pointer hover:shadow-md transition-all border border-black/5"
          >
            <div className="flex flex-col z-10 max-w-[65%]">
              <span className="font-label-sm text-[10px] text-primary uppercase font-bold tracking-wider">
                Chef's Choice
              </span>
              <h3 className="font-headline-sm text-[17px] font-bold text-on-surface mt-0.5 leading-snug">
                {spotlightItem.name}
              </h3>
              <p className="font-body-sm text-[11px] text-on-surface-variant mt-1 line-clamp-2 leading-relaxed">
                {spotlightItem.description}
              </p>
              <div className="mt-2.5 flex items-center gap-2">
                <span className="font-price-tag text-[17px] font-black text-primary">
                  ₹{spotlightItem.price}
                </span>
                <span className="font-label-sm text-[12px] text-on-surface-variant line-through font-semibold">
                  ₹{spotlightItem.originalPrice}
                </span>
              </div>
            </div>

            <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 shadow-md relative bg-surface-container">
              <img
                alt="Chef Special Burger"
                className="w-full h-full object-cover"
                src={spotlightItem.imageUrl}
              />
              <span className="absolute bottom-1 right-1 bg-surface/90 backdrop-blur-md px-1.5 py-0.5 rounded-full font-label-sm text-[10px] text-on-surface font-extrabold shadow-sm">
                HOT
              </span>
            </div>
          </div>
        </div>

        {/* Filter & Sort Scrollable Chips Bar */}
        <div className="py-2">
          <div className="flex items-center gap-2 overflow-x-auto px-4 no-scrollbar py-0.5">
            <button
              onClick={() => setActiveFilter('popular')}
              className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-label-md text-[12px] font-bold shadow-sm transition-all ${
                activeFilter === 'popular'
                  ? 'bg-on-surface text-surface'
                  : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-low border border-black/5'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
              <span>Popular</span>
            </button>

            <button
              onClick={() => setActiveFilter('price')}
              className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-label-md text-[12px] font-bold shadow-sm transition-all ${
                activeFilter === 'price'
                  ? 'bg-on-surface text-surface'
                  : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-low border border-black/5'
              }`}
            >
              <span className="material-symbols-outlined text-[16px]">swap_vert</span>
              <span>Price: Low to High</span>
            </button>

            <button
              onClick={() => setActiveFilter('rating')}
              className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-label-md text-[12px] font-bold shadow-sm transition-all ${
                activeFilter === 'rating'
                  ? 'bg-on-surface text-surface'
                  : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-low border border-black/5'
              }`}
            >
              <span className="material-symbols-outlined text-[16px] text-tertiary">star</span>
              <span>Rating 4.0+</span>
            </button>

            <button
              onClick={() => setActiveFilter('veg')}
              className={`shrink-0 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-label-md text-[12px] font-bold shadow-sm transition-all ${
                activeFilter === 'veg'
                  ? 'bg-on-surface text-surface'
                  : 'bg-surface-container-lowest text-on-surface-variant hover:bg-surface-container-low border border-black/5'
              }`}
            >
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-600"></span>
              <span>Pure Veg</span>
            </button>
          </div>
        </div>

        {/* Product Listings */}
        <div className="px-4 pt-1 flex flex-col gap-3">
          {burgerItems.map(burger => {
            const qty = getItemQuantity(burger.id);
            return (
              <div
                key={burger.id}
                onClick={() => handleOpenDetails(burger)}
                className="group flex gap-3 p-3.5 rounded-2xl bg-surface-container-lowest shadow-sm transition-all hover:shadow-md cursor-pointer border border-black/5"
              >
                <div className="flex-1 flex flex-col justify-between min-w-0 pr-1">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span
                        className={`inline-flex items-center justify-center w-3.5 h-3.5 rounded-sm ${
                          burger.isVeg ? 'bg-emerald-100 text-emerald-700' : 'bg-error-container text-error'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            burger.isVeg ? 'bg-emerald-600' : 'bg-error'
                          }`}
                        />
                      </span>
                      <span
                        className={`font-label-sm text-[10px] font-bold uppercase tracking-wider ${
                          burger.isVeg ? 'text-emerald-700' : 'text-primary'
                        }`}
                      >
                        {burger.badge}
                      </span>
                    </div>
                    <h4 className="font-headline-sm text-[16px] text-on-surface font-bold leading-snug">
                      {burger.name}
                    </h4>
                    <p className="font-body-sm text-[12px] text-on-surface-variant mt-1 line-clamp-2">
                      {burger.description}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between pt-1">
                    <span className="font-price-tag text-[16px] font-black text-on-surface">
                      ₹{burger.price}
                    </span>
                    <div className="flex items-center gap-1 text-on-surface-variant font-label-sm text-[11px]">
                      <span
                        className="material-symbols-outlined text-[14px] text-tertiary"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span className="font-bold text-on-surface">{burger.rating}</span>
                      <span>({burger.ratingCount})</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-center shrink-0 w-28">
                  <div className="relative w-28 h-24 rounded-xl overflow-hidden shadow-inner bg-surface-container">
                    <img
                      alt={burger.name}
                      className="w-full h-full object-cover"
                      src={burger.imageUrl}
                    />
                  </div>

                  {/* Stepper or Add Button Pill */}
                  {qty > 0 ? (
                    <div
                      onClick={e => e.stopPropagation()}
                      className="relative -mt-4 z-10 flex items-center bg-surface shadow-md rounded-full px-1 py-0.5 border border-outline-variant"
                    >
                      <button
                        aria-label="Decrease quantity"
                        onClick={() => updateQuantity(burger.id, -1)}
                        className="w-7 h-7 flex items-center justify-center text-primary active:scale-90 transition-transform"
                      >
                        <span className="material-symbols-outlined text-[16px]">remove</span>
                      </button>
                      <span className="font-label-lg text-[13px] px-2 text-on-surface font-bold select-none">
                        {qty}
                      </span>
                      <button
                        aria-label="Increase quantity"
                        onClick={() => updateQuantity(burger.id, 1)}
                        className="w-7 h-7 flex items-center justify-center text-primary active:scale-90 transition-transform"
                      >
                        <span className="material-symbols-outlined text-[16px]">add</span>
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        addToCart(burger, 1);
                      }}
                      className="relative -mt-4 z-10 px-4 py-1.5 rounded-full bg-surface text-primary shadow-md hover:bg-primary hover:text-on-primary font-label-md text-[12px] font-bold transition-all active:scale-95 flex items-center gap-1 border border-outline-variant/60"
                    >
                      <span className="material-symbols-outlined text-[14px]">add</span>
                      <span>ADD</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <FloatingCartBar />
      <BottomNav />
    </div>
  );
};
