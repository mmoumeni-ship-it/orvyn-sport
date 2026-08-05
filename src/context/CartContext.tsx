import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { CartItem } from '../types';

const CART_STORAGE_KEY = 'orvyn.cart.v2';

type CartContextValue = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
  addToCart: (item: CartItem) => void;
  updateQuantity: (id: string, quantity: number) => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function normalizeItems(items: unknown): CartItem[] {
  if (!Array.isArray(items)) return [];
  return items
    .filter((item): item is CartItem => {
      if (!item || typeof item !== 'object') return false;
      const candidate = item as Partial<CartItem>;
      return (
        typeof candidate.id === 'string' &&
        (candidate.type === 'dish' || candidate.type === 'subscription') &&
        typeof candidate.name === 'string' &&
        typeof candidate.price === 'number' &&
        Number.isFinite(candidate.price) &&
        typeof candidate.quantity === 'number' &&
        Number.isFinite(candidate.quantity) &&
        candidate.quantity >= 1
      );
    })
    .map((item) => ({
      ...item,
      quantity: Math.max(1, Math.floor(item.quantity)),
      price: Number(item.price),
    }));
}

function loadCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    return normalizeItems(JSON.parse(raw));
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // localStorage unavailable
    }
  }, [items]);

  const addItem = useCallback((item: CartItem) => {
    if (!item || typeof item !== 'object') return;
    const normalized: CartItem = {
      id: item.id,
      type: item.type,
      name: item.name,
      price: Number(item.price),
      quantity: Math.max(1, Math.floor(Number(item.quantity ?? 1))),
      slug: item.slug,
      plan: item.plan,
      billingPeriod: item.billingPeriod,
    };
    if (!normalized.id || !normalized.name || !Number.isFinite(normalized.price)) return;
    setItems((prev) => {
      const existing = prev.find((entry) => entry.id === normalized.id);
      if (existing) {
        return prev.map((entry) =>
          entry.id === normalized.id
            ? { ...entry, quantity: Math.max(1, entry.quantity + normalized.quantity) }
            : entry
        );
      }
      return [...prev, normalized];
    });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    const safeQuantity = Math.max(1, Math.floor(Number(quantity || 1)));
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: safeQuantity } : item)));
  }, []);

  const increaseQuantity = useCallback((id: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: item.quantity + 1 } : item)));
  }, []);

  const decreaseQuantity = useCallback((id: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, item.quantity - 1) } : item)));
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.price * item.quantity, 0), [items]);

  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      itemCount,
      subtotal,
      addToCart: addItem,
      updateQuantity,
    }),
    [items, addItem, removeItem, increaseQuantity, decreaseQuantity, clearCart, itemCount, subtotal, updateQuantity]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart doit être utilisé dans un <CartProvider>');
  return ctx;
}
