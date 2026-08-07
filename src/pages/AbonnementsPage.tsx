import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Check, ChevronDown, ChevronUp, ArrowRight, Award, Plus, Minus, ShoppingBag, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';
import { findSubscription } from '../data/subscriptions';
import { useCart } from '../context/CartContext';
import { trackAddToCart } from '../lib/analytics';

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
  const [quantities, setQuantities] = useState<Record<string, number>>({
    Start: 1,
    Pro: 1,
    Elite: 1,
  });
  const [addedPlan, setAddedPlan] = useState<string | null>(null);
  const { addItem } = useCart();

  const handleAddPlan = (planName: string) => {
    const sub = findSubscription(planName);
    if (!sub) return;
    const qty = quantities[planName] || 1;
    addItem({
      id: `subscription-${sub.slug}`,
      type: 'subscription',
      name: sub.name,
      price: Number(sub.price),
      quantity: qty,
      plan: sub.slug,
      billingPeriod: 'monthly',
    });
    trackAddToCart({
      item_id: sub.slug,
      item_name: sub.name,
      price: Number(sub.price),
      quantity: qty,
      item_category: 'Abonnements',
    });
    setAddedPlan(planName);
    window.setTimeout(() => setAddedPlan(null), 1600);
  };

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
      <section className="relative bg-beige pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden border-b border-line/70">
        <div className="absolute top-1/3 left-1/4 h-96 w-96 rounded-full bg-frais/20 blur-[120px] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="eyebrow text-sauge justify-center mb-4">Abonnements</span>
          <h1 className="font-display h-editorial text-charbon tracking-tight mb-6">Formules d'abonnement</h1>
          <p className="text-base text-olive max-w-2xl mx-auto font-sans leading-relaxed">
            Formules d'abonnement ORVYN : Start, Pro, Elite. Repas premium, casiers connectés et suivi nutritionnel personnalisé.
          </p>
        </div>
      </section>

      <section className="bg-bone py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <span className="eyebrow text-sauge justify-center mb-4">Offres de précision nutritionnelle</span>
            <h2 className="font-display text-3xl font-semibold text-charbon sm:text-5xl tracking-tight">Optimisez vos résultats sur abonnement</h2>
            <p className="text-base text-olive max-w-xl mx-auto mt-4 font-sans">
              Libérez votre plein potentiel. Économisez jusqu'à 40% par rapport à l'achat à la carte.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch mb-24 max-w-6xl mx-auto">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative orvyn-clip-sm bg-white border p-8 flex flex-col justify-between transition-all duration-300 cursor-pointer ${
                  plan.popular
                    ? 'border-sauge/50 bg-sauge/[0.04] shadow-[0_12px_40px_rgba(102,117,99,0.12)] ring-1 ring-sauge/30'
                    : 'border-line/70 shadow-[0_1px_4px_rgba(23,26,24,0.06)]'
                } ${selectedPlan === plan.name ? 'ring-1 ring-sauge' : ''}`}
                onClick={() => setSelectedPlan(plan.name)}
              >
                <div>
                  {plan.badge && (
                    <span className={`absolute -top-3.5 left-1/2 -translate-x-1/2 text-[10px] font-semibold px-4 py-1.5 uppercase tracking-widest rounded-xl whitespace-nowrap ${
                      plan.popular ? 'bg-sauge text-bone' : 'bg-olive text-bone'
                    }`}>
                      {plan.badge}
                    </span>
                  )}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-display font-semibold text-charbon tracking-tight">{plan.name}</h3>
                      <span className="text-[11px] font-semibold tracking-wider text-sauge bg-sauge/10 px-2.5 py-1 rounded-lg">
                        {plan.credits}
                      </span>
                    </div>
                    <div className="flex items-baseline">
                      <span className="text-4xl font-semibold text-charbon tracking-tight">{plan.price}</span>
                      <span className="text-lg font-semibold text-olive ml-1">€</span>
                      <span className="text-xs text-olive tracking-widest uppercase ml-2">/ mois</span>
                    </div>
                    <p className="text-sm text-olive leading-relaxed font-sans min-h-[48px]">
                      {plan.description}
                    </p>
                  </div>
                  <div className="border-t border-line/60 pt-6 space-y-4">
                    <p className="text-[10px] font-semibold text-olive uppercase tracking-widest">Inclus dans la formule :</p>
                    <ul className="space-y-3">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-3 text-sm text-charbon/80 font-sans">
                          <Check className="h-4 w-4 text-sauge shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="mt-8 pt-6 border-t border-line/60">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-olive">Quantité</span>
                    <div className="flex items-center gap-3 border border-line/70 bg-white rounded-xl px-2 py-1">
                      <button
                        id={`plan-qty-minus-${plan.name}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setQuantities((q) => ({ ...q, [plan.name]: Math.max(1, (q[plan.name] || 1) - 1) }));
                        }}
                        aria-label={`Diminuer la quantité ${plan.name}`}
                        className="p-1.5 text-olive hover:text-sauge transition cursor-pointer"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span id={`plan-qty-value-${plan.name}`} className="w-6 text-center text-sm font-semibold text-charbon">
                        {quantities[plan.name] || 1}
                      </span>
                      <button
                        id={`plan-qty-plus-${plan.name}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          setQuantities((q) => ({ ...q, [plan.name]: (q[plan.name] || 1) + 1 }));
                        }}
                        aria-label={`Augmenter la quantité ${plan.name}`}
                        className="p-1.5 text-olive hover:text-sauge transition cursor-pointer"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <button
                    id={`plan-add-cart-${plan.name}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddPlan(plan.name);
                    }}
                    className={`orvyn-clip-sm w-full py-3.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 inline-flex items-center justify-center gap-2 cursor-pointer ${
                      plan.popular
                        ? 'bg-sauge text-bone hover:bg-sauge-soft'
                        : 'border border-sauge/40 text-charbon hover:bg-sauge hover:text-bone'
                    } ${addedPlan === plan.name ? 'bg-frais text-charbon border-frais' : ''}`}
                  >
                    {addedPlan === plan.name ? (
                      <>
                        <CheckCircle className="h-4 w-4" /> Ajouté au panier
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="h-4 w-4" /> Choisir cet abonnement
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="mt-20 max-w-5xl mx-auto">
            <div className="text-center mb-10">
              <h3 className="text-lg font-display font-semibold text-charbon tracking-tight flex items-center justify-center gap-2">
                <Award className="h-5 w-5 text-sauge" />
                Tableau comparatif
              </h3>
              <p className="text-sm text-olive mt-1 font-sans">Comparez nos formules et trouvez celle qui correspond à votre rythme.</p>
            </div>
            <div className="overflow-x-auto orvyn-clip-sm bg-white border border-line/70">
              <table className="w-full text-left border-collapse text-sm font-sans">
                <thead>
                  <tr className="border-b border-line/70 bg-bg-secondary text-[11px] tracking-widest uppercase text-olive">
                    <th className="p-5 font-semibold text-charbon">Avantages & Caractéristiques</th>
                    <th className="p-5 text-center font-semibold">Start</th>
                    <th className="p-5 text-center font-semibold text-sauge">Pro</th>
                    <th className="p-5 text-center font-semibold">Elite</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line/60 text-olive">
                  {comparisons.map((row, index) => (
                    <tr key={index} className="hover:bg-bg-secondary/60 transition-colors">
                      <td className="p-5 font-medium text-charbon">{row.feature}</td>
                      <td className="p-5 text-center">{row.start}</td>
                      <td className="p-5 text-center text-sauge font-semibold bg-sauge/[0.06]">{row.pro}</td>
                      <td className="p-5 text-center">{row.elite}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-beige py-16 lg:py-24 border-t border-line/70">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="eyebrow text-sauge justify-center mb-4">FAQ</span>
            <h2 className="font-display text-3xl font-semibold text-charbon tracking-tight">Abonnement : vos questions</h2>
          </div>
          <div className="space-y-3">
            {faqItems.map((item, idx) => (
              <div key={idx} className="orvyn-clip-sm bg-white border border-line/70 overflow-hidden transition">
                <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full text-left px-6 py-5 flex justify-between items-center">
                  <span className="text-sm font-semibold text-charbon">{item.q}</span>
                  {openFaq === idx ? <ChevronUp className="h-4 w-4 text-sauge shrink-0" /> : <ChevronDown className="h-4 w-4 text-olive shrink-0" />}
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6 pt-2 border-t border-line/60 text-sm text-olive leading-relaxed font-sans">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA sombre ponctuel */}
      <section className="bg-charbon py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="eyebrow text-frais justify-center mb-4">Commander avec ORVYN</span>
          <h2 className="font-display text-3xl font-semibold text-bone mb-4">Chaque repas compte pour votre progression</h2>
          <p className="text-base text-bone/70 mb-8 font-sans">Rejoignez la communauté ORVYN et faites de chaque séance un pas de plus vers vos objectifs.</p>
          <Link to="/menu" className="inline-flex items-center gap-2 orvyn-clip-sm bg-sauge text-bone px-8 py-3.5 text-xs font-semibold uppercase hover:bg-sauge-soft transition">
            Découvrir la carte <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
