import React, { useState } from 'react';
import { User, Dumbbell, Clock, Heart, Bell, LogOut, MapPin, Activity, CheckCircle2, Zap, Save, ChevronRight, BarChart2 } from 'lucide-react';
import { UserProfile, Order, Meal, NotificationItem } from '../types';
import { GOALS_DATABASE, MEALS_DATABASE } from '../data/meals';
import { GYMS_DATABASE } from '../data/gyms';

interface UserDashboardProps {
  userProfile: UserProfile;
  setUserProfile: (profile: UserProfile | null) => void;
  orders: Order[];
  onRemoveFavorite: (mealId: string) => void;
  onAddToCart: (meal: Meal) => void;
  setCurrentTab: (tab: string) => void;
}

export default function UserDashboard({
  userProfile,
  setUserProfile,
  orders,
  onRemoveFavorite,
  onAddToCart,
  setCurrentTab
}: UserDashboardProps) {
  
  const [activeTab, setActiveTab] = useState<'tracker' | 'orders' | 'favorites' | 'subscriptions' | 'profile'>('tracker');
  
  // Profile Form Edit state
  const [editWeight, setEditWeight] = useState(userProfile.weight);
  const [editHeight, setEditHeight] = useState(userProfile.height);
  const [editGoal, setEditGoal] = useState(userProfile.goal);
  const [editGym, setEditGym] = useState(userProfile.partnerGymId);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const matchedGoalObj = GOALS_DATABASE.find(g => g.id === userProfile.goal) || GOALS_DATABASE[0];
  const matchedGymObj = GYMS_DATABASE.find(g => g.id === userProfile.partnerGymId) || GYMS_DATABASE[0];

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUserProfile({
      ...userProfile,
      weight: editWeight,
      height: editHeight,
      goal: editGoal,
      partnerGymId: editGym
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleMarkNotifRead = (id: string) => {
    const updatedNotifs = userProfile.notifications.map(n => n.id === id ? { ...n, read: true } : n);
    setUserProfile({ ...userProfile, notifications: updatedNotifs });
  };

  const unreadCount = userProfile.notifications.filter(n => !n.read).length;

  // Find favorite meals
  const favoriteMeals = MEALS_DATABASE.filter(m => userProfile.favorites.includes(m.id));

  return (
    <div className="bg-black min-h-screen py-12 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Top Banner - welcome athlete */}
        <div className="relative rounded-3xl border border-neutral-900 bg-gradient-to-r from-neutral-950 to-neutral-900 p-6 lg:p-8 shadow-2xl overflow-hidden mb-10">
          <div className="absolute top-0 right-0 h-32 w-32 bg-brand-green/5 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
            <div className="space-y-3">
              <span className="font-mono text-[9px] uppercase tracking-widest text-brand-green font-bold bg-[#111111] px-3 py-1.5 rounded-full border border-neutral-800">
                Membre d'Élite ORVYN
              </span>
              <h1 className="font-display text-2xl font-extrabold lg:text-4xl tracking-tight text-white">Espace de {userProfile.name}</h1>
              <p className="text-xs text-neutral-400 font-sans flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-brand-green" />
                Lounge favori : <span className="text-white font-medium">{matchedGymObj.name}</span>
              </p>
            </div>

            <div className="flex gap-4">
              <div className="bg-[#050505] rounded-2xl p-4 text-center border border-neutral-900 min-w-[100px]">
                <span className="block text-[8px] uppercase tracking-wider text-neutral-500 font-mono mb-1">Poids</span>
                <span className="font-mono text-base font-bold text-white">{userProfile.weight} kg</span>
              </div>
              <div className="bg-[#050505] rounded-2xl p-4 text-center border border-neutral-900 min-w-[100px]">
                <span className="block text-[8px] uppercase tracking-wider text-neutral-500 font-mono mb-1">Objectif</span>
                <span className="font-mono text-xs font-bold text-brand-green truncate block max-w-[110px] uppercase tracking-wider">
                  {matchedGoalObj.name}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Side: Navigation Links & Notifications */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Dashboard Tabs menu */}
            <div className="rounded-2xl border border-neutral-900 bg-[#0a0a0a] p-3 space-y-1">
              <button
                id="dash-tab-tracker"
                onClick={() => setActiveTab('tracker')}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left text-xs font-mono font-semibold tracking-wider uppercase transition cursor-pointer ${
                  activeTab === 'tracker' ? 'bg-white text-black' : 'text-neutral-400 hover:bg-[#121212] hover:text-white'
                }`}
              >
                <Activity className="h-4 w-4" />
                <span>Programmation</span>
              </button>
              <button
                id="dash-tab-orders"
                onClick={() => setActiveTab('orders')}
                className={`flex w-full items-center justify-between rounded-xl px-4 py-3.5 text-left text-xs font-mono font-semibold tracking-wider uppercase transition cursor-pointer ${
                  activeTab === 'orders' ? 'bg-white text-black' : 'text-neutral-400 hover:bg-[#121212] hover:text-white'
                }`}
              >
                <span className="flex items-center gap-3">
                  <Clock className="h-4 w-4" />
                  <span>Réservations</span>
                </span>
                {orders.length > 0 && (
                  <span className="rounded-full bg-brand-green text-black text-[9px] px-2 py-0.5 font-bold">
                    {orders.length}
                  </span>
                )}
              </button>
              <button
                id="dash-tab-favorites"
                onClick={() => setActiveTab('favorites')}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left text-xs font-mono font-semibold tracking-wider uppercase transition cursor-pointer ${
                  activeTab === 'favorites' ? 'bg-white text-black' : 'text-neutral-400 hover:bg-[#121212] hover:text-white'
                }`}
              >
                <Heart className="h-4 w-4" />
                <span>Favoris</span>
              </button>
              <button
                id="dash-tab-subscriptions"
                onClick={() => setActiveTab('subscriptions')}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left text-xs font-mono font-semibold tracking-wider uppercase transition cursor-pointer ${
                  activeTab === 'subscriptions' ? 'bg-white text-black' : 'text-neutral-400 hover:bg-[#121212] hover:text-white'
                }`}
              >
                <Zap className="h-4 w-4" />
                <span>Mes abonnements</span>
              </button>
              <button
                id="dash-tab-profile"
                onClick={() => setActiveTab('profile')}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left text-xs font-mono font-semibold tracking-wider uppercase transition cursor-pointer ${
                  activeTab === 'profile' ? 'bg-white text-black' : 'text-neutral-400 hover:bg-[#121212] hover:text-white'
                }`}
              >
                <User className="h-4 w-4" />
                <span>Paramètres</span>
              </button>
            </div>

            {/* User Live Notifications Panel */}
            <div className="rounded-2xl border border-neutral-900 bg-[#0a0a0a] p-5 space-y-4">
              <h3 className="font-display text-xs font-bold uppercase tracking-widest text-neutral-400 flex items-center justify-between">
                <span className="flex items-center gap-2 font-mono">
                  <Bell className="h-4 w-4 text-brand-green" />
                  Alertes
                </span>
                {unreadCount > 0 && (
                  <span className="rounded-full bg-brand-green/10 text-brand-green border border-brand-green/20 px-2 py-0.5 text-[9px] font-bold">
                    {unreadCount} active
                  </span>
                )}
              </h3>

              {userProfile.notifications.length === 0 ? (
                <p className="text-xs text-neutral-500 font-sans font-light">Aucune alerte pour le moment.</p>
              ) : (
                <div className="space-y-3.5 max-h-[220px] overflow-y-auto">
                  {userProfile.notifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`p-3 rounded-xl border text-xs transition relative ${
                        notif.read ? 'bg-neutral-950/40 border-neutral-950 text-neutral-500' : 'bg-brand-green/5 border-brand-green/15 text-white'
                      }`}
                    >
                      {!notif.read && (
                        <button
                          id={`mark-notif-read-btn-${notif.id}`}
                          onClick={() => handleMarkNotifRead(notif.id)}
                          className="absolute top-2.5 right-2.5 text-[9px] font-mono text-brand-green hover:underline cursor-pointer"
                        >
                          Lu
                        </button>
                      )}
                      <p className="font-bold pr-6 font-display text-[11px] tracking-tight">{notif.title}</p>
                      <p className="text-[10px] text-neutral-400 leading-relaxed mt-1 font-sans font-light">{notif.message}</p>
                      <span className="text-[8px] text-neutral-500 font-mono block mt-2 tracking-wide">{notif.time}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Right Side: Active Tab View Body */}
          <div className="lg:col-span-9">
            
            {/* Tracker view: macros progression */}
            {activeTab === 'tracker' && (
              <div className="space-y-6">
                
                {/* Macro stats overview */}
                <div className="rounded-3xl border border-neutral-900 bg-[#0a0a0a] p-6 lg:p-8 space-y-8">
                  <div className="space-y-1">
                    <h3 className="font-display text-lg font-bold text-white tracking-tight flex items-center gap-2">
                      <BarChart2 className="h-5 w-5 text-brand-green" />
                      Apports de précision du jour ({matchedGoalObj.name})
                    </h3>
                    <p className="text-xs text-neutral-400 font-sans font-light">Vos macronutriments ciblés sont synchronisés à chaque retrait d'assiette.</p>
                  </div>

                  {/* Macro progress bars */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                    {/* Proteins */}
                    <div className="space-y-2.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="font-bold text-brand-green uppercase tracking-wider">Protéines</span>
                        <span className="text-neutral-400">114g / 150g (76%)</span>
                      </div>
                      <div className="h-2 w-full bg-neutral-950 rounded-full overflow-hidden border border-neutral-900">
                        <div className="bg-brand-green h-full rounded-full transition-all" style={{ width: '76%' }} />
                      </div>
                      <p className="text-[10px] text-neutral-500 font-sans font-light">Target : Synthèse des fibres post-effort.</p>
                    </div>

                    {/* Carbs */}
                    <div className="space-y-2.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="font-bold text-white uppercase tracking-wider">Glucides</span>
                        <span className="text-neutral-400">180g / 280g (64%)</span>
                      </div>
                      <div className="h-2 w-full bg-neutral-950 rounded-full overflow-hidden border border-neutral-900">
                        <div className="bg-white h-full rounded-full transition-all" style={{ width: '64%' }} />
                      </div>
                      <p className="text-[10px] text-neutral-500 font-sans font-light">Target : Reconstruction des stocks de glycogène.</p>
                    </div>

                    {/* Lipids */}
                    <div className="space-y-2.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="font-bold text-neutral-400 uppercase tracking-wider">Lipides</span>
                        <span className="text-neutral-400">55g / 75g (73%)</span>
                      </div>
                      <div className="h-2 w-full bg-neutral-950 rounded-full overflow-hidden border border-neutral-900">
                        <div className="bg-neutral-500 h-full rounded-full transition-all" style={{ width: '73%' }} />
                      </div>
                      <p className="text-[10px] text-neutral-500 font-sans font-light">Target : Équilibre endocrinien & antioxydant.</p>
                    </div>
                  </div>
                </div>

                {/* Gym partnership banner */}
                <div className="rounded-3xl border border-neutral-900 bg-[#0a0a0a] p-6 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#121212] text-brand-green border border-neutral-800">
                      <MapPin className="h-5.5 w-5.5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white font-display">Concept Lounge {matchedGymObj.lockerStandCode} actif</h4>
                      <p className="text-[10px] text-neutral-400 leading-relaxed font-sans font-light mt-1">
                        Le casier connecté thermo-régulé se situe dans l'espace VIP près de l'accueil de {matchedGymObj.name}.
                      </p>
                    </div>
                  </div>
                  <button
                    id="dash-order-new-btn"
                    onClick={() => setCurrentTab('menu')}
                    className="rounded-full bg-white text-black hover:bg-brand-green text-[10px] font-mono tracking-widest uppercase font-bold px-6 py-3 transition whitespace-nowrap cursor-pointer"
                  >
                    Réserver ma nutrition
                  </button>
                </div>

              </div>
            )}

            {/* Orders tracking list */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="font-display text-base font-bold text-white tracking-tight">Suivi des commandes en cours</h3>
                  <p className="text-xs text-neutral-400 font-sans font-light">Découvrez l'état de préparation thermique de vos assiettes d'élite.</p>
                </div>
                
                {orders.length === 0 ? (
                  <div className="text-center py-16 rounded-3xl border border-dashed border-neutral-800 bg-[#0a0a0a] space-y-4">
                    <p className="text-xs text-neutral-400 font-sans font-light">Vous n'avez pas de réservation active en stand aujourd'hui.</p>
                    <button
                      id="dash-orders-menu-btn"
                      onClick={() => setCurrentTab('menu')}
                      className="rounded-full bg-white text-black hover:bg-brand-green text-[10px] font-mono tracking-widest uppercase font-bold px-6 py-2.5 cursor-pointer"
                    >
                      Commander maintenant
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => {
                      const statusSteps = ['pending', 'preparing', 'ready', 'collected'];
                      const stepIndex = statusSteps.indexOf(order.status);
                      
                      return (
                        <div
                          id={`dashboard-order-card-${order.id}`}
                          key={order.id}
                          className="rounded-3xl border border-neutral-900 bg-[#0a0a0a] p-6 space-y-6 shadow-2xl"
                        >
                          {/* Order Header info */}
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-neutral-900 pb-5">
                            <div>
                              <span className="text-[9px] font-mono font-bold text-brand-green uppercase tracking-wider">RESERVED ID: {order.id}</span>
                              <h4 className="text-xs font-bold text-white mt-1 font-display">{order.gymName}</h4>
                              <p className="text-[10px] text-neutral-400 font-sans font-light mt-0.5">Retrait : <span className="text-brand-green font-semibold">{order.pickupTime}</span></p>
                            </div>

                            <div className="bg-black text-white font-mono px-4 py-2 rounded-xl border border-neutral-900 text-center min-w-[110px]">
                              <span className="block text-[8px] uppercase tracking-widest text-neutral-500 font-bold">Code Casier</span>
                              <span className="font-bold text-sm tracking-widest text-brand-green">{order.pickupCode}</span>
                            </div>
                          </div>

                          {/* Order Stepper Tracker */}
                          <div className="space-y-4">
                            <p className="text-[10px] font-bold text-neutral-400 font-mono uppercase tracking-widest">Statut de livraison physique</p>
                            
                            <div className="grid grid-cols-4 text-center text-[9px] relative font-mono uppercase tracking-widest">
                              {/* Horizontal line background */}
                              <div className="absolute top-2.5 left-[12.5%] right-[12.5%] h-0.5 bg-neutral-900 -z-10" />
                              {/* Active filled line progress */}
                              <div className="absolute top-2.5 left-[12.5%] h-0.5 bg-brand-green -z-10 transition-all" style={{ width: `${(stepIndex / 3) * 75}%` }} />

                              <div className="flex flex-col items-center">
                                <div className={`h-6 w-6 rounded-full border flex items-center justify-center text-[9px] font-bold ${stepIndex >= 0 ? 'bg-brand-green border-brand-green text-black' : 'bg-[#050505] border-neutral-800 text-neutral-500'}`}>1</div>
                                <span className={`mt-2 font-bold ${stepIndex >= 0 ? 'text-white' : 'text-neutral-600'}`}>Validée</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className={`h-6 w-6 rounded-full border flex items-center justify-center text-[9px] font-bold ${stepIndex >= 1 ? 'bg-brand-green border-brand-green text-black' : 'bg-[#050505] border-neutral-800 text-neutral-500'}`}>2</div>
                                <span className={`mt-2 font-bold ${stepIndex >= 1 ? 'text-white' : 'text-neutral-600'}`}>Cuisine</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className={`h-6 w-6 rounded-full border flex items-center justify-center text-[9px] font-bold ${stepIndex >= 2 ? 'bg-brand-green border-brand-green text-black' : 'bg-[#050505] border-neutral-800 text-neutral-500'}`}>3</div>
                                <span className={`mt-2 font-bold ${stepIndex >= 2 ? 'text-white' : 'text-neutral-600'}`}>Au casier</span>
                              </div>
                              <div className="flex flex-col items-center">
                                <div className={`h-6 w-6 rounded-full border flex items-center justify-center text-[9px] font-bold ${stepIndex >= 3 ? 'bg-brand-green border-brand-green text-black' : 'bg-[#050505] border-neutral-800 text-neutral-500'}`}>4</div>
                                <span className={`mt-2 font-bold ${stepIndex >= 3 ? 'text-white' : 'text-neutral-600'}`}>Retirée</span>
                              </div>
                            </div>
                          </div>

                          {/* Order Items list */}
                          <div className="bg-black rounded-xl p-4 border border-neutral-900">
                            <p className="text-[9px] font-mono text-neutral-500 uppercase tracking-widest mb-2 font-bold">Composition du plateau d'élite</p>
                            <div className="space-y-2 text-xs">
                              {order.items.map(item => (
                                <div key={item.meal.id} className="flex justify-between items-center text-neutral-200">
                                  <span className="font-light">{item.meal.name} <span className="text-neutral-500 font-mono text-[10px]">×{item.quantity}</span></span>
                                  <span className="font-bold text-white font-mono">{item.meal.price.toFixed(2)} €</span>
                                </div>
                              ))}
                            </div>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            )}

            {/* Favorite meals view */}
            {activeTab === 'favorites' && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <h3 className="font-display text-base font-bold text-white">Mes compositions favorites</h3>
                  <p className="text-xs text-neutral-400 font-sans font-light">Commandez vos recettes préférées en un seul clic.</p>
                </div>
                
                {favoriteMeals.length === 0 ? (
                  <div className="text-center py-16 rounded-3xl border border-dashed border-neutral-800 bg-[#0a0a0a] space-y-4">
                    <Heart className="h-7 w-7 text-neutral-700 mx-auto" />
                    <p className="text-xs text-neutral-500 font-sans font-light">Aucun plat n'a été enregistré dans vos favoris.</p>
                    <button
                      id="dash-favs-menu-btn"
                      onClick={() => setCurrentTab('menu')}
                      className="rounded-full bg-white text-black hover:bg-brand-green text-[10px] font-mono tracking-widest uppercase font-bold px-6 py-2.5 cursor-pointer"
                    >
                      Voir la carte
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {favoriteMeals.map((meal) => (
                      <div
                        key={meal.id}
                        className="rounded-2xl border border-neutral-900 bg-[#0a0a0a] overflow-hidden p-4 flex gap-4 items-center justify-between"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={meal.image}
                            alt={meal.name}
                            className="h-12 w-12 rounded-xl object-cover bg-neutral-900 border border-neutral-800 shrink-0"
                            referrerPolicy="no-referrer"
                          />
                          <div className="min-w-0">
                            <h4 className="text-xs font-bold text-white truncate font-display">{meal.name}</h4>
                            <span className="text-[10px] text-brand-green font-mono block mt-0.5">P: {meal.proteins}g • {meal.calories} kcal</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <button
                            id={`dash-fav-add-cart-btn-${meal.id}`}
                            onClick={() => onAddToCart(meal)}
                            className="rounded-full bg-white hover:bg-brand-green text-black text-[9px] font-mono tracking-wider uppercase font-bold px-3 py-2 transition"
                          >
                            Réserver
                          </button>
                          <button
                            id={`dash-fav-remove-btn-${meal.id}`}
                            onClick={() => onRemoveFavorite(meal.id)}
                            className="text-neutral-600 hover:text-red-500 p-1.5 transition cursor-pointer"
                          >
                            <Heart className="h-4 w-4 fill-current text-brand-green" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Edit profile View */}
            {activeTab === 'profile' && (
              <div className="rounded-3xl border border-neutral-900 bg-[#0a0a0a] p-6 lg:p-8 space-y-6">
                <div>
                  <h3 className="font-display text-base font-bold text-white tracking-tight">Paramètres anthropométriques</h3>
                  <p className="text-xs text-neutral-400 font-sans font-light mt-1">Ajustez ces valeurs pour calibrer la précision de vos rapports de macros ORVYN.</p>
                </div>

                <form onSubmit={handleSaveProfile} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider font-mono">Poids corporel (kg)</label>
                      <input
                        id="edit-profile-weight"
                        type="number"
                        value={editWeight}
                        onChange={(e) => setEditWeight(Number(e.target.value))}
                        className="w-full rounded-xl border border-neutral-800 bg-neutral-950 p-3 text-xs text-white focus:outline-none focus:border-brand-green font-mono"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider font-mono">Taille de l'athlète (cm)</label>
                      <input
                        id="edit-profile-height"
                        type="number"
                        value={editHeight}
                        onChange={(e) => setEditHeight(Number(e.target.value))}
                        className="w-full rounded-xl border border-neutral-800 bg-neutral-950 p-3 text-xs text-white focus:outline-none focus:border-brand-green font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider font-mono">Objectif de nutrition</label>
                      <select
                        id="edit-profile-goal"
                        value={editGoal}
                        onChange={(e) => setEditGoal(e.target.value)}
                        className="w-full rounded-xl border border-neutral-800 bg-neutral-950 p-3 text-xs text-white focus:outline-none focus:border-brand-green cursor-pointer"
                      >
                        {GOALS_DATABASE.map(g => (
                          <option key={g.id} value={g.id} className="bg-black">{g.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider font-mono">Espace Lounge Principal</label>
                      <select
                        id="edit-profile-gym"
                        value={editGym}
                        onChange={(e) => setEditGym(e.target.value)}
                        className="w-full rounded-xl border border-neutral-800 bg-neutral-950 p-3 text-xs text-white focus:outline-none focus:border-brand-green cursor-pointer"
                      >
                        {GYMS_DATABASE.map(gym => (
                          <option key={gym.id} value={gym.id} className="bg-black">{gym.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-neutral-900 flex items-center justify-between">
                    {saveSuccess && (
                      <span className="text-xs text-brand-green font-mono font-bold animate-fade-in flex items-center gap-1.5">
                        <CheckCircle2 className="h-4 w-4" />
                        ✓ Profil mis à jour.
                      </span>
                    )}
                    <button
                      id="save-profile-btn"
                      type="submit"
                      className="ml-auto rounded-full bg-white text-black hover:bg-brand-green text-[10px] font-mono tracking-widest uppercase font-bold px-6 py-3 transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <Save className="h-4 w-4 text-black shrink-0 stroke-[2.5px]" />
                      <span>Enregistrer</span>
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Subscriptions view */}
            {activeTab === 'subscriptions' && (
              <div className="space-y-6 animate-fade-in">
                <div className="space-y-1">
                  <h3 className="font-display text-base font-bold text-white">Mes abonnements actifs</h3>
                  <p className="text-xs text-neutral-400 font-sans font-light">Gérez vos formules de nutrition récurrentes de précision.</p>
                </div>

                <div className="rounded-3xl border border-neutral-900 bg-[#0a0a0a] p-6 lg:p-8 space-y-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-neutral-900">
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green/10 text-brand-green border border-brand-green/20">
                        <Zap className="h-6 w-6" />
                      </div>
                      <div>
                        <span className="font-mono text-[8px] bg-brand-green/20 text-brand-green px-2 py-0.5 rounded font-extrabold uppercase tracking-widest">Abonné Pro</span>
                        <h4 className="font-display text-lg font-bold text-white mt-1">Formule ORVYN Pro</h4>
                        <p className="text-[10px] text-neutral-400 mt-0.5">Renouvellement automatique le 29 de chaque mois • 129,00 €</p>
                      </div>
                    </div>
                    <span className="bg-emerald-950 text-brand-green border border-brand-green/20 rounded-full px-3 py-1 text-[9px] font-mono uppercase tracking-wider font-extrabold animate-pulse">✓ Actif</span>
                  </div>

                  {/* Sub content and limits */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-3 bg-[#050505] rounded-2xl p-4 border border-neutral-900/60">
                      <p className="text-[10px] font-bold text-neutral-500 font-mono uppercase tracking-widest">Crédits de repas restants</p>
                      <div className="flex justify-between text-xs font-mono">
                        <span className="font-bold text-white">Crédits consommés</span>
                        <span className="text-brand-green">8 / 15 repas (53%)</span>
                      </div>
                      <div className="h-1.5 w-full bg-neutral-950 rounded-full overflow-hidden">
                        <div className="bg-brand-green h-full rounded-full" style={{ width: '53%' }} />
                      </div>
                      <p className="text-[9px] text-neutral-500 font-sans leading-relaxed">
                        Chaque repas commandé consomme 1 crédit repas sur votre quota mensuel.
                      </p>
                    </div>

                    <div className="space-y-4 bg-[#050505] rounded-2xl p-4 border border-neutral-900/60 text-xs">
                      <p className="text-[10px] font-bold text-neutral-500 font-mono uppercase tracking-widest">Avantages inclus actifs</p>
                      <ul className="space-y-1.5 text-[11px] text-neutral-400 font-light font-sans">
                        <li className="flex items-center gap-2">✓ Accès casiers thermo-régulés d'élite</li>
                        <li className="flex items-center gap-2">✓ Suivi diététique d'athlète par chat</li>
                        <li className="flex items-center gap-2">✓ Rapports de macros pesés au gramme</li>
                      </ul>
                    </div>
                  </div>

                  {/* Actions for subscription */}
                  <div className="pt-6 border-t border-neutral-900 flex flex-wrap gap-4 items-center justify-between">
                    <span className="text-[10px] text-neutral-500 font-mono uppercase">Moyen de paiement : Visa se terminant par 4242</span>
                    <button
                      id="cancel-sub-simulation-btn"
                      onClick={() => alert("Pour suspendre ou modifier votre abonnement, veuillez contacter la conciergerie ORVYN d'élite.")}
                      className="text-[10px] text-neutral-500 hover:text-red-400 font-mono uppercase tracking-wider transition underline cursor-pointer"
                    >
                      Suspendre mon abonnement
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
