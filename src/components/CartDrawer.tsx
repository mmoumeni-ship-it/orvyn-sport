import React, { useState } from 'react';
import { X, Minus, Plus, Trash2, Ticket, MapPin, Clock, CreditCard, Lock, CheckCircle, Lightbulb } from 'lucide-react';
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
      <div className="absolute inset-0 bg-carbon/90 backdrop-blur-md transition-opacity" onClick={handleResetDrawer} />

      <div className="absolute inset-y-0 right-0 max-w-full pl-10 flex">
        <div className="w-screen max-w-md bg-orvyn-carbon text-orvyn-bone flex flex-col h-full border-l border-olive/20">

          {/* Header */}
          <div className="p-6 border-b border-olive/20 flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold flex items-center gap-2">
              <span>{checkoutStep === 'success' ? 'Confirmation' : 'Mon Panier'}</span>
              <span className="text-orvyn-bone/40 text-xs font-sans font-light">
                ({cart.reduce((sum, i) => sum + i.quantity, 0)} plats)
              </span>
            </h2>
            <button
              id="close-cart-drawer-btn"
              onClick={handleResetDrawer}
              className="p-1.5 text-orvyn-bone/50 hover:text-clay hover:bg-carbon-raised transition cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Checkout Steps - visual progress indicator */}
          {checkoutStep !== 'success' && (
            <div className="grid grid-cols-2 text-center text-[10px] border-b border-olive/20 bg-carbon-raised py-3.5">
              <span className={`font-semibold tracking-widest uppercase ${checkoutStep === 'cart' ? 'text-lime' : 'text-orvyn-bone/40'}`}>01. Sélection</span>
              <span className={`font-semibold tracking-widest uppercase ${checkoutStep === 'checkout' ? 'text-lime' : 'text-orvyn-bone/40'}`}>02. Paiement</span>
            </div>
          )}

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">

            {/* Step 1: Normal Cart List */}
            {checkoutStep === 'cart' && (
              <>
                {cart.length === 0 ? (
                  <div className="text-center py-20 space-y-5">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center bg-clay/10 text-clay border border-clay/30">
                      <Trash2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-orvyn-bone text-sm font-display">Votre panier est vide</h3>
                      <p className="text-xs text-orvyn-bone/50 mt-1 font-sans">Sélectionnez des repas de précision pour propulser votre récupération.</p>
                    </div>
                    <button
                      id="cart-drawer-discover-btn"
                      onClick={onClose}
                      className="orvyn-clip-sm bg-sauge text-bone px-6 py-2.5 text-[10px] font-semibold tracking-widest uppercase hover:bg-lime-soft transition cursor-pointer"
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
                        className="flex gap-4 border-b border-olive/20 pb-4 last:border-0"
                      >
                        <div className="relative h-16 w-16 shrink-0 overflow-hidden bg-carbon border border-olive/30">
                          <img
                            src={item.meal.image}
                            alt={item.meal.name}
                            className="h-full w-full object-cover photo-orvyn"
                            referrerPolicy="no-referrer"
                          />
                          {item.meal.category === 'Abonnements' && (
                            <div className="absolute inset-0 bg-lime/10 flex items-center justify-center">
                              <span className="bg-carbon/90 px-1 py-0.5 text-[7px] font-semibold text-lime border border-lime/30">MEMBRE</span>
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <h4 className="text-xs font-semibold text-orvyn-bone truncate font-display">{item.meal.name}</h4>
                            {item.meal.category === 'Abonnements' ? (
                              <span className="text-[8px] font-semibold text-lime uppercase tracking-wider block mt-0.5">Abonnement d'élite actif</span>
                            ) : (
                              <span className="text-[9px] text-orvyn-bone/40 block mt-0.5">P: {item.meal.proteins}g • G: {item.meal.carbs}g • L: {item.meal.lipids}g</span>
                            )}
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs font-semibold text-clay">{item.meal.price.toFixed(2)} €</span>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2 border border-olive/30 bg-carbon px-2 py-1">
                              <button
                                id={`cart-minus-btn-${item.meal.id}`}
                                onClick={() => onUpdateQuantity(item.meal.id, item.quantity - 1)}
                                className="text-orvyn-bone/50 hover:text-orvyn-bone transition cursor-pointer"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="text-xs font-semibold text-orvyn-bone w-4 text-center">{item.quantity}</span>
                              <button
                                id={`cart-plus-btn-${item.meal.id}`}
                                onClick={() => onUpdateQuantity(item.meal.id, item.quantity + 1)}
                                className="text-orvyn-bone/50 hover:text-orvyn-bone transition cursor-pointer"
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
                          className="text-orvyn-bone/40 hover:text-clay transition shrink-0 self-start p-1 cursor-pointer"
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
                  <label className="text-[10px] font-semibold text-orvyn-bone/50 uppercase tracking-wider flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-clay" />
                    Lounge de retrait d'élite
                  </label>
                  <select
                    id="checkout-gym-select"
                    value={selectedGym.id}
                    onChange={(e) => {
                      const gym = GYMS_DATABASE.find(g => g.id === e.target.value);
                      if (gym) setSelectedGym(gym);
                    }}
                    className="w-full rounded-sm border border-olive/30 bg-carbon p-3 text-xs text-orvyn-bone focus:outline-none focus:border-lime cursor-pointer"
                  >
                    {GYMS_DATABASE.map(gym => (
                      <option key={gym.id} value={gym.id}>
                        {gym.name} ({gym.city})
                      </option>
                    ))}
                  </select>
                  <p className="text-[10px] text-olive font-medium">Lounge actif : casiers thermo-régulés disponibles.</p>
                </div>

                {/* Pickup Time slot */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-semibold text-orvyn-bone/50 uppercase tracking-wider flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-clay" />
                    Créneau horaire de retrait
                  </label>
                  <select
                    id="checkout-time-select"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="w-full rounded-sm border border-olive/30 bg-carbon p-3 text-xs text-orvyn-bone focus:outline-none focus:border-lime cursor-pointer"
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
                  <p className="text-[10px] text-orvyn-bone/40 font-light">Cuisine de précision préparée à la minute.</p>
                </div>

                {/* Mock Card payment fields */}
                <div className="orvyn-clip-sm bg-carbon-raised p-5 space-y-4">
                  <p className="text-[10px] tracking-widest uppercase font-semibold text-orvyn-bone flex items-center gap-1.5 border-b border-olive/20 pb-2.5">
                    <CreditCard className="h-4 w-4 text-clay" />
                    Paiement sécurisé Stripe d'élite
                  </p>

                  <div className="space-y-2">
                    <input
                      id="card-number"
                      type="text"
                      placeholder="Numéro de carte : 4000 1234 5678 9010"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full rounded-sm bg-carbon border border-olive/30 p-3 text-xs text-orvyn-bone focus:outline-none focus:border-lime"
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
                      className="rounded-sm bg-carbon border border-olive/30 p-3 text-xs text-orvyn-bone focus:outline-none focus:border-lime"
                      required
                    />
                    <input
                      id="card-cvv"
                      type="text"
                      placeholder="CVV"
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      className="rounded-sm bg-carbon border border-olive/30 p-3 text-xs text-orvyn-bone focus:outline-none focus:border-lime"
                      required
                    />
                  </div>

                  <div className="flex items-center gap-1 text-[8px] text-orvyn-bone/40 tracking-wider">
                    <Lock className="h-3 w-3 text-clay" />
                    <span>Réseau Sandbox Stripe SSL ORVYN Encryption</span>
                  </div>
                </div>

                <button
                  id="checkout-confirm-payment-btn"
                  type="submit"
                  disabled={isPaying}
                  className="w-full orvyn-clip-sm bg-sauge text-bone py-3.5 text-center text-[10px] tracking-widest uppercase font-semibold hover:bg-lime-soft transition flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {isPaying ? (
                    <span>Validation d'élite...</span>
                  ) : (
                    <>
                      <Lock className="h-3.5 w-3.5 stroke-[3px]" />
                      <span>Confirmer & Payer ({total.toFixed(2)} €)</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Step 3: Success Confirmation screen */}
            {checkoutStep === 'success' && recentOrder && (
              <div className="text-center space-y-6 py-6 animate-fade-in flex flex-col items-center">
                <div className="flex h-12 w-12 items-center justify-center bg-lime/10 border border-lime/40 text-lime">
                  <CheckCircle className="h-6 w-6" />
                </div>

                <div className="space-y-1.5">
                  <h3 className="font-display text-lg font-semibold text-orvyn-bone tracking-tight">Commande validée avec succès !</h3>
                  <p className="text-xs text-orvyn-bone/50 font-sans">Disposée frais à la minute exacte dans votre lounge.</p>
                </div>

                {/* Simulated Ticket details */}
                <div className="bg-carbon-raised text-orvyn-bone orvyn-clip-sm p-6 text-left border border-olive/20 space-y-4 relative overflow-hidden w-full">
                  <div className="absolute top-0 right-0 h-16 w-16 bg-clay/5 rounded-full blur-xl pointer-events-none"></div>

                  <div className="border-b border-olive/20 pb-3">
                    <p className="text-[9px] text-orvyn-bone/40 uppercase tracking-widest">IDENTIFIANT UNIQUE</p>
                    <p className="text-xs font-semibold text-orvyn-bone mt-0.5">{recentOrder.id}</p>
                  </div>

                  <div>
                    <p className="text-[9px] text-orvyn-bone/40 uppercase tracking-widest">LOUNGE DE RETRAIT</p>
                    <p className="text-xs font-semibold text-orvyn-bone mt-0.5">{recentOrder.gymName}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[9px] text-orvyn-bone/40 uppercase tracking-widest">HEURE RETRAIT</p>
                      <p className="text-xs font-semibold text-lime mt-0.5">{recentOrder.pickupTime}</p>
                    </div>
                    <div>
                      <p className="text-[9px] text-orvyn-bone/40 uppercase tracking-widest">CODE DU CASIER</p>
                      <p className="text-xs font-semibold text-orvyn-bone mt-0.5 bg-carbon border border-olive/30 px-2 py-0.5 tracking-widest">{recentOrder.pickupCode}</p>
                    </div>
                  </div>

                  <div className="border-t border-olive/20 pt-4 text-[10px] text-orvyn-bone/50 leading-relaxed font-sans">
                    <span className="inline-flex items-center gap-1.5">
                      <Lightbulb className="h-3.5 w-3.5 text-clay shrink-0" />
                      Votre code de déverrouillage de casier est disponible dans votre espace client. Un message d'alerte SMS d'élite vous a également été envoyé.
                    </span>
                  </div>
                </div>

                <button
                  id="success-close-btn"
                  onClick={handleResetDrawer}
                  className="w-full orvyn-clip-sm bg-sauge text-bone py-3 text-center text-[10px] tracking-widest uppercase font-semibold hover:bg-lime-soft transition cursor-pointer"
                >
                  Retourner au menu
                </button>
              </div>
            )}

          </div>

          {/* Drawer Footer (Summary & Promo section for Steps 1 & 2) */}
          {checkoutStep !== 'success' && cart.length > 0 && (
            <div className="p-6 border-t border-olive/20 bg-carbon-raised space-y-4">

              {/* Promo Code box (Only visible on Cart Step 1) */}
              {checkoutStep === 'cart' && (
                <form onSubmit={handleApplyPromo} className="space-y-2">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Ticket className="absolute left-3.5 top-3 h-4 w-4 text-orvyn-bone/35" />
                      <input
                        id="cart-promo-input"
                        type="text"
                        placeholder="CODE PROMO (Ex: ORVYN20)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className="w-full rounded-sm bg-carbon border border-olive/30 px-3 py-2.5 pl-10 text-xs text-orvyn-bone placeholder-orvyn-bone/25 focus:outline-none focus:border-lime uppercase"
                      />
                    </div>
                    <button
                      id="cart-promo-apply-btn"
                      type="submit"
                      className="orvyn-clip-sm bg-sauge hover:bg-sauge-soft text-bone text-xs px-4 font-semibold tracking-wider transition cursor-pointer"
                    >
                      Appliquer
                    </button>
                  </div>
                  {promoError && <p className="text-[10px] text-clay font-medium">{promoError}</p>}
                  {promoSuccessMsg && <p className="text-[10px] text-lime font-semibold">{promoSuccessMsg}</p>}
                </form>
              )}

              {/* Subtotal, Discount & Total Rows */}
              <div className="space-y-1.5 text-xs text-orvyn-bone/60 font-sans">
                <div className="flex justify-between">
                  <span>Sous-total</span>
                  <span>{subtotal.toFixed(2)} €</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-lime font-semibold">
                    <span>Remise</span>
                    <span>-{discount.toFixed(2)} €</span>
                  </div>
                )}
                <div className="flex justify-between text-sm font-semibold text-orvyn-bone border-t border-olive/20 pt-2.5 font-display">
                  <span>Total</span>
                  <span className="text-clay">{total.toFixed(2)} €</span>
                </div>
              </div>

              {/* Step CTA Buttons */}
              {checkoutStep === 'cart' && (
                <button
                  id="cart-proceed-checkout-btn"
                  onClick={() => setCheckoutStep('checkout')}
                  className="w-full orvyn-clip-sm bg-sauge text-bone py-3.5 text-center text-[10px] tracking-widest uppercase font-semibold hover:bg-lime-soft transition flex items-center justify-center gap-1.5 cursor-pointer"
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
