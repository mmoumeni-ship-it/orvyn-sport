import React, { useState } from 'react';
import { Mail, Send, Award, Activity, Heart, ShieldAlert, Sparkles } from 'lucide-react';

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export default function Footer({ setCurrentTab }: FooterProps) {
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

  const handleFooterLinkClick = (tabId: string, sectionId?: string) => {
    if (sectionId) {
      setCurrentTab('home');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      setCurrentTab(tabId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black text-white border-t border-neutral-900">
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
          
          {/* Brand Presentation */}
          <div className="space-y-6">
            <button
              id="footer-logo-btn"
              onClick={() => handleFooterLinkClick('home')}
              className="flex items-center gap-2 font-display text-2xl font-bold tracking-widest text-white cursor-pointer group"
            >
              <span className="font-extrabold tracking-[-0.04em]">ORVYN</span>
              <span className="h-1.5 w-1.5 rounded-full bg-brand-green shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
            </button>
            <p className="text-xs text-neutral-400 font-sans font-light leading-relaxed">
              La nutrition sportive d'élite réinventée. De vrais repas de précision gastronomiques préparés avec des matières premières brutes d'exception, sans conservateurs ni sucres ajoutés.
            </p>
            <div className="flex items-center gap-2.5 text-neutral-500 font-mono text-[9px] uppercase tracking-wider">
              <Activity className="h-4 w-4 text-brand-green animate-pulse" />
              <span>Zéro Attente • Rigueur Scientifique</span>
            </div>
          </div>

          {/* Rapid Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 font-bold">ORVYN</h3>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-sans font-light">
              <li>
                <button id="footer-link-home" onClick={() => handleFooterLinkClick('home')} className="hover:text-white transition cursor-pointer">
                  Accueil principal
                </button>
              </li>
              <li>
                <button id="footer-link-how" onClick={() => handleFooterLinkClick('home', 'how-it-works-section')} className="hover:text-white transition cursor-pointer">
                  Pourquoi ORVYN ?
                </button>
              </li>
              <li>
                <button id="footer-link-menu" onClick={() => handleFooterLinkClick('home', 'menu-section')} className="hover:text-white transition cursor-pointer">
                  Nos Repas & Bowls
                </button>
              </li>
              <li>
                <button id="footer-link-subs" onClick={() => handleFooterLinkClick('home', 'subscriptions-section')} className="hover:text-white transition cursor-pointer">
                  Abonnements Privés
                </button>
              </li>
            </ul>
          </div>

          {/* Legal and FAQ */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 font-bold">Informations</h3>
            <ul className="space-y-2.5 text-xs text-neutral-400 font-sans font-light">
              <li>
                <button id="footer-link-faq" onClick={() => handleFooterLinkClick('home', 'faq-section')} className="hover:text-white transition cursor-pointer">
                  Foire Aux Questions (FAQ)
                </button>
              </li>
              <li>
                <button id="footer-link-about" onClick={() => handleFooterLinkClick('about')} className="hover:text-white transition cursor-pointer">
                  À Propos de nous
                </button>
              </li>
              <li>
                <button id="footer-link-contact" onClick={() => handleFooterLinkClick('home', 'contact-section')} className="hover:text-white transition cursor-pointer">
                  Contacter notre conciergerie
                </button>
              </li>
              <li className="text-[10px] text-neutral-600 space-y-1 block pt-1.5 font-mono">
                <span className="block hover:text-neutral-400 cursor-pointer">Mentions Légales</span>
                <span className="block hover:text-neutral-400 cursor-pointer">Conditions Générales de Vente (CGV)</span>
                <span className="block hover:text-neutral-400 cursor-pointer">Politique de Confidentialité</span>
              </li>
            </ul>
          </div>

          {/* Newsletter and Tech Stack details */}
          <div className="space-y-5">
            <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-500 font-bold">
              Newsletter ORVYN Club
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-sans font-light">
              Inscrivez-vous pour rejoindre l'élite. Recevez nos nouveaux lancements culinaires, conseils nutritionnels de coachs et offres privées.
            </p>
            
            <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
              <div className="relative">
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre.adresse@gmail.com"
                  className="w-full rounded-xl bg-[#090909] border border-neutral-900 px-4 py-3 pr-12 text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-brand-green transition"
                  required
                />
                <button
                  id="newsletter-submit-btn"
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

            {/* Social profiles and connections */}
            <div className="pt-4 border-t border-neutral-900 flex items-center gap-4 text-xs text-neutral-400">
              <span className="text-neutral-500 hover:text-white cursor-pointer font-mono text-[10px]">INSTAGRAM</span>
              <span className="text-neutral-500 hover:text-white cursor-pointer font-mono text-[10px]">TIKTOK</span>
              <span className="text-neutral-500 hover:text-white cursor-pointer font-mono text-[10px]">LINKEDIN</span>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
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
