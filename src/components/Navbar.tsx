import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, ChevronDown } from 'lucide-react';

const NAV_LINKS = [
  { to: '/', label: 'Accueil' },
  { to: '/repas', label: 'Nos repas' },
  { to: '/bowls-proteines', label: 'Bowls protéinés' },
  { to: '/abonnements', label: 'Abonnements' },
  { to: '/blog', label: 'Blog' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/contact', label: 'Contact' },
];

const OBJECTIF_LINKS = [
  { to: '/repas-prise-de-masse', label: 'Prise de masse' },
  { to: '/repas-seche', label: 'Sèche' },
  { to: '/repas-post-entrainement', label: 'Récupération' },
  { to: '/repas', label: 'Équilibre alimentaire' },
];

const SHAKES_LINKS = [
  { to: '/shakes-proteines', label: 'Shakes' },
  { to: '/snacks-healthy', label: 'Snacks' },
];

function ActiveLink({ to, label }: { to: string; label: string; key?: React.Key }) {
  const { pathname } = useLocation();
  const active = pathname === to;
  return (
    <Link
      to={to}
      className={`relative py-2 transition hover:text-orvyn-performance ${active ? 'text-orvyn-performance' : 'text-orvyn-bone/70'}`}
    >
      {label}
      {active && (
        <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-orvyn-performance orvyn-clip-sm" />
      )}
    </Link>
  );
}

function DropdownLink({ to, label }: { to: string; label: string; key?: React.Key }) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-2 rounded-sm px-3 py-2 text-xs text-orvyn-bone/70 transition hover:bg-orvyn-carbon hover:text-orvyn-performance"
    >
      <span className="h-[2px] w-3 bg-orvyn-olive transition group-hover:bg-orvyn-performance" />
      {label}
    </Link>
  );
}

