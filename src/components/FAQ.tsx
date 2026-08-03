import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import SectionHeader from './ui/SectionHeader';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqList: FAQItem[] = [
    {
      question: "À qui s'adressent les repas ORVYN ?",
      answer: "ORVYN s'adresse aux hommes et aux femmes de 18 à 45 ans qui pratiquent une activité physique régulière et recherchent une alimentation pratique, saine et adaptée à leurs objectifs sportifs. Que vous soyez en prise de masse, en sèche ou simplement soucieux de votre équilibre alimentaire, nos repas sont conçus pour vous."
    },
    {
      question: "Comment choisir un repas selon mon objectif ?",
      answer: "Chaque recette ORVYN est associée à un ou plusieurs objectifs sportifs (prise de masse, sèche, récupération, maintien). Il vous suffit de filtrer les repas par objectif pour trouver ceux qui correspondent à vos besoins. Les informations nutritionnelles détaillées vous aident à faire le bon choix."
    },
    {
      question: "Les informations nutritionnelles sont-elles indiquées ?",
      answer: "Oui, chaque repas ORVYN affiche ses calories, protéines, glucides et lipides de manière claire et transparente. Vous pouvez ainsi suivre vos apports facilement, sans avoir à calculer vous-même."
    },
    {
      question: "ORVYN convient-il à la prise de masse ?",
      answer: "Oui, plusieurs de nos bowls et snacks sont adaptés à la prise de masse. Ils offrent un bon équilibre entre protéines, glucides et lipides pour soutenir le développement musculaire. Consultez la catégorie Prise de masse pour découvrir les repas recommandés."
    },
    {
      question: "ORVYN propose-t-il des repas pour la sèche ?",
      answer: "Oui, nous proposons des repas adaptés à la sèche, avec un apport protéique élevé et des calories maîtrisées pour vous aider à atteindre vos objectifs de définition musculaire."
    },
    {
      question: "Comment sont indiqués les allergènes ?",
      answer: "La liste des allergènes est indiquée pour chaque recette. Vous pouvez les consulter directement sur la fiche produit avant de commander."
    },
    {
      question: "Peut-on commander sans abonnement ?",
      answer: "Oui, il est tout à fait possible de commander à la carte sans abonnement. Les abonnements sont une option pour ceux qui souhaitent une formule régulière avec des avantages supplémentaires."
    }
  ];

  return (
    <section id="faq-section" className="bg-bone py-24 lg:py-32 border-b border-line/70 relative">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10">

        {/* En-tête éditorial */}
        <div className="mb-16 flex justify-center">
          <SectionHeader
            align="center"
            light
            eyebrow="Des réponses à vos questions"
            title="Foire Aux Questions"
            description="Toutes les réponses pour aborder votre programmation nutritionnelle avec sérénité."
          />
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {faqList.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`orvyn-clip-sm bg-white border border-line/70 overflow-hidden transition-all duration-300 ${
                  isOpen ? 'ring-1 ring-sauge/40' : ''
                }`}
              >
                <button
                  id={`faq-toggle-btn-${index}`}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left px-6 py-5 flex justify-between items-center cursor-pointer"
                >
                  <span className="text-sm font-semibold text-charbon leading-snug pr-4">{item.question}</span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 text-sauge shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-olive shrink-0" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-3 border-t border-line/60 text-sm text-olive leading-relaxed animate-fade-in">
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
