import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import { MEALS_DATABASE } from '../data/meals';

const shakers = MEALS_DATABASE.filter(m => m.category === 'Shakers');

export default function ShakesProteines() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqItems = [
    { q: "Quels types de protéines utilisez-vous dans vos shakes ?", a: "Nous utilisons trois types de protéines selon les recettes : l'isolat de whey native (filtration à froid, 90% de protéines pures) pour nos classiques vanille et chocolat, l'isolat de protéine de pois jaune bio pour nos options vegan (Matcha, Café), et la protéine de riz brun bio complémentaire. Toutes sont sans OGM, sans hormones et sans gluten." },
    { q: "Quelle est la différence entre vos shakes ?", a: "Chaque shake a un profil unique : Whey Vanille (32g protéines, 145 kcal) est le plus pur et neutre, Whey Chocolat (32g, 153 kcal) est plus gourmand, Matcha Protein (28g, 146 kcal) est végan avec boost antioxydant, Café Protein Boost (26g, 158 kcal) est végan avec caféine naturelle." },
    { q: "Les shakes ORVYN contiennent-ils des édulcorants artificiels ?", a: "Non, aucun édulcorant artificiel. Nous utilisons exclusivement du stevia bio et des arômes naturels. Nos shakes sont sans aspartame, sans sucralose et sans additifs synthétiques. Le goût provient d'ingrédients bruts : vanille Bourbon, cacao équatorien 85%, matcha japonais cérémoniel." },
    { q: "Quand consommer mon shake protéiné ?", a: "Idéalement dans les 30 minutes post-entraînement pour une assimilation rapide des acides aminés. Le Café Protein Boost est parfait le matin ou avant l'entraînement. Le Matcha Protein Signature est excellent en collation en milieu d'après-midi. Tous nos shakes peuvent aussi être consommés en encas protéiné entre les repas." }
  ];

  return (
    <>
      <SEO
        title="Shakes protéinés"
        description="Shakes protéinés premium ORVYN. Whey isolate, protéines végétales, matcha, café. Parfaits pour la récupération et la performance."
        canonical="/shakes-proteines"
      />
      <section className="relative bg-beige pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden border-b border-line/70">
        <div className="absolute top-1/3 left-1/4 h-80 w-80 rounded-full bg-frais/20 blur-[100px] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="eyebrow text-sauge justify-center mb-4">Protein shakers</span>
          <h1 className="font-display h-editorial text-charbon tracking-tight mb-6">Shakes protéinés</h1>
          <p className="text-base text-olive max-w-2xl mx-auto font-sans leading-relaxed">
            Shakes protéinés premium ORVYN. Whey isolate, protéines végétales, matcha, café. Parfaits pour la récupération et la performance.
          </p>
        </div>
      </section>

      <section className="bg-bone py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Flavors Grid */}
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-semibold text-charbon sm:text-4xl tracking-tight mb-4">Nos shakes protéinés</h2>
            <p className="text-base text-olive font-sans">{shakers.length} recettes disponibles</p>
          </div>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {shakers.map((shake, idx) => (
              <motion.div
                key={shake.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group orvyn-clip-sm bg-white border border-line/70 shadow-[0_1px_4px_rgba(23,26,24,0.06)] overflow-hidden hover:shadow-[0_10px_30px_rgba(23,26,24,0.08)] hover:border-sauge/30 transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-bg-secondary">
                  <img src={shake.image} alt={shake.name} loading="lazy" className="h-full w-full object-cover photo-lumineuse group-hover:scale-105 transition duration-700" />
                  <div className="absolute bottom-3 left-3 flex gap-1.5">
                    {shake.tags.slice(0, 3).map(t => (
                      <span key={t} className="text-[10px] tracking-widest uppercase bg-white/90 text-sauge border border-line/60 px-2 py-1 rounded-lg backdrop-blur-sm">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <h3 className="text-lg font-display font-semibold text-charbon group-hover:text-sauge transition">{shake.name}</h3>
                  <p className="text-sm text-olive leading-relaxed font-sans">{shake.description}</p>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="bg-bg-secondary rounded-xl p-2 border border-line/60">
                      <span className="block text-sauge text-sm font-semibold">{shake.calories}</span>
                      <span className="text-[10px] text-olive uppercase">Kcal</span>
                    </div>
                    <div className="bg-bg-secondary rounded-xl p-2 border border-line/60">
                      <span className="block text-charbon text-sm font-semibold">{shake.proteins}g</span>
                      <span className="text-[10px] text-olive uppercase">Prot</span>
                    </div>
                    <div className="bg-bg-secondary rounded-xl p-2 border border-line/60">
                      <span className="block text-charbon text-sm font-semibold">{shake.carbs}g</span>
                      <span className="text-[10px] text-olive uppercase">Gluc</span>
                    </div>
                    <div className="bg-bg-secondary rounded-xl p-2 border border-line/60">
                      <span className="block text-charbon text-sm font-semibold">{shake.lipids}g</span>
                      <span className="text-[10px] text-olive uppercase">Lip</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {shake.goals.map(g => (
                      <span key={g} className="text-[10px] tracking-widest uppercase bg-sauge/10 text-sauge border border-sauge/20 px-2 py-0.5 rounded-lg">{g}</span>
                    ))}
                  </div>
                  <div className="pt-3 border-t border-line/60 flex items-center justify-between">
                    <span className="text-lg font-semibold text-charbon">{shake.price.toFixed(2)} €</span>
                    <Link to={`/menu/${shake.slug}`} className="text-xs font-medium text-sauge flex items-center gap-1 hover:gap-2 transition-all">Détails <ArrowRight className="h-3 w-3" /></Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Macros Comparison Table */}
      <section className="bg-beige py-16 lg:py-20 border-t border-line/70">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="eyebrow text-sauge justify-center mb-4">Comparatif</span>
            <h2 className="font-display text-3xl font-semibold text-charbon tracking-tight mb-3">Comparatif nutritionnel</h2>
            <p className="text-sm text-olive font-sans">Comparez les profils macro de nos shakes protéinés</p>
          </div>
          <div className="overflow-x-auto orvyn-clip-sm bg-white border border-line/70">
            <table className="w-full text-left border-collapse text-sm font-sans">
              <thead>
                <tr className="border-b border-line/70 bg-bg-secondary text-[11px] tracking-widest uppercase text-olive">
                  <th className="p-4 font-semibold text-charbon">Shake</th>
                  <th className="p-4 text-center font-semibold">Type</th>
                  <th className="p-4 text-center font-semibold text-sauge">Calories</th>
                  <th className="p-4 text-center font-semibold">Protéines</th>
                  <th className="p-4 text-center font-semibold">Glucides</th>
                  <th className="p-4 text-center font-semibold">Lipides</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60 text-olive">
                {shakers.map(shake => (
                  <tr key={shake.id} className="hover:bg-bg-secondary/60 transition-colors">
                    <td className="p-4 font-medium text-charbon">{shake.name}</td>
                    <td className="p-4 text-center">{shake.tags.includes('Vegan') ? 'Végan' : 'Whey Isolate'}</td>
                    <td className="p-4 text-center text-sauge font-semibold">{shake.calories} kcal</td>
                    <td className="p-4 text-center text-charbon font-medium">{shake.proteins}g</td>
                    <td className="p-4 text-center">{shake.carbs}g</td>
                    <td className="p-4 text-center">{shake.lipids}g</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Liens utiles */}
      <section className="bg-beige py-12 border-t border-line/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/bowls-proteines" className="orvyn-clip-sm border border-sauge/40 text-charbon px-6 py-3 text-xs font-semibold uppercase hover:bg-sauge hover:text-bone transition">
              Bowls protéinés
            </Link>
            <Link to="/snacks-healthy" className="orvyn-clip-sm border border-sauge/40 text-charbon px-6 py-3 text-xs font-semibold uppercase hover:bg-sauge hover:text-bone transition">
              Snacks healthy
            </Link>
            <Link to="/repas-post-entrainement" className="orvyn-clip-sm border border-sauge/40 text-charbon px-6 py-3 text-xs font-semibold uppercase hover:bg-sauge hover:text-bone transition">
              Repas post-entraînement
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-bone py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="eyebrow text-sauge justify-center mb-4">FAQ</span>
            <h2 className="font-display text-3xl font-semibold text-charbon tracking-tight">Shakes protéinés : vos questions</h2>
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

      {/* CTA */}
      <section className="bg-charbon py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="eyebrow text-frais justify-center mb-4">Commander avec ORVYN</span>
          <h2 className="font-display text-3xl font-semibold text-bone mb-4">Prêt à booster votre récupération ?</h2>
          <p className="text-base text-bone/70 mb-8 font-sans">Ajoutez nos shakes protéinés à votre commande.</p>
          <Link to="/abonnements" className="inline-flex items-center gap-2 orvyn-clip-sm bg-sauge text-bone px-8 py-3.5 text-xs font-semibold uppercase hover:bg-sauge-soft transition">
            Voir les abonnements <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
