import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Award } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';

interface SubscriptionsSectionProps {
  onSelectPlan?: (planName: string) => void;
  onOpenAuth: () => void;
}

export default function SubscriptionsSection({ onSelectPlan, onOpenAuth }: SubscriptionsSectionProps) {
  const [selectedPlan, setSelectedPlan] = useState<string>('Pro');

  const plans = [
    {
      name: 'Start',
      price: '49',
      credits: '5 crédits repas',
      description: 'Idéal pour les athlètes s\'entraînant 1 à 2 fois par semaine et souhaitant optimiser leur récupération.',
      features: [
        '5 crédits repas gastronomiques / mois',
        'Accès illimité aux casiers connectés',
        'Fiches macros nutritionnelles complètes',
        'Support client standard par e-mail'
      ],
      badge: '',
      popular: false,
      cta: 'Démarrer l\'expérience'
    },
    {
      name: 'Pro',
      price: '129',
      credits: '15 crédits repas',
      description: 'Le plan ultime pour les sportifs réguliers cherchant une rigueur nutritionnelle optimale sans compromis.',
      features: [
        '15 crédits repas gastronomiques / mois',
        'Accès illimité aux casiers connectés',
        'Fiches macros nutritionnelles complètes',
        'Support diététique par chat intégré',
        'Personnalisation légère des ingrédients',
        'Badge membre Prioritaire'
      ],
      badge: 'Le plus populaire',
      popular: true,
      cta: 'Devenir membre Pro'
    },
    {
      name: 'Elite',
      price: '239',
      credits: '30 crédits repas',
      description: 'Destiné aux athlètes d\'élite, professionnels et passionnés exigeant une prise en charge absolue de leur nutrition.',
      features: [
        '30 crédits repas gastronomiques / mois',
        'Réservation garantie des casiers aux heures de pointe',
        'Suivi hebdomadaire avec un coach nutritionniste dédié',
        'Personnalisation complète sur-mesure (allergies, macros cibles)',
        'Accès prioritaire aux nouvelles recettes en avant-première',
        'Invitations exclusives aux masterclasses de chefs ORVYN'
      ],
      badge: 'Meilleur rapport qualité/prix',
      popular: false,
      cta: 'Atteindre l\'Élite'
    }
  ];

  const comparisons = [
    { feature: 'Crédits repas inclus', start: '5 repas / mois', pro: '15 repas / mois', elite: '30 repas / mois' },
    { feature: 'Tarif moyen par plat', start: '9,80 € / repas', pro: '8,60 € / repas', elite: '7,90 € / repas' },
    { feature: 'Accès casiers thermo-régulés', start: 'Oui (Standard)', pro: 'Oui (Standard)', elite: 'Oui (Prioritaire garanti)' },
    { feature: 'Calcul & Intégration Macros', start: 'Oui', pro: 'Oui (Suivi personnalisé)', elite: 'Oui (Coach dédié)' },
    { feature: 'Suivi par un nutritionniste', start: 'Non', pro: 'Par chat', elite: 'Consultations visio / Hebdo' },
    { feature: 'Modifications ingrédients', start: 'Non', pro: 'Légères options', elite: 'Sur-mesure total' },
    { feature: 'Avantages exclusifs', start: 'Non', pro: 'Non', elite: 'Invitations VIP & Masterclasses' }
  ];

  const handleSubscribeClick = (planName: string) => {
    if (onSelectPlan) {
      onSelectPlan(planName);
    } else {
      onOpenAuth();
    }
  };

  return (
    <section id="subscriptions-section" className="relative bg-bone py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="mb-16 flex justify-center">
          <SectionHeader
            align="center"
            light
            eyebrow="Abonnements"
            title="Votre alimentation sportive, sans improviser"
            description="Une formule adaptée à votre rythme : économisez sur vos repas et profitez d'avantages concrets."
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch mb-20 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              id={`plan-card-${plan.name}`}
              key={plan.name}
              className={`orvyn-clip-sm depth-light relative bg-sand p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                selectedPlan === plan.name ? 'ring-1 ring-sauge/50' : ''
              } ${plan.popular ? 'bg-beige' : ''}`}
              onClick={() => setSelectedPlan(plan.name)}
            >
              <div>
                {plan.badge && (
                  <span className={`absolute -top-3.5 left-1/2 -translate-x-1/2 text-[9px] font-semibold px-4 py-1.5 uppercase tracking-widest rounded-full whitespace-nowrap ${
                    plan.popular
                      ? 'bg-sauge text-bone'
                      : 'bg-charbon text-bone'
                  }`}>
                    {plan.badge}
                  </span>
                )}

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-start">
                    <h3 className="font-display text-xl font-bold text-charbon tracking-tight">{plan.name}</h3>
                    <span className="text-[10px] font-semibold tracking-wider text-sauge bg-sauge/10 px-2.5 py-1 rounded-full">
                      {plan.credits}
                    </span>
                  </div>

                  <div className="flex items-baseline text-charbon">
                    <span className="text-4xl font-bold tracking-tight">{plan.price}</span>
                    <span className="text-lg font-medium text-charbon/50 ml-1">€</span>
                    <span className="text-xs text-charbon/40 tracking-widest uppercase ml-2">/ mois</span>
                  </div>

                  <p className="text-xs text-charbon/60 leading-relaxed min-h-[48px]">
                    {plan.description}
                  </p>
                </div>

                <div className="border-t border-charbon/10 pt-6 space-y-4">
                  <p className="text-[10px] font-semibold text-charbon/40 uppercase tracking-widest">Inclus dans la formule :</p>
                  <ul className="space-y-3">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3 text-xs text-charbon/70">
                        <Check className="h-4 w-4 text-sauge shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-charbon/10">
                <button
                  id={`subscribe-btn-${plan.name}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSubscribeClick(plan.name);
                  }}
                  className={`orvyn-clip-sm w-full py-3 text-[11px] font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    plan.popular
                      ? 'bg-sauge text-bone hover:bg-sauge-soft'
                      : 'border border-charbon/20 text-charbon hover:border-charbon/40'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 max-w-5xl mx-auto"
        >
          <div className="text-center mb-10">
            <h3 className="font-display text-lg font-bold text-charbon tracking-tight flex items-center justify-center gap-2">
              <Award className="h-5 w-5 text-sauge" />
              Tableau comparatif
            </h3>
            <p className="text-xs text-charbon/50 mt-1">Comparez nos formules et trouvez celle qui correspond à votre rythme.</p>
          </div>

          <div className="overflow-x-auto orvyn-clip-sm depth-light bg-sand">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-charbon/10 text-[10px] tracking-widest uppercase text-charbon/40">
                  <th className="p-5 font-semibold">Avantages & Caractéristiques</th>
                  <th className="p-5 text-center font-semibold">Start</th>
                  <th className="p-5 text-center font-semibold text-sauge">Pro</th>
                  <th className="p-5 text-center font-semibold">Elite</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-charbon/10 text-charbon/70">
                {comparisons.map((row, index) => (
                  <tr key={index} className="transition-colors">
                    <td className="p-5 font-medium text-charbon">{row.feature}</td>
                    <td className="p-5 text-center text-charbon/50">{row.start}</td>
                    <td className="p-5 text-center text-sauge font-semibold bg-sauge/5">{row.pro}</td>
                    <td className="p-5 text-center text-charbon/80">{row.elite}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
