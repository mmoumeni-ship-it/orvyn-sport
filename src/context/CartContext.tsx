import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { CartItem, Meal, Order } from '../types';

const CART_STORAGE_KEY = 'orvyn.cart.v1';

interface CartContextValue {
  items: CartItem[];
  isCartOpen: boolean;
  totalCount: number;
  subtotal: number;
  lastOrder: Order | null;
  addToCart: (meal: Meal, quantity?: number) => void;
  updateQuantity: (mealId: string, quantity: number) => void;
  removeItem: (mealId: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  placeOrder: (order: Order) => void;
  dismissOrderAlert: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

function loadCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item) =>
        item &&
        typeof item === 'object' &&
        item.meal &&
        typeof item.meal.id === 'string' &&
        typeof item.quantity === 'number'
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(loadCart);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [lastOrder, setLastOrder] = useState<Order | null>(null);
  const alertTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* stockage indisponible : le panier reste en mémoire */
    }
  }, [items]);

  useEffect(() => {
    return () => {
      if (alertTimerRef.current) clearTimeout(alertTimerRef.current);
    };
  }, []);

  const addToCart = useCallback((meal: Meal, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.meal.id === meal.id);
      if (existing) {
        return prev.map((item) =>
          item.meal.id === meal.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [...prev, { meal, quantity }];
    });
  }, []);

  const updateQuantity = useCallback((mealId: string, quantity: number) => {
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((item) => item.meal.id !== mealId)
        : prev.map((item) => (item.meal.id === mealId ? { ...item, quantity } : item))
    );
  }, []);

  const removeItem = useCallback((mealId: string) => {
    setItems((prev) => prev.filter((item) => item.meal.id !== mealId));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const openCart = useCallback(() => setIsCartOpen(true), []);
  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const placeOrder = useCallback((order: Order) => {
    setLastOrder(order);
    if (alertTimerRef.current) clearTimeout(alertTimerRef.current);
    alertTimerRef.current = setTimeout(() => setLastOrder(null), 8000);
  }, []);

  const dismissOrderAlert = useCallback(() => {
    if (alertTimerRef.current) clearTimeout(alertTimerRef.current);
    setLastOrder(null);
  }, []);

  const totalCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items]);
  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.meal.price * item.quantity, 0),
    [items]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      isCartOpen,
      totalCount,
      subtotal,
      lastOrder,
      addToCart,
      updateQuantity,
      removeItem,
      clearCart,
      openCart,
      closeCart,
      placeOrder,
      dismissOrderAlert,
    }),
    [items, isCartOpen, totalCount, subtotal, lastOrder, addToCart, updateQuantity, removeItem, clearCart, openCart, closeCart, placeOrder, dismissOrderAlert]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart doit être utilisé dans un <CartProvider>');
  return ctx;
}
