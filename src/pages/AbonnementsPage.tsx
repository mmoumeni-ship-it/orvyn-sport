import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Check, ChevronDown, ChevronUp, ArrowRight, Award } from 'lucide-react';
import SEO from '../components/SEO';

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

export default function AbonnementsPage() {
  const [selectedPlan, setSelectedPlan] = useState('Pro');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqItems = [
    { q: "Comment fonctionnent les crédits repas ?", a: "Chaque mois, votre abonnement vous crédite un nombre de repas utilisables sur l'ensemble de notre carte (bowls, shakes, snacks). Les crédits sont renouvelés automatiquement chaque mois et peuvent être utilisés à tout moment via notre application pour commander vos repas et les récupérer dans vos casiers connectés." },
    { q: "Puis-je changer de formule en cours de mois ?", a: "Oui, vous pouvez passer à une formule supérieure à tout moment. Le passage à une formule inférieure est possible en fin de mois. Les crédits restants sont conservés et transférés vers votre nouvelle formule." },
    { q: "Y a-t-il un engagement de durée ?", a: "Nos abonnements sont sans engagement. Vous pouvez résilier à tout moment depuis votre espace client. Les crédits non utilisés expirent à la fin du mois suivant votre résiliation." },
    { q: "Comment récupérer mes repas avec l'abonnement ?", a: "Commandez vos repas depuis l'application, choisissez votre créneau de récupération, et rendez-vous dans votre casier connecté ORVYN. Scannez votre QR code ou entrez votre code unique. Le casier s'ouvre automatiquement, vos repas vous attendent à la bonne température." }
  ];

  return (
    <>
      <SEO
        title="Abonnements nutrition sportive"
        description="Formules d'abonnement ORVYN : Start, Pro, Elite. Repas premium, casiers connectés et suivi nutritionnel personnalisé."
        canonical="/abonnements"
      />
      <section className="relative bg-orvyn-carbon pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 h-[500px] w-[500px] rounded-full bg-clay/5 blur-[120px] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="font-display text-xs uppercase tracking-[0.25em] text-clay font-semibold block mb-4">ABONNEMENTS</span>
          <h1 className="font-display h-editorial text-orvyn-bone tracking-tight mb-6">Formules d'abonnement</h1>
          <p className="text-sm text-orvyn-bone/60 max-w-2xl mx-auto font-sans leading-relaxed">
            Formules d'abonnement ORVYN : Start, Pro, Elite. Repas premium, casiers connectés et suivi nutritionnel personnalisé.
          </p>
        </div>
      </section>

      <section className="bg-orvyn-carbon py-16 border-t border-olive/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-display text-xs uppercase tracking-[0.25em] text-clay font-semibold block mb-4">OFFRES DE PRÉCISION NUTRITIONNELLE</span>
            <h2 className="font-display text-3xl font-semibold text-orvyn-bone sm:text-5xl tracking-tight">Optimisez vos résultats sur abonnement</h2>
            <p className="text-sm text-orvyn-bone/60 max-w-xl mx-auto mt-4 font-sans">
              Libérez votre plein potentiel. Économisez jusqu'à 40% par rapport à l'achat à la carte.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-24 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative orvyn-clip-sm depth bg-carbon-raised p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                  selectedPlan === plan.name ? 'ring-1 ring-lime' : ''
                }`}
                onClick={() => setSelectedPlan(plan.name)}
              >
                <div>
                  {plan.badge && (
                    <span className={`absolute -top-3.5 left-1/2 -translate-x-1/2 text-[8px] font-semibold px-4 py-1.5 uppercase tracking-widest ${
                      plan.popular ? 'bg-sauge text-bone' : 'bg-olive text-bone'
                    }`}>
                      {plan.badge}
                    </span>
                  )}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-display font-semibold text-orvyn-bone tracking-tight">{plan.name}</h3>
                      <span className="text-[10px] font-semibold tracking-wider text-clay bg-clay/10 px-2.5 py-1">
                        {plan.credits}
                      </span>
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-4xl font-semibold text-clay tracking-tight">{plan.price}</span>
                      <span className="text-lg font-semibold text-orvyn-bone/50 ml-1">€</span>
                      <span className="text-xs text-orvyn-bone/40 tracking-widest uppercase ml-2">/ mois</span>
                    </div>
                    <p className="text-xs text-orvyn-bone/60 leading-relaxed font-sans min-h-[48px]">
                      {plan.description}
                    </p>
                  </div>
                  <div className="border-t border-olive/20 pt-6 space-y-4">
                    <p className="text-[9px] font-semibold text-orvyn-bone/40 uppercase tracking-widest">Inclus dans la formule :</p>
                    <ul className="space-y-3">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-3 text-xs text-orvyn-bone/70 font-sans">
                          <Check className="h-4 w-4 text-clay shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-olive/20">
                  <Link
                    to="/contact"
                    className={`orvyn-clip-sm w-full py-3 text-xs font-semibold uppercase tracking-wider transition-all duration-300 inline-block text-center cursor-pointer ${
                      plan.popular ? 'bg-sauge text-bone hover:bg-lime-soft' : 'border border-olive/40 text-orvyn-bone hover:border-bone/50'
                    }`}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="mt-20 max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h3 className="text-lg font-display font-semibold text-orvyn-bone tracking-tight flex items-center justify-center gap-2">
                <Award className="h-5 w-5 text-clay" />
                Tableau comparatif premium
              </h3>
              <p className="text-xs text-orvyn-bone/60 mt-1 font-sans">Comparez nos formules d'élite et trouvez celle qui correspond à votre rythme.</p>
            </div>
            <div className="overflow-x-auto orvyn-clip-sm bg-carbon border border-olive/20">
              <table className="w-full text-left border-collapse text-xs font-sans">
                <thead>
                  <tr className="border-b border-olive/20 bg-carbon-raised text-[10px] tracking-widest uppercase text-orvyn-bone/50">
                    <th className="p-5 font-semibold">Avantages & Caractéristiques</th>
                    <th className="p-5 text-center font-semibold">Start</th>
                    <th className="p-5 text-center font-semibold text-lime">Pro</th>
                    <th className="p-5 text-center font-semibold">Elite</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-olive/20 text-orvyn-bone/60">
                  {comparisons.map((row, index) => (
                    <tr key={index} className="hover:bg-carbon-raised/60 transition-colors">
                      <td className="p-5 font-medium text-orvyn-bone">{row.feature}</td>
                      <td className="p-5 text-center text-orvyn-bone/40">{row.start}</td>
                      <td className="p-5 text-center text-lime font-semibold bg-lime/5">{row.pro}</td>
                      <td className="p-5 text-center text-orvyn-bone/70">{row.elite}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-orvyn-carbon py-16 border-t border-olive/20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-display text-xs uppercase tracking-[0.25em] text-clay font-semibold block mb-4">FAQ</span>
            <h2 className="font-display text-2xl font-semibold text-orvyn-bone sm:text-4xl tracking-tight">Abonnement : vos questions</h2>
          </div>
          <div className="space-y-3">
            {faqItems.map((item, idx) => (
              <div key={idx} className="orvyn-clip-sm depth bg-carbon-raised overflow-hidden transition">
                <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full text-left px-6 py-5 flex justify-between items-center">
                  <span className="text-sm font-semibold text-orvyn-bone">{item.q}</span>
                  {openFaq === idx ? <ChevronUp className="h-4 w-4 text-clay shrink-0" /> : <ChevronDown className="h-4 w-4 text-orvyn-bone/40 shrink-0" />}
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6 pt-2 border-t border-olive/20 text-xs text-orvyn-bone/60 leading-relaxed font-sans">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
