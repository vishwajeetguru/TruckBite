import React, { createContext, useContext, useState, useMemo } from 'react';
import { ScreenId, CartItem, FoodItem } from '../types';
import { FOOD_ITEMS } from '../data/mockData';

interface CartContextType {
  currentScreen: ScreenId;
  previousScreen: ScreenId;
  navigateTo: (screen: ScreenId) => void;
  goBack: () => void;
  selectedFoodItem: FoodItem;
  setSelectedFoodItem: (item: FoodItem) => void;
  cartItems: CartItem[];
  addToCart: (item: FoodItem, quantity?: number, customization?: string) => void;
  updateQuantity: (itemId: string, delta: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  couponApplied: boolean;
  couponCode: string;
  toggleCoupon: (apply: boolean) => void;
  cookingInstructions: string;
  setCookingInstructions: (val: string) => void;
  isFavorite: boolean;
  toggleFavorite: () => void;
  isOrderPlacedModalOpen: boolean;
  setIsOrderPlacedModalOpen: (open: boolean) => void;
  viewMode: 'device' | 'fluid';
  setViewMode: (mode: 'device' | 'fluid') => void;
  itemTotal: number;
  discountAmount: number;
  taxesAndPackaging: number;
  deliveryFee: number;
  finalTotal: number;
  totalCartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [screenHistory, setScreenHistory] = useState<ScreenId[]>(['home']);
  const [viewMode, setViewMode] = useState<'device' | 'fluid'>('device');
  const [selectedFoodItem, setSelectedFoodItem] = useState<FoodItem>(FOOD_ITEMS[0]);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [couponApplied, setCouponApplied] = useState<boolean>(true);
  const couponCode = 'TRUCKBITE50';
  const [cookingInstructions, setCookingInstructions] = useState<string>('');
  const [isOrderPlacedModalOpen, setIsOrderPlacedModalOpen] = useState<boolean>(false);

  // Initial cart items matching the Checkout screenshot (₹778 total)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      foodItem: {
        ...FOOD_ITEMS[0],
        price: 179 // With regular extra cheese
      },
      quantity: 2,
      selectedSize: 'Size: Regular, Extra Cheese'
    },
    {
      foodItem: FOOD_ITEMS[5], // Farmhouse Pizza
      quantity: 1,
      selectedSize: 'Size: Medium 8 inch'
    },
    {
      foodItem: FOOD_ITEMS[6], // Loaded French Fries
      quantity: 1,
      selectedSize: 'Spiced Paprika'
    }
  ]);

  const navigateTo = (screen: ScreenId) => {
    setScreenHistory(prev => [...prev, screen]);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (screenHistory.length > 1) {
      const newHistory = [...screenHistory];
      newHistory.pop();
      const prev = newHistory[newHistory.length - 1];
      setScreenHistory(newHistory);
      setCurrentScreen(prev);
    } else {
      setCurrentScreen('home');
    }
  };

  const previousScreen = screenHistory.length > 1 ? screenHistory[screenHistory.length - 2] : 'home';

  const addToCart = (item: FoodItem, quantity: number = 1, customization?: string) => {
    setCartItems(prev => {
      const existingIndex = prev.findIndex(ci => ci.foodItem.id === item.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            foodItem: item,
            quantity,
            selectedSize: customization || item.customization || 'Regular'
          }
        ];
      }
    });
  };

  const updateQuantity = (itemId: string, delta: number) => {
    setCartItems(prev => {
      return prev
        .map(ci => {
          if (ci.foodItem.id === itemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter((ci): ci is CartItem => ci !== null);
    });
  };

  const removeItem = (itemId: string) => {
    setCartItems(prev => prev.filter(ci => ci.foodItem.id !== itemId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleFavorite = () => {
    setIsFavorite(prev => !prev);
  };

  const toggleCoupon = (apply: boolean) => {
    setCouponApplied(apply);
  };

  const itemTotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.foodItem.price * item.quantity, 0);
  }, [cartItems]);

  const deliveryFee = 0; // FREE with promotion (was 49)
  const taxesAndPackaging = cartItems.length > 0 ? 42 : 0;
  const discountAmount = couponApplied && cartItems.length > 0 ? 50 : 0;
  const finalTotal = Math.max(0, itemTotal + taxesAndPackaging - discountAmount);

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        currentScreen,
        previousScreen,
        navigateTo,
        goBack,
        selectedFoodItem,
        setSelectedFoodItem,
        cartItems,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        couponApplied,
        couponCode,
        toggleCoupon,
        cookingInstructions,
        setCookingInstructions,
        isFavorite,
        toggleFavorite,
        isOrderPlacedModalOpen,
        setIsOrderPlacedModalOpen,
        viewMode,
        setViewMode,
        itemTotal,
        discountAmount,
        taxesAndPackaging,
        deliveryFee,
        finalTotal,
        totalCartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
