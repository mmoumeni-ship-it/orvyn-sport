import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Flame, Trophy, Sparkles, ShieldCheck } from 'lucide-react';
import heroImg from '../assets/images/orvyn-hero-founder.png';

interface HeroSectionProps {
  setCurrentTab: (tab: string) => void;
  onOpenAuth: () => void;
}

export default function HeroSection({ setCurrentTab, onOpenAuth }: HeroSectionProps) {
  const handleScrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#050505] py-20 lg:py-32">
      {/* Subtle ambient light maps - No kitsch gradients, just high-end soft glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[500px] w-[500px] sm:h-[800px] sm:w-[800px] rounded-full bg-brand-green/5 blur-[120px] pointer-events-none"></div>
      
      {/* Background grain element */}
      <div className="absolute inset-0 bg-grain opacity-60 pointer-events-none -z-10"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-center">
          
          {/* Hero Left: Text & Actions */}
          <div className="space-y-10 lg:col-span-7 flex flex-col justify-center">
            
            {/* Tagline micro-label inspired by Apple & WHOOP */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex self-start items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950 px-3.5 py-1 text-[10px] font-mono font-bold tracking-widest text-neutral-400 uppercase"
            >
              <Sparkles className="h-3 w-3 text-brand-green animate-pulse" />
              <span>SÉLECTION ATHLÈTE • HAUTE GASTRONOMIE SPORTIVE</span>
            </motion.div>

            {/* Main title */}
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-4xl font-extrabold tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl leading-[1.05]"
              >
                La nutrition sportive <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-brand-green">
                  réinventée.
                </span>
              </motion.h1>

              {/* Concept description */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-sm sm:text-base text-neutral-400 font-sans leading-relaxed max-w-xl font-normal"
              >
                Des repas riches en protéines, frais, équilibrés et préparés pour accompagner chaque objectif sportif.
              </motion.p>
            </div>

            {/* CTA Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
            >
              <button
                id="hero-cta-order"
                onClick={() => handleScrollToSection('menu-section')}
                className="group flex items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-xs font-bold text-black tracking-wider uppercase transition-all duration-300 hover:bg-brand-green hover:shadow-[0_0_20px_rgba(16,185,129,0.3)] cursor-pointer"
              >
                <span>Commander maintenant</span>
                <ArrowRight className="h-3.5 w-3.5 transition duration-300 group-hover:translate-x-1" />
              </button>

              <button
                id="hero-cta-discover"
                onClick={() => handleScrollToSection('subscriptions-section')}
                className="flex items-center justify-center gap-2 rounded-full border border-neutral-800 bg-neutral-950 px-8 py-4 text-xs font-bold text-neutral-300 tracking-wider uppercase transition-all duration-300 hover:border-neutral-500 hover:text-white cursor-pointer"
              >
                <span>Découvrir les abonnements</span>
              </button>
            </motion.div>

            {/* Core benefits summary checklist */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="pt-8 border-t border-neutral-900 grid grid-cols-1 sm:grid-cols-2 gap-4 text-[11px] font-mono tracking-wider text-neutral-500 uppercase"
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="h-4 w-4 text-brand-green shrink-0" />
                <span>Ingrédients frais d'origine contrôlée</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Trophy className="h-4 w-4 text-brand-green shrink-0" />
                <span>Rapports de macros pesés au gramme</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Flame className="h-4 w-4 text-brand-green shrink-0" />
                <span>Recettes de chefs de la FoodTech</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Sparkles className="h-4 w-4 text-brand-green shrink-0" />
                <span>Haute digestibilité & performance</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Right: Stunning high-end responsive visual layout */}
          <div className="relative lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg"
            >
              {/* Image Frame - Immersive dark background with luxury finish */}
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950 p-2 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-70"></div>
                
                <img
                  src={heroImg}
                  alt="Fondatrice ORVYN - Nutrition Sportive Premium"
                  className="h-full w-full object-cover rounded-2xl transition-all duration-700"
                />

                {/* Floating Micro-Badge 2: Premium nutrition */}
                <motion.div 
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute bottom-8 right-6 z-20 rounded-2xl bg-black/80 border border-neutral-800 p-4.5 shadow-2xl backdrop-blur-xl flex items-center gap-3.5 max-w-[210px]"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-950 text-brand-green">
                    <Flame className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-mono text-[9px] text-neutral-500 font-semibold uppercase tracking-widest">ORVYN</p>
                    <p className="font-display text-sm font-extrabold text-white">💪 Nutrition sportive premium</p>
                  </div>
                </motion.div>
              </div>

              {/* Floating Micro-Badge 1: Founder branding — shifted outside the frame */}
              <motion.div 
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                className="relative -mt-6 ml-4 sm:ml-6 z-20 inline-flex items-center gap-3.5 rounded-2xl bg-black/80 border border-neutral-800 p-4.5 shadow-2xl backdrop-blur-xl max-w-[260px] hover:shadow-[0_0_25px_rgba(16,185,129,0.25)] hover:-translate-y-0.5 transition-all duration-300"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
                  <Trophy className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-mono text-[9px] text-neutral-500 font-semibold uppercase tracking-widest">FONDATRICE</p>
                  <p className="font-display text-sm font-extrabold text-white">🏆 Fondatrice ORVYN</p>
                </div>
              </motion.div>

              {/* Decorative background glow behind container frame */}
              <div className="absolute -inset-1.5 -z-10 rounded-[32px] bg-brand-green opacity-[0.08] blur-xl"></div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
