import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const { pathname } = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [objectifsOpen, setObjectifsOpen] = useState(false);
  const [shakesSnacksOpen, setShakesSnacksOpen] = useState(false);
  const [mobileObjectifsOpen, setMobileObjectifsOpen] = useState(false);
  const [mobileShakesSnacksOpen, setMobileShakesSnacksOpen] = useState(false);

  const linkClass = (path: string) =>
    `transition hover:text-white ${pathname === path ? 'text-brand-green' : 'text-neutral-400'}`;

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-900 bg-[#050505]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold tracking-widest text-white group">
          <span className="font-extrabold tracking-[-0.04em] text-2xl">ORVYN</span>
          <span className="h-1.5 w-1.5 rounded-full bg-brand-green shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
        </Link>

        <nav className="hidden lg:flex items-center space-x-6 text-xs uppercase tracking-wider font-medium font-sans">
          <Link to="/" className={linkClass('/')}>Accueil</Link>
          <Link to="/repas" className={linkClass('/repas')}>Nos repas</Link>
          <Link to="/bowls-proteines" className={linkClass('/bowls-proteines')}>Bowls protéinés</Link>

          <div
            className="relative"
            onMouseEnter={() => setObjectifsOpen(true)}
            onMouseLeave={() => setObjectifsOpen(false)}
          >
            <button className="flex items-center gap-1 text-neutral-400 transition hover:text-white cursor-pointer">
              Objectifs <ChevronDown className="h-3 w-3" />
            </button>
            {objectifsOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 rounded-xl bg-neutral-950 border border-neutral-800 p-2 shadow-2xl animate-fade-in z-50">
                <Link to="/repas-prise-de-masse" className="block rounded-lg px-3 py-2 text-xs text-neutral-400 hover:bg-neutral-900 hover:text-white transition">Prise de masse</Link>
                <Link to="/repas-seche" className="block rounded-lg px-3 py-2 text-xs text-neutral-400 hover:bg-neutral-900 hover:text-white transition">Sèche</Link>
                <Link to="/repas-post-entrainement" className="block rounded-lg px-3 py-2 text-xs text-neutral-400 hover:bg-neutral-900 hover:text-white transition">Récupération</Link>
                <Link to="/repas" className="block rounded-lg px-3 py-2 text-xs text-neutral-400 hover:bg-neutral-900 hover:text-white transition">Équilibre alimentaire</Link>
              </div>
            )}
          </div>

          <div
            className="relative"
            onMouseEnter={() => setShakesSnacksOpen(true)}
            onMouseLeave={() => setShakesSnacksOpen(false)}
          >
            <button className="flex items-center gap-1 text-neutral-400 transition hover:text-white cursor-pointer">
              Shakes & Snacks <ChevronDown className="h-3 w-3" />
            </button>
            {shakesSnacksOpen && (
              <div className="absolute top-full left-0 mt-2 w-48 rounded-xl bg-neutral-950 border border-neutral-800 p-2 shadow-2xl animate-fade-in z-50">
                <Link to="/shakes-proteines" className="block rounded-lg px-3 py-2 text-xs text-neutral-400 hover:bg-neutral-900 hover:text-white transition">Shakes</Link>
                <Link to="/snacks-healthy" className="block rounded-lg px-3 py-2 text-xs text-neutral-400 hover:bg-neutral-900 hover:text-white transition">Snacks</Link>
              </div>
            )}
          </div>

          <Link to="/abonnements" className={linkClass('/abonnements')}>Abonnements</Link>
          <Link to="/blog" className={linkClass('/blog')}>Blog</Link>
          <Link to="/a-propos" className={linkClass('/a-propos')}>À propos</Link>
          <Link to="/contact" className={linkClass('/contact')}>Contact</Link>
          <Link to="/faq" className={linkClass('/faq')}>FAQ</Link>
        </nav>

        <div className="flex items-center space-x-3">
          <Link
            to="/repas"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[10px] font-bold text-black tracking-wider uppercase transition-all duration-300 hover:bg-brand-green hover:shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          >
            Commander
          </Link>

          <Link to="/repas" className="relative p-2 text-neutral-400 hover:text-brand-green hover:bg-neutral-900 transition rounded-full">
            <ShoppingBag className="h-5 w-5" />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-400 hover:text-brand-green lg:hidden rounded-full hover:bg-neutral-900 cursor-pointer"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-900 bg-[#050505]/95 backdrop-blur-xl px-4 py-6 space-y-3 shadow-2xl max-h-[80vh] overflow-y-auto">
          <Link to="/" onClick={closeMobile} className={`block w-full text-left rounded-xl px-4 py-2 text-sm font-semibold transition ${pathname === '/' ? 'bg-brand-green-light text-brand-green' : 'text-neutral-400 hover:bg-neutral-900'}`}>Accueil</Link>
          <Link to="/repas" onClick={closeMobile} className="block w-full text-left rounded-xl px-4 py-2 text-sm text-neutral-400 hover:bg-neutral-900">Nos repas</Link>
          <Link to="/bowls-proteines" onClick={closeMobile} className="block w-full text-left rounded-xl px-4 py-2 text-sm text-neutral-400 hover:bg-neutral-900">Bowls protéinés</Link>

          <div>
            <button
              onClick={() => setMobileObjectifsOpen(!mobileObjectifsOpen)}
              className="flex w-full items-center justify-between rounded-xl px-4 py-2 text-sm text-neutral-400 hover:bg-neutral-900 cursor-pointer"
            >
              Objectifs <ChevronDown className={`h-4 w-4 transition ${mobileObjectifsOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileObjectifsOpen && (
              <div className="ml-4 mt-1 space-y-1 border-l border-neutral-800 pl-4">
                <Link to="/repas-prise-de-masse" onClick={closeMobile} className="block rounded-lg px-3 py-2 text-xs text-neutral-400 hover:bg-neutral-900 hover:text-white transition">Prise de masse</Link>
                <Link to="/repas-seche" onClick={closeMobile} className="block rounded-lg px-3 py-2 text-xs text-neutral-400 hover:bg-neutral-900 hover:text-white transition">Sèche</Link>
                <Link to="/repas-post-entrainement" onClick={closeMobile} className="block rounded-lg px-3 py-2 text-xs text-neutral-400 hover:bg-neutral-900 hover:text-white transition">Récupération</Link>
                <Link to="/repas" onClick={closeMobile} className="block rounded-lg px-3 py-2 text-xs text-neutral-400 hover:bg-neutral-900 hover:text-white transition">Équilibre alimentaire</Link>
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => setMobileShakesSnacksOpen(!mobileShakesSnacksOpen)}
              className="flex w-full items-center justify-between rounded-xl px-4 py-2 text-sm text-neutral-400 hover:bg-neutral-900 cursor-pointer"
            >
              Shakes & Snacks <ChevronDown className={`h-4 w-4 transition ${mobileShakesSnacksOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileShakesSnacksOpen && (
              <div className="ml-4 mt-1 space-y-1 border-l border-neutral-800 pl-4">
                <Link to="/shakes-proteines" onClick={closeMobile} className="block rounded-lg px-3 py-2 text-xs text-neutral-400 hover:bg-neutral-900 hover:text-white transition">Shakes</Link>
                <Link to="/snacks-healthy" onClick={closeMobile} className="block rounded-lg px-3 py-2 text-xs text-neutral-400 hover:bg-neutral-900 hover:text-white transition">Snacks</Link>
              </div>
            )}
          </div>

          <Link to="/abonnements" onClick={closeMobile} className="block w-full text-left rounded-xl px-4 py-2 text-sm text-neutral-400 hover:bg-neutral-900">Abonnements</Link>
          <Link to="/blog" onClick={closeMobile} className="block w-full text-left rounded-xl px-4 py-2 text-sm text-neutral-400 hover:bg-neutral-900">Blog</Link>
          <Link to="/a-propos" onClick={closeMobile} className="block w-full text-left rounded-xl px-4 py-2 text-sm text-neutral-400 hover:bg-neutral-900">À propos</Link>
          <Link to="/contact" onClick={closeMobile} className="block w-full text-left rounded-xl px-4 py-2 text-sm text-neutral-400 hover:bg-neutral-900">Contact</Link>
          <Link to="/faq" onClick={closeMobile} className="block w-full text-left rounded-xl px-4 py-2 text-sm text-neutral-400 hover:bg-neutral-900">FAQ</Link>
        </div>
      )}
    </header>
  );
}
