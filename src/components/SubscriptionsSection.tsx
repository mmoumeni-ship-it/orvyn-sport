import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, ShieldCheck, Zap, Award, Star, Info, HelpCircle } from 'lucide-react';

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
      cta: 'Démarrer l\'expérience',
      color: 'border-neutral-900 bg-[#0a0a0a]'
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
      cta: 'Devenir membre Pro',
      color: 'border-brand-green bg-[#0d0d0d] shadow-[0_0_30px_rgba(16,185,129,0.12)]'
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
      cta: 'Atteindre l\'Élite',
      color: 'border-neutral-800 bg-[#0c0c0c] hover:border-white/25 shadow-[0_0_30px_rgba(255,255,255,0.02)]'
    }
  ];

  const comparisons = [
    { feature: 'Crédits repas inclus', start: '5 repas / mois', pro: '15 repas / mois', elite: '30 repas / mois' },
    { feature: 'Tarif moyen par plat', start: '9,80 € / repas', pro: '8,60 € / repas', elite: '7,90 € / repas' },
    { feature: 'Accès casiers thermo-régulés', start: 'Oui (Standard)', pro: 'Oui (Standard)', elite: 'Oui (Prioritaire garanti)' },
    { feature: 'Calcul & Intégration Macros', start: 'Oui', pro: 'Oui (Suivi personnalisé)', elite: 'Oui (Coach dédié dédié)' },
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
    <section id="subscriptions-section" className="relative bg-[#050505] py-24 lg:py-36 border-b border-neutral-900 overflow-hidden">
      {/* Subtle brand color map glow */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-brand-green/5 blur-[120px] pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20 lg:mb-24">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-green font-bold block">
            OFFRES DE PRÉCISION NUTRITIONNELLE
          </span>
          <h2 className="font-display text-3xl font-extrabold text-white sm:text-5xl tracking-[-0.03em]">
            Optimisez vos résultats sur abonnement
          </h2>
          <p className="text-sm text-neutral-400 font-sans max-w-xl mx-auto">
            Libérez votre plein potentiel. Économisez jusqu'à 40% par rapport à l'achat à la carte et assurez-vous d'avoir vos apports parfaits à chaque séance.
          </p>
        </div>

        {/* Pricing Cards Grid - Conserving exact structure requested */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-24 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <div
              id={`plan-card-${plan.name}`}
              key={plan.name}
              className={`relative rounded-3xl border p-8 flex flex-col justify-between transition-all duration-300 ${plan.color} ${
                selectedPlan === plan.name ? 'ring-1 ring-brand-green/35' : ''
              }`}
              onClick={() => setSelectedPlan(plan.name)}
            >
              <div>
                {/* Custom Badge */}
                {plan.badge && (
                  <span className={`absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full text-[8px] font-mono font-extrabold px-4 py-1.5 uppercase tracking-widest shadow-lg ${
                    plan.popular
                      ? 'bg-brand-green text-black shadow-brand-green/20'
                      : 'bg-zinc-800 text-white shadow-black/40 border border-neutral-700'
                  }`}>
                    {plan.badge}
                  </span>
                )}

                {/* Plan Header */}
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-bold text-white tracking-tight font-display">{plan.name}</h3>
                    <span className="text-[10px] font-mono font-bold tracking-wider text-brand-green bg-brand-green-light px-2.5 py-1 rounded">
                      {plan.credits}
                    </span>
                  </div>
                  
                  <div className="flex items-baseline text-white">
                    <span className="text-4xl font-extrabold font-mono tracking-tight">{plan.price}</span>
                    <span className="text-lg font-bold font-sans text-neutral-400 ml-1">€</span>
                    <span className="text-xs text-neutral-500 font-mono tracking-widest uppercase ml-2">/ mois</span>
                  </div>
                  
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans font-light min-h-[48px]">
                    {plan.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="border-t border-neutral-900 pt-6 space-y-4">
                  <p className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-widest">Inclus dans la formule :</p>
                  <ul className="space-y-3">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3 text-xs text-neutral-300 font-sans font-light">
                        <Check className="h-4 w-4 text-brand-green shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Subscribe CTA */}
              <div className="mt-8 pt-6 border-t border-neutral-900">
                <button
                  id={`subscribe-btn-${plan.name}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSubscribeClick(plan.name);
                  }}
                  className={`w-full rounded-full py-3 text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                    plan.popular
                      ? 'bg-brand-green text-black hover:bg-white'
                      : 'bg-neutral-950 text-white border border-neutral-800 hover:border-neutral-500 hover:bg-neutral-900'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Premium Plan Comparison Table (Highly requested by user) */}
        <div className="mt-20 max-w-5xl mx-auto animate-fade-in">
          <div className="text-center mb-10">
            <h3 className="text-lg font-bold text-white font-display tracking-tight flex items-center justify-center gap-2">
              <Award className="h-5 w-5 text-brand-green" />
              Tableau comparatif premium
            </h3>
            <p className="text-xs text-neutral-400 mt-1 font-sans">Comparez nos formules d'élite et trouvez celle qui correspond à votre rythme.</p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-neutral-900 bg-[#070707] shadow-xl">
            <table className="w-full text-left border-collapse text-xs font-sans">
              <thead>
                <tr className="border-b border-neutral-900 bg-[#0c0c0c] text-[10px] font-mono tracking-widest uppercase text-neutral-400">
                  <th className="p-5 font-bold">Avantages & Caractéristiques</th>
                  <th className="p-5 text-center font-bold">Start</th>
                  <th className="p-5 text-center font-bold text-brand-green">Pro</th>
                  <th className="p-5 text-center font-bold">Elite</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-900 text-neutral-300">
                {comparisons.map((row, index) => (
                  <tr key={index} className="hover:bg-[#0c0c0c]/40 transition-colors">
                    <td className="p-5 font-medium text-white">{row.feature}</td>
                    <td className="p-5 text-center font-mono text-neutral-400">{row.start}</td>
                    <td className="p-5 text-center font-mono text-brand-green font-semibold bg-brand-green/5">{row.pro}</td>
                    <td className="p-5 text-center font-mono text-neutral-200">{row.elite}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
