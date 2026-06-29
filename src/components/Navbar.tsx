import React, { useState } from 'react';
import { ShoppingBag, User, Menu, X, Shield, Dumbbell, Award, HelpCircle } from 'lucide-react';
import { UserProfile, CartItem } from '../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  cart: CartItem[];
  setCartOpen: (open: boolean) => void;
  userProfile: UserProfile | null;
  setUserProfile: (profile: UserProfile | null) => void;
  onOpenAuth: () => void;
  onSelectCategory?: (category: 'Bowls' | 'Shakers' | 'Snacks') => void;
}

export default function Navbar({
  currentTab,
  setCurrentTab,
  cart,
  setCartOpen,
  userProfile,
  setUserProfile,
  onOpenAuth,
  onSelectCategory
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Helper to change demo profiles easily for investors
  const handleSwitchRole = (role: 'guest' | 'user' | 'admin') => {
    if (role === 'guest') {
      setUserProfile(null);
      setCurrentTab('home');
    } else if (role === 'user') {
      setUserProfile({
        name: 'Alexandre Dubois',
        email: 'alex.dubois@orvyn.com',
        role: 'user',
        goal: 'Prise de masse',
        weight: 78,
        height: 182,
        partnerGymId: 'gym-1',
        favorites: ['bowl-chicken', 'snack-brownie'],
        notifications: [
          {
            id: 'n-1',
            title: 'Repas prêt au casier ! 🟢',
            message: 'Votre Power Chicken Bowl de récupération est disponible au casier STAND-ORVYN-ALPHA.',
            time: 'Il y a 5 min',
            read: false,
            type: 'order'
          },
          {
            id: 'n-2',
            title: 'Macros du jour optimales 🎯',
            message: 'Félicitations, vous êtes pile dans vos objectifs de protéines (162g consommés).',
            time: 'Il y a 3 h',
            read: true,
            type: 'system'
          }
        ]
      });
      setCurrentTab('dashboard-user');
    } else if (role === 'admin') {
      setUserProfile({
        name: 'Sophie Laurent',
        email: 'sophie.l@orvyn.com',
        role: 'admin',
        goal: 'Performance',
        weight: 65,
        height: 170,
        partnerGymId: 'gym-1',
        favorites: [],
        notifications: []
      });
      setCurrentTab('dashboard-admin');
    }
    setShowRoleDropdown(false);
  };

  const handleNavLinkClick = (id: string, category?: 'Bowls' | 'Shakers' | 'Snacks') => {
    setMobileMenuOpen(false);
    
    // Check if category link
    if (category && onSelectCategory) {
      setCurrentTab('home');
      setTimeout(() => {
        onSelectCategory(category);
        const el = document.getElementById('menu-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    if (id === 'subscriptions') {
      setCurrentTab('home');
      setTimeout(() => {
        const el = document.getElementById('subscriptions-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    if (id === 'how-it-works') {
      setCurrentTab('home');
      setTimeout(() => {
        const el = document.getElementById('how-it-works-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    if (id === 'faq') {
      setCurrentTab('home');
      setTimeout(() => {
        const el = document.getElementById('faq-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    if (id === 'contact') {
      setCurrentTab('home');
      setTimeout(() => {
        const el = document.getElementById('contact-section');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
      return;
    }

    setCurrentTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-900 bg-[#050505]/80 backdrop-blur-xl">
      {/* Premium Multi-role Switcher Bar for Investors & Demo */}
      <div className="bg-[#0c0c0c] border-b border-neutral-950 px-4 py-1.5 text-center text-xs text-neutral-400">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2">
          <span className="font-mono text-[10px] tracking-widest text-neutral-500 uppercase flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-green animate-pulse"></span>
            ORVYN DÉMO INVESTISSEURS (PROTOTYPE CLIENT & ADMIN)
          </span>
          <div className="flex items-center gap-2">
            <span className="hidden sm:inline text-neutral-500 font-mono text-[10px] uppercase">Rôle simulé :</span>
            <div className="relative">
              <button
                id="role-dropdown-btn"
                onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                className="flex items-center gap-1.5 rounded-full border border-neutral-800 bg-neutral-950 px-2.5 py-0.5 text-[10px] font-mono font-medium text-white transition hover:bg-neutral-900 cursor-pointer"
              >
                {!userProfile ? (
                  <span className="flex items-center gap-1">🌐 Visiteur</span>
                ) : userProfile.role === 'admin' ? (
                  <span className="flex items-center gap-1 text-yellow-400">🛡️ Admin</span>
                ) : (
                  <span className="flex items-center gap-1 text-brand-green">💪 Athlète</span>
                )}
                <span className="text-[8px] opacity-60">▼</span>
              </button>

              {showRoleDropdown && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-neutral-950 border border-neutral-800 p-1.5 shadow-2xl z-50 animate-fade-in font-mono text-[11px]">
                  <button
                    id="role-btn-guest"
                    onClick={() => handleSwitchRole('guest')}
                    className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-neutral-400 hover:bg-neutral-900 hover:text-white transition cursor-pointer ${!userProfile ? 'bg-neutral-900 text-white font-semibold' : ''}`}
                  >
                    <span>🌐 Visiteur (Public)</span>
                  </button>
                  <button
                    id="role-btn-user"
                    onClick={() => handleSwitchRole('user')}
                    className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-neutral-400 hover:bg-neutral-900 hover:text-white transition cursor-pointer ${userProfile?.role === 'user' ? 'bg-neutral-900 text-brand-green font-semibold' : ''}`}
                  >
                    <span>💪 Athlète (Client)</span>
                  </button>
                  <button
                    id="role-btn-admin"
                    onClick={() => handleSwitchRole('admin')}
                    className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-neutral-400 hover:bg-neutral-900 hover:text-white transition cursor-pointer ${userProfile?.role === 'admin' ? 'bg-neutral-900 text-yellow-400 font-semibold' : ''}`}
                  >
                    <span>🛡️ Gérant (Admin)</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo - Tesla & Apple level minimalist sophistication */}
        <div className="flex items-center">
          <button
            id="nav-logo-btn"
            onClick={() => handleNavLinkClick('home')}
            className="flex items-center gap-2 font-display text-xl font-bold tracking-widest text-white cursor-pointer group"
          >
            <span className="font-extrabold tracking-[-0.04em] text-2xl">
              ORVYN
            </span>
            <span className="h-1.5 w-1.5 rounded-full bg-brand-green shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
          </button>
        </div>

        {/* Desktop Sophisticated Navigation Menu */}
        <nav className="hidden lg:flex items-center space-x-6 text-xs uppercase tracking-wider font-medium font-sans">
          <button
            id="nav-link-home"
            onClick={() => handleNavLinkClick('home')}
            className={`transition hover:text-white cursor-pointer ${currentTab === 'home' ? 'text-brand-green' : 'text-neutral-400'}`}
          >
            Accueil
          </button>
          
          <button
            id="nav-link-meals"
            onClick={() => handleNavLinkClick('home', 'Bowls')}
            className="text-neutral-400 transition hover:text-white cursor-pointer"
          >
            Bowls
          </button>
          
          <button
            id="nav-link-shakes"
            onClick={() => handleNavLinkClick('home', 'Shakers')}
            className="text-neutral-400 transition hover:text-white cursor-pointer"
          >
            Shakers
          </button>

          <button
            id="nav-link-snacks"
            onClick={() => handleNavLinkClick('home', 'Snacks')}
            className="text-neutral-400 transition hover:text-white cursor-pointer"
          >
            Snacks
          </button>

          <button
            id="nav-link-subscriptions"
            onClick={() => handleNavLinkClick('subscriptions')}
            className="text-neutral-400 transition hover:text-white cursor-pointer"
          >
            Abonnements
          </button>

          <button
            id="nav-link-about"
            onClick={() => handleNavLinkClick('about')}
            className={`transition hover:text-white cursor-pointer ${currentTab === 'about' ? 'text-brand-green' : 'text-neutral-400'}`}
          >
            À Propos
          </button>

          <button
            id="nav-link-faq"
            onClick={() => handleNavLinkClick('faq')}
            className="text-neutral-400 transition hover:text-white cursor-pointer"
          >
            FAQ
          </button>

          <button
            id="nav-link-contact"
            onClick={() => handleNavLinkClick('contact')}
            className="text-neutral-400 transition hover:text-white cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* Actions Menu */}
        <div className="flex items-center space-x-4">
          {/* Cart Icon */}
          <button
            id="cart-toggle-btn"
            onClick={() => setCartOpen(true)}
            className="relative p-2 text-neutral-400 hover:text-brand-green hover:bg-neutral-900 transition rounded-full cursor-pointer"
          >
            <ShoppingBag className="h-5 w-5" />
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-0 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-brand-green text-[9px] font-bold text-black font-mono">
                {cartItemsCount}
              </span>
            )}
          </button>

          {/* User Profile / Connexion CTA */}
          {userProfile ? (
            <div className="flex items-center gap-2">
              <button
                id="user-dashboard-nav-btn"
                onClick={() => {
                  if (userProfile.role === 'admin') {
                    setCurrentTab('dashboard-admin');
                  } else {
                    setCurrentTab('dashboard-user');
                  }
                }}
                className="flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950 pl-2 pr-3 py-1 text-xs font-mono font-medium text-neutral-300 hover:bg-neutral-900 hover:text-white transition cursor-pointer"
              >
                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-brand-green-light text-[10px] font-bold text-brand-green">
                  {userProfile.name.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="hidden sm:inline max-w-[100px] truncate">{userProfile.name.split(' ')[0]}</span>
              </button>
              
              <button
                id="logout-nav-btn"
                onClick={() => {
                  setUserProfile(null);
                  setCurrentTab('home');
                }}
                className="hidden sm:flex items-center justify-center p-2 rounded-full border border-neutral-900 text-neutral-500 hover:text-red-400 hover:bg-red-950/20 hover:border-red-900 transition cursor-pointer"
                title="Déconnexion"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <button
              id="auth-nav-btn"
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-xs font-bold text-black transition hover:bg-brand-green hover:text-black cursor-pointer shadow-md shadow-brand-green/5"
            >
              <User className="h-3.5 w-3.5" />
              <span>Mon Compte</span>
            </button>
          )}

          {/* Mobile menu button */}
          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-400 hover:text-brand-green lg:hidden rounded-full hover:bg-neutral-900 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-900 bg-[#050505]/95 backdrop-blur-xl px-4 py-6 space-y-3 shadow-2xl transition-all">
          <button
            id="mobile-nav-link-home"
            onClick={() => handleNavLinkClick('home')}
            className={`block w-full text-left rounded-xl px-4 py-2 text-sm font-semibold transition ${currentTab === 'home' ? 'bg-brand-green-light text-brand-green' : 'text-neutral-400 hover:bg-neutral-900'}`}
          >
            Accueil
          </button>
          
          <button
            id="mobile-nav-link-meals"
            onClick={() => handleNavLinkClick('home', 'Bowls')}
            className="block w-full text-left rounded-xl px-4 py-2 text-sm text-neutral-400 hover:bg-neutral-900"
          >
            Bowls
          </button>
          
          <button
            id="mobile-nav-link-shakes"
            onClick={() => handleNavLinkClick('home', 'Shakers')}
            className="block w-full text-left rounded-xl px-4 py-2 text-sm text-neutral-400 hover:bg-neutral-900"
          >
            Shakers
          </button>

          <button
            id="mobile-nav-link-snacks"
            onClick={() => handleNavLinkClick('home', 'Snacks')}
            className="block w-full text-left rounded-xl px-4 py-2 text-sm text-neutral-400 hover:bg-neutral-900"
          >
            Snacks
          </button>

          <button
            id="mobile-nav-link-sub"
            onClick={() => handleNavLinkClick('subscriptions')}
            className="block w-full text-left rounded-xl px-4 py-2 text-sm text-neutral-400 hover:bg-neutral-900"
          >
            Abonnements
          </button>

          <button
            id="mobile-nav-link-about"
            onClick={() => handleNavLinkClick('about')}
            className="block w-full text-left rounded-xl px-4 py-2 text-sm text-neutral-400 hover:bg-neutral-900"
          >
            À Propos
          </button>

          <button
            id="mobile-nav-link-faq"
            onClick={() => handleNavLinkClick('faq')}
            className="block w-full text-left rounded-xl px-4 py-2 text-sm text-neutral-400 hover:bg-neutral-900"
          >
            FAQ
          </button>

          <button
            id="mobile-nav-link-contact"
            onClick={() => handleNavLinkClick('contact')}
            className="block w-full text-left rounded-xl px-4 py-2 text-sm text-neutral-400 hover:bg-neutral-900"
          >
            Contact
          </button>

          {!userProfile ? (
            <button
              id="mobile-auth-btn"
              onClick={() => {
                onOpenAuth();
                setMobileMenuOpen(false);
              }}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-center text-sm font-bold text-black hover:bg-brand-green"
            >
              <User className="h-4 w-4" />
              <span>Se Connecter / Créer un Compte</span>
            </button>
          ) : (
            <div className="border-t border-neutral-900 pt-4 flex flex-col gap-2">
              <button
                id="mobile-dashboard-btn"
                onClick={() => {
                  if (userProfile.role === 'admin') {
                    setCurrentTab('dashboard-admin');
                  } else {
                    setCurrentTab('dashboard-user');
                  }
                  setMobileMenuOpen(false);
                }}
                className="flex w-full items-center gap-2 rounded-xl bg-brand-green px-4 py-3 text-sm font-bold text-black justify-center"
              >
                <span>Accéder à mon Espace ({userProfile.role === 'admin' ? 'Gérant' : 'Athlète'})</span>
              </button>
              <button
                id="mobile-logout-btn"
                onClick={() => {
                  setUserProfile(null);
                  setCurrentTab('home');
                  setMobileMenuOpen(false);
                }}
                className="flex w-full items-center justify-center gap-1 py-2 text-sm text-red-400 hover:bg-red-950/20 rounded-xl"
              >
                <span>Se déconnecter</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
