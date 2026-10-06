'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import type { CartItem, Product } from '@/types/product';

interface CartContextValue {
  items: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('arunas-cart');
      if (stored) setItems(JSON.parse(stored) as CartItem[]);
    } catch {
      setItems([]);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated) localStorage.setItem('arunas-cart', JSON.stringify(items));
  }, [items, hydrated]);

  const value = useMemo<CartContextValue>(() => ({
    items,
    addToCart: (product, quantity = 1) => {
      setItems((current) => {
        const existing = current.find((item) => item.productId === product.id);
        if (existing) {
          return current.map((item) => item.productId === product.id ? { ...item, quantity: item.quantity + quantity } : item);
        }
        return [...current, {
          productId: product.id,
          name: product.name,
          price: product.price,
          unit: product.unit,
          quantity,
          image: product.image,
        }];
      });
    },
    removeFromCart: (productId) => setItems((current) => current.filter((item) => item.productId !== productId)),
    increaseQuantity: (productId) => setItems((current) => current.map((item) => item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item)),
    decreaseQuantity: (productId) => setItems((current) => current.map((item) => item.productId === productId ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item)),
    clearCart: () => {
      setItems([]);
      try {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('arunas-cart');
        }
      } catch {
        // ignore
      }
    },
    getCartTotal: () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    getCartItemCount: () => items.reduce((sum, item) => sum + item.quantity, 0),
  }), [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}
