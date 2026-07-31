import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Flame, ChevronDown, ChevronUp, ArrowRight } from 'lucide-react';
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
      <section className="relative bg-orvyn-carbon pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 h-[400px] w-[400px] rounded-full bg-clay/5 blur-[100px] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="font-display text-xs uppercase tracking-[0.25em] text-clay font-semibold block mb-4">PROTEIN SHAKERS</span>
          <h1 className="font-display h-editorial text-orvyn-bone tracking-tight mb-6">Shakes protéinés</h1>
          <p className="text-sm text-orvyn-bone/60 max-w-2xl mx-auto font-sans leading-relaxed">
            Shakes protéinés premium ORVYN. Whey isolate, protéines végétales, matcha, café. Parfaits pour la récupération et la performance.
          </p>
        </div>
      </section>

      <section className="bg-orvyn-carbon py-16 border-t border-olive/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Flavors Grid */}
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl font-semibold text-orvyn-bone sm:text-4xl tracking-tight mb-4">Nos shakes protéinés</h2>
            <p className="text-sm text-orvyn-bone/60 font-sans">{shakers.length} recettes disponibles</p>
          </div>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {shakers.map((shake, idx) => (
              <motion.div
                key={shake.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group orvyn-clip-sm depth bg-carbon-raised overflow-hidden hover:bg-[#2b2923] transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-carbon">
                  <img src={shake.image} alt={shake.name} className="h-full w-full object-cover photo-orvyn group-hover:scale-105 transition duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-carbon-raised via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 flex gap-1.5">
                    {shake.tags.slice(0, 3).map(t => (
                      <span key={t} className="text-[8px] tracking-widest uppercase bg-carbon/80 text-orvyn-bone/70 border border-olive/30 px-1.5 py-0.5 backdrop-blur-sm">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <h3 className="text-lg font-display font-semibold text-orvyn-bone group-hover:text-clay transition">{shake.name}</h3>
                  <p className="text-xs text-orvyn-bone/60 leading-relaxed font-sans">{shake.description}</p>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="bg-carbon rounded-sm p-2">
                      <span className="block text-clay text-xs font-semibold">{shake.calories}</span>
                      <span className="text-[8px] text-orvyn-bone/40 uppercase">Kcal</span>
                    </div>
                    <div className="bg-carbon rounded-sm p-2">
                      <span className="block text-orvyn-bone text-xs font-semibold">{shake.proteins}g</span>
                      <span className="text-[8px] text-orvyn-bone/40 uppercase">Prot</span>
                    </div>
                    <div className="bg-carbon rounded-sm p-2">
                      <span className="block text-olive text-xs font-semibold">{shake.carbs}g</span>
                      <span className="text-[8px] text-orvyn-bone/40 uppercase">Gluc</span>
                    </div>
                    <div className="bg-carbon rounded-sm p-2">
                      <span className="block text-clay/80 text-xs font-semibold">{shake.lipids}g</span>
                      <span className="text-[8px] text-orvyn-bone/40 uppercase">Lip</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {shake.goals.map(g => (
                      <span key={g} className="text-[8px] tracking-widest uppercase bg-lime/10 text-lime border border-lime/20 px-1.5 py-0.5">{g}</span>
                    ))}
                  </div>
                  <div className="pt-3 border-t border-olive/20 flex items-center justify-between">
                    <span className="text-lg font-semibold text-clay">{shake.price.toFixed(2)} €</span>
                    <Link to={`/repas/${shake.id}`} className="text-[10px] tracking-wider text-clay flex items-center gap-1 hover:gap-2 transition-all">Détails <ArrowRight className="h-3 w-3" /></Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Macros Comparison Table */}
      <section className="bg-orvyn-carbon py-16 border-t border-olive/20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-display text-2xl font-semibold text-orvyn-bone sm:text-3xl tracking-tight mb-4">Comparatif nutritionnel</h2>
            <p className="text-xs text-orvyn-bone/60 font-sans">Comparez les profils macro de nos shakes protéinés</p>
          </div>
          <div className="overflow-x-auto orvyn-clip-sm bg-carbon border border-olive/20">
            <table className="w-full text-left border-collapse text-xs font-sans">
              <thead>
                <tr className="border-b border-olive/20 bg-carbon-raised text-[10px] tracking-widest uppercase text-orvyn-bone/50">
                  <th className="p-4 font-semibold">Shake</th>
                  <th className="p-4 text-center font-semibold">Type</th>
                  <th className="p-4 text-center font-semibold text-clay">Calories</th>
                  <th className="p-4 text-center font-semibold">Protéines</th>
                  <th className="p-4 text-center font-semibold text-olive">Glucides</th>
                  <th className="p-4 text-center font-semibold text-clay/80">Lipides</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-olive/20 text-orvyn-bone/60">
                {shakers.map(shake => (
                  <tr key={shake.id} className="hover:bg-carbon-raised/60 transition-colors">
                    <td className="p-4 font-medium text-orvyn-bone">{shake.name}</td>
                    <td className="p-4 text-center text-orvyn-bone/40">{shake.tags.includes('Vegan') ? 'Végan' : 'Whey Isolate'}</td>
                    <td className="p-4 text-center text-clay font-semibold">{shake.calories} kcal</td>
                    <td className="p-4 text-center">{shake.proteins}g</td>
                    <td className="p-4 text-center text-olive">{shake.carbs}g</td>
                    <td className="p-4 text-center text-clay/80">{shake.lipids}g</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-orvyn-carbon py-16 border-t border-olive/20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-display text-xs uppercase tracking-[0.25em] text-clay font-semibold block mb-4">FAQ</span>
            <h2 className="font-display text-2xl font-semibold text-orvyn-bone sm:text-4xl tracking-tight">Shakes protéinés : vos questions</h2>
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

      {/* CTA */}
      <section className="bg-orvyn-carbon py-16 border-t border-olive/20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl font-semibold text-orvyn-bone mb-4">Prêt à booster votre récupération ?</h2>
          <p className="text-sm text-orvyn-bone/60 mb-8 font-sans">Ajoutez nos shakes protéinés à votre commande.</p>
          <Link to="/abonnements" className="inline-flex items-center gap-2 orvyn-clip-sm bg-lime text-carbon px-8 py-3 text-xs tracking-wider uppercase font-semibold hover:bg-lime-soft transition">
            Voir les abonnements <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
