import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Flame, Dumbbell, Zap, ChevronDown, ChevronUp, ArrowRight, CheckCircle } from 'lucide-react';
import SEO from '../components/SEO';
import { MEALS_DATABASE } from '../data/meals';

const massMeals = MEALS_DATABASE.filter(m => m.goals.includes('Prise de masse'));

export default function PriseDeMasse() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqItems = [
    { q: "Quels sont les besoins nutritionnels pour la prise de masse ?", a: "La prise de masse musculaire nécessite un surplus calorique contrôlé de 300 à 500 kcal par jour, avec un apport protéique de 1.6 à 2.2 g par kg de poids corporel. Les glucides complexes sont essentiels pour fournir l'énergie nécessaire à l'entraînement intensif et optimiser la synthèse protéique musculaire." },
    { q: "Pourquoi choisir ORVYN pour ma prise de masse ?", a: "Nos bowls prise de masse sont calibrés avec des ratios précis : 30% protéines, 50% glucides, 20% lipides. Chaque repas contient entre 45 et 55g de protéines premium et des glucides à index glycémique bas pour un apport énergétique durable sans stockage adipeux excessif." },
    { q: "Combien de repas ORVYN par jour pour la prise de masse ?", a: "Nous recommandons 2 à 3 repas ORVYN par jour en complément d'une alimentation équilibrée. Le Power Chicken Bowl et le Beef Performance Bowl sont idéaux pour le déjeuner et le dîner, avec un shake protéiné en collation post-entraînement." },
    { q: "Les repas ORVYN sont-ils suffisants pour la prise de masse ?", a: "Oui, dans le cadre d'un plan nutritionnel global. Nos repas sont conçus pour fournir une base nutritionnelle solide. Adaptez les quantités selon votre métabolisme et votre dépense énergétique. Un accompagnement par notre coach nutritionniste est disponible dans nos formules Pro et Elite." }
  ];

  return (
    <>
      <SEO
        title="Repas prise de masse"
        description="Repas adaptés à la prise de masse. Bowls protéinés hypercaloriques riches en protéines et glucides pour optimiser l'hypertrophie musculaire."
        canonical="/repas-prise-de-masse"
      />
      <section className="relative bg-beige pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden border-b border-line/70">
        <div className="absolute top-1/4 left-1/3 h-96 w-96 rounded-full bg-frais/20 blur-[120px] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="eyebrow text-sauge justify-center mb-4">Prise de masse</span>
          <h1 className="font-display h-editorial text-charbon tracking-tight mb-6">Repas prise de masse</h1>
          <p className="text-base text-olive max-w-2xl mx-auto font-sans leading-relaxed">
            Repas adaptés à la prise de masse. Bowls protéinés hypercaloriques riches en protéines et glucides pour optimiser l'hypertrophie musculaire.
          </p>
          <div className="flex justify-center gap-8 sm:gap-12 mt-10">
            <div className="text-center">
              <p className="text-3xl font-semibold text-sauge font-display">{massMeals.length}</p>
              <p className="text-[11px] uppercase text-olive tracking-wider mt-1">Repas adaptés</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-semibold text-sauge font-display">45-55g</p>
              <p className="text-[11px] uppercase text-olive tracking-wider mt-1">Protéines/repas</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-semibold text-sauge font-display">500-600</p>
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
              <h2 className="font-display text-3xl font-semibold text-charbon tracking-tight">L'importance des protéines et de l'énergie</h2>
              <p className="text-base text-olive leading-relaxed font-sans">
                La prise de masse musculaire repose sur un équilibre précis : un apport calorique supérieur à vos dépenses, associé à un apport protéique suffisant pour stimuler la synthèse protéique musculaire. Nos repas sont conçus pour vous apporter exactement ce dont vous avez besoin.
              </p>
              <div className="space-y-3 pt-2">
                {[
                  { icon: Dumbbell, label: 'Protéines de qualité', desc: 'Poulet fermier, bœuf bio, whey isolate' },
                  { icon: Zap, label: 'Glucides complexes', desc: 'Riz sauvage, quinoa, patate douce' },
                  { icon: CheckCircle, label: 'Ratio optimal', desc: '30% P / 50% G / 20% L' }
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
              <h3 className="text-sm font-semibold text-charbon mb-5 flex items-center gap-2"><Dumbbell className="h-4 w-4 text-sauge" /> Pour les athlètes en phase de volume</h3>
              <ul className="space-y-3">
                {[
                  'Surplus calorique contrôlé pour minimiser le stockage adipeux',
                  'Protéines premium pour une biodisponibilité maximale',
                  'Glucides complexes pour l\'énergie durable à l\'entraînement',
                  'Lipides sains pour le soutien hormonal (oméga-3, oméga-6)',
                  'Micronutriments essentiels pour la récupération cellulaire'
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
            <h2 className="font-display text-3xl font-semibold text-charbon sm:text-4xl tracking-tight mb-4">Nos repas pour la prise de masse</h2>
            <p className="text-base text-olive max-w-2xl mx-auto font-sans">Des formules denses en nutriments, préparées avec des ingrédients bruts et lumineux.</p>
          </div>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {massMeals.map((meal, idx) => (
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

      {/* Links */}
      <section className="bg-beige py-12 border-t border-line/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/bowls-proteines" className="orvyn-clip-sm border border-sauge/40 text-charbon px-6 py-3 text-xs font-semibold uppercase hover:bg-sauge hover:text-bone transition">Bowls protéinés</Link>
            <Link to="/repas-post-entrainement" className="orvyn-clip-sm border border-sauge/40 text-charbon px-6 py-3 text-xs font-semibold uppercase hover:bg-sauge hover:text-bone transition">Repas post-entraînement</Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-bone py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="eyebrow text-sauge justify-center mb-4">FAQ</span>
            <h2 className="font-display text-3xl font-semibold text-charbon tracking-tight">Prise de masse : vos questions</h2>
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
          <h2 className="font-display text-3xl font-semibold text-bone mb-4">Prêt à construire votre masse musculaire ?</h2>
          <p className="text-base text-bone/70 mb-8 font-sans">Commandez vos repas dès maintenant et récupérez-les dans votre casier connecté.</p>
          <Link to="/abonnements" className="inline-flex items-center gap-2 orvyn-clip-sm bg-sauge text-bone px-8 py-3.5 text-xs font-semibold uppercase hover:bg-sauge-soft transition">
            Voir les abonnements <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