export default function Navbar() {
  const { pathname } = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [objectifsOpen, setObjectifsOpen] = useState(false);
  const [shakesSnacksOpen, setShakesSnacksOpen] = useState(false);
  const [mobileObjectifsOpen, setMobileObjectifsOpen] = useState(false);
  const [mobileShakesSnacksOpen, setMobileShakesSnacksOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-all duration-300 ${
        scrolled
          ? 'border-orvyn-olive/30 bg-orvyn-carbon/95 backdrop-blur-xl'
          : 'border-orvyn-olive/15 bg-orvyn-carbon/70 backdrop-blur-md'
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo — le O ORVYN */}
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="orvyn-o flex h-7 w-7 items-center justify-center border-[1.5px] border-orvyn-performance transition group-hover:border-orvyn-clay">
            <span className="h-1.5 w-1.5 rounded-full bg-orvyn-clay" />
          </span>
          <span className="font-display text-2xl font-bold tracking-[0.08em] text-orvyn-bone">
            ORVYN
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7 text-xs font-semibold tracking-[0.12em] uppercase">
          {NAV_LINKS.slice(0, 3).map((l) => (
            <ActiveLink key={l.to} to={l.to} label={l.label} />
          ))}

          {/* Objectifs */}
          <div
            className="relative"
            onMouseEnter={() => setObjectifsOpen(true)}
            onMouseLeave={() => setObjectifsOpen(false)}
          >
            <button className="flex items-center gap-1 py-2 text-orvyn-bone/70 transition hover:text-orvyn-performance cursor-pointer">
              Objectifs <ChevronDown className="h-3 w-3" />
            </button>
            {objectifsOpen && (
              <div className="absolute top-full left-1/2 mt-3 w-56 -translate-x-1/2 rounded-sm border border-orvyn-olive/30 bg-orvyn-moss p-2 shadow-2xl animate-fade-in z-50">
                <span className="block border-b border-orvyn-olive/25 px-3 pb-2 pt-1 font-mono text-[9px] tracking-[0.25em] text-orvyn-performance uppercase">
                  Choisis ton objectif
                </span>
                <div className="mt-1 space-y-0.5">
                  {OBJECTIF_LINKS.map((l) => (
                    <DropdownLink key={l.to} to={l.to} label={l.label} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Shakes & Snacks */}
          <div
            className="relative"
            onMouseEnter={() => setShakesSnacksOpen(true)}
            onMouseLeave={() => setShakesSnacksOpen(false)}
          >
            <button className="flex items-center gap-1 py-2 text-orvyn-bone/70 transition hover:text-orvyn-performance cursor-pointer">
              Shakes & Snacks <ChevronDown className="h-3 w-3" />
            </button>
            {shakesSnacksOpen && (
              <div className="absolute top-full left-1/2 mt-3 w-48 -translate-x-1/2 rounded-sm border border-orvyn-olive/30 bg-orvyn-moss p-2 shadow-2xl animate-fade-in z-50">
                <div className="space-y-0.5">
                  {SHAKES_LINKS.map((l) => (
                    <DropdownLink key={l.to} to={l.to} label={l.label} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {NAV_LINKS.slice(3).map((l) => (
            <ActiveLink key={l.to} to={l.to} label={l.label} />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/repas"
            className="orvyn-clip-sm relative hidden sm:inline-flex items-center gap-2 overflow-hidden bg-orvyn-performance px-5 py-2.5 text-[10px] font-bold tracking-widest text-orvyn-carbon uppercase transition-all duration-300 hover:bg-white"
          >
            Commander
            <ShoppingBag className="h-3.5 w-3.5" />
          </Link>

          <Link
            to="/repas"
            className="relative p-2 text-orvyn-bone/70 transition hover:text-orvyn-performance lg:hidden"
            aria-label="Commander"
          >
            <ShoppingBag className="h-5 w-5" />
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-orvyn-bone/70 transition hover:text-orvyn-performance lg:hidden cursor-pointer"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-orvyn-olive/25 bg-orvyn-carbon/98 backdrop-blur-xl px-4 py-6 space-y-2 shadow-2xl max-h-[82vh] overflow-y-auto">
          <div className="mb-3 flex items-center justify-between border-b border-orvyn-olive/25 pb-3">
            <span className="font-mono text-[9px] tracking-[0.3em] text-orvyn-performance uppercase">
              Le rythme de la performance
            </span>
          </div>

          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={closeMobile}
              className={`block w-full rounded-sm px-4 py-2.5 text-sm font-semibold transition ${
                pathname === l.to
                  ? 'bg-orvyn-performance/10 text-orvyn-performance'
                  : 'text-orvyn-bone/80 hover:bg-orvyn-carbon'
              }`}
            >
              {l.label}
            </Link>
          ))}

          <div>
            <button
              onClick={() => setMobileObjectifsOpen(!mobileObjectifsOpen)}
              className="flex w-full items-center justify-between rounded-sm px-4 py-2.5 text-sm text-orvyn-bone/80 cursor-pointer"
            >
              Objectifs
              <ChevronDown className={`h-4 w-4 transition ${mobileObjectifsOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileObjectifsOpen && (
              <div className="ml-4 mt-1 space-y-1 border-l border-orvyn-olive/30 pl-4">
                {OBJECTIF_LINKS.map((l) => (
                  <Link key={l.to} to={l.to} onClick={closeMobile} className="block rounded-sm px-3 py-2 text-xs text-orvyn-bone/70 hover:text-orvyn-performance">
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div>
            <button
              onClick={() => setMobileShakesSnacksOpen(!mobileShakesSnacksOpen)}
              className="flex w-full items-center justify-between rounded-sm px-4 py-2.5 text-sm text-orvyn-bone/80 cursor-pointer"
            >
              Shakes & Snacks
              <ChevronDown className={`h-4 w-4 transition ${mobileShakesSnacksOpen ? 'rotate-180' : ''}`} />
            </button>
            {mobileShakesSnacksOpen && (
              <div className="ml-4 mt-1 space-y-1 border-l border-orvyn-olive/30 pl-4">
                {SHAKES_LINKS.map((l) => (
                  <Link key={l.to} to={l.to} onClick={closeMobile} className="block rounded-sm px-3 py-2 text-xs text-orvyn-bone/70 hover:text-orvyn-performance">
                    {l.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            to="/repas"
            onClick={closeMobile}
            className="orvyn-clip-sm mt-4 flex w-full items-center justify-center gap-2 bg-orvyn-performance py-3.5 text-sm font-bold tracking-widest text-orvyn-carbon uppercase"
          >
            Commander <ShoppingBag className="h-4 w-4" />
          </Link>
        </div>
      )}
    </header>
  );
}
