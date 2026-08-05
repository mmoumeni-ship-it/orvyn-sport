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
      <section className="relative bg-beige pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden border-b border-line/70">
        <div className="absolute top-1/2 right-1/4 h-80 w-80 rounded-full bg-frais/20 blur-[100px] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="eyebrow text-sauge justify-center mb-4">Sèche musculaire</span>
          <h1 className="font-display h-editorial text-charbon tracking-tight mb-6">Repas pour sèche</h1>
          <p className="text-base text-olive max-w-2xl mx-auto font-sans leading-relaxed">
            Repas équilibrés et contrôlés pour la sèche musculaire. Protéines élevées, calories maîtrisées pour une définition optimale.
          </p>
          <div className="flex justify-center gap-8 sm:gap-12 mt-10">
            <div className="text-center">
              <p className="text-3xl font-semibold text-sauge font-display">{secheMeals.length}</p>
              <p className="text-[11px] uppercase text-olive tracking-wider mt-1">Repas adaptés</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-semibold text-sauge font-display">12-45g</p>
              <p className="text-[11px] uppercase text-olive tracking-wider mt-1">Protéines/repas</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-semibold text-sauge font-display">145-546</p>
              <p className="text-[11px] uppercase text-olive tracking-wider mt-1">Kcal/repas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-bone py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h2 className="font-display text-3xl font-semibold text-charbon tracking-tight">Des repas équilibrés pour une définition optimale</h2>
              <p className="text-base text-olive leading-relaxed font-sans">
                La sèche musculaire nécessite un déficit calorique maîtrisé tout en maintenant un apport protéique élevé pour préserver la masse musculaire. Nos repas sont conçus avec des protéines de haute qualité, des glucides à faible index glycémique et des lipides essentiels.
              </p>
              <div className="space-y-3 pt-2">
                {[
                  { icon: Scale, label: 'Calories maîtrisées', desc: 'Déficit contrôlé sans frustration' },
                  { icon: Activity, label: 'Protéines préservées', desc: 'Jusqu\'à 45g par repas' },
                  { icon: Droplet, label: 'Hydratation cellulaire', desc: 'Micronutriments essentiels' }
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-3 bg-white border border-line/70 rounded-2xl p-4">
                    <item.icon className="h-5 w-5 text-sauge shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-charbon">{item.label}</p>
                      <p className="text-xs text-olive font-sans mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-beige orvyn-clip border border-line/70 p-7">
              <h3 className="text-sm font-semibold text-charbon mb-5">Conseils pour une sèche réussie</h3>
              <ul className="space-y-3">
                {[
                  'Maintien d\'un apport protéique élevé (1.8-2.2g/kg)',
                  'Glucides complexes en quantité contrôlée autour des entraînements',
                  'Hydratation optimale (2.5-3L d\'eau par jour)',
                  'Lipides essentiels pour le soutien hormonal',
                  'Éviter les restrictions trop sévères qui freinent le métabolisme'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-charbon/75 font-sans">
                    <span className="h-1.5 w-1.5 bg-sauge shrink-0 mt-2" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Product Grid */}
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-semibold text-charbon sm:text-4xl tracking-tight mb-4">Nos repas pour la sèche</h2>
            <p className="text-base text-olive max-w-2xl mx-auto font-sans">Des formules légères, rassasiantes et riches en protéines, sans frustration.</p>
          </div>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {secheMeals.map((meal, idx) => (
              <motion.div
                key={meal.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group orvyn-clip-sm bg-white border border-line/70 shadow-[0_1px_4px_rgba(23,26,24,0.06)] overflow-hidden hover:shadow-[0_10px_30px_rgba(23,26,24,0.08)] hover:border-sauge/30 transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden bg-bg-secondary">
                  <img src={meal.image} alt={meal.name} loading="lazy" className="h-full w-full object-cover photo-lumineuse group-hover:scale-105 transition duration-700" />
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
                    <span className="text-line">•</span>
                    <span className="text-olive/80">{meal.carbs}g G</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {meal.goals.map(g => (
                      <span key={g} className="text-[10px] tracking-widest uppercase bg-sauge/10 text-sauge border border-sauge/20 px-2 py-0.5 rounded-lg">{g}</span>
                    ))}
                  </div>
                  <div className="pt-3 border-t border-line/60 flex items-center justify-between">
                    <span className="text-lg font-semibold text-charbon">{meal.price.toFixed(2)} €</span>
                    <Link to={`/menu/${meal.slug}`} className="text-xs font-medium text-sauge flex items-center gap-1 hover:gap-2 transition-all">Détails <ArrowRight className="h-3 w-3" /></Link>
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
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-bone py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="eyebrow text-sauge justify-center mb-4">FAQ</span>
            <h2 className="font-display text-3xl font-semibold text-charbon tracking-tight">Sèche : vos questions</h2>
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
          <h2 className="font-display text-3xl font-semibold text-bone mb-4">Prêt à obtenir une définition optimale ?</h2>
          <p className="text-base text-bone/70 mb-8 font-sans">Commandez vos repas dès maintenant et récupérez-les dans votre casier connecté.</p>
          <Link to="/abonnements" className="inline-flex items-center gap-2 orvyn-clip-sm bg-sauge text-bone px-8 py-3.5 text-xs font-semibold uppercase hover:bg-sauge-soft transition">
            Voir les abonnements <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
