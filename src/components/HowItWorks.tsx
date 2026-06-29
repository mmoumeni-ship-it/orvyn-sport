import React from 'react';
import { motion } from 'motion/react';
import { Clock, Scale, Leaf, Target, Shield, Heart, Trophy, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  setCurrentTab: (tab: string) => void;
}

export default function HowItWorks({ setCurrentTab }: HowItWorksProps) {
  const pillars = [
    {
      icon: Clock,
      title: 'Gain de temps absolu',
      description: 'Zéro course, zéro vaisselle, zéro préparation. Vos repas d\'élite sont prêts à consommer en moins de 2 minutes pour optimiser votre fenêtre anabolique.',
      tag: '01 • RAPIDITÉ'
    },
    {
      icon: Scale,
      title: 'Nutrition équilibrée',
      description: 'Chaque recette est formulée par des médecins nutritionnistes sportifs pour offrir le parfait équilibre d\'acides aminés, de lipides sains et de glucides complexes.',
      tag: '02 • ÉQUILIBRE'
    },
    {
      icon: Leaf,
      title: 'Ingrédients frais d\'exception',
      description: 'Aucun produit surgelé ou ultra-transformé. Nous cuisinons chaque matin des viandes fermières françaises, des poissons sauvages et des légumes biologiques locaux.',
      tag: '03 • FRAÎCHEUR'
    },
    {
      icon: Target,
      title: 'Macros mesurées au gramme',
      description: 'Une rigueur scientifique absolue. Les glucides, lipides et protéines sont pesés avec précision. Idéal pour MyFitnessPal et le suivi de vos statistiques.',
      tag: '04 • RIGUEUR'
    },
    {
      icon: Trophy,
      title: 'Haute teneur en protéines',
      description: 'Jusqu\'à 55g de protéines pures par portion provenant de sources de haute valeur biologique (isoleucines, leucine, valine) pour maximiser votre hypertrophie.',
      tag: '05 • PERFORMANCE'
    },
    {
      icon: Shield,
      title: 'Transparence totale',
      description: 'Origines géographiques traçables de A à Z. Aucun conservateur, aucun sucre raffiné caché, aucun arôme artificiel. Notre charte qualité est sans compromis.',
      tag: '06 • CONFIANCE'
    }
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="how-it-works-section" className="relative bg-[#050505] py-24 lg:py-36 border-y border-neutral-900 overflow-hidden">
      {/* Soft circular aura background indicator */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-brand-green/5 blur-[100px] pointer-events-none"></div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Title & Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20 lg:mb-28">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-green font-bold block">
            L'ADN D'ORVYN
          </span>
          <h2 className="font-display text-3xl font-extrabold text-white sm:text-5xl tracking-[-0.03em] leading-tight">
            Pourquoi choisir ORVYN ?
          </h2>
          <p className="text-sm text-neutral-400 font-sans max-w-xl mx-auto">
            Nous avons éliminé la frontière entre la haute gastronomie saine et la rigueur scientifique de la nutrition sportive d'élite.
          </p>
        </div>

        {/* Bento-style Luxury Grid layout */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <motion.div
                id={`why-orvyn-card-${index}`}
                key={index}
                variants={cardVariants}
                className="group relative rounded-2xl border border-neutral-900 bg-[#0a0a0a] p-8 hover:border-brand-green/20 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Subtle shine on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.01] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="space-y-6">
                  {/* Micro tag category */}
                  <div className="flex justify-between items-center">
                    <span className="font-mono text-[9px] font-bold text-neutral-500 tracking-wider">
                      {pillar.tag}
                    </span>
                    <IconComponent className="h-5 w-5 text-neutral-400 group-hover:text-brand-green transition-colors duration-300" />
                  </div>

                  {/* Pillar content */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-bold text-white tracking-tight font-display">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-neutral-400 leading-relaxed font-sans font-light">
                      {pillar.description}
                    </p>
                  </div>
                </div>

                {/* Micro accent block at bottom */}
                <div className="h-0.5 w-0 bg-brand-green group-hover:w-1/3 transition-all duration-500 mt-6 rounded-full"></div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom micro Action banner */}
        <div className="mt-20 text-center animate-fade-in">
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 rounded-3xl border border-neutral-900 bg-[#090909] px-8 py-5.5 text-xs text-neutral-400">
            <span className="font-mono tracking-wider">Prêt à optimiser vos gains et votre temps libre ?</span>
            <button
              id="presentation-discover-menu"
              onClick={() => {
                const el = document.getElementById('menu-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 font-bold text-white hover:text-brand-green transition group cursor-pointer"
            >
              <span>Découvrir notre carte gastronomique</span>
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
