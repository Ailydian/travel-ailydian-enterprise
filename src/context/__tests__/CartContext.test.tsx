/**
 * Comprehensive test suite for CartContext
 * Coverage: Cart state management, localStorage persistence, analytics
 */

import React from 'react';
import { renderHook, act, waitFor } from '@testing-library/react';
import { CartProvider, useCart, CartItem } from '../CartContext';
import { ToastProvider } from '../ToastContext';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock logger
jest.mock('../../lib/logger', () => ({
  __esModule: true,
  default: {
    error: jest.fn(),
    info: jest.fn(),
    warn: jest.fn(),
  },
}));

// Wrapper with ToastProvider and CartProvider
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <ToastProvider>
    <CartProvider>{children}</CartProvider>
  </ToastProvider>
);

describe('CartContext', () => {
  beforeEach(() => {
    localStorageMock.clear();
    jest.clearAllMocks();
  });

  const mockHotelItem: CartItem = {
    id: 'hotel-1',
    type: 'hotel',
    title: 'Luxury Hotel Istanbul',
    description: '5-star hotel in Sultanahmet',
    image: '/images/hotel1.jpg',
    price: 1500,
    originalPrice: 2000,
    currency: 'TRY',
    quantity: 1,
    date: '2025-07-15',
    location: 'Istanbul, Turkey',
    rating: 4.8,
    bookingDetails: {
      checkIn: '2025-07-15',
      checkOut: '2025-07-17',
      guests: 2,
      rooms: 1,
    },
  };

  const mockTourItem: CartItem = {
    id: 'tour-1',
    type: 'tour',
    title: 'Cappadocia Hot Air Balloon',
    price: 800,
    currency: 'TRY',
    quantity: 2,
    location: 'Cappadocia',
    duration: '3 hours',
  };

  describe('Initial State', () => {
    it('should initialize with empty cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      expect(result.current.state.items).toEqual([]);
      expect(result.current.state.totalItems).toBe(0);
      expect(result.current.state.totalPrice).toBe(0);
      expect(result.current.state.currency).toBe('TRY');
      expect(result.current.state.finalTotal).toBe(0);
    });

    it('should load cart from localStorage on mount', async () => {
      const savedCart = {
        items: [mockHotelItem],
        totalItems: 1,
        totalPrice: 1500,
        currency: 'TRY',
        taxAmount: 270,
        finalTotal: 1770,
      };

      localStorageMock.setItem('lydian_cart', JSON.stringify(savedCart));

      const { result } = renderHook(() => useCart(), { wrapper });

      await waitFor(() => {
        expect(result.current.state.items).toHaveLength(1);
        expect(result.current.state.items[0]).toMatchObject(mockHotelItem);
      });
    });
  });

  describe('addItem', () => {
    it('should add new item to cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockHotelItem);
      });

      expect(result.current.state.items).toHaveLength(1);
      expect(result.current.state.items[0]).toEqual(mockHotelItem);
      expect(result.current.state.totalItems).toBe(1);
    });

    it('should increment quantity if item already exists', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockHotelItem);
      });

      act(() => {
        result.current.addItem(mockHotelItem);
      });

      expect(result.current.state.items).toHaveLength(1);
      expect(result.current.state.items[0].quantity).toBe(2);
      expect(result.current.state.totalItems).toBe(2);
    });

    it('should calculate total price correctly', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockHotelItem);
      });

      // totalPrice = price * quantity = 1500 * 1 = 1500
      expect(result.current.state.totalPrice).toBe(1500);
    });

    it('should calculate tax (18%) correctly', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockHotelItem);
      });

      // tax = 1500 * 0.18 = 270
      expect(result.current.state.taxAmount).toBe(270);
    });

    it('should calculate final total with tax', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockHotelItem);
      });

      // finalTotal = totalPrice + tax = 1500 + 270 = 1770
      expect(result.current.state.finalTotal).toBe(1770);
    });

    it('should handle multiple different items', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockHotelItem);
        result.current.addItem(mockTourItem);
      });

      expect(result.current.state.items).toHaveLength(2);
      expect(result.current.state.totalItems).toBe(3); // 1 hotel + 2 tours
      expect(result.current.state.totalPrice).toBe(3100); // 1500 + 800*2
    });

    it('should save cart to localStorage after adding item', async () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockHotelItem);
      });

      await waitFor(() => {
        const saved = localStorageMock.getItem('lydian_cart');
        expect(saved).toBeDefined();
        const cart = JSON.parse(saved!);
        expect(cart.items).toHaveLength(1);
      });
    });
  });

  describe('removeItem', () => {
    it('should remove item from cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockHotelItem);
      });

      act(() => {
        result.current.removeItem('hotel-1');
      });

      expect(result.current.state.items).toHaveLength(0);
      expect(result.current.state.totalItems).toBe(0);
      expect(result.current.state.totalPrice).toBe(0);
    });

    it('should recalculate totals after removing item', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockHotelItem);
        result.current.addItem(mockTourItem);
      });

      act(() => {
        result.current.removeItem('hotel-1');
      });

      // Only tour item remains: 800 * 2 = 1600
      expect(result.current.state.totalPrice).toBe(1600);
      expect(result.current.state.taxAmount).toBe(288); // 1600 * 0.18
      expect(result.current.state.finalTotal).toBe(1888);
    });

    it('should not affect other items when removing one', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockHotelItem);
        result.current.addItem(mockTourItem);
      });

      act(() => {
        result.current.removeItem('hotel-1');
      });

      expect(result.current.state.items).toHaveLength(1);
      expect(result.current.state.items[0].id).toBe('tour-1');
    });
  });

  describe('updateQuantity', () => {
    it('should update item quantity', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockHotelItem);
      });

      act(() => {
        result.current.updateQuantity('hotel-1', 3);
      });

      expect(result.current.state.items[0].quantity).toBe(3);
      expect(result.current.state.totalItems).toBe(3);
      expect(result.current.state.totalPrice).toBe(4500); // 1500 * 3
    });

    it('should not allow quantity less than 1', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockHotelItem);
      });

      act(() => {
        result.current.updateQuantity('hotel-1', 0);
      });

      expect(result.current.state.items[0].quantity).toBe(1); // Minimum 1
    });

    it('should handle negative quantity values', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockHotelItem);
      });

      act(() => {
        result.current.updateQuantity('hotel-1', -5);
      });

      expect(result.current.state.items[0].quantity).toBe(1); // Minimum 1
    });
  });

  describe('updateItem', () => {
    it('should update item properties', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockHotelItem);
      });

      act(() => {
        result.current.updateItem('hotel-1', {
          price: 1800,
          bookingDetails: {
            ...mockHotelItem.bookingDetails,
            guests: 4,
          },
        });
      });

      expect(result.current.state.items[0].price).toBe(1800);
      expect(result.current.state.items[0].bookingDetails?.guests).toBe(4);
    });

    it('should recalculate totals after price update', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockHotelItem);
      });

      act(() => {
        result.current.updateItem('hotel-1', { price: 2000 });
      });

      expect(result.current.state.totalPrice).toBe(2000);
      expect(result.current.state.taxAmount).toBe(360);
      expect(result.current.state.finalTotal).toBe(2360);
    });
  });

  describe('clearCart', () => {
    it('should remove all items from cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockHotelItem);
        result.current.addItem(mockTourItem);
      });

      act(() => {
        result.current.clearCart();
      });

      expect(result.current.state.items).toHaveLength(0);
      expect(result.current.state.totalItems).toBe(0);
      expect(result.current.state.totalPrice).toBe(0);
      expect(result.current.state.finalTotal).toBe(0);
    });
  });

  describe('Discount Management', () => {
    it('should apply discount correctly', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockHotelItem);
      });

      act(() => {
        result.current.applyDiscount('WELCOME10', 150);
      });

      expect(result.current.state.discountCode).toBe('WELCOME10');
      expect(result.current.state.discountAmount).toBe(150);
      // finalTotal = totalPrice + tax - discount = 1500 + 270 - 150 = 1620
      expect(result.current.state.finalTotal).toBe(1620);
    });

    it('should not allow negative final total with discount', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockHotelItem);
      });

      act(() => {
        result.current.applyDiscount('HUGE100', 5000);
      });

      expect(result.current.state.finalTotal).toBe(0); // Capped at 0
    });

    it('should remove discount correctly', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockHotelItem);
        result.current.applyDiscount('WELCOME10', 150);
      });

      act(() => {
        result.current.removeDiscount();
      });

      expect(result.current.state.discountCode).toBeUndefined();
      expect(result.current.state.discountAmount).toBeUndefined();
      expect(result.current.state.finalTotal).toBe(1770); // Back to original
    });
  });

  describe('Helper Methods', () => {
    it('getItemCount should return total items', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockHotelItem);
        result.current.addItem(mockTourItem);
      });

      expect(result.current.getItemCount()).toBe(3); // 1 hotel + 2 tours
    });

    it('getTotalPrice should return final total', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockHotelItem);
      });

      expect(result.current.getTotalPrice()).toBe(1770);
    });

    it('isInCart should check item existence', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockHotelItem);
      });

      expect(result.current.isInCart('hotel-1')).toBe(true);
      expect(result.current.isInCart('hotel-999')).toBe(false);
    });
  });

  describe('Edge Cases', () => {
    it('should handle adding item with zero price', () => {
      const freeItem: CartItem = {
        ...mockHotelItem,
        id: 'free-1',
        price: 0,
      };

      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(freeItem);
      });

      expect(result.current.state.totalPrice).toBe(0);
      expect(result.current.state.taxAmount).toBe(0);
      expect(result.current.state.finalTotal).toBe(0);
    });

    it('should handle very large quantities', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem({ ...mockHotelItem, quantity: 1000 });
      });

      expect(result.current.state.totalItems).toBe(1000);
      expect(result.current.state.totalPrice).toBe(1500000);
    });

    it('should handle malformed localStorage data gracefully', async () => {
      localStorageMock.setItem('lydian_cart', 'invalid json{{{');

      const { result } = renderHook(() => useCart(), { wrapper });

      await waitFor(() => {
        expect(result.current.state.items).toHaveLength(0);
      });
    });

    it('should handle multiple items with same ID but different types', () => {
      const item1 = { ...mockHotelItem, id: 'item-1', type: 'hotel' as const };
      const item2 = { ...mockTourItem, id: 'item-1', type: 'tour' as const };

      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(item1);
        result.current.addItem(item2);
      });

      expect(result.current.state.items).toHaveLength(2);
    });
  });

  describe('Persistence', () => {
    it('should persist cart state across re-renders', () => {
      const { result, rerender } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockHotelItem);
      });

      rerender();

      expect(result.current.state.items).toHaveLength(1);
      expect(result.current.state.totalPrice).toBe(1500);
    });

    it('should maintain cart state after clearing and re-adding', () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockHotelItem);
        result.current.clearCart();
        result.current.addItem(mockTourItem);
      });

      expect(result.current.state.items).toHaveLength(1);
      expect(result.current.state.items[0].id).toBe('tour-1');
    });
  });

  describe('Error Handling', () => {
    it('should throw error when useCart is used outside provider', () => {
      expect(() => {
        renderHook(() => useCart());
      }).toThrow('useCart must be used within a CartProvider');
    });
  });
});
