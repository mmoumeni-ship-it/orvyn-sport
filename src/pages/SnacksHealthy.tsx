import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Flame, ChevronDown, ChevronUp, ArrowRight, Cookie, Heart, Ban } from 'lucide-react';
import SEO from '../components/SEO';
import { MEALS_DATABASE } from '../data/meals';

const snacks = MEALS_DATABASE.filter(m => m.category === 'Snacks');

export default function SnacksHealthy() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqItems = [
    { q: "Quels sont les avantages de vos snacks protéinés ?", a: "Nos snacks sont conçus pour les sportifs exigeants : sans sucre ajouté, riches en protéines (12-20g par portion), fabriqués à partir d'ingrédients bruts et naturels. Ils constituent l'encas idéal pour combler un creux sans compromettre vos objectifs nutritionnels." },
    { q: "Les snacks ORVYN peuvent-ils remplacer un repas ?", a: "Non, nos snacks sont conçus comme des compléments ou des encas entre les repas. Avec 174 à 249 kcal, ils sont parfaits pour un boost protéiné en milieu de matinée ou d'après-midi, ou comme en-cas post-entraînement léger." },
    { q: "Contiennent-ils du sucre ajouté ou des conservateurs ?", a: "Aucun sucre ajouté, aucun conservateur, aucun additif artificiel. Nos snacks sont sucrés naturellement grâce aux dattes Medjool, à la patate douce et au sirop d'érable bio. Leur conservation est assurée par des méthodes artisanales (cuisson basse température, déshydratation)." },
    { q: "Quel snack choisir selon mon objectif ?", a: "Pour la prise de masse : Brownie Protéiné (181 kcal, 18g protéines) ou Cookie Protéiné (249 kcal, 20g protéines). Pour la performance : Energy Balls (174 kcal, 12g protéines) grâce aux dattes et au chia. Tous sont riches en protéines et pauvres en sucres." }
  ];

  return (
    <>
      <SEO
        title="Snacks healthy pour sportifs"
        description="Snacks healthy et protéinés pour sportifs. Brownie, cookie, energy balls. Sans sucre ajouté, riches en protéines."
        canonical="/snacks-healthy"
      />
      <section className="relative bg-orvyn-carbon pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/3 h-[400px] w-[400px] rounded-full bg-clay/5 blur-[100px] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="font-display text-xs uppercase tracking-[0.25em] text-clay font-semibold block mb-4">HEALTHY SNACKS</span>
          <h1 className="font-display h-editorial text-orvyn-bone tracking-tight mb-6">Snacks healthy</h1>
          <p className="text-sm text-orvyn-bone/60 max-w-2xl mx-auto font-sans leading-relaxed">
            Snacks healthy et protéinés pour sportifs. Brownie, cookie, energy balls. Sans sucre ajouté, riches en protéines.
          </p>
        </div>
      </section>

      <section className="bg-orvyn-carbon py-16 border-t border-olive/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <h2 className="font-display text-2xl font-semibold text-orvyn-bone sm:text-3xl tracking-tight">Des snacks qui allient plaisir et performance</h2>
              <p className="text-sm text-orvyn-bone/60 leading-relaxed font-sans">
                Fini les encas industriels vides. Nos snacks protéinés sont élaborés avec des ingrédients bruts et naturels, sans sucre ajouté, pour vous offrir un plaisir gourmand qui sert vos objectifs sportifs.
              </p>
              <div className="space-y-3">
                {[
                  { icon: Heart, label: '100% naturel', desc: 'Aucun additif, aucun conservateur' },
                  { icon: Cookie, label: 'Riche en protéines', desc: '12-20g de protéines par portion' },
                  { icon: Ban, label: 'Sans sucre ajouté', desc: 'Sucré naturellement (dattes, patate douce)' }
                ].map(item => (
                  <div key={item.label} className="flex items-start gap-3 bg-carbon-raised border border-olive/20 rounded-sm p-4">
                    <item.icon className="h-5 w-5 text-clay shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-orvyn-bone">{item.label}</p>
                      <p className="text-[10px] text-orvyn-bone/40 font-sans">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-carbon-raised orvyn-clip-sm depth p-6">
              <h3 className="text-sm font-semibold text-orvyn-bone mb-4">Pourquoi choisir nos snacks ?</h3>
              <ul className="space-y-3">
                {[
                  'Idéal pour combler un creux sans culpabilité',
                  'Parfait en collation pré ou post-entraînement',
                  'Transportable partout (sac de sport, bureau)',
                  'Ingrédients bruts, sans transformation industrielle',
                  'Fabriqués à la main en petites séries'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs text-orvyn-bone/60 font-sans">
                    <span className="h-1.5 w-1.5 bg-clay shrink-0 mt-1.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="text-center mb-12">
            <h2 className="font-display text-2xl font-semibold text-orvyn-bone sm:text-4xl tracking-tight mb-4">Nos snacks protéinés</h2>
          </div>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {snacks.map((snack, idx) => (
              <motion.div
                key={snack.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group orvyn-clip-sm depth bg-carbon-raised overflow-hidden hover:bg-[#2b2923] transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden bg-carbon">
                  <img src={snack.image} alt={snack.name} className="h-full w-full object-cover photo-orvyn group-hover:scale-105 transition duration-700" />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {snack.tags.slice(0, 2).map(t => (
                      <span key={t} className="text-[8px] tracking-widest uppercase bg-carbon/80 text-orvyn-bone/70 border border-olive/30 px-1.5 py-0.5 backdrop-blur-sm">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="text-base font-display font-semibold text-orvyn-bone group-hover:text-clay transition">{snack.name}</h3>
                  <div className="flex items-center gap-3 text-[10px]">
                    <span className="flex items-center gap-1 text-clay font-semibold"><Flame className="h-3.5 w-3.5" />{snack.calories} kcal</span>
                    <span className="text-olive/40">•</span>
                    <span className="text-orvyn-bone/50 font-medium">{snack.proteins}g Protéines</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {snack.goals.slice(0, 3).map(g => (
                      <span key={g} className="text-[8px] tracking-widest uppercase bg-lime/10 text-lime border border-lime/20 px-1.5 py-0.5">{g}</span>
                    ))}
                  </div>
                  <div className="pt-3 border-t border-olive/20 flex items-center justify-between">
                    <span className="text-lg font-semibold text-clay">{snack.price.toFixed(2)} €</span>
                    <Link to={`/repas/${snack.id}`} className="text-[10px] tracking-wider text-clay flex items-center gap-1 hover:gap-2 transition-all">Détails <ArrowRight className="h-3 w-3" /></Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-orvyn-carbon py-16 border-t border-olive/20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="font-display text-xs uppercase tracking-[0.25em] text-clay font-semibold block mb-4">FAQ</span>
            <h2 className="font-display text-2xl font-semibold text-orvyn-bone sm:text-4xl tracking-tight">Snacks : vos questions</h2>
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
          <h2 className="font-display text-2xl font-semibold text-orvyn-bone mb-4">Craquez pour nos snacks healthy</h2>
          <p className="text-sm text-orvyn-bone/60 mb-8 font-sans">Ajoutez-les à votre commande et récupérez-les dans votre casier.</p>
          <Link to="/abonnements" className="inline-flex items-center gap-2 orvyn-clip-sm bg-sauge text-bone px-8 py-3 text-xs tracking-wider uppercase font-semibold hover:bg-lime-soft transition">
            Voir les abonnements <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
