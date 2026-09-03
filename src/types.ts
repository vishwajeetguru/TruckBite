export type ScreenId = 
  | 'splash'
  | 'location'
  | 'home'
  | 'burgers'
  | 'search'
  | 'details'
  | 'checkout'
  | 'orders'
  | 'profile';

export interface FoodItem {
  id: string;
  name: string;
  category: 'burgers' | 'pizza' | 'snacks' | 'drinks' | 'meals';
  description: string;
  detailedDescription?: string;
  price: number;
  originalPrice?: number;
  discountBadge?: string;
  saveAmount?: number;
  rating: number;
  ratingCount: number;
  calories?: number;
  prepTime?: string;
  isVeg: boolean;
  badge?: string;
  badgeColor?: string;
  imageUrl: string;
  additionalImages?: string[];
  customization?: string;
  ingredients?: Array<{
    title: string;
    subtitle: string;
    icon: string;
    iconBg: string;
    iconColor: string;
  }>;
}

export interface CartItem {
  foodItem: FoodItem;
  quantity: number;
  selectedSize?: string;
  instructions?: string;
}

export interface Review {
  id: string;
  author: string;
  avatarInitials: string;
  avatarBg: string;
  avatarColor: string;
  timeAgo: string;
  rating: number;
  comment: string;
  isVerified: boolean;
}
