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
    <section id="subscriptions-section" className="relative bg-orvyn-carbon py-24 lg:py-36 border-b border-orvyn-olive/20 overflow-hidden">
      {/* Aura discrète */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-clay/5 blur-[120px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">

        {/* En-tête éditorial */}
        <div className="mb-20 lg:mb-24 flex justify-center">
          <SectionHeader
            align="center"
            eyebrow="Offres de précision nutritionnelle"
            title="Optimisez vos résultats sur abonnement"
            description="Libérez votre plein potentiel. Économisez jusqu'à 40% par rapport à l'achat à la carte et assurez-vous d'avoir vos apports parfaits à chaque séance."
          />
        </div>

        {/* Cartes de formules */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch mb-24 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              id={`plan-card-${plan.name}`}
              key={plan.name}
              className={`orvyn-clip-sm depth relative bg-carbon-raised p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                selectedPlan === plan.name ? 'ring-1 ring-lime/40' : ''
              }`}
              onClick={() => setSelectedPlan(plan.name)}
            >
              <div>
                {plan.badge && (
                  <span className={`absolute -top-3.5 left-1/2 -translate-x-1/2 text-[9px] font-semibold px-4 py-1.5 uppercase tracking-widest ${
                    plan.popular
                      ? 'bg-lime text-carbon'
                      : 'bg-olive text-bone'
                  }`}>
                    {plan.badge}
                  </span>
                )}

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-start">
                    <h3 className="font-display text-xl font-semibold text-orvyn-bone tracking-tight">{plan.name}</h3>
                    <span className="text-[10px] font-semibold tracking-wider text-clay bg-clay/10 px-2.5 py-1">
                      {plan.credits}
                    </span>
                  </div>

                  <div className="flex items-baseline text-orvyn-bone">
                    <span className="text-4xl font-semibold tracking-tight">{plan.price}</span>
                    <span className="text-lg font-medium text-orvyn-bone/50 ml-1">€</span>
                    <span className="text-xs text-orvyn-bone/40 tracking-widest uppercase ml-2">/ mois</span>
                  </div>

                  <p className="text-xs text-orvyn-bone/60 leading-relaxed min-h-[48px]">
                    {plan.description}
                  </p>
                </div>

                <div className="border-t border-olive/25 pt-6 space-y-4">
                  <p className="text-[10px] font-semibold text-orvyn-bone/40 uppercase tracking-widest">Inclus dans la formule :</p>
                  <ul className="space-y-3">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3 text-xs text-orvyn-bone/70">
                        <Check className="h-4 w-4 text-clay shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-olive/25">
                <button
                  id={`subscribe-btn-${plan.name}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSubscribeClick(plan.name);
                  }}
                  className={`orvyn-clip-sm w-full py-3 text-[11px] font-semibold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    plan.popular
                      ? 'bg-lime text-carbon hover:bg-lime-soft'
                      : 'border border-olive/40 text-orvyn-bone hover:border-bone/50'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Tableau comparatif */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-20 max-w-5xl mx-auto"
        >
          <div className="text-center mb-10">
            <h3 className="font-display text-lg font-semibold text-orvyn-bone tracking-tight flex items-center justify-center gap-2">
              <Award className="h-5 w-5 text-clay" />
              Tableau comparatif premium
            </h3>
            <p className="text-xs text-orvyn-bone/50 mt-1">Comparez nos formules d'élite et trouvez celle qui correspond à votre rythme.</p>
          </div>

          <div className="overflow-x-auto orvyn-clip-sm depth bg-carbon-raised">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-olive/25 text-[10px] tracking-widest uppercase text-orvyn-bone/40">
                  <th className="p-5 font-semibold">Avantages & Caractéristiques</th>
                  <th className="p-5 text-center font-semibold">Start</th>
                  <th className="p-5 text-center font-semibold text-clay">Pro</th>
                  <th className="p-5 text-center font-semibold">Elite</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-olive/20 text-orvyn-bone/70">
                {comparisons.map((row, index) => (
                  <tr key={index} className="transition-colors">
                    <td className="p-5 font-medium text-orvyn-bone">{row.feature}</td>
                    <td className="p-5 text-center text-orvyn-bone/50">{row.start}</td>
                    <td className="p-5 text-center text-clay font-semibold bg-clay/5">{row.pro}</td>
                    <td className="p-5 text-center text-orvyn-bone/80">{row.elite}</td>
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
