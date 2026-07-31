import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, ShieldCheck, BarChart3, Zap, Trophy, Dumbbell, Timer } from 'lucide-react';
import heroImg from '../assets/images/orvyn-hero-founder.png';

interface HeroSectionProps {
  setCurrentTab?: (tab: string) => void;
  onOpenAuth?: () => void;
}

const macroMarkers = [
  { icon: Dumbbell, value: '55g', label: 'protéines' },
  { icon: Zap, value: '574', label: 'kcal' },
  { icon: Timer, value: '30s', label: 'commande' },
];

export default function HeroSection(_props: HeroSectionProps) {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-orvyn-moss py-20 lg:py-28">
      {/* Texture + grille subtile */}
      <div className="absolute inset-0 bg-orvyn-texture pointer-events-none" />
      <div className="absolute inset-0 bg-grain opacity-50 pointer-events-none" />

      {/* Performance line haute */}
      <div className="absolute top-0 left-0 right-0 performance-line" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:items-center">

          {/* Hero Left */}
          <div className="space-y-9 lg:col-span-7 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex self-start items-center gap-2 rounded-sm border border-orvyn-olive/40 bg-orvyn-carbon/60 px-3.5 py-1 font-mono text-[10px] font-bold tracking-[0.25em] text-orvyn-performance uppercase"
            >
              <Sparkles className="h-3 w-3 animate-pulse" />
              <span>Le rythme de la performance</span>
            </motion.div>

            <div className="space-y-5">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="font-display text-5xl font-bold leading-[0.98] tracking-[-0.01em] text-orvyn-bone sm:text-7xl lg:text-[5.5rem]"
              >
                Des repas sportifs
                <br />
                <span className="text-orvyn-performance">adaptés à tes</span>
                <br />
                <span className="relative inline-block">
                  objectifs
                  <span className="absolute -bottom-1 left-0 right-0 h-[3px] bg-orvyn-clay orvyn-clip-sm" />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-xl text-sm leading-relaxed text-orvyn-bone/70 sm:text-base"
              >
                Bowls protéinés, shakes et snacks pensés pour la prise de masse, la sèche et la récupération. Mange mieux après l'effort, sans perdre de temps.
              </motion.p>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-1"
            >
              <button
                onClick={() => navigate('/repas')}
                className="orvyn-clip-sm group relative inline-flex items-center justify-center gap-2 overflow-hidden bg-orvyn-performance px-8 py-4 text-xs font-bold tracking-widest text-orvyn-carbon uppercase transition-all duration-300 hover:bg-white cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Découvrir les repas
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                <span className="absolute inset-y-0 left-0 w-1/3 -translate-x-full bg-black/10 transition-transform duration-500 group-hover:translate-x-0" />
              </button>

              <button
                onClick={() => navigate('/repas')}
                className="orvyn-clip-sm relative inline-flex items-center justify-center gap-2 overflow-hidden border border-orvyn-olive/60 bg-transparent px-8 py-4 text-xs font-bold tracking-widest text-orvyn-bone uppercase transition-all duration-300 hover:border-orvyn-performance cursor-pointer"
              >
                <span className="relative z-10">Choisir mon objectif</span>
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-orvyn-performance transition-all duration-500 group-hover:w-full" />
              </button>
            </motion.div>

            {/* Reassurance */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.45 }}
              className="pt-5"
            >
              <div className="performance-line mb-5" aria-hidden="true" />
              <div className="flex flex-wrap items-center gap-x-7 gap-y-3 font-mono text-[11px] tracking-wider text-orvyn-bone/60">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-orvyn-performance" />
                  <span>Riche en protéines</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-orvyn-performance" />
                  <span>Infos nutritionnelles claires</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-orvyn-performance" />
                  <span>Commande simple et rapide</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Hero Right — cadre « O » ORVYN */}
          <div className="relative lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md"
            >
              {/* Grand O décoratif */}
              <div
                className="orvyn-o pointer-events-none absolute -top-8 -right-6 h-32 w-32 text-orvyn-performance/20"
                aria-hidden="true"
              />

              {/* Cadre O avec dégradé conique */}
              <div className="orvyn-o-frame">
                <div className="relative overflow-hidden orvyn-clip-img bg-orvyn-carbon">
                  <img
                    src={heroImg}
                    alt="Fondatrice ORVYN - Nutrition Sportive Premium"
                    className="aspect-[4/5] h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-orvyn-carbon/70 via-transparent to-transparent" />

                  {/* Badge bas — marqueur nutrition */}
                  <div className="absolute bottom-5 right-5 rounded-sm border border-orvyn-olive/40 bg-orvyn-carbon/85 px-4 py-3 backdrop-blur-sm">
                    <p className="font-mono text-[9px] tracking-[0.25em] text-orvyn-performance uppercase">Objectif</p>
                    <p className="mt-0.5 font-display text-sm font-bold text-orvyn-bone">Sèche • Récupération</p>
                  </div>
                </div>
              </div>

              {/* Marqueurs macro — colonne latérale */}
              <motion.div
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -left-5 top-1/2 -translate-y-1/2 hidden sm:flex flex-col gap-3"
              >
                {macroMarkers.map((m) => (
                  <div
                    key={m.label}
                    className="orvyn-clip-sm flex items-center gap-2.5 border border-orvyn-olive/40 bg-orvyn-carbon/90 px-3.5 py-2.5 backdrop-blur-sm"
                  >
                    <m.icon className="h-3.5 w-3.5 text-orvyn-clay" />
                    <div>
                      <p className="font-display text-base font-bold leading-none text-orvyn-bone">{m.value}</p>
                      <p className="font-mono text-[8px] tracking-widest text-orvyn-bone/50 uppercase">{m.label}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Badge fondatrice */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute -bottom-5 -left-4 sm:left-6 z-20 inline-flex items-center gap-3 rounded-sm border border-orvyn-olive/40 bg-orvyn-carbon/90 px-4 py-3 backdrop-blur-sm"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orvyn-performance/15">
                  <Trophy className="h-4 w-4 text-orvyn-performance" />
                </div>
                <div>
                  <p className="font-mono text-[9px] tracking-[0.25em] text-orvyn-bone/50 uppercase">Fondatrice</p>
                  <p className="font-display text-sm font-bold text-orvyn-bone">Fondatrice ORVYN</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
