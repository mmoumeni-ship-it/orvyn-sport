import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Flame, Award, ChevronDown, ChevronUp, ArrowRight, Check, Target } from 'lucide-react';
import SEO from '../components/SEO';
import { MEALS_DATABASE } from '../data/meals';

const bowls = MEALS_DATABASE.filter(m => m.category === 'Bowls');

export default function BowlsProteines() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqItems = [
    {
      q: "Quelle est la composition de vos bowls protéinés ?",
      a: "Chaque bowl ORVYN est composé d'une base de protéines premium (poulet fermier, bœuf bio, saumon Label Rouge ou tempeh), de glucides complexes à index glycémique bas (riz sauvage, quinoa, patate douce), de légumes frais et de bons lipides (avocat, huile de lin, graines). Tous nos ingrédients sont pesés au gramme pour une précision macro absolue."
    },
    {
      q: "Comment conserver et réchauffer mon bowl protéiné ?",
      a: "Nos bowls sont livrés réfrigérés dans des contenants hermétiques noirs mat. Conservez-les à 3°C maximum. Pour les déguster, retirez l'opercule et réchauffez 2-3 min au micro-ondes (800W) ou 8-10 min au four à 160°C. Ne congelez pas. La fraîcheur est garantie 72h après réception."
    },
    {
      q: "Quel bowl protéiné pour quel objectif sportif ?",
      a: "Pour la prise de masse : Power Chicken Bowl (574 kcal, 52g protéines). Pour la sèche : Salmon Recovery Bowl (546 kcal, 45g protéines). Pour une option végétale : Veggie Protein Bowl (468 kcal, 38g protéines). Chaque bowl est conçu pour un objectif spécifique avec des ratios macro adaptés."
    },
    {
      q: "Vos bowls contiennent-ils des allergènes ?",
      a: "Oui, certains bowls contiennent des allergènes comme le sésame, le soja, le poisson ou les fruits à coque. Consultez la fiche détaillée de chaque bowl pour la liste complète. Nos emballages mentionnent clairement les allergènes présents. Des options sans gluten et sans lactose sont disponibles."
    }
  ];

  return (
    <>
      <SEO
        title="Bowls protéinés"
        description="Découvrez nos bowls protéinés premium. Repas équilibrés riches en protéines pour la prise de masse, la sèche ou la récupération musculaire."
        canonical="/bowls-proteines"
      />
      {/* Hero */}
      <section className="relative bg-orvyn-carbon pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-clay/5 blur-[100px] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="font-display text-xs uppercase tracking-[0.25em] text-clay font-semibold block mb-4">SIGNATURE BOWLS</span>
          <h1 className="font-display h-editorial text-orvyn-bone tracking-tight mb-6">Bowls protéinés</h1>
          <p className="text-sm text-orvyn-bone/60 max-w-2xl mx-auto font-sans leading-relaxed">
            Découvrez nos bowls protéinés premium. Repas équilibrés riches en protéines pour la prise de masse, la sèche ou la récupération musculaire.
          </p>
        </div>
      </section>

      {/* Definition */}
      <section className="bg-orvyn-carbon py-16 border-t border-olive/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="font-display text-2xl font-semibold text-orvyn-bone sm:text-3xl tracking-tight">Qu'est-ce qu'un bowl protéiné ?</h2>
              <p className="text-sm text-orvyn-bone/60 leading-relaxed font-sans">
                Un bowl protéiné ORVYN est un repas complet et équilibré, assemblé dans un bowl noir mat signature. Chaque bowl contient une source de protéines premium, des glucides complexes, des légumes frais et des lipides sains. Le tout est pesé et calibré pour répondre aux besoins précis des sportifs.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { icon: Flame, label: 'Hautes protéines', sub: '38-55g par bowl' },
                  { icon: Award, label: 'Ingrédients premium', sub: 'Circuit court, bio' },
                  { icon: Target, label: 'Macros calibrées', sub: 'Précision au gramme' },
                  { icon: Check, label: 'Prêt en 3 min', sub: 'Réfrigéré, micro-ondable' }
                ].map((item) => (
                  <div key={item.label} className="bg-carbon-raised border border-olive/20 rounded-sm p-4 flex items-start gap-3">
                    <item.icon className="h-5 w-5 text-clay shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-orvyn-bone">{item.label}</p>
                      <p className="text-[10px] text-orvyn-bone/40 font-sans">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-carbon-raised orvyn-clip-sm depth p-6">
              <h3 className="text-sm font-semibold text-orvyn-bone mb-4">Valeurs nutritionnelles moyennes</h3>
              <div className="space-y-3">
                {[
                  { label: 'Calories', value: '460 - 600 kcal', color: 'text-clay' },
                  { label: 'Protéines', value: '38 - 55 g', color: 'text-orvyn-bone' },
                  { label: 'Glucides', value: '42 - 60 g', color: 'text-olive' },
                  { label: 'Lipides', value: '12 - 22 g', color: 'text-clay/80' },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between items-center py-2 border-b border-olive/20 last:border-0">
                    <span className="text-[10px] uppercase tracking-wider text-orvyn-bone/40">{row.label}</span>
                    <span className={`text-sm font-semibold ${row.color}`}>{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="bg-orvyn-carbon py-16 border-t border-olive/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl font-semibold text-orvyn-bone sm:text-4xl tracking-tight mb-4">Nos bowls protéinés</h2>
            <p className="text-sm text-orvyn-bone/60 max-w-xl mx-auto font-sans">{bowls.length} recettes premium</p>
          </div>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {bowls.map((bowl, idx) => (
              <motion.div
                key={bowl.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group orvyn-clip-sm depth bg-carbon-raised overflow-hidden hover:bg-[#2b2923] transition-all duration-300"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-carbon">
                  <img src={bowl.image} alt={bowl.name} className="h-full w-full object-cover photo-orvyn group-hover:scale-105 transition duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-carbon-raised via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 flex gap-1.5">
                    {bowl.tags.slice(0, 3).map(t => (
                      <span key={t} className="text-[8px] tracking-widest uppercase bg-carbon/80 text-orvyn-bone/70 border border-olive/30 px-1.5 py-0.5 backdrop-blur-sm">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <h3 className="text-lg font-display font-semibold text-orvyn-bone">{bowl.name}</h3>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    <div className="bg-carbon rounded-sm p-2">
                      <span className="block text-clay text-xs font-semibold">{bowl.calories}</span>
                      <span className="text-[8px] text-orvyn-bone/40 uppercase">Kcal</span>
                    </div>
                    <div className="bg-carbon rounded-sm p-2">
                      <span className="block text-orvyn-bone text-xs font-semibold">{bowl.proteins}g</span>
                      <span className="text-[8px] text-orvyn-bone/40 uppercase">Prot</span>
                    </div>
                    <div className="bg-carbon rounded-sm p-2">
                      <span className="block text-olive text-xs font-semibold">{bowl.carbs}g</span>
                      <span className="text-[8px] text-orvyn-bone/40 uppercase">Gluc</span>
                    </div>
                    <div className="bg-carbon rounded-sm p-2">
                      <span className="block text-clay/80 text-xs font-semibold">{bowl.lipids}g</span>
                      <span className="text-[8px] text-orvyn-bone/40 uppercase">Lip</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {bowl.goals.map(g => (
                      <span key={g} className="text-[8px] tracking-widest uppercase bg-lime/10 text-lime border border-lime/20 px-1.5 py-0.5">{g}</span>
                    ))}
                  </div>
                  <div className="pt-3 border-t border-olive/20 flex items-center justify-between">
                    <span className="text-lg font-semibold text-clay">{bowl.price.toFixed(2)} €</span>
                    <Link to={`/repas/${bowl.id}`} className="text-[10px] tracking-wider text-clay flex items-center gap-1 hover:gap-2 transition-all">
                      Détails <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Liens utiles */}
      <section className="bg-sand py-12 border-t border-olive/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/repas-prise-de-masse" className="orvyn-clip-sm border border-olive/50 text-carbon px-6 py-3 text-[10px] tracking-wider uppercase font-semibold hover:border-clay hover:text-clay transition">
              Repas prise de masse
            </Link>
            <Link to="/repas-seche" className="orvyn-clip-sm border border-olive/50 text-carbon px-6 py-3 text-[10px] tracking-wider uppercase font-semibold hover:border-clay hover:text-clay transition">
              Repas sèche
            </Link>
            <Link to="/repas-post-entrainement" className="orvyn-clip-sm border border-olive/50 text-carbon px-6 py-3 text-[10px] tracking-wider uppercase font-semibold hover:border-clay hover:text-clay transition">
              Repas post-entraînement
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-orvyn-carbon py-16 border-t border-olive/20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-display text-xs uppercase tracking-[0.25em] text-clay font-semibold block mb-4">FAQ</span>
            <h2 className="font-display text-2xl font-semibold text-orvyn-bone sm:text-4xl tracking-tight">Questions fréquentes sur les bowls</h2>
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
          <h2 className="font-display text-2xl font-semibold text-orvyn-bone mb-4">Prêt à passer commande ?</h2>
          <p className="text-sm text-orvyn-bone/60 mb-8 font-sans">Choisissez votre bowl protéiné et récupérez-le dans votre casier connecté.</p>
          <Link to="/abonnements" className="inline-flex items-center gap-2 orvyn-clip-sm bg-lime text-carbon px-8 py-3 text-xs tracking-wider uppercase font-semibold hover:bg-lime-soft transition">
            Voir les abonnements <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
