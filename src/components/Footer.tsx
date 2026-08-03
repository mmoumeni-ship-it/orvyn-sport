import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, Instagram, Linkedin, Music2 } from 'lucide-react';

const BRAND_LINKS = [
  { to: '/repas', label: 'Le menu' },
  { to: '/bowls-proteines', label: 'Bowls protéinés' },
  { to: '/shakes-proteines', label: 'Shakes protéinés' },
  { to: '/snacks-healthy', label: 'Snacks healthy' },
  { to: '/abonnements', label: 'Abonnements' },
];

const GOAL_LINKS = [
  { to: '/repas-prise-de-masse', label: 'Prise de masse' },
  { to: '/repas-seche', label: 'Sèche' },
  { to: '/repas', label: 'Perte de poids' },
  { to: '/repas-post-entrainement', label: 'Récupération' },
];

const RESSOURCE_LINKS = [
  { to: '/blog', label: 'Blog' },
  { to: '/faq', label: 'FAQ' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/contact', label: 'Contact' },
];

const LEGAL_LINKS = [
  'Mentions légales',
  'Conditions générales de vente',
  'Politique de confidentialité',
  'Gestion des cookies',
];

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <h3 className="text-[10px] uppercase tracking-[0.24em] text-sauge-soft font-semibold">
        {title}
      </h3>
      {children}
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  return (
    <footer className="relative overflow-hidden bg-charbon text-bone border-t border-bone/10">
      <div className="orvyn-o pointer-events-none absolute -right-24 -top-24 h-96 w-96 text-sauge/10" aria-hidden="true" />
      <div className="absolute inset-0 bg-matiere pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Bandeau marque */}
        <div className="mb-16 flex flex-col items-start gap-6 border-b border-bone/10 pb-12">
          <Link to="/" className="flex items-center gap-3" aria-label="ORVYN — Accueil">
            <span className="orvyn-o flex h-10 w-10 items-center justify-center border-[1.5px] border-sauge">
              <span className="h-2 w-2 rounded-full bg-sauge" />
            </span>
            <span className="font-display text-3xl font-bold tracking-[0.08em] text-bone">ORVYN</span>
          </Link>
          <p className="max-w-xl font-display text-2xl font-semibold text-bone sm:text-3xl leading-snug">
            Votre repas sportif,{' '}
            <span className="text-sauge-soft">prêt après votre séance.</span>
          </p>
          <div className="w-full performance-line" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-10">
          <FooterColumn title="La carte">
            <ul className="space-y-2.5 text-xs text-bone/60 font-sans">
              {BRAND_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="transition hover:text-sauge-soft">{l.label}</Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Objectifs">
            <ul className="space-y-2.5 text-xs text-bone/60 font-sans">
              {GOAL_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="transition hover:text-sauge-soft">{l.label}</Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Ressources">
            <ul className="space-y-2.5 text-xs text-bone/60 font-sans">
              {RESSOURCE_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="transition hover:text-sauge-soft">{l.label}</Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Contact">
            <ul className="space-y-2.5 text-xs text-bone/60 font-sans">
              <li>contact@orvyn.com</li>
              <li>+33 (0)1 42 78 90 41</li>
              <li>82 Rue de Courcelles, Paris</li>
            </ul>
            <form onSubmit={handleSubscribe} className="flex gap-2 pt-1">
              <label htmlFor="newsletter-email" className="sr-only">Adresse e-mail</label>
              <input
                id="newsletter-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre e-mail"
                className="w-full rounded-full bg-carbon-raised border border-bone/15 px-4 py-2.5 text-xs text-bone placeholder-bone/30 focus:outline-none focus:border-sauge transition"
                required
              />
              <button
                type="submit"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sauge text-bone transition hover:bg-sauge-soft cursor-pointer"
                aria-label="S'inscrire à la newsletter"
              >
                <Send className="h-3.5 w-3.5 stroke-[3px]" />
              </button>
            </form>
            {subscribed && (
              <p className="text-[11px] text-citron animate-fade-in font-medium">
                ✓ Inscription validée. Bienvenue au Club ORVYN.
              </p>
            )}
            <div className="pt-2 flex items-center gap-4 text-bone/60">
              <a href="#" aria-label="Instagram" className="transition hover:text-sauge-soft"><Instagram className="h-4 w-4" /></a>
              <a href="#" aria-label="TikTok" className="transition hover:text-sauge-soft"><Music2 className="h-4 w-4" /></a>
              <a href="#" aria-label="LinkedIn" className="transition hover:text-sauge-soft"><Linkedin className="h-4 w-4" /></a>
            </div>
          </FooterColumn>
        </div>

        <div className="mt-16 border-t border-bone/10 pt-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-bone/45">
            {LEGAL_LINKS.map((l) => (
              <span key={l} className="cursor-pointer transition hover:text-bone">{l}</span>
            ))}
          </div>
          <p className="text-xs text-bone/45">© 2026 ORVYN Nutrition SAS. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
