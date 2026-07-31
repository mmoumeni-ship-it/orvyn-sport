import React from 'react';
import { motion } from 'motion/react';
import { Clock, Scale, Leaf, Target, Shield, Trophy, ArrowRight } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';

interface HowItWorksProps {
  setCurrentTab: (tab: string) => void;
}

export default function HowItWorks(_props: HowItWorksProps) {
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
    <section id="how-it-works-section" className="relative bg-orvyn-carbon py-24 lg:py-36 border-y border-orvyn-olive/20 overflow-hidden">
      {/* Aura discrète */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 h-[400px] w-[400px] rounded-full bg-clay/5 blur-[100px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

        {/* En-tête éditorial */}
        <div className="mb-20 lg:mb-28 flex justify-center">
          <SectionHeader
            align="center"
            eyebrow="L'ADN d'ORVYN"
            title="Pourquoi choisir ORVYN ?"
            description="Nous avons éliminé la frontière entre la haute gastronomie saine et la rigueur scientifique de la nutrition sportive d'élite."
          />
        </div>

        {/* Grille éditoriale */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {pillars.map((pillar, index) => {
            const IconComponent = pillar.icon;
            return (
              <motion.div
                id={`why-orvyn-card-${index}`}
                key={index}
                variants={cardVariants}
                className="orvyn-clip-sm depth group relative bg-carbon-raised p-8 flex flex-col justify-between overflow-hidden"
              >
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-semibold tracking-[0.18em] text-orvyn-bone/40 uppercase">
                      {pillar.tag}
                    </span>
                    <IconComponent className="h-5 w-5 text-olive transition group-hover:text-clay duration-300" />
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-display text-lg font-semibold text-orvyn-bone tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-orvyn-bone/60 leading-relaxed">
                      {pillar.description}
                    </p>
                  </div>
                </div>

                {/* Marqueur de progression */}
                <div className="mt-6 h-[2px] w-0 bg-clay group-hover:w-1/3 transition-all duration-500"></div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bandeau action */}
        <div className="mt-20 text-center animate-fade-in">
          <div className="inline-flex flex-col sm:flex-row items-center gap-6 orvyn-clip-sm border border-olive/30 bg-carbon-raised px-8 py-6 text-xs text-orvyn-bone/60">
            <span className="tracking-wide">Prêt à optimiser vos gains et votre temps libre ?</span>
            <button
              id="presentation-discover-menu"
              onClick={() => {
                const el = document.getElementById('menu-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="flex items-center gap-2 font-semibold text-orvyn-bone hover:text-clay transition group cursor-pointer"
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
