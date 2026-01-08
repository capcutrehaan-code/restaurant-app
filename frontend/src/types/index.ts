export interface User {
  _id: string;
  phone: string;
  email?: string;
  name: string;
  avatar?: string;
  addresses: Address[];
  wallet: {
    balance: number;
    history: WalletTransaction[];
  };
  loyaltyPoints: number;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  _id?: string;
  type: 'home' | 'work' | 'other';
  street: string;
  city: string;
  state: string;
  zip: string;
  landmark?: string;
  isDefault: boolean;
}

export interface WalletTransaction {
  _id: string;
  amount: number;
  type: 'credit' | 'debit';
  description: string;
  orderId?: string;
  createdAt: string;
}

export interface Restaurant {
  _id: string;
  name: string;
  description: string;
  logo: string;
  rating: number;
  reviewsCount: number;
  address: Address;
  phone: string;
  email: string;
  website?: string;
  operatingHours: OperatingHours;
  cuisines: string[];
  priceRange: 1 | 2 | 3;
  isOpen: boolean;
  isDeliveryAvailable: boolean;
}

export interface OperatingHours {
  [key: string]: {
    open: string;
    close: string;
    closed?: boolean;
  };
}

export interface MenuItem {
  _id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  halfPrice?: number;
  fullPrice?: number;
  image: string;
  category: string;
  isVeg: boolean;
  isJain: boolean;
  ingredients?: string[];
  calories?: number;
  spiceLevel?: 1 | 2 | 3;
  customizations?: Customization[];
  isAvailable: boolean;
  rating?: number;
  reviewsCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Customization {
  name: string;
  options: CustomizationOption[];
  required?: boolean;
}

export interface CustomizationOption {
  name: string;
  price: number;
}

export interface CartItem {
  dish: MenuItem;
  quantity: number;
  selectedSize?: 'half' | 'full';
  customizations?: SelectedCustomization[];
  specialInstructions?: string;
}

export interface SelectedCustomization {
  name: string;
  option: string;
  price: number;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  tax: number;
  discount: number;
  deliveryCharge: number;
  total: number;
}

export type OrderType = 'dineIn' | 'takeaway' | 'delivery';

export type OrderStatus = 
  | 'pending' 
  | 'confirmed' 
  | 'preparing' 
  | 'ready' 
  | 'outForDelivery' 
  | 'delivered' 
  | 'cancelled';

export interface Order {
  _id: string;
  userId: string;
  restaurantId: string;
  items: CartItem[];
  orderType: OrderType;
  status: OrderStatus;
  deliveryAddress?: Address;
  subtotal: number;
  tax: number;
  discount: number;
  deliveryCharge: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: 'pending' | 'completed' | 'failed';
  orderNotes?: string;
  estimatedDeliveryTime?: string;
  rating?: number;
  review?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
}

export type PaymentMethod = 'cash' | 'upi' | 'card' | 'wallet';

export interface Reservation {
  _id: string;
  userId: string;
  restaurantId: string;
  date: string;
  time: string;
  guestCount: number;
  tableId?: string;
  specialNotes?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  _id: string;
  userId: string;
  user?: {
    name: string;
    avatar?: string;
  };
  restaurantId: string;
  orderId?: string;
  rating: number;
  comment: string;
  images: string[];
  helpfulCount: number;
  restaurantReply?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Coupon {
  _id: string;
  code: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderValue: number;
  maxDiscount?: number;
  usageLimit: number;
  usedCount: number;
  applicableOn: {
    orderTypes?: OrderType[];
    categories?: string[];
  };
  validity: {
    startDate: string;
    endDate: string;
  };
  isActive: boolean;
}

export interface Offer {
  _id: string;
  title: string;
  description: string;
  image: string;
  couponCode?: string;
  validUntil: string;
  isActive: boolean;
}

export interface Category {
  _id: string;
  name: string;
  slug: string;
  icon?: string;
  sortOrder: number;
}
