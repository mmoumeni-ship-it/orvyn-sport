import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, BarChart3, Zap, Dumbbell, Timer } from 'lucide-react';

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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play().catch(() => {});
    }
  }, [reducedMotion]);

  return (
    <section className="relative overflow-hidden bg-carbon py-24 lg:py-32">
      {/* Matière ORVYN */}
      <div className="absolute inset-0 bg-matiere pointer-events-none" />

      {/* Ligne de progression haute */}
      <div className="absolute top-0 left-0 right-0 performance-line" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-12 lg:items-center">

          {/* Hero Left — le récit (40-45 %) */}
          <div className="space-y-9 lg:col-span-5 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3"
            >
              <span className="orvyn-o flex h-4 w-4 items-center justify-center border-[1.5px] border-clay">
                <span className="h-1 w-1 rounded-full bg-clay" />
              </span>
              <span className="text-xs uppercase tracking-[0.24em] font-semibold text-clay">
                Le rythme de la performance
              </span>
            </motion.div>

            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="h-editorial text-orvyn-bone"
              >
                La nutrition de
                <br />
                performance.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-xl text-[15px] leading-relaxed text-orvyn-bone/70 sm:text-base"
              >
                Bowls protéinés, shakes et snacks préparés pour la prise de masse, la sèche et la récupération. Mange mieux après l'effort, sans perdre de temps.
              </motion.p>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <button
                onClick={() => navigate('/repas')}
                className="orvyn-clip-sm group relative inline-flex items-center justify-center gap-2 overflow-hidden bg-lime px-8 py-4 text-xs font-semibold tracking-widest text-carbon uppercase transition-all duration-300 hover:bg-lime-soft cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Découvrir les repas
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>

              <button
                onClick={() => navigate('/repas')}
                className="orvyn-clip-sm group relative inline-flex items-center justify-center gap-2 overflow-hidden border border-olive/50 bg-transparent px-8 py-4 text-xs font-semibold tracking-widest text-orvyn-bone uppercase transition-all duration-300 hover:border-bone/50 cursor-pointer"
              >
                <span className="relative z-10">Choisir mon objectif</span>
                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-clay transition-all duration-500 group-hover:w-full" />
              </button>
            </motion.div>

            {/* Réassurance discrète */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.45 }}
            >
              <div className="performance-line mb-6" aria-hidden="true" />
              <div className="flex flex-wrap items-center gap-x-7 gap-y-3 text-[11px] tracking-wide text-orvyn-bone/60">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-olive" />
                  <span>Riche en protéines</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-olive" />
                  <span>Infos nutritionnelles claires</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-olive" />
                  <span>Commande simple et rapide</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Hero Right — la vidéo est la pièce maîtresse (55-60 %) */}
          <div className="relative lg:col-span-7 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl"
            >
              {/* Grand O décoratif */}
              <div
                className="orvyn-o pointer-events-none absolute -top-10 -right-4 h-40 w-40 text-clay/15"
                aria-hidden="true"
              />

              {/* Cadre offset — filaire décalé */}
              <div
                className="absolute -bottom-5 -left-5 h-full w-full rounded-[1.5rem] border border-olive/25"
                aria-hidden="true"
              />

              {/* La vidéo */}
              <div className="relative overflow-hidden rounded-[1.5rem] bg-carbon-raised shadow-[0_24px_80px_-28px_rgba(0,0,0,0.65)]">
                <video
                  ref={videoRef}
                  className="aspect-video w-full object-cover"
                  src="/videos/hero.mp4"
                  autoPlay={!reducedMotion}
                  muted
                  loop
                  playsInline
                  preload="auto"
                  controlsList="nodownload noplaybackrate nofullscreen"
                  disablePictureInPicture
                  aria-hidden="true"
                  tabIndex={-1}
                />
                {/* grain photo pour la cohérence visuelle */}
                <div className="photo-grain" aria-hidden="true" />
                {/* liseré intérieur */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ring-orvyn-bone/10"
                  aria-hidden="true"
                />

                {/* Badge — marqueur concept */}
                <div className="absolute bottom-4 right-4 rounded-sm bg-carbon/80 px-4 py-3 backdrop-blur-sm">
                  <p className="text-[10px] uppercase tracking-[0.22em] font-semibold text-lime">Le concept ORVYN</p>
                  <p className="mt-1 text-sm font-semibold text-orvyn-bone">Repas adaptés à l'entraînement</p>
                </div>
              </div>

              {/* Marqueurs macro — colonne latérale */}
              <motion.div
                initial={{ opacity: 0, x: -14 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -left-4 top-1/2 -translate-y-1/2 hidden sm:flex flex-col gap-3"
              >
                {macroMarkers.map((m) => (
                  <div
                    key={m.label}
                    className="orvyn-clip-sm flex items-center gap-2.5 bg-carbon/90 px-3.5 py-2.5 backdrop-blur-sm"
                  >
                    <m.icon className="h-3.5 w-3.5 text-clay" />
                    <div>
                      <p className="text-base font-semibold leading-none text-orvyn-bone">{m.value}</p>
                      <p className="text-[9px] tracking-[0.18em] text-orvyn-bone/50 uppercase">{m.label}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Annotation — la promesse */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-6 text-center text-[11px] tracking-[0.14em] text-orvyn-bone/45 uppercase"
              >
                Manger mieux après l'effort — sans perdre de temps
              </motion.p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
