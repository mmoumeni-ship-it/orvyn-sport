import React, { useState } from 'react';
import { BarChart3, ShoppingBag, Users, Layers, Settings, MapPin, CheckCircle, Package, ArrowRightLeft, ShieldAlert, Plus, Search, HelpCircle, Activity } from 'lucide-react';
import { Order, UserProfile, Gym, Meal } from '../types';
import { GYMS_DATABASE } from '../data/gyms';
import { MEALS_DATABASE } from '../data/meals';

interface AdminDashboardProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: 'pending' | 'preparing' | 'ready' | 'collected') => void;
  gyms: Gym[];
  onToggleGymStatus: (gymId: string) => void;
}

export default function AdminDashboard({
  orders,
  onUpdateOrderStatus,
  gyms,
  onToggleGymStatus
}: AdminDashboardProps) {
  
  const [activeTab, setActiveTab] = useState<'stats' | 'orders' | 'inventory' | 'gyms'>('stats');
  const [customerSearch, setCustomerSearch] = useState('');
  
  // Simulated stock state for administration demo
  const [stocks, setStocks] = useState<Record<string, number>>({
    '1': 14,
    '2': 8,
    '3': 22,
    '4': 18,
    '5': 4,
    '6': 19
  });

  const handleAdjustStock = (mealId: string, amount: number) => {
    setStocks(prev => ({
      ...prev,
      [mealId]: Math.max(0, prev[mealId] + amount)
    }));
  };

  // Mock statistics computation
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0) + 1432.80; // Seed with base revenue + current session
  const activeOrderCount = orders.filter(o => o.status !== 'collected').length;
  const collectedOrderCount = orders.filter(o => o.status === 'collected').length + 86;

  // Mock Customers Data
  const mockCustomers = [
    { name: 'Alexandre Dubois', email: 'alex.dubois@orvyn.com', goal: 'Prise de masse', ordersCount: 14, totalSpent: 194.60 },
    { name: 'Nassim Sahili', email: 'nassim.s@fitness.fr', goal: 'Performance', ordersCount: 8, totalSpent: 112.50 },
    { name: 'Marine Lorphelin', email: 'marine.l@doctor.org', goal: 'Sèche', ordersCount: 22, totalSpent: 341.00 },
    { name: 'Jean Onche', email: 'jean.muscles@gmail.com', goal: 'Prise de masse', ordersCount: 31, totalSpent: 421.20 }
  ].filter(c => c.name.toLowerCase().includes(customerSearch.toLowerCase()));

  return (
    <div className="bg-black min-h-screen py-12 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Admin Title Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-neutral-900 pb-8 mb-10">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-widest text-brand-green font-bold bg-[#111111] px-3 py-1.5 rounded-full border border-neutral-800">
              ORVYN Central Console (SaaS Operator)
            </span>
            <h1 className="font-display text-2xl font-extrabold text-white sm:text-4xl tracking-tight mt-3">Console d'Administration</h1>
            <p className="text-xs text-neutral-400 font-sans font-light mt-1">Supervisez l'état de fraîcheur de vos stocks, pilotez les casiers et monitorez les ventes en temps réel.</p>
          </div>

          {/* Tab switcher pill */}
          <div className="flex rounded-xl bg-[#0a0a0a] p-1.5 border border-neutral-900">
            <button
              id="admin-tab-stats"
              onClick={() => setActiveTab('stats')}
              className={`rounded-lg px-4 py-2 text-[10px] font-mono uppercase tracking-wider font-bold transition cursor-pointer ${activeTab === 'stats' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'}`}
            >
              Rapports
            </button>
            <button
              id="admin-tab-orders"
              onClick={() => setActiveTab('orders')}
              className={`rounded-lg px-4 py-2 text-[10px] font-mono uppercase tracking-wider font-bold transition cursor-pointer flex items-center gap-2 ${activeTab === 'orders' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'}`}
            >
              <span>Commandes</span>
              {activeOrderCount > 0 && (
                <span className="h-2 w-2 rounded-full bg-brand-green animate-ping" />
              )}
            </button>
            <button
              id="admin-tab-inventory"
              onClick={() => setActiveTab('inventory')}
              className={`rounded-lg px-4 py-2 text-[10px] font-mono uppercase tracking-wider font-bold transition cursor-pointer ${activeTab === 'inventory' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'}`}
            >
              Inventaire
            </button>
            <button
              id="admin-tab-gyms"
              onClick={() => setActiveTab('gyms')}
              className={`rounded-lg px-4 py-2 text-[10px] font-mono uppercase tracking-wider font-bold transition cursor-pointer ${activeTab === 'gyms' ? 'bg-white text-black' : 'text-neutral-400 hover:text-white'}`}
            >
              Lounges
            </button>
          </div>
        </div>

        {/* Grid Stats Overview Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Stat 1 */}
          <div className="rounded-2xl border border-neutral-900 bg-[#0a0a0a] p-5 space-y-2">
            <div className="flex items-center justify-between text-neutral-500">
              <span className="text-[9px] uppercase font-mono tracking-widest font-bold">Chiffre d'Affaires</span>
              <BarChart3 className="h-4.5 w-4.5 text-brand-green" />
            </div>
            <p className="font-mono text-xl font-bold text-white">{totalRevenue.toFixed(2)} €</p>
            <p className="text-[9px] text-neutral-500 font-mono">+14.2% vs semaine dernière</p>
          </div>

          {/* Stat 2 */}
          <div className="rounded-2xl border border-neutral-900 bg-[#0a0a0a] p-5 space-y-2">
            <div className="flex items-center justify-between text-neutral-500">
              <span className="text-[9px] uppercase font-mono tracking-widest font-bold">Retraits Actifs</span>
              <ShoppingBag className="h-4.5 w-4.5 text-brand-green" />
            </div>
            <p className="font-mono text-xl font-bold text-white">{activeOrderCount}</p>
            <p className="text-[9px] text-neutral-500 font-mono">En attente d'ouverture casier</p>
          </div>

          {/* Stat 3 */}
          <div className="rounded-2xl border border-neutral-900 bg-[#0a0a0a] p-5 space-y-2">
            <div className="flex items-center justify-between text-neutral-500">
              <span className="text-[9px] uppercase font-mono tracking-widest font-bold">Taux de Rétention</span>
              <Users className="h-4.5 w-4.5 text-brand-green" />
            </div>
            <p className="font-mono text-xl font-bold text-white">92.4 %</p>
            <p className="text-[9px] text-neutral-500 font-mono">Engagement hebdomadaire d'élite</p>
          </div>

          {/* Stat 4 */}
          <div className="rounded-2xl border border-neutral-900 bg-[#0a0a0a] p-5 space-y-2">
            <div className="flex items-center justify-between text-neutral-500">
              <span className="text-[9px] uppercase font-mono tracking-widest font-bold">Lounges Actifs</span>
              <MapPin className="h-4.5 w-4.5 text-brand-green" />
            </div>
            <p className="font-mono text-xl font-bold text-white">
              {gyms.filter(g => g.status === 'active').length} / {gyms.length}
            </p>
            <p className="text-[9px] text-neutral-500 font-mono">1 stand sous surveillance</p>
          </div>
        </div>

        {/* TAB CONTENT: STATS */}
        {activeTab === 'stats' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sales chart mock layout */}
            <div className="lg:col-span-8 rounded-3xl border border-neutral-900 bg-[#0a0a0a] p-6 space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-neutral-900">
                <div>
                  <h3 className="font-display text-base font-bold text-white tracking-tight">Ventes consolidées par créneau</h3>
                  <p className="text-xs text-neutral-400 mt-1 font-sans font-light">Plats et shakes réservés par heure</p>
                </div>
                <span className="rounded-full bg-brand-green/10 text-brand-green border border-brand-green/20 font-mono text-[9px] font-bold px-3 py-1">LIVE TELEMETRY ACTIVE</span>
              </div>

              {/* Custom SVG/HTML Bar chart */}
              <div className="h-60 flex items-end justify-between pt-6 border-b border-neutral-900 font-mono text-[9px] text-neutral-500">
                <div className="flex flex-col items-center w-12 group">
                  <div className="w-5 bg-neutral-800 rounded-t transition-all group-hover:bg-brand-green" style={{ height: '35px' }} title="12 commandées"></div>
                  <span className="mt-2 text-[8px] tracking-wide">08h - 11h</span>
                </div>
                <div className="flex flex-col items-center w-12 group">
                  <div className="w-5 bg-brand-green rounded-t transition-all group-hover:bg-white" style={{ height: '145px' }} title="42 commandées"></div>
                  <span className="mt-2 text-[8px] tracking-wide text-brand-green font-bold">11h - 14h</span>
                </div>
                <div className="flex flex-col items-center w-12 group">
                  <div className="w-5 bg-neutral-800 rounded-t transition-all group-hover:bg-brand-green" style={{ height: '48px' }} title="18 commandées"></div>
                  <span className="mt-2 text-[8px] tracking-wide">14h - 17h</span>
                </div>
                <div className="flex flex-col items-center w-12 group">
                  <div className="w-5 bg-brand-green rounded-t transition-all group-hover:bg-white" style={{ height: '190px' }} title="68 commandées"></div>
                  <span className="mt-2 text-[8px] tracking-wide text-brand-green font-bold">17h - 20h</span>
                </div>
                <div className="flex flex-col items-center w-12 group">
                  <div className="w-5 bg-neutral-800 rounded-t transition-all group-hover:bg-brand-green" style={{ height: '85px' }} title="32 commandées"></div>
                  <span className="mt-2 text-[8px] tracking-wide">20h - 23h</span>
                </div>
              </div>
              
              <p className="text-[10px] text-neutral-400 leading-relaxed font-sans font-light">
                💡 Les données confirment que le pic de réservations coïncide parfaitement avec les créneaux de fin d'entraînement (12h-14h et 18h-20h).
              </p>
            </div>

            {/* Customers Directory list */}
            <div className="lg:col-span-4 rounded-3xl border border-neutral-900 bg-[#0a0a0a] p-6 space-y-4">
              <div>
                <h3 className="font-display text-base font-bold text-white tracking-tight">Répertoire Clients</h3>
                <p className="text-xs text-neutral-400 mt-1 font-sans font-light font-sans">Derniers abonnés enregistrés</p>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-500" />
                <input
                  id="customer-search-input"
                  type="text"
                  placeholder="Rechercher un membre..."
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  className="w-full rounded-xl border border-neutral-800 bg-neutral-950 py-2.5 pl-9 pr-3 text-xs text-white focus:outline-none focus:border-brand-green"
                />
              </div>

              <div className="space-y-4 max-h-[220px] overflow-y-auto pt-2">
                {mockCustomers.map((cust, i) => (
                  <div key={i} className="flex justify-between items-center text-xs border-b border-neutral-950 pb-3 last:border-0">
                    <div>
                      <p className="font-bold text-white font-display text-[11px]">{cust.name}</p>
                      <p className="text-[9px] text-neutral-400 font-mono mt-0.5">{cust.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-brand-green font-mono">{cust.totalSpent.toFixed(2)} €</p>
                      <span className="text-[8px] font-mono text-neutral-500 block">{cust.ordersCount} repas</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTENT: ACTIVE ORDER BOARD DISPATCHER */}
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-display text-base font-bold text-white tracking-tight">Flux de commandes logistiques</h3>
                <p className="text-xs text-neutral-400 font-sans font-light mt-1">Supervisez l'état thermique et la distribution des plats.</p>
              </div>
              <span className="text-xs text-brand-green font-mono font-bold flex items-center gap-1">
                🟢 REALTIME SYNC ACTIVE
              </span>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-20 bg-[#0a0a0a] rounded-3xl border border-neutral-900 p-8">
                <ShoppingBag className="h-8 w-8 text-neutral-700 mx-auto" />
                <p className="text-sm text-neutral-400 mt-3 font-sans font-light">Aucune réservation active pour le moment.</p>
                <p className="text-xs text-neutral-500 mt-1 font-sans font-light">Les réservations des athlètes s'afficheront instantanément ici.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((order) => (
                  <div
                    id={`admin-order-card-${order.id}`}
                    key={order.id}
                    className="rounded-2xl border border-neutral-900 bg-[#0a0a0a] p-5 space-y-4 shadow-2xl flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="rounded-lg bg-brand-green/10 border border-brand-green/20 text-brand-green text-[9px] font-mono font-bold px-2.5 py-1 uppercase tracking-wider">
                            ID: {order.id}
                          </span>
                          <h4 className="text-xs font-bold text-white mt-2 font-display">{order.gymName}</h4>
                        </div>
                        <span className={`text-[8px] font-mono font-bold uppercase tracking-widest px-2.5 py-1 rounded ${
                          order.status === 'preparing' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                          order.status === 'ready' ? 'bg-brand-green/10 text-brand-green border border-brand-green/20' :
                          'bg-neutral-900 text-neutral-500 border border-neutral-800'
                        }`}>
                          {order.status === 'preparing' ? 'Cuisine' :
                           order.status === 'ready' ? 'Au Casier' : 'Retiré'}
                        </span>
                      </div>

                      <div className="bg-black rounded-xl p-3.5 border border-neutral-900 text-xs text-neutral-300">
                        <p className="font-bold text-[8px] font-mono uppercase tracking-wider text-neutral-500 mb-2">Composition assiette</p>
                        {order.items.map(i => (
                          <div key={i.meal.id} className="flex justify-between mt-1 first:mt-0 font-sans font-light">
                            <span>{i.meal.name}</span>
                            <span className="font-bold text-white font-mono">×{i.quantity}</span>
                          </div>
                        ))}
                        <div className="border-t border-neutral-900 mt-2.5 pt-2 flex justify-between font-bold text-white font-mono">
                          <span>Total Payé</span>
                          <span className="text-brand-green">{order.total.toFixed(2)} €</span>
                        </div>
                      </div>

                      <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                        <span>Heure de retrait estimée:</span>
                        <span className="text-brand-green font-bold">{order.pickupTime}</span>
                      </div>
                    </div>

                    {/* Status controls */}
                    <div className="pt-3 border-t border-neutral-900 flex gap-2">
                      {order.status === 'preparing' && (
                        <button
                          id={`admin-mark-ready-btn-${order.id}`}
                          onClick={() => onUpdateOrderStatus(order.id, 'ready')}
                          className="w-full rounded-xl bg-brand-green text-black text-xs py-2.5 font-bold font-mono tracking-wider uppercase transition cursor-pointer"
                        >
                          ✓ Déposer au stand ({order.pickupCode})
                        </button>
                      )}
                      {order.status === 'ready' && (
                        <button
                          id={`admin-mark-collected-btn-${order.id}`}
                          onClick={() => onUpdateOrderStatus(order.id, 'collected')}
                          className="w-full rounded-xl bg-white text-black text-xs py-2.5 font-bold font-mono tracking-wider uppercase transition cursor-pointer"
                        >
                          ⚙ Finaliser le retrait athlète
                        </button>
                      )}
                      {order.status === 'collected' && (
                        <span className="text-[10px] text-neutral-500 italic text-center w-full block py-1 font-mono tracking-wider">✓ Retrait finalisé. Casier libéré.</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB CONTENT: STOCKS AND PRODUCTS */}
        {activeTab === 'inventory' && (
          <div className="rounded-3xl border border-neutral-900 bg-[#0a0a0a] p-6 lg:p-8 space-y-6">
            <div className="space-y-1 pb-4 border-b border-neutral-900">
              <h3 className="font-display text-base font-bold text-white">Rapport d'inventaire des Concept Spaces</h3>
              <p className="text-xs text-neutral-400 font-sans font-light">Ajustez les stocks physiques réels disponibles dans les casiers réfrigérés.</p>
            </div>

            <div className="space-y-4">
              {MEALS_DATABASE.map((meal) => {
                const stock = stocks[meal.id] ?? 0;
                return (
                  <div
                    id={`admin-inventory-row-${meal.id}`}
                    key={meal.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-950 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={meal.image}
                        alt={meal.name}
                        className="h-10 w-10 rounded-xl object-cover border border-neutral-900"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-white font-display">{meal.name}</h4>
                        <p className="text-[10px] text-neutral-500 font-mono mt-0.5">P: {meal.proteins}g Prot • {meal.price.toFixed(2)}€</p>
                      </div>
                    </div>

                    {/* Stock adjustment counter */}
                    <div className="flex items-center gap-4">
                      <span className={`rounded font-mono text-[8px] font-bold px-2.5 py-1 tracking-wider uppercase ${
                        stock <= 4 ? 'bg-red-500/10 text-red-500 border border-red-500/20 animate-pulse' : 'bg-brand-green/10 text-brand-green border border-brand-green/20'
                      }`}>
                        {stock <= 4 ? '🚨 RUPTURE DE STOCK' : '🟢 STOCK OPTIMAL'}
                      </span>

                      <div className="flex items-center gap-2 border border-neutral-800 bg-neutral-950 rounded-lg px-2 py-1">
                        <button
                          id={`admin-stock-minus-btn-${meal.id}`}
                          onClick={() => handleAdjustStock(meal.id, -1)}
                          className="text-neutral-500 hover:text-white transition px-2 font-mono font-bold text-xs"
                        >
                          -
                        </button>
                        <span className="font-mono text-xs font-bold w-10 text-center text-white">{stock} pcs</span>
                        <button
                          id={`admin-stock-plus-btn-${meal.id}`}
                          onClick={() => handleAdjustStock(meal.id, 1)}
                          className="text-neutral-500 hover:text-white transition px-2 font-mono font-bold text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB CONTENT: PARTNER GYM STANDS MANAGEMENT */}
        {activeTab === 'gyms' && (
          <div className="rounded-3xl border border-neutral-900 bg-[#0a0a0a] p-6 lg:p-8 space-y-6">
            <div className="space-y-1 pb-4 border-b border-neutral-900">
              <h3 className="font-display text-base font-bold text-white">Moniteur des Stands Connectés</h3>
              <p className="text-xs text-neutral-400 font-sans font-light">Supervisez l'état d'ouverture des portes et déclenchez des procédures de maintenance.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {gyms.map((gym) => (
                <div
                  id={`admin-gym-card-${gym.id}`}
                  key={gym.id}
                  className="rounded-2xl border border-neutral-900 bg-black p-5 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-bold text-white flex items-center gap-2 font-display">
                        <MapPin className="h-4 w-4 text-brand-green" />
                        {gym.name}
                      </h4>
                      
                      <span className={`text-[8px] font-mono font-bold px-2 py-0.5 tracking-wider uppercase rounded ${
                        gym.status === 'active' ? 'bg-brand-green/10 text-brand-green border border-brand-green/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
                      }`}>
                        {gym.status === 'active' ? 'EN LIGNE' : 'MAINTENANCE'}
                      </span>
                    </div>

                    <p className="text-[10px] text-neutral-400 font-sans font-light">{gym.address}, {gym.city}</p>
                    <p className="text-[9px] text-neutral-500 font-mono">Code Node ID : {gym.lockerStandCode} • Heures de retrait : {gym.pickupHours}</p>
                  </div>

                  {/* Status toggler */}
                  <button
                    id={`admin-gym-toggle-btn-${gym.id}`}
                    onClick={() => onToggleGymStatus(gym.id)}
                    className={`w-full rounded-xl text-[9px] font-mono tracking-widest uppercase py-3 font-bold transition text-center cursor-pointer ${
                      gym.status === 'active'
                        ? 'bg-neutral-950 border border-neutral-850 text-neutral-300 hover:text-red-500 hover:border-red-500/30'
                        : 'bg-white text-black hover:bg-brand-green'
                    }`}
                  >
                    {gym.status === 'active' ? '⚠️ Mettre hors-service' : '✓ Activer le stand'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
