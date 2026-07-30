import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Target, BarChart3, Zap, Leaf, Dumbbell, Flame, Scale, Compass, ArrowRight, ChevronRight, ExternalLink } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import SubscriptionsSection from '../components/SubscriptionsSection';
import FAQ from '../components/FAQ';
import ContactSection from '../components/ContactSection';
import { MEALS_DATABASE } from '../data/meals';

const valueProps = [
  { icon: Target, title: 'Repas adaptés aux objectifs sportifs', desc: 'Chaque recette est formulée pour accompagner votre objectif : prise de masse, sèche, performance ou récupération.' },
  { icon: BarChart3, title: 'Informations nutritionnelles transparentes', desc: 'Macros pesés au gramme, ingrédients tracés et étiquetage complet pour un suivi parfait dans MyFitnessPal.' },
  { icon: Zap, title: 'Commande simple et rapide', desc: 'Sélectionnez, payez et récupérez votre repas en moins de 30 secondes dans nos casiers connectés haute technologie.' },
  { icon: Leaf, title: 'Ingrédients équilibrés et riches en protéines', desc: 'Viandes françaises, poissons sauvages, légumes bio locaux. Jusqu\'à 55g de protéines par portion.' }
];

const goalCards = [
  { icon: Dumbbell, title: 'Prise de masse', desc: 'Surplus calorique maîtrisé pour une hypertrophie musculaire optimale.', link: '/repas-prise-de-masse' },
  { icon: Flame, title: 'Sèche', desc: 'Définition musculaire extrême avec un apport protéique maximal.', link: '/repas-seche' },
  { icon: Compass, title: 'Récupération', desc: 'Reconstruction rapide des fibres et réapprovisionnement en glycogène.', link: '/repas-post-entrainement' },
  { icon: Scale, title: 'Équilibre alimentaire', desc: 'Maintien physiologique de précision pour une vitalité quotidienne.', link: '/repas' }
];

const blogArticles = [
  {
    title: 'Les protéines : guide complet pour le sportif',
    excerpt: 'Découvrez tout ce qu\'il faut savoir sur les protéines pour optimiser votre prise de masse et votre récupération musculaire.',
    date: '12 Juin 2025',
    readTime: '5 min'
  },
  {
    title: 'Comment organiser ses repas pour la sèche',
    excerpt: 'Planification alimentaire stratégique : maintenez un déficit calorique sans sacrifier vos performances ni votre satiété.',
    date: '28 Mai 2025',
    readTime: '7 min'
  },
  {
    title: 'Nutrition post-entraînement : la fenêtre anabolique',
    excerpt: 'Optimisez votre fenêtre métabolique avec les bons nutriments dans les 60 minutes suivant votre séance de sport.',
    date: '15 Mai 2025',
    readTime: '4 min'
  }
];

