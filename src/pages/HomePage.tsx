import React from 'react';
import { motion } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import { Target, BarChart3, Zap, Dumbbell, Flame, Scale, Compass, ArrowRight, ChevronRight, ExternalLink, ShieldCheck } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import SubscriptionsSection from '../components/SubscriptionsSection';
import FAQ from '../components/FAQ';
import ContactSection from '../components/ContactSection';
import SEO from '../components/SEO';
import SectionHeader from '../components/ui/SectionHeader';
import PerformanceLine from '../components/ui/PerformanceLine';
import OrvynButton from '../components/ui/OrvynButton';
import { MEALS_DATABASE } from '../data/meals';

const valueProps = [
  { icon: Target, title: 'Adapté à ton objectif', desc: 'Des repas pensés pour la prise de masse, la sèche, la récupération ou l\'équilibre.' },
  { icon: BarChart3, title: 'Des macros visibles', desc: 'Consulte facilement les calories, protéines, glucides et lipides de chaque recette.' },
  { icon: Zap, title: 'Rapide et pratique', desc: 'Choisis ton repas sans passer des heures à cuisiner ou à calculer tes apports.' },
  { icon: ShieldCheck, title: 'Pensé pour les sportifs', desc: 'Une offre construite autour des besoins avant et après l\'entraînement.' }
];

const goalCards = [
  { icon: Dumbbell, title: 'Prise de masse', desc: 'Des repas riches en protéines et en calories pour développer ta masse musculaire.', link: '/repas-prise-de-masse', code: '01' },
  { icon: Flame, title: 'Sèche', desc: 'Des repas équilibrés pour garder le muscle tout en perdant du gras.', link: '/repas-seche', code: '02' },
  { icon: Compass, title: 'Récupération', desc: 'Les bons nutriments après l\'effort pour reconstruire le muscle.', link: '/repas-post-entrainement', code: '03' },
  { icon: Scale, title: 'Équilibre alimentaire', desc: 'Une alimentation saine et pratique pour rester en forme au quotidien.', link: '/repas', code: '04' }
];

