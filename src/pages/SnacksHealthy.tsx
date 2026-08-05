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
      <section className="relative bg-beige pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden border-b border-line/70">
        <div className="absolute top-1/2 left-1/3 h-80 w-80 rounded-full bg-frais/20 blur-[100px] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="eyebrow text-sauge justify-center mb-4">Healthy snacks</span>
          <h1 className="font-display h-editorial text-charbon tracking-tight mb-6">Snacks healthy</h1>
          <p className="text-base text-olive max-w-2xl mx-auto font-sans leading-relaxed">
            Snacks healthy et protéinés pour sportifs. Brownie, cookie, energy balls. Sans sucre ajouté, riches en protéines.
          </p>
        </div>
      </section>

      <section className="bg-bone py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h2 className="font-display text-3xl font-semibold text-charbon tracking-tight">Des snacks qui allient plaisir et performance</h2>
              <p className="text-base text-olive leading-relaxed font-sans">
                Fini les encas industriels vides. Nos snacks protéinés sont élaborés avec des ingrédients bruts et naturels, sans sucre ajouté, pour vous offrir un plaisir gourmand qui sert vos objectifs sportifs.
              </p>
              <div className="space-y-3 pt-2">
                {[
                  { icon: Heart, label: '100% naturel', desc: 'Aucun additif, aucun conservateur' },
                  { icon: Cookie, label: 'Riche en protéines', desc: '12-20g de protéines par portion' },
                  { icon: Ban, label: 'Sans sucre ajouté', desc: 'Sucré naturellement (dattes, patate douce)' }
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
              <h3 className="text-sm font-semibold text-charbon mb-5">Pourquoi choisir nos snacks ?</h3>
              <ul className="space-y-3">
                {[
                  'Idéal pour combler un creux sans culpabilité',
                  'Parfait en collation pré ou post-entraînement',
                  'Transportable partout (sac de sport, bureau)',
                  'Ingrédients bruts, sans transformation industrielle',
                  'Fabriqués à la main en petites séries'
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
            <h2 className="font-display text-3xl font-semibold text-charbon sm:text-4xl tracking-tight mb-4">Nos snacks protéinés</h2>
            <p className="text-base text-olive max-w-2xl mx-auto font-sans">Des encas gourmands, sans compromis sur la qualité.</p>
          </div>
          <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {snacks.map((snack, idx) => (
              <motion.div
                key={snack.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group orvyn-clip-sm bg-white border border-line/70 shadow-[0_1px_4px_rgba(23,26,24,0.06)] overflow-hidden hover:shadow-[0_10px_30px_rgba(23,26,24,0.08)] hover:border-sauge/30 transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden bg-bg-secondary">
                  <img src={snack.image} alt={snack.name} loading="lazy" className="h-full w-full object-cover photo-lumineuse group-hover:scale-105 transition duration-700" />
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {snack.tags.slice(0, 2).map(t => (
                      <span key={t} className="text-[10px] tracking-widest uppercase bg-white/90 text-sauge border border-line/60 px-2 py-1 rounded-lg backdrop-blur-sm">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="text-lg font-display font-semibold text-charbon group-hover:text-sauge transition">{snack.name}</h3>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1 text-sauge font-semibold"><Flame className="h-3.5 w-3.5" />{snack.calories} kcal</span>
                    <span className="text-line">•</span>
                    <span className="text-olive font-medium">{snack.proteins}g Protéines</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {snack.goals.slice(0, 3).map(g => (
                      <span key={g} className="text-[10px] tracking-widest uppercase bg-sauge/10 text-sauge border border-sauge/20 px-2 py-0.5 rounded-lg">{g}</span>
                    ))}
                  </div>
                  <div className="pt-3 border-t border-line/60 flex items-center justify-between">
                    <span className="text-lg font-semibold text-charbon">{snack.price.toFixed(2)} €</span>
                    <Link to={`/menu/${snack.slug}`} className="text-xs font-medium text-sauge flex items-center gap-1 hover:gap-2 transition-all">Détails <ArrowRight className="h-3 w-3" /></Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Liens utiles */}
      <section className="bg-beige py-12 border-t border-line/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/bowls-proteines" className="orvyn-clip-sm border border-sauge/40 text-charbon px-6 py-3 text-xs font-semibold uppercase hover:bg-sauge hover:text-bone transition">
              Bowls protéinés
            </Link>
            <Link to="/shakes-proteines" className="orvyn-clip-sm border border-sauge/40 text-charbon px-6 py-3 text-xs font-semibold uppercase hover:bg-sauge hover:text-bone transition">
              Shakes protéinés
            </Link>
            <Link to="/repas-prise-de-masse" className="orvyn-clip-sm border border-sauge/40 text-charbon px-6 py-3 text-xs font-semibold uppercase hover:bg-sauge hover:text-bone transition">
              Repas prise de masse
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-bone py-16 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="eyebrow text-sauge justify-center mb-4">FAQ</span>
            <h2 className="font-display text-3xl font-semibold text-charbon tracking-tight">Snacks : vos questions</h2>
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
          <h2 className="font-display text-3xl font-semibold text-bone mb-4">Craquez pour nos snacks healthy</h2>
          <p className="text-base text-bone/70 mb-8 font-sans">Ajoutez-les à votre commande et récupérez-les dans votre casier.</p>
          <Link to="/abonnements" className="inline-flex items-center gap-2 orvyn-clip-sm bg-sauge text-bone px-8 py-3.5 text-xs font-semibold uppercase hover:bg-sauge-soft transition">
            Voir les abonnements <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
