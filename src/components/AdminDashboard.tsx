import React, { useState } from 'react';
import { BarChart3, ShoppingBag, Users, Layers, Settings, MapPin, CheckCircle, Package, ArrowRightLeft, ShieldAlert, Plus, Search, HelpCircle, Activity, AlertTriangle, Lightbulb, Wrench, LogIn } from 'lucide-react';
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
    <div className="bg-orvyn-carbon min-h-screen py-12 text-orvyn-bone">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Admin Title Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 border-b border-olive/20 pb-8 mb-10">
          <div>
            <span className="text-[9px] uppercase tracking-widest text-clay font-semibold bg-carbon px-3 py-1.5 border border-olive/30">
              ORVYN Central Console (SaaS Operator)
            </span>
            <h1 className="font-display text-2xl font-semibold text-orvyn-bone sm:text-4xl tracking-tight mt-3">Console d'Administration</h1>
            <p className="text-xs text-orvyn-bone/50 font-sans mt-1">Supervisez l'état de fraîcheur de vos stocks, pilotez les casiers et monitorez les ventes en temps réel.</p>
          </div>

          {/* Tab switcher pill */}
          <div className="flex bg-carbon-raised orvyn-clip-sm p-1.5 border border-olive/20 flex-wrap">
            <button
              id="admin-tab-stats"
              onClick={() => setActiveTab('stats')}
              className={`orvyn-clip-sm px-4 py-2 text-[10px] uppercase tracking-wider font-semibold transition cursor-pointer ${activeTab === 'stats' ? 'bg-sauge text-bone' : 'text-orvyn-bone/50 hover:text-orvyn-bone'}`}
            >
              Rapports
            </button>
            <button
              id="admin-tab-orders"
              onClick={() => setActiveTab('orders')}
              className={`orvyn-clip-sm px-4 py-2 text-[10px] uppercase tracking-wider font-semibold transition cursor-pointer flex items-center gap-2 ${activeTab === 'orders' ? 'bg-sauge text-bone' : 'text-orvyn-bone/50 hover:text-orvyn-bone'}`}
            >
              <span>Commandes</span>
              {activeOrderCount > 0 && (
                <span className="h-2 w-2 rounded-full bg-lime animate-ping" />
              )}
            </button>
            <button
              id="admin-tab-inventory"
              onClick={() => setActiveTab('inventory')}
              className={`orvyn-clip-sm px-4 py-2 text-[10px] uppercase tracking-wider font-semibold transition cursor-pointer ${activeTab === 'inventory' ? 'bg-sauge text-bone' : 'text-orvyn-bone/50 hover:text-orvyn-bone'}`}
            >
              Inventaire
            </button>
            <button
              id="admin-tab-gyms"
              onClick={() => setActiveTab('gyms')}
              className={`orvyn-clip-sm px-4 py-2 text-[10px] uppercase tracking-wider font-semibold transition cursor-pointer ${activeTab === 'gyms' ? 'bg-sauge text-bone' : 'text-orvyn-bone/50 hover:text-orvyn-bone'}`}
            >
              Lounges
            </button>
          </div>
        </div>

        {/* Grid Stats Overview Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {/* Stat 1 */}
          <div className="orvyn-clip-sm depth bg-carbon-raised p-5 space-y-2">
            <div className="flex items-center justify-between text-orvyn-bone/40">
              <span className="text-[9px] uppercase tracking-widest font-semibold">Chiffre d'Affaires</span>
              <BarChart3 className="h-4 w-4 text-clay" />
            </div>
            <p className="text-xl font-semibold text-orvyn-bone">{totalRevenue.toFixed(2)} €</p>
            <p className="text-[9px] text-orvyn-bone/40">+14.2% vs semaine dernière</p>
          </div>

          {/* Stat 2 */}
          <div className="orvyn-clip-sm depth bg-carbon-raised p-5 space-y-2">
            <div className="flex items-center justify-between text-orvyn-bone/40">
              <span className="text-[9px] uppercase tracking-widest font-semibold">Retraits Actifs</span>
              <ShoppingBag className="h-4 w-4 text-clay" />
            </div>
            <p className="text-xl font-semibold text-orvyn-bone">{activeOrderCount}</p>
            <p className="text-[9px] text-orvyn-bone/40">En attente d'ouverture casier</p>
          </div>

          {/* Stat 3 */}
          <div className="orvyn-clip-sm depth bg-carbon-raised p-5 space-y-2">
            <div className="flex items-center justify-between text-orvyn-bone/40">
              <span className="text-[9px] uppercase tracking-widest font-semibold">Taux de Rétention</span>
              <Users className="h-4 w-4 text-clay" />
            </div>
            <p className="text-xl font-semibold text-orvyn-bone">92.4 %</p>
            <p className="text-[9px] text-orvyn-bone/40">Engagement hebdomadaire d'élite</p>
          </div>

          {/* Stat 4 */}
          <div className="orvyn-clip-sm depth bg-carbon-raised p-5 space-y-2">
            <div className="flex items-center justify-between text-orvyn-bone/40">
              <span className="text-[9px] uppercase tracking-widest font-semibold">Lounges Actifs</span>
              <MapPin className="h-4 w-4 text-clay" />
            </div>
            <p className="text-xl font-semibold text-orvyn-bone">
              {gyms.filter(g => g.status === 'active').length} / {gyms.length}
            </p>
            <p className="text-[9px] text-orvyn-bone/40">1 stand sous surveillance</p>
          </div>
        </div>

        {/* TAB CONTENT: STATS */}
        {activeTab === 'stats' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sales chart mock layout */}
            <div className="lg:col-span-8 orvyn-clip depth bg-carbon-raised p-6 space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-olive/20">
                <div>
                  <h3 className="font-display text-base font-semibold text-orvyn-bone tracking-tight">Ventes consolidées par créneau</h3>
                  <p className="text-xs text-orvyn-bone/50 mt-1 font-sans">Plats et shakes réservés par heure</p>
                </div>
                <span className="orvyn-clip-sm bg-lime/10 text-lime border border-lime/20 text-[9px] font-semibold px-3 py-1">LIVE TELEMETRY ACTIVE</span>
              </div>

              {/* Custom SVG/HTML Bar chart */}
              <div className="h-60 flex items-end justify-between pt-6 border-b border-olive/20 text-[9px] text-orvyn-bone/40">
                <div className="flex flex-col items-center w-12 group">
                  <div className="w-5 bg-carbon-raised border border-olive/20 transition-all group-hover:bg-lime" style={{ height: '35px' }} title="12 commandées"></div>
                  <span className="mt-2 text-[8px] tracking-wide">08h - 11h</span>
                </div>
                <div className="flex flex-col items-center w-12 group">
                  <div className="w-5 bg-lime transition-all group-hover:bg-lime-soft" style={{ height: '145px' }} title="42 commandées"></div>
                  <span className="mt-2 text-[8px] tracking-wide text-lime font-semibold">11h - 14h</span>
                </div>
                <div className="flex flex-col items-center w-12 group">
                  <div className="w-5 bg-carbon-raised border border-olive/20 transition-all group-hover:bg-lime" style={{ height: '48px' }} title="18 commandées"></div>
                  <span className="mt-2 text-[8px] tracking-wide">14h - 17h</span>
                </div>
                <div className="flex flex-col items-center w-12 group">
                  <div className="w-5 bg-lime transition-all group-hover:bg-lime-soft" style={{ height: '190px' }} title="68 commandées"></div>
                  <span className="mt-2 text-[8px] tracking-wide text-lime font-semibold">17h - 20h</span>
                </div>
                <div className="flex flex-col items-center w-12 group">
                  <div className="w-5 bg-carbon-raised border border-olive/20 transition-all group-hover:bg-lime" style={{ height: '85px' }} title="32 commandées"></div>
                  <span className="mt-2 text-[8px] tracking-wide">20h - 23h</span>
                </div>
              </div>

              <p className="text-[10px] text-orvyn-bone/50 leading-relaxed font-sans flex items-start gap-1.5">
                <Lightbulb className="h-3.5 w-3.5 text-clay shrink-0 mt-0.5" />
                Les données confirment que le pic de réservations coïncide parfaitement avec les créneaux de fin d'entraînement (12h-14h et 18h-20h).
              </p>
            </div>

            {/* Customers Directory list */}
            <div className="lg:col-span-4 orvyn-clip depth bg-carbon-raised p-6 space-y-4">
              <div>
                <h3 className="font-display text-base font-semibold text-orvyn-bone tracking-tight">Répertoire Clients</h3>
                <p className="text-xs text-orvyn-bone/50 mt-1 font-sans">Derniers abonnés enregistrés</p>
              </div>

              <div className="relative">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-orvyn-bone/35" />
                <input
                  id="customer-search-input"
                  type="text"
                  placeholder="Rechercher un membre..."
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  className="w-full rounded-sm border border-olive/30 bg-carbon py-2.5 pl-9 pr-3 text-xs text-orvyn-bone focus:outline-none focus:border-lime"
                />
              </div>

              <div className="space-y-4 max-h-[220px] overflow-y-auto pt-2">
                {mockCustomers.map((cust, i) => (
                  <div key={i} className="flex justify-between items-center text-xs border-b border-olive/10 pb-3 last:border-0">
                    <div>
                      <p className="font-semibold text-orvyn-bone font-display text-[11px]">{cust.name}</p>
                      <p className="text-[9px] text-orvyn-bone/40 mt-0.5">{cust.email}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-clay">{cust.totalSpent.toFixed(2)} €</p>
                      <span className="text-[8px] text-orvyn-bone/40 block">{cust.ordersCount} repas</span>
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
                <h3 className="font-display text-base font-semibold text-orvyn-bone tracking-tight">Flux de commandes logistiques</h3>
                <p className="text-xs text-orvyn-bone/50 font-sans mt-1">Supervisez l'état thermique et la distribution des plats.</p>
              </div>
              <span className="text-xs text-lime font-semibold flex items-center gap-1.5">
                <Activity className="h-3.5 w-3.5" />
                REALTIME SYNC ACTIVE
              </span>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-20 bg-carbon-raised orvyn-clip-sm depth p-8">
                <ShoppingBag className="h-8 w-8 text-orvyn-bone/35 mx-auto" />
                <p className="text-sm text-orvyn-bone/50 mt-3 font-sans">Aucune réservation active pour le moment.</p>
                <p className="text-xs text-orvyn-bone/40 mt-1 font-sans">Les réservations des athlètes s'afficheront instantanément ici.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((order) => (
                  <div
                    id={`admin-order-card-${order.id}`}
                    key={order.id}
                    className="orvyn-clip-sm depth bg-carbon-raised p-5 space-y-4 flex flex-col justify-between"
                  >
                    <div className="space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="orvyn-clip-sm bg-clay/10 border border-clay/20 text-clay text-[9px] font-semibold px-2.5 py-1 uppercase tracking-wider">
                            ID: {order.id}
                          </span>
                          <h4 className="text-xs font-semibold text-orvyn-bone mt-2 font-display">{order.gymName}</h4>
                        </div>
                        <span className={`text-[8px] font-semibold uppercase tracking-widest px-2.5 py-1 orvyn-clip-sm ${
                          order.status === 'preparing' ? 'bg-clay/10 text-clay border border-clay/20' :
                          order.status === 'ready' ? 'bg-lime/10 text-lime border border-lime/20' :
                          'bg-carbon text-orvyn-bone/50 border border-olive/30'
                        }`}>
                          {order.status === 'preparing' ? 'Cuisine' :
                           order.status === 'ready' ? 'Au Casier' : 'Retiré'}
                        </span>
                      </div>

                      <div className="bg-carbon orvyn-clip-sm p-3.5 border border-olive/20 text-xs text-orvyn-bone/70">
                        <p className="font-semibold text-[8px] uppercase tracking-wider text-orvyn-bone/40 mb-2">Composition assiette</p>
                        {order.items.map(i => (
                          <div key={i.meal.id} className="flex justify-between mt-1 first:mt-0 font-sans">
                            <span>{i.meal.name}</span>
                            <span className="font-semibold text-orvyn-bone">×{i.quantity}</span>
                          </div>
                        ))}
                        <div className="border-t border-olive/20 mt-2.5 pt-2 flex justify-between font-semibold text-orvyn-bone">
                          <span>Total Payé</span>
                          <span className="text-clay">{order.total.toFixed(2)} €</span>
                        </div>
                      </div>

                      <div className="flex justify-between text-[10px] text-orvyn-bone/40">
                        <span>Heure de retrait estimée:</span>
                        <span className="text-clay font-semibold">{order.pickupTime}</span>
                      </div>
                    </div>

                    {/* Status controls */}
                    <div className="pt-3 border-t border-olive/20 flex gap-2">
                      {order.status === 'preparing' && (
                        <button
                          id={`admin-mark-ready-btn-${order.id}`}
                          onClick={() => onUpdateOrderStatus(order.id, 'ready')}
                          className="w-full orvyn-clip-sm bg-sauge text-bone text-xs py-2.5 font-semibold tracking-wider uppercase transition cursor-pointer"
                        >
                          <CheckCircle className="h-3.5 w-3.5 inline-block mr-1" />
                          Déposer au stand ({order.pickupCode})
                        </button>
                      )}
                      {order.status === 'ready' && (
                        <button
                          id={`admin-mark-collected-btn-${order.id}`}
                          onClick={() => onUpdateOrderStatus(order.id, 'collected')}
                          className="w-full orvyn-clip-sm bg-bone text-carbon text-xs py-2.5 font-semibold tracking-wider uppercase transition cursor-pointer"
                        >
                          <LogIn className="h-3.5 w-3.5 inline-block mr-1" />
                          Finaliser le retrait athlète
                        </button>
                      )}
                      {order.status === 'collected' && (
                        <span className="text-[10px] text-orvyn-bone/50 italic text-center w-full block py-1 tracking-wider"><CheckCircle className="h-3 w-3 inline-block mr-1 text-clay" /> Retrait finalisé. Casier libéré.</span>
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
          <div className="orvyn-clip depth bg-carbon-raised p-6 lg:p-8 space-y-6">
            <div className="space-y-1 pb-4 border-b border-olive/20">
              <h3 className="font-display text-base font-semibold text-orvyn-bone">Rapport d'inventaire des Concept Spaces</h3>
              <p className="text-xs text-orvyn-bone/50 font-sans">Ajustez les stocks physiques réels disponibles dans les casiers réfrigérés.</p>
            </div>

            <div className="space-y-4">
              {MEALS_DATABASE.map((meal) => {
                const stock = stocks[meal.id] ?? 0;
                return (
                  <div
                    id={`admin-inventory-row-${meal.id}`}
                    key={meal.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-olive/10 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={meal.image}
                        alt={meal.name}
                        className="h-10 w-10 rounded-sm object-cover photo-orvyn border border-olive/20"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h4 className="text-xs font-semibold text-orvyn-bone font-display">{meal.name}</h4>
                        <p className="text-[10px] text-orvyn-bone/40 mt-0.5">P: {meal.proteins}g Prot • {meal.price.toFixed(2)}€</p>
                      </div>
                    </div>

                    {/* Stock adjustment counter */}
                    <div className="flex items-center gap-4">
                      <span className={`orvyn-clip-sm text-[8px] font-semibold px-2.5 py-1 tracking-wider uppercase ${
                        stock <= 4 ? 'bg-clay/10 text-clay border border-clay/20 animate-pulse' : 'bg-lime/10 text-lime border border-lime/20'
                      }`}>
                        {stock <= 4 ? (
                          <span className="inline-flex items-center gap-1"><AlertTriangle className="h-2.5 w-2.5" /> Rupture de stock</span>
                        ) : (
                          <span className="inline-flex items-center gap-1"><CheckCircle className="h-2.5 w-2.5" /> Stock optimal</span>
                        )}
                      </span>

                      <div className="flex items-center gap-2 border border-olive/30 bg-carbon orvyn-clip-sm px-2 py-1">
                        <button
                          id={`admin-stock-minus-btn-${meal.id}`}
                          onClick={() => handleAdjustStock(meal.id, -1)}
                          className="text-orvyn-bone/50 hover:text-orvyn-bone transition px-2 font-semibold text-xs cursor-pointer"
                        >
                          -
                        </button>
                        <span className="text-xs font-semibold w-10 text-center text-orvyn-bone">{stock} pcs</span>
                        <button
                          id={`admin-stock-plus-btn-${meal.id}`}
                          onClick={() => handleAdjustStock(meal.id, 1)}
                          className="text-orvyn-bone/50 hover:text-orvyn-bone transition px-2 font-semibold text-xs cursor-pointer"
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
          <div className="orvyn-clip depth bg-carbon-raised p-6 lg:p-8 space-y-6">
            <div className="space-y-1 pb-4 border-b border-olive/20">
              <h3 className="font-display text-base font-semibold text-orvyn-bone">Moniteur des Stands Connectés</h3>
              <p className="text-xs text-orvyn-bone/50 font-sans">Supervisez l'état d'ouverture des portes et déclenchez des procédures de maintenance.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {gyms.map((gym) => (
                <div
                  id={`admin-gym-card-${gym.id}`}
                  key={gym.id}
                  className="orvyn-clip-sm depth bg-carbon p-5 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-semibold text-orvyn-bone flex items-center gap-2 font-display">
                        <MapPin className="h-4 w-4 text-clay" />
                        {gym.name}
                      </h4>

                      <span className={`text-[8px] font-semibold px-2 py-0.5 tracking-wider uppercase orvyn-clip-sm ${
                        gym.status === 'active' ? 'bg-lime/10 text-lime border border-lime/20' : 'bg-clay/10 text-clay border border-clay/20'
                      }`}>
                        {gym.status === 'active' ? 'EN LIGNE' : 'MAINTENANCE'}
                      </span>
                    </div>

                    <p className="text-[10px] text-orvyn-bone/50 font-sans">{gym.address}, {gym.city}</p>
                    <p className="text-[9px] text-orvyn-bone/40">Code Node ID : {gym.lockerStandCode} • Heures de retrait : {gym.pickupHours}</p>
                  </div>

                  {/* Status toggler */}
                  <button
                    id={`admin-gym-toggle-btn-${gym.id}`}
                    onClick={() => onToggleGymStatus(gym.id)}
                    className={`w-full orvyn-clip-sm text-[9px] tracking-widest uppercase py-3 font-semibold transition text-center cursor-pointer ${
                      gym.status === 'active'
                        ? 'border border-olive/40 text-orvyn-bone/60 hover:text-clay hover:border-clay/30'
                        : 'bg-sauge text-bone hover:bg-lime-soft'
                    }`}
                  >
                    {gym.status === 'active' ? (
                      <span className="inline-flex items-center gap-1.5"><Wrench className="h-3 w-3" /> Mettre hors-service</span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5"><CheckCircle className="h-3 w-3" /> Activer le stand</span>
                    )}
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
