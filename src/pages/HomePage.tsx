import React from 'react';
import { motion } from 'motion/react';
import { useNavigate, Link } from 'react-router-dom';
import { Target, BarChart3, Zap, Leaf, Dumbbell, Flame, Scale, Compass, ArrowRight, ChevronRight, ExternalLink, ShoppingBag, ShieldCheck } from 'lucide-react';
import HeroSection from '../components/HeroSection';
import HowItWorks from '../components/HowItWorks';
import SubscriptionsSection from '../components/SubscriptionsSection';
import FAQ from '../components/FAQ';
import ContactSection from '../components/ContactSection';
import SEO from '../components/SEO';
import { MEALS_DATABASE } from '../data/meals';

const valueProps = [
  { icon: Target, title: 'Adapté à ton objectif', desc: 'Des repas pensés pour la prise de masse, la sèche, la récupération ou l\'équilibre.' },
  { icon: BarChart3, title: 'Des macros visibles', desc: 'Consulte facilement les calories, protéines, glucides et lipides de chaque recette.' },
  { icon: Zap, title: 'Rapide et pratique', desc: 'Choisis ton repas sans passer des heures à cuisiner ou à calculer tes apports.' },
  { icon: ShieldCheck, title: 'Pensé pour les sportifs', desc: 'Une offre construite autour des besoins avant et après l\'entraînement.' }
];

