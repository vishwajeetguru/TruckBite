import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { FOOD_ITEMS } from '../data/mockData';
import { FoodItem } from '../types';
import { AppHeader } from '../components/AppHeader';
import { BottomNav } from '../components/BottomNav';
import { FloatingCartBar } from '../components/FloatingCartBar';

export const HomeFeedScreen: React.FC = () => {
  const { navigateTo, setSelectedFoodItem, addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('burgers');
  const [addedAnimationId, setAddedAnimationId] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState<string>('Ahmedabad, Gujarat');
  const [showLocationPicker, setShowLocationPicker] = useState<boolean>(false);

  const locations = [
    'Ahmedabad, Gujarat',
    'SG Highway, Ahmedabad',
    'Sindhu Bhavan Road, Bodakdev',
    'Vastrapur Lake, Ahmedabad',
    'Prahlad Nagar, Ahmedabad'
  ];

  const categories = [
    { id: 'burgers', label: 'Burgers', icon: 'lunch_dining' },
    { id: 'pizza', label: 'Pizza', icon: 'local_pizza' },
    { id: 'snacks', label: 'Snacks', icon: 'fastfood' },
    { id: 'meals', label: 'Meals', icon: 'ramen_dining' },
    { id: 'drinks', label: 'Drinks', icon: 'local_cafe' },
    { id: 'desserts', label: 'Desserts', icon: 'icecream' }
  ];

  const popularDishes = [FOOD_ITEMS[0], FOOD_ITEMS[5], FOOD_ITEMS[6]];
  const quickBites = [FOOD_ITEMS[2], FOOD_ITEMS[7], FOOD_ITEMS[8]];

  const handleOpenDetails = (item: FoodItem) => {
    setSelectedFoodItem(item);
    navigateTo('details');
  };

  const handleAddDish = (item: FoodItem, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(item, 1);
    setAddedAnimationId(item.id);
    setTimeout(() => setAddedAnimationId(null), 1200);
  };

  return (
    <div className="flex-1 flex flex-col relative w-full min-h-screen bg-surface pb-28">
      <AppHeader variant="feed" title="Home Feed" subtitle="Street Bites" />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col pt-[88px]">
        {/* Location & Context Header Sub-bar */}
        <div className="px-4 pt-2 pb-2 flex items-center justify-between">
          <div className="flex flex-col relative">
            <span className="font-label-md text-[12px] text-on-surface-variant flex items-center gap-1 font-semibold">
              Good afternoon <span className="inline-block animate-bounce">👋</span>
            </span>
            <button
              onClick={() => setShowLocationPicker(!showLocationPicker)}
              className="flex items-center gap-1 mt-0.5 text-left group"
            >
              <span
                className="material-symbols-outlined text-[18px] text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                location_on
              </span>
              <span className="font-headline-sm text-[16px] text-on-surface font-bold tracking-tight">
                {currentLocation}
              </span>
              <span className="material-symbols-outlined text-[18px] text-on-surface-variant group-hover:translate-y-0.5 transition-transform">
                keyboard_arrow_down
              </span>
            </button>

            {/* Location Selector Dropdown */}
            {showLocationPicker && (
              <div className="absolute top-14 left-0 z-30 bg-surface-container-lowest rounded-2xl shadow-xl border border-surface-container-highest p-2 w-64 animate-in fade-in zoom-in-95">
                <div className="font-label-sm text-[10px] text-secondary uppercase px-2 py-1 font-bold">
                  Select Street Location
                </div>
                {locations.map(loc => (
                  <button
                    key={loc}
                    onClick={() => {
                      setCurrentLocation(loc);
                      setShowLocationPicker(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-[13px] font-medium transition-colors flex items-center justify-between ${
                      loc === currentLocation
                        ? 'bg-primary/10 text-primary font-bold'
                        : 'hover:bg-surface-container-high text-on-surface'
                    }`}
                  >
                    <span>{loc}</span>
                    {loc === currentLocation && (
                      <span className="material-symbols-outlined text-[16px]">check</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              aria-label="Notifications"
              onClick={() => alert('All nearby trucks are currently live and serving!')}
              className="w-10 h-10 min-w-touch-min min-h-touch-min rounded-full bg-surface-container-low flex items-center justify-center text-on-surface hover:bg-surface-container transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
            </button>
            <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-primary rounded-full ring-2 ring-surface"></span>
          </div>
        </div>

        {/* Search Input Bar */}
        <div className="px-4 my-2">
          <div
            onClick={() => navigateTo('search')}
            className="relative flex items-center h-12 rounded-full bg-surface-container-low px-4 shadow-[0_2px_8px_-2px_rgba(30,30,36,0.04)] cursor-pointer hover:bg-surface-container transition-colors border border-black/5"
          >
            <span className="material-symbols-outlined text-secondary mr-3 text-[22px]">
              search
            </span>
            <input
              readOnly
              className="w-full bg-transparent font-body-md text-[14px] text-on-surface placeholder:text-secondary focus:outline-none cursor-pointer"
              placeholder="Search for burgers, pizza, drinks..."
              type="text"
            />
            <div className="flex items-center gap-2 text-secondary ml-2">
              <button
                type="button"
                aria-label="Voice Search"
                onClick={e => {
                  e.stopPropagation();
                  navigateTo('search');
                }}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">mic</span>
              </button>
              <button
                type="button"
                aria-label="Filters"
                onClick={e => {
                  e.stopPropagation();
                  navigateTo('search');
                }}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface-container transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">tune</span>
              </button>
            </div>
          </div>
        </div>

        {/* Hero Banner Card */}
        <div className="px-4 my-2">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary via-primary-container to-tertiary-container text-on-primary p-5 shadow-[0_12px_28px_-4px_rgba(255,75,38,0.22)]">
            <div className="relative z-10 max-w-[65%] flex flex-col items-start gap-1">
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-surface-container-lowest/20 backdrop-blur-md text-on-primary font-label-sm text-[11px] uppercase tracking-wider font-extrabold">
                <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
                Hot &amp; Fresh
              </span>
              <h2 className="font-display-sm text-[22px] text-on-primary leading-tight font-extrabold mt-1">
                Craving something delicious?
              </h2>
              <p className="font-body-sm text-[12px] text-primary-fixed opacity-95">
                Fresh food trucks cooking right by you.
              </p>
              <button
                onClick={() => navigateTo('burgers')}
                className="mt-3 px-5 py-2.5 bg-surface-container-lowest text-primary rounded-full font-label-lg text-[13px] font-bold shadow-md hover:bg-surface-container-low transition-all active:scale-95 flex items-center gap-1.5"
              >
                Order Now
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>

            {/* Background Graphic Accents */}
            <div className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full bg-white/10 blur-xl pointer-events-none" />
            <div className="absolute right-3 bottom-2 w-28 h-28 opacity-80 pointer-events-none flex items-center justify-center">
              <span className="material-symbols-outlined text-[96px] text-white/20 select-none">
                lunch_dining
              </span>
            </div>
          </div>
        </div>

        {/* Categories Horizontal Scroll */}
        <div className="mt-2 mb-3">
          <div className="flex items-center gap-2.5 overflow-x-auto px-4 py-1 no-scrollbar select-none">
            {categories.map(cat => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    if (cat.id === 'burgers') {
                      navigateTo('burgers');
                    }
                  }}
                  className={`flex-shrink-0 flex items-center gap-2 h-9 px-4 rounded-full shadow-sm transition-all active:scale-95 ${
                    active
                      ? 'bg-on-surface text-surface-container-lowest font-bold'
                      : 'bg-surface-container-low text-on-surface hover:bg-surface-container'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[18px]"
                    style={{ fontVariationSettings: active ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {cat.icon}
                  </span>
                  <span className="font-label-md text-[12px] font-semibold">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section: Popular Near You */}
        <div className="px-4 flex flex-col gap-2.5 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span
                className="material-symbols-outlined text-primary text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                stars
              </span>
              <h3 className="font-headline-md text-[18px] text-on-surface font-bold">
                Popular Near You
              </h3>
            </div>
            <button
              onClick={() => navigateTo('burgers')}
              className="font-label-md text-[12px] text-primary font-bold hover:underline"
            >
              View All
            </button>
          </div>

          {/* Dish Cards List */}
          {popularDishes.map(dish => {
            const isAdded = addedAnimationId === dish.id;
            return (
              <div
                key={dish.id}
                onClick={() => handleOpenDetails(dish)}
                className="flex items-center justify-between p-3.5 rounded-xl bg-surface-container-lowest shadow-[0_2px_8px_-2px_rgba(30,30,36,0.04),0_1px_3px_0_rgba(30,30,36,0.02)] transition-all hover:shadow-md cursor-pointer border border-black/5"
              >
                <div className="flex-1 pr-3 min-w-0">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span
                      className={`inline-flex items-center justify-center w-3.5 h-3.5 rounded-sm ${
                        dish.isVeg ? 'bg-emerald-100 text-emerald-700' : 'bg-error/10 text-error'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          dish.isVeg ? 'bg-emerald-600' : 'bg-error'
                        }`}
                      />
                    </span>
                    <span className="font-label-sm text-[11px] text-on-surface-variant font-bold">
                      {dish.badge}
                    </span>
                  </div>

                  <h4 className="font-headline-sm text-[16px] text-on-surface font-bold truncate leading-snug">
                    {dish.name}
                  </h4>
                  <p className="font-body-sm text-[12px] text-secondary line-clamp-2 mt-0.5">
                    {dish.description}
                  </p>

                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-[11px] font-bold">
                      <span
                        className="material-symbols-outlined text-[12px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span>{dish.rating}</span>
                    </div>
                    <span className="font-body-sm text-[11px] text-secondary">({dish.ratingCount})</span>
                    <span className="font-price-tag text-[16px] font-black text-on-surface ml-auto">
                      ₹{dish.price}
                    </span>
                  </div>
                </div>

                <div className="relative flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden bg-surface-container shadow-inner">
                  <img alt={dish.name} className="w-full h-full object-cover" src={dish.imageUrl} />
                  <button
                    onClick={e => handleAddDish(dish, e)}
                    className={`absolute bottom-1 right-1 px-3 py-1 rounded-full font-label-md text-[12px] font-bold shadow-md transition-all flex items-center gap-0.5 ${
                      isAdded
                        ? 'bg-primary text-on-primary scale-105'
                        : 'bg-surface-container-lowest text-primary hover:bg-primary hover:text-on-primary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      {isAdded ? 'check' : 'add'}
                    </span>
                    {isAdded ? 'Added' : 'Add'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section: Best Sellers & Quick Bites */}
        <div className="px-4 flex flex-col gap-2.5 mb-20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-primary text-[20px]">bolt</span>
              <h3 className="font-headline-md text-[18px] text-on-surface font-bold">
                Best Sellers &amp; Quick Bites
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-2.5">
            {quickBites.map(qb => {
              const isAdded = addedAnimationId === qb.id;
              return (
                <div
                  key={qb.id}
                  onClick={() => handleOpenDetails(qb)}
                  className="flex items-center justify-between p-3 rounded-xl bg-surface-container-lowest shadow-sm border border-black/5 hover:shadow-md transition-all cursor-pointer"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-12 h-12 rounded-lg bg-surface-container flex items-center justify-center text-primary flex-shrink-0">
                      <span className="material-symbols-outlined text-[26px]">
                        {qb.category === 'burgers'
                          ? 'lunch_dining'
                          : qb.category === 'pizza'
                          ? 'local_pizza'
                          : 'emoji_food_beverage'}
                      </span>
                    </div>
                    <div className="flex flex-col min-w-0 pr-2">
                      <span className="font-headline-sm text-[15px] text-on-surface font-bold leading-snug truncate">
                        {qb.name}
                      </span>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="font-price-tag text-[15px] font-bold text-on-surface">
                          ₹{qb.price}
                        </span>
                        <span className="text-secondary">•</span>
                        <div className="flex items-center gap-0.5 text-tertiary font-label-sm text-[11px] font-bold">
                          <span
                            className="material-symbols-outlined text-[13px]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            star
                          </span>
                          <span>{qb.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={e => handleAddDish(qb, e)}
                    className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-sm shrink-0 active:scale-90 ${
                      isAdded
                        ? 'bg-primary text-on-primary'
                        : 'bg-surface-container-low text-primary hover:bg-primary hover:text-on-primary'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {isAdded ? 'check' : 'add'}
                    </span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <FloatingCartBar />
      <BottomNav />
    </div>
  );
};
