import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import OrderToast from './components/OrderToast';
import { useCart } from './context/CartContext';

export default function Layout() {
  const { items, isCartOpen, closeCart, updateQuantity, removeItem, clearCart, placeOrder } = useCart();

  return (
    <div className="min-h-screen flex flex-col bg-bone text-charbon">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer
        isOpen={isCartOpen}
        onClose={closeCart}
        cart={items}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onClearCart={clearCart}
        onNewOrder={placeOrder}
      />
      <OrderToast />
    </div>
  );
}