const goalCards = [
  { icon: Dumbbell, title: 'Prise de masse', desc: 'Des repas riches en protéines et en calories pour développer ta masse musculaire.', link: '/repas-prise-de-masse' },
  { icon: Flame, title: 'Sèche', desc: 'Des repas équilibrés pour garder le muscle tout en perdant du gras.', link: '/repas-seche' },
  { icon: Compass, title: 'Récupération', desc: 'Les bons nutriments après l\'effort pour reconstruire le muscle.', link: '/repas-post-entrainement' },
  { icon: Scale, title: 'Équilibre alimentaire', desc: 'Une alimentation saine et pratique pour rester en forme au quotidien.', link: '/repas' }
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
    <div className="bg-[#050505] min-h-screen">
      <SEO
        title="ORVYN | Repas sportifs et bowls protéinés"
        description="Découvrez ORVYN : bowls protéinés, repas post-entraînement, shakes et snacks adaptés à vos objectifs sportifs."
        canonical="https://orvyn-sport.vercel.app/"
      />

      {/* 1. Hero */}
      <HeroSection setCurrentTab={handleNavigate} onOpenAuth={() => {}} />

      {/* 2. Value Proposition */}
      <section className="relative bg-[#050505] py-24 lg:py-32 border-b border-neutral-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-green font-bold block">
              POURQUOI ORVYN ?
            </span>
            <h2 className="font-display text-3xl font-extrabold text-white sm:text-5xl tracking-[-0.03em]">
              La nutrition sportive, simplement
            </h2>
            <p className="text-sm text-neutral-400 font-sans max-w-xl mx-auto">
              Des repas adaptés à ta pratique, sans prise de tête. Ni aeronutrition, ni regime : juste une alimentation pensee pour tes objectifs.
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

      {/* 3. Section objectifs */}
      <section className="relative bg-[#050505] py-24 lg:py-32 border-b border-neutral-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-green font-bold block">
              OBJECTIFS SPORTIFS
            </span>
            <h2 className="font-display text-3xl font-extrabold text-white sm:text-5xl tracking-[-0.03em]">
              Quel est ton objectif ?
            </h2>
            <p className="text-sm text-neutral-400 font-sans max-w-xl mx-auto">
              Trouve facilement les repas qui correspondent à ta pratique sportive.
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
                Les favoris ORVYN
              </h2>
              <p className="text-sm text-neutral-400 font-sans leading-relaxed">
                Bowls protéinés, shakes et snacks : des recettes équilibrées pour accompagner chaque entraînement.
              </p>
            </div>
            <Link
              to="/repas"
              className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-widest text-white bg-neutral-950 border border-neutral-800 rounded-full px-5 py-2.5 hover:border-brand-green hover:text-brand-green transition"
            >
              Voir tous les repas <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featuredBowls.map((meal) => (
              <Link
                key={meal.id}
                to="/bowls-proteines"
                className="group text-left rounded-2xl border border-neutral-900 bg-[#0a0a0a] overflow-hidden hover:border-neutral-700 transition-all duration-300 block"
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
                  <p className="text-xs text-neutral-400 line-clamp-2">{meal.description}</p>
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-xs text-neutral-500">à partir de</span>
                    <span className="text-sm font-extrabold text-white font-mono">{meal.price.toFixed(2)} €</span>
                  </div>
                </div>
              </Link>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. Bowls protéinés */}
      <section className="relative bg-[#050505] py-24 lg:py-32 border-b border-neutral-900 overflow-hidden">
        <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-brand-green/5 blur-[100px] pointer-events-none"></div>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-green font-bold block">
                BOWLS PROTÉINÉS
              </span>
              <h2 className="font-display text-3xl font-extrabold text-white sm:text-5xl tracking-[-0.03em]">
                Le bowl qui travaille autant que toi
              </h2>
              <p className="text-sm text-neutral-400 font-sans leading-relaxed">
                Des recettes équilibrées et riches en protéines, composées pour t'aider à mieux récupérer et à rester régulier dans ton alimentation.
              </p>
              <ul className="space-y-3 text-xs text-neutral-400">
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-green shrink-0"></span>
                  Une source de protéines de qualité
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-green shrink-0"></span>
                  Des glucides adaptés à ta dépense énergétique
                </li>
                <li className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-green shrink-0"></span>
                  Des légumes et ingrédients équilibrés
                </li>
              </ul>
              <Link
                to="/bowls-proteines"
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-bold text-black tracking-wider uppercase transition-all duration-300 hover:bg-brand-green hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                Découvrir les bowls protéinés <ArrowRight className="h-3.5 w-3.5" />
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
                  className="rounded-2xl border border-neutral-800 bg-neutral-950 overflow-hidden hover:border-brand-green/40 transition group"
                >
                  <div className="aspect-square w-full overflow-hidden">
                    <img src={meal.image} alt={meal.name} className="h-full w-full object-cover group-hover:scale-105 transition duration-700" />
                  </div>
                  <div className="p-3">
                    <p className="text-xs font-bold text-white truncate">{meal.name}</p>
                    <p className="text-[10px] text-neutral-500 font-mono mt-1">{meal.calories} kcal • {meal.proteins}g protéines</p>
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
      <section className="relative bg-[#050505] py-24 lg:py-32 border-b border-neutral-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-green font-bold block">
              COMPLÉMENTS
            </span>
            <h2 className="font-display text-3xl font-extrabold text-white sm:text-5xl tracking-[-0.03em]">
              Complète ton repas
            </h2>
            <p className="text-sm text-neutral-400 font-sans max-w-xl mx-auto">
              Shakes protéinés, snacks healthy et energy balls pour compléter tes apports entre les repas ou après l'entraînement.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {MEALS_DATABASE.filter(m => m.category === 'Shakers' || m.category === 'Snacks').slice(0, 4).map((meal) => (
              <Link
                key={meal.id}
                to={meal.category === 'Shakers' ? '/shakes-proteines' : '/snacks-healthy'}
                className="group text-center rounded-2xl border border-neutral-800 bg-neutral-950 p-6 hover:border-brand-green/40 transition"
              >
                <div className="aspect-square w-full overflow-hidden rounded-xl bg-neutral-900 mb-4">
                  <img src={meal.image} alt={meal.name} className="h-full w-full object-cover group-hover:scale-105 transition duration-700" />
                </div>
                <h3 className="text-xs font-bold text-white mb-1">{meal.name}</h3>
                <p className="text-[10px] text-neutral-500 font-mono">{meal.calories} kcal • {meal.proteins}g protéines</p>
                <p className="text-xs font-bold text-white font-mono mt-2">{meal.price.toFixed(2)} €</p>
              </Link>
            ))}
          </motion.div>

          <div className="flex items-center justify-center gap-4 mt-10">
            <Link
              to="/shakes-proteines"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950 px-5 py-2.5 text-[10px] font-mono font-bold uppercase tracking-widest text-white hover:border-brand-green hover:text-brand-green transition"
            >
              Voir les shakes
            </Link>
            <Link
              to="/snacks-healthy"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950 px-5 py-2.5 text-[10px] font-mono font-bold uppercase tracking-widest text-white hover:border-brand-green hover:text-brand-green transition"
            >
              Voir les snacks
            </Link>
          </div>
        </div>
      </section>

      {/* 8. Abonnements */}
      <section className="relative bg-[#050505] py-24 lg:py-32 border-b border-neutral-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-green font-bold block">
              ABONNEMENTS
            </span>
            <h2 className="font-display text-3xl font-extrabold text-white sm:text-5xl tracking-[-0.03em]">
              Ton alimentation sportive, sans improviser
            </h2>
            <p className="text-sm text-neutral-400 font-sans max-w-xl mx-auto">
              Choisis une formule adaptée à ton rythme et retrouve plus facilement tes repas préférés.
            </p>
          </div>
          <SubscriptionsSection onSelectPlan={() => {}} onOpenAuth={() => {}} />
          <div className="text-center mt-10">
            <Link
              to="/abonnements"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950 px-6 py-3 text-[10px] font-mono font-bold uppercase tracking-widest text-white hover:border-brand-green hover:text-brand-green transition"
            >
              Découvrir les abonnements <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Réassurance */}
      <section className="relative bg-[#050505] py-24 lg:py-32 border-b border-neutral-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-green font-bold block">
              POURQUOI ORVYN ?
            </span>
            <h2 className="font-display text-3xl font-extrabold text-white sm:text-5xl tracking-[-0.03em]">
              Pourquoi choisir ORVYN ?
            </h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green/10 mx-auto mb-4">
                <BarChart3 className="h-6 w-6 text-brand-green" />
              </div>
              <h3 className="text-sm font-bold text-white mb-2">Transparence nutritionnelle</h3>
              <p className="text-xs text-neutral-400">Calories, protéines, glucides et lipides affichés pour chaque recette.</p>
            </div>
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green/10 mx-auto mb-4">
                <Target className="h-6 w-6 text-brand-green" />
              </div>
              <h3 className="text-sm font-bold text-white mb-2">Personnalisation selon tes objectifs</h3>
              <p className="text-xs text-neutral-400">Des repas adaptés à la prise de masse, la sèche ou la récupération.</p>
            </div>
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green/10 mx-auto mb-4">
                <Zap className="h-6 w-6 text-brand-green" />
              </div>
              <h3 className="text-sm font-bold text-white mb-2">Simplicité de commande</h3>
              <p className="text-xs text-neutral-400">Choisis ton repas en quelques clics, sans abonnement obligatoire.</p>
            </div>
            <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-6 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-green/10 mx-auto mb-4">
                <Dumbbell className="h-6 w-6 text-brand-green" />
              </div>
              <h3 className="text-sm font-bold text-white mb-2">Offre pensée pour les sportifs</h3>
              <p className="text-xs text-neutral-400">Une offre construite autour des besoins avant et après l'entraînement.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 10. Blog preview */}
      <section className="relative bg-[#050505] py-24 lg:py-32 border-b border-neutral-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand-green font-bold block">
              BLOG NUTRITION
            </span>
            <h2 className="font-display text-3xl font-extrabold text-white sm:text-5xl tracking-[-0.03em]">
              Conseils nutrition & performance
            </h2>
            <p className="text-sm text-neutral-400 font-sans max-w-xl mx-auto">
              Toute l'expertise ORVYN pour optimiser ta nutrition sportive au quotidien.
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
              <Link
                key={i}
                to={`/blog/${article.slug}`}
                className="group text-left rounded-2xl border border-neutral-900 bg-[#0a0a0a] p-6 hover:border-neutral-700 transition-all duration-300 block"
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
              </Link>
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

      {/* 11. FAQ */}
      <FAQ />

      {/* 12. Contact */}
      <ContactSection />

      {/* 13. CTA final */}
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
                Prêt à mieux manger <br />
                <span className="text-brand-green">après l'entraînement ?</span>
              </h2>
              <p className="text-sm text-neutral-400 max-w-2xl mx-auto font-sans">
                Choisis ton objectif et découvre les repas ORVYN adaptés à ton rythme.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/repas"
                className="group inline-flex items-center gap-2 rounded-full bg-brand-green px-8 py-4 text-xs font-bold text-black tracking-wider uppercase transition-all duration-300 hover:bg-white hover:shadow-[0_0_30px_rgba(16,185,129,0.4)]"
              >
                Découvrir les repas
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
              </Link>
              <Link
                to="/repas"
                className="inline-flex items-center gap-2 rounded-full border border-neutral-800 bg-neutral-950 px-8 py-4 text-xs font-bold text-neutral-300 tracking-wider uppercase transition-all duration-300 hover:border-neutral-500 hover:text-white"
              >
                Choisir mon objectif
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
