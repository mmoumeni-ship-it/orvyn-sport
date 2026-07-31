import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Award, Target, Heart } from 'lucide-react';
import SEO from '../components/SEO';

const values = [
  { icon: Award, title: 'Excellence', desc: 'Des ingredients premium sources avec soin, des recettes validees par des nutritionnistes du sport.' },
  { icon: Target, title: 'Precision', desc: 'Chaque macro est pesee au gramme pour une nutrition parfaitement calibree selon vos objectifs.' },
  { icon: ShieldCheck, title: 'Transparence', desc: 'Des prix affiches clairement, des origines tracees, aucune promesse miracle.' },
  { icon: Heart, title: 'Sante', desc: 'Zero additif, zero conservateur, des aliments bruts qui respectent votre corps.' }
];

const milestones = [
  { year: '2024', event: 'Fondation d\'ORVYN par des passionnes de nutrition et de sport.' },
  { year: '2024', event: 'Lancement des premiers bowls proteines dans 3 clubs partenaires.' },
  { year: '2025', event: 'Expansion a 15 partenaires et lancement des abonnements.' }
];

export default function AboutPage() {
  const [openFaq, setOpenFaq] = React.useState<number | null>(0);

  return (
    <>
      <SEO
        title="A propos"
        description="Decouvrez ORVYN : la nutrition sportive reinventee. Une marque premium de repas proteines pour athletes exigeants."
        canonical="/a-propos"
      />
      <section className="relative bg-orvyn-carbon pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 h-[500px] w-[500px] rounded-full bg-clay/5 blur-[120px] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="font-display text-xs uppercase tracking-[0.25em] text-clay font-semibold block mb-4">NOTRE HISTOIRE</span>
          <h1 className="font-display h-editorial text-orvyn-bone tracking-tight mb-6">A propos d'ORVYN</h1>
          <p className="text-sm text-orvyn-bone/60 max-w-2xl mx-auto font-sans leading-relaxed">
            Decouvrez ORVYN : la nutrition sportive reinventee. Une marque premium de repas proteines pour athletes exigeants.
          </p>
        </div>
      </section>

      <section className="bg-orvyn-carbon py-16 border-t border-olive/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div className="space-y-6">
              <h2 className="font-display text-2xl font-semibold text-orvyn-bone sm:text-3xl tracking-tight">La nutrition sportive reinventee</h2>
              <p className="text-sm text-orvyn-bone/60 leading-relaxed font-sans">
                ORVYN est nee d'un constat simple : les athletes meritent mieux que des barres industrielles et des poudres insipides.
                Notre mission est de rendre la nutrition sportive premium accessible, pratique et delicieuse.
              </p>
              <p className="text-sm text-orvyn-bone/60 leading-relaxed font-sans">
                Nous avons reuni des chefs formes a la FoodTech et des nutritionnistes du sport de haut niveau pour creer des repas
                qui allient gastronomie et precision nutritionnelle. Chaque recette est pensee pour optimiser vos performances,
                votre recuperation et votre sante sur le long terme.
              </p>
              <p className="text-sm text-orvyn-bone/60 leading-relaxed font-sans">
                Nos repas sont prepares chaque matin avec des ingredients frais, locaux et de saison, puis deposes dans nos
                casiers connectes thermo-regules. Vous commandez depuis votre application et recuperez votre repas a la sortie
                de votre salle de sport. Simple, rapide, efficace.
              </p>
            </div>
            <div className="space-y-6">
              <div className="bg-carbon-raised orvyn-clip-sm depth p-8">
                <div className="aspect-square rounded-sm bg-clay/5 border border-olive/20 flex items-center justify-center mb-6">
                  <span className="orvyn-o text-6xl font-semibold text-clay"></span>
                </div>
                <div className="space-y-4">
                  {milestones.map((m, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <span className="text-[10px] font-semibold text-clay bg-clay/10 px-2 py-1 shrink-0">{m.year}</span>
                      <p className="text-xs text-orvyn-bone/70 font-sans">{m.event}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-orvyn-carbon py-16 border-t border-olive/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl font-semibold text-orvyn-bone sm:text-4xl tracking-tight mb-4">Nos valeurs</h2>
          <p className="text-sm text-orvyn-bone/60 max-w-xl mx-auto mb-12 font-sans">Ce qui nous anime chaque jour</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((v, idx) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-carbon-raised orvyn-clip-sm depth p-6 text-center hover:bg-[#2b2923] transition group"
              >
                <div className="h-14 w-14 bg-clay/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-clay/20 transition">
                  <v.icon className="h-7 w-7 text-clay" />
                </div>
                <h3 className="text-base font-display font-semibold text-orvyn-bone mb-2">{v.title}</h3>
                <p className="text-xs text-orvyn-bone/50 leading-relaxed font-sans">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sand py-16 border-t border-olive/20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl font-semibold text-carbon sm:text-4xl tracking-tight mb-4">Rejoignez l'aventure ORVYN</h2>
          <p className="text-sm text-carbon/60 max-w-xl mx-auto mb-8 font-sans">
            Que vous soyez athlete, partenaire ou investisseur, construisons ensemble la nutrition de demain.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 orvyn-clip-sm bg-lime text-carbon px-8 py-3 text-xs tracking-wider uppercase font-semibold hover:bg-lime-soft transition">
            Nous contacter <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
