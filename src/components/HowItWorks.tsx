import React from 'react';
import { motion } from 'motion/react';
import { Smartphone, Dumbbell, QrCode } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';

interface HowItWorksProps {
  setCurrentTab: (tab: string) => void;
}

const steps = [
  {
    icon: Smartphone,
    number: '01',
    title: 'Commandez avant votre séance',
    description: 'Choisissez votre bowl, votre shake ou votre snack et réglez en quelques secondes, depuis votre téléphone ou le site.',
  },
  {
    icon: Dumbbell,
    number: '02',
    title: 'Entraînez-vous pendant la préparation',
    description: 'Votre repas est préparé au stand pendant que vous vous dépensez. Rien à faire de votre côté.',
  },
  {
    icon: QrCode,
    number: '03',
    title: 'Scannez et récupérez',
    description: 'À la fin de la séance, présentez votre code au stand ORVYN et récupérez votre commande sans attendre.',
  },
];

export default function HowItWorks(_props: HowItWorksProps) {
  return (
    <section id="comment-ca-marche" className="relative bg-bone py-24 lg:py-32 border-y border-charbon/8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex justify-center">
          <SectionHeader
            align="center"
            light
            eyebrow="Simple et rapide"
            title="Comment ça marche ?"
            description="Trois étapes, zéro contrainte. Votre repas vous attend à la fin de la séance."
          />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="orvyn-clip-sm depth-light group relative bg-sand p-9 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sauge text-bone">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="numero text-3xl text-sauge/30 transition group-hover:text-sauge/60">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-7 font-display text-lg font-bold text-charbon tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-charbon/65">
                  {step.description}
                </p>
                {index < steps.length - 1 && (
                  <span className="absolute right-9 top-1/2 hidden -translate-y-1/2 h-px w-6 bg-sauge/25 md:block" aria-hidden="true" />
                )}
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
