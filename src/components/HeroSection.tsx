import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ChefHat, BarChart3, Zap, Volume2, VolumeX } from 'lucide-react';
import OrvynButton from './ui/OrvynButton';

interface HeroSectionProps {
  setCurrentTab?: (tab: string) => void;
  onOpenAuth?: () => void;
}

const trustItems = [
  { icon: ChefHat, label: 'Préparé chaque matin par nos chefs' },
  { icon: BarChart3, label: 'Macros transparentes sur chaque recette' },
  { icon: Zap, label: 'Retrait au stand en 30 secondes' },
];

export default function HeroSection(_props: HeroSectionProps) {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

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

  const toggleSound = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    setIsMuted(video.muted);
  };

  const scrollToConcept = () => {
    const el = document.getElementById('comment-ca-marche');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else navigate('/menu');
  };

  return (
    <section className="relative overflow-hidden bg-bone py-24 lg:py-32">
      <div className="absolute inset-0 bg-matiere-light pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 performance-line" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-12 lg:gap-14 lg:items-center">

          {/* Colonne gauche — le message */}
          <div className="lg:col-span-5 space-y-9 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3"
            >
              <span className="orvyn-o flex h-4 w-4 items-center justify-center border-[1.5px] border-sauge">
                <span className="h-1 w-1 rounded-full bg-sauge" />
              </span>
              <span className="text-xs uppercase tracking-[0.24em] font-semibold text-sauge">
                La nutrition sportive, simplement
              </span>
            </motion.div>

            <div className="space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="h-editorial text-charbon"
              >
                Votre repas sportif, prêt{' '}
                <span className="text-sauge">après votre séance.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-xl text-[15px] leading-relaxed text-charbon/70 sm:text-base"
              >
                Commandez avant l'entraînement, récupérez votre bowl ou votre shake au stand ORVYN et choisissez une nutrition adaptée à votre objectif.
              </motion.p>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
            >
              <OrvynButton to="/menu" variant="primary">
                Commander mon repas
              </OrvynButton>
              <OrvynButton onClick={scrollToConcept} variant="secondary" light>
                Découvrir le concept
              </OrvynButton>
            </motion.div>

            {/* Réassurance discrète */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.45 }}
            >
              <div className="mb-6 hairline bg-charbon/10" aria-hidden="true" />
              <ul className="space-y-2.5 text-xs text-charbon/60">
                {trustItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <li key={item.label} className="flex items-center gap-2.5">
                      <Icon className="h-3.5 w-3.5 text-sauge" />
                      {item.label}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </div>

          {/* Colonne droite — la vidéo */}
          <div className="relative lg:col-span-7 flex justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-3xl"
            >
              {/* Grand O décoratif */}
              <div
                className="orvyn-o pointer-events-none absolute -top-10 -right-4 h-40 w-40 text-sauge/15"
                aria-hidden="true"
              />

              {/* Cadre offset — filaire décalé */}
              <div
                className="absolute -bottom-5 -left-5 h-full w-full rounded-[24px] border border-sauge/25"
                aria-hidden="true"
              />

              {/* La vidéo */}
              <div className="relative overflow-hidden rounded-[24px] bg-beige shadow-[0_24px_60px_-30px_rgba(23,26,24,0.35)]">
                <video
                  ref={videoRef}
                  className="aspect-video w-full object-cover"
                  src="/videos/hero.mp4"
                  autoPlay={!reducedMotion}
                  muted={isMuted}
                  loop
                  playsInline
                  preload="auto"
                  controlsList="nodownload noplaybackrate nofullscreen"
                  disablePictureInPicture
                  tabIndex={-1}
                  aria-label="Une personne commande son repas au comptoir ORVYN"
                />
                <div className="photo-grain" aria-hidden="true" />
                <div
                  className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-inset ring-charbon/10"
                  aria-hidden="true"
                />

                {/* Badge concept */}
                <div className="absolute bottom-4 left-4 rounded-full bg-bone/90 px-4 py-2.5 backdrop-blur-sm">
                  <p className="text-[9px] uppercase tracking-[0.2em] font-semibold text-sauge">Le concept ORVYN</p>
                  <p className="mt-0.5 text-xs font-semibold text-charbon">Commandez avant. Récupérez après.</p>
                </div>

                {/* Son */}
                <button
                  type="button"
                  onClick={toggleSound}
                  aria-pressed={!isMuted}
                  aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
                  title={isMuted ? 'Activer le son' : 'Couper le son'}
                  className="absolute bottom-4 right-4 z-10 inline-flex h-10 w-10 items-center justify-center rounded-full bg-charbon/55 text-bone backdrop-blur-sm ring-1 ring-inset ring-bone/20 transition-all duration-300 hover:bg-charbon/75 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  {isMuted ? (
                    <VolumeX className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Volume2 className="h-4 w-4" aria-hidden="true" />
                  )}
                </button>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
