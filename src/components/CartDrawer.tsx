import React, { useState } from 'react';
import { X, Minus, Plus, Trash2, Ticket, MapPin, Clock, CreditCard, Lock, CheckCircle } from 'lucide-react';
import { Meal, CartItem, Gym, Order, PromoCode } from '../types';
import { GYMS_DATABASE } from '../data/gyms';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (mealId: string, q: number) => void;
  onRemoveItem: (mealId: string) => void;
  onClearCart: () => void;
  onNewOrder: (order: Order) => void;
}

const VALID_PROMO_CODES: PromoCode[] = [
  { code: 'ORVYN20', discountType: 'percentage', value: 20, description: '20% de réduction d\'élite sur le panier' },
  { code: 'PROTEIN10', discountType: 'fixed', value: 5, description: '5€ offerts pour vos apports de force' }
];

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onNewOrder
}: CartDrawerProps) {
  
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  
  // Checkout Details State
  const [selectedGym, setSelectedGym] = useState<Gym>(GYMS_DATABASE[0]);
  const [pickupTime, setPickupTime] = useState('18:30');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [promoError, setPromoError] = useState('');
  const [promoSuccessMsg, setPromoSuccessMsg] = useState('');

  // Payment Form State
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [isPaying, setIsPaying] = useState(false);

  // Success State
  const [recentOrder, setRecentOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const subtotal = cart.reduce((acc, item) => acc + (item.meal.price * item.quantity), 0);
  
  let discount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountType === 'percentage') {
      discount = subtotal * (appliedPromo.value / 100);
    } else {
      discount = Math.min(appliedPromo.value, subtotal);
    }
  }

  const total = Math.max(0, subtotal - discount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    setPromoSuccessMsg('');
    
    const found = VALID_PROMO_CODES.find(p => p.code.toUpperCase() === promoCode.trim().toUpperCase());
    if (found) {
      setAppliedPromo(found);
      setPromoSuccessMsg(`Code ${found.code} appliqué ! ${found.description}`);
    } else {
      setPromoError('Code promo inconnu (Astuce : ORVYN20 ou PROTEIN10)');
      setAppliedPromo(null);
    }
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsPaying(true);
    
    // Simulate API authorization response delay
    setTimeout(() => {
      const generatedCode = `ORV-${Math.floor(100 + Math.random() * 900)}`;
      const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;

      const newOrder: Order = {
        id: orderId,
        date: new Date().toLocaleDateString('fr-FR'),
        gymId: selectedGym.id,
        gymName: selectedGym.name,
        items: [...cart],
        subtotal,
        discount,
        total,
        status: 'preparing', // starts as preparing
        pickupTime,
        pickupCode: generatedCode,
        userGoal: cart[0].meal.goals[0] || 'Performance'
      };

      onNewOrder(newOrder);
      setRecentOrder(newOrder);
      setIsPaying(false);
      setCheckoutStep('success');
      onClearCart();
    }, 1500);
  };

  const handleResetDrawer = () => {
    setCheckoutStep('cart');
    setAppliedPromo(null);
    setPromoCode('');
    setPromoError('');
    setPromoSuccessMsg('');
    setCardName('');
    setCardNumber('');
    setCardExpiry('');
    setCardCvv('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#050505]/80 backdrop-blur-md transition-opacity" onClick={handleResetDrawer} />

      <div className="absolute inset-y-0 right-0 max-w-full pl-10 flex">
        <div className="w-screen max-w-md bg-[#050505] text-white shadow-2xl flex flex-col h-full border-l border-neutral-900">
          
          {/* Header */}
          <div className="p-6 border-b border-neutral-900 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold flex items-center gap-2">
              <span>{checkoutStep === 'success' ? 'Confirmation' : 'Mon Panier'}</span>
              <span className="text-neutral-500 text-xs font-mono font-light">
                ({cart.reduce((sum, i) => sum + i.quantity, 0)} plats)
              </span>
            </h2>
            <button
              id="close-cart-drawer-btn"
              onClick={handleResetDrawer}
              className="p-1.5 rounded-full text-neutral-400 hover:text-brand-green hover:bg-[#121212] transition cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Checkout Steps - visual progress indicator */}
          {checkoutStep !== 'success' && (
            <div className="grid grid-cols-2 text-center text-[10px] font-mono border-b border-neutral-900 bg-[#0a0a0a] py-3.5">
              <span className={`font-bold tracking-widest uppercase ${checkoutStep === 'cart' ? 'text-brand-green' : 'text-neutral-500'}`}>01. Sélection</span>
              <span className={`font-bold tracking-widest uppercase ${checkoutStep === 'checkout' ? 'text-brand-green' : 'text-neutral-500'}`}>02. Paiement</span>
            </div>
          )}

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Step 1: Normal Cart List */}
            {checkoutStep === 'cart' && (
              <>
                {cart.length === 0 ? (
                  <div className="text-center py-20 space-y-5">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-brand-green/10 text-brand-green border border-brand-green">
                      <Trash2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-white text-sm font-display">Votre panier est vide</h3>
                      <p className="text-xs text-neutral-400 mt-1 font-sans font-light">Sélectionnez des repas de précision pour propulser votre récupération.</p>
                    </div>
                    <button
                      id="cart-drawer-discover-btn"
                      onClick={onClose}
                      className="rounded-full bg-white text-black px-6 py-2.5 text-[10px] font-mono font-bold tracking-widest uppercase hover:bg-brand-green transition cursor-pointer"
                    >
                      Découvrir le menu
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div
                        id={`cart-item-${item.meal.id}`}
                        key={item.meal.id}
                        className="flex gap-4 border-b border-neutral-900 pb-4 last:border-0"
                      >
                        <div className="relative h-16 w-16 shrink-0 rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800">
                          <img
                            src={item.meal.image}
                            alt={item.meal.name}
                            className="h-full w-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          {item.meal.category === 'Abonnements' && (
                            <div className="absolute inset-0 bg-brand-green/10 flex items-center justify-center">
                              <span className="bg-black/80 px-1 py-0.5 rounded text-[7px] font-mono font-bold text-brand-green border border-brand-green/20">MEMBRE</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <h4 className="text-xs font-bold text-white truncate font-display">{item.meal.name}</h4>
                            {item.meal.category === 'Abonnements' ? (
                              <span className="text-[8px] font-mono font-extrabold text-brand-green uppercase tracking-wider block mt-0.5">⭐ Abonnement d'élite actif</span>
                            ) : (
                              <span className="text-[9px] font-mono text-neutral-500 block mt-0.5">P: {item.meal.proteins}g • G: {item.meal.carbs}g • L: {item.meal.lipids}g</span>
                            )}
                          </div>
                          
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs font-mono font-bold text-white">{item.meal.price.toFixed(2)} €</span>
                            
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2 rounded-lg border border-neutral-800 bg-[#0a0a0a] px-2 py-1">
                              <button
                                id={`cart-minus-btn-${item.meal.id}`}
                                onClick={() => onUpdateQuantity(item.meal.id, item.quantity - 1)}
                                className="text-neutral-500 hover:text-white transition cursor-pointer"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="text-xs font-mono font-bold text-white w-4 text-center">{item.quantity}</span>
                              <button
                                id={`cart-plus-btn-${item.meal.id}`}
                                onClick={() => onUpdateQuantity(item.meal.id, item.quantity + 1)}
                                className="text-neutral-500 hover:text-white transition cursor-pointer"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Remove button */}
                        <button
                          id={`cart-remove-btn-${item.meal.id}`}
                          onClick={() => onRemoveItem(item.meal.id)}
                          className="text-neutral-600 hover:text-red-500 transition shrink-0 self-start p-1 cursor-pointer"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {/* Step 2: Checkout details and payment */}
            {checkoutStep === 'checkout' && (
              <form onSubmit={handleConfirmOrder} className="space-y-5">
                
                {/* Gym Stand Location Selector */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-brand-green" />
                    Lounge de retrait d'élite
                  </label>
                  <select
                    id="checkout-gym-select"
                    value={selectedGym.id}
                    onChange={(e) => {
                      const gym = GYMS_DATABASE.find(g => g.id === e.target.value);
                      if (gym) setSelectedGym(gym);
                    }}
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-950 p-3 text-xs text-white focus:outline-none focus:border-brand-green cursor-pointer"
                  >
                    {GYMS_DATABASE.map(gym => (
                      <option key={gym.id} value={gym.id}>
                        {gym.name} ({gym.city})
                      </option>
                    ))}
                  </select>
                  <p className="text-[10px] text-brand-green/80 font-mono font-light">✓ Lounge actif : casiers thermo-régulés disponibles.</p>
                </div>

                {/* Pickup Time slot */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-brand-green" />
                    Créneau horaire de retrait
                  </label>
                  <select
                    id="checkout-time-select"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full rounded-xl border border-neutral-800 bg-neutral-950 p-3 text-xs text-white focus:outline-none focus:border-brand-green cursor-pointer"
                  >
                    <option value="12:00">Midi - 12h00</option>
                    <option value="12:30">Midi - 12h30</option>
                    <option value="13:00">Midi - 13h00</option>
                    <option value="18:00">Soir - 18h00</option>
                    <option value="18:30">Soir - 18h30</option>
                    <option value="19:00">Soir - 19h00 (Recommandé)</option>
                    <option value="19:30">Soir - 19h30</option>
                    <option value="20:00">Soir - 20h00</option>
                    <option value="20:30">Soir - 20h30</option>
                    <option value="21:00">Soir - 21h00</option>
                  </select>
                  <p className="text-[10px] text-neutral-500 font-light">Cuisine de précision préparée à la minute.</p>
                </div>

                {/* Mock Card payment fields */}
                <div className="rounded-2xl border border-neutral-900 p-5 space-y-4 bg-[#0a0a0a]">
                  <p className="text-[10px] font-mono tracking-widest uppercase font-bold text-white flex items-center gap-1.5 border-b border-neutral-900 pb-2.5">
                    <CreditCard className="h-4 w-4 text-brand-green" />
                    Paiement sécurisé Stripe d'élite
                  </p>

                  <div className="space-y-2">
                    <input
                      id="card-number"
                      type="text"
                      placeholder="Numéro de carte : 4000 1234 5678 9010"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full rounded-xl bg-neutral-950 border border-neutral-850 p-3 text-xs text-white focus:outline-none focus:border-brand-green font-mono"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      id="card-expiry"
                      type="text"
                      placeholder="MM/AA"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      className="rounded-xl bg-neutral-950 border border-neutral-850 p-3 text-xs text-white focus:outline-none focus:border-brand-green font-mono"
                      required
                    />
                    <input
                      id="card-cvv"
                      type="text"
                      placeholder="CVV"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="rounded-xl bg-neutral-950 border border-neutral-850 p-3 text-xs text-white focus:outline-none focus:border-brand-green font-mono"
                      required
                    />
                  </div>
                  
                  <div className="flex items-center gap-1 text-[8px] text-neutral-500 font-mono tracking-wider">
                    <Lock className="h-3 w-3 text-brand-green" />
                    <span>Réseau Sandbox Stripe SSL ORVYN Encryption</span>
                  </div>
                </div>

                <button
                  id="checkout-confirm-payment-btn"
                  type="submit"
                  disabled={isPaying}
                  className="w-full rounded-full bg-white text-black py-3.5 text-center text-[10px] font-mono tracking-widest uppercase font-bold hover:bg-brand-green transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {isPaying ? (
                    <span>Validation d'élite...</span>
                  ) : (
                    <>
                      <Lock className="h-3.5 w-3.5 text-black stroke-[3px]" />
                      <span>Confirmer & Payer ({total.toFixed(2)} €)</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Step 3: Success Confirmation screen */}
            {checkoutStep === 'success' && recentOrder && (
              <div className="text-center space-y-6 py-6 animate-fade-in flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green/10 border border-brand-green text-brand-green">
                  <CheckCircle className="h-6 w-6" />
                </div>
                
                <div className="space-y-1.5">
                  <h3 className="font-display text-lg font-bold text-white tracking-tight">Commande validée avec succès !</h3>
                  <p className="text-xs text-neutral-400 font-sans font-light">Disposée frais à la minute exacte dans votre lounge.</p>
                </div>

                {/* Simulated Ticket details */}
                <div className="bg-[#0a0a0a] text-white rounded-2xl p-6 text-left border border-neutral-900 space-y-4 font-mono shadow-2xl relative overflow-hidden w-full">
                  <div className="absolute top-0 right-0 h-16 w-16 bg-brand-green/5 rounded-full blur-xl pointer-events-none"></div>
                  
                  <div className="border-b border-neutral-900 pb-3">
                    <p className="text-[9px] text-neutral-500 uppercase tracking-widest">IDENTIFIANT UNIQUE</p>
                    <p className="text-xs font-bold text-white mt-0.5">{recentOrder.id}</p>
                  </div>

                  <div>
                    <p className="text-[9px] text-neutral-500 uppercase tracking-widest">LOUNGE DE RETRAIT</p>
                    <p className="text-xs font-bold text-white mt-0.5">{recentOrder.gymName}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[9px] text-neutral-500 uppercase tracking-widest">HEURE RETRAIT</p>
                      <p className="text-xs font-bold text-brand-green mt-0.5">{recentOrder.pickupTime}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-neutral-500 uppercase tracking-widest">CODE DU CASIER</p>
                      <p className="text-xs font-bold text-white mt-0.5 bg-neutral-950 border border-neutral-850 px-2 py-0.5 rounded tracking-widest">{recentOrder.pickupCode}</p>
                    </div>
                  </div>

                  <div className="border-t border-neutral-900 pt-4 text-[10px] text-neutral-400 leading-relaxed font-sans font-light">
                    💡 Votre code de déverrouillage de casier est disponible dans votre espace client. Un message d'alerte SMS d'élite vous a également été envoyé.
                  </div>
                </div>

                <button
                  id="success-close-btn"
                  onClick={handleResetDrawer}
                  className="w-full rounded-full bg-white text-black py-3 text-center text-[10px] font-mono tracking-widest uppercase font-bold hover:bg-brand-green transition cursor-pointer"
                >
                  Retourner au menu
                </button>
              </div>
            )}

          </div>

          {/* Drawer Footer (Summary & Promo section for Steps 1 & 2) */}
          {checkoutStep !== 'success' && cart.length > 0 && (
            <div className="p-6 border-t border-neutral-900 bg-[#0a0a0a] space-y-4">
              
              {/* Promo Code box (Only visible on Cart Step 1) */}
              {checkoutStep === 'cart' && (
                <form onSubmit={handleApplyPromo} className="space-y-2">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Ticket className="absolute left-3.5 top-3 h-4 w-4 text-neutral-500" />
                      <input
                        id="cart-promo-input"
                        type="text"
                        placeholder="CODE PROMO (Ex: ORVYN20)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-full rounded-xl bg-[#050505] border border-neutral-900 px-3 py-2.5 pl-10 text-xs font-mono text-white placeholder-neutral-600 focus:outline-none focus:border-brand-green uppercase"
                      />
                    </div>
                    <button
                      id="cart-promo-apply-btn"
                      type="submit"
                      className="rounded-xl bg-white hover:bg-brand-green text-black text-xs px-4 font-mono font-bold tracking-wider transition cursor-pointer"
                    >
                      Appliquer
                    </button>
                  </div>
                  {promoError && <p className="text-[10px] text-red-500 font-mono font-light">{promoError}</p>}
                  {promoSuccessMsg && <p className="text-[10px] text-brand-green font-mono font-semibold">{promoSuccessMsg}</p>}
                </form>
              )}

              {/* Subtotal, Discount & Total Rows */}
              <div className="space-y-1.5 text-xs text-neutral-400 font-sans font-light">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span className="font-mono">{subtotal.toFixed(2)} €</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-brand-green font-semibold">
                    <span>Remise</span>
                    <span className="font-mono">-{discount.toFixed(2)} €</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-bold text-white border-t border-neutral-900 pt-2.5 font-display">
                  <span>Total</span>
                  <span className="font-mono text-brand-green">{total.toFixed(2)} €</span>
                </div>
              </div>

              {/* Step CTA Buttons */}
              {checkoutStep === 'cart' && (
                <button
                  id="cart-proceed-checkout-btn"
                  onClick={() => setCheckoutStep('checkout')}
                  className="w-full rounded-full bg-white text-black py-3.5 text-center text-[10px] font-mono tracking-widest uppercase font-bold hover:bg-brand-green transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Passer au paiement</span>
                </button>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
