import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send } from 'lucide-react';

const BRAND_LINKS = [
  { to: '/repas', label: 'Nos repas' },
  { to: '/bowls-proteines', label: 'Bowls protéinés' },
  { to: '/shakes-proteines', label: 'Shakes protéinés' },
  { to: '/snacks-healthy', label: 'Snacks healthy' },
  { to: '/abonnements', label: 'Abonnements' },
];

const GOAL_LINKS = [
  { to: '/repas-prise-de-masse', label: 'Prise de masse' },
  { to: '/repas-seche', label: 'Sèche' },
  { to: '/repas-post-entrainement', label: 'Post-entraînement' },
  { to: '/repas', label: 'Équilibre alimentaire' },
];

const RESSOURCE_LINKS = [
  { to: '/blog', label: 'Blog' },
  { to: '/faq', label: 'FAQ' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/contact', label: 'Contact' },
];

const LEGAL_LINKS = [
  'Mentions Légales',
  'Conditions Générales de Vente',
  'Politique de Confidentialité',
  'Gestion des cookies',
];

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2.5">
        <span className="h-[2px] w-6 bg-clay" />
        <h3 className="text-[10px] uppercase tracking-[0.24em] text-clay font-semibold">
          {title}
        </h3>
      </div>
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
    <footer className="relative overflow-hidden bg-orvyn-moss text-white border-t border-orvyn-olive/25">
      {/* Grand O décoratif */}
      <div className="orvyn-o pointer-events-none absolute -right-24 -top-24 h-96 w-96 text-clay/8" aria-hidden="true" />
      <div className="absolute inset-0 bg-matiere pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Bandeau slogan + ligne de performance */}
        <div className="mb-16 flex flex-col items-start gap-6 border-b border-orvyn-olive/25 pb-10">
          <Link to="/" className="flex items-center gap-3">
            <span className="orvyn-o flex h-10 w-10 items-center justify-center border-[1.5px] border-clay">
              <span className="h-2 w-2 rounded-full bg-orvyn-clay" />
            </span>
            <span className="font-display text-3xl font-semibold tracking-[0.08em] text-orvyn-bone">ORVYN</span>
          </Link>
          <p className="max-w-xl font-display text-2xl font-semibold text-orvyn-bone sm:text-3xl">
            Le rythme de la{' '}
            <span className="text-clay">performance.</span>{' '}
            Effort. Nutrition. Progression.
          </p>
          <div className="w-full performance-line" aria-hidden="true" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-10">
          <FooterColumn title="ORVYN">
            <ul className="space-y-2.5 text-xs text-orvyn-bone/60 font-sans">
              <li><Link to="/" className="hover:text-orvyn-performance transition">Accueil</Link></li>
              {BRAND_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-orvyn-performance transition">{l.label}</Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Objectifs">
            <ul className="space-y-2.5 text-xs text-orvyn-bone/60 font-sans">
              {GOAL_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-orvyn-performance transition">{l.label}</Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Ressources">
            <ul className="space-y-2.5 text-xs text-orvyn-bone/60 font-sans">
              {RESSOURCE_LINKS.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:text-orvyn-performance transition">{l.label}</Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Informations">
            <ul className="space-y-2.5 text-xs text-orvyn-bone/60 font-sans">
              {LEGAL_LINKS.map((l) => (
                <li key={l} className="cursor-pointer transition hover:text-orvyn-bone">{l}</li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Newsletter">
            <p className="text-xs text-orvyn-bone/60 leading-relaxed">
              Conseils nutrition et nouveautés. Sans spam.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre.adresse@gmail.com"
                  className="w-full rounded-sm bg-orvyn-carbon/60 border border-orvyn-olive/40 px-4 py-3 pr-12 text-xs text-orvyn-bone placeholder-orvyn-bone/30 focus:outline-none focus:border-lime transition"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 flex h-9 w-9 items-center justify-center rounded-sm bg-lime text-carbon transition hover:bg-lime-soft cursor-pointer"
                  aria-label="S'inscrire à la newsletter"
                >
                  <Send className="h-3.5 w-3.5 stroke-[3px]" />
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-lime animate-fade-in font-medium">
                  ✓ Inscription validée. Bienvenue au Club ORVYN.
                </p>
              )}
            </form>
            <div className="pt-3 flex items-center gap-4 text-xs text-orvyn-bone/60">
              <span className="cursor-pointer transition hover:text-orvyn-performance text-[10px] tracking-widest">INSTAGRAM</span>
              <span className="cursor-pointer transition hover:text-orvyn-performance text-[10px] tracking-widest">TIKTOK</span>
              <span className="cursor-pointer transition hover:text-orvyn-performance text-[10px] tracking-widest">LINKEDIN</span>
            </div>
          </FooterColumn>
        </div>

        <div className="mt-16 border-t border-orvyn-olive/25 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-orvyn-bone/40">
          <p>© 2026 ORVYN Nutrition SAS. Tous droits réservés.</p>
          <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em]">
            <span className="h-1.5 w-1.5 rounded-full bg-clay" />
            La nutrition sportive réinventée
          </div>
        </div>
      </div>
    </footer>
  );
}
