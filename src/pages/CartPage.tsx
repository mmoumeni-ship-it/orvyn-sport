import React, { useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { useCart } from '../context/CartContext';
import { trackViewCart } from '../lib/analytics';

export default function CartPage() {
  const navigate = useNavigate();
  const { items, increaseQuantity, decreaseQuantity, removeItem, subtotal, itemCount } = useCart();
  const tracked = useRef(false);

  useEffect(() => {
    if (!tracked.current && items.length > 0) {
      tracked.current = true;
      trackViewCart(
        items.map((i) => ({
          item_id: i.id,
          item_name: i.name,
          price: i.price,
          quantity: i.quantity,
        }))
      );
    }
  }, [items]);

  return (
    <>
      <SEO title="Panier" description="Votre panier ORVYN." canonical="/panier" />
      <section className="bg-beige py-28 lg:py-36 border-b border-line/70">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="eyebrow text-sauge mb-3">Panier</span>
            <h1 className="font-display text-4xl font-semibold text-charbon tracking-tight">Votre panier</h1>
            <p className="mt-3 text-sm text-olive">{itemCount} article{itemCount > 1 ? 's' : ''}</p>
          </div>

          {items.length === 0 ? (
            <div className="orvyn-clip-sm bg-white border border-line/70 p-8 text-center space-y-4 max-w-md mx-auto">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sauge/10 text-sauge">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <h2 className="font-display text-2xl font-semibold text-charbon">Votre panier est vide</h2>
              <Link to="/menu" className="orvyn-clip-sm inline-flex items-center gap-2 bg-sauge px-6 py-3 text-xs font-semibold uppercase tracking-widest text-bone">
                Découvrir le menu <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          ) : (
            <div className="grid gap-6 lg:grid-cols-[1.5fr_0.85fr]">
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} id={`cart-item-${item.id}`} className="orvyn-clip-sm bg-white border border-line/70 p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-sauge">
                        <span className="rounded-full bg-sauge/10 px-2 py-1">{item.type === 'dish' ? 'Plat' : 'Abonnement'}</span>
                        {item.plan && <span>{item.plan}</span>}
                      </div>
                      <h2 className="font-display text-lg font-semibold text-charbon">{item.name}</h2>
                      <p className="text-sm text-olive">Prix unitaire: {item.price.toFixed(2)} €</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 border border-line/70 bg-bg-secondary rounded-xl px-2 py-1">
                        <button id={`cart-minus-btn-${item.id}`} onClick={() => decreaseQuantity(item.id)} className="p-2 text-olive hover:text-sauge transition cursor-pointer">
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-semibold text-charbon">{item.quantity}</span>
                        <button id={`cart-plus-btn-${item.id}`} onClick={() => increaseQuantity(item.id)} className="p-2 text-olive hover:text-sauge transition cursor-pointer">
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <button id={`cart-remove-btn-${item.id}`} onClick={() => removeItem(item.id)} className="rounded-xl border border-line/70 px-3 py-2 text-sm text-charbon/70 hover:text-sauge transition cursor-pointer">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <aside className="orvyn-clip-sm h-fit bg-white border border-line/70 p-6 space-y-4 sticky top-28">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between text-olive">
                    <span>Sous-total</span>
                    <span id="cart-subtotal">{subtotal.toFixed(2)} €</span>
                  </div>
                  <div className="flex items-center justify-between border-t border-line/60 pt-3 text-base font-semibold text-charbon">
                    <span>Total</span>
                    <span id="cart-total">{subtotal.toFixed(2)} €</span>
                  </div>
                </div>

                <button
                  id="cart-proceed-order-btn"
                  disabled={items.length === 0}
                  onClick={() => navigate('/commande')}
                  className="orvyn-clip-sm w-full bg-sauge px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-bone disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Passer la commande
                </button>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
