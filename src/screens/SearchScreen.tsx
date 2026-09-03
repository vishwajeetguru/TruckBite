import React, { useState, useMemo } from 'react';
import { useCart } from '../context/CartContext';
import { FOOD_ITEMS } from '../data/mockData';
import { FoodItem } from '../types';
import { AppHeader } from '../components/AppHeader';
import { BottomNav } from '../components/BottomNav';
import { FloatingCartBar } from '../components/FloatingCartBar';

export const SearchScreen: React.FC = () => {
  const { navigateTo, setSelectedFoodItem, addToCart } = useCart();
  const [searchQuery, setSearchQuery] = useState<string>('Burger');
  const [recentSearches, setRecentSearches] = useState<string[]>(['Burger', 'Pizza', 'Cold Coffee']);
  const [addedItemIds, setAddedItemIds] = useState<Record<string, boolean>>({});

  const popularSearches = [
    { label: 'Cheese Burger', highlight: true },
    { label: 'Chicken Pizza', highlight: false },
    { label: 'Loaded Fries', highlight: false },
    { label: 'Cold Coffee', highlight: false },
    { label: 'Veggie Wrap', highlight: false }
  ];

  const filteredItems = useMemo(() => {
    if (!searchQuery.trim()) {
      return FOOD_ITEMS.slice(0, 3);
    }
    const q = searchQuery.toLowerCase();
    const matches = FOOD_ITEMS.filter(
      item =>
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
    return matches.length > 0 ? matches : FOOD_ITEMS.slice(0, 3);
  }, [searchQuery]);

  const handleOpenDetails = (item: FoodItem) => {
    setSelectedFoodItem(item);
    navigateTo('details');
  };

  const handleAdd = (item: FoodItem, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(item, 1);
    setAddedItemIds(prev => ({ ...prev, [item.id]: true }));
    setTimeout(() => {
      setAddedItemIds(prev => ({ ...prev, [item.id]: false }));
    }, 1200);
  };

  const removeRecent = (text: string) => {
    setRecentSearches(prev => prev.filter(s => s !== text));
  };

  const clearAllRecent = () => {
    setRecentSearches([]);
  };

  return (
    <div className="flex-1 flex flex-col relative w-full min-h-screen bg-surface pb-28 select-none">
      <AppHeader variant="feed" title="Search Trucks" subtitle="Street Bites" />

      <main className="flex-1 flex flex-col pt-[88px]">
        {/* Sticky Search Input Bar */}
        <div className="sticky top-[80px] z-30 px-4 pt-1 pb-2 bg-surface/95 backdrop-blur-md">
          <div className="flex items-center gap-2.5 w-full">
            <div className="relative flex-1 flex items-center bg-surface-container-low rounded-full px-4 py-2.5 shadow-sm border border-black/5">
              <span className="material-symbols-outlined text-[20px] text-outline mr-2 select-none">
                search
              </span>
              <input
                id="searchInput"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search food, dishes, cuisines..."
                className="w-full bg-transparent font-body-md text-[14px] text-on-surface placeholder:text-outline focus:outline-none"
                type="text"
              />
              {searchQuery && (
                <button
                  type="button"
                  aria-label="Clear input"
                  onClick={() => setSearchQuery('')}
                  className="flex items-center justify-center w-6 h-6 rounded-full bg-surface-variant text-on-surface-variant hover:text-on-surface active:scale-95 transition-all"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              )}
            </div>

            <button
              type="button"
              aria-label="Open filter options"
              onClick={() => alert('Filter applied: All nearby trucks')}
              className="flex items-center justify-center w-11 h-11 rounded-full bg-surface-container text-on-surface hover:bg-surface-variant active:scale-95 transition-transform shadow-sm flex-shrink-0"
            >
              <span className="material-symbols-outlined text-[22px] text-primary">tune</span>
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="flex flex-col px-4 gap-5 mt-1">
          {/* Recent Searches */}
          <section className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <span className="font-label-sm text-[11px] text-outline uppercase tracking-wider font-bold">
                Recent Searches
              </span>
              {recentSearches.length > 0 && (
                <button
                  onClick={clearAllRecent}
                  className="font-label-md text-[12px] text-primary hover:underline font-bold"
                >
                  Clear all
                </button>
              )}
            </div>

            {recentSearches.length > 0 ? (
              <div className="flex flex-wrap gap-2 pt-0.5">
                {recentSearches.map(item => (
                  <div
                    key={item}
                    onClick={() => setSearchQuery(item)}
                    className="inline-flex items-center gap-1.5 bg-surface-container-lowest shadow-sm rounded-full pl-3 pr-1.5 py-1 text-on-surface border border-black/5 cursor-pointer hover:bg-surface-container-low transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px] text-outline">
                      history
                    </span>
                    <span className="font-label-md text-[12px] font-medium">{item}</span>
                    <button
                      type="button"
                      aria-label={`Remove ${item}`}
                      onClick={e => {
                        e.stopPropagation();
                        removeRecent(item);
                      }}
                      className="flex items-center justify-center w-5 h-5 rounded-full hover:bg-surface-container text-outline hover:text-on-surface transition-colors"
                    >
                      <span className="material-symbols-outlined text-[14px]">close</span>
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <span className="font-body-sm text-[12px] text-outline italic">No recent searches</span>
            )}
          </section>

          {/* Popular Searches */}
          <section className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[18px] text-primary select-none">
                local_fire_department
              </span>
              <h2 className="font-label-lg text-[13px] font-bold text-on-surface">
                Popular Searches
              </h2>
            </div>

            <div className="flex flex-wrap gap-2 pt-0.5">
              {popularSearches.map(ps => (
                <button
                  key={ps.label}
                  onClick={() => setSearchQuery(ps.label)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full active:scale-95 transition-all shadow-sm ${
                    ps.highlight
                      ? 'bg-primary-fixed text-on-primary-fixed hover:bg-primary hover:text-on-primary'
                      : 'bg-surface-container-low text-on-surface hover:bg-surface-variant'
                  }`}
                >
                  <span
                    className={`material-symbols-outlined text-[16px] ${
                      ps.highlight ? 'text-primary' : 'text-tertiary'
                    }`}
                  >
                    trending_up
                  </span>
                  <span className="font-label-md text-[12px] font-semibold">{ps.label}</span>
                </button>
              ))}
            </div>
          </section>

          {/* Search Results */}
          <section className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h2 className="font-headline-sm text-[17px] font-bold text-on-surface">
                Street Bites Matching "{searchQuery || 'Food'}"
              </h2>
              <span className="font-label-md text-[12px] text-outline font-semibold">
                {filteredItems.length} Results
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {filteredItems.map(item => {
                const isAdded = addedItemIds[item.id];
                return (
                  <article
                    key={item.id}
                    onClick={() => handleOpenDetails(item)}
                    className="flex items-center justify-between p-3 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md transition-all gap-3 border border-black/5 cursor-pointer"
                  >
                    <div className="flex flex-col flex-1 min-w-0 pr-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`inline-flex items-center justify-center w-3.5 h-3.5 rounded-sm ${
                            item.isVeg
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-error/15 text-error'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              item.isVeg ? 'bg-emerald-600' : 'bg-error'
                            }`}
                          />
                        </span>
                        <span className="font-label-sm text-[10px] text-tertiary font-bold tracking-tight">
                          {item.badge}
                        </span>
                      </div>

                      <h3 className="font-headline-sm text-[16px] text-on-surface font-bold truncate leading-snug">
                        {item.name}
                      </h3>
                      <p className="font-body-sm text-[12px] text-on-surface-variant line-clamp-1 mt-0.5">
                        {item.description}
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <span className="font-price-tag text-[16px] font-black text-on-surface">
                          ₹{item.price}
                        </span>
                        <div className="flex items-center gap-0.5 px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface">
                          <span
                            className="material-symbols-outlined text-[14px] text-tertiary"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            star
                          </span>
                          <span className="font-label-sm text-[11px] font-bold">{item.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="relative w-24 h-24 flex-shrink-0">
                      <img
                        className="w-full h-full object-cover rounded-xl shadow-inner bg-surface-container"
                        src={item.imageUrl}
                        alt={item.name}
                      />
                      <button
                        type="button"
                        onClick={e => handleAdd(item, e)}
                        className={`absolute -bottom-2 right-2 px-3 py-1 rounded-full font-label-md text-[12px] font-bold shadow-md active:scale-95 transition-all flex items-center gap-0.5 ${
                          isAdded
                            ? 'bg-tertiary text-on-tertiary scale-105'
                            : 'bg-primary text-on-primary hover:bg-primary-container'
                        }`}
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {isAdded ? 'done' : 'add'}
                        </span>
                        <span>{isAdded ? 'Added' : 'Add'}</span>
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          {/* No Food Found Help Banner */}
          <div className="p-4 rounded-2xl bg-surface-container-low flex items-center gap-3.5 shadow-sm border border-black/5 mt-1 mb-6">
            <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-primary flex-shrink-0">
              <span className="material-symbols-outlined text-[22px]">ramen_dining</span>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <span className="font-label-md text-[13px] font-bold text-on-surface">
                No food found?
              </span>
              <p className="font-body-sm text-[12px] text-on-surface-variant mt-0.5">
                Try searching for something else like{' '}
                <button
                  type="button"
                  onClick={() => setSearchQuery('Pizza')}
                  className="font-bold text-primary underline"
                >
                  Pizza
                </button>{' '}
                or{' '}
                <button
                  type="button"
                  onClick={() => setSearchQuery('Burger')}
                  className="font-bold text-primary underline"
                >
                  Burger
                </button>
              </p>
            </div>
          </div>
        </div>
      </main>

      <FloatingCartBar />
      <BottomNav />
    </div>
  );
};
