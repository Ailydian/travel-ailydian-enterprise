/**
 * Cart System Type Definitions
 * Enterprise-grade type safety for cart functionality
 *
 * @module types/cart
 */

export type ProductType = 'tour' | 'transfer' | 'rental' | 'hotel' | 'experience';

export type Currency = 'TRY' | 'EUR' | 'USD' | 'GBP';

export interface Money {
  amount: number;
  currency: Currency;
}

export interface CartItemBookingDetails {
  checkIn: string; // ISO 8601 date
  checkOut: string; // ISO 8601 date
  guests: number;
  rooms?: number;
  specialRequests?: string;
}

export interface CartItem {
  id: string;
  type: ProductType;
  title: string;
  description: string;
  image: string;
  price: number;
  originalPrice?: number;
  currency: Currency;
  quantity: number;
  date: string; // ISO 8601 date
  location: string;
  duration?: string;
  rating?: number;
  provider: string;
  bookingDetails: CartItemBookingDetails;
  cancellationPolicy: string;
  isRefundable: boolean;
  metadata?: Record<string, unknown>;
}

export interface CartSummary {
  subtotal: Money;
  tax: Money;
  discount: Money;
  total: Money;
  itemCount: number;
}

export interface Cart {
  items: CartItem[];
  summary: CartSummary;
  updatedAt: string; // ISO 8601 timestamp
}

export interface AddToCartPayload {
  productId: string;
  type: ProductType;
  quantity?: number;
  bookingDetails?: Partial<CartItemBookingDetails>;
}

export interface UpdateCartItemPayload {
  itemId: string;
  quantity?: number;
  bookingDetails?: Partial<CartItemBookingDetails>;
}

export interface RemoveFromCartPayload {
  itemId: string;
}

// Cart Context Types
export interface CartContextValue {
  cart: Cart;
  addItem: (item: CartItem) => void;
  updateItem: (payload: UpdateCartItemPayload) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotal: () => Money;
}

// Helper Types
export type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'UPDATE_ITEM'; payload: UpdateCartItemPayload }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'CLEAR_CART' };