export default function HomePage() {
  const navigate = useNavigate();

  const handleNavigate = (tab: string) => {
    switch (tab) {
      case 'how-it-works':
        navigate('/repas');
        break;
      case 'menu':
        navigate('/repas');
        break;
      case 'goals':
        navigate('/repas');
        break;
      case 'faq':
        navigate('/faq');
        break;
      case 'contact':
        navigate('/contact');
        break;
      case 'subscriptions':
        navigate('/abonnements');
        break;
      default:
        navigate('/a-propos');
    }
  };

  const featuredBowls = MEALS_DATABASE.filter((m) => m.category === 'Bowls').slice(0, 4);

  return (
    <div className="bg-[#050505] min-h-screen">
      {/* 1. Hero */}
      <HeroSection setCurrentTab={handleNavigate} onOpenAuth={() => {}} />

      {/* 2. Value Proposition */}
      <section className="relative bg-[#050505] py-24 lg:py-32 border-b border-neutral-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-green font-bold block">
              L'EXCELLENCE ORVYN
            </span>
            <h2 className="font-display text-3xl font-extrabold text-white sm:text-5xl tracking-[-0.03em]">
              Une nutrition d'élite, sans compromis
            </h2>
            <p className="text-sm text-neutral-400 font-sans max-w-xl mx-auto">
              Nous réunissons la rigueur scientifique du sport de haut niveau et l'exigence gastronomique des grands chefs.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {valueProps.map((item, i) => {
              const IconComponent = item.icon;
              return (
                <div key={i} className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-green/10 border border-brand-green/20 text-brand-green mb-4">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 3. Choisissez votre objectif */}
      <section className="relative bg-[#050505] py-24 lg:py-32 border-b border-neutral-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-green font-bold block">
              OBJECTIFS SPORTIFS
            </span>
            <h2 className="font-display text-3xl font-extrabold text-white sm:text-5xl tracking-[-0.03em]">
              Choisissez votre objectif
            </h2>
            <p className="text-sm text-neutral-400 font-sans max-w-xl mx-auto">
              Quel que soit votre défi sportif, ORVYN a la formule précise pour vous accompagner.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {goalCards.map((card, i) => {
              const IconComponent = card.icon;
              return (
                <button
                  key={i}
                  onClick={() => navigate(card.link)}
                  className="group text-left border border-neutral-800 bg-neutral-950 rounded-2xl p-6 hover:border-brand-green transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-green/10 border border-brand-green/20 text-brand-green mb-5 group-hover:bg-brand-green/20 transition-colors">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 font-display">{card.title}</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-4">{card.desc}</p>
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-widest text-brand-green group-hover:gap-2 transition-all">
                    Découvrir <ArrowRight className="h-3 w-3" />
                  </span>
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 4. Produits phares */}
      <section className="relative bg-[#050505] py-24 lg:py-32 border-b border-neutral-900 overflow-hidden">
        <div className="absolute top-1/3 right-0 h-[400px] w-[400px] rounded-full bg-brand-green/5 blur-[100px] pointer-events-none"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="space-y-4 max-w-2xl">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-green font-bold block">
                PRODUITS PHARES
              </span>
              <h2 className="font-display text-3xl font-extrabold text-white sm:text-5xl tracking-[-0.03em]">
                Nos bowls signature
              </h2>
              <p className="text-sm text-neutral-400 font-sans leading-relaxed">
                Des recettes gastronomiques pensées pour la performance, disponibles dans nos casiers connectés.
              </p>
            </div>
            <button
              onClick={() => navigate('/repas')}
              className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-white bg-neutral-950 border border-neutral-800 rounded-full px-5 py-2.5 hover:border-brand-green hover:text-brand-green transition cursor-pointer"
            >
              Voir tout <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featuredBowls.map((meal) => (
              <button
                key={meal.id}
                onClick={() => navigate('/bowls-proteines')}
                className="group text-left rounded-2xl border border-neutral-900 bg-[#0a0a0a] overflow-hidden hover:border-neutral-700 transition-all duration-300 cursor-pointer"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-950">
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/80 border border-neutral-800 px-2.5 py-1 text-[9px] font-mono font-bold text-brand-green backdrop-blur-sm">
                      <Flame className="h-3 w-3" />
                      {meal.calories} kcal
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-full bg-black/80 border border-neutral-800 px-2.5 py-1 text-[9px] font-mono font-bold text-white backdrop-blur-sm">
                      {meal.proteins}g protéines
                    </span>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="text-sm font-bold text-white group-hover:text-brand-green transition-colors">{meal.name}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-neutral-400">{meal.description.substring(0, 60)}...</span>
                    <span className="text-sm font-extrabold text-white font-mono">{meal.price.toFixed(2)} €</span>
                  </div>
                </div>
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. How It Works */}
      <HowItWorks setCurrentTab={handleNavigate} />

      {/* 6. Subscriptions */}
      <SubscriptionsSection onSelectPlan={() => {}} onOpenAuth={() => {}} />

      {/* 7. Blog preview */}
      <section className="relative bg-[#050505] py-24 lg:py-32 border-b border-neutral-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-green font-bold block">
              BLOG NUTRITION
            </span>
            <h2 className="font-display text-3xl font-extrabold text-white sm:text-5xl tracking-[-0.03em]">
              Conseils & actualités
            </h2>
            <p className="text-sm text-neutral-400 font-sans max-w-xl mx-auto">
              Toute l'expertise ORVYN pour optimiser votre nutrition sportive au quotidien.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {blogArticles.map((article, i) => (
              <button
                key={i}
                onClick={() => navigate('/blog')}
                className="group text-left rounded-2xl border border-neutral-900 bg-[#0a0a0a] p-6 hover:border-neutral-700 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-widest">{article.date}</span>
                  <span className="text-neutral-800">•</span>
                  <span className="text-[9px] font-mono font-bold text-neutral-500 uppercase tracking-widest">{article.readTime}</span>
                </div>
                <h3 className="text-base font-bold text-white mb-2 font-display group-hover:text-brand-green transition-colors">{article.title}</h3>
                <p className="text-xs text-neutral-400 leading-relaxed mb-4">{article.excerpt}</p>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-widest text-brand-green">
                  Lire l'article <ExternalLink className="h-3 w-3" />
                </span>
              </button>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/blog')}
              className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950 px-6 py-3 text-[10px] font-mono font-bold uppercase tracking-widest text-white hover:border-brand-green hover:text-brand-green transition cursor-pointer"
            >
              Voir tous les articles <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 8. FAQ */}
      <FAQ />

      {/* 9. Contact */}
      <ContactSection />

      {/* 10. CTA final */}
      <section className="relative bg-[#050505] py-24 lg:py-32 border-t border-neutral-900">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-brand-green/10 blur-[120px] pointer-events-none"></div>

        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="font-display text-3xl font-extrabold text-white sm:text-5xl tracking-[-0.03em] leading-tight">
                Prêt à atteindre vos objectifs <br />
                <span className="text-brand-green">sans négliger votre alimentation ?</span>
              </h2>
              <p className="text-sm text-neutral-400 max-w-2xl mx-auto font-sans">
                Rejoignez la communauté ORVYN et découvrez une nouvelle manière de manger : précise, savoureuse et alignée avec vos ambitions sportives.
              </p>
            </div>

            <button
              onClick={() => navigate('/repas')}
              className="group inline-flex items-center gap-2 rounded-full bg-brand-green px-8 py-4 text-xs font-bold text-black tracking-wider uppercase transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] cursor-pointer"
            >
              Découvrir les repas ORVYN
              <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