const blogArticles = [
  {
    title: 'Que manger après une séance de musculation ?',
    excerpt: 'Découvrez quels aliments privilégier après votre entraînement pour optimiser la récupération musculaire.',
    date: '15 Juillet 2026',
    readTime: '5 min',
    slug: 'que-manger-apres-seance-musculation'
  },
  {
    title: 'Comment composer un repas post-entraînement équilibré ?',
    excerpt: 'Apprenez à composer le repas idéal après le sport : protéines, glucides, lipides.',
    date: '10 Juillet 2026',
    readTime: '6 min',
    slug: 'comment-composer-repas-post-entrainement-equilibre'
  },
  {
    title: 'Quels repas choisir pour une prise de masse ?',
    excerpt: 'Guide complet des repas pour la prise de masse musculaire. Calories, macros et aliments à privilégier.',
    date: '5 Juillet 2026',
    readTime: '7 min',
    slug: 'quel-repas-choisir-prise-de-masse'
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
    <div className="bg-orvyn-carbon min-h-screen text-white">
      <SEO
        title="ORVYN | Repas sportifs et bowls protéinés"
        description="Découvrez ORVYN : bowls protéinés, repas post-entraînement, shakes et snacks adaptés à vos objectifs sportifs."
        canonical="https://orvyn-sport.vercel.app/"
      />

      {/* 1. Hero */}
      <HeroSection setCurrentTab={handleNavigate} onOpenAuth={() => {}} />

      {/* 2. Value Proposition */}
      <section className="relative bg-orvyn-bone py-24 lg:py-32 border-b border-orvyn-olive/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            align="center"
            light
            eyebrow="Pourquoi Orvyn ?"
            title="La nutrition sportive, simplement"
            description="Des repas adaptés à ta pratique, sans prise de tête. Ni aeronutrition, ni regime : juste une alimentation pensee pour tes objectifs."
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {valueProps.map((item, i) => {
              const IconComponent = item.icon;
              return (
                <div key={i} className="orvyn-clip-sm group bg-white p-6 shadow-[0_1px_0_rgba(23,24,21,0.08)]">
                  <div className="flex h-10 w-10 items-center justify-center bg-orvyn-clay/10 text-orvyn-clay mb-5">
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <h3 className="font-display text-sm font-bold uppercase tracking-wide text-orvyn-carbon mb-2">{item.title}</h3>
                  <p className="text-xs text-orvyn-carbon/70 leading-relaxed">{item.desc}</p>
                  <div className="mt-5">
                    <PerformanceLine animated={false} />
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 3. Section objectifs */}
      <section className="relative bg-orvyn-carbon py-24 lg:py-32 border-b border-orvyn-olive/20">
        <div className="absolute inset-0 bg-orvyn-grid pointer-events-none" aria-hidden="true" />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <SectionHeader
            align="center"
            eyebrow="Objectifs sportifs"
            title="Quel est ton objectif ?"
            description="Trouve facilement les repas qui correspondent à ta pratique sportive."
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {goalCards.map((card, i) => {
              const IconComponent = card.icon;
              return (
                <button
                  key={i}
                  onClick={() => navigate(card.link)}
                  className="group relative orvyn-clip-sm overflow-hidden bg-[#1C1D1A] p-6 text-left cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:bg-[#24251F]"
                >
                  <span className="pointer-events-none absolute right-3 top-2 font-mono text-2xl font-bold text-orvyn-olive/25 transition group-hover:text-orvyn-performance/30">
                    {card.code}
                  </span>
                  <div className="flex h-12 w-12 items-center justify-center bg-orvyn-performance/10 text-orvyn-performance mb-5 transition group-hover:bg-orvyn-performance group-hover:text-orvyn-carbon">
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-orvyn-bone mb-2 uppercase tracking-wide">{card.title}</h3>
                  <p className="text-xs text-orvyn-bone/60 leading-relaxed mb-5">{card.desc}</p>
                  <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-widest text-orvyn-performance group-hover:gap-2 transition-all">
                    Découvrir <ArrowRight className="h-3 w-3" />
                  </span>
                </button>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* 4. Produits phares */}
      <section className="relative bg-orvyn-carbon py-24 lg:py-32 border-b border-orvyn-olive/20 overflow-hidden">
        <div className="absolute top-1/3 right-0 h-[400px] w-[400px] rounded-full bg-orvyn-performance/5 blur-[100px] pointer-events-none"></div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <SectionHeader
              eyebrow="Produits phares"
              title="Les favoris ORVYN"
              description="Bowls protéinés, shakes et snacks : des recettes équilibrées pour accompagner chaque entraînement."
            />
            <Link
              to="/repas"
              className="orvyn-clip-sm group inline-flex items-center gap-2 bg-orvyn-carbon px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-widest text-orvyn-bone border border-orvyn-olive/50 hover:border-orvyn-performance hover:text-orvyn-performance transition"
            >
              Voir tous les repas <ChevronRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {featuredBowls.map((meal) => (
              <Link
                key={meal.id}
                to="/bowls-proteines"
                className="group text-left orvyn-clip-sm overflow-hidden bg-[#1C1D1A] transition-all duration-300 block hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-orvyn-carbon">
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="h-full w-full object-cover group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-orvyn-carbon/70 via-transparent to-transparent"></div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 rounded-sm bg-orvyn-carbon/85 border border-orvyn-olive/40 px-2.5 py-1 font-mono text-[9px] font-bold text-orvyn-performance backdrop-blur-sm">
                      <Flame className="h-3 w-3" />
                      {meal.calories} kcal
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-sm bg-orvyn-carbon/85 border border-orvyn-olive/40 px-2.5 py-1 font-mono text-[9px] font-bold text-orvyn-bone backdrop-blur-sm">
                      {meal.proteins}g protéines
                    </span>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  <h3 className="font-display text-sm font-bold uppercase tracking-wide text-orvyn-bone group-hover:text-orvyn-performance transition-colors">{meal.name}</h3>
                  <p className="text-xs text-orvyn-bone/60 line-clamp-2">{meal.description}</p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-orvyn-bone/40 font-mono uppercase tracking-widest">à partir de</span>
                    <span className="text-sm font-bold text-orvyn-performance font-mono">{meal.price.toFixed(2)} €</span>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. Bowls protéinés */}
      <section className="relative bg-orvyn-moss py-24 lg:py-32 border-b border-orvyn-olive/20 overflow-hidden">
        <div className="absolute inset-0 bg-orvyn-texture pointer-events-none" />
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-orvyn-performance/5 blur-[100px] pointer-events-none"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <SectionHeader
                eyebrow="Bowls protéinés"
                title="Le bowl qui travaille autant que toi"
                description="Des recettes équilibrées et riches en protéines, composées pour t'aider à mieux récupérer et à rester régulier dans ton alimentation."
              />
              <ul className="space-y-3 text-xs text-orvyn-bone/70">
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 bg-orvyn-performance shrink-0"></span>
                  Une source de protéines de qualité
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 bg-orvyn-performance shrink-0"></span>
                  Des glucides adaptés à ta dépense énergétique
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 bg-orvyn-performance shrink-0"></span>
                  Des légumes et ingrédients équilibrés
                </li>
              </ul>
              <Link
                to="/bowls-proteines"
                className="orvyn-clip-sm group relative inline-flex items-center gap-2 overflow-hidden bg-orvyn-performance px-6 py-3 text-xs font-bold tracking-widest text-orvyn-carbon uppercase transition-all duration-300 hover:bg-white"
              >
                Découvrir les bowls protéinés <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-2 gap-4"
            >
              {MEALS_DATABASE.filter(m => m.category === 'Bowls').slice(0, 4).map((meal) => (
                <Link
                  key={meal.id}
                  to="/bowls-proteines"
                  className="orvyn-clip-sm overflow-hidden bg-orvyn-carbon/60 border border-orvyn-olive/25 transition group hover:border-orvyn-performance/50"
                >
                  <div className="aspect-square w-full overflow-hidden">
                    <img src={meal.image} alt={meal.name} className="h-full w-full object-cover group-hover:scale-105 transition duration-700" />
                  </div>
                  <div className="p-3">
                    <p className="font-display text-xs font-bold uppercase tracking-wide text-orvyn-bone truncate">{meal.name}</p>
                    <p className="text-[10px] text-orvyn-bone/50 font-mono mt-1">{meal.calories} kcal • {meal.proteins}g protéines</p>
                  </div>
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. How It Works */}
      <HowItWorks setCurrentTab={handleNavigate} />

      {/* 7. Shakes & Snacks */}
      <section className="relative bg-orvyn-carbon py-24 lg:py-32 border-b border-orvyn-olive/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            align="center"
            eyebrow="Compléments"
            title="Complète ton repas"
            description="Shakes protéinés, snacks healthy et energy balls pour compléter tes apports entre les repas ou après l'entraînement."
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {MEALS_DATABASE.filter(m => m.category === 'Shakers' || m.category === 'Snacks').slice(0, 4).map((meal) => (
              <Link
                key={meal.id}
                to={meal.category === 'Shakers' ? '/shakes-proteines' : '/snacks-healthy'}
                className="group text-center orvyn-clip-sm overflow-hidden bg-[#1C1D1A] p-6 transition hover:-translate-y-1 hover:bg-[#24251F]"
              >
                <div className="aspect-square w-full overflow-hidden bg-orvyn-carbon mb-4">
                  <img src={meal.image} alt={meal.name} className="h-full w-full object-cover group-hover:scale-105 transition duration-700" />
                </div>
                <h3 className="font-display text-xs font-bold uppercase tracking-wide text-orvyn-bone mb-1">{meal.name}</h3>
                <p className="text-[10px] text-orvyn-bone/50 font-mono">{meal.calories} kcal • {meal.proteins}g protéines</p>
                <p className="text-xs font-bold text-orvyn-performance font-mono mt-2">{meal.price.toFixed(2)} €</p>
              </Link>
            ))}
          </motion.div>

          <div className="flex items-center justify-center gap-4 mt-10">
            <Link
              to="/shakes-proteines"
              className="orvyn-clip-sm inline-flex items-center gap-2 border border-orvyn-olive/50 bg-orvyn-carbon px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-widest text-orvyn-bone hover:border-orvyn-performance hover:text-orvyn-performance transition"
            >
              Voir les shakes
            </Link>
            <Link
              to="/snacks-healthy"
              className="orvyn-clip-sm inline-flex items-center gap-2 border border-orvyn-olive/50 bg-orvyn-carbon px-5 py-2.5 font-mono text-[10px] font-bold uppercase tracking-widest text-orvyn-bone hover:border-orvyn-performance hover:text-orvyn-performance transition"
            >
              Voir les snacks
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Abonnements */}
      <section className="relative bg-orvyn-carbon py-24 lg:py-32 border-b border-orvyn-olive/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            align="center"
            eyebrow="Abonnements"
            title="Ton alimentation sportive, sans improviser"
            description="Choisis une formule adaptée à ton rythme et retrouve plus facilement tes repas préférés."
          />
          <div className="mt-14">
            <SubscriptionsSection onSelectPlan={() => {}} onOpenAuth={() => {}} />
          </div>
          <div className="text-center mt-10">
            <Link
              to="/abonnements"
              className="orvyn-clip-sm inline-flex items-center gap-2 border border-orvyn-olive/50 bg-orvyn-carbon px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-widest text-orvyn-bone hover:border-orvyn-performance hover:text-orvyn-performance transition"
            >
              Découvrir les abonnements <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Réassurance */}
      <section className="relative bg-orvyn-bone py-24 lg:py-32 border-b border-orvyn-olive/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            align="center"
            light
            eyebrow="Pourquoi Orvyn ?"
            title="Pourquoi choisir ORVYN ?"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            <div className="orvyn-clip-sm bg-white p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orvyn-clay/10 mx-auto mb-4">
                <BarChart3 className="h-6 w-6 text-orvyn-clay" />
              </div>
              <h3 className="font-display text-sm font-bold uppercase tracking-wide text-orvyn-carbon mb-2">Transparence nutritionnelle</h3>
              <p className="text-xs text-orvyn-carbon/70">Calories, protéines, glucides et lipides affichés pour chaque recette.</p>
            </div>
            <div className="orvyn-clip-sm bg-white p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orvyn-clay/10 mx-auto mb-4">
                <Target className="h-6 w-6 text-orvyn-clay" />
              </div>
              <h3 className="font-display text-sm font-bold uppercase tracking-wide text-orvyn-carbon mb-2">Personnalisation selon tes objectifs</h3>
              <p className="text-xs text-orvyn-carbon/70">Des repas adaptés à la prise de masse, la sèche ou la récupération.</p>
            </div>
            <div className="orvyn-clip-sm bg-white p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orvyn-clay/10 mx-auto mb-4">
                <Zap className="h-6 w-6 text-orvyn-clay" />
              </div>
              <h3 className="font-display text-sm font-bold uppercase tracking-wide text-orvyn-carbon mb-2">Simplicité de commande</h3>
              <p className="text-xs text-orvyn-carbon/70">Choisis ton repas en quelques clics, sans abonnement obligatoire.</p>
            </div>
            <div className="orvyn-clip-sm bg-white p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orvyn-clay/10 mx-auto mb-4">
                <Dumbbell className="h-6 w-6 text-orvyn-clay" />
              </div>
              <h3 className="font-display text-sm font-bold uppercase tracking-wide text-orvyn-carbon mb-2">Offre pensée pour les sportifs</h3>
              <p className="text-xs text-orvyn-carbon/70">Une offre construite autour des besoins avant et après l'entraînement.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 10. Blog preview */}
      <section className="relative bg-orvyn-carbon py-24 lg:py-32 border-b border-orvyn-olive/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            align="center"
            eyebrow="Blog nutrition"
            title="Conseils nutrition & performance"
            description="Toute l'expertise ORVYN pour optimiser ta nutrition sportive au quotidien."
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5"
          >
            {blogArticles.map((article, i) => (
              <Link
                key={i}
                to={`/blog/${article.slug}`}
                className="group text-left orvyn-clip-sm overflow-hidden bg-[#1C1D1A] p-6 transition-all duration-300 block hover:-translate-y-1 hover:bg-[#24251F]"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-[9px] font-bold text-orvyn-bone/40 uppercase tracking-widest">{article.date}</span>
                  <span className="h-1 w-1 rounded-full bg-orvyn-olive"></span>
                  <span className="font-mono text-[9px] font-bold text-orvyn-bone/40 uppercase tracking-widest">{article.readTime}</span>
                </div>
                <h3 className="font-display text-lg font-bold uppercase tracking-wide text-orvyn-bone mb-2 group-hover:text-orvyn-performance transition-colors">{article.title}</h3>
                <p className="text-xs text-orvyn-bone/60 leading-relaxed mb-5">{article.excerpt}</p>
                <span className="inline-flex items-center gap-1 font-mono text-[10px] font-bold uppercase tracking-widest text-orvyn-performance">
                  Lire l'article <ExternalLink className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </motion.div>

          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/blog')}
              className="orvyn-clip-sm inline-flex items-center gap-2 border border-orvyn-olive/50 bg-orvyn-carbon px-6 py-3 font-mono text-[10px] font-bold uppercase tracking-widest text-orvyn-bone hover:border-orvyn-performance hover:text-orvyn-performance transition cursor-pointer"
            >
              Voir tous les articles <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* 11. FAQ */}
      <FAQ />

      {/* 12. Contact */}
      <ContactSection />

      {/* 13. CTA final */}
      <section className="relative bg-orvyn-moss py-24 lg:py-32 border-t border-orvyn-olive/25 overflow-hidden">
        <div className="absolute inset-0 bg-orvyn-texture pointer-events-none" />
        <div className="orvyn-o pointer-events-none absolute -right-24 -top-24 h-96 w-96 text-orvyn-performance/10" aria-hidden="true" />
        <div className="absolute top-0 left-0 right-0 performance-line" aria-hidden="true" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="font-display text-4xl font-bold leading-[1.05] tracking-[-0.01em] text-orvyn-bone sm:text-5xl">
                Prêt à mieux manger <br />
                <span className="text-orvyn-performance">après l'entraînement ?</span>
              </h2>
              <p className="text-sm text-orvyn-bone/70 max-w-2xl mx-auto">
                Choisis ton objectif et découvre les repas ORVYN adaptés à ton rythme.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <OrvynButton to="/repas" variant="primary">
                Découvrir les repas
              </OrvynButton>
              <OrvynButton to="/repas" variant="secondary">
                Choisir mon objectif
              </OrvynButton>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
