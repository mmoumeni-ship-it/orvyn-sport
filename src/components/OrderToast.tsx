import React from 'react';
import { CheckCircle, X, MapPin, Clock, KeyRound } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function OrderToast() {
  const { lastOrder, dismissOrderAlert } = useCart();
  if (!lastOrder) return null;

  return (
    <div
      id="order-alert"
      role="status"
      aria-live="polite"
      className="fixed bottom-5 left-1/2 z-[60] w-[calc(100%-2rem)] max-w-sm -translate-x-1/2 animate-fade-in"
    >
      <div className="rounded-2xl border border-olive/20 bg-orvyn-carbon text-orvyn-bone shadow-[0_24px_60px_-24px_rgba(23,26,24,0.6)] overflow-hidden">
        <div className="flex items-start justify-between gap-3 p-5">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-lime/10 text-lime">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-semibold font-display">Commande confirmée</p>
              <p className="mt-0.5 text-[11px] text-orvyn-bone/60 font-sans">
                {lastOrder.id} · en préparation
              </p>
            </div>
          </div>
          <button
            onClick={dismissOrderAlert}
            aria-label="Fermer l'alerte"
            className="p-1 text-orvyn-bone/50 hover:text-clay transition cursor-pointer"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="border-t border-olive/20 bg-carbon-raised px-5 py-3 grid grid-cols-3 gap-2 text-[10px] text-orvyn-bone/60">
          <span className="flex items-center gap-1.5">
            <MapPin className="h-3 w-3 text-clay shrink-0" /> {lastOrder.gymName}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3 w-3 text-clay shrink-0" /> {lastOrder.pickupTime}
          </span>
          <span className="flex items-center gap-1.5">
            <KeyRound className="h-3 w-3 text-clay shrink-0" /> {lastOrder.pickupCode}
          </span>
        </div>
      </div>
    </div>
  );
}
