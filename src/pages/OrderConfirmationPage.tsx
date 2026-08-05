import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';
import { useCart } from '../context/CartContext';

export default function OrderConfirmationPage() {
  const [searchParams] = useSearchParams();
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  const sessionId = searchParams.get('session_id') || '';
  const reference = sessionId ? sessionId.slice(-8).toUpperCase() : 'ORVYN-TEST';

  return (
    <>
      <SEO title="Commande confirmée" description="Votre commande ORVYN est confirmée." canonical="/commande-confirmee" />
      <section className="bg-bone py-28 lg:py-36">
        <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sauge/10 text-sauge">
            <CheckCircle className="h-8 w-8" />
          </div>
          <span className="eyebrow text-sauge justify-center">Confirmation</span>
          <h1 className="font-display text-4xl font-semibold text-charbon tracking-tight">Commande confirmée</h1>
          <p className="text-sm text-olive">Référence de commande : <span className="font-semibold text-charbon">{reference}</span></p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link to="/" className="orvyn-clip-sm bg-sauge px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-bone">
              Retour à l'accueil
            </Link>
            <Link to="/menu" className="orvyn-clip-sm border border-sauge/40 px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-charbon">
              Voir le menu
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
