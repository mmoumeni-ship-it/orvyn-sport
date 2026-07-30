import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, ChevronUp, HelpCircle, Search, X } from 'lucide-react';
import SEO from '../components/SEO';

const faqItems = [
  {
    category: 'Composition des repas',
    items: [
      { q: "Quelle est la composition de vos repas ?", a: "Chaque repas ORVYN est composé d'une source de protéines premium (poulet fermier, bœuf bio, saumon Label Rouge, tempeh bio), de glucides complexes à index glycémique bas (riz sauvage, quinoa, patate douce), de légumes frais de saison et de bons lipides (avocat, huile de lin, graines de courge). Les shakes sont à base d'isolat de protéines filtré à froid." },
      { q: "Vos repas contiennent-ils des additifs ou conservateurs ?", a: "Aucun additif, aucun conservateur, aucun colorant artificiel. Nos repas sont fabriqués à partir d'ingrédients 100% bruts et naturels. La conservation est assurée par une cuisson basse température sous vide et une chaîne du froid maîtrisée." },
      { q: "Quels sont les allergènes présents dans vos repas ?", a: "Les allergènes varient selon les repas : sésame, soja, poisson, lait, œufs, fruits à coque, arachides. Consultez la fiche détaillée de chaque produit pour la liste complète. Nous indiquons clairement les allergènes sur tous nos emballages." },
    ]
  },
  {
    category: 'Prise de masse',
    items: [
      { q: "Quels repas privilégier pour la prise de masse ?", a: "Le Power Chicken Bowl (574 kcal, 52g protéines) et le Beef Performance Bowl (596 kcal, 55g protéines) sont idéaux pour un surplus calorique contrôlé. Complétez avec la Whey Chocolat (153 kcal, 32g protéines) en collation post-entraînement." },
      { q: "Combien de repas ORVYN par jour pour la prise de masse ?", a: "2 à 3 repas ORVYN par jour sont recommandés, en complément d'une alimentation équilibrée. L'objectif est d'atteindre un surplus de 300-500 kcal par jour avec un apport protéique de 1.6-2.2 g/kg de poids corporel." },
    ]
  },
  {
    category: 'Sèche',
    items: [
      { q: "Quels repas ORVYN sont adaptés à la sèche ?", a: "Le Salmon Recovery Bowl (546 kcal, 45g protéines) et le Veggie Protein Bowl (468 kcal, 38g protéines) sont parfaits. Nos shakes protéinés (à partir de 145 kcal) sont également excellents pour maintenir un apport protéique élevé avec un faible apport calorique." },
      { q: "Peut-on utiliser ORVYN pour une perte de poids durable ?", a: "Oui, dans le cadre d'un rééquilibrage alimentaire global. Nos repas sont conçus pour fournir des nutriments de qualité avec des calories maîtrisées. Le Veggie Protein Bowl et nos shakes sont particulièrement adaptés." },
    ]
  },
  {
    category: 'Allergènes et régimes',
    items: [
      { q: "Proposez-vous des options Halal ?", a: "Oui, nos bowls au poulet et au bœuf sont certifiés Halal. Le Power Chicken Bowl et le Beef Performance Bowl portent le tag Halal. Consultez les tags sur chaque fiche produit." },
      { q: "Avez-vous des options Vegan ?", a: "Oui, le Veggie Protein Bowl, le Matcha Protein Signature, le Café Protein Boost, le Cookie Protéiné et les Energy Balls sont 100% Vegan. Ils sont clairement identifiés dans notre carte." },
      { q: "Proposez-vous des repas sans gluten ?", a: "Oui, plusieurs de nos repas sont sans gluten : Power Chicken Bowl, Salmon Recovery Bowl, Veggie Protein Bowl, Whey Vanille, Whey Chocolat, Matcha Protein, Brownie Protéiné et Energy Balls. Vérifiez les tags sur chaque produit." },
    ]
  },
  {
    category: 'Conservation',
    items: [
      { q: "Comment conserver mes repas ORVYN ?", a: "Conservez vos repas au réfrigérateur à 3°C maximum dans leur emballage hermétique. La fraîcheur est garantie 72h après réception. Ne congelez pas. Les shakes se conservent au frais et doivent être consommés dans les 24h." },
      { q: "Comment réchauffer mon bowl protéiné ?", a: "Retirez l'opercule et réchauffez 2-3 minutes au micro-ondes à 800W, ou 8-10 minutes au four à 160°C. Les snacks se dégustent à température ambiante. Les shakes sont à consommer frais." },
    ]
  },
  {
    category: 'Commande et livraison',
    items: [
      { q: "Comment passer commande ?", a: "Commandez directement depuis notre application ou sur notre site. Sélectionnez vos repas, choisissez votre créneau de récupération et votre casier connecté. Le paiement est sécurisé." },
      { q: "Où puis-je récupérer mes repas ?", a: "Dans nos casiers connectés thermo-régulés installés dans nos salles de sport partenaires et Concept Lounges. Scannez votre QR code ou entrez votre code unique pour récupérer votre commande." },
      { q: "Quels sont les délais de livraison ?", a: "Les repas sont préparés chaque matin et déposés dans les casiers connectés avant l'heure de récupération choisie. Commandez avant 10h pour une récupération le jour même." },
    ]
  },
  {
    category: 'Abonnements',
    items: [
      { q: "Comment fonctionnent les crédits repas ?", a: "Chaque mois, votre abonnement vous crédite un nombre de repas utilisables sur l'ensemble de notre carte. Les crédits sont renouvelés automatiquement chaque mois. Les crédits non utilisés expirent à la fin du mois." },
      { q: "Puis-je résilier mon abonnement à tout moment ?", a: "Oui, sans engagement. Résiliez depuis votre espace client. Les crédits non utilisés sont conservés jusqu'à la fin du mois suivant." },
    ]
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<{ catIdx: number; itemIdx: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = faqItems.map(cat => ({
    ...cat,
    items: cat.items.filter(
      item => !searchQuery || item.q.toLowerCase().includes(searchQuery.toLowerCase()) || item.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.items.length > 0);

  return (
    <>
      <SEO
        title="FAQ Nutrition sportive"
        description="Questions fréquentes sur ORVYN : composition des repas, prise de masse, sèche, allergènes, conservation, commande, abonnements."
        canonical="/faq"
      />
      <section className="relative bg-[#050505] pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden">
        <div className="absolute top-1/3 right-1/4 h-[400px] w-[400px] rounded-full bg-brand-green/5 blur-[100px] pointer-events-none" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-green font-bold block mb-4">FAQ</span>
          <h1 className="font-display text-4xl font-extrabold text-white sm:text-6xl tracking-[-0.03em] mb-6">Foire Aux Questions</h1>
          <p className="text-sm text-neutral-400 max-w-2xl mx-auto font-sans">
            Questions fréquentes sur ORVYN : composition des repas, prise de masse, sèche, allergènes, conservation, commande, abonnements.
          </p>
          <div className="relative max-w-md mx-auto mt-8">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
            <input
              type="text"
              placeholder="Rechercher dans la FAQ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl bg-neutral-950 border border-neutral-800 py-3 pl-10 pr-10 text-sm text-white placeholder-neutral-500 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green/30 transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white">
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      <section className="bg-[#050505] py-16 border-t border-neutral-900">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-20 bg-[#0a0a0a] rounded-2xl border border-neutral-900 p-8 max-w-md mx-auto">
              <HelpCircle className="h-10 w-10 text-brand-green mx-auto mb-4" />
              <h3 className="font-bold text-white text-base mb-2">Aucun résultat trouvé</h3>
              <p className="text-xs text-neutral-400">Essayez d'autres termes de recherche.</p>
            </div>
          ) : (
            <div className="space-y-8">
              {filtered.map((cat, catIdx) => (
                <div key={cat.category}>
                  <h2 className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-green font-bold mb-4">{cat.category}</h2>
                  <div className="space-y-3">
                    {cat.items.map((item, itemIdx) => {
                      const isOpen = openIndex?.catIdx === catIdx && openIndex?.itemIdx === itemIdx;
                      return (
                        <div
                          key={item.q}
                          className="rounded-2xl border border-neutral-900 bg-[#0a0a0a] overflow-hidden hover:border-neutral-800 transition"
                        >
                          <button
                            onClick={() => setOpenIndex(isOpen ? null : { catIdx, itemIdx })}
                            className="w-full text-left px-6 py-5 flex justify-between items-center"
                          >
                            <span className="text-sm font-bold text-white">{item.q}</span>
                            {isOpen ? (
                              <ChevronUp className="h-4 w-4 text-brand-green shrink-0" />
                            ) : (
                              <ChevronDown className="h-4 w-4 text-neutral-500 shrink-0" />
                            )}
                          </button>
                          {isOpen && (
                            <div className="px-6 pb-6 pt-2 border-t border-neutral-900 text-xs text-neutral-400 leading-relaxed">
                              {item.a}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
