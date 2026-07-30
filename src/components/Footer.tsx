import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, Award } from 'lucide-react';

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
    <footer className="bg-black text-white border-t border-neutral-900">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-16">

          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 font-display text-2xl font-bold tracking-widest text-white group">
              <span className="font-extrabold tracking-[-0.04em]">ORVYN</span>
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
            </Link>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-sans font-light">
              <li><Link to="/" className="hover:text-white transition">Accueil</Link></li>
              <li><Link to="/repas" className="hover:text-white transition">Nos repas</Link></li>
              <li><Link to="/bowls-proteines" className="hover:text-white transition">Bowls protéinés</Link></li>
              <li><Link to="/shakes-proteines" className="hover:text-white transition">Shakes protéinés</Link></li>
              <li><Link to="/snacks-healthy" className="hover:text-white transition">Snacks healthy</Link></li>
              <li><Link to="/abonnements" className="hover:text-white transition">Abonnements</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 font-bold">Objectifs</h3>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-sans font-light">
              <li><Link to="/repas-prise-de-masse" className="hover:text-white transition">Prise de masse</Link></li>
              <li><Link to="/repas-seche" className="hover:text-white transition">Sèche</Link></li>
              <li><Link to="/repas-post-entrainement" className="hover:text-white transition">Post-entraînement</Link></li>
              <li><Link to="/repas" className="hover:text-white transition">Équilibre alimentaire</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 font-bold">Ressources</h3>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-sans font-light">
              <li><Link to="/blog" className="hover:text-white transition">Blog</Link></li>
              <li><Link to="/faq" className="hover:text-white transition">FAQ</Link></li>
              <li><Link to="/a-propos" className="hover:text-white transition">À propos</Link></li>
              <li><Link to="/contact" className="hover:text-white transition">Contact</Link></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 font-bold">Informations légales</h3>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-sans font-light">
              <li className="hover:text-white transition cursor-pointer">Mentions Légales</li>
              <li className="hover:text-white transition cursor-pointer">Conditions Générales de Vente</li>
              <li className="hover:text-white transition cursor-pointer">Politique de Confidentialité</li>
              <li className="hover:text-white transition cursor-pointer">Gestion des cookies</li>
            </ul>
          </div>

          <div className="space-y-5">
            <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 font-bold">Newsletter ORVYN Club</h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans font-light">
              Inscrivez-vous pour rejoindre l'élite. Recevez nos nouveaux lancements culinaires, conseils nutritionnels de coachs et offres privées.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre.adresse@gmail.com"
                  className="w-full rounded-xl bg-[#090909] border border-neutral-900 px-4 py-3 pr-12 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-brand-green transition"
                  required
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 flex h-9 w-9 items-center justify-center rounded-lg bg-white text-black hover:bg-brand-green transition cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5 text-black stroke-[3px]" />
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] text-brand-green animate-fade-in font-medium font-mono">
                  ✓ Inscription validée. Bienvenue au Club ORVYN.
                </p>
              )}
            </form>
            <div className="pt-4 border-t border-neutral-900 flex items-center gap-4 text-xs text-neutral-400">
              <span className="text-neutral-500 hover:text-white cursor-pointer font-mono text-[10px]">INSTAGRAM</span>
              <span className="text-neutral-500 hover:text-white cursor-pointer font-mono text-[10px]">TIKTOK</span>
              <span className="text-neutral-500 hover:text-white cursor-pointer font-mono text-[10px]">LINKEDIN</span>
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-neutral-900 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© 2026 ORVYN Nutrition SAS. Tous droits réservés.</p>
          <div className="flex items-center gap-2 font-mono text-[9px] bg-[#0a0a0a] px-4 py-1.5 rounded-full border border-neutral-900 text-neutral-400 uppercase tracking-wider">
            <Award className="h-4.5 w-4.5 text-brand-green" />
            <span>La nutrition sportive réinventée • Premium & Innovant</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
