import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useToast } from './ToastContext';

export interface CartItem {
  id: string;
  type: 'hotel' | 'flight' | 'tour' | 'restaurant' | 'activity' | 'transfer';
  title: string;
  description?: string;
  image?: string;
  price: number;
  originalPrice?: number;
  currency: string;
  quantity: number;
  date?: string;
  location?: string;
  duration?: string;
  rating?: number;
  provider?: string;
  bookingDetails?: {
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    rooms?: number;
    passengers?: number;
    departureTime?: string;
    arrivalTime?: string;
    meetingPoint?: string;
    specialRequests?: string;
  };
  cancellationPolicy?: string;
  isRefundable?: boolean;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  currency: string;
  discountCode?: string;
  discountAmount?: number;
  taxAmount?: number;
  finalTotal: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'UPDATE_ITEM'; payload: { id: string; updates: Partial<CartItem> } }
  | { type: 'CLEAR_CART' }
  | { type: 'APPLY_DISCOUNT'; payload: { code: string; amount: number } }
  | { type: 'REMOVE_DISCOUNT' }
  | { type: 'SET_CART'; payload: CartState };

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
  currency: 'TRY',
  finalTotal: 0,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(item => 
        item.id === action.payload.id && item.type === action.payload.type
      );

      let newItems: CartItem[];
      
      if (existingItemIndex >= 0) {
        // Update existing item quantity
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        // Add new item
        newItems = [...state.items, action.payload];
      }

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const taxAmount = totalPrice * 0.18; // 18% KDV
      const discountAmount = state.discountAmount || 0;
      const finalTotal = totalPrice + taxAmount - discountAmount;

      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice,
        taxAmount,
        finalTotal: Math.max(0, finalTotal),
      };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const taxAmount = totalPrice * 0.18;
      const discountAmount = state.discountAmount || 0;
      const finalTotal = totalPrice + taxAmount - discountAmount;

      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice,
        taxAmount,
        finalTotal: Math.max(0, finalTotal),
      };
    }

    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(1, action.payload.quantity) }
          : item
      );

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const taxAmount = totalPrice * 0.18;
      const discountAmount = state.discountAmount || 0;
      const finalTotal = totalPrice + taxAmount - discountAmount;

      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice,
        taxAmount,
        finalTotal: Math.max(0, finalTotal),
      };
    }

    case 'UPDATE_ITEM': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, ...action.payload.updates }
          : item
      );

      const totalItems = newItems.reduce((sum, item) => sum + item.quantity, 0);
      const totalPrice = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const taxAmount = totalPrice * 0.18;
      const discountAmount = state.discountAmount || 0;
      const finalTotal = totalPrice + taxAmount - discountAmount;

      return {
        ...state,
        items: newItems,
        totalItems,
        totalPrice,
        taxAmount,
        finalTotal: Math.max(0, finalTotal),
      };
    }

    case 'APPLY_DISCOUNT': {
      const discountAmount = action.payload.amount;
      const finalTotal = state.totalPrice + (state.taxAmount || 0) - discountAmount;

      return {
        ...state,
        discountCode: action.payload.code,
        discountAmount,
        finalTotal: Math.max(0, finalTotal),
      };
    }

    case 'REMOVE_DISCOUNT': {
      const finalTotal = state.totalPrice + (state.taxAmount || 0);

      return {
        ...state,
        discountCode: undefined,
        discountAmount: undefined,
        finalTotal,
      };
    }

    case 'CLEAR_CART':
      return initialState;

    case 'SET_CART':
      return action.payload;

    default:
      return state;
  }
};

interface CartContextType {
  state: CartState;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateItem: (id: string, updates: Partial<CartItem>) => void;
  clearCart: () => void;
  applyDiscount: (code: string, amount: number) => void;
  removeDiscount: () => void;
  getItemCount: () => number;
  getTotalPrice: () => number;
  isInCart: (id: string) => boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const [isClient, setIsClient] = React.useState(false);

  // Toast context - always use hook, but only call methods on client
  let toast: ReturnType<typeof useToast> | null = null;
  try {
    toast = useToast();
  } catch (e) {
    // Toast context not available yet (SSR)
  }

  // Set client-side flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load cart from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedCart = localStorage.getItem('ailydian_cart');
    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart);
        dispatch({ type: 'SET_CART', payload: cartData });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('ailydian_cart', JSON.stringify(state));
  }, [state]);

  const addItem = (item: CartItem) => {
    const previousItem = state.items.find(i => i.id === item.id && i.type === item.type);

    dispatch({ type: 'ADD_ITEM', payload: item });

    // Show premium toast notification
    if (isClient && toast) {
      const itemTypeLabels = {
        hotel: '🏨 Otel',
        flight: '✈️ Uçak Bileti',
        tour: '🎯 Tur',
        restaurant: '🍽️ Restoran',
        activity: '⚡ Aktivite',
        transfer: '🚗 Transfer'
      };

      toast.showCartToast({
        title: previousItem ? 'Miktar Güncellendi' : 'Sepete Eklendi',
        message: `${itemTypeLabels[item.type] || item.type} - ${item.title}`,
        image: item.image,
        price: `${item.price.toLocaleString('tr-TR')} ${item.currency}`,
        itemCount: state.totalItems + item.quantity,
        undoAction: () => {
          if (previousItem) {
            // Restore previous quantity
            dispatch({
              type: 'UPDATE_QUANTITY',
              payload: { id: item.id, quantity: previousItem.quantity }
            });
          } else {
            // Remove item completely
            dispatch({ type: 'REMOVE_ITEM', payload: item.id });
          }
        },
      });
    }

    // Analytics event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'add_to_cart', {
        currency: item.currency,
        value: item.price,
        items: [{
          item_id: item.id,
          item_name: item.title,
          item_category: item.type,
          quantity: item.quantity,
          price: item.price
        }]
      });
    }
  };

  const removeItem = (id: string) => {
    const removedItem = state.items.find(item => item.id === id);

    dispatch({ type: 'REMOVE_ITEM', payload: id });

    // Show removal toast with undo
    if (isClient && toast && removedItem) {
      toast.showWarning('Sepetten Çıkarıldı', removedItem.title, {
        duration: 5000,
        undoAction: () => {
          dispatch({ type: 'ADD_ITEM', payload: removedItem });
        },
      });
    }
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const updateItem = (id: string, updates: Partial<CartItem>) => {
    dispatch({ type: 'UPDATE_ITEM', payload: { id, updates } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const applyDiscount = (code: string, amount: number) => {
    dispatch({ type: 'APPLY_DISCOUNT', payload: { code, amount } });
  };

  const removeDiscount = () => {
    dispatch({ type: 'REMOVE_DISCOUNT' });
  };

  const getItemCount = () => state.totalItems;

  const getTotalPrice = () => state.finalTotal;

  const isInCart = (id: string) => state.items.some(item => item.id === id);

  const value: CartContextType = {
    state,
    addItem,
    removeItem,
    updateQuantity,
    updateItem,
    clearCart,
    applyDiscount,
    removeDiscount,
    getItemCount,
    getTotalPrice,
    isInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartProvider;