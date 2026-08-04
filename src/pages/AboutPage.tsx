import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Award, Target, Heart } from 'lucide-react';
import SEO from '../components/SEO';

const values = [
  { icon: Award, title: 'Excellence', desc: 'Des ingrédients premium sourcés avec soin, des recettes validées par des nutritionnistes du sport.' },
  { icon: Target, title: 'Précision', desc: 'Chaque macro est pesée au gramme pour une nutrition parfaitement calibrée selon vos objectifs.' },
  { icon: ShieldCheck, title: 'Transparence', desc: 'Des prix affichés clairement, des origines tracées, aucune promesse miracle.' },
  { icon: Heart, title: 'Santé', desc: 'Zéro additif, zéro conservateur, des aliments bruts qui respectent votre corps.' }
];

const milestones = [
  { year: '2024', event: 'Fondation d\'ORVYN par des passionnés de nutrition et de sport.' },
  { year: '2024', event: 'Lancement des premiers bowls protéinés dans 3 clubs partenaires.' },
  { year: '2025', event: 'Expansion à 15 partenaires et lancement des abonnements.' }
];

export default function AboutPage() {
  const [openFaq, setOpenFaq] = React.useState<number | null>(0);

  return (
    <>
      <SEO
        title="A propos"
        description="Découvrez ORVYN : la nutrition sportive réinventée. Une marque premium de repas protéinés pour athlètes exigeants."
        canonical="/a-propos"
      />
      <section className="relative bg-beige pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden border-b border-line/70">
        <div className="absolute top-1/2 left-1/4 h-96 w-96 rounded-full bg-frais/20 blur-[120px] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="eyebrow text-sauge justify-center mb-4">Notre histoire</span>
          <h1 className="font-display h-editorial text-charbon tracking-tight mb-6">À propos d'ORVYN</h1>
          <p className="text-base text-olive max-w-2xl mx-auto font-sans leading-relaxed">
            Découvrez ORVYN : la nutrition sportive réinventée. Une marque premium de repas protéinés pour athlètes exigeants.
          </p>
        </div>
      </section>

      <section className="bg-bone py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div className="space-y-6">
              <h2 className="font-display text-3xl font-semibold text-charbon tracking-tight">La nutrition sportive réinventée</h2>
              <p className="text-base text-olive leading-relaxed font-sans">
                ORVYN est née d'un constat simple : les athlètes méritent mieux que des barres industrielles et des poudres insipides.
                Notre mission est de rendre la nutrition sportive premium accessible, pratique et délicieuse.
              </p>
              <p className="text-base text-olive leading-relaxed font-sans">
                Nous avons réuni des chefs formés à la FoodTech et des nutritionnistes du sport de haut niveau pour créer des repas
                qui allient gastronomie et précision nutritionnelle. Chaque recette est pensée pour optimiser vos performances,
                votre récupération et votre santé sur le long terme.
              </p>
              <p className="text-base text-olive leading-relaxed font-sans">
                Nos repas sont préparés chaque matin avec des ingrédients frais, locaux et de saison, puis déposés dans nos
                casiers connectés thermo-régulés. Vous commandez depuis votre application et récupérez votre repas à la sortie
                de votre salle de sport. Simple, rapide, efficace.
              </p>
            </div>
            <div className="space-y-6">
              <figure className="relative w-full overflow-hidden rounded-[24px] border border-[#E7E3DA] shadow-[0_20px_50px_rgba(23,26,24,0.08)] aspect-[5/4]">
                <img
                  src="/images/about/orvyn-about.webp"
                  alt="Repas sportif premium ORVYN avec bowl protéiné et shaker."
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-center"
                />
              </figure>
              <div className="bg-white orvyn-clip border border-line/70 p-8">
                <div className="space-y-4">
                  {milestones.map((m, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <span className="text-[11px] font-semibold text-sauge bg-sauge/10 px-2 py-1 rounded-lg shrink-0">{m.year}</span>
                      <p className="text-sm text-charbon/80 font-sans">{m.event}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-beige py-16 lg:py-24 border-t border-line/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="eyebrow text-sauge justify-center mb-4">Nos valeurs</span>
          <h2 className="font-display text-3xl font-semibold text-charbon sm:text-4xl tracking-tight mb-4">Ce qui nous anime chaque jour</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mt-12">
            {values.map((v, idx) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white orvyn-clip-sm border border-line/70 p-6 text-center hover:shadow-[0_10px_30px_rgba(23,26,24,0.08)] hover:border-sauge/30 transition group"
              >
                <div className="h-14 w-14 bg-sauge/10 flex items-center justify-center mx-auto mb-4 rounded-2xl group-hover:bg-sauge/20 transition">
                  <v.icon className="h-7 w-7 text-sauge" />
                </div>
                <h3 className="text-base font-display font-semibold text-charbon mb-2">{v.title}</h3>
                <p className="text-sm text-olive leading-relaxed font-sans">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-charbon py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <span className="eyebrow text-frais justify-center mb-4">Rejoignez l'aventure</span>
          <h2 className="font-display text-3xl font-semibold text-bone sm:text-4xl tracking-tight mb-4">Rejoignez l'aventure ORVYN</h2>
          <p className="text-base text-bone/70 max-w-xl mx-auto mb-8 font-sans">
            Que vous soyez athlète, partenaire ou investisseur, construisons ensemble la nutrition de demain.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 orvyn-clip-sm bg-sauge text-bone px-8 py-3.5 text-xs font-semibold uppercase hover:bg-sauge-soft transition">
            Nous contacter <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
