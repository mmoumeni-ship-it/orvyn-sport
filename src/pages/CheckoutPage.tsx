import React, { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';
import { GYMS_DATABASE } from '../data/gyms';
import { useCart } from '../context/CartContext';

type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  pickupLocation: string;
  pickupTime: string;
};

type Errors = Partial<Record<keyof FormState, string>>;

const initialState: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  pickupLocation: GYMS_DATABASE[0]?.id ?? '',
  pickupTime: '18:30',
};

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { items, subtotal } = useCart();
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);

  const isEmailValid = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const validate = () => {
    const next: Errors = {};
    if (!form.firstName.trim()) next.firstName = 'Prénom requis';
    if (!form.lastName.trim()) next.lastName = 'Nom requis';
    if (!form.email.trim()) next.email = 'Email requis';
    else if (!isEmailValid(form.email)) next.email = 'Email invalide';
    if (!form.phone.trim()) next.phone = 'Téléphone requis';
    if (!form.pickupLocation.trim()) next.pickupLocation = 'Point de retrait requis';
    if (!form.pickupTime.trim()) next.pickupTime = 'Créneau requis';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const gymOptions = useMemo(() => GYMS_DATABASE, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) return;
    if (items.length === 0) {
      setServerError('Votre panier est vide.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: form,
          items,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.error || 'Impossible de créer la session Stripe');
      }

      if (data?.url) {
        window.location.assign(data.url);
        return;
      }

      throw new Error('URL Stripe manquante');
    } catch (error) {
      setServerError(error instanceof Error ? error.message : 'Erreur de paiement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO title="Commande" description="Finalisez votre commande ORVYN." canonical="/commande" />
      <section className="bg-beige py-28 lg:py-36 border-b border-line/70">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <span className="eyebrow text-sauge mb-3">Commande</span>
            <h1 className="font-display text-4xl font-semibold text-charbon tracking-tight">Passez votre commande</h1>
            <p className="mt-3 text-sm text-olive">Remplissez les informations nécessaires pour continuer vers le paiement Stripe.</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <form onSubmit={handleSubmit} className="orvyn-clip-sm bg-white border border-line/70 p-6 space-y-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-charbon">
                  <span className="text-xs uppercase tracking-widest text-olive">Prénom</span>
                  <input id="checkout-first-name" value={form.firstName} onChange={(e) => setForm((prev) => ({ ...prev, firstName: e.target.value }))} className="w-full rounded-xl border border-line/70 bg-bg-secondary px-4 py-3 text-sm outline-none focus:border-sauge" />
                  {errors.firstName && <span className="text-xs text-red-600">{errors.firstName}</span>}
                </label>
                <label className="space-y-2 text-sm text-charbon">
                  <span className="text-xs uppercase tracking-widest text-olive">Nom</span>
                  <input id="checkout-last-name" value={form.lastName} onChange={(e) => setForm((prev) => ({ ...prev, lastName: e.target.value }))} className="w-full rounded-xl border border-line/70 bg-bg-secondary px-4 py-3 text-sm outline-none focus:border-sauge" />
                  {errors.lastName && <span className="text-xs text-red-600">{errors.lastName}</span>}
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-charbon">
                  <span className="text-xs uppercase tracking-widest text-olive">Email</span>
                  <input id="checkout-email" type="email" value={form.email} onChange={(e) => setForm((prev) => ({ ...prev, email: e.target.value }))} className="w-full rounded-xl border border-line/70 bg-bg-secondary px-4 py-3 text-sm outline-none focus:border-sauge" />
                  {errors.email && <span className="text-xs text-red-600">{errors.email}</span>}
                </label>
                <label className="space-y-2 text-sm text-charbon">
                  <span className="text-xs uppercase tracking-widest text-olive">Téléphone</span>
                  <input id="checkout-phone" value={form.phone} onChange={(e) => setForm((prev) => ({ ...prev, phone: e.target.value }))} className="w-full rounded-xl border border-line/70 bg-bg-secondary px-4 py-3 text-sm outline-none focus:border-sauge" />
                  {errors.phone && <span className="text-xs text-red-600">{errors.phone}</span>}
                </label>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="space-y-2 text-sm text-charbon">
                  <span className="text-xs uppercase tracking-widest text-olive">Salle / point de retrait</span>
                  <select id="checkout-pickup-location" value={form.pickupLocation} onChange={(e) => setForm((prev) => ({ ...prev, pickupLocation: e.target.value }))} className="w-full rounded-xl border border-line/70 bg-bg-secondary px-4 py-3 text-sm outline-none focus:border-sauge">
                    {gymOptions.map((gym) => (
                      <option key={gym.id} value={gym.id}>
                        {gym.name} - {gym.city}
                      </option>
                    ))}
                  </select>
                  {errors.pickupLocation && <span className="text-xs text-red-600">{errors.pickupLocation}</span>}
                </label>
                <label className="space-y-2 text-sm text-charbon">
                  <span className="text-xs uppercase tracking-widest text-olive">Créneau de retrait</span>
                  <select id="checkout-pickup-time" value={form.pickupTime} onChange={(e) => setForm((prev) => ({ ...prev, pickupTime: e.target.value }))} className="w-full rounded-xl border border-line/70 bg-bg-secondary px-4 py-3 text-sm outline-none focus:border-sauge">
                    {['12:00', '12:30', '13:00', '18:00', '18:30', '19:00', '19:30', '20:00'].map((slot) => (
                      <option key={slot} value={slot}>{slot}</option>
                    ))}
                  </select>
                  {errors.pickupTime && <span className="text-xs text-red-600">{errors.pickupTime}</span>}
                </label>
              </div>

              {serverError && <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{serverError}</p>}

              <button id="checkout-proceed-payment-btn" type="submit" disabled={loading} className="orvyn-clip-sm w-full bg-sauge px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-bone disabled:opacity-60">
                {loading ? 'Création de la session...' : 'Procéder au paiement'}
              </button>
            </form>

            <aside className="orvyn-clip-sm bg-white border border-line/70 p-6 h-fit space-y-4 sticky top-28">
              <h2 className="font-display text-2xl font-semibold text-charbon">Récapitulatif</h2>
              <div className="space-y-3">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between gap-4 text-sm">
                    <div>
                      <p className="font-semibold text-charbon">{item.name}</p>
                      <p className="text-olive">x{item.quantity}</p>
                    </div>
                    <span className="text-charbon">{(item.price * item.quantity).toFixed(2)} €</span>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between border-t border-line/60 pt-3 text-base font-semibold text-charbon">
                <span>Total</span>
                <span>{subtotal.toFixed(2)} €</span>
              </div>
              <Link to="/panier" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-sauge hover:text-charbon transition">
                Retour au panier
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
