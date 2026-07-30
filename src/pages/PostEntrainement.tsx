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
      <section className="relative bg-[#050505] pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden">
        <div className="absolute top-1/4 right-1/3 h-[400px] w-[400px] rounded-full bg-brand-green/5 blur-[100px] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-green font-bold block mb-4">RÉCUPÉRATION MUSCULAIRE</span>
          <h1 className="font-display text-4xl font-extrabold text-white sm:text-6xl tracking-[-0.03em] mb-6">Repas post-entraînement</h1>
          <p className="text-sm text-neutral-400 max-w-2xl mx-auto font-sans">
            Repas de récupération post-workout. Protéines, glucides et nutriments essentiels pour reconstruire le muscle après l'effort.
          </p>
          <div className="flex justify-center gap-6 mt-8">
            <div className="text-center">
              <p className="text-2xl font-extrabold text-brand-green font-mono">{recoveryMeals.length}</p>
              <p className="text-[10px] font-mono uppercase text-neutral-500 tracking-wider">Repas adaptés</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-extrabold text-white font-mono">26-55g</p>
              <p className="text-[10px] font-mono uppercase text-neutral-500 tracking-wider">Protéines/repas</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-extrabold text-blue-400 font-mono">145-596</p>
              <p className="text-[10px] font-mono uppercase text-neutral-500 tracking-wider">Kcal/repas</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#050505] py-16 border-t border-neutral-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl tracking-[-0.03em]">L'importance de la récupération nutritionnelle</h2>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Après l'effort, votre corps a besoin de nutriments spécifiques pour réparer les fibres musculaires, reconstituer les réserves de glycogène et réduire l'inflammation. Nos repas post-entraînement sont formulés pour optimiser cette fenêtre de récupération.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { icon: Activity, label: 'Protéines', sub: 'Réparation musculaire' },
                  { icon: Zap, label: 'Glucides', sub: 'Recharge énergétique' },
                  { icon: Droplet, label: 'Hydratation', sub: 'Équilibre électrolytique' },
                  { icon: Heart, label: 'Antioxydants', sub: 'Réduction inflammation' }
                ].map(item => (
                  <div key={item.label} className="bg-[#0a0a0a] border border-neutral-900 rounded-xl p-4 flex items-start gap-3">
                    <item.icon className="h-5 w-5 text-brand-green shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-white">{item.label}</p>
                      <p className="text-[10px] text-neutral-500">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#0a0a0a] border border-neutral-900 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-white mb-4">Les clés d'une récupération optimale</h3>
              <ul className="space-y-3">
                {[
                  'Repas dans les 30-60 min post-workout pour maximiser l\'assimilation',
                  'Protéines à assimilation rapide (whey isolate, saumon, blanc de poulet)',
                  'Glucides à index glycémique moyen-élevé pour reconstituer le glycogène',
                  'Oméga-3 et antioxydants pour réduire l\'inflammation musculaire',
                  'Hydratation adaptée pour compenser les pertes sudorales'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-green shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="font-display text-2xl font-extrabold text-white sm:text-4xl tracking-[-0.03em] mb-4">Nos repas pour la récupération</h2>
          </div>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {recoveryMeals.map((meal, idx) => (
              <motion.div
                key={meal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group rounded-2xl border border-neutral-900 bg-[#0a0a0a] overflow-hidden hover:border-neutral-800 transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden bg-neutral-950">
                  <img src={meal.image} alt={meal.name} className="h-full w-full object-cover group-hover:scale-105 transition duration-700" />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {meal.tags.slice(0, 2).map(t => (
                      <span key={t} className="text-[8px] font-mono uppercase bg-black/70 text-neutral-300 border border-neutral-700 rounded px-1.5 py-0.5 backdrop-blur-sm">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="text-base font-extrabold text-white group-hover:text-brand-green transition">{meal.name}</h3>
                  <div className="flex items-center gap-3 font-mono text-[10px]">
                    <span className="flex items-center gap-1 text-brand-green font-bold"><Flame className="h-3.5 w-3.5" />{meal.calories} kcal</span>
                    <span className="text-neutral-800">•</span>
                    <span className="text-neutral-300 font-semibold">{meal.proteins}g Protéines</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {meal.goals.map(g => (
                      <span key={g} className="text-[8px] font-mono uppercase bg-brand-green/10 text-brand-green border border-brand-green/20 rounded px-1.5 py-0.5">{g}</span>
                    ))}
                  </div>
                  <div className="pt-3 border-t border-neutral-900 flex items-center justify-between">
                    <span className="text-lg font-extrabold text-white font-mono">{meal.price.toFixed(2)} €</span>
                    <Link to={`/repas/${meal.id}`} className="text-[10px] font-mono tracking-wider text-brand-green flex items-center gap-1 hover:gap-2 transition-all">Détails <ArrowRight className="h-3 w-3" /></Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-[#050505] py-12 border-t border-neutral-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/bowls-proteines" className="rounded-full bg-[#0a0a0a] border border-neutral-800 text-white px-6 py-3 text-[10px] font-mono tracking-wider uppercase font-bold hover:border-brand-green hover:text-brand-green transition">Bowls protéinés</Link>
            <Link to="/shakes-proteines" className="rounded-full bg-[#0a0a0a] border border-neutral-800 text-white px-6 py-3 text-[10px] font-mono tracking-wider uppercase font-bold hover:border-brand-green hover:text-brand-green transition">Shakes protéinés</Link>
          </div>
        </div>
      </section>

      <section className="bg-[#050505] py-16 border-t border-neutral-900">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-green font-bold block mb-4">FAQ</span>
            <h2 className="font-display text-2xl font-extrabold text-white sm:text-4xl tracking-[-0.03em]">Récupération : vos questions</h2>
          </div>
          <div className="space-y-3">
            {faqItems.map((item, idx) => (
              <div key={idx} className="rounded-2xl border border-neutral-900 bg-[#0a0a0a] overflow-hidden hover:border-neutral-800 transition">
                <button onClick={() => setOpenFaq(openFaq === idx ? null : idx)} className="w-full text-left px-6 py-5 flex justify-between items-center">
                  <span className="text-sm font-bold text-white">{item.q}</span>
                  {openFaq === idx ? <ChevronUp className="h-4 w-4 text-brand-green shrink-0" /> : <ChevronDown className="h-4 w-4 text-neutral-500 shrink-0" />}
                </button>
                {openFaq === idx && (
                  <div className="px-6 pb-6 pt-2 border-t border-neutral-900 text-xs text-neutral-400 leading-relaxed">{item.a}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#050505] py-16 border-t border-neutral-900">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl font-extrabold text-white mb-4">Optimisez votre récupération dès maintenant</h2>
          <p className="text-sm text-neutral-400 mb-8">Commandez vos repas et récupérez-les dans votre casier connecté après l'entraînement.</p>
          <Link to="/abonnements" className="inline-flex items-center gap-2 rounded-full bg-white text-black px-8 py-3 text-xs font-mono tracking-wider uppercase font-bold hover:bg-brand-green transition">
            Voir les abonnements <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
