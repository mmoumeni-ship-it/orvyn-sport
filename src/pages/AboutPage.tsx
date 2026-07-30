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
      <section className="relative bg-[#050505] pt-28 pb-16 lg:pt-36 lg:pb-20 overflow-hidden">
        <div className="absolute top-1/2 left-1/4 h-[500px] w-[500px] rounded-full bg-brand-green/5 blur-[120px] pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-green font-bold block mb-4">NOTRE HISTOIRE</span>
          <h1 className="font-display text-4xl font-extrabold text-white sm:text-6xl tracking-[-0.03em] mb-6">A propos d'ORVYN</h1>
          <p className="text-sm text-neutral-400 max-w-2xl mx-auto font-sans">
            Decouvrez ORVYN : la nutrition sportive reinventee. Une marque premium de repas proteines pour athletes exigeants.
          </p>
        </div>
      </section>

      <section className="bg-[#050505] py-16 border-t border-neutral-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div className="space-y-6">
              <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl tracking-[-0.03em]">La nutrition sportive reinventee</h2>
              <p className="text-sm text-neutral-400 leading-relaxed">
                ORVYN est nee d'un constat simple : les athletes meritent mieux que des barres industrielles et des poudres insipides.
                Notre mission est de rendre la nutrition sportive premium accessible, pratique et delicieuse.
              </p>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Nous avons reuni des chefs formes a la FoodTech et des nutritionnistes du sport de haut niveau pour creer des repas
                qui allient gastronomie et precision nutritionnelle. Chaque recette est pensee pour optimiser vos performances,
                votre recuperation et votre sante sur le long terme.
              </p>
              <p className="text-sm text-neutral-400 leading-relaxed">
                Nos repas sont prepares chaque matin avec des ingredients frais, locaux et de saison, puis deposes dans nos
                casiers connectes thermo-regules. Vous commandez depuis votre application et recuperez votre repas a la sortie
                de votre salle de sport. Simple, rapide, efficace.
              </p>
            </div>
            <div className="space-y-6">
              <div className="bg-[#0a0a0a] border border-neutral-900 rounded-2xl p-8">
                <div className="aspect-square rounded-xl bg-gradient-to-br from-brand-green/10 to-transparent border border-neutral-800 flex items-center justify-center mb-6">
                  <span className="text-6xl font-extrabold text-white font-display tracking-tight">O</span>
                </div>
                <div className="space-y-4">
                  {milestones.map((m, idx) => (
                    <div key={idx} className="flex items-start gap-4">
                      <span className="text-[10px] font-mono font-bold text-brand-green bg-brand-green/10 px-2 py-1 rounded shrink-0">{m.year}</span>
                      <p className="text-xs text-neutral-300">{m.event}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#050505] py-16 border-t border-neutral-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl font-extrabold text-white sm:text-4xl tracking-[-0.03em] mb-4">Nos valeurs</h2>
          <p className="text-sm text-neutral-400 max-w-xl mx-auto mb-12">Ce qui nous anime chaque jour</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {values.map((v, idx) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-[#0a0a0a] border border-neutral-900 rounded-2xl p-6 text-center hover:border-neutral-800 transition group"
              >
                <div className="h-14 w-14 rounded-2xl bg-brand-green/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-green/20 transition">
                  <v.icon className="h-7 w-7 text-brand-green" />
                </div>
                <h3 className="text-base font-bold text-white mb-2">{v.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#050505] py-16 border-t border-neutral-900">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl font-extrabold text-white sm:text-4xl tracking-[-0.03em] mb-4">Rejoignez l'aventure ORVYN</h2>
          <p className="text-sm text-neutral-400 max-w-xl mx-auto mb-8">
            Que vous soyez athlete, partenaire ou investisseur, construisons ensemble la nutrition de demain.
          </p>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-white text-black px-8 py-3 text-xs font-mono tracking-wider uppercase font-bold hover:bg-brand-green transition">
            Nous contacter <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
