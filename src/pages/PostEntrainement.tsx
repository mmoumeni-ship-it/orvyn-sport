import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Flame, ChevronDown, ChevronUp, ArrowRight, Activity, Droplet, Zap, Heart } from 'lucide-react';
import SEO from '../components/SEO';
import { MEALS_DATABASE } from '../data/meals';

const recoveryMeals = MEALS_DATABASE.filter(m => m.goals.includes('Récupération'));

export default function PostEntrainement() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqItems = [
    { q: "Pourquoi est-il important de manger après l'entraînement ?", a: "La fenêtre métabolique post-entraînement est cruciale pour la récupération musculaire. Dans les 30 à 60 minutes suivant l'effort, le corps est en absorption maximale des nutriments pour reconstruire les fibres musculaires endommagées et reconstituer les stocks de glycogène. Un repas adapté accélère la récupération de 40%." },
    { q: "Quel repas ORVYN privilégier après le sport ?", a: "Pour une récupération optimale, nous recommandons le Salmon Recovery Bowl (546 kcal, 45g protéines) pour un repas complet, ou un shake protéiné comme la Whey Chocolat (153 kcal, 32g protéines) pour une assimilation rapide. Le Café Protein Boost est idéal pour une récupération avec un coup de fouet." },
    { q: "Quel est le ratio protéines/glucides idéal post-workout ?", a: "Le ratio optimal post-entraînement est de 40% protéines / 40% glucides / 20% lipides. Les protéines fournissent les acides aminés pour la réparation musculaire, tandis que les glucides reconstituent le glycogène. Nos repas marqués 'Récupération' respectent ces proportions." },
    { q: "L'hydratation est-elle incluse dans les repas ORVYN ?", a: "Bien que nos repas soient hydratants (légumes riches en eau, sauces), nous recommandons de boire 500ml d'eau avant votre repas post-workout. Nos shakes protéinés sont une excellente façon de combiner hydratation et apport nutritionnel en une seule prise." }
  ];

  return (
    <>
      <SEO
        title="Repas post-entraînement"
        description="Repas de récupération post-workout. Protéines, glucides et nutriments essentiels pour reconstruire le muscle après l'effort."
        canonical="/repas-post-entrainement"
      />
      <section className="relative bg-beige pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden border-b border-line/70">
        <div className="absolute top-1/4 right-1/3 h-80 w-80 rounded-full bg-frais/20 blur-[100px] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="eyebrow text-sauge justify-center mb-4">Récupération musculaire</span>
          <h1 className="font-display h-editorial text-charbon tracking-tight mb-6">Repas post-entraînement</h1>
          <p className="text-base text-olive max-w-2xl mx-auto font-sans leading-relaxed">
            Repas de récupération post-workout. Protéines, glucides et nutriments essentiels pour reconstruire le muscle après l'effort.
          </p>
          <div className="flex justify-center gap-8 sm:gap-12 mt-10">
            <div className="text-center">
              <p className="text-3xl font-semibold text-sauge font-display">{recoveryMeals.length}</p>
              <p className="text-[11px] uppercase text-olive tracking-wider mt-1">Repas adaptés</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-semibold text-sauge font-display">26-55g</p>
              <p className="text-[11px] uppercase text-olive tracking-wider mt-1">Protéines/repas</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-semibold text-sauge font-display">145-596</p>
              <p className="text-[11px] uppercase text-olive tracking-wider mt-1">Kcal/repas</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bone py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h2 className="font-display text-3xl font-semibold text-charbon tracking-tight">L'importance de la récupération nutritionnelle</h2>
              <p className="text-base text-olive leading-relaxed font-sans">
                Après l'effort, votre corps a besoin de nutriments spécifiques pour réparer les fibres musculaires, reconstituer les réserves de glycogène et réduire l'inflammation. Nos repas post-entraînement sont formulés pour optimiser cette fenêtre de récupération.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                {[
                  { icon: Activity, label: 'Protéines', sub: 'Réparation musculaire' },
                  { icon: Zap, label: 'Glucides', sub: 'Recharge énergétique' },
                  { icon: Droplet, label: 'Hydratation', sub: 'Équilibre électrolytique' },
                  { icon: Heart, label: 'Antioxydants', sub: 'Réduction inflammation' }
                ].map(item => (
                  <div key={item.label} className="bg-white border border-line/70 rounded-2xl p-4 flex items-start gap-3">
                    <item.icon className="h-5 w-5 text-sauge shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-charbon">{item.label}</p>
                      <p className="text-xs text-olive font-sans mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-beige orvyn-clip border border-line/70 p-7">
              <h3 className="text-sm font-semibold text-charbon mb-5">Les clés d'une récupération optimale</h3>
              <ul className="space-y-3">
                {[
                  'Repas dans les 30-60 min post-workout pour maximiser l\'assimilation',
                  'Protéines à assimilation rapide (whey isolate, saumon, blanc de poulet)',
                  'Glucides à index glycémique moyen-élevé pour reconstituer le glycogène',
                  'Oméga-3 et antioxydants pour réduire l\'inflammation musculaire',
                  'Hydratation adaptée pour compenser les pertes sudorales'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-charbon/75 font-sans">
                    <span className="h-1.5 w-1.5 bg-sauge shrink-0 mt-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-semibold text-charbon sm:text-4xl tracking-tight mb-4">Nos repas pour la récupération</h2>
            <p className="text-base text-olive max-w-2xl mx-auto font-sans">Des formules pensées pour la fenêtre post-effort, fraîches et nourrissantes.</p>
          </div>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {recoveryMeals.map((meal, idx) => (
              <motion.div
                key={meal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group orvyn-clip-sm bg-white border border-line/70 shadow-[0_1px_4px_rgba(23,26,24,0.06)] overflow-hidden hover:shadow-[0_10px_30px_rgba(23,26,24,0.08)] hover:border-sauge/30 transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden bg-bg-secondary">
                  <img src={meal.image} alt={meal.name} className="h-full w-full object-cover photo-lumineuse group-hover:scale-105 transition duration-700" />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {meal.tags.slice(0, 2).map(t => (
                      <span key={t} className="text-[10px] tracking-widest uppercase bg-white/90 text-sauge border border-line/60 px-2 py-1 rounded-lg backdrop-blur-sm">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-display font-semibold text-charbon group-hover:text-sauge transition">{meal.name}</h3>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1 text-sauge font-semibold"><Flame className="h-3.5 w-3.5" />{meal.calories} kcal</span>
                    <span className="text-line">•</span>
                    <span className="text-olive font-medium">{meal.proteins}g Protéines</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {meal.goals.map(g => (
                      <span key={g} className="text-[10px] tracking-widest uppercase bg-sauge/10 text-sauge border border-sauge/20 px-2 py-0.5 rounded-lg">{g}</span>
                    ))}
                  </div>
                  <div className="pt-3 border-t border-line/60 flex items-center justify-between">
                    <span className="text-lg font-semibold text-charbon">{meal.price.toFixed(2)} €</span>
                    <Link to={`/repas/${meal.id}`} className="text-xs font-medium text-sauge flex items-center gap-1 hover:gap-2 transition-all">Détails <ArrowRight className="h-3 w-3" /></Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-beige py-12 border-t border-line/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/bowls-proteines" className="orvyn-clip-sm border border-sauge/40 text-charbon px-6 py-3 text-xs font-semibold uppercase hover:bg-sauge hover:text-bone transition">Bowls protéinés</Link>
            <Link to="/shakes-proteines" className="orvyn-clip-sm border border-sauge/40 text-charbon px-6 py-3 text-xs font-semibold uppercase hover:bg-sauge hover:text-bone transition">Shakes protéinés</Link>
          </div>
        </div>
      </section>

      <section className="bg-bone py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="eyebrow text-sauge justify-center mb-4">FAQ</span>
            <h2 className="font-display text-3xl font-semibold text-charbon tracking-tight">Récupération : vos questions</h2>
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

      <section className="bg-charbon py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="eyebrow text-frais justify-center mb-4">Commander avec ORVYN</span>
          <h2 className="font-display text-3xl font-semibold text-bone mb-4">Optimisez votre récupération dès maintenant</h2>
          <p className="text-base text-bone/70 mb-8 font-sans">Commandez vos repas et récupérez-les dans votre casier connecté après l'entraînement.</p>
          <Link to="/abonnements" className="inline-flex items-center gap-2 orvyn-clip-sm bg-sauge text-bone px-8 py-3.5 text-xs font-semibold uppercase hover:bg-sauge-soft transition">
            Voir les abonnements <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
