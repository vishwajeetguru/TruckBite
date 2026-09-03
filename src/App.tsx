import React from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { SplashScreen } from './screens/SplashScreen';
import { LocationScreen } from './screens/LocationScreen';
import { HomeFeedScreen } from './screens/HomeFeedScreen';
import { BurgersScreen } from './screens/BurgersScreen';
import { SearchScreen } from './screens/SearchScreen';
import { ProductDetailsScreen } from './screens/ProductDetailsScreen';
import { CheckoutScreen } from './screens/CheckoutScreen';
import { OrdersScreen } from './screens/OrdersScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { ScreenSwitcher } from './components/ScreenSwitcher';

const AppContent: React.FC = () => {
  const { currentScreen, viewMode } = useCart();

  const renderActiveScreen = () => {
    switch (currentScreen) {
      case 'splash':
        return <SplashScreen />;
      case 'location':
        return <LocationScreen />;
      case 'home':
        return <HomeFeedScreen />;
      case 'burgers':
        return <BurgersScreen />;
      case 'search':
        return <SearchScreen />;
      case 'details':
        return <ProductDetailsScreen />;
      case 'checkout':
        return <CheckoutScreen />;
      case 'orders':
        return <OrdersScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeFeedScreen />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#181822] flex flex-col items-center justify-start sm:py-6 overflow-x-hidden font-sans">
      {/* Floating Screen Switcher for Client Testing */}
      <ScreenSwitcher />

      {/* Main App Container */}
      {viewMode === 'device' ? (
        <div className="w-full sm:max-w-[420px] sm:my-auto bg-surface sm:rounded-[44px] sm:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] sm:border-[8px] sm:border-[#222230] overflow-hidden flex flex-col relative min-h-screen sm:min-h-[852px]">
          {/* Subtle Phone Notch / Speaker pill on larger viewports */}
          <div className="hidden sm:block absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-[#222230] rounded-full z-50 pointer-events-none" />

          {/* Screen Content */}
          <div className="flex-1 flex flex-col w-full overflow-y-auto overflow-x-hidden relative">
            {renderActiveScreen()}
          </div>
        </div>
      ) : (
        <div className="w-full max-w-md mx-auto bg-surface min-h-screen flex flex-col relative shadow-xl">
          {renderActiveScreen()}
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
