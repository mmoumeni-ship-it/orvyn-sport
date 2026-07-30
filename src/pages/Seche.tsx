import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Flame, ChevronDown, ChevronUp, ArrowRight, Scale, Droplet, Activity } from 'lucide-react';
import SEO from '../components/SEO';
import { MEALS_DATABASE } from '../data/meals';

const secheMeals = MEALS_DATABASE.filter(m => m.goals.includes('Sèche') || m.goals.includes('Perte de poids'));

export default function Seche() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqItems = [
    { q: "Qu'est-ce qu'un repas adapté à la sèche ?", a: "Un repas pour la sèche est un repas hypocalorique mais riche en protéines, conçu pour maintenir la masse musculaire tout en favorisant la perte de masse grasse. Chez ORVYN, nos repas sèche contiennent entre 38 et 45g de protéines, des glucides à index glycémique bas et des lipides contrôlés." },
    { q: "Combien de calories par repas pour la sèche ?", a: "Nos repas adaptés à la sèche se situent entre 145 et 546 kcal selon le type de repas. Les shakes protéinés sont particulièrement adaptés (145-158 kcal) tandis que nos bowls comme le Salmon Recovery Bowl ou le Veggie Protein Bowl offrent un repas complet avec un bon ratio protéines/calories." },
    { q: "Puis-je utiliser ORVYN pour une perte de poids durable ?", a: "Oui, nos repas sont conçus pour s'intégrer dans une démarche de rééquilibrage alimentaire. Le Veggie Protein Bowl (468 kcal, 38g protéines) et nos shakes protéinés sont parfaits pour maintenir un déficit calorique contrôlé sans sacrifier les apports nutritionnels essentiels." },
    { q: "Les repas ORVYN contiennent-ils des sucres ajoutés ?", a: "Non, aucun sucre raffiné ajouté. Nous utilisons du stevia bio, des dattes Medjool ou du sirop d'érable bio en quantités minimales pour le goût. Tous nos repas sont conçus avec des ingrédients bruts et naturels." }
  ];

  return (
    <>
      <SEO
        title="Repas pour sèche"
        description="Repas équilibrés et contrôlés pour la sèche musculaire. Protéines élevées, calories maîtrisées pour une définition optimale."
        canonical="/repas-seche"
      />
      <section className="relative bg-[#050505] pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden">
        <div className="absolute top-1/2 right-1/4 h-[400px] w-[400px] rounded-full bg-orange-500/5 blur-[100px] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-green font-bold block mb-4">SÈCHE MUSCULAIRE</span>
          <h1 className="font-display text-4xl font-extrabold text-white sm:text-6xl tracking-[-0.03em] mb-6">Repas pour sèche</h1>
          <p className="text-sm text-neutral-400 max-w-2xl mx-auto font-sans">
            Repas équilibrés et contrôlés pour la sèche musculaire. Protéines élevées, calories maîtrisées pour une définition optimale.
          </p>
          <div className="flex justify-center gap-6 mt-8">
            <div className="text-center">
              <p className="text-2xl font-extrabold text-brand-green font-mono">{secheMeals.length}</p>
              <p className="text-[10px] font-mono uppercase text-neutral-500 tracking-wider">Repas adaptés</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-extrabold text-white font-mono">12-45g</p>
              <p className="text-[10px] font-mono uppercase text-neutral-500 tracking-wider">Protéines/repas</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-extrabold text-orange-400 font-mono">145-546</p>
              <p className="text-[10px] font-mono uppercase text-neutral-500 tracking-wider">Kcal/repas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-[#050505] py-16 border-t border-neutral-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl tracking-[-0.03em]">Des repas équilibrés pour une définition optimale</h2>
              <p className="text-sm text-neutral-400 leading-relaxed">
                La sèche musculaire nécessite un déficit calorique maîtrisé tout en maintenant un apport protéique élevé pour préserver la masse musculaire. Nos repas sont conçus avec des protéines de haute qualité, des glucides à faible index glycémique et des lipides essentiels.
              </p>
              <div className="space-y-3">
                {[
                  { icon: Scale, label: 'Calories maîtrisées', desc: 'Déficit contrôlé sans frustration' },
                  { icon: Activity, label: 'Protéines préservées', desc: 'Jusqu\'à 45g par repas' },
                  { icon: Droplet, label: 'Hydratation cellulaire', desc: 'Micronutriments essentiels' }
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-3 bg-[#0a0a0a] border border-neutral-900 rounded-xl p-4">
                    <item.icon className="h-5 w-5 text-brand-green shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-bold text-white">{item.label}</p>
                      <p className="text-[10px] text-neutral-500">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#0a0a0a] border border-neutral-900 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-white mb-4">Conseils pour une sèche réussie</h3>
              <ul className="space-y-3">
                {[
                  'Maintien d\'un apport protéique élevé (1.8-2.2g/kg)',
                  'Glucides complexes en quantité contrôlée autour des entraînements',
                  'Hydratation optimale (2.5-3L d\'eau par jour)',
                  'Lipides essentiels pour le soutien hormonal',
                  'Éviter les restrictions trop sévères qui freinent le métabolisme'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-neutral-300">
                    <span className="h-1.5 w-1.5 rounded-full bg-brand-green shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Product Grid */}
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl font-extrabold text-white sm:text-4xl tracking-[-0.03em] mb-4">Nos repas pour la sèche</h2>
          </div>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {secheMeals.map((meal, idx) => (
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
                    <span className="text-neutral-800">•</span>
                    <span className="text-neutral-500">{meal.carbs}g G</span>
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
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[#050505] py-16 border-t border-neutral-900">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-green font-bold block mb-4">FAQ</span>
            <h2 className="font-display text-2xl font-extrabold text-white sm:text-4xl tracking-[-0.03em]">Sèche : vos questions</h2>
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
          <h2 className="font-display text-2xl font-extrabold text-white mb-4">Prêt à obtenir une définition optimale ?</h2>
          <p className="text-sm text-neutral-400 mb-8">Commandez vos repas dès maintenant et récupérez-les dans votre casier connecté.</p>
          <Link to="/abonnements" className="inline-flex items-center gap-2 rounded-full bg-white text-black px-8 py-3 text-xs font-mono tracking-wider uppercase font-bold hover:bg-brand-green transition">
            Voir les abonnements <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
