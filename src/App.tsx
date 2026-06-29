import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import HowItWorks from './components/HowItWorks';
import NutritionGoals from './components/NutritionGoals';
import MealMenu from './components/MealMenu';
import SubscriptionsSection from './components/SubscriptionsSection';
import CartDrawer from './components/CartDrawer';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import AboutUs from './components/AboutUs';
import FAQ from './components/FAQ';
import ContactSection from './components/ContactSection';
import AuthPage from './components/AuthPage';
import Footer from './components/Footer';

import { Meal, CartItem, UserProfile, Order, Gym } from './types';
import { GYMS_DATABASE } from './data/gyms';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<'Bowls' | 'Shakers' | 'Snacks' | ''>('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  
  // Real-time dynamic databases
  const [gyms, setGyms] = useState<Gym[]>(GYMS_DATABASE);
  const [orders, setOrders] = useState<Order[]>([]);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Custom visual toast alerts
  const [toasts, setToasts] = useState<{ id: string; message: string; type: 'success' | 'info' }[]>([]);

  const addToast = (message: string, type: 'success' | 'info' = 'success') => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Cart operations
  const handleAddToCart = (meal: Meal) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.meal.id === meal.id);
      if (existing) {
        return prev.map((item) =>
          item.meal.id === meal.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { meal, quantity: 1 }];
    });
    addToast(`🛒 ${meal.name} ajouté au panier !`);
  };

  const handleUpdateCartQuantity = (mealId: string, qty: number) => {
    if (qty <= 0) {
      handleRemoveFromCart(mealId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.meal.id === mealId ? { ...item, quantity: qty } : item))
    );
  };

  const handleRemoveFromCart = (mealId: string) => {
    setCart((prev) => prev.filter((item) => item.meal.id !== mealId));
    addToast('🗑️ Plat supprimé du panier.', 'info');
  };

  const handleClearCart = () => {
    setCart([]);
  };

  const handleAddSubscriptionToCart = (planName: string) => {
    const subMeals: Record<string, Meal> = {
      'Start': {
        id: 'sub-start',
        name: 'Abonnement Start',
        category: 'Abonnements',
        description: '5 repas d\'élite par mois avec accès illimité aux casiers connectés.',
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600',
        proteins: 0,
        carbs: 0,
        lipids: 0,
        calories: 0,
        price: 49.00,
        goals: [],
        tags: ['Abonnement'],
        ingredients: ['5 Crédits Repas', 'Casiers Connectés Standard', 'Fiches Nutritionnelles'],
        allergens: []
      },
      'Pro': {
        id: 'sub-pro',
        name: 'Abonnement Pro',
        category: 'Abonnements',
        description: '15 repas d\'élite par mois avec support diététique par chat et badge prioritaire.',
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600',
        proteins: 0,
        carbs: 0,
        lipids: 0,
        calories: 0,
        price: 129.00,
        goals: [],
        tags: ['Abonnement', 'Le plus populaire'],
        ingredients: ['15 Crédits Repas', 'Casiers Connectés Standard', 'Support Diététique Chat', 'Badge Membre Prioritaire'],
        allergens: []
      },
      'Elite': {
        id: 'sub-elite',
        name: 'Abonnement Elite',
        category: 'Abonnements',
        description: '30 repas d\'élite par mois avec suivi nutritionnel par visio hebdomadaire et personnalisation complète.',
        image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=600',
        proteins: 0,
        carbs: 0,
        lipids: 0,
        calories: 0,
        price: 239.00,
        goals: [],
        tags: ['Abonnement', 'Meilleur rapport qualité/prix'],
        ingredients: ['30 Crédits Repas', 'Casiers Connectés Prioritaires', 'Coach Nutritionniste Dédié', 'Sur-mesure total'],
        allergens: []
      }
    };

    const sub = subMeals[planName];
    if (sub) {
      setCart((prev) => {
        const existing = prev.find((item) => item.meal.id === sub.id);
        if (existing) {
          return prev.map((item) =>
            item.meal.id === sub.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        }
        return [...prev, { meal: sub, quantity: 1 }];
      });
      addToast(`⭐ ${sub.name} ajouté au panier !`);
      setCartOpen(true);
    }
  };

  // Handle a new order checkout
  const handleNewOrderSubmit = (newOrder: Order) => {
    setOrders((prev) => [newOrder, ...prev]);
    addToast(`🔥 Commande ${newOrder.id} enregistrée !`);
    
    // Automatically add this order's status notification to user profile if logged-in
    if (userProfile && userProfile.role === 'user') {
      const updatedNotifs = [
        {
          id: `notif-order-${newOrder.id}`,
          title: 'Commande en préparation 🧑‍🍳',
          message: `Votre repas est en cuisine. Retrait estimé à ${newOrder.pickupTime} au stand ${newOrder.gymId === 'gym-1' ? 'A1-GREEN' : 'A2-BLUE'}.`,
          time: 'À l\'instant',
          read: false,
          type: 'order' as const,
        },
        ...userProfile.notifications,
      ];
      setUserProfile({ ...userProfile, notifications: updatedNotifs });
    }
  };

  // Admin status update dispatcher
  const handleUpdateOrderStatus = (orderId: string, status: 'pending' | 'preparing' | 'ready' | 'collected') => {
    setOrders((prev) =>
      prev.map((order) => (order.id === orderId ? { ...order, status } : order))
    );
    
    const matched = orders.find(o => o.id === orderId);
    const codeStr = matched ? matched.pickupCode : 'ORVYN-XXX';

    // Notify client if logged in
    if (userProfile && userProfile.role === 'user') {
      let statusMsg = '';
      if (status === 'ready') {
        statusMsg = `Votre repas est disponible ! Récupérez-le au casier avec le code ${codeStr}.`;
      } else if (status === 'collected') {
        statusMsg = `Commande récupérée avec succès. Merci d'avoir choisi ORVYN !`;
      }

      if (statusMsg) {
        const updatedNotifs = [
          {
            id: `notif-status-${orderId}-${Date.now()}`,
            title: status === 'ready' ? 'Plat prêt au casier ! 🟢' : 'Commande retirée 🎒',
            message: statusMsg,
            time: 'À l\'instant',
            read: false,
            type: 'order' as const,
          },
          ...userProfile.notifications,
        ];
        setUserProfile({ ...userProfile, notifications: updatedNotifs });
      }
    }
    addToast(`⚙️ Statut de la commande ${orderId} modifié: ${status === 'ready' ? 'Au Casier' : 'Récupéré'}`);
  };

  // Toggle Gym Maintenance Status
  const handleToggleGymStatus = (gymId: string) => {
    setGyms((prev) =>
      prev.map((g) => (g.id === gymId ? { ...g, status: g.status === 'active' ? 'maintenance' : 'active' } : g))
    );
    const gymObj = gyms.find((g) => g.id === gymId);
    if (gymObj) {
      addToast(
        `🛠️ Stand ${gymObj.lockerStandCode} mis en ${gymObj.status === 'active' ? 'maintenance' : 'service actif'}.`,
        'info'
      );
    }
  };

  // Handle user profiles favorites
  const handleRemoveFavorite = (mealId: string) => {
    if (userProfile) {
      const updatedFavs = userProfile.favorites.filter((id) => id !== mealId);
      setUserProfile({ ...userProfile, favorites: updatedFavs });
      addToast('💔 Retiré de vos plats favoris.', 'info');
    }
  };

  // Handle state-based smooth scroll anchors
  const [activeGoal, setActiveGoal] = useState<string>('');
  const [activeTag, setActiveTag] = useState<string>('');

  const handleSetTabAndScroll = (tabId: string) => {
    // If not on homepage, force back to homepage then scroll
    if (['about', 'dashboard-user', 'dashboard-admin'].includes(currentTab)) {
      setCurrentTab('home');
      // Wait for DOM to load homepage before scrolling
      setTimeout(() => {
        const target = document.getElementById(`${tabId}-section`);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      setCurrentTab('home');
      const target = document.getElementById(`${tabId}-section`);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      } else if (tabId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between relative bg-[#050505] text-white">
      
      {/* Toast Alert stack */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-2.5 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center gap-3.5 rounded-2xl border px-4.5 py-3 shadow-2xl backdrop-blur-md animate-slide-up ${
              toast.type === 'info'
                ? 'bg-zinc-900 border-zinc-800 text-white'
                : 'bg-white border-zinc-100 text-brand-dark'
            }`}
          >
            <span className="text-xs font-semibold leading-relaxed">{toast.message}</span>
          </div>
        ))}
      </div>

      {/* Navigation Header */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          if (['how-it-works', 'menu', 'goals', 'faq', 'contact'].includes(tab)) {
            handleSetTabAndScroll(tab);
          } else {
            setCurrentTab(tab);
          }
        }}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        cart={cart}
        setCartOpen={setCartOpen}
        userProfile={userProfile}
        setUserProfile={setUserProfile}
        onOpenAuth={() => setAuthOpen(true)}
      />

      {/* Main Core Router View Body */}
      <main className="flex-grow">
        
        {/* VIEW 1: Active athlete user space */}
        {currentTab === 'dashboard-user' && userProfile && (
          <UserDashboard
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            orders={orders}
            onRemoveFavorite={handleRemoveFavorite}
            onAddToCart={handleAddToCart}
            setCurrentTab={(tab) => {
              if (['how-it-works', 'menu', 'goals', 'faq', 'contact'].includes(tab)) {
                handleSetTabAndScroll(tab);
              } else {
                setCurrentTab(tab);
              }
            }}
          />
        )}

        {/* VIEW 2: Gym SaaS operator space */}
        {currentTab === 'dashboard-admin' && userProfile && (
          <AdminDashboard
            orders={orders}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            gyms={gyms}
            onToggleGymStatus={handleToggleGymStatus}
          />
        )}

        {/* VIEW 3: Tech Vision & Founders story */}
        {currentTab === 'about' && (
          <AboutUs />
        )}

        {/* VIEW 4: Core Landing contiguous presentation (Home) */}
        {currentTab === 'home' && (
          <>
            <HeroSection
              setCurrentTab={(tab) => {
                if (['how-it-works', 'menu', 'goals', 'faq', 'contact'].includes(tab)) {
                  handleSetTabAndScroll(tab);
                } else {
                  setCurrentTab(tab);
                }
              }}
              onOpenAuth={() => setAuthOpen(true)}
            />
            
            <HowItWorks
              setCurrentTab={(tab) => {
                if (['how-it-works', 'menu', 'goals', 'faq', 'contact'].includes(tab)) {
                  handleSetTabAndScroll(tab);
                } else {
                  setCurrentTab(tab);
                }
              }}
            />
            
            <NutritionGoals
              activeGoal={activeGoal}
              setActiveGoal={setActiveGoal}
              activeTag={activeTag}
              setActiveTag={setActiveTag}
              scrollToMenu={() => {
                setTimeout(() => {
                  const el = document.getElementById('menu-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              }}
            />
            
            <MealMenu
              activeGoal={activeGoal}
              setActiveGoal={setActiveGoal}
              activeTag={activeTag}
              setActiveTag={setActiveTag}
              onAddToCart={handleAddToCart}
              cart={cart}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
            
            <SubscriptionsSection
              onSelectPlan={handleAddSubscriptionToCart}
              onOpenAuth={() => setAuthOpen(true)}
            />
            
            <FAQ />
            
            <ContactSection />
          </>
        )}

      </main>

      {/* Slidover Cart Drawer */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
        onNewOrder={handleNewOrderSubmit}
      />

      {/* Login / Setup Account Popup Dialog */}
      {authOpen && (
        <AuthPage
          onSuccessLogin={(profile) => {
            setUserProfile(profile);
            addToast(`👋 Bonjour ${profile.name} ! Connexion réussie.`);
            if (profile.role === 'admin') {
              setCurrentTab('dashboard-admin');
            } else {
              setCurrentTab('dashboard-user');
            }
          }}
          onClose={() => setAuthOpen(false)}
        />
      )}

      {/* Global Sleek Dark Footer */}
      <Footer
        setCurrentTab={(tab) => {
          if (['how-it-works', 'menu', 'goals', 'faq', 'contact'].includes(tab)) {
            handleSetTabAndScroll(tab);
          } else {
            setCurrentTab(tab);
          }
        }}
      />

    </div>
  );
}
