import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqList: FAQItem[] = [
    {
      question: "Comment fonctionne la récupération de mes repas ORVYN ?",
      answer: "Le fonctionnement est conçu pour être fluide et instantané : vous commandez votre repas ou shake sur l'application (à la carte ou via vos crédits d'abonnement). Vous choisissez votre heure de récupération. Nos stands connectés thermo-régulés d'élite, installés directement dans vos clubs partenaires ou Concept Lounges, conservent vos repas sous atmosphère contrôlée et réfrigérée à 3°C. À l'heure dite, entrez le code unique ou scannez le QR code reçu dans votre espace client sur l'écran tactile du stand : votre casier s'ouvre automatiquement."
    },
    {
      question: "Que se passe-t-il si je ne peux pas récupérer mon repas le jour même ?",
      answer: "Pour vous garantir une fraîcheur et une sécurité bactériologique absolue, tout repas non récupéré avant la fermeture de l'espace partenaire ou lounge est collecté par notre équipe logistique lors du réassort du lendemain matin. Ces repas non collectés sont immédiatement redistribués à des associations solidaires de lutte contre le gaspillage alimentaire. Aucun remboursement ne pourra être effectué pour les repas oubliés afin de responsabiliser notre communauté d'athlètes."
    },
    {
      question: "Les repas ORVYN sont-ils adaptés à mes contraintes ou croyances ?",
      answer: "Oui, la précision est au cœur de notre ADN. Nous proposons des alternatives s'adaptant à de nombreuses contraintes : options Halal certifiées, repas 100% Vegan et Végétarien, formules certifiées Sans Gluten, ainsi que des préparations Sans Lactose à haute digestibilité. Vous pouvez filtrer l'intégralité du menu en un clic."
    },
    {
      question: "D'où proviennent vos ingrédients et qui valide les valeurs nutritionnelles ?",
      answer: "Chaque recette ORVYN est co-créée par des chefs diplômés de la FoodTech et des médecins nutritionnistes du sport de haut niveau. Nos viandes proviennent exclusivement d'élevages français éthiques, nos poissons sont issus de pêches durables et nos légumes sont cueillis localement et livrés chaque matin. Tout est cuisiné à basse température sous vide pour préserver les vitamines, antioxydants et acides aminés essentiels. Nos rapports de macros sont d'une précision scientifique absolue (pesés au gramme)."
    },
    {
      question: "Comment installer un stand connecté ORVYN dans mon club ou entreprise ?",
      answer: "Si vous êtes propriétaire d'un club de fitness haut de gamme, gérant d'une box de Crossfit ou responsable d'un grand campus d'entreprise, contactez notre équipe via l'onglet Contact. L'installation et la maintenance de notre stand connecté intelligent sont gratuites. Nous nous chargeons de l'intégralité de l'exploitation logistique quotidienne. C'est un service premium d'élite clés en main pour vos adhérents."
    }
  ];

  return (
    <section id="faq-section" className="bg-[#050505] py-24 lg:py-32 border-b border-neutral-900 relative">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-green font-bold block">
            DES RÉPONSES À VOS QUESTIONS
          </span>
          <h2 className="font-display text-3xl font-extrabold text-white sm:text-5xl tracking-[-0.03em]">
            Foire Aux Questions (FAQ)
          </h2>
          <p className="text-xs text-neutral-400 max-w-md mx-auto">
            Toutes les réponses pour aborder votre programmation nutritionnelle avec sérénité.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {faqList.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-neutral-900 bg-[#0a0a0a] overflow-hidden transition-all duration-300 hover:border-neutral-800"
              >
                <button
                  id={`faq-toggle-btn-${index}`}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left px-6 py-5 flex justify-between items-center hover:bg-neutral-900/60 transition cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-bold text-white leading-snug pr-4 font-display">{item.question}</span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-brand-green shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-neutral-500 shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 border-t border-neutral-900 text-xs text-neutral-400 leading-relaxed font-sans font-light animate-fade-in">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
