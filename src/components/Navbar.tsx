import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';
import { useCart } from '../context/CartContext';

const NAV_LINKS = [
  { to: '/repas', label: 'Menu' },
  { to: '/abonnements', label: 'Abonnements' },
  { to: '/blog', label: 'Blog' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/contact', label: 'Contact' },
];

const OBJECTIF_LINKS = [
  { to: '/repas-prise-de-masse', label: 'Prise de masse' },
  { to: '/repas-seche', label: 'Sèche' },
  { to: '/repas', label: 'Perte de poids' },
  { to: '/repas-post-entrainement', label: 'Récupération' },
];

function ActiveLink({ to, label }: { to: string; label: string; key?: React.Key }) {
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <Link
      to={to}
      className={`relative py-2 transition hover:text-sauge ${active ? 'text-sauge' : 'text-charbon/70'}`}
    >
      {label}
      {active && (
        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-sauge rounded-full" />
      )}
    </Link>
  );
}

function DropdownLink({ to, label }: { to: string; label: string; key?: React.Key }) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-2 rounded-full px-3 py-2 text-xs text-charbon/70 transition hover:bg-sand hover:text-charbon"
    >
      <span className="h-[2px] w-3 bg-sauge/40 transition group-hover:bg-sauge" />
      {label}
    </Link>
  );
}

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [objectifsOpen, setObjectifsOpen] = useState(false);
  const [mobileObjectifsOpen, setMobileObjectifsOpen] = useState(false);
  const { totalCount, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const closeMobile = () => setMobileMenuOpen(false);

  const scrollToConcept = () => {
    closeMobile();
    if (pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById('comment-ca-marche');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById('comment-ca-marche');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-all duration-300 ${
        scrolled
          ? 'border-charbon/10 bg-bone/95 backdrop-blur-xl'
          : 'border-transparent bg-bone/85 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo — le O ORVYN */}
        <Link to="/" className="group flex items-center gap-2.5" aria-label="ORVYN — Accueil">
          <span className="orvyn-o flex h-7 w-7 items-center justify-center border-[1.5px] border-sauge transition group-hover:border-sauge-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-sauge" />
          </span>
          <span className="font-display text-2xl font-bold tracking-[0.08em] text-charbon">
            ORVYN
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-[0.12em] uppercase">
          <button
            onClick={scrollToConcept}
            className="py-2 text-charbon/70 transition hover:text-sauge cursor-pointer"
          >
            Concept
          </button>

          {NAV_LINKS.slice(0, 1).map((l) => (
            <ActiveLink key={l.to} to={l.to} label={l.label} />
          ))}

          {/* Objectifs */}
          <div
            className="relative"
            onMouseEnter={() => setObjectifsOpen(true)}
            onMouseLeave={() => setObjectifsOpen(false)}
          >
            <button className="flex items-center gap-1 py-2 text-charbon/70 transition hover:text-sauge cursor-pointer">
              Objectifs <ChevronDown className="h-3 w-3" />
            </button>
            {objectifsOpen && (
              <div className="absolute top-full left-1/2 mt-3 w-56 -translate-x-1/2 rounded-2xl border border-charbon/10 bg-bone p-2 shadow-xl animate-fade-in z-50">
                <span className="block border-b border-charbon/10 px-3 pb-2 pt-1 text-[10px] tracking-[0.22em] text-sauge uppercase">
                  Votre objectif
                </span>
                <div className="mt-1 space-y-0.5">
                  {OBJECTIF_LINKS.map((l) => (
                    <DropdownLink key={l.to} to={l.to} label={l.label} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {NAV_LINKS.slice(1).map((l) => (
            <ActiveLink key={l.to} to={l.to} label={l.label} />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={openCart}
            aria-label={`Ouvrir le panier (${totalCount} article${totalCount > 1 ? 's' : ''})`}
            className="relative p-2 text-charbon/70 transition hover:text-sauge cursor-pointer"
          >
            <ShoppingBag className="h-5 w-5" />
            {totalCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-sauge px-1 text-[9px] font-bold text-bone">
                {totalCount}
              </span>
            )}
          </button>

          <Link
            to="/repas"
            className="orvyn-clip-sm relative hidden sm:inline-flex items-center gap-2 overflow-hidden bg-sauge px-5 py-2.5 text-[10px] font-semibold tracking-widest text-bone uppercase transition-all duration-300 hover:bg-sauge-soft"
          >
            Commander
            <ShoppingBag className="h-3.5 w-3.5" />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-charbon/70 transition hover:text-sauge lg:hidden cursor-pointer"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-charbon/10 bg-bone/98 backdrop-blur-xl px-4 py-6 space-y-2 shadow-2xl max-h-[82vh] overflow-y-auto">
          <div className="mb-3 flex items-center justify-between border-b border-charbon/10 pb-3">
            <span className="text-[10px] tracking-[0.24em] text-sauge uppercase">
              La nutrition sportive, simplement
            </span>
          </div>

          <button
            onClick={scrollToConcept}
            className="block w-full rounded-xl px-4 py-2.5 text-sm font-semibold text-charbon/80 hover:bg-sand cursor-pointer text-left"
          >
            Concept
          </button>

          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={closeMobile}
              className={`block w-full rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                pathname === l.to
                  ? 'bg-sauge/10 text-sauge'
                  : 'text-charbon/80 hover:bg-sand'
              }`}
            >
              {l.label}
            </Link>
          ))}

          <div>
            <button
              onClick={() => setMobileObjectifsOpen(!mobileObjectifsOpen)}
              className="flex w-full items-center justify-between rounded-xl px-4 py-2.5 text-sm text-charbon/80 cursor-pointer"
            >
              Objectifs
              <ChevronDown className={`h-4 w-4 transition ${mobileObjectifsOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileObjectifsOpen && (
              <div className="ml-4 mt-1 space-y-1 border-l border-sauge/25 pl-4">
                {OBJECTIF_LINKS.map((l) => (
                  <Link key={l.to} to={l.to} onClick={closeMobile} className="block rounded-xl px-3 py-2 text-xs text-charbon/70 hover:text-sauge">
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/repas"
            onClick={closeMobile}
            className="orvyn-clip-sm mt-4 flex w-full items-center justify-center gap-2 bg-sauge py-3.5 text-sm font-semibold tracking-widest text-bone uppercase"
          >
            Commander <ShoppingBag className="h-4 w-4" />
          </Link>
        </div>
      )}
    </header>
  );
}
