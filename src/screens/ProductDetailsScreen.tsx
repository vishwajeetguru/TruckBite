import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { REVIEWS } from '../data/mockData';
import { AppHeader } from '../components/AppHeader';

export const ProductDetailsScreen: React.FC = () => {
  const { selectedFoodItem, addToCart, navigateTo, isFavorite, toggleFavorite } = useCart();
  const [selectedImage, setSelectedImage] = useState<string>(
    selectedFoodItem.additionalImages?.[0] || selectedFoodItem.imageUrl
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [isAddedFeedback, setIsAddedFeedback] = useState<boolean>(false);
  const [showGalleryModal, setShowGalleryModal] = useState<boolean>(false);

  const images = selectedFoodItem.additionalImages || [selectedFoodItem.imageUrl];
  const unitPrice = selectedFoodItem.price;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(selectedFoodItem, quantity);
    setIsAddedFeedback(true);
    setTimeout(() => {
      setIsAddedFeedback(false);
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col relative w-full min-h-screen bg-surface select-none">
      <AppHeader variant="details" title="Truck Details" showBack />

      <main className="flex-1 flex flex-col pt-[80px] pb-36">
        {/* 1. HERO SECTION WITH IMAGE & OVERLAYS */}
        <div className="relative w-full h-84 bg-surface-container overflow-hidden">
          <img
            id="mainHeroImage"
            alt={selectedFoodItem.name}
            className="w-full h-full object-cover object-center transition-all duration-300"
            src={selectedImage}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/35 pointer-events-none" />

          {/* Floating Action Buttons */}
          <div className="absolute top-4 inset-x-0 px-4 flex items-center justify-between pointer-events-auto">
            <button
              aria-label="Go back"
              onClick={() => window.history.back()}
              className="w-10 h-10 min-w-touch-min min-h-touch-min rounded-full bg-surface/90 backdrop-blur-md text-on-surface flex items-center justify-center shadow-lg active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            </button>
            <button
              aria-label="Add to favorites"
              onClick={toggleFavorite}
              className="w-10 h-10 min-w-touch-min min-h-touch-min rounded-full bg-surface/90 backdrop-blur-md text-on-surface flex items-center justify-center shadow-lg active:scale-90 transition-all"
            >
              <span
                className="material-symbols-outlined text-[22px] text-primary transition-transform"
                style={{ fontVariationSettings: isFavorite ? "'FILL' 1" : "'FILL' 0" }}
              >
                favorite
              </span>
            </button>
          </div>

          {/* Hero Tag Chips */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest/95 backdrop-blur-md shadow-sm border border-black/5">
                <span
                  className={`w-2.5 h-2.5 rounded-full inline-block animate-pulse ${
                    selectedFoodItem.isVeg ? 'bg-emerald-600' : 'bg-error'
                  }`}
                />
                <span className="font-label-sm text-[11px] font-extrabold text-on-surface uppercase tracking-wider">
                  {selectedFoodItem.isVeg ? 'PURE VEG' : 'NON-VEG'}
                </span>
              </div>

              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container-lowest/95 backdrop-blur-md shadow-sm border border-black/5 text-on-surface">
                <span className="material-symbols-outlined text-[15px] text-tertiary">timer</span>
                <span className="font-label-sm text-[11px] font-bold">
                  {selectedFoodItem.prepTime || '12-15 min prep'}
                </span>
              </div>

              <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-on-primary shadow-sm">
                <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
                <span className="font-label-sm text-[11px] font-bold uppercase tracking-wider">
                  {selectedFoodItem.badge || 'Bestseller'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. PHOTO GALLERY / THUMBNAIL CAROUSEL */}
        <div className="px-4 pt-3.5 pb-2">
          <div className="flex items-center gap-3 overflow-x-auto pb-1 select-none no-scrollbar">
            {images.map((imgSrc, idx) => {
              const isCurrent = selectedImage === imgSrc;
              return (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(imgSrc)}
                  className={`relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 focus:outline-none transition-all ${
                    isCurrent
                      ? 'ring-2 ring-primary ring-offset-2 ring-offset-surface shadow-sm'
                      : 'ring-1 ring-outline-variant opacity-85 hover:opacity-100'
                  }`}
                >
                  <img
                    alt={`Burger preview ${idx + 1}`}
                    className="w-full h-full object-cover"
                    src={imgSrc}
                  />
                </button>
              );
            })}

            {/* Thumbnail 4 (+3 More Views) */}
            <div
              onClick={() => setShowGalleryModal(true)}
              className="relative w-24 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-surface-container-high border border-outline-variant flex flex-col items-center justify-center cursor-pointer active:scale-95 transition-transform"
            >
              <span className="material-symbols-outlined text-primary text-[20px]">
                photo_library
              </span>
              <span className="font-label-sm text-[11px] font-bold text-on-surface mt-0.5">
                +3 more views
              </span>
            </div>
          </div>
        </div>

        {/* 3. TITLE, STOCK STATUS & PRICING */}
        <div className="px-4 pt-2 flex flex-col gap-3">
          {/* Stock Status Live Alert Badge */}
          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-primary-fixed/60 border border-primary-fixed text-on-primary-fixed">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
            </span>
            <span className="font-label-md text-[12px] font-bold tracking-tight">
              ⚡ Only 7 burgers left in today's batch!
            </span>
          </div>

          <div className="flex flex-col gap-1.5">
            <h1 className="font-display-sm text-[26px] text-on-surface leading-tight font-extrabold">
              {selectedFoodItem.name}
            </h1>

            {/* Pricing & Discount Row */}
            <div className="flex items-center gap-3 pt-0.5">
              <div className="flex items-baseline gap-2">
                <span className="font-display-lg text-[32px] text-primary font-black tracking-tight leading-none">
                  ₹{selectedFoodItem.price}
                </span>
                {selectedFoodItem.originalPrice && (
                  <span className="font-body-lg text-[16px] text-secondary line-through font-semibold">
                    ₹{selectedFoodItem.originalPrice}
                  </span>
                )}
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-primary-container text-on-primary-container font-label-md text-[12px] font-extrabold uppercase tracking-wide shadow-sm">
                {selectedFoodItem.discountBadge || '25% OFF'}
              </span>
              <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-tertiary-container font-label-sm text-[11px] font-bold">
                Save ₹{selectedFoodItem.saveAmount || 50}
              </span>
            </div>

            {/* Quick Stats Row */}
            <div className="flex items-center gap-2 pt-1 flex-wrap text-on-surface-variant font-body-sm text-[12px]">
              <div className="flex items-center gap-1 bg-surface-container-high px-2 py-0.5 rounded-md font-bold text-on-surface">
                <span
                  className="material-symbols-outlined text-[15px] text-tertiary-container"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                <span>{selectedFoodItem.rating}</span>
                <span className="font-normal text-secondary">
                  ({selectedFoodItem.ratingCount})
                </span>
              </div>
              <span className="text-secondary">•</span>
              <span className="font-semibold text-on-surface">
                {selectedFoodItem.calories || 380} kcal
              </span>
              <span className="text-secondary">•</span>
              <span className="font-semibold text-on-surface">100% Tender Beef Patty</span>
            </div>
          </div>

          <hr className="border-surface-container-highest my-1" />

          {/* 4. COMPREHENSIVE DESCRIPTION & FOOD INFO */}
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="font-headline-sm text-[17px] text-on-surface mb-2 font-bold">
                About this Burger
              </h2>
              <p className="font-body-md text-[14px] text-on-surface-variant leading-relaxed">
                {selectedFoodItem.detailedDescription || selectedFoodItem.description}
              </p>
            </div>

            {/* Key Ingredients Grid */}
            <div className="flex flex-col gap-2.5">
              <h3 className="font-label-lg text-[13px] text-on-surface font-bold">
                Key Ingredients
              </h3>
              <div className="grid grid-cols-2 gap-2.5">
                {(selectedFoodItem.ingredients || []).map((ing, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 p-2.5 rounded-xl bg-surface-container-lowest border border-surface-container-highest shadow-sm"
                  >
                    <div
                      className={`w-8 h-8 rounded-lg ${ing.iconBg} flex items-center justify-center ${ing.iconColor} flex-shrink-0`}
                    >
                      <span className="material-symbols-outlined text-[18px]">{ing.icon}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-label-md text-[12px] font-bold text-on-surface">
                        {ing.title}
                      </span>
                      <span className="font-label-sm text-[10px] text-secondary">
                        {ing.subtitle}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chef Preparation & Hygiene Card */}
            <div className="p-3.5 rounded-2xl bg-surface-container border border-surface-container-highest flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary font-label-lg text-[13px] font-bold">
                <span className="material-symbols-outlined text-[20px]">verified</span>
                <span>TruckBite Quality Assurance</span>
              </div>
              <div className="flex flex-col gap-1.5 text-on-surface-variant font-body-sm text-[12px]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[16px]">
                    local_shipping
                  </span>
                  <span>Cooked fresh on mobile food truck right before pickup</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-[16px]">
                    clean_hands
                  </span>
                  <span>100% Contactless preparation &amp; tamper-proof packaging</span>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-surface-container-highest my-2" />

          {/* 5. CUSTOMER REVIEWS & RATINGS SECTION */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[22px]">
                  rate_review
                </span>
                <h2 className="font-headline-sm text-[17px] text-on-surface font-bold">
                  Ratings &amp; Reviews
                </h2>
              </div>
              <span className="font-label-md text-[12px] text-primary font-bold">
                {selectedFoodItem.ratingCount} Verified
              </span>
            </div>

            {/* Big Aggregate Rating Card */}
            <div className="bg-surface-container-lowest rounded-2xl p-4 border border-surface-container-highest shadow-sm flex items-center gap-5">
              {/* Left: Numerical Score */}
              <div className="flex flex-col items-center justify-center flex-shrink-0 pr-3 border-r border-surface-container-highest">
                <span className="font-display-lg text-[40px] text-on-surface font-extrabold leading-none">
                  {selectedFoodItem.rating}
                </span>
                <div className="flex items-center gap-0.5 text-tertiary-container my-1.5">
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star_half
                  </span>
                </div>
                <span className="font-label-sm text-[11px] text-secondary">
                  {selectedFoodItem.ratingCount} ratings
                </span>
              </div>

              {/* Right: Star Breakdown Progress Bars */}
              <div className="flex-1 flex flex-col gap-1.5">
                <div className="flex items-center gap-2">
                  <span className="font-label-sm text-[11px] text-secondary w-3">5★</span>
                  <div className="flex-1 h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="bg-primary h-full rounded-full" style={{ width: '82%' }} />
                  </div>
                  <span className="font-label-sm text-[11px] font-semibold text-secondary w-7 text-right">
                    82%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-label-sm text-[11px] text-secondary w-3">4★</span>
                  <div className="flex-1 h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="bg-primary/70 h-full rounded-full" style={{ width: '12%' }} />
                  </div>
                  <span className="font-label-sm text-[11px] font-semibold text-secondary w-7 text-right">
                    12%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-label-sm text-[11px] text-secondary w-3">3★</span>
                  <div className="flex-1 h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="bg-primary/50 h-full rounded-full" style={{ width: '4%' }} />
                  </div>
                  <span className="font-label-sm text-[11px] font-semibold text-secondary w-7 text-right">
                    4%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-label-sm text-[11px] text-secondary w-3">2★</span>
                  <div className="flex-1 h-2 bg-surface-container-high rounded-full overflow-hidden">
                    <div className="bg-primary/30 h-full rounded-full" style={{ width: '2%' }} />
                  </div>
                  <span className="font-label-sm text-[11px] font-semibold text-secondary w-7 text-right">
                    2%
                  </span>
                </div>
              </div>
            </div>

            {/* Customer Review Cards */}
            <div className="flex flex-col gap-3">
              {REVIEWS.map(rev => (
                <div
                  key={rev.id}
                  className="bg-surface-container-lowest rounded-2xl p-4 border border-surface-container-highest shadow-sm flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-9 h-9 rounded-full ${rev.avatarBg} ${rev.avatarColor} font-bold flex items-center justify-center font-label-lg text-[13px]`}
                      >
                        {rev.avatarInitials}
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1.5">
                          <span className="font-label-lg text-[13px] font-bold text-on-surface">
                            {rev.author}
                          </span>
                          <span className="bg-primary/10 text-primary font-label-sm text-[10px] font-bold px-1.5 py-0.2 rounded">
                            VERIFIED
                          </span>
                        </div>
                        <span className="font-label-sm text-[11px] text-secondary">
                          {rev.timeAgo}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center text-tertiary-container">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className="material-symbols-outlined text-[15px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                      ))}
                    </div>
                  </div>
                  <p className="font-body-sm text-[13px] text-on-surface leading-relaxed">
                    "{rev.comment}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* 6. STICKY BOTTOM CHECKOUT / ACTION BAR */}
      <div className="fixed bottom-0 inset-x-0 p-4 bg-surface-container-lowest/95 backdrop-blur-xl border-t border-surface-container-highest shadow-[0_-4px_24px_rgba(26,26,40,0.08)] z-40">
        <div className="max-w-md mx-auto flex items-center gap-3">
          {/* Quantity Stepper Pill */}
          <div className="flex items-center justify-between bg-surface-container-high rounded-full px-1.5 py-1 h-14 border border-outline-variant shadow-sm">
            <button
              aria-label="Decrease quantity"
              onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              className="w-10 h-10 min-w-touch-min min-h-touch-min rounded-full flex items-center justify-center text-on-surface hover:text-primary active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined text-[20px]">remove</span>
            </button>
            <span className="font-headline-sm text-[16px] text-on-surface w-8 text-center font-bold select-none">
              {quantity}
            </span>
            <button
              aria-label="Increase quantity"
              onClick={() => setQuantity(prev => Math.min(10, prev + 1))}
              className="w-10 h-10 min-w-touch-min min-h-touch-min rounded-full flex items-center justify-center text-on-surface hover:text-primary active:scale-90 transition-transform"
            >
              <span className="material-symbols-outlined text-[20px]">add</span>
            </button>
          </div>

          {/* Add to Cart CTA Button */}
          <button
            onClick={handleAddToCart}
            className={`flex-1 h-14 rounded-full text-on-primary flex items-center justify-center gap-2 px-6 shadow-lg transition-all font-bold ${
              isAddedFeedback
                ? 'bg-tertiary-container shadow-tertiary/30 scale-[0.99]'
                : 'bg-primary hover:bg-primary-container shadow-primary/30 active:scale-[0.98]'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isAddedFeedback ? 'done' : 'shopping_bag'}
            </span>
            <span className="font-label-lg text-[14px] tracking-wide font-bold">
              {isAddedFeedback ? 'Added to Cart!' : 'Add to Cart'}
            </span>
            <span className="text-on-primary/75">•</span>
            <span className="font-price-tag text-[17px] tracking-tight font-extrabold">
              ₹{totalPrice}
            </span>
          </button>
        </div>
      </div>

      {/* Gallery Modal Lightbox */}
      {showGalleryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-surface rounded-3xl max-w-sm w-full p-4 shadow-2xl border border-white/20 flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container-high">
              <h3 className="font-headline-sm text-[16px] font-bold text-on-surface">
                Burger Photos &amp; Angles
              </h3>
              <button
                onClick={() => setShowGalleryModal(false)}
                className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high"
              >
                ✕
              </button>
            </div>
            <div className="grid grid-cols-1 gap-3 py-3 max-h-96 overflow-y-auto pr-1">
              {images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`Gallery angle ${i + 1}`}
                  onClick={() => {
                    setSelectedImage(src);
                    setShowGalleryModal(false);
                  }}
                  className="rounded-xl w-full h-44 object-cover cursor-pointer hover:opacity-95"
                />
              ))}
            </div>
            <button
              onClick={() => setShowGalleryModal(false)}
              className="w-full py-2.5 bg-primary text-on-primary rounded-full font-bold text-[13px] mt-2"
            >
              Close Gallery
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
